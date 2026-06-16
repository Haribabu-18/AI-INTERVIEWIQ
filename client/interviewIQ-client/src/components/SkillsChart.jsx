// components/SkillsChart.tsx
import { Pie, PieChart, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: ["React","DSA", "oops"], value: 40 },
  { name: ["JavaScript", "Nodejs"], value: 60 },
];

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

export default function SkillsChart() {
  return (
    <div className="flex h-full w-full flex-col rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3">
        <h3 className="text-base font-semibold text-slate-800">Skills Breakdown</h3>
        <p className="text-xs text-slate-500">Distribution of evaluated skills</p>
      </div>

      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="55%"
              outerRadius="80%"
              paddingAngle={2}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="white" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                fontSize: 12,
              }}
            />
            <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
