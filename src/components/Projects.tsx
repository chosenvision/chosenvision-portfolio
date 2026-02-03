import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, ExternalLink, Leaf, Lock, Smartphone, Plane, GraduationCap, Gamepad2 } from "lucide-react";

const projects = [
  {
    title: "AgriLocate",
    description: "Crop recommendation system using weather and soil data to help farmers make informed decisions.",
    tags: ["Python", "ML", "Data Analysis"],
    icon: Leaf,
    github: "https://github.com/chosenvision/AgriLocate",
    featured: true,
  },
  {
    title: "CryptoCrafters",
    description: "Gamified learning platform for classical cryptography with interactive challenges and tutorials.",
    tags: ["Java", "Game Dev", "Education"],
    icon: Lock,
    github: "https://github.com/chosenvision",
    featured: true,
  },
  {
    title: "HabitHub",
    description: "Android app to help users build and track habits with progress visualization and reminders.",
    tags: ["Android", "Firebase", "Java"],
    icon: Smartphone,
    github: "https://github.com/chosenvision/Habit_Hub",
    featured: true,
  },
  {
    title: "Flight Booking System",
    description: "Console-based reservation and ticketing platform with seat management and booking features.",
    tags: ["C++", "System Design", "Database"],
    icon: Plane,
    github: "https://github.com/chosenvision/Flight-Booking-System",
    featured: false,
  },
  {
    title: "Edu Hub",
    description: "Career simulations and educational modules to help students explore different career paths.",
    tags: ["Python", "Education", "Simulation"],
    icon: GraduationCap,
    github: "https://github.com/chosenvision",
    featured: false,
  },
  {
    title: "Reforge: Rise of Seven Cities",
    description: "RPG game with cities, pets, bosses, and immersive gameplay mechanics.",
    tags: ["Game Dev", "C++", "Graphics"],
    icon: Gamepad2,
    github: "https://github.com/chosenvision",
    featured: false,
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">
            <span className="text-primary">&lt;</span>
            Projects
            <span className="text-primary">/&gt;</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            A showcase of my technical expertise and creative problem-solving.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card rounded-xl p-6 glow-border group hover:border-primary/50 transition-all duration-300 ${
                project.featured ? "ring-1 ring-primary/20" : ""
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                  <project.icon className="w-6 h-6 text-primary" />
                </div>
                {project.featured && (
                  <span className="tag text-xs">Featured</span>
                )}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold font-display text-foreground mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground font-mono text-sm mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-mono text-sm group/link"
              >
                <Github size={18} />
                <span>View on GitHub</span>
                <ExternalLink size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
