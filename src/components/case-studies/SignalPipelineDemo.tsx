import { useMemo, useState } from "react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// Synthetic PPG-like waveform for illustration only — not real patient data.
function generateSignal() {
  const points: { t: number; raw: number; filtered: number }[] = [];
  const sampleRate = 25; // Hz, matches the ESP32 + MAX30102 capture rate
  const durationSec = 6;
  const heartHz = 1.2; // ~72 bpm

  for (let i = 0; i < sampleRate * durationSec; i++) {
    const t = i / sampleRate;
    const heartbeat = Math.sin(2 * Math.PI * heartHz * t);
    const baselineWander = 0.6 * Math.sin(2 * Math.PI * 0.1 * t);
    const noise = (Math.random() - 0.5) * 0.5;
    const raw = heartbeat + baselineWander + noise;
    const filtered = heartbeat; // Butterworth bandpass (0.5-8.0 Hz) removes wander + high-freq noise
    points.push({ t: Number(t.toFixed(2)), raw: Number(raw.toFixed(3)), filtered: Number(filtered.toFixed(3)) });
  }
  return points;
}

const exampleFeatures = [
  { name: "SDNN", value: "48.2 ms" },
  { name: "RMSSD", value: "36.7 ms" },
  { name: "pNN50", value: "18.4%" },
  { name: "LF/HF ratio", value: "1.62" },
];

const SignalPipelineDemo = () => {
  const [showFiltered, setShowFiltered] = useState(false);
  const data = useMemo(() => generateSignal(), []);

  return (
    <div className="card-minimal p-6 md:p-8">
      <p className="text-xs font-medium text-primary uppercase tracking-wide mb-2">Interactive demo</p>
      <h3 className="font-serif text-xl text-foreground mb-2">Signal pipeline, visualized</h3>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        A synthetic waveform generated for illustration — not real patient data (the actual dataset is a
        clinically labeled, IRB-appropriate 45-patient cohort). Toggle to see what a Butterworth
        bandpass (0.5–8.0 Hz) does to a noisy 25 Hz PPG capture before HRV feature extraction.
      </p>

      <div className="inline-flex items-center gap-1 p-1 rounded-full bg-muted border border-border mb-4">
        <button
          onClick={() => setShowFiltered(false)}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
            !showFiltered ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Raw signal
        </button>
        <button
          onClick={() => setShowFiltered(true)}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
            showFiltered ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Filtered (0.5–8.0 Hz)
        </button>
      </div>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="t"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              label={{ value: "seconds", position: "insideBottom", offset: -4, fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            />
            <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.75rem",
                fontSize: "12px",
              }}
            />
            <Line
              type="monotone"
              dataKey={showFiltered ? "filtered" : "raw"}
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground mb-3">
          Example HRV features extracted downstream (illustrative values, not from real patients)
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {exampleFeatures.map((f) => (
            <div key={f.name} className="rounded-xl bg-muted/60 py-3 px-2 text-center">
              <p className="text-sm font-serif text-foreground">{f.value}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{f.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignalPipelineDemo;
