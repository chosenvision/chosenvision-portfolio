import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Award, Users, Shield, Network, Briefcase, Brain } from "lucide-react";

const certifications = [
  {
    title: "Academic Excellence",
    description: "Consistent Honor Student & Dean's Lister at Batangas State University",
    icon: Trophy,
    category: "Academic",
  },
  {
    title: "TESDA Certified",
    description: "Computer System Servicing NCII - Best in CSS",
    icon: Award,
    category: "Technical",
  },
  {
    title: "AWS Certified Machine Learning",
    description: "AWS Machine Learning Specialty certification - Demonstrating expertise in building, training, and deploying machine learning models on AWS",
    icon: Brain,
    category: "Cloud & ML",
    featured: true,
  },
  {
    title: "Leadership",
    description: "Multiple student leadership roles including SSG Officer and community involvement",
    icon: Users,
    category: "Soft Skills",
  },
  {
    title: "Cybersecurity",
    description: "BitCon Seminar participant - Gained insights into threat detection, data protection strategies, and emerging technologies",
    icon: Shield,
    category: "Security",
  },
  {
    title: "CCNAv7: Introduction to Networks",
    description: "Cisco Networking Academy certification focusing on IP addressing, network topologies, and routing protocols",
    icon: Network,
    category: "Networking",
  },
  {
    title: "Career Orientation Seminar",
    description: "Transcending: Work Placement seminar - Essential skills for workplace success and career development",
    icon: Briefcase,
    category: "Professional",
  },
];

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden">
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
            Achievements & Certifications
            <span className="text-primary">/&gt;</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Showcasing my certifications and achievements throughout my journey.
          </p>
        </motion.div>

        {/* Certifications grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`cert-card group ${
                cert.featured 
                  ? "ring-2 ring-primary/50 bg-gradient-to-br from-primary/10 via-card to-card" 
                  : ""
              }`}
            >
              {/* Featured badge */}
              {cert.featured && (
                <div className="absolute -top-3 -right-3">
                  <span className="px-3 py-1 text-xs font-mono rounded-full bg-primary text-primary-foreground">
                    New!
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 ${
                cert.featured 
                  ? "bg-primary/20 group-hover:bg-primary/30" 
                  : "bg-primary/10 group-hover:bg-primary/20"
              }`}>
                <cert.icon className={`w-7 h-7 ${cert.featured ? "text-primary text-glow" : "text-primary"}`} />
              </div>

              {/* Category tag */}
              <div className="flex justify-center mb-3">
                <span className="tag text-xs">{cert.category}</span>
              </div>

              {/* Content */}
              <h4 className={`text-lg font-bold font-display text-center mb-3 transition-colors ${
                cert.featured 
                  ? "text-primary text-glow" 
                  : "text-foreground group-hover:text-primary"
              }`}>
                {cert.title}
              </h4>
              <p className="text-muted-foreground font-mono text-sm text-center leading-relaxed">
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
