"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { DARK, CREAM, GOLD, TEXT } from "@/lib/theme";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const cells = [
  { id: 1, label: "Thiéboudienne", photo: "/photos/gal-thieboudienne.jpg" },
  { id: 2, label: "Notre salle",   photo: "/photos/gal-salle.jpg"         },
  { id: 3, label: "Épices",        photo: "/photos/gal-epices.jpg"        },
  { id: 4, label: "Ndolé",         photo: "/photos/gal-ndole.jpg"         },
  { id: 5, label: "Riz jollof",    photo: "/photos/gal-jollof.jpg"        },
];

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

        <style>{`
          .gallery-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-auto-rows: 160px;
            gap: 8px;
          }
          .gallery-grid .gc-1 { grid-column: span 2; }
          @media (min-width: 768px) {
            .gallery-grid {
              grid-template-columns: repeat(11, 1fr);
              grid-template-rows: repeat(2, 240px);
              grid-auto-rows: auto;
            }
            .gallery-grid .gc-1 { grid-area: 1 / 1 / 3 / 5;  }
            .gallery-grid .gc-2 { grid-area: 1 / 5 / 2 / 8;  }
            .gallery-grid .gc-3 { grid-area: 1 / 8 / 2 / 12; }
            .gallery-grid .gc-4 { grid-area: 2 / 5 / 3 / 9;  }
            .gallery-grid .gc-5 { grid-area: 2 / 9 / 3 / 12; }
          }
          .gallery-cell img { transition: transform .7s cubic-bezier(0.16,1,0.3,1); }
          .gallery-cell:hover img { transform: scale(1.04); }
          @media (prefers-reduced-motion: reduce) {
            .gallery-cell img, .gallery-cell:hover img { transition: none; transform: none; }
          }
        `}</style>

        <div className="gallery-grid">
          {cells.map((cell, i) => (
            <motion.figure
              key={cell.id}
              className={`gallery-cell gc-${cell.id}`}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
              style={{
                background: DARK, position: "relative", overflow: "hidden",
                display: "flex", alignItems: "flex-end", padding: "1rem 0.875rem", margin: 0,
              }}
            >
              <Image
                src={cell.photo}
                alt={cell.label}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: `linear-gradient(to top, rgba(26,16,8,0.85) 0%, rgba(26,16,8,0.2) 55%, transparent 100%)`,
              }} />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `rgba(201,168,76,0.25)` }} />
              <figcaption style={{
                position: "relative", fontSize: 11, fontWeight: 400,
                color: TEXT.secondary, letterSpacing: "0.08em", textTransform: "uppercase",
              }}>
                {cell.label}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <p style={{ marginTop: "2rem", fontSize: 12, color: TEXT.muted, textAlign: "center" }}>
          Venez vivre l&apos;expérience en salle.
        </p>
      </div>
    </section>
  );
}
