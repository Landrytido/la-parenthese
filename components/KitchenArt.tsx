"use client";

/* Illustration SVG utilisée dans le Hero jusqu'au 13/08/2026, remplacée par une photo.
   Conservée ici au cas où tu voudrais y revenir — non importée actuellement. */

const DARK  = "#1A1008";
const CREAM = "#F5EDD8";
const GOLD  = "#C9A84C";

export default function KitchenArt() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 460, aspectRatio: "1/1" }}>
      <style>{`
        @keyframes orbit-slow {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbit-rev {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(-360deg);}
        }
        @keyframes steam1 {
          0%,100% { opacity:0; transform: translateY(0)   scaleX(1);   }
          50%     { opacity:.7; transform: translateY(-14px) scaleX(1.2); }
        }
        @keyframes steam2 {
          0%,100% { opacity:0; transform: translateY(0)   scaleX(1);   }
          50%     { opacity:.6; transform: translateY(-18px) scaleX(.9); }
        }
        @keyframes steam3 {
          0%,100% { opacity:0; transform: translateY(0)   scaleX(1);   }
          50%     { opacity:.5; transform: translateY(-12px) scaleX(1.1);}
        }
        .steam-a { animation: steam1 2.4s ease-in-out infinite; }
        .steam-b { animation: steam2 2.8s ease-in-out .5s infinite; }
        .steam-c { animation: steam3 2.2s ease-in-out 1s infinite; }
      `}</style>

      <svg viewBox="0 0 400 400" style={{ width: "100%", height: "100%" }} aria-label="Illustration ustensiles de cuisine africaine">

        <circle cx="200" cy="200" r="192" fill="none" stroke={`rgba(201,168,76,0.15)`} strokeWidth="1" />
        <circle cx="200" cy="200" r="185" fill="none" stroke={`rgba(201,168,76,0.08)`} strokeWidth="0.5" strokeDasharray="2 4" />

        {[0, 90, 180, 270].map(deg => {
          const rad = (deg * Math.PI) / 180;
          const cx = 200 + 185 * Math.sin(rad);
          const cy = 200 - 185 * Math.cos(rad);
          return (
            <polygon key={deg}
              points={`${cx},${cy-9} ${cx+6},${cy} ${cx},${cy+9} ${cx-6},${cy}`}
              fill={GOLD} opacity="0.6"
            />
          );
        })}

        <g style={{ transformOrigin: "200px 200px", animation: "orbit-slow 28s linear infinite" }}>

          <g transform="translate(200,42)">
            <ellipse cx="0" cy="0" rx="18" ry="13" fill={`rgba(201,168,76,0.15)`} stroke={GOLD} strokeWidth="1.5" />
            <rect x="-3" y="12" width="6" height="52" rx="3" fill={GOLD} opacity="0.75" />
            <path d="M -3 62 Q -8 70 -3 72" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          </g>

          <g transform="translate(358,200)">
            <ellipse cx="0" cy="0" rx="26" ry="14" fill={`rgba(201,168,76,0.12)`} stroke={GOLD} strokeWidth="1.5" />
            <polygon points="22,0 32,-12 36,0 32,12" fill={GOLD} opacity="0.6" />
            <path d="M -8,-14 Q 0,-24 12,-14" fill={`rgba(201,168,76,0.4)`} stroke={GOLD} strokeWidth="1" />
            <circle cx="-14" cy="-3" r="3.5" fill={GOLD} opacity="0.8" />
            <circle cx="-14" cy="-3" r="1.5" fill={DARK} />
            <path d="M -4,0 Q 2,-8 10,0" fill="none" stroke={GOLD} strokeWidth="0.8" opacity="0.4" />
            <path d="M  4,4 Q 10,-4 18,4" fill="none" stroke={GOLD} strokeWidth="0.8" opacity="0.4" />
          </g>

          <g transform="translate(200,358)">
            <path d="M -22,-6 Q -24,16 -16,20 L 16,20 Q 24,16 22,-6 Z"
              fill={`rgba(201,168,76,0.12)`} stroke={GOLD} strokeWidth="1.5" />
            <ellipse cx="0" cy="-6" rx="22" ry="7" fill={`rgba(201,168,76,0.2)`} stroke={GOLD} strokeWidth="1" />
            <rect x="-4" y="-34" width="8" height="30" rx="4" fill={GOLD} opacity="0.7" />
            <ellipse cx="0" cy="-36" rx="7" ry="5" fill={GOLD} opacity="0.75" />
          </g>

          <g transform="translate(42,200)">
            <path d="M -8,-26 Q 18,-28 22,-8 Q 20,4 6,8 Q -6,10 -12,0 Q -16,-12 -8,-26 Z"
              fill={`rgba(201,168,76,0.15)`} stroke={GOLD} strokeWidth="1.4" />
            <path d="M -14,-16 Q 12,-22 18,-4 Q 16,8 2,10 Q -8,10 -14,0 Q -18,-8 -14,-16 Z"
              fill={`rgba(201,168,76,0.1)`} stroke={GOLD} strokeWidth="1" opacity="0.7"
              transform="translate(-6,10) rotate(15)" />
            <path d="M -8,-26 Q 18,-28 22,-8"
              fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          </g>

        </g>

        <g style={{ transformOrigin: "200px 200px", animation: "orbit-rev 40s linear infinite" }}>
          <circle cx="200" cy="200" r="132" fill="none" stroke={`rgba(201,168,76,0.12)`} strokeWidth="0.5" strokeDasharray="6 10" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * 45 * Math.PI) / 180;
            const x = 200 + 132 * Math.sin(a);
            const y = 200 - 132 * Math.cos(a);
            return <polygon key={i} points={`${x},${y-4} ${x+3},${y} ${x},${y+4} ${x-3},${y}`}
              fill={GOLD} opacity="0.35" />;
          })}
        </g>

        <g transform="translate(200,200)">
          <g transform="translate(0,-68)">
            <path className="steam-a" d="M -20,0 Q -14,-8 -20,-16 Q -26,-24 -20,-32"
              fill="none" stroke={CREAM} strokeWidth="2" strokeLinecap="round" opacity="0" />
            <path className="steam-b" d="M 0,0 Q 8,-10 0,-20 Q -8,-30 0,-40"
              fill="none" stroke={CREAM} strokeWidth="2.5" strokeLinecap="round" opacity="0" />
            <path className="steam-c" d="M 20,0 Q 14,-8 20,-16 Q 26,-24 20,-32"
              fill="none" stroke={CREAM} strokeWidth="2" strokeLinecap="round" opacity="0" />
          </g>

          <ellipse cx="0" cy="-52" rx="62" ry="14" fill={`rgba(26,16,8,0.92)`} stroke={GOLD} strokeWidth="1.5" />
          <ellipse cx="0" cy="-62" rx="62" ry="14" fill={`rgba(201,168,76,0.15)`} stroke={GOLD} strokeWidth="1.5" />
          <rect x="-10" y="-78" width="20" height="14" rx="7" fill={`rgba(201,168,76,0.2)`} stroke={GOLD} strokeWidth="1.5" />

          <path d="M -58,-52 L -62,40 Q -62,55 -48,60 L 48,60 Q 62,55 62,40 L 58,-52 Z"
            fill={`rgba(26,16,8,0.88)`} stroke={GOLD} strokeWidth="2" />

          <path d="M -50,-40 Q -30,-35 -40,30"
            fill="none" stroke={CREAM} strokeWidth="1" opacity="0.08" />

          <g opacity="0.3">
            {[-30, -10, 10, 30].map(x => (
              <polygon key={x} points={`${x},-20 ${x+8},0 ${x},-20`}
                fill="none" stroke={GOLD} strokeWidth="0.8" />
            ))}
            <line x1="-50" y1="10" x2="50" y2="10" stroke={GOLD} strokeWidth="0.8" />
            <line x1="-50" y1="25" x2="50" y2="25" stroke={GOLD} strokeWidth="0.8" />
          </g>

          <path d="M -62,-20 Q -82,-20 -82,2 Q -82,22 -62,22"
            fill="none" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
          <path d="M 62,-20 Q 82,-20 82,2 Q 82,22 62,22"
            fill="none" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />

          <ellipse cx="0" cy="-52" rx="60" ry="10"
            fill={`rgba(201,168,76,0.2)`} stroke={GOLD} strokeWidth="1.5" />
        </g>

        <ellipse cx="200" cy="270" rx="65" ry="8" fill={`rgba(201,168,76,0.06)`} />
      </svg>
    </div>
  );
}
