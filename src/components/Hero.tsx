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
      {/* Subtle background decoration */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 w-full py-20">
        <div className="max-w-3xl">
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-muted-foreground text-lg mb-6"
          >
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-foreground mb-6 leading-tight"
          >
            Kristhian Pinili
          </motion.h1>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
          >
            A <span className="text-highlight">software engineer</span> passionate about 
            creating impactful digital experiences and meaningful solutions.
          </motion.p>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
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
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              onClick={() => scrollToSection("#projects")}
              className="btn-primary inline-flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View My Work
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              onClick={() => scrollToSection("#contact")}
              className="btn-outline inline-flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-12 mt-16 pt-8 border-t border-border"
          >
            <div>
              <p className="text-3xl font-serif font-medium text-foreground">7+</p>
              <p className="text-sm text-muted-foreground mt-1">Projects</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-medium text-foreground">4+</p>
              <p className="text-sm text-muted-foreground mt-1">Certifications</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-medium text-foreground">Dean's</p>
              <p className="text-sm text-muted-foreground mt-1">Lister</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => scrollToSection("#about")}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowDown size={24} />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
