import React, { useEffect, useState } from "react";
import InterviewHistoryCards from "../components/InterviewHistoryCards";
import axios from "axios";

export default function InterviewHistoryPage() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInterviewData();
  }, []);

  const fetchInterviewData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:4000/interview/getInterview",
        { token }
      );
      setInterviews(response.data.interviewData);
    } catch (err) {
      console.log(err.message);
      setError("Failed to load interviews. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Interview History</h1>
        <p className="text-sm text-slate-500 mt-1">
          Review all your past interviews
        </p>
      </header>

      {/* States */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <p className="text-slate-400 text-sm">Loading interviews...</p>
        </div>
      )}

      {error && !loading && (
        <div className="flex items-center justify-center py-20">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && interviews?.length === 0 && (
        <div className="flex items-center justify-center py-20">
          <p className="text-slate-400 text-sm">No interviews found.</p>
        </div>
      )}

      {/* Cards */}
      {!loading && !error && interviews?.length > 0 && (
        <InterviewHistoryCards Interview={interviews} />
      )}
    </div>
  );
}