"use client";

import { motion } from "framer-motion";

const EASE  = [0.16, 1, 0.3, 1] as [number, number, number, number];
const DARK  = "#1A1008";
const CREAM = "#F5EDD8";
const GOLD  = "#C9A84C";

/* All cells stay within the 3-color palette:
   dark bg + cream/gold pattern overlays only */
const cells = [
  { id: 1, label: "Thiéboudienne", shade: "rgba(28,16,9,1)",  pattern: "diamonds" },
  { id: 2, label: "Notre salle",   shade: "rgba(20,12,6,1)",  pattern: "circles"  },
  { id: 3, label: "Epices",        shade: "rgba(35,20,10,1)", pattern: "lines"    },
  { id: 4, label: "Ndolé",         shade: "rgba(16,10,5,1)",  pattern: "diamonds" },
  { id: 5, label: "Desserts",      shade: "rgba(26,15,8,1)",  pattern: "circles"  },
];

function CellPattern({ type }: { type: string }) {
  if (type === "diamonds") return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18 }}
      viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {[0,1,2,3].map(r => [0,1,2,3].map(c => (
        <polygon key={`${r}-${c}`}
          points={`${c*50+25},${r*50} ${c*50+50},${r*50+25} ${c*50+25},${r*50+50} ${c*50},${r*50+25}`}
          fill="none" stroke={CREAM} strokeWidth="1" />
      )))}
    </svg>
  );
  if (type === "circles") return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }}
      viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {[0,1,2,3].map(r => [0,1,2,3].map(c => (
        <circle key={`${r}-${c}`} cx={c*50+25} cy={r*50+25} r={16} fill="none" stroke={CREAM} strokeWidth="1.2" />
      )))}
    </svg>
  );
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }}
      viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {Array.from({length:9}).map((_,i) => (
        <line key={i} x1="0" y1={i*22} x2="200" y2={i*22+40} stroke={GOLD} strokeWidth="1.5" />
      ))}
    </svg>
  );
}

export default function Gallery() {
  return (
    <section id="galerie" style={{ background: DARK }}>
      <div style={{
        maxWidth: 1400, margin: "0 auto",
        padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,3.5rem)",
      }}>
        <motion.h2
          className="font-serif"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            fontSize: "clamp(2.8rem,5vw,4.5rem)", fontWeight: 300, fontStyle: "italic",
            color: CREAM, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: "3rem",
          }}
        >
          Un aperçu de<br />
          <span style={{ color: GOLD }}>notre univers.</span>
        </motion.h2>

        {/* Desktop asymmetric grid */}
        <style>{`
          @media (min-width: 768px) {
            .gallery-desktop { display: grid !important; }
            .gallery-mobile  { display: none  !important; }
            .gc-1 { grid-area: 1 / 1 / 3 / 5; }
            .gc-2 { grid-area: 1 / 5 / 2 / 8; }
            .gc-3 { grid-area: 1 / 8 / 2 / 12; }
            .gc-4 { grid-area: 2 / 5 / 3 / 9; }
            .gc-5 { grid-area: 2 / 9 / 3 / 12; }
          }
        `}</style>

        <div className="gallery-desktop" style={{
          display: "none",
          gridTemplateColumns: "repeat(11, 1fr)",
          gridTemplateRows: "repeat(2, 240px)",
          gap: 8,
        }}>
          {cells.map((cell, i) => (
            <motion.div
              key={cell.id}
              className={`gc-${cell.id}`}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
              style={{
                background: cell.shade, position: "relative", overflow: "hidden",
                display: "flex", alignItems: "flex-end", padding: "1rem 0.875rem",
              }}
            >
              <CellPattern type={cell.pattern} />
              {/* Gold top line accent on each cell */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `rgba(201,168,76,0.18)` }} />
              <span style={{
                position: "relative", fontSize: 11, fontWeight: 400,
                color: `rgba(245,237,216,0.5)`, letterSpacing: "0.08em", textTransform: "uppercase",
              }}>
                {cell.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Mobile 2-col */}
        <div className="gallery-mobile" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {cells.map((cell, i) => (
            <motion.div
              key={cell.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
              style={{
                height: 160, background: cell.shade, position: "relative", overflow: "hidden",
                gridColumn: cell.id === 1 ? "span 2" : "span 1",
              }}
            >
              <CellPattern type={cell.pattern} />
            </motion.div>
          ))}
        </div>

        <p style={{ marginTop: "2rem", fontSize: 12, color: `rgba(245,237,216,0.25)`, textAlign: "center" }}>
          Photos disponibles bientot. Venez vivre l&apos;experience en salle.
        </p>
      </div>
    </section>
  );
}
