// import React from 'react'
// import TechnicalScoreChart from '../components/TechnicalScoreChart'
// import SkillsChart from '../components/SkillsChart'
// import InterviewHistoryTable from '../components/InterviewHistoryTable'

// function Dashboard() {
//   return (
//     <div className='h-screen flex flex-col justify-between gap-1'>
//         {/* charts */}
//         <div className='flex border-2 h-full'>
//             <TechnicalScoreChart/>
//             <SkillsChart/>

//         </div>

//         {/* table */}
//         <div className='border-2 h-full'>
//             <InterviewHistoryTable/>
//         </div>
//     </div>
//   )
// }

// export default Dashboard

// pages/Dashboard.tsx
import TechnicalScoreChart from "../components/TechnicalScoreChart";
import SkillsChart from "../components/SkillsChart";
import InterviewHistoryTable from "../components/InterviewHistoryTable";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6">
      <header className="mb-4 sm:mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-sm text-slate-500">Overview of your interview performance</p>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* line chart takes 2/3 on desktop */}
        <div className="h-[360px] lg:col-span-2">
          <TechnicalScoreChart />
        </div>
        <div className="h-[360px]">
          <SkillsChart />
        </div>

        {/* table full width */}
        <div className="h-[420px] lg:col-span-3">
          <InterviewHistoryTable />
        </div>
      </div>
    </div>
  );
}
