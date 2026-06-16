import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Send,
  ArrowUpRight,
  Linkedin,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const contactLinks = [
  { icon: Mail, label: "Email", value: "kristhianpinili@gmail.com", href: "mailto:kristhianpinili@gmail.com" },
  { icon: Phone, label: "Phone", value: "+63 908 169 3403", href: "tel:+639081693403" },
  { icon: Github, label: "GitHub", value: "@chosenvision", href: "https://github.com/chosenvision" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Kristhian Pinili",
    href: "https://www.linkedin.com/in/kristhian-pinili-87665b366/",
  },
  { icon: MapPin, label: "Location", value: "Taal, Batangas, Philippines", href: null },
];

const PROJECT_TYPES = [
  "Web Application",
  "Mobile App",
  "Machine Learning / AI",
  "Full-stack MVP",
  "UI/UX Design",
  "Internship / Full-time role",
  "Other",
];

const BUDGETS = [
  "Just exploring",
  "< $1k",
  "$1k - $5k",
  "$5k - $10k",
  "$10k - $25k",
  "$25k+",
];

const formSchema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  project_type: z.string().max(80).optional(),
  budget: z.string().max(80).optional(),
  message: z.string().trim().min(5, "Tell me a bit more").max(4000),
});

function getDevice(): "mobile" | "tablet" | "desktop" {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < 640) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

function captureUtm() {
  if (typeof window === "undefined") return {} as Record<string, string>;
  const params = new URLSearchParams(window.location.search);
  const stored: Record<string, string> = {};
  UTM_KEYS.forEach((k) => {
    const fromUrl = params.get(k);
    if (fromUrl) sessionStorage.setItem(k, fromUrl);
    stored[k] = sessionStorage.getItem(k) || "";
  });
  return stored;
}

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project_type: "",
    budget: "",
    message: "",
    website: "", // honeypot
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    captureUtm();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = formSchema.safeParse(formData);
    if (!parsed.success) {
      const first = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
      toast.error(first || "Please check the form");
      return;
    }
    setLoading(true);
    try {
      const utm = captureUtm();
      const payload = {
        ...parsed.data,
        website: formData.website,
        page_url: typeof window !== "undefined" ? window.location.href : "",
        referrer: typeof document !== "undefined" ? document.referrer : "",
        device: getDevice(),
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : "",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        ...utm,
      };
      const { data, error } = await supabase.functions.invoke("submit-lead", { body: payload });
      if (error) throw error;
      if ((data as { error?: string })?.error) throw new Error((data as { error: string }).error);
      setSent(true);
      toast.success("Message sent! I'll get back to you within 24–48 hours.");
      setFormData({ name: "", email: "", project_type: "", budget: "", message: "", website: "" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-muted/30">
      <div ref={ref} className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium mb-4">Get In Touch</p>
          <h2 className="section-heading mb-6">Let's Work Together</h2>
          <p className="section-subheading max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-muted-foreground leading-relaxed mb-8">
              I'm always open to discussing new opportunities, interesting projects, or just having
              a chat about technology and innovation.
            </p>
            <div className="space-y-4">
              {contactLinks.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  {item.href ? (
                    <motion.a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-background transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {item.value}
                        </p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  ) : (
                    <div className="flex items-center gap-4 p-4">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium text-foreground">{item.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card-minimal p-6 md:p-8 space-y-5"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="font-serif text-2xl text-foreground mb-2">Message sent!</h3>
                <p className="text-muted-foreground mb-6">
                  I've received your details and will reply within 24–48 hours. Check your inbox for a
                  confirmation.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="text-sm text-primary hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <>
                {/* honeypot */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={handleChange}
                  className="hidden"
                  aria-hidden
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      maxLength={100}
                      value={formData.name}
                      onChange={handleChange}
                      className="input-minimal"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      maxLength={255}
                      value={formData.email}
                      onChange={handleChange}
                      className="input-minimal"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="project_type"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Project type
                    </label>
                    <select
                      id="project_type"
                      name="project_type"
                      value={formData.project_type}
                      onChange={handleChange}
                      className="input-minimal appearance-none"
                    >
                      <option value="">Select…</option>
                      {PROJECT_TYPES.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2">
                      Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="input-minimal appearance-none"
                    >
                      <option value="">Select…</option>
                      {BUDGETS.map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    maxLength={4000}
                    value={formData.message}
                    onChange={handleChange}
                    className="input-minimal resize-none"
                    placeholder="Tell me about your project, role, or idea…"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  whileHover={!loading ? { scale: 1.02, y: -2 } : undefined}
                  whileTap={!loading ? { scale: 0.98 } : undefined}
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>

                <p className="text-[11px] text-muted-foreground text-center">
                  Protected by validation + rate limiting. I never share your details.
                </p>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
