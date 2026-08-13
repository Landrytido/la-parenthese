"use client";

import { motion } from "framer-motion";

import { DARK, CREAM, GOLD, TEXT } from "@/lib/theme";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Quote() {
  return (
    <section style={{ background: DARK, position: "relative", overflow: "hidden" }}>
      {/* Faint large guillemet */}
      <div style={{
        position: "absolute", inset: 0, display: "flex",
        alignItems: "center", justifyContent: "center",
        pointerEvents: "none", overflow: "hidden",
      }}>
        <span className="font-script" style={{
          fontSize: "clamp(14rem,32vw,26rem)", color: `rgba(201,168,76,0.04)`,
          lineHeight: 1, userSelect: "none", whiteSpace: "nowrap",
        }}>
          &laquo;
        </span>
      </div>

      <div style={{
        maxWidth: 860, margin: "0 auto",
        padding: "clamp(6rem,14vw,10rem) clamp(1.5rem,5vw,3.5rem)",
        textAlign: "center", position: "relative",
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div style={{ width: 40, height: 1, background: GOLD, margin: "0 auto 2.5rem" }} />

          <blockquote className="font-serif" style={{
            fontSize: "clamp(1.7rem,3.8vw,2.8rem)", fontWeight: 300,
            fontStyle: "italic", color: CREAM, lineHeight: 1.35,
            letterSpacing: "-0.01em", margin: "0 0 2.5rem 0",
          }}>
            La nourriture est la voie la plus courte
            <br />
            <span style={{ color: GOLD }}>entre deux coeurs.</span>
          </blockquote>

          <div style={{ width: 40, height: 1, background: `rgba(201,168,76,0.25)`, margin: "0 auto 1.5rem" }} />

          <cite style={{
            fontStyle: "normal", fontSize: 11,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: TEXT.muted,
          }}>
            Proverbe d&apos;Afrique de l&apos;Ouest
          </cite>
        </motion.div>
      </div>
    </section>
  );
}
