// components/TechnicalScoreChart.tsx
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const data = [
  { interview: "Interview 1", technicalScore: 5, date: "04/06/2026" },
  { interview: "Interview 2", technicalScore: 7, date: "08/06/2026" },
  { interview: "Interview 3", technicalScore: 8, date: "10/06/2026" },
  { interview: "Interview 4", technicalScore: 6, date: "12/06/2026" },
  { interview: "Interview 5", technicalScore: 9, date: "14/06/2026" },
];

export default function TechnicalScoreChart() {
  return (
    <div className="flex h-full w-full flex-col rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3">
        <h3 className="text-base font-semibold text-slate-800">Technical Score Trend</h3>
        <p className="text-xs text-slate-500">Performance across recent interviews</p>
      </div>

      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
            <XAxis dataKey="interview" tick={{ fontSize: 12, fill: "#64748b" }} />
            <YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} tick={{ fontSize: 12, fill: "#64748b" }} />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line
              type="monotone"
              dataKey="technicalScore"
              name="Technical Score"
              stroke="#6366f1"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#6366f1" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
