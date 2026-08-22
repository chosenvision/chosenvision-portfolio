import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";

const data = [
  { label: "std::sort (baseline)", multiplier: 1 },
  { label: "ASTRA (average)", multiplier: 1.98 },
  { label: "ASTRA (peak)", multiplier: 8948 },
];

const colors = ["hsl(var(--muted-foreground))", "hsl(var(--primary))", "hsl(var(--primary))"];

const AstraResultsChart = () => {
  return (
    <div className="card-minimal p-6 md:p-8">
      <p className="text-xs font-medium text-primary uppercase tracking-wide mb-2">Thesis results</p>
      <h3 className="font-serif text-xl text-foreground mb-2">Speedup vs. std::sort</h3>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        Measured across 10⁷-element benchmarks, validated with ANOVA and Kruskal-Wallis testing.
        Log-scaled — the peak result is nearly 4,500× larger than the average.
      </p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 24, right: 24 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
            <XAxis
              type="number"
              scale="log"
              domain={[1, 10000]}
              tickFormatter={(v) => `${v}×`}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            />
            <YAxis
              type="category"
              dataKey="label"
              width={140}
              tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
            />
            <Tooltip
              formatter={(value: number) => [`${value}×`, "Speedup"]}
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.75rem",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="multiplier" radius={[0, 8, 8, 0]}>
              {data.map((entry, index) => (
                <Cell key={entry.label} fill={colors[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AstraResultsChart;
