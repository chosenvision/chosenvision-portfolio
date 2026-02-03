import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, GraduationCap, Users, Shield, Network, Briefcase, Brain } from "lucide-react";

const certifications = [
  {
    title: "AWS Machine Learning",
    description: "AWS Machine Learning Specialty - Building, training, and deploying ML models on AWS",
    icon: Brain,
    featured: true,
  },
  {
    title: "Academic Excellence",
    description: "Consistent Honor Student & Dean's Lister at Batangas State University",
    icon: GraduationCap,
  },
  {
    title: "TESDA Certified",
    description: "Computer System Servicing NCII - Best in CSS",
    icon: Award,
  },
  {
    title: "CCNAv7 Networking",
    description: "Cisco Networking Academy - IP addressing, topologies, and routing protocols",
    icon: Network,
  },
  {
    title: "Cybersecurity",
    description: "BitCon Seminar - Threat detection and data protection strategies",
    icon: Shield,
  },
  {
    title: "Leadership",
    description: "Multiple student leadership roles including SSG Officer",
    icon: Users,
  },
  {
    title: "Career Development",
    description: "Transcending: Work Placement and Career Orientation Seminar",
    icon: Briefcase,
  },
];

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium mb-4">Achievements</p>
          <h2 className="section-heading mb-6">Certifications</h2>
          <p className="section-subheading max-w-2xl mx-auto">
            Recognized accomplishments that validate my skills and dedication.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`card-minimal p-6 ${
                cert.featured ? "ring-2 ring-primary/20 bg-primary/5" : ""
              }`}
            >
              {/* Icon & Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  cert.featured ? "bg-primary/20" : "bg-muted"
                }`}>
                  <cert.icon className={`w-6 h-6 ${cert.featured ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                {cert.featured && (
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    New
                  </span>
                )}
              </div>

              {/* Content */}
              <h4 className={`font-medium mb-2 ${cert.featured ? "text-primary" : "text-foreground"}`}>
                {cert.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {cert.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
