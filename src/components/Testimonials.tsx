import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const testimonials = [
  {
    quote:
      "Kristhian consistently delivered high-quality work during his internship. His full-stack ticketing system streamlined our IT operations and demonstrated exceptional initiative.",
    name: "IT Supervisor",
    role: "National Transmission Corporation",
  },
  {
    quote:
      "A meticulous problem solver with a sharp eye for detail. Kristhian's QA work caught critical issues before launch and saved us considerable debugging time.",
    name: "Project Lead",
    role: "Freelance QA Engagement",
  },
  {
    quote:
      "Driven, dependable, and genuinely passionate about technology. Kristhian pairs technical depth with strong communication — a rare combination at his stage.",
    name: "Faculty Reference",
    role: "BS Computer Science",
  },
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduceMotion) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const go = (dir: number) =>
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 lg:py-32">
      <div ref={ref} className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="section-eyebrow mb-4">Kind Words</p>
          <h2 className="section-heading mb-6">Testimonials</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="card-minimal p-8 md:p-12 relative overflow-hidden"
        >
          <Quote aria-hidden="true" className="absolute top-6 right-6 w-16 h-16 text-primary/10" />

          <div className="min-h-[180px] flex items-center" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <p className="text-lg md:text-xl font-serif text-foreground leading-relaxed mb-6 italic">
                  &ldquo;{testimonials[index].quote}&rdquo;
                </p>
                <div>
                  <p className="font-medium text-foreground">{testimonials[index].name}</p>
                  <p className="text-sm text-muted-foreground">{testimonials[index].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-8 bg-primary" : "w-2 bg-border"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPaused((p) => !p)}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label={paused ? "Resume auto-advance" : "Pause auto-advance"}
              >
                {paused ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}
              </button>
              <button
                onClick={() => go(-1)}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <button
                onClick={() => go(1)}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Next"
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
