import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const featuredProjects = [
  {
    title: "ASTRA: Adaptive Sorting with Tree-Based Algorithm Selection",
    description:
      "Thesis — Engineered a high-performance C++ framework that dynamically optimizes sorting by analyzing real-time data biases through an O(n) interpretable decision-tree architecture. Achieved 1.98x average speedup over std::sort with peak gains of 8,948x on biased datasets.",
    tags: ["C++", "Thesis", "Algorithms", "Data Structures"],
    github: "https://github.com/chosenvision",
  },
  {
    title: "Stroke Detection System",
    description:
      "Lead Hardware & Frontend Developer — Designed a hardware PPG sensor and Flutter mobile app to collect cardiovascular data for AI-based stroke prediction research, with real-time signal visualization and automated BMI calculation.",
    tags: ["Flutter", "Hardware", "SQLite", "AI/ML"],
    github: "https://github.com/chosenvision",
  },
];

const otherProjects = [
  { title: "AgriLocate", tags: ["Python", "ML"], github: "https://github.com/chosenvision/AgriLocate" },
  { title: "CryptoCrafters", tags: ["Java", "Game Dev"], github: "https://github.com/chosenvision" },
  { title: "HabitHub", tags: ["Android", "Firebase"], github: "https://github.com/chosenvision/Habit_Hub" },
  { title: "Flight Booking System", tags: ["C++"], github: "https://github.com/chosenvision/Flight-Booking-System" },
  { title: "Edu Hub", tags: ["Python"], github: "https://github.com/chosenvision" },
  { title: "Reforge: Rise of Seven Cities", tags: ["Game Dev", "C++"], github: "https://github.com/chosenvision" },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 lg:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium mb-4">My Work</p>
          <h2 className="section-heading mb-6">Notable Projects</h2>
          <p className="section-subheading max-w-2xl mx-auto">
            A showcase of projects that demonstrate my skills and passion for creating.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group card-minimal p-8 flex flex-col ring-1 ring-primary/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-primary"
                  />
                  <h3 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0 mt-1"
                />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-minimal text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>

        {/* Other Projects - Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-sm text-muted-foreground text-center mb-6">Other Projects</p>
          <div className="overflow-hidden relative">
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />
            
            <div className="flex animate-marquee gap-6">
              {[...otherProjects, ...otherProjects].map((project, i) => (
                <a
                  key={`${project.title}-${i}`}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 group flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                >
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                    {project.title}
                  </span>
                  <div className="flex gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] text-muted-foreground whitespace-nowrap">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
