import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Briefcase, Award, Heart } from "lucide-react";

const stats = [
  { value: "7+", label: "Projects Completed", icon: Code2 },
  { value: "4+", label: "Programming Languages", icon: Briefcase },
  { value: "4+", label: "Certifications", icon: Award },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
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
            About
            <span className="text-primary">/&gt;</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Passionate about creating meaningful solutions that make a real impact.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-card rounded-xl p-6 glow-border">
              <p className="text-lg leading-relaxed text-muted-foreground font-mono">
                I'm a passionate junior software engineer currently pursuing a Bachelor of Science in Computer Science 
                at <span className="text-primary">Batangas State University</span>, where I maintain my status as a{" "}
                <span className="text-primary">Dean's Lister</span>. My journey in technology 
                is driven by a desire to create meaningful solutions that make a real impact.
              </p>
            </div>

            <div className="glass-card rounded-xl p-6 glow-border">
              <p className="text-lg leading-relaxed text-muted-foreground font-mono">
                Beyond coding, I'm actively involved in humanitarian efforts through{" "}
                <span className="text-primary">"Just Shut Up and Love"</span> and 
                participate in <span className="text-primary">TechnoFusion</span> workshops to advance my software engineering skills. I believe in 
                continuous learning and giving back to the community.
              </p>
            </div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid sm:grid-cols-2 gap-4"
            >
              <div className="glass-card rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Problem Solver</h4>
                  <p className="text-sm text-muted-foreground font-mono">Detail-oriented approach</p>
                </div>
              </div>

              <div className="glass-card rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Community Driven</h4>
                  <p className="text-sm text-muted-foreground font-mono">Giving back always</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="glass-card rounded-xl p-6 text-center glow-border group hover:border-primary/50 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary text-glow font-display mb-2">
                  {stat.value}
                </div>
                <p className="text-muted-foreground font-mono text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
