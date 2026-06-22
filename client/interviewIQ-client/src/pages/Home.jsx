import React from "react";
import logoIQ from "../assets/logoIQ.png";
import heroRobot from "../assets/hero-robot.jpg";

const FEATURES = [
  { icon: "⚡", label: "React · Node · Python · Java · DSA" },
  { icon: "🎯", label: "Fresher → Senior Levels" },
  { icon: "🤖", label: "Real-Time AI Feedback" },
  { icon: "📊", label: "Performance Analytics" },
];

function FeaturePill({ icon, label }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm text-slate-600 shadow-sm backdrop-blur-md">
      <span aria-hidden>{icon}</span>
      {label}
    </span>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      {/* Ambient background glows — purely decorative */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-blue-50/80 blur-3xl" />
        <div className="absolute top-1/4 -right-32 h-[380px] w-[380px] rounded-full bg-indigo-50/70 blur-3xl" />
      </div>

      {/* Centered content column — replaces the old min-h/h-full combo that
          had nothing real to center against */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-20 lg:px-16">
        <div className="grid items-center gap-x-12 gap-y-20 lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="hero-fade-up flex flex-col items-start text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-4 py-2 text-xs font-medium text-gray-600 shadow-sm backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2976DD]" />
              Built for students chasing their first offer
            </div>

            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-br from-slate-800 via-[#2976DD] to-[#4A8BE8] bg-clip-text text-transparent">
                Nail Every
              </span>
              <br />
              <span className="text-slate-900">Interview.</span>
              <br />
              <span className="text-slate-700">Land Every Offer.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-600">
              Practice mock interviews across any stack and experience level.
              Get instant AI-powered feedback, improve communication,
              technical knowledge and confidence before your real interview.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="/new-interview"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2976DD] to-[#4A8BE8] px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/35"
              >
                Start Interview
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

              <a
                href="/dashboard"
                className="inline-flex items-center rounded-xl border border-slate-200 bg-white/60 px-8 py-4 font-semibold text-slate-700 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
              >
                View Dashboard
              </a>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="hero-fade-up hero-delay-1 relative flex justify-center">
            <div className="relative h-[420px] w-[420px]">
              {/* Glow now truly centered behind the image via inset + margin auto,
                  instead of an un-positioned absolute div */}
              <div
                aria-hidden
                className="absolute inset-0 -z-10 m-auto h-[460px] w-[460px] rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(41,118,221,0.35), transparent 70%)",
                }}
              />

              <img
                src={heroRobot}
                alt="AI interview coach"
                className="h-full w-full rounded-[40px] object-cover shadow-2xl ring-1 ring-black/5"
                style={{ boxShadow: "0 30px 80px -20px rgba(41,118,221,0.4)" }}
              />

              {/* Floating insight cards — grounded in the actual product
                  (a live question + a real-time clarity score), not generic stats */}
              <div className="hero-float-a absolute -left-8 top-8 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-md sm:flex">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2976DD] opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#2976DD]" />
                </span>
                <div>
                  <p className="text-xs font-medium text-slate-400">Now Asking</p>
                  <p className="text-sm font-semibold text-slate-800">
                    "Explain Big-O notation"
                  </p>
                </div>
              </div>

              <div className="hero-float-b absolute -right-6 bottom-10 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-md sm:flex">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  ✓
                </span>
                <div>
                  <p className="text-xs font-medium text-slate-400">Clarity Score</p>
                  <p className="text-sm font-semibold text-slate-800">
                    9.2 / 10 — Strong explanation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature row — moved into normal flow, no longer absolutely
            positioned at the viewport bottom where it could overlap content */}
        <div className="hero-fade-up hero-delay-2 mt-16 border-t border-slate-100 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {FEATURES.map((f) => (
              <FeaturePill key={f.label} icon={f.icon} label={f.label} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFloatA {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes heroFloatB {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(8px); }
        }
        .hero-fade-up {
          animation: heroFadeUp 0.7s ease-out both;
        }
        .hero-delay-1 { animation-delay: 0.15s; }
        .hero-delay-2 { animation-delay: 0.3s; }
        .hero-float-a { animation: heroFloatA 6s ease-in-out infinite; }
        .hero-float-b { animation: heroFloatB 7s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-fade-up, .hero-float-a, .hero-float-b { animation: none; }
        }
      `}</style>
    </main>
  );
}