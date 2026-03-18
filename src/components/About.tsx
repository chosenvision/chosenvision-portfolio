import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Download } from "lucide-react";
import kristhianImg from "@/assets/kristhian.jpg";
import kristhianDarkImg from "@/assets/kristhian-dark.png";
import { useTheme } from "@/hooks/use-theme";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = useTheme();

  return (
    <section id="about" className="py-24 lg:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden relative group">
              <img
                src={kristhianImg}
                alt="Kristhian Pinili"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              {/* Sunglasses overlay in dark mode */}
              {theme === "dark" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="absolute inset-0 flex items-start justify-center pointer-events-none"
                  style={{ paddingTop: "22%", paddingLeft: "2%" }}
                >
                  <svg
                    width="45%"
                    viewBox="0 0 200 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-lg"
                  >
                    {/* Bridge */}
                    <path d="M85 28 C95 20, 105 20, 115 28" stroke="hsl(var(--foreground))" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                    {/* Left lens */}
                    <ellipse cx="60" cy="32" rx="38" ry="22" fill="hsl(var(--foreground) / 0.85)" stroke="hsl(var(--foreground))" strokeWidth="3" />
                    {/* Right lens */}
                    <ellipse cx="140" cy="32" rx="38" ry="22" fill="hsl(var(--foreground) / 0.85)" stroke="hsl(var(--foreground))" strokeWidth="3" />
                    {/* Left arm */}
                    <path d="M22 28 L8 24" stroke="hsl(var(--foreground))" strokeWidth="3" strokeLinecap="round" />
                    {/* Right arm */}
                    <path d="M178 28 L192 24" stroke="hsl(var(--foreground))" strokeWidth="3" strokeLinecap="round" />
                    {/* Lens shine */}
                    <ellipse cx="48" cy="26" rx="10" ry="6" fill="hsl(var(--primary) / 0.15)" />
                    <ellipse cx="128" cy="26" rx="10" ry="6" fill="hsl(var(--primary) / 0.15)" />
                  </svg>
                </motion.div>
              )}
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5, type: "spring", stiffness: 200 }}
              className="absolute -bottom-6 -right-6 lg:right-auto lg:-left-6 bg-card rounded-2xl p-5 shadow-soft-lg border border-border"
            >
              <p className="text-sm text-muted-foreground mb-1">Currently</p>
              <p className="font-medium text-foreground">BS Computer Science</p>
              <p className="text-sm text-primary">Batangas State University</p>
              <p className="text-xs text-muted-foreground mt-1">2022 – 2026</p>
            </motion.div>

            {/* LinkedIn badge */}
            <motion.a
              href="https://www.linkedin.com/in/kristhian-pinili-87665b366/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7, type: "spring" }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="absolute -top-4 right-4 bg-card rounded-xl px-4 py-2.5 shadow-soft-lg border border-border flex items-center gap-2 group"
            >
              <Linkedin size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">LinkedIn</span>
            </motion.a>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-8"
          >
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="text-primary font-medium mb-4"
              >
                About Me
              </motion.p>
              <h2 className="section-heading mb-6">
                Passionate about creating meaningful solutions
              </h2>
            </div>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                I'm a passionate software engineer currently pursuing a Bachelor of Science
                in Computer Science at Batangas State University, where I maintain my status as
                a <span className="text-foreground font-medium">Dean's Lister</span> and{" "}
                <span className="text-foreground font-medium">Consistent Honor Student</span>.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <span className="text-foreground font-medium">AWS Certified Machine Learning Specialty</span>,{" "}
                <span className="text-foreground font-medium">Cisco Certified</span>, and{" "}
                <span className="text-foreground font-medium">CSS NCII</span> holder — awarded Best in Computer System Servicing. I have a proven track record in building, training, and deploying ML models on AWS.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                Beyond coding, I'm actively involved in humanitarian efforts through
                <span className="text-foreground font-medium"> "Just Shut Up and Love"</span> and
                participate in TechnoFusion workshops to advance my skills.
              </motion.p>
            </div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-2 gap-4 pt-4"
            >
              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-4 rounded-2xl bg-muted/50 cursor-default"
              >
                <p className="font-medium text-foreground mb-1">Problem Solver</p>
                <p className="text-sm text-muted-foreground">Detail-oriented approach</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-4 rounded-2xl bg-muted/50 cursor-default"
              >
                <p className="font-medium text-foreground mb-1">Team Player</p>
                <p className="text-sm text-muted-foreground">Collaborative mindset</p>
              </motion.div>
            </motion.div>

            {/* Resume download */}
            <motion.a
              href="/Kristhian_Pinili_Resume.pdf"
              download
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn-outline inline-flex items-center gap-2"
            >
              <Download size={18} />
              Download Resume
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
