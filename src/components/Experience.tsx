import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Cog, Users } from "lucide-react";

const experiences = [
  {
    title: "Website Development Intern",
    company: "National Transmission Corporation",
    icon: Briefcase,
    description:
      "Tasked with creating a comprehensive ticketing system for the IT/IS Division. Developed a system that allows all incoming requests to be processed efficiently, improving workflow and response times for technical support.",
    type: "Internship",
  },
  {
    title: "Outsourced Quality Assurance Intern",
    company: "Freelance Contract",
    icon: Cog,
    description:
      "As an outsourced Quality Assurance contractor, I was responsible for identifying and troubleshooting issues, creating detailed test cases, and performing manual testing to ensure the quality and performance standards were met before product releases.",
    type: "Contract",
  },
  {
    title: "Outsourced Casting Agent",
    company: "Freelance Contract",
    icon: Users,
    description:
      "Worked closely with directors and producers to scout and audition talent for various projects. Coordinated auditions, managed talent schedules, and contributed to the overall casting strategy for film and TV productions.",
    type: "Contract",
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      
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
            Experience
            <span className="text-primary">/&gt;</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Building expertise through hands-on experience and continuous learning.
          </p>
        </motion.div>

        {/* Experience timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative pl-0 md:pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-6 hidden md:block">
                  <div className="timeline-dot" />
                </div>

                <div className="glass-card rounded-xl p-6 glow-border group hover:border-primary/50 transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <exp.icon className="w-7 h-7 text-primary" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mb-3">
                        <h3 className="text-xl font-bold font-display text-foreground group-hover:text-primary transition-colors">
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className="text-primary font-mono text-sm">{exp.company}</span>
                          <span className="tag text-xs">{exp.type}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
