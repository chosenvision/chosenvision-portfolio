import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 lg:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-primary/10 via-secondary to-muted overflow-hidden relative">
              {/* Decorative elements */}
              <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-primary/20" />
              <div className="absolute bottom-12 right-12 w-32 h-32 rounded-full bg-primary/10" />
              
              {/* Initials */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl font-serif font-medium text-primary/30">KP</span>
              </div>
            </div>
            
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 lg:right-auto lg:-left-6 bg-card rounded-2xl p-5 shadow-soft-lg border border-border"
            >
              <p className="text-sm text-muted-foreground mb-1">Currently</p>
              <p className="font-medium text-foreground">BS Computer Science</p>
              <p className="text-sm text-primary">Batangas State University</p>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <p className="text-primary font-medium mb-4">About Me</p>
              <h2 className="section-heading mb-6">
                Passionate about creating meaningful solutions
              </h2>
            </div>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                I'm a passionate junior software engineer currently pursuing a Bachelor of Science 
                in Computer Science at Batangas State University, where I maintain my status as 
                a <span className="text-foreground font-medium">Dean's Lister</span>.
              </p>
              <p>
                My journey in technology is driven by a desire to create meaningful solutions 
                that make a real impact. I believe in the power of clean code, thoughtful design, 
                and continuous learning.
              </p>
              <p>
                Beyond coding, I'm actively involved in humanitarian efforts through 
                <span className="text-foreground font-medium"> "Just Shut Up and Love"</span> and 
                participate in TechnoFusion workshops to advance my skills.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-muted/50">
                <p className="font-medium text-foreground mb-1">Problem Solver</p>
                <p className="text-sm text-muted-foreground">Detail-oriented approach</p>
              </div>
              <div className="p-4 rounded-2xl bg-muted/50">
                <p className="font-medium text-foreground mb-1">Team Player</p>
                <p className="text-sm text-muted-foreground">Collaborative mindset</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
