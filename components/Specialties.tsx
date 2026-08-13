"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { getDishById } from "@/lib/menu";
import { DARK, CREAM, GOLD, TEXT } from "@/lib/theme";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const FEATURED = [
  { id: "ndole-mixte", tagline: "Le plat le plus demandé", photo: "/photos/spec-ndole.jpg"      },
  { id: "eru",         tagline: "Tradition camerounaise",  photo: "/photos/spec-eru.jpg"        },
  { id: "brochettes",  tagline: "Les saveurs du grill",    photo: "/photos/spec-brochettes.jpg" },
];

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
          .spec-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
          @media (min-width: 900px) {
            .spec-grid { grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem; }
          }
        `}</style>
        <div className="spec-grid">
          {cards.map((card, i) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
              whileHover={{ y: -4 }}
              style={{
                background: DARK, position: "relative", overflow: "hidden",
                padding: "2.5rem 2rem", minHeight: 420,
                display: "flex", flexDirection: "column", justifyContent: "flex-end",
                border: `1px solid rgba(245,237,216,0.06)`,
              }}
            >
              <Image
                src={card.photo}
                alt={card.dish.name.fr}
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              {/* Voile dense en bas : le texte crème doit rester lisible quelle que soit la photo */}
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: `linear-gradient(to top,
                  rgba(26,16,8,0.96) 0%,
                  rgba(26,16,8,0.82) 38%,
                  rgba(26,16,8,0.35) 70%,
                  rgba(26,16,8,0.15) 100%)`,
              }} />

              <div className="font-serif" style={{
                position: "absolute", top: "1rem", right: "1.25rem",
                fontSize: 80, fontWeight: 700, color: `rgba(245,237,216,0.12)`,
                lineHeight: 1, userSelect: "none",
              }}>
                {card.no}
              </div>

              <div style={{ position: "absolute", top: 0, left: "2rem", width: 40, height: 2, background: GOLD }} />

              <div style={{ position: "relative" }}>
                <p style={{
                  fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
                  color: GOLD, marginBottom: "0.65rem", fontWeight: 500,
                }}>
                  {card.tagline}
                </p>
                <h3 className="font-serif" style={{
                  fontSize: "clamp(1.5rem,2.8vw,2rem)", fontWeight: 400,
                  color: CREAM, marginBottom: "0.85rem", lineHeight: 1.1,
                }}>
                  {card.dish.name.fr}
                </h3>
                <p style={{ fontSize: 13, color: TEXT.secondary, lineHeight: 1.65, fontWeight: 300 }}>
                  {card.dish.description.fr}
                </p>
                <p className="font-serif" style={{ marginTop: "1.25rem", fontSize: 18, color: GOLD, fontWeight: 500 }}>
                  {card.dish.price} €
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
