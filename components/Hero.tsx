import HeroCarousel from "@/components/HeroCarousel";
import OpenStatus from "@/components/OpenStatus";
import { RESTAURANT } from "@/lib/constants";
import { DARK, CREAM, GOLD, TEXT } from "@/lib/theme";

export default function Hero() {
  const { phone, hours, since } = RESTAURANT;

  return (
    <section id="accueil" style={{ minHeight: "100dvh", background: DARK, position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 55% 60% at 72% 50%, rgba(201,168,76,0.06) 0%, transparent 65%)`,
      }} />

      <style>{`
        /* Les règles de base doivent précéder la media query : à spécificité
           égale, la dernière déclarée l'emporte, media query ou non. */
        .hero-inner  { display: grid; grid-template-columns: 1fr; gap: 3rem; align-items: center; }
        /* La réserve de 44px à droite loge le décalage des cartes du fond :
           sans elle la pile se fait rogner par le bord de l'écran. */
        .hero-photo  { position: relative; width: calc(100% - 44px); max-width: 460px; aspect-ratio: 3/2; }
        .hero-scroll { display: none; }

        @media (min-width: 900px) {
          .hero-inner  { grid-template-columns: 6fr 5fr; gap: 4.5rem; }
          /* En desktop la colonne a de la marge : la pile peut occuper toute la largeur. */
          .hero-photo  { width: 100%; aspect-ratio: 4/5; margin-left: auto; }
          .hero-scroll { display: flex; }
        }

        /* Hover ET focus clavier — un lien qui ne réagit qu'à la souris
           est invisible pour qui navigue au clavier. */
        .btn-gold, .btn-ghost, .btn-phone { transition: opacity .2s ease, border-color .2s ease, color .2s ease; }
        .btn-gold:hover, .btn-gold:focus-visible { opacity: .85; }
        .btn-ghost:hover, .btn-ghost:focus-visible { border-color: rgba(245,237,216,0.55); }
        .btn-phone:hover, .btn-phone:focus-visible { color: ${CREAM}; }
        .btn-gold:focus-visible, .btn-ghost:focus-visible, .btn-phone:focus-visible {
          outline: 2px solid ${GOLD}; outline-offset: 3px;
        }
        .btn-gold:active, .btn-ghost:active { transform: scale(.97); }

        @keyframes scroll-hint {
          0%      { transform: scaleY(0); transform-origin: top;    }
          45%     { transform: scaleY(1); transform-origin: top;    }
          55%     { transform: scaleY(1); transform-origin: bottom; }
          100%    { transform: scaleY(0); transform-origin: bottom; }
        }
        @media (prefers-reduced-motion: reduce) {
          .scroll-line { animation: none !important; transform: scaleY(1) !important; }
        }
      `}</style>

      <div style={{
        maxWidth: 1400, margin: "0 auto",
        padding: "clamp(6rem,12vw,9rem) clamp(1.5rem,5vw,3.5rem) 5rem",
        position: "relative", zIndex: 1,
      }}>
        <div className="hero-inner">

          {/* Gauche : texte */}
          <div>
            <p className="animate-fade-up" style={{
              fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
              color: GOLD, fontWeight: 500, marginBottom: "1.75rem",
            }}>
              Restaurant Africain · Anderlecht, Bruxelles
            </p>

            <h1 className="font-script animate-fade-up delay-200" style={{
              fontSize: "clamp(4.5rem,10vw,9.5rem)",
              lineHeight: 0.92, color: CREAM, marginBottom: "1.5rem",
              letterSpacing: "0.01em",
            }}>
              la<br />
              <span style={{ color: CREAM }}>(</span><span style={{ color: GOLD }}>Parenthèse</span><span style={{ color: CREAM }}>)</span>
            </h1>

            <p className="font-serif animate-fade-up delay-400" style={{
              fontSize: "clamp(1.15rem,1.9vw,1.5rem)", fontStyle: "italic", fontWeight: 300,
              color: TEXT.primary, letterSpacing: "0.01em", lineHeight: 1.4,
              maxWidth: "24ch", marginBottom: "1.75rem",
            }}>
              Quand on partage un repas, on partage une histoire.
            </p>

            <div className="animate-fade-up delay-400" style={{
              display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem",
            }}>
              <div style={{ width: 60, height: 1, background: `rgba(201,168,76,0.4)` }} />
              <div style={{ width: 5, height: 5, background: GOLD, transform: "rotate(45deg)", opacity: 0.65 }} />
              <div style={{ width: 60, height: 1, background: `rgba(201,168,76,0.4)` }} />
            </div>

            <p className="animate-fade-up delay-500" style={{
              fontSize: "clamp(0.9rem,1.2vw,1rem)", fontWeight: 300,
              color: TEXT.secondary, lineHeight: 1.75, maxWidth: "44ch",
              marginBottom: "2.5rem",
            }}>
              Les saveurs du Sénégal, du Cameroun et du Congo, cuisinées chaque
              jour à Anderlecht.
            </p>

            <div className="animate-fade-up delay-600" style={{
              display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center",
            }}>
              <a href="#reservation" className="btn-gold" style={{
                display: "inline-block", fontSize: 11, fontWeight: 500,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: DARK, background: GOLD, padding: "14px 30px", textDecoration: "none",
              }}>
                Réserver une table
              </a>
              <a href="#menu" className="btn-ghost" style={{
                display: "inline-block", fontSize: 11, fontWeight: 500,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: CREAM, border: `1px solid rgba(245,237,216,0.22)`,
                padding: "14px 30px", textDecoration: "none",
              }}>
                Découvrir la carte
              </a>
              {/* Dans un restaurant, l'appel convertit mieux que le formulaire. */}
              <a href={phone.href} className="btn-phone" style={{
                fontSize: 14, color: TEXT.secondary, textDecoration: "none",
                letterSpacing: "0.02em", padding: "14px 4px",
              }}>
                ou {phone.display}
              </a>
            </div>

            <div className="animate-fade-up delay-800" style={{
              display: "flex", gap: "2.5rem", marginTop: "3.5rem",
              paddingTop: "2rem", borderTop: `1px solid rgba(201,168,76,0.18)`, flexWrap: "wrap",
            }}>
              <OpenStatus />
              <div>
                <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: 5 }}>
                  Service
                </div>
                <div style={{ fontSize: 15, color: TEXT.secondary, fontWeight: 300 }}>
                  {hours.weekday}
                  <span style={{ color: TEXT.muted }}> · {hours.weekend} le week-end</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: 5 }}>
                  Depuis
                </div>
                <div style={{ fontSize: 15, color: TEXT.secondary, fontWeight: 300 }}>{since}</div>
              </div>
            </div>
          </div>

          {/* Droite : pile de photos qui tourne.
              Plus de cadre décalé décoratif ici : la pile fournit déjà la profondeur. */}
          <div className="animate-fade-in delay-400" style={{ position: "relative" }}>
            <HeroCarousel />
          </div>

        </div>

        {/* Amorce de scroll */}
        <div className="hero-scroll animate-fade-in delay-1000" style={{
          justifyContent: "center", alignItems: "center", gap: "0.9rem",
          marginTop: "4rem",
        }}>
          <span style={{
            fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase",
            color: TEXT.muted,
          }}>
            Découvrir
          </span>
          <div style={{ width: 1, height: 46, background: "rgba(201,168,76,0.18)", position: "relative" }}>
            <div className="scroll-line" style={{
              position: "absolute", inset: 0, background: GOLD,
              animation: "scroll-hint 2.6s cubic-bezier(0.16,1,0.3,1) infinite",
            }} />
          </div>
        </div>
      </div>
    </section>
  );
}
