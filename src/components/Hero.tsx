import { motion } from "framer-motion";
import { ArrowRight, Terminal, Github, Mail, MapPin } from "lucide-react";

const Hero = () => {
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
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse delay-500" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30"
            >
              <span className="status-dot" />
              <span className="text-sm font-mono text-primary">Available for work</span>
            </motion.div>

            {/* Name and title */}
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg font-mono text-primary text-glow"
              >
                <span className="animate-blink">$</span> whoami
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl lg:text-7xl font-bold font-display leading-tight"
              >
                Kristhian{" "}
                <span className="text-primary text-glow-strong">Pinili</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl lg:text-2xl font-mono text-muted-foreground"
              >
                <span className="text-primary">&gt;</span> Software Engineer & Problem Solver
              </motion.p>
            </div>

            {/* Terminal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="terminal"
            >
              <div className="terminal-header">
                <div className="flex gap-2">
                  <div className="terminal-dot bg-red-500" />
                  <div className="terminal-dot bg-yellow-500" />
                  <div className="terminal-dot bg-green-500" />
                </div>
                <span className="text-xs font-mono text-muted-foreground">~/portfolio</span>
              </div>
              <div className="terminal-body space-y-2">
                <p>
                  <span className="text-primary">kristhian@dev:~$</span>{" "}
                  <span className="text-foreground">cat about.txt</span>
                </p>
                <p className="text-muted-foreground">
                  "I don't just build programs — I build purpose through code."
                </p>
                <p className="text-muted-foreground/70 text-xs mt-2">
                  Detail-oriented, solutions-driven junior software engineer passionate about creating impactful digital experiences.
                </p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                onClick={() => scrollToSection("#projects")}
                className="cyber-btn flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View My Work
                <ArrowRight size={18} />
              </motion.button>
              
              <motion.button
                onClick={() => scrollToSection("#contact")}
                className="cyber-btn-outline flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Terminal size={18} />
                Get In Touch
              </motion.button>
            </motion.div>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-6 text-muted-foreground"
            >
              <a
                href="https://github.com/chosenvision"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Github size={18} />
                <span className="text-sm font-mono">GitHub</span>
              </a>
              <a
                href="mailto:kristhianpinili@gmail.com"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail size={18} />
                <span className="text-sm font-mono">Email</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span className="text-sm font-mono">Batangas, PH</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Avatar Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Animated rings */}
              <div className="absolute inset-0 w-72 h-72 lg:w-80 lg:h-80">
                <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse-ring" />
                <div className="absolute inset-4 rounded-full border border-primary/20 animate-pulse-ring delay-200" />
                <div className="absolute inset-8 rounded-full border border-primary/10 animate-pulse-ring delay-400" />
              </div>
              
              {/* Avatar placeholder with glow */}
              <div className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-primary/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-full bg-muted flex items-center justify-center border-4 border-primary/50 overflow-hidden">
                    {/* Avatar initials as fallback */}
                    <span className="text-6xl font-bold font-display text-primary text-glow-strong">KP</span>
                  </div>
                </div>
                
                {/* Scan effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent animate-scan" />
              </div>

              {/* Status card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-3 border border-primary/30"
              >
                <div className="flex items-center gap-2">
                  <span className="status-dot" />
                  <span className="text-sm font-mono text-foreground">Dean's Lister</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-3 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
