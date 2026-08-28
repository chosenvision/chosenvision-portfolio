import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, FileText, Globe, BookOpen } from "lucide-react";
import TiltCard from "./TiltCard";

const featuredProjects = [
  {
    title: "StrokeSense — IoT PPG Device with ML-Based Stroke Risk Detection",
    description:
      "Lead Data Pipeline & Frontend Dev — Engineered a full medical pipeline: ESP32 + MAX30102 at 25 Hz → Butterworth bandpass (0.5–8.0 Hz) → 16-feature HRV extraction → MSRF (Markov-Switching Random Forest) inference, validated on a 45-patient CHA₂DS₂-VASc-labeled dataset. Backed by a 24-table Convex cloud DB processing ~180 requests / 60s session.",
    tags: ["Python", "ML", "MSRF", "HMM", "ESP32", "Flutter", "Convex"],
    github: "https://github.com/chosenvision",
    caseStudy: "/case-studies/stroke-sense",
  },
  {
    title: "DevOS — Personal Developer Operating System",
    description:
      "Full-Stack Developer — One place to run projects, tasks, time tracking, learning, and career tools, backed by an AI-assisted Career Agent (job matching, application funnel, interview tracking). Built on Next.js 16 (App Router, Turbopack) and Supabase (Postgres, Auth, Storage) with TanStack Query and Zustand.",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind", "TanStack Query"],
    live: "https://devos-ochre.vercel.app",
    github: "https://github.com/chosenvision/DevOS",
    docs: "https://github.com/chosenvision/DevOS/blob/HEAD/ARCHITECTURE.md",
  },
  {
    title: "DataMind — AI Excel Dashboard Generator",
    description:
      "AI Data Analyst — Turns a raw dataset into a downloadable, formula-driven Excel BI dashboard: live KPI cards, native charts, a Power BI/DAX guide, and a plain-language summary. Profiles data deterministically with pandas and uses Gemini only to choose which KPIs/charts matter — every number in the output is computed against the real data, never hallucinated.",
    tags: ["Python", "Pandas", "Gemini API", "openpyxl", "Data Analytics"],
    live: "https://data-mind-sigma.vercel.app",
    github: "https://github.com/chosenvision/DataMind",
    docs: "https://github.com/chosenvision/DataMind#how-it-works",
  },
  {
    title: "AgentFlow — AI Workflow Orchestration Platform",
    description:
      "Workflow Engine Architect — Visual workflow builder (React Flow) that treats AI agents and human approvals as first-class nodes alongside APIs and conditional logic. Ships a durable DAG execution engine with BullMQ/Redis-queued async runs, live status via SSE, retries, replay, and multi-tenant RBAC.",
    tags: ["TypeScript", "React Flow", "BullMQ", "Redis", "Workflow Engine"],
    github: "https://github.com/chosenvision/AgentFlow",
    docs: "https://github.com/chosenvision/AgentFlow/blob/HEAD/docs/architecture.md",
  },
  {
    title: "ASTRA: Adaptive Sorting with Tree-Based Algorithm Selection",
    description:
      "Thesis · Lead Architect & Data Analyst — Architected an O(n) decision-tree framework that analyzes real-time data biases (entropy, presortedness, distribution) across 10⁷ data elements to dynamically select optimal sorting algorithms. Delivered a 1.98× average speedup and peak gains of 8,948× over std::sort, validated with ANOVA and Kruskal-Wallis testing.",
    tags: ["C++", "Statistics", "ANOVA", "Algorithms", "Thesis"],
    github: "https://github.com/chosenvision",
    caseStudy: "/case-studies/astra",
  },
];

const otherProjects = [
  { title: "AgriLocate", tags: ["Python", "ML"], github: "https://github.com/chosenvision/AgriLocate" },
  { title: "CryptoCrafters", tags: ["Java", "Game Dev"], github: "https://github.com/chosenvision" },
  { title: "HabitHub", tags: ["Android", "Firebase"], github: "https://github.com/chosenvision/Habit_Hub" },
  { title: "Flight Booking System", tags: ["C++"], github: "https://github.com/chosenvision/Flight-Booking-System" },
  { title: "Edu Hub", tags: ["Python"], github: "https://github.com/chosenvision" },
  { title: "Reforge: Rise of Seven Cities", tags: ["Game Dev", "C++"], github: "https://github.com/chosenvision" },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 lg:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-eyebrow mb-4">My Work</p>
          <h2 className="section-heading mb-6">Notable Projects</h2>
          <p className="section-subheading max-w-2xl mx-auto">
            A showcase of projects that demonstrate my skills and passion for creating.
          </p>
        </motion.div>

        {/* Featured project — full-width bento hero card */}
        {featuredProjects.slice(0, 1).map((project) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-6"
          >
          <TiltCard
            maxTilt={2.5}
            className="group card-minimal p-8 md:p-10 ring-1 ring-primary/10 grid md:grid-cols-[1fr_auto] gap-8 items-start"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="section-eyebrow !mb-0">Featured</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors mb-4">
                {project.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-minimal text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex md:flex-col gap-3 md:min-w-[160px] pt-1">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center gap-1.5 text-sm"
                >
                  <Globe size={14} />
                  Live Demo
                </a>
              )}
              {project.caseStudy && (
                <Link
                  to={project.caseStudy}
                  className="btn-outline inline-flex items-center justify-center gap-1.5 text-sm"
                >
                  <BookOpen size={14} />
                  Case Study
                </Link>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Repository
                <ArrowUpRight size={14} />
              </a>
            </div>
          </TiltCard>
          </motion.div>
        ))}

        {/* Remaining projects — bento grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {featuredProjects.slice(1).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group card-minimal p-8 flex flex-col ring-1 ring-primary/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-primary"
                  />
                  <h3 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-minimal text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <Globe size={14} />
                    Live Demo
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    project.live ? "text-muted-foreground hover:text-primary" : "text-foreground hover:text-primary"
                  }`}
                >
                  Repository
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                {project.docs && (
                  <a
                    href={project.docs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    <FileText size={14} />
                    Documentation
                  </a>
                )}
                {project.caseStudy && (
                  <Link
                    to={project.caseStudy}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    <BookOpen size={14} />
                    Case Study
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects - Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-sm text-muted-foreground text-center mb-6">Other Projects</p>
          <div className="overflow-hidden relative">
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />
            
            <div className="flex animate-marquee gap-6">
              {[...otherProjects, ...otherProjects].map((project, i) => (
                <a
                  key={`${project.title}-${i}`}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 group flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                >
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                    {project.title}
                  </span>
                  <div className="flex gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] text-muted-foreground whitespace-nowrap">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
