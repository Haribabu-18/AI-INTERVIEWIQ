import { Pie, PieChart, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function SkillsChart({ Interview }) {
  const lastInterview = Interview[Interview.length - 1];

  const data = [
    {
      name: "Strong Areas",
      value: lastInterview?.strongAreas?.length || 0,
    },
    {
      name: "Weak Areas",
      value: lastInterview?.weakAreas?.length || 0,  // ← also fixed the bug (was using strongAreas twice)
    },
  ];

  return (
    <div className="flex h-full w-full flex-col rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3">
        <h3 className="text-base font-semibold text-slate-800">Skills Breakdown</h3>
        <p className="text-xs text-slate-500">Distribution of last evaluated skills</p>
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
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.name === "Strong Areas" ? "#10b981" : "#f43f5e"}
                  stroke="white"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                fontSize: 12,
              }}
              formatter={(value, name) => {
                const skills =
                  name === "Strong Areas"
                    ? lastInterview?.strongAreas?.join(", ")
                    : lastInterview?.weakAreas?.join(", ");
                return [`${value} skills`, skills];
              }}
            />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{ fontSize: 12, color: "#64748b" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}