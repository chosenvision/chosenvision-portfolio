import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";

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
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Animated background blobs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary rounded-full blur-3xl"
      />

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

          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
          >
            A <span className="text-highlight">software engineer</span> passionate about
            creating impactful digital experiences and meaningful solutions.
          </motion.p>

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
            <motion.button
              onClick={() => scrollToSection("#projects")}
              className="btn-primary inline-flex items-center justify-center gap-2"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              View My Work
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              onClick={() => scrollToSection("#contact")}
              className="btn-outline inline-flex items-center justify-center gap-2"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Get In Touch
            </motion.button>
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
                <p className="text-3xl font-serif font-medium text-foreground">{stat.value}</p>
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
