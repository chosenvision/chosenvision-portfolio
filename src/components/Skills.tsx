import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "Python", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "C++", level: 75 },
      { name: "Java", level: 80 },
    ],
  },
  {
    title: "Web & Mobile",
    skills: [
      { name: "HTML/CSS", level: 90 },
      { name: "React", level: 75 },
      { name: "Flutter/Android", level: 80 },
      { name: "Firebase", level: 75 },
    ],
  },
  {
    title: "Cloud & Systems",
    skills: [
      { name: "AWS (ML Specialty)", level: 80 },
      { name: "Git & GitHub", level: 85 },
      { name: "MySQL / SQLite", level: 80 },
      { name: "Cisco Networking", level: 75 },
    ],
  },
  {
    title: "Creative & Design",
    skills: [
      { name: "UI/UX Design", level: 70 },
      { name: "Figma / Canva", level: 65 },
      { name: "Video Editing", level: 70 },
      { name: "Visual Design", level: 65 },
    ],
  },
];

const softSkills = [
  "Problem Solving",
  "Critical Thinking",
  "Team Collaboration",
  "Leadership",
  "System Design",
  "Communication",
  "Technical Documentation",
  "Project Coordination",
  "User Research",
  "Usability Testing",
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 lg:py-32 bg-muted/30">
      <div ref={ref} className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium mb-4">What I Do</p>
          <h2 className="section-heading mb-6">Skills & Expertise</h2>
          <p className="section-subheading max-w-2xl mx-auto">
            A comprehensive toolkit built through years of learning and hands-on experience.
          </p>
        </motion.div>

        {/* Technical Skills */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: categoryIndex * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ y: -4 }}
              className="card-minimal p-6"
            >
              <h3 className="text-lg font-serif font-medium text-foreground mb-6">
                {category.title}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-foreground">{skill.name}</span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.8 + categoryIndex * 0.1 + skillIndex * 0.1 }}
                        className="text-xs text-muted-foreground"
                      >
                        {skill.level}%
                      </motion.span>
                    </div>
                    <div className="skill-bar-minimal">
                      <motion.div
                        className="skill-bar-fill-minimal"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{
                          duration: 1.2,
                          delay: 0.3 + categoryIndex * 0.1 + skillIndex * 0.1,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">Also skilled in</p>
          <div className="flex flex-wrap justify-center gap-3">
            {softSkills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.6 + index * 0.05,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="tag-minimal cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
