export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: ContentBlock[];
}

export const posts: Post[] = [
  {
    slug: "how-astra-picks-a-sort-algorithm",
    title: "How ASTRA Picks a Sort Algorithm in O(n)",
    excerpt:
      "General-purpose sorts are built to be reasonably fast on any input — which means they're rarely the fastest on any specific one. Here's how a decision tree closes that gap.",
    date: "2026-03-14",
    readTime: "6 min read",
    tags: ["Algorithms", "C++", "Statistics"],
    content: [
      {
        type: "p",
        text: "Most of the time, std::sort is the right call. It's a well-engineered introsort that degrades gracefully and rarely embarrasses you. But 'rarely embarrasses you' and 'fastest possible' are different goals, and for my thesis I wanted to know how much was actually left on the table by treating every input the same way.",
      },
      { type: "h2", text: "Structure is information" },
      {
        type: "p",
        text: "Real datasets aren't uniformly random. Log files are nearly time-ordered. Categorical columns have a handful of distinct values repeated millions of times. Sensor readings drift slowly rather than jumping randomly. Each of those patterns is exploitable — if you know about it before you start sorting.",
      },
      {
        type: "p",
        text: "ASTRA computes three signals in a single O(n) pass over the input: entropy (how unpredictable the key distribution is), presortedness (how close the data already is to sorted order), and distribution shape (cardinality and skew of the key space). Those three numbers get fed into a trained decision tree that routes to one of several candidate algorithms.",
      },
      { type: "h2", text: "Why a decision tree and not a heuristic if-else chain" },
      {
        type: "p",
        text: "I started with hand-written thresholds — 'if presortedness > 0.8, use insertion sort' — and they worked, but they were brittle at the boundaries and didn't generalize well across different data sizes. Training a shallow decision tree on synthetic benchmarks let the boundaries emerge from data instead of guesswork, and kept inference cheap enough to stay effectively O(n) overall.",
      },
      { type: "h2", text: "Results, and the honest caveat" },
      {
        type: "p",
        text: "Across 10⁷-element benchmarks, ASTRA delivered a 1.98× average speedup over std::sort, with peak gains of 8,948× on inputs where the exploitable structure was extreme (near-duplicate-heavy, highly presorted). I validated the gains weren't noise using ANOVA and Kruskal-Wallis testing across repeated runs.",
      },
      {
        type: "quote",
        text: "The honest caveat: the decision tree is trained on synthetic distributions. Production data drifts, and a natural next step is testing whether the tree needs to be updated online rather than retrained from scratch.",
      },
      {
        type: "p",
        text: "You can walk through a simplified version of the decision logic yourself on the ASTRA case study page — adjust presortedness and entropy and watch which algorithm gets selected.",
      },
    ],
  },
  {
    slug: "raw-ppg-signal-to-hrv-features",
    title: "Turning a Raw PPG Signal Into 16 HRV Features",
    excerpt:
      "A wrist-worn sensor at 25 Hz produces a noisy, drifting waveform. Here's the signal-processing pipeline that turns it into something a model can actually use.",
    date: "2026-02-02",
    readTime: "7 min read",
    tags: ["Signal Processing", "Python", "ML"],
    content: [
      {
        type: "p",
        text: "StrokeSense started with a simple hardware question: can a $15 MAX30102 sensor and an ESP32 capture a photoplethysmography (PPG) signal good enough to extract clinically meaningful heart-rate variability features? The hardware answer was yes — but only after a fair amount of signal processing.",
      },
      { type: "h2", text: "The raw signal is mostly noise" },
      {
        type: "p",
        text: "At 25 Hz sampling, the raw PPG trace is dominated by two things you don't want: slow baseline wander from motion and skin contact pressure, and high-frequency noise from the sensor's optical front end. The heartbeat itself lives in a fairly narrow frequency band — roughly 0.5 to 8.0 Hz, covering resting to elevated heart rates.",
      },
      { type: "h2", text: "Butterworth bandpass filtering" },
      {
        type: "p",
        text: "A Butterworth bandpass filter tuned to 0.5-8.0 Hz removes both problems at once: the low cutoff kills baseline wander, the high cutoff kills sensor noise, and what's left is a clean quasi-periodic waveform tracking the actual pulse.",
      },
      { type: "h2", text: "From waveform to features" },
      {
        type: "p",
        text: "A clean waveform still isn't a feature vector. The pipeline extracts 16 heart-rate-variability (HRV) features from the filtered signal, split across two families:",
      },
      {
        type: "list",
        items: [
          "Time-domain: SDNN (overall variability), RMSSD (short-term variability), pNN50 (percentage of successive interval differences over 50ms)",
          "Frequency-domain: LF/HF ratio via Welch power spectral density (PSD) estimation, capturing the balance between sympathetic and parasympathetic nervous system activity",
        ],
      },
      { type: "h2", text: "Where it goes next" },
      {
        type: "p",
        text: "Those 16 features feed a Markov-Switching Random Forest (MSRF) — a random forest whose behavior adapts based on an underlying hidden Markov state, which matters because HRV signatures shift between physiological regimes like rest and exertion. The model was validated against a 45-patient dataset labeled with the CHA₂DS₂-VASc stroke-risk score.",
      },
      {
        type: "quote",
        text: "45 patients is enough to validate the pipeline end-to-end, not enough to trust the model's generalization. That's the honest scope of this project as it stands.",
      },
    ],
  },
  {
    slug: "trustworthy-ai-generated-dashboards",
    title: "What Building an AI Excel Dashboard Generator Taught Me About Trustworthy AI Outputs",
    excerpt:
      "The easiest way to make an AI-generated dashboard wrong is to let the model compute the numbers. Here's the deterministic-first architecture DataMind uses instead.",
    date: "2026-01-10",
    readTime: "5 min read",
    tags: ["Data Analytics", "LLMs", "Python"],
    content: [
      {
        type: "p",
        text: "DataMind takes a raw spreadsheet and turns it into a downloadable, formula-driven Excel BI dashboard — KPI cards, native charts, a plain-language summary. The obvious way to build that is to hand the dataset to an LLM and ask it to write the dashboard. I didn't do that, on purpose.",
      },
      { type: "h2", text: "LLMs are good at judgment, bad at arithmetic at scale" },
      {
        type: "p",
        text: "Ask a language model to summarize what matters in a dataset and it does a genuinely good job — it can spot that revenue by region is more interesting than revenue by row number. Ask it to compute the actual sum of a 50,000-row column and you're trusting next-token prediction to do exact arithmetic, which is the wrong tool for the job even when it happens to get the number right.",
      },
      { type: "h2", text: "The split: deterministic compute, judgment-only generation" },
      {
        type: "p",
        text: "DataMind profiles the dataset deterministically with pandas — every KPI, every chart data point is computed directly against the real data with real arithmetic. Gemini is only used for the part language models are actually good at: given the profiled dataset, deciding which KPIs and chart types are worth surfacing, and writing the plain-language summary around numbers that were already computed correctly.",
      },
      {
        type: "list",
        items: [
          "pandas computes every number that appears in the output",
          "The LLM chooses which numbers matter and how to explain them",
          "openpyxl assembles the actual formula-driven Excel file, so the numbers stay live and auditable",
        ],
      },
      { type: "h2", text: "Why this matters beyond one project" },
      {
        type: "p",
        text: "This is a pattern I'd apply to any AI feature that touches numbers a person will act on: separate 'what should we highlight' (a judgment call, good LLM use case) from 'what is the actual value' (a computation, bad LLM use case). It's a small architectural decision, but it's the difference between a dashboard people trust and one they have to double-check.",
      },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}
