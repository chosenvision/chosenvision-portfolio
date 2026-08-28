import { createClient } from "npm:@supabase/supabase-js@2.45.0";
import { z } from "npm:zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GATEWAY = "https://connector-gateway.lovable.dev";
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const SHEETS_KEY = Deno.env.get("GOOGLE_SHEETS_API_KEY");
const SLACK_KEY = Deno.env.get("SLACK_API_KEY");
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const SHEET_ID = Deno.env.get("LEADS_SHEET_ID") || "";
const SHEET_RANGE = Deno.env.get("LEADS_SHEET_RANGE") || "Sheet1!A1";
const SLACK_CHANNEL = Deno.env.get("SLACK_LEADS_CHANNEL") || "";
const NOTIFY_EMAIL = Deno.env.get("NOTIFY_EMAIL") || "kristhianpinili@gmail.com";
// Resend requires the "from" address to be on a domain verified with Resend.
// onboarding@resend.dev works immediately with no verification step and can
// send to any recipient — swap in a verified custom-domain address later if desired.
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "onboarding@resend.dev";
const CALENDLY_LINK =
  Deno.env.get("CALENDLY_LINK") || "https://calendly.com/your-handle/intro";

const HIGH_PRIORITY_BUDGETS = new Set([
  "$5k - $10k",
  "$10k - $25k",
  "$25k+",
]);

const LeadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  project_type: z.string().trim().max(80).optional().default(""),
  budget: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().min(5).max(4000),
  // metadata
  page_url: z.string().max(500).optional().default(""),
  referrer: z.string().max(500).optional().default(""),
  device: z.enum(["mobile", "desktop", "tablet", "unknown"]).optional().default("unknown"),
  user_agent: z.string().max(500).optional().default(""),
  timezone: z.string().max(80).optional().default(""),
  utm_source: z.string().max(120).optional().default(""),
  utm_medium: z.string().max(120).optional().default(""),
  utm_campaign: z.string().max(120).optional().default(""),
  utm_term: z.string().max(120).optional().default(""),
  utm_content: z.string().max(120).optional().default(""),
  // honeypot
  website: z.string().max(0).optional().default(""),
});

// simple in-memory rate limit (per warm instance)
const rateBucket = new Map<string, { count: number; reset: number }>();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = rateBucket.get(ip);
  if (!entry || entry.reset < now) {
    rateBucket.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_MAX) return false;
  entry.count++;
  return true;
}

async function appendToSheet(lead: any) {
  if (!SHEETS_KEY || !LOVABLE_API_KEY || !SHEET_ID) {
    return { ok: false, skipped: true, reason: "sheets not configured" };
  }
  const row = [
    new Date().toISOString(),
    lead.name,
    lead.email,
    lead.project_type,
    lead.budget,
    lead.message,
    lead.page_url,
    lead.device,
    lead.timezone,
    lead.utm_source,
    lead.utm_medium,
    lead.utm_campaign,
    lead.utm_term,
    lead.utm_content,
    lead.referrer,
  ];
  const url = `${GATEWAY}/google_sheets/v4/spreadsheets/${SHEET_ID}/values/${SHEET_RANGE}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": SHEETS_KEY,
    },
    body: JSON.stringify({ values: [row] }),
  });
  if (!res.ok) {
    return { ok: false, status: res.status, body: (await res.text()).slice(0, 300) };
  }
  return { ok: true };
}

async function notifySlack(lead: any, highPriority: boolean) {
  if (!SLACK_KEY || !LOVABLE_API_KEY || !SLACK_CHANNEL) {
    return { ok: false, skipped: true, reason: "slack not configured" };
  }
  const emoji = highPriority ? ":rotating_light:" : ":sparkles:";
  const title = highPriority
    ? "*HIGH PRIORITY* — new lead from portfolio"
    : "New lead from portfolio";

  const blocks = [
    { type: "header", text: { type: "plain_text", text: `${emoji} ${highPriority ? "HIGH PRIORITY Lead" : "New Lead"}` } },
    { type: "section", text: { type: "mrkdwn", text: title } },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*Name:*\n${lead.name}` },
        { type: "mrkdwn", text: `*Email:*\n${lead.email}` },
        { type: "mrkdwn", text: `*Project:*\n${lead.project_type || "—"}` },
        { type: "mrkdwn", text: `*Budget:*\n${lead.budget || "—"}` },
      ],
    },
    { type: "section", text: { type: "mrkdwn", text: `*Message:*\n>${(lead.message || "").replace(/\n/g, "\n>")}` } },
    {
      type: "context",
      elements: [
        { type: "mrkdwn", text: `:computer: ${lead.device} · :earth_americas: ${lead.timezone || "?"} · :link: ${lead.page_url || "?"}` },
        { type: "mrkdwn", text: `:chart_with_upwards_trend: utm_source=${lead.utm_source || "—"} · utm_campaign=${lead.utm_campaign || "—"} · referrer=${lead.referrer || "direct"}` },
      ],
    },
  ];

  const res = await fetch(`${GATEWAY}/slack/api/chat.postMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": SLACK_KEY,
    },
    body: JSON.stringify({ channel: SLACK_CHANNEL, text: title, blocks }),
  });
  const body = await res.json().catch(() => ({}));
  return { ok: res.ok && body.ok === true, body };
}

function buildOwnerEmail(lead: any, highPriority: boolean) {
  const subject = `${highPriority ? "[HIGH PRIORITY] " : ""}New lead — ${lead.name} (${lead.project_type || "no type"})`;
  const text = [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Project: ${lead.project_type || "—"}`,
    `Budget: ${lead.budget || "—"}`,
    "",
    "Message:",
    lead.message,
    "",
    "— Metadata —",
    `Device: ${lead.device}`,
    `Timezone: ${lead.timezone}`,
    `Page: ${lead.page_url}`,
    `Referrer: ${lead.referrer || "direct"}`,
    `UTM: source=${lead.utm_source} medium=${lead.utm_medium} campaign=${lead.utm_campaign} term=${lead.utm_term} content=${lead.utm_content}`,
  ].join("\n");
  return { subject, text };
}

