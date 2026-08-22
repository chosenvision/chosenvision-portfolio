import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AstraDecisionDemo from "@/components/case-studies/AstraDecisionDemo";
import AstraResultsChart from "@/components/case-studies/AstraResultsChart";

const tags = ["C++", "Statistics", "ANOVA", "Kruskal-Wallis", "Decision Trees", "Thesis"];

const AstraCaseStudy = () => {
  useEffect(() => {
    document.title = "ASTRA Case Study — Kristhian Pinili";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-primary font-medium mb-4">Case Study · Thesis</p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              ASTRA: Adaptive Sorting with Tree-Based Algorithm Selection
            </h1>
            <p className="section-subheading mb-8">
              An O(n) decision-tree framework that reads real-time data biases — entropy,
              presortedness, and distribution shape — to dynamically pick the fastest sorting
              algorithm for the data actually in front of it, instead of using one general-purpose
              sort for everything.
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {tags.map((tag) => (
                <span key={tag} className="tag-minimal text-xs">
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="https://github.com/chosenvision"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2 mb-16"
            >
              <Github size={16} />
              View on GitHub
            </a>
          </motion.div>

          <div className="space-y-12">
            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">The problem</h2>
              <p className="text-muted-foreground leading-relaxed">
                General-purpose sorts like <code>std::sort</code> are built to be reasonably fast on
                any input, which means they're rarely the fastest option on any specific input.
                Real-world datasets are often nearly sorted, low-cardinality, or otherwise
                structured — and that structure is wasted if the algorithm doesn't know to look for
                it. ASTRA's premise: measure the structure first, then route to the algorithm built
                for it.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">Approach</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Three features drive the routing decision, each computed in O(n) as a single pass
                over the data:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-medium">Entropy</span>
                  <span>— how unpredictable the key distribution is.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-medium">Presortedness</span>
                  <span>— how close the input already is to sorted order.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-medium">Distribution shape</span>
                  <span>— cardinality and skew of the key space.</span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                A trained decision tree maps those three features to one of several candidate
                algorithms, so the routing overhead stays linear even as the framework scales to
                10⁷-element inputs.
              </p>
            </section>

            <section>
              <AstraDecisionDemo />
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">Results</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Benchmarked against <code>std::sort</code> across 10⁷-element inputs and validated
                with ANOVA and Kruskal-Wallis testing to confirm the gains weren't noise.
              </p>
              <AstraResultsChart />
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">What I'd do differently</h2>
              <p className="text-muted-foreground leading-relaxed">
                The decision tree is trained on synthetic distributions; a natural next step is
                validating it against real production datasets where distribution shape drifts over
                time, and exploring whether the tree itself can be updated online rather than
                retrained from scratch.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AstraCaseStudy;
