import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { BarChart3, Compass } from "lucide-react";

const skillCategories = [
  {
    title: "Data Analysis & ML",
    skills: [
      { name: "Python (NumPy, Pandas, SciPy)", level: 90 },
      { name: "Statistical Analysis (ANOVA, Kruskal-Wallis)", level: 85 },
      { name: "Feature Engineering & HRV Analysis", level: 85 },
      { name: "ML Model Training & Deployment", level: 80 },
    ],
  },
  {
    title: "Signal & Data Processing",
    skills: [
      { name: "Butterworth Bandpass Filtering", level: 85 },
      { name: "Welch PSD Estimation", level: 80 },
      { name: "CSV Pipeline Engineering", level: 90 },
      { name: "Window-Based Analysis / SNR", level: 80 },
    ],
  },
  {
    title: "Cloud & Databases",
    skills: [
      { name: "AWS (ML Specialty, EC2, S3, Lambda)", level: 85 },
      { name: "Convex / NoSQL-over-SQL", level: 80 },
      { name: "SQL / SQLite & Schema Design", level: 85 },
      { name: "FastAPI / REST APIs", level: 80 },
    ],
  },
  {
    title: "Web, Mobile & Tooling",
    skills: [
      { name: "JavaScript / React", level: 80 },
      { name: "Dart / Flutter", level: 80 },
      { name: "Git & GitHub", level: 90 },
      { name: "C++ / Java", level: 80 },
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

const radarData = skillCategories.map((category) => ({
  category: category.title,
  level: Math.round(
    category.skills.reduce((sum, s) => sum + s.level, 0) / category.skills.length
  ),
}));

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [view, setView] = useState<"bars" | "radar">("bars");

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
          <p className="section-subheading max-w-2xl mx-auto mb-8">
            A comprehensive toolkit built through years of learning and hands-on experience.
          </p>

          {/* View toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-muted border border-border">
            <button
              onClick={() => setView("bars")}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                view === "bars"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <BarChart3 size={14} />
              Breakdown
            </button>
            <button
              onClick={() => setView("radar")}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                view === "radar"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Compass size={14} />
              Overview
            </button>
          </div>
        </motion.div>

        {view === "radar" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card-minimal p-6 md:p-10 mb-16 h-[420px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="75%">
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="category"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                  axisLine={false}
                />
                <Radar
                  name="Proficiency"
                  dataKey="level"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        ) : (
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
        )}

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
