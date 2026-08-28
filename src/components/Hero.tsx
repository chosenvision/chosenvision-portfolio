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

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2800);
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
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Subtle grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* Animated background blobs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/3 w-[350px] h-[350px] bg-accent/20 rounded-full blur-3xl"
      />

      {/* 3D floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none" style={{ perspective: "1000px" }}>
        {/* Floating cube */}
        <motion.div
          aria-hidden
          animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute top-[15%] right-[12%] w-20 h-20 hidden md:block"
          style={{ transformStyle: "preserve-3d" }}
        >
          {[
            { t: "translateZ(40px)" },
            { t: "translateZ(-40px) rotateY(180deg)" },
            { t: "rotateY(90deg) translateZ(40px)" },
            { t: "rotateY(-90deg) translateZ(40px)" },
            { t: "rotateX(90deg) translateZ(40px)" },
            { t: "rotateX(-90deg) translateZ(40px)" },
          ].map((f, i) => (
            <div
              key={i}
              className="absolute inset-0 border border-primary/40 bg-primary/5 backdrop-blur-sm rounded-md"
              style={{ transform: f.t }}
            />
          ))}
        </motion.div>

        {/* Floating tetrahedron-ish triangle */}
        <motion.div
          aria-hidden
          animate={{ rotate: [0, 360], y: [0, -20, 0] }}
          transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute bottom-[20%] right-[20%] w-16 h-16 hidden md:block"
        >
          <div
            className="w-full h-full border-2 border-accent/50 bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          />
        </motion.div>

        {/* Floating ring (torus-like) */}
        <motion.div
          aria-hidden
          animate={{ rotateX: [60, 60], rotateZ: [0, 360], y: [0, 15, 0] }}
          transition={{ rotateZ: { duration: 24, repeat: Infinity, ease: "linear" }, y: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute top-[55%] right-[8%] w-28 h-28 hidden lg:block rounded-full border-[6px] border-primary/30"
          style={{ transform: "rotateX(60deg)" }}
        />

        {/* Tiny floating dots */}
        {[
          { x: "8%", y: "30%", d: 7 },
          { x: "18%", y: "70%", d: 9 },
          { x: "85%", y: "40%", d: 5 },
          { x: "70%", y: "85%", d: 11 },
        ].map((p, i) => (
          <motion.div
            key={i}
            aria-hidden
            animate={{ y: [0, -25, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            className="absolute w-2 h-2 rounded-full bg-primary/60"
            style={{ left: p.x, top: p.y }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 w-full py-20">
        <div className="max-w-3xl">
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            className="text-muted-foreground text-lg mb-6"
          >
            Hello, I'm
          </motion.p>

          {/* Name - letter by letter stagger */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-foreground mb-6 leading-tight"
          >
            {"Kristhian Pinili".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.03, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Rotating Role - typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.6 }}
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

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="border-l-2 border-primary pl-6 mb-10"
          >
            <p className="text-lg italic text-foreground/80">
              "I don't just build programs — I build purpose through code."
            </p>
          </motion.blockquote>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
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

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-wrap gap-12 mt-16 pt-8 border-t border-border"
          >
            {[
              { value: "8+", label: "Projects" },
              { value: "4+", label: "Certifications" },
              { value: "Dean's", label: "Lister" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + i * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
              >
                <p className={stat.value === "Dean's" ? "text-3xl font-mono font-medium text-foreground" : "stat-number text-3xl"}>
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => scrollToSection("#about")}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-muted-foreground hover:text-foreground transition-colors"
          whileHover={{ scale: 1.2 }}
        >
          <ArrowDown size={24} />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
