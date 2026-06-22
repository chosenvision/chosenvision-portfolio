import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    title: "Full Stack Developer Intern",
    company: "National Transmission Corporation",
    period: "June 2025 – August 2025",
    type: "Internship",
    bullets: [
      "Analyzed and restructured departmental data workflows — migrated fragmented email-based records to a centralized data system, reducing redundant handling by ~60% and enabling real-time retrieval across 5+ divisions.",
      "Designed data routing logic for an IT/IS Ticketing System, improving incident resolution efficiency by 25% through structured categorization and automated processing that cut manual handling time by 40%.",
      "Monitored system data integrity post-deployment, maintaining 99%+ uptime and validating data accuracy across all integrated departments with senior engineers.",
    ],
  },
  {
    title: "QA Engineer",
    company: "Kill Boring Dead",
    period: "April 2025 – June 2025",
    type: "Contract",
    bullets: [
      "Analyzed and tracked defect data across multiple concurrent client products, engineering structured test case datasets that achieved 100% critical issue detection and reduced post-launch anomalies by 30%.",
      "Applied statistical thinking to defect triage and root-cause analysis — identifying pre-release patterns that enabled proactive resolution and consistently met 100% of quality benchmarks.",
    ],
  },
  {
    title: "Casting Agent & Digital Coordinator",
    company: "ModelManagement.com",
    period: "January 2025 – June 2025",
    type: "Contract",
    bullets: [
      "Collected and analyzed talent profile data for 50+ artists, using structured intake data to match talent to project requirements.",
      "Expanded the platform's data network by 35% through systematic, data-driven recruitment.",
    ],
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 lg:py-32 bg-muted/30">
      <div ref={ref} className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium mb-4">My Journey</p>
          <h2 className="section-heading mb-6">Experience</h2>
          <p className="section-subheading max-w-2xl mx-auto">
            Building expertise through hands-on experience and continuous learning.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute left-0 md:left-8 top-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block"
          />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative md:pl-20"
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.15, type: "spring", stiffness: 300 }}
                  className="absolute left-0 md:left-[26px] top-8 w-3 h-3 rounded-full bg-primary hidden md:block"
                />

                <motion.div
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="card-minimal p-6 md:p-8"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-medium text-foreground mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-primary">{exp.company}</p>
                      {exp.period && (
                        <p className="text-sm text-muted-foreground mt-1">{exp.period}</p>
                      )}
                    </div>
                    <span className="tag-minimal self-start">{exp.type}</span>
                  </div>
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + index * 0.15 + i * 0.08 }}
                        className="text-muted-foreground leading-relaxed text-sm flex gap-2"
                      >
                        <span className="text-primary mt-1.5 shrink-0">•</span>
                        {bullet}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
