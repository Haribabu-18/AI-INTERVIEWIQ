import React, { useEffect, useState } from "react";
import TechnicalScoreChart from "../components/TechnicalScoreChart";
import SkillsChart from "../components/SkillsChart";
import InterviewHistoryTable from "../components/InterviewHistoryTable";
import axios from "axios";
import InterviewHistory from "./InterviewHistory";

export default function Dashboard() {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    fetchInterviewData();
  }, [])

  const fetchInterviewData = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post("http://localhost:4000/interview/getInterview", { token })
      console.log(response.data.interviewData, "response in interview details")
      setInterviews(response.data.interviewData);

    } catch (err) {
      console.log(err.message)
    }
  }
  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6">
      <header className="mb-4 sm:mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-sm text-slate-500">Overview of your interview performance</p>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* line chart takes 2/3 on desktop */}
        <div className="h-[360px] lg:col-span-2">
          <TechnicalScoreChart Interview={interviews} />
        </div>
        <div className="h-[360px]">
          <SkillsChart Interview={interviews} />
        </div>

        {/* table full width */}
        <div className="h-[420px] lg:col-span-3">
          <InterviewHistoryTable Interview={interviews} />
        </div>
      </div>
      {/* 👇 Interview history cards section */}
      {/* <section className="mt-6">
        <h2 className="text-lg font-semibold text-slate-700 mb-4">
          Interview History
        </h2>
        <InterviewHistory Interview={interviews} />
      </section> */}
    </div>
  );
}
