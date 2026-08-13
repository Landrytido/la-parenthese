"use client";

import { motion } from "framer-motion";
import { getDishById } from "@/lib/menu";

const EASE  = [0.16, 1, 0.3, 1] as [number, number, number, number];
const DARK  = "#1A1008";
const CREAM = "#F5EDD8";
const GOLD  = "#C9A84C";

const FEATURED = [
  { id: "ndole-mixte", tagline: "Le plat le plus demandé", pattern: "diamonds" },
  { id: "eru",         tagline: "Tradition camerounaise",  pattern: "circles"  },
  { id: "brochettes",  tagline: "Les saveurs du grill",    pattern: "lines"    },
];

function CardPattern({ type }: { type: string }) {
  if (type === "diamonds") return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }}
      viewBox="0 0 200 280" preserveAspectRatio="xMidYMid slice">
      {[0,1,2,3].map(r => [0,1,2,3].map(c => (
        <polygon key={`${r}-${c}`}
          points={`${c*50+25},${r*70} ${c*50+50},${r*70+35} ${c*50+25},${r*70+70} ${c*50},${r*70+35}`}
          fill="none" stroke={CREAM} strokeWidth="1" />
      )))}
    </svg>
  );
  if (type === "circles") return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.1 }}
      viewBox="0 0 200 280" preserveAspectRatio="xMidYMid slice">
      {[0,1,2,3].map(r => [0,1,2].map(c => (
        <circle key={`${r}-${c}`} cx={c*66+33} cy={r*70+35} r={24} fill="none" stroke={CREAM} strokeWidth="1.5" />
      )))}
    </svg>
  );
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.1 }}
      viewBox="0 0 200 280" preserveAspectRatio="xMidYMid slice">
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={i} x1="0" y1={i*28} x2="200" y2={i*28+40} stroke={CREAM} strokeWidth="1.5" />
      ))}
    </svg>
  );
}

export default function Specialties() {
  const cards = FEATURED.map((f, i) => {
    const dish = getDishById(f.id)!;
    return { ...f, dish, no: String(i + 1).padStart(2, "0") };
  });

  return (
    <section id="specialites" style={{ background: CREAM, position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `repeating-linear-gradient(
          45deg,
          rgba(26,16,8,0.025) 0px, rgba(26,16,8,0.025) 1px,
          transparent 1px, transparent 32px
        )`,
      }} />

      <div style={{
        maxWidth: 1400, margin: "0 auto",
        padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,3.5rem)",
        position: "relative",
      }}>
        <motion.h2
          className="font-serif"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            fontSize: "clamp(2.8rem,5vw,4.5rem)", fontWeight: 300, fontStyle: "italic",
            color: DARK, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: "4rem",
          }}
        >
          Nos <span style={{ color: GOLD }}>incontournables.</span>
        </motion.h2>

        <style>{`
          @media (min-width: 900px) {
            .spec-grid { grid-template-columns: 4fr 3fr 5fr !important; gap: 1.5rem !important; }
          }
        `}</style>
        <div className="spec-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
              whileHover={{ y: -4 }}
              style={{
                background: DARK, position: "relative", overflow: "hidden",
                padding: "2.5rem 2rem", minHeight: 260,
                display: "flex", flexDirection: "column", justifyContent: "flex-end",
                border: `1px solid rgba(245,237,216,0.06)`,
              }}
            >
              <CardPattern type={card.pattern} />

              <div className="font-serif" style={{
                position: "absolute", top: "1rem", right: "1.25rem",
                fontSize: 80, fontWeight: 700, color: `rgba(245,237,216,0.04)`,
                lineHeight: 1, userSelect: "none",
              }}>
                {card.no}
              </div>

              <div style={{ position: "absolute", top: 0, left: "2rem", width: 40, height: 2, background: GOLD }} />

              <div style={{ position: "relative" }}>
                <p style={{
                  fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
                  color: `rgba(201,168,76,0.7)`, marginBottom: "0.65rem", fontWeight: 500,
                }}>
                  {card.tagline}
                </p>
                <h3 className="font-serif" style={{
                  fontSize: "clamp(1.5rem,2.8vw,2rem)", fontWeight: 400,
                  color: CREAM, marginBottom: "0.85rem", lineHeight: 1.1,
                }}>
                  {card.dish.name.fr}
                </h3>
                <p style={{ fontSize: 13, color: `rgba(245,237,216,0.55)`, lineHeight: 1.65, fontWeight: 300 }}>
                  {card.dish.description.fr}
                </p>
                <p className="font-serif" style={{ marginTop: "1.25rem", fontSize: 18, color: GOLD, fontWeight: 500 }}>
                  {card.dish.price} €
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
