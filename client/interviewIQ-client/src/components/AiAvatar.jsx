import { useEffect, useRef, useState } from "react";

export default function AiAvatar({ speaking = false, thinking = false, size = 240 }) {
  const [mouthOpen, setMouthOpen] = useState(0);
  const [blink, setBlink] = useState(false);
  const rafRef = useRef(null);

  // Lip-sync while speaking
  useEffect(() => {
    if (!speaking) { setMouthOpen(0); return; }
    let last = 0;
    const tick = (t) => {
      if (t - last > 80) {
        setMouthOpen(0.25 + Math.random() * 0.75);
        last = t;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, [speaking]);

  // Auto blink
  useEffect(() => {
    let timeout;
    const schedule = () => {
      timeout = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 120);
        schedule();
      }, 2000 + Math.random() * 3000);
    };
    schedule();
    return () => clearTimeout(timeout);
  }, []);

  const eyeGlow = speaking ? "#4ade80" : "#67e8f9";
  const barCount = 5;
  const activeBars = Math.floor(mouthOpen * barCount);

  return (
    <div
      style={{ width: size, height: size * 1.1 }}
      className="relative flex items-center justify-center"
    >
      <div
        className={`absolute inset-0 rounded-full blur-2xl transition-opacity duration-500 ${
          speaking ? "opacity-70" : "opacity-30"
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.55), transparent 70%)",
        }}
      />
      <svg
        viewBox="0 0 240 280"
        className={`relative w-full h-full drop-shadow-2xl ${
          speaking ? "ai-avatar-sway" : ""
        }`}
        style={{ transformOrigin: "center bottom" }}
      >
        <defs>
          <linearGradient id="aiBody" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
          <linearGradient id="aiHead" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <radialGradient id="aiCheek" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Antenna */}
        <line x1="120" y1="25" x2="120" y2="55" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
        <circle cx="120" cy="20" r="8" fill={eyeGlow}>
          {speaking && <animate attributeName="opacity" values="0.5;1;0.5" dur="0.6s" repeatCount="indefinite" />}
        </circle>

        {/* Body */}
        <rect x="60" y="190" width="120" height="90" rx="28" fill="url(#aiBody)" />
        <rect x="80" y="210" width="80" height="50" rx="10" fill="#0f172a" />

        {speaking ? (
          <g>
            {[0,1,2,3,4,5,6].map((i) => (
              <rect key={i} x={86 + i*10} y={228} width="5" height="10" rx="2" fill="#4ade80">
                <animate attributeName="height"
                  values={`${4+Math.random()*8};${8+Math.random()*18};${4+Math.random()*8}`}
                  dur={`${0.3 + Math.random()*0.3}s`} repeatCount="indefinite" />
                <animate attributeName="y"
                  values={`${235-(4+Math.random()*6)};${235-(8+Math.random()*16)};${235-(4+Math.random()*6)}`}
                  dur={`${0.3 + Math.random()*0.3}s`} repeatCount="indefinite" />
              </rect>
            ))}
          </g>
        ) : (
          <text x="120" y="242" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="monospace">AI-V</text>
        )}

        {/* Buttons */}
        <circle cx="75" cy="200" r="5" fill="#ef4444" />
        <circle cx="90" cy="200" r="5" fill="#22c55e" />
        <circle cx="105" cy="200" r="5" fill="#3b82f6" />

        {/* Neck */}
        <rect x="105" y="180" width="30" height="12" rx="4" fill="#64748b" />

        {/* Head */}
        <rect x="45" y="55" width="150" height="130" rx="40" fill="url(#aiHead)" />
        <rect x="55" y="62" width="130" height="40" rx="20" fill="white" opacity="0.35" />

        {/* Ears */}
        <circle cx="38" cy="120" r="14" fill="#94a3b8" />
        <circle cx="202" cy="120" r="14" fill="#94a3b8" />

        {/* Cheeks */}
        <circle cx="70" cy="145" r="16" fill="url(#aiCheek)" />
        <circle cx="170" cy="145" r="16" fill="url(#aiCheek)" />

        {/* Eyes */}
        <g>
          <ellipse cx="85" cy="115" rx="22" ry="24" fill="#0f172a" />
          <ellipse cx="155" cy="115" rx="22" ry="24" fill="#0f172a" />
          <ellipse cx="85" cy="115" rx="18" ry={blink ? 1 : 20} fill="#1e293b" />
          <ellipse cx="155" cy="115" rx="18" ry={blink ? 1 : 20} fill="#1e293b" />
          {!blink && (
            <>
              <circle cx="88" cy="112" r="9" fill={eyeGlow}>
                {speaking && <animate attributeName="opacity" values="0.6;1;0.6" dur="1s" repeatCount="indefinite" />}
              </circle>
              <circle cx="158" cy="112" r="9" fill={eyeGlow}>
                {speaking && <animate attributeName="opacity" values="0.6;1;0.6" dur="1s" repeatCount="indefinite" />}
              </circle>
              <circle cx="91" cy="109" r="3" fill="white" opacity="0.9" />
              <circle cx="161" cy="109" r="3" fill="white" opacity="0.9" />
            </>
          )}
        </g>

        {/* Eyebrows */}
        <rect x="68" y="82" width="34" height="5" rx="2.5" fill={thinking ? "#fbbf24" : "#475569"} />
        <rect x="138" y="82" width="34" height="5" rx="2.5" fill={thinking ? "#fbbf24" : "#475569"} />

        {/* Mouth speaker */}
        <g>
          <rect x="90" y="155" width="60" height="26" rx="6" fill="#0f172a" />
          {Array.from({ length: barCount }).map((_, i) => {
            const h = i < activeBars ? 4 + Math.random() * 12 : 4;
            return (
              <rect key={i} x={96 + i*11} y={168 - h/2} width="6" height={h} rx="3"
                fill={speaking ? "#4ade80" : "#475569"} />
            );
          })}
        </g>

        {thinking && (
          <g>
            {[210,222,234].map((cx, i) => (
              <circle key={cx} cx={cx} cy="60" r="4" fill="#fbbf24">
                <animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s"
                  begin={`${i*0.2}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </g>
        )}
      </svg>

      <style>{`
        @keyframes ai-avatar-sway {
          0%,100% { transform: rotate(-1.2deg) translateY(0); }
          50%     { transform: rotate(1.2deg) translateY(-2px); }
        }
        .ai-avatar-sway { animation: ai-avatar-sway 2.4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
