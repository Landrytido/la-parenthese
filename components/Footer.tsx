"use client";

import Link from "next/link";

import { RESTAURANT, SOCIAL, type SocialLink } from "@/lib/constants";
import { DARK, GOLD, TEXT } from "@/lib/theme";

const year = new Date().getFullYear();

const SOCIAL_ICONS: Record<SocialLink["icon"], string> = {
  facebook:  "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  instagram: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5.5-1.5v.01",
  // Épingle de carte plutôt que le logo Google : les icônes du footer sont
  // rendues en contour (fill:none + stroke), et le G est un logo plein — le
  // tracer en fil de fer donnait une bouillie illisible.
  google:    "M12 21c4.6-4.4 7-7.9 7-10.5a7 7 0 1 0-14 0c0 2.6 2.4 6.1 7 10.5z M12 12.6a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4z",
};

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
          <Link href="/" className="font-script" style={{ fontSize: 26, color: GOLD, textDecoration: "none" }}>
            La Parenthèse
          </Link>

          <nav style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} style={{
                fontSize: 12, color: TEXT.muted, textDecoration: "none",
                letterSpacing: "0.04em", transition: "color 0.2s ease",
              }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = TEXT.primary)}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = TEXT.muted)}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Social icons — cream only, no extra colors */}
          {/* Alimenté par SOCIAL (lib/constants.ts), qui alimente aussi le
              `sameAs` du JSON-LD. Vide tant qu'aucun profil réel n'existe :
              l'ancienne icône Facebook pointait sur "#", donc nulle part. */}
          {SOCIAL.length > 0 && (
            <div style={{ display: "flex", gap: "0.875rem", alignItems: "center" }}>
              {SOCIAL.map(s => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  target="_blank" rel="noopener noreferrer"
                  style={{ color: TEXT.muted, transition: "color 0.2s ease", display: "flex" }}
                  onMouseEnter={e => ((e.currentTarget).style.color = GOLD)}
                  onMouseLeave={e => ((e.currentTarget).style.color = TEXT.muted)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={SOCIAL_ICONS[s.icon]} />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>

        <div style={{
          paddingTop: "1.25rem",
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem",
        }}>
          <p style={{ fontSize: 11, color: TEXT.muted, letterSpacing: "0.04em" }}>
            &copy; {year} La Parenthèse. Tous droits réservés.
          </p>
          <p style={{ fontSize: 11, color: TEXT.muted }}>
            {RESTAURANT.address}
          </p>
        </div>
      </div>
    </footer>
  );
}
