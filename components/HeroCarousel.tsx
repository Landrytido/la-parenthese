"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { GOLD } from "@/lib/theme";

const PHOTOS = [
  { src: "/photos/hero-grillades.jpg", alt: "Assortiment de grillades et brochettes" },
  { src: "/photos/hero-tilapia.jpg",   alt: "Poisson braisé servi sur feuille de bananier" },
  { src: "/photos/hero-plantains.jpg", alt: "Grillades accompagnées de plantains frits" },
  { src: "/photos/hero-poisson.jpg",   alt: "Poisson grillé et crudités en salle" },
];

const INTERVAL = 4200;

/** Position de chaque carte selon sa profondeur dans la pile.
 *  Le dernier palier est à opacité 0 : c'est la case de recyclage, celle où
 *  part la carte de devant avant de réapparaître au fond de la pile. */
const DEPTH = [
  { x:  0, y:   0, scale: 1,    opacity: 1,    rotate: 0   },
  { x: 20, y: -16, scale: 0.95, opacity: 0.55, rotate: 1.5 },
  { x: 38, y: -30, scale: 0.90, opacity: 0.28, rotate: 3   },
  { x: 54, y: -42, scale: 0.86, opacity: 0,    rotate: 4.5 },
];

export default function HeroCarousel() {
  const [front, setFront] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const advance = useCallback(() => setFront(f => (f + 1) % PHOTOS.length), []);

  useEffect(() => {
    // Pas de rotation automatique si l'utilisateur a demandé moins d'animation :
    // un carrousel qui tourne seul est exactement ce que ce réglage veut éviter.
    if (reduced || paused) return;
    timer.current = setInterval(advance, INTERVAL);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [reduced, paused, advance]);

  return (
    <div
      className="hero-photo"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {PHOTOS.map((photo, i) => {
        const depth = (i - front + PHOTOS.length) % PHOTOS.length;
        const pos = DEPTH[Math.min(depth, DEPTH.length - 1)];

        return (
          <motion.div
            key={photo.src}
            aria-hidden={depth !== 0}
            initial={false}
            animate={pos}
            transition={reduced ? { duration: 0 } : { duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute", inset: 0,
              zIndex: PHOTOS.length - depth,
              transformOrigin: "center center",
              overflow: "hidden",
              border: `1px solid rgba(201,168,76,${depth === 0 ? 0.22 : 0.12})`,
              background: "#1A1008",
            }}
          >
            <Image
              src={photo.src}
              alt={depth === 0 ? photo.alt : ""}
              fill
              // La 1re est préchargée (c'est le LCP) ; les autres passent devant
              // en quelques secondes, donc `eager` — en lazy elles apparaîtraient
              // vides à leur tour de rotation.
              priority={i === 0}
              loading={i === 0 ? undefined : "eager"}
              sizes="(max-width: 900px) 100vw, 460px"
              style={{ objectFit: "cover" }}
            />
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: `linear-gradient(to top, rgba(26,16,8,0.55) 0%, transparent 45%),
                           linear-gradient(to right, rgba(26,16,8,0.35) 0%, transparent 30%)`,
            }} />
          </motion.div>
        );
      })}

      {/* Repères — donnent aussi l'accès clavier, la pile elle-même n'est pas focusable */}
      <div style={{
        position: "absolute", left: 16, bottom: 16, zIndex: PHOTOS.length + 1,
        display: "flex", gap: 6,
      }}>
        {PHOTOS.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setFront(i)}
            aria-label={`Photo ${i + 1} sur ${PHOTOS.length}`}
            aria-current={i === front}
            style={{
              width: i === front ? 20 : 8, height: 3, padding: 0,
              border: "none", cursor: "pointer", borderRadius: 2,
              background: i === front ? GOLD : "rgba(245,237,216,0.35)",
              transition: "width .4s cubic-bezier(0.16,1,0.3,1), background .3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