function buildConfirmationEmail(lead: any) {
  const subject = `Thanks for reaching out, ${lead.name.split(" ")[0]}!`;
  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#fafafa;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#0a0a0b;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e4e4e7;">
        <tr><td style="padding:36px 36px 0 36px;">
          <h1 style="font-weight:600;font-size:26px;margin:0 0 8px 0;color:#0a0a0b;letter-spacing:-0.02em;">Thanks for reaching out!</h1>
          <p style="margin:0 0 24px 0;color:#52525b;font-size:15px;line-height:1.6;">Hi ${escapeHtml(lead.name.split(" ")[0])}, I've received your message and will personally get back to you within 24–48 hours.</p>
        </td></tr>
        <tr><td style="padding:0 36px;">
          <div style="background:#f4f4f5;border:1px solid #e4e4e7;border-radius:10px;padding:18px 20px;margin-bottom:24px;">
            <p style="margin:0 0 6px 0;font-size:12px;color:#71717a;text-transform:uppercase;letter-spacing:0.06em;">Your message</p>
            <p style="margin:0;font-size:14px;color:#0a0a0b;line-height:1.6;white-space:pre-wrap;">${escapeHtml(lead.message)}</p>
          </div>
        </td></tr>
        <tr><td style="padding:0 36px 8px 36px;">
          <p style="margin:0 0 18px 0;font-size:15px;line-height:1.6;color:#0a0a0b;">In the meantime, feel free to grab a time on my calendar — we can chat through the project:</p>
          <p style="margin:0 0 28px 0;"><a href="${CALENDLY_LINK}" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:999px;font-weight:500;font-size:14px;">Book a 30-min call →</a></p>
        </td></tr>
        <tr><td style="padding:0 36px 36px 36px;border-top:1px solid #e4e4e7;">
          <p style="margin:18px 0 4px 0;font-weight:600;font-size:17px;color:#0a0a0b;">Kristhian Pinili</p>
          <p style="margin:0 0 12px 0;font-size:13px;color:#52525b;">Software Engineer · AWS ML Specialty</p>
          <p style="margin:0;font-size:12px;color:#71717a;">If this wasn't you, just ignore this email.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
  return { subject, html };
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );
}

async function resendSend(to: string, subject: string, body: string, html?: boolean) {
  if (!RESEND_API_KEY) {
    return { ok: false, skipped: true, reason: "RESEND_API_KEY not configured" };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: `Kristhian Pinili <${FROM_EMAIL}>`,
      to: [to],
      subject,
      [html ? "html" : "text"]: body,
    }),
  });
  if (!res.ok) {
    return { ok: false, status: res.status, body: (await res.text()).slice(0, 300) };
  }
  return { ok: true };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") ||
    "unknown";
  if (!rateLimit(ip)) {
    return new Response(JSON.stringify({ error: "Too many requests. Please wait a moment." }), {
      status: 429,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "invalid json" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const parsed = LeadSchema.safeParse(json);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: "Validation failed", details: parsed.error.flatten().fieldErrors }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
  const lead = parsed.data;

  // honeypot — silently accept but discard
  if (lead.website && lead.website.length > 0) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // 1. Insert into DB first — this must succeed
  const { data: inserted, error: insertError } = await supabase
    .from("leads")
    .insert({
      name: lead.name,
      email: lead.email,
      project_type: lead.project_type,
      budget: lead.budget,
      message: lead.message,
      page_url: lead.page_url,
      referrer: lead.referrer,
      device: lead.device,
      user_agent: lead.user_agent,
      timezone: lead.timezone,
      utm_source: lead.utm_source,
      utm_medium: lead.utm_medium,
      utm_campaign: lead.utm_campaign,
      utm_term: lead.utm_term,
      utm_content: lead.utm_content,
    })
    .select("id")
    .single();

  if (insertError) {
    console.error("DB insert failed", insertError);
    return new Response(JSON.stringify({ error: "Could not save your message. Please try again." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const highPriority = HIGH_PRIORITY_BUDGETS.has(lead.budget || "");

  // 2. Fan-out notifications in parallel; never block on failures
  const owner = buildOwnerEmail(lead, highPriority);
  const confirm = buildConfirmationEmail(lead);

  const [sheets, slack, ownerMail, confirmMail] = await Promise.all([
    appendToSheet(lead).catch((e) => ({ ok: false, error: String(e) })),
    notifySlack(lead, highPriority).catch((e) => ({ ok: false, error: String(e) })),
    resendSend(NOTIFY_EMAIL, owner.subject, owner.text, false).catch((e) => ({ ok: false, error: String(e) })),
    resendSend(lead.email, confirm.subject, confirm.html, true).catch((e) => ({ ok: false, error: String(e) })),
  ]);

  // 3. Persist notification outcomes
  await supabase
    .from("leads")
    .update({ notifications: { sheets, slack, ownerMail, confirmMail } })
    .eq("id", inserted.id);

  console.log("lead", inserted.id, { sheets, slack, ownerMail, confirmMail });

  return new Response(
    JSON.stringify({ ok: true, id: inserted.id, highPriority }),
    { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});
