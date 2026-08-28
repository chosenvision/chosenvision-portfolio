import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignalPipelineDemo from "@/components/case-studies/SignalPipelineDemo";

const tags = ["Python", "ML", "MSRF", "HMM", "ESP32", "Flutter", "Convex"];

const StrokeSenseCaseStudy = () => {
  useEffect(() => {
    document.title = "StrokeSense Case Study — Kristhian Pinili";
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
            <p className="section-eyebrow mb-4">Case Study · IoT + ML</p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              StrokeSense: IoT PPG Device with ML-Based Stroke Risk Detection
            </h1>
            <p className="section-subheading mb-8">
              A full medical data pipeline — from a wrist-worn PPG sensor to a stroke-risk score —
              built to turn a raw optical signal into a clinically meaningful feature set in near
              real time.
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
              <h2 className="font-serif text-2xl text-foreground mb-4">The pipeline</h2>
              <p className="text-muted-foreground leading-relaxed">
                An ESP32 paired with a MAX30102 sensor captures a photoplethysmography (PPG) signal
                at 25 Hz. That raw signal is noisy — baseline wander from motion, high-frequency
                sensor noise — so it isn't usable for feature extraction until it's cleaned up.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">Signal processing</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A Butterworth bandpass filter (0.5–8.0 Hz) removes both the slow baseline drift and
                the fast noise, isolating the heartbeat-frequency band. From the cleaned signal, the
                pipeline extracts 16 heart-rate-variability (HRV) features — time-domain (SDNN,
                RMSSD, pNN50) and frequency-domain (LF/HF ratio via Welch PSD estimation).
              </p>
            </section>

            <section>
              <SignalPipelineDemo />
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">Model & validation</h2>
              <p className="text-muted-foreground leading-relaxed">
                Those 16 features feed a Markov-Switching Random Forest (MSRF) — a random forest
                whose behavior adapts based on an underlying hidden Markov state, useful when
                physiological signals shift between regimes (e.g. rest vs. exertion). The model was
                validated on a 45-patient dataset labeled with the CHA₂DS₂-VASc stroke-risk score, a
                clinically recognized scoring system.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">Infrastructure</h2>
              <p className="text-muted-foreground leading-relaxed">
                A 24-table Convex cloud database handles ingestion and session state, sustaining
                roughly 180 requests per 60-second monitoring session. The companion mobile app is
                built in Flutter for cross-platform capture and results display.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">What I'd do differently</h2>
              <p className="text-muted-foreground leading-relaxed">
                45 patients is enough to validate the pipeline end-to-end but too small to trust the
                model's generalization — the natural next step is a larger, more demographically
                varied cohort before this could inform any real clinical decision.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StrokeSenseCaseStudy;
