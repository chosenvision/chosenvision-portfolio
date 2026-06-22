import { motion } from "framer-motion";
import { Github } from "lucide-react";

const GitHubStats = () => {
  const user = "chosenvision";
  // github-readme-stats supports light/dark via theme query; we render both and rely on CSS dark variant.
  return (
    <section id="github" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-primary font-medium mb-3 flex items-center justify-center gap-2">
            <Github size={16} /> Live from GitHub
          </p>
          <h2 className="section-heading mb-3">Open-Source Activity</h2>
          <p className="section-subheading max-w-2xl mx-auto">
            Real-time stats from my GitHub — I ship consistently, not just on demand.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid md:grid-cols-2 gap-6 items-stretch"
        >
          <a
            href={`https://github.com/${user}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-minimal p-4 flex items-center justify-center hover:border-primary/40 transition-colors"
          >
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&hide_border=true&include_all_commits=true&count_private=true&theme=default&icon_color=C2410C&title_color=C2410C`}
              alt={`${user} GitHub stats`}
              loading="lazy"
              className="w-full max-w-[460px]"
            />
          </a>
          <a
            href={`https://github.com/${user}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-minimal p-4 flex items-center justify-center hover:border-primary/40 transition-colors"
          >
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=compact&hide_border=true&theme=default&title_color=C2410C&langs_count=8`}
              alt={`${user} top languages`}
              loading="lazy"
              className="w-full max-w-[460px]"
            />
          </a>
          <a
            href={`https://github.com/${user}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-minimal p-4 flex items-center justify-center md:col-span-2 hover:border-primary/40 transition-colors"
          >
            <img
              src={`https://github-readme-streak-stats.herokuapp.com/?user=${user}&hide_border=true&ring=C2410C&fire=C2410C&currStreakLabel=C2410C`}
              alt={`${user} contribution streak`}
              loading="lazy"
              className="w-full max-w-[700px]"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats;
