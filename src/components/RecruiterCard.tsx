import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Download, Mail, Linkedin, Calendar, X, ChevronUp } from "lucide-react";

const RecruiterCard = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="fixed bottom-5 right-5 z-50 hidden sm:block"
        >
          {!open ? (
            <motion.button
              onClick={() => setOpen(true)}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="group flex items-center gap-3 pl-4 pr-5 py-3 rounded-full bg-foreground text-background shadow-soft-lg border border-foreground/10"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-sm font-medium">For Recruiters</span>
              <ChevronUp size={16} className="opacity-70 group-hover:opacity-100" />
            </motion.button>
          ) : (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-80 card-minimal p-5 shadow-soft-lg bg-background border-border"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    Open to opportunities
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              <h3 className="font-serif text-lg text-foreground mb-1">Kristhian Pinili</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Software Engineer · AWS ML Specialty · Taal, PH
              </p>

              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="rounded-xl bg-muted/60 py-2">
                  <p className="text-sm font-serif text-foreground">8+</p>
                  <p className="text-[10px] text-muted-foreground">Projects</p>
                </div>
                <div className="rounded-xl bg-muted/60 py-2">
                  <p className="text-sm font-serif text-foreground">4+</p>
                  <p className="text-[10px] text-muted-foreground">Certs</p>
                </div>
                <div className="rounded-xl bg-muted/60 py-2">
                  <p className="text-sm font-serif text-foreground">Dean's</p>
                  <p className="text-[10px] text-muted-foreground">Lister</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {["React", "TypeScript", "Python", "AWS", "Flutter"].map((s) => (
                  <span key={s} className="tag-minimal text-[10px]">
                    {s}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="/Kristhian_Pinili_Resume.pdf"
                  download
                  className="flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
                >
                  <Download size={14} /> Resume
                </a>
                <a
                  href="mailto:kristhianpinili@gmail.com"
                  className="flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-lg bg-muted text-foreground hover:bg-muted/70 transition"
                >
                  <Mail size={14} /> Email
                </a>
                <a
                  href="https://www.linkedin.com/in/kristhian-pinili-87665b366/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-lg bg-muted text-foreground hover:bg-muted/70 transition"
                >
                  <Linkedin size={14} /> LinkedIn
                </a>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-lg bg-foreground text-background hover:opacity-90 transition"
                >
                  <Calendar size={14} /> Book Call
                </a>
              </div>

              <p className="text-[10px] text-muted-foreground mt-3 flex items-center gap-1">
                <Briefcase size={10} /> Available immediately · Remote / Hybrid
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RecruiterCard;
