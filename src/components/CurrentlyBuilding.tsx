import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Radio } from "lucide-react";

const nowBuilding = [
  {
    status: "Shipping",
    title: "DevOS",
    detail: "Adding an AI-assisted Career Agent — job matching, application funnel, interview tracking.",
    href: "https://devos-ochre.vercel.app",
  },
  {
    status: "Shipping",
    title: "AgentFlow",
    detail: "Hardening the durable DAG execution engine — retries, replay, multi-tenant RBAC.",
    href: "https://github.com/chosenvision/AgentFlow",
  },
  {
    status: "In progress",
    title: "DataMind",
    detail: "Expanding deterministic KPI profiling so every chart is grounded in the real dataset, never hallucinated.",
    href: "https://data-mind-sigma.vercel.app",
  },
];

const currentlyLearning = ["MLOps & model monitoring", "Distributed systems", "LLM evaluation design"];

const CurrentlyBuilding = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="now" className="py-24 lg:py-32 bg-muted/30">
      <div ref={ref} className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium mb-4 inline-flex items-center gap-2">
            <Radio size={14} className="animate-pulse" />
            Right Now
          </p>
          <h2 className="section-heading mb-6">What I'm Building</h2>
          <p className="section-subheading max-w-2xl mx-auto">
            A snapshot of what's actively in progress — not just the finished portfolio pieces.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {nowBuilding.map((item, index) => (
            <motion.a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group card-minimal p-6 flex flex-col"
            >
              <span className="inline-flex items-center gap-1.5 self-start mb-4 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-medium">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                </span>
                {item.status}
              </span>
              <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors mb-2 flex items-center gap-1.5">
                {item.title}
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">Currently learning</p>
          <div className="flex flex-wrap justify-center gap-3">
            {currentlyLearning.map((topic) => (
              <span key={topic} className="tag-minimal">
                {topic}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CurrentlyBuilding;
