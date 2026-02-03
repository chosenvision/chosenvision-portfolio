import { motion } from "framer-motion";
import { Github, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
    <footer className="relative py-12 border-t border-border/50">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-muted-foreground font-mono text-sm"
          >
            <span>© {currentYear} Kristhian Pinili.</span>
            <span className="hidden sm:inline">Built with</span>
            <Heart className="w-4 h-4 text-primary hidden sm:inline" />
            <span className="hidden sm:inline">and code.</span>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-6"
          >
            {["Home", "About", "Projects", "Contact"].map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(`#${link.toLowerCase()}`)}
                className="text-muted-foreground hover:text-primary transition-colors font-mono text-sm"
              >
                {link}
              </button>
            ))}
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <a
              href="https://github.com/chosenvision"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors group"
            >
              <Github className="w-5 h-5 text-primary" />
            </a>
            <a
              href="mailto:kristhianpinili@gmail.com"
              className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors group"
            >
              <Mail className="w-5 h-5 text-primary" />
            </a>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 pt-6 border-t border-border/30 text-center"
        >
          <p className="text-muted-foreground/60 font-mono text-sm italic">
            "I don't just build programs — I build purpose through code."
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
