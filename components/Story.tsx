"use client";

import { motion } from "framer-motion";

const EASE  = [0.16, 1, 0.3, 1] as [number, number, number, number];
const DARK  = "#1A1008";
const CREAM = "#F5EDD8";
const GOLD  = "#C9A84C";

const values = [
  { title: "Authenticité", text: "Des recettes transmises de génération en génération, jamais compromises." },
  { title: "Communauté",   text: "Une table qui rassemble, célèbre et nourrit les liens entre les gens." },
  { title: "Générosité",   text: "Des portions généreuses, des saveurs franches, un accueil sans réserve." },
  { title: "Terroir",      text: "Des produits frais, sourcés localement, cuisinés avec soin chaque jour." },
];

export default function Story() {
  return (
    <section id="histoire" style={{ background: CREAM, position: "relative", overflow: "hidden" }}>
      {/* Subtle kente diagonal on cream */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `repeating-linear-gradient(
          45deg,
          rgba(26,16,8,0.03) 0px, rgba(26,16,8,0.03) 1px,
          transparent 1px, transparent 28px
        ), repeating-linear-gradient(
          -45deg,
          rgba(26,16,8,0.03) 0px, rgba(26,16,8,0.03) 1px,
          transparent 1px, transparent 28px
        )`,
      }} />

      <div style={{
        maxWidth: 1400, margin: "0 auto",
        padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,3.5rem)",
        position: "relative",
      }}>
        <style>{`
          @media (min-width: 900px) {
            .story-grid { grid-template-columns: 5fr 7fr !important; gap: 6rem !important; }
          }
        `}</style>
        <div className="story-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3.5rem", alignItems: "start" }}>

          {/* Left — decorative block on cream bg */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
            style={{ position: "relative" }}
          >
            {/* Main block — dark on cream creates contrast */}
            <div style={{
              aspectRatio: "4/5", background: DARK,
              position: "relative", overflow: "hidden", maxWidth: 420,
            }}>
              {/* Gold kente pattern on dark block */}
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.3 }}
                viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                {Array.from({ length: 11 }).map((_, i) => (
                  <rect key={i} x="0" y={i * 22 + 4} width="200" height={i % 3 === 0 ? 8 : 3}
                    fill={GOLD} opacity={i % 3 === 0 ? 0.55 : 0.25} />
                ))}
                {Array.from({ length: 9 }).map((_, i) => (
                  <rect key={i} x={i * 22 + 4} y="0" width="3" height="250"
                    fill={CREAM} opacity="0.08" />
                ))}
                {[0, 1, 2].map(row => [0, 1, 2, 3].map(col => (
                  <polygon key={`${row}-${col}`}
                    points={`${col*50+25},${row*80+5} ${col*50+50},${row*80+42} ${col*50+25},${row*80+80} ${col*50},${row*80+42}`}
                    fill="none" stroke={GOLD} strokeWidth="0.8" opacity="0.3" />
                )))}
              </svg>

              {/* Quote at bottom of dark block */}
              <div style={{ position: "absolute", bottom: "1.75rem", left: "1.5rem", right: "1.5rem" }}>
                <p className="font-serif" style={{
                  fontSize: "clamp(1rem,2.2vw,1.3rem)", fontStyle: "italic",
                  color: CREAM, lineHeight: 1.45,
                }}>
                  &laquo;&nbsp;Quand on partage un repas, on partage une histoire.&nbsp;&raquo;
                </p>
                <p style={{ fontSize: 11, color: GOLD, marginTop: "0.5rem", letterSpacing: "0.1em" }}>
                  Awa Diallo, fondatrice
                </p>
              </div>
            </div>

            {/* Gold corner accent */}
            <div style={{
              position: "absolute", top: -14, left: -14,
              width: 56, height: 56, border: `2px solid rgba(201,168,76,0.5)`,
            }} />
          </motion.div>

          {/* Right — text on cream */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          >
            <h2 className="font-serif" style={{
              fontSize: "clamp(2.8rem,5vw,4.5rem)", fontWeight: 300, fontStyle: "italic",
              color: DARK, lineHeight: 1.1, marginBottom: "2rem", letterSpacing: "-0.01em",
            }}>
              Une table née<br />
              <span style={{ color: GOLD }}>d&apos;une passion.</span>
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", marginBottom: "3rem" }}>
              <p style={{ fontSize: 16, color: `rgba(26,16,8,0.75)`, lineHeight: 1.75, fontWeight: 300 }}>
                La Parenthèse est née en 2019 d&apos;un rêve simple : créer un espace où les saveurs de
                l&apos;Afrique de l&apos;Ouest rencontrent l&apos;hospitalité bruxelloise.
              </p>
              <p style={{ fontSize: 16, color: `rgba(26,16,8,0.6)`, lineHeight: 1.75, fontWeight: 300 }}>
                Notre cuisine puise dans les traditions du Sénégal, du Cameroun, de la Côte d&apos;Ivoire
                et du Congo, revisitées avec les produits du marché local.
              </p>
            </div>

            {/* Values */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem",
              borderTop: `1px solid rgba(26,16,8,0.12)`, paddingTop: "2rem",
            }}>
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
                  style={{ paddingLeft: "1rem", borderLeft: `2px solid ${GOLD}` }}
                >
                  <h3 className="font-serif" style={{ fontSize: 18, fontWeight: 500, color: DARK, marginBottom: "0.4rem" }}>
                    {v.title}
                  </h3>
                  <p style={{ fontSize: 13, color: `rgba(26,16,8,0.6)`, lineHeight: 1.6 }}>
                    {v.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
