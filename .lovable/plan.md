
## Goal
Make the portfolio stand out to recruiters with both **frontend polish** and a **real inbound-lead pipeline** behind the contact form.

---

## Phase 1 — Frontend polish (no backend needed)

**Global UX**
- Top scroll-progress bar (fixed, primary color, fills as you scroll).
- Smooth custom cursor follower (desktop only, respects reduced-motion).
- Page transitions + reveal-on-scroll already in place, tightened.
- "Available for opportunities" pulsing green dot in the Navbar.

**Hero (wow factor)**
- Typewriter rotating roles: "Software Engineer • Full-Stack Developer • AWS ML Specialist • UI/UX Designer".
- Magnetic CTA buttons (subtle pull toward cursor).
- Subtle animated grid / particle field behind the existing blobs.

**Recruiter Quick-View card** (floating bottom-right, dismissible)
- Status: 🟢 Open to opportunities
- Location, primary stack, years of experience
- Buttons: Download Resume · Email Me · LinkedIn · Book a Call (Calendly placeholder)

**Social proof**
- New **Testimonials** carousel (auto-rotating, swipeable) — 3 placeholder quotes you can edit.
- New **Awards & Honors** strip (Dean's Lister, AWS ML Specialty, Cisco, etc.) with animated counters: Projects, Certifications, GPA, Years coding.

**Functional polish**
- Resume **preview modal** (PDF.js inline view) before download.
- Animated section dividers and number counters using `framer-motion`'s `useInView`.

---

## Phase 2 — Advanced contact pipeline

Upgrade the contact form into an automated lead system:

**Frontend capture**
- Fields: Name, Email, Project Type (dropdown), Budget Range (dropdown), Message.
- Silent metadata: page URL, referrer, device type (mobile/desktop), screen size, timezone, all `utm_*` query params (persisted from landing via sessionStorage).
- Client-side validation with zod, honeypot + simple rate limit.

**Backend (Lovable Cloud edge function `submit-lead`)**
1. Validate payload server-side with zod.
2. Insert row into `leads` table (Postgres) — full audit trail.
3. Append row to a **Google Sheet** via the Google Sheets connector.
4. Fire formatted **Slack** message (rich blocks) via the Slack connector — or Discord webhook if you prefer Discord.
5. Send **Gmail** notification to you via the Gmail connector — subject auto-flags `[HIGH PRIORITY]` when budget ≥ upper tier.
6. Send **HTML confirmation email** to the sender with your branding + Calendly placeholder link.
7. Return success; UI shows a celebratory confirmation state.

**What you'll need to approve / connect**
- Enable **Lovable Cloud** (one click).
- Connect **Google Sheets**, **Slack** (or provide Discord webhook URL), and **Gmail** connectors. I'll prompt for each at the right step.
- Provide: target Google Sheet URL, Slack channel name (or Discord webhook), your notification email, your Calendly link (placeholder OK for now).

---

## Technical notes
- All animations use existing `framer-motion`; cursor + scroll-bar are tiny components, no new deps except `react-pdf` for resume preview (optional — can use `<iframe>` instead to avoid the dep).
- Recruiter card and testimonials are plain React components; content lives in typed config files so you can edit easily.
- Edge function: `supabase/functions/submit-lead/index.ts` with zod validation, CORS, and parallel calls to Sheets/Slack/Gmail; failures in any one channel won't block lead capture (logged + saved to DB).
- `leads` table: `id, created_at, name, email, project_type, budget, message, page_url, referrer, device, utm_source, utm_medium, utm_campaign, utm_term, utm_content, status` with proper GRANTs + RLS (insert open via edge function service role; select restricted to admin role).

---

## Suggested execution order
1. Phase 1 visual polish (ship + review).
2. Enable Cloud, build `leads` table + edge function with DB persistence only.
3. Connect Sheets → Slack/Discord → Gmail one at a time, testing each.

Approve and I'll start with Phase 1, then pause before enabling Cloud so you can confirm connectors.
