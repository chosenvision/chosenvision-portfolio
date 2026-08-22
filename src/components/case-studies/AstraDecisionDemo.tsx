import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Distribution = "random" | "nearly-sorted" | "reversed" | "few-unique";

const distributions: { id: Distribution; label: string }[] = [
  { id: "random", label: "Uniform random" },
  { id: "nearly-sorted", label: "Nearly sorted" },
  { id: "reversed", label: "Reversed" },
  { id: "few-unique", label: "Few unique values" },
];

function selectAlgorithm(distribution: Distribution, presortedness: number, entropy: number) {
  if (distribution === "few-unique" || entropy < 25) {
    return {
      algo: "Counting / Radix Sort",
      reason:
        "Low key cardinality or entropy — the tree buckets the small set of distinct keys directly instead of paying for comparisons.",
    };
  }
  if (distribution === "nearly-sorted" || presortedness > 70) {
    return {
      algo: "Insertion Sort",
      reason:
        "High presortedness — insertion sort's near-linear behavior on almost-ordered runs beats a general-purpose sort here.",
    };
  }
  if (distribution === "reversed") {
    return {
      algo: "Reverse-aware Merge Pass",
      reason:
        "Strong inverse ordering detected — a single reversal pass collapses most of the disorder before a lightweight merge finishes the job.",
    };
  }
  return {
    algo: "Introsort (std::sort fallback)",
    reason:
      "High entropy, no exploitable structure — the tree falls back to a general-purpose introsort, same as the std::sort baseline.",
  };
}

const AstraDecisionDemo = () => {
  const [distribution, setDistribution] = useState<Distribution>("random");
  const [presortedness, setPresortedness] = useState(20);
  const [entropy, setEntropy] = useState(80);

  const result = useMemo(
    () => selectAlgorithm(distribution, presortedness, entropy),
    [distribution, presortedness, entropy]
  );

  return (
    <div className="card-minimal p-6 md:p-8">
      <p className="text-xs font-medium text-primary uppercase tracking-wide mb-2">Interactive demo</p>
      <h3 className="font-serif text-xl text-foreground mb-2">Walk the decision tree</h3>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        A simplified illustration of the selection logic — adjust the input characteristics and see
        which algorithm ASTRA's decision tree would route to. The real thesis model was trained on
        entropy, presortedness, and distribution-shape features across 10⁷-element benchmarks.
      </p>

      <div className="space-y-6">
        <div>
          <p className="text-sm font-medium text-foreground mb-3">Distribution shape</p>
          <div className="flex flex-wrap gap-2">
            {distributions.map((d) => (
              <button
                key={d.id}
                onClick={() => setDistribution(d.id)}
                className={`px-3.5 py-2 rounded-full text-xs font-medium transition-colors border ${
                  distribution === d.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-foreground font-medium">Presortedness</span>
            <span className="text-muted-foreground">{presortedness}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={presortedness}
            onChange={(e) => setPresortedness(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-foreground font-medium">Key entropy</span>
            <span className="text-muted-foreground">{entropy}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={entropy}
            onChange={(e) => setEntropy(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={result.algo}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="mt-6 rounded-2xl bg-primary/5 border border-primary/20 p-5"
        >
          <p className="text-xs text-muted-foreground mb-1">Selected algorithm</p>
          <p className="text-lg font-serif text-foreground mb-2">{result.algo}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{result.reason}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AstraDecisionDemo;
