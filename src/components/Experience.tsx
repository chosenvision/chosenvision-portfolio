import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    title: "Website Development Intern",
    company: "National Transmission Corporation",
    type: "Internship",
    description:
      "Created a comprehensive ticketing system for the IT/IS Division, improving workflow and response times for technical support.",
  },
  {
    title: "Quality Assurance Intern",
    company: "Freelance Contract",
    type: "Contract",
    description:
      "Responsible for identifying issues, creating test cases, and performing manual testing to ensure quality standards before releases.",
  },
  {
    title: "Casting Agent",
    company: "Freelance Contract",
    type: "Contract",
    description:
      "Worked with directors and producers to scout talent, coordinate auditions, and manage schedules for film and TV productions.",
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
        <div className="max-w-3xl mx-auto space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-minimal p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-primary">{exp.company}</p>
                </div>
                <span className="tag-minimal self-start">{exp.type}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
