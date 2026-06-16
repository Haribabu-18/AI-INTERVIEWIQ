// components/InterviewHistoryTable.tsx

const rows = [
  {
    id: 1,
    stack: "MERN",
    difficulty: "Medium",
    date: "04/06/2026",
    technicalScore: 5,
    communicationScore: 7,
    duration: "32 min",
    status: "Completed",
  },
  {
    id: 2,
    stack: "Python / Django",
    difficulty: "Hard",
    date: "08/06/2026",
    technicalScore: 7,
    communicationScore: 8,
    duration: "45 min",
    status: "Completed",
  },
  {
    id: 3,
    stack: "Java / Spring",
    difficulty: "Hard",
    date: "10/06/2026",
    technicalScore: 8,
    communicationScore: 6,
    duration: "28 min",
    status: "Completed",
  },
  {
    id: 4,
    stack: "React / Node",
    difficulty: "Easy",
    date: "12/06/2026",
    technicalScore: 6,
    communicationScore: 9,
    duration: "38 min",
    status: "Completed",
  },
  {
    id: 5,
    stack: "Go / Microservices",
    difficulty: "Medium",
    date: "14/06/2026",
    technicalScore: 9,
    communicationScore: 8,
    duration: "50 min",
    status: "Completed",
  },
];

const scoreBadge = (score) =>
  score >= 8 ? "bg-green-100 text-green-700"
  : score >= 6 ? "bg-amber-100 text-amber-700"
  : "bg-red-100 text-red-700";

const difficultyBadge = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "bg-emerald-100 text-emerald-700";
    case "Medium":
      return "bg-amber-100 text-amber-700";
    case "Hard":
      return "bg-rose-100 text-rose-700";
  }
};

export default function InterviewHistoryTable() {
  return (
    <div className="flex h-full w-full flex-col rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3">
        <h3 className="text-base font-semibold text-slate-800">Interview History</h3>
        <p className="text-xs text-slate-500">All your past interview sessions</p>
      </div>

      <div className="min-h-0 flex-1 overflow-auto rounded-xl border">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Sq.no</th>
              <th className="px-4 py-3">Stack</th>
              <th className="px-4 py-3">Difficulty level</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Technical Score</th>
              <th className="px-4 py-3">Communication Score</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id} className={i % 2 ? "bg-white" : "bg-slate-50/40"}>
                <td className="px-4 py-3 text-slate-500">{r.id}</td>
                <td className="px-4 py-3 font-medium text-slate-800">{r.stack}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${difficultyBadge(r.difficulty)}`}>
                    {r.difficulty}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">{r.date}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${scoreBadge(r.technicalScore)}`}>
                    {r.technicalScore}/10
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${scoreBadge(r.communicationScore)}`}>
                    {r.communicationScore}/10
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">{r.duration}</td>
                <td className="px-4 py-3">
                  <button className="inline-flex h-8 items-center gap-1 rounded-md px-3 text-xs font-medium text-slate-700 hover:bg-slate-100">
                    View
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
