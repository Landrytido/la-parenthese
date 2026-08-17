"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { RESTAURANT } from "@/lib/constants";
import { DARK, CREAM, GOLD, TEXT, TEXT_ON_CREAM } from "@/lib/theme";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

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
          /* Règles de base avant les media queries : à spécificité égale,
             la dernière déclarée gagne. */
          .story-values { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }

          @media (min-width: 600px) {
            /* Sous 600px, deux colonnes ne laissaient que ~135px de texte,
               soit une vingtaine de caractères par ligne. */
            .story-values { grid-template-columns: 1fr 1fr; }
          }
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
            {/* Le motif kente qui occupait ce bloc s'étirait mal en 4/5 : il se
                lisait comme des bandes horizontales, pas comme un textile. */}
            <div style={{
              aspectRatio: "4/5", background: DARK,
              position: "relative", overflow: "hidden", maxWidth: 420,
            }}>
              <Image
                src="/photos/story-feu.jpg"
                alt="Préparation d'un plat mijoté au feu de bois dans une marmite en fonte"
                fill
                sizes="(max-width: 900px) 100vw, 420px"
                style={{ objectFit: "cover" }}
              />
              {/* Voile bas : la légende doit rester lisible quelle que soit la photo */}
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: `linear-gradient(to top,
                  rgba(26,16,8,0.92) 0%, rgba(26,16,8,0.6) 26%, transparent 55%)`,
              }} />

              <div style={{ position: "absolute", bottom: "1.75rem", left: "1.5rem", right: "1.5rem" }}>
                <p className="font-script" style={{
                  fontSize: "clamp(2rem,4vw,2.75rem)", color: GOLD, lineHeight: 1,
                }}>
                  {RESTAURANT.since}
                </p>
                <p style={{
                  fontSize: 11, color: TEXT.secondary, marginTop: "0.6rem",
                  letterSpacing: "0.18em", textTransform: "uppercase",
                }}>
                  Anderlecht, Bruxelles
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
              Une table africaine<br />
              <span style={{ color: GOLD }}>née d&apos;une passion.</span>
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", marginBottom: "3rem" }}>
              <p style={{ fontSize: 16, color: TEXT_ON_CREAM.secondary, lineHeight: 1.75, fontWeight: 300 }}>
                La Parenthèse est née en 2019 d&apos;un rêve simple : créer un espace où les saveurs de
                l&apos;Afrique de l&apos;Ouest rencontrent l&apos;hospitalité bruxelloise.
              </p>
              <p style={{ fontSize: 16, color: TEXT_ON_CREAM.muted, lineHeight: 1.75, fontWeight: 300 }}>
                Notre cuisine puise dans les traditions du Sénégal, du Cameroun, de la Côte d&apos;Ivoire
                et du Congo, revisitées avec les produits du marché local.
              </p>
            </div>

            {/* Values */}
            <div className="story-values" style={{
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
                  <p style={{ fontSize: 13, color: TEXT_ON_CREAM.muted, lineHeight: 1.6 }}>
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
