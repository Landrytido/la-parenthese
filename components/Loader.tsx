"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 400);
    const t2 = setTimeout(() => setVisible(false), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#1A1008",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.4s cubic-bezier(0.16,1,0.3,1)",
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "all",
      }}
    >
      <div style={{ position: "relative", width: 72, height: 72 }}>
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <circle cx="36" cy="36" r="33" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="36" cy="36" r="22" stroke="#B5451A" strokeWidth="1.5" opacity="0.7" />
          <polygon
            points="36,10 42,28 62,28 47,39 53,57 36,46 19,57 25,39 10,28 30,28"
            fill="none"
            stroke="#C9A84C"
            strokeWidth="0.8"
            opacity="0.5"
          />
          <circle cx="36" cy="36" r="4" fill="#C9A84C" />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            animation: "spin 1.1s linear infinite",
          }}
        >
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
            <circle cx="36" cy="36" r="33" stroke="#C9A84C" strokeWidth="1.5" strokeDasharray="8 60" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
