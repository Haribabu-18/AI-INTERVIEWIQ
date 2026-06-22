import React, { useState } from "react";
import { Eye, X } from "lucide-react";

const EXCLUDED_KEYS = ["_id", "userId", "__v"];

const formatKey = (key) =>
  key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

const formatValue = (value) => {
  if (value === null || value === undefined) return "N/A";
  if (Array.isArray(value)) return value.length ? value.join(", ") : "N/A";
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  return value.toString();
};

function InterviewHistoryCards({ Interview }) {
  const [selectedInterview, setSelectedInterview] = useState(null);

  return (
    <div className="relative">
     {/* card grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Interview?.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
          >
            {/* Stack */}
            <div className="mb-4">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                Stack
              </p>
              <h3 className="text-lg font-semibold text-gray-800">
                {item.stack}
              </h3>
            </div>

            {/* Difficulty */}
            <div className="mb-4">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                Difficulty
              </p>
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                {item.difficultyLevel}
              </span>
            </div>

            {/* Scores */}
            <div className="flex gap-6 mb-5">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                  Technical
                </p>
                <p className="text-xl font-bold text-green-600">
                  {item.technicalScore}
                  <span className="text-sm font-normal text-gray-400">/10</span>
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                  Communication
                </p>
                <p className="text-xl font-bold text-purple-600">
                  {item.communicationScore}
                  <span className="text-sm font-normal text-gray-400">/5</span>
                </p>
              </div>
            </div>

            {/* Read More */}
            <button
              onClick={() => setSelectedInterview(item)}
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <Eye size={16} />
              Read More
            </button>
          </div>
        ))}
      </div>

     {/* pop up  */}
      {selectedInterview && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
          onClick={(e) =>
            e.target === e.currentTarget && setSelectedInterview(null)
          }
        >
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
              <h2 className="text-lg font-semibold text-gray-800">
                Interview Details
              </h2>
              <button
                onClick={() => setSelectedInterview(null)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-6 py-4 space-y-4">
              {Object.entries(selectedInterview)
                .filter(([key]) => !EXCLUDED_KEYS.includes(key))
                .map(([key, value]) => (
                  <div
                    key={key}
                    className="flex flex-col gap-1 border-b border-gray-100 pb-3 last:border-0"
                  >
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                      {formatKey(key)}
                    </p>
                    <p className="text-gray-700 text-sm break-words">
                      {formatValue(value)}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InterviewHistoryCards;