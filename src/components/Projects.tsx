import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "AgriLocate",
    description: "Crop recommendation system using weather and soil data to help farmers make informed decisions.",
    tags: ["Python", "ML", "Data Analysis"],
    github: "https://github.com/chosenvision/AgriLocate",
    featured: true,
  },
  {
    title: "CryptoCrafters",
    description: "Gamified learning platform for classical cryptography with interactive challenges.",
    tags: ["Java", "Game Dev", "Education"],
    github: "https://github.com/chosenvision",
    featured: true,
  },
  {
    title: "HabitHub",
    description: "Android app to help users build and track habits with progress visualization.",
    tags: ["Android", "Firebase", "Java"],
    github: "https://github.com/chosenvision/Habit_Hub",
    featured: true,
  },
  {
    title: "Flight Booking System",
    description: "Console-based reservation platform with seat management and booking features.",
    tags: ["C++", "System Design"],
    github: "https://github.com/chosenvision/Flight-Booking-System",
  },
  {
    title: "Edu Hub",
    description: "Career simulations and educational modules for students to explore paths.",
    tags: ["Python", "Education"],
    github: "https://github.com/chosenvision",
  },
  {
    title: "Reforge: Rise of Seven Cities",
    description: "RPG game with cities, pets, bosses, and immersive gameplay mechanics.",
    tags: ["Game Dev", "C++"],
    github: "https://github.com/chosenvision",
  },
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
          <h2 className="section-heading mb-6">Selected Projects</h2>
          <p className="section-subheading max-w-2xl mx-auto">
            A showcase of projects that demonstrate my skills and passion for creating.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group card-minimal p-6 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  {project.featured && (
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  )}
                  <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </div>
                <ArrowUpRight 
                  size={18} 
                  className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" 
                />
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                {project.description}
              </p>

              {/* Tags */}
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
      </div>
    </section>
  );
};

export default Projects;
