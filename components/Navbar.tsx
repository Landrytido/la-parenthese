"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";

import { DARK, CREAM, GOLD, TEXT } from "@/lib/theme";

const links = [
  { label: "Notre histoire", href: "#histoire"   },
  { label: "La carte",       href: "#menu"       },
  { label: "Spécialités",    href: "#specialites"},
  { label: "Galerie",        href: "#galerie"    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen    ] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 68, display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(1.5rem,5vw,3.5rem)",
        transition: "background 0.4s ease",
        background: scrolled ? "rgba(26,16,8,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? `1px solid rgba(201,168,76,0.1)` : "none",
      }}>
        {/* Redondant avec le wordmark géant du hero : on ne le révèle qu'au scroll. */}
        <Link href="/" className="font-script"
          aria-hidden={!scrolled}
          tabIndex={scrolled ? undefined : -1}
          style={{
            fontSize: 26, color: GOLD, textDecoration: "none", lineHeight: 1,
            opacity: scrolled ? 1 : 0,
            transform: scrolled ? "translateY(0)" : "translateY(-6px)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
            pointerEvents: scrolled ? "auto" : "none",
          }}>
          La Parenthèse
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {/* Desktop links */}
          {/* Pas de `display` inline ici : il l'emporterait sur la règle
              `.desktop-nav { display: none }` et les liens s'afficheraient
              aussi sur mobile, par-dessus le hamburger. */}
          <div style={{ gap: "2rem" }} className="desktop-nav">
            {links.map(l => (
              <a key={l.href} href={l.href} style={{
                fontSize: 12, fontWeight: 400, color: TEXT.secondary,
                letterSpacing: "0.05em", textDecoration: "none",
                transition: "color 0.2s ease",
              }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = CREAM)}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = TEXT.secondary)}
              >
                {l.label}
              </a>
            ))}
          </div>

          <a href="#reservation" style={{
            fontSize: 11, fontWeight: 500, letterSpacing: "0.12em",
            textTransform: "uppercase", color: DARK, background: GOLD,
            padding: "10px 20px", textDecoration: "none",
            transition: "opacity 0.2s ease, transform 0.16s ease",
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            onMouseDown={e => (e.currentTarget.style.transform = "scale(0.97)")}
            onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            Réserver
          </a>

          <button className="mobile-menu-btn" onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
            style={{ background: "none", border: "none", cursor: "pointer", color: CREAM, padding: 4 }}>
            <List size={22} weight="light" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 200, background: DARK,
          display: "flex", flexDirection: "column", padding: "1.5rem",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
            <span className="font-script" style={{ fontSize: 24, color: GOLD }}>La Parenthèse</span>
            <button onClick={() => setOpen(false)} aria-label="Fermer"
              style={{ background: "none", border: "none", cursor: "pointer", color: CREAM }}>
              <X size={22} weight="light" />
            </button>
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
            {links.map((l, i) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="font-serif"
                style={{
                  fontSize: 40, fontWeight: 300, fontStyle: "italic",
                  color: CREAM, textDecoration: "none", lineHeight: 1.2,
                  opacity: 0, animation: `fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 75}ms forwards`,
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a href="#reservation" onClick={() => setOpen(false)} style={{
            marginTop: "auto", textAlign: "center", fontSize: 12, fontWeight: 500,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: DARK, background: GOLD, padding: "16px", textDecoration: "none",
          }}>
            Réserver une table
          </a>
        </div>
      )}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .desktop-nav { display: none; }
        .mobile-menu-btn { display: flex; }
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}
