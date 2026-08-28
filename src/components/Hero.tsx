import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import MagneticButton from "./MagneticButton";

const ROLES = [
  "Virtual Assistant",
  "Data Analyst",
  "Application Engineer",
  "Full-Stack Developer",
  "AWS ML Specialist",
  "UI/UX Designer",
];

const TERMINAL_LINES = [
  { prompt: "whoami", output: "kristhian_pinili" },
  { prompt: "cat status.json", output: '{ "open_to_work": true, "based_in": "PH" }' },
  { prompt: "echo $STACK", output: "python · react · aws · sql" },
];

const bentoStats = [
  { value: "8+", label: "Projects" },
  { value: "4+", label: "Certifications" },
  { value: "3+", label: "Years coding" },
  { value: "AWS", label: "ML Specialty" },
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setLineIndex((i) => (i + 1) % TERMINAL_LINES.length), 3200);
    return () => clearInterval(t);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-28 pb-16 relative overflow-hidden">
      {/* Subtle grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-0 w-[480px] h-[480px] bg-primary/10 rounded-full blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-start">
          {/* Left column — identity */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="section-eyebrow mb-5"
            >
              Portfolio · 2026
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-serif font-semibold tracking-tight text-foreground mb-6 leading-[1.05]"
            >
              Kristhian Pinili
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed flex flex-wrap items-center gap-x-2"
            >
              <span>A</span>
              <span className="relative inline-flex h-8 md:h-9 overflow-hidden align-middle">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="text-highlight font-medium text-foreground whitespace-nowrap"
                  >
                    {ROLES[roleIndex]}
                  </motion.span>
                </AnimatePresence>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="ml-0.5 text-primary"
                >
                  |
                </motion.span>
              </span>
              <span>passionate about meaningful solutions.</span>
            </motion.div>

            <motion.blockquote
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="border-l-2 border-primary pl-6 mb-10"
            >
              <p className="text-lg italic text-foreground/80">
                "I don't just build programs — I build purpose through code."
              </p>
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <MagneticButton
                onClick={() => scrollToSection("#projects")}
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                View My Work
                <ArrowRight size={18} />
              </MagneticButton>

              <MagneticButton
                onClick={() => scrollToSection("#contact")}
                className="btn-outline inline-flex items-center justify-center gap-2"
              >
                Get In Touch
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right column — bento panel: terminal card + stat tiles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            {/* Terminal card */}
            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-soft">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-muted/50">
                <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-data/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                <span className="ml-2 text-xs font-mono text-muted-foreground">status.sh</span>
              </div>
              <div className="p-4 font-mono text-sm min-h-[92px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lineIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-muted-foreground">
                      <span className="text-primary">$</span> {TERMINAL_LINES[lineIndex].prompt}
                    </p>
                    <p className="text-foreground mt-1 break-all">{TERMINAL_LINES[lineIndex].output}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Availability tile */}
            <div className="rounded-xl border border-border bg-card px-4 py-3 flex items-center gap-2.5 shadow-soft">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-sm font-mono text-foreground">Open to work</span>
              <span className="text-xs text-muted-foreground ml-auto">Remote / Hybrid</span>
            </div>

            {/* Stat bento grid */}
            <div className="grid grid-cols-2 gap-4">
              {bentoStats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.08, type: "spring", stiffness: 200 }}
                  whileHover={{ y: -2 }}
                  className="rounded-xl border border-border bg-card px-4 py-3.5 shadow-soft"
                >
                  <p className="stat-number text-2xl">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => scrollToSection("#about")}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-muted-foreground hover:text-foreground transition-colors"
          whileHover={{ scale: 1.2 }}
          aria-label="Scroll to About section"
        >
          <ArrowDown size={24} />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
