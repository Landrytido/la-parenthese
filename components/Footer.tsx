"use client";

import { RESTAURANT } from "@/lib/constants";

const DARK  = "#1A1008";
const CREAM = "#F5EDD8";
const GOLD  = "#C9A84C";

const year = new Date().getFullYear();

const navLinks = [
  { label: "Notre histoire", href: "#histoire" },
  { label: "La carte",       href: "#menu"      },
  { label: "Spécialités",    href: "#specialites"},
  { label: "Galerie",        href: "#galerie"    },
  { label: "Réserver",       href: "#reservation"},
];

export default function Footer() {
  return (
    <footer style={{ background: DARK, borderTop: `1px solid rgba(201,168,76,0.1)` }}>
      <div style={{
        maxWidth: 1400, margin: "0 auto",
        padding: "2.5rem clamp(1.5rem,5vw,3.5rem)",
      }}>
        <style>{`
          @media (min-width: 768px) {
            .footer-row { flex-direction: row !important; align-items: center !important; }
          }
        `}</style>
        <div className="footer-row" style={{
          display: "flex", flexDirection: "column",
          justifyContent: "space-between", gap: "1.5rem",
          paddingBottom: "1.5rem", borderBottom: `1px solid rgba(245,237,216,0.06)`,
        }}>
          <a href="/" className="font-script" style={{ fontSize: 26, color: GOLD, textDecoration: "none" }}>
            La Parenthèse
          </a>

          <nav style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} style={{
                fontSize: 12, color: `rgba(245,237,216,0.4)`, textDecoration: "none",
                letterSpacing: "0.04em", transition: "color 0.2s ease",
              }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = `rgba(245,237,216,0.8)`)}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = `rgba(245,237,216,0.4)`)}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Social icons — cream only, no extra colors */}
          <div style={{ display: "flex", gap: "0.875rem", alignItems: "center" }}>
            {[
              { label: "Facebook", href: "#", d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
            ].map(s => (
              <a key={s.label} href={s.href} aria-label={s.label}
                style={{ color: `rgba(245,237,216,0.3)`, transition: "color 0.2s ease", display: "flex" }}
                onMouseEnter={e => ((e.currentTarget).style.color = GOLD)}
                onMouseLeave={e => ((e.currentTarget).style.color = `rgba(245,237,216,0.3)`)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div style={{
          paddingTop: "1.25rem",
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem",
        }}>
          <p style={{ fontSize: 11, color: `rgba(245,237,216,0.22)`, letterSpacing: "0.04em" }}>
            &copy; {year} La Parenthèse. Tous droits réservés.
          </p>
          <p style={{ fontSize: 11, color: `rgba(245,237,216,0.18)` }}>
            {RESTAURANT.address}
          </p>
        </div>
      </div>
    </footer>
  );
}
