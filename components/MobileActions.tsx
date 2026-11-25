"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, Phone, WhatsappLogo } from "@phosphor-icons/react";

import { RESTAURANT } from "@/lib/constants";
import { DARK, CREAM, GOLD } from "@/lib/theme";

const item: React.CSSProperties = {
  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
  gap: 3, minHeight: 56, fontSize: 11, fontWeight: 500, letterSpacing: "0.1em",
  textTransform: "uppercase", textDecoration: "none", color: CREAM,
};

/** Sur téléphone, les trois gestes utiles restent sous le pouce. La barre
 *  n'apparaît qu'après le hero (qui a ses propres boutons) et s'efface devant le
 *  formulaire et le pied de page, pour ne rien recouvrir. */
export default function MobileActions() {
  const [pastHero, setPastHero] = useState(false);
  const [covered,  setCovered ] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const targets = [document.getElementById("reservation"), document.querySelector("footer")]
      .filter((el): el is HTMLElement => el !== null);
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setCovered(visible.size > 0);
    }, { rootMargin: "0px 0px -25% 0px" });
    targets.forEach(t => observer.observe(t));

    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  const shown = pastHero && !covered;
  const waText = encodeURIComponent("Bonjour, je souhaite réserver une table à La Parenthèse.");

  return (
    <>
      <style>{`
        .mobile-actions { display: grid; }
        @media (min-width: 768px) { .mobile-actions { display: none; } }
        @media (prefers-reduced-motion: reduce) { .mobile-actions { transition: none !important; } }
      `}</style>
      <nav
        className="mobile-actions"
        aria-label="Actions rapides"
        inert={!shown}
        style={{
          position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 90,
          gridTemplateColumns: "1fr 1fr 1.2fr",
          background: "rgba(26,16,8,0.96)", borderTop: "1px solid rgba(201,168,76,0.25)",
          paddingBottom: "env(safe-area-inset-bottom)",
          transform: shown ? "translateY(0)" : "translateY(110%)",
          transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <a href={RESTAURANT.phone.href} style={item}>
          <Phone size={19} weight="light" aria-hidden="true" />
          Appeler
        </a>
        <a href={`https://wa.me/${RESTAURANT.whatsapp.number}?text=${waText}`}
          target="_blank" rel="noopener noreferrer" style={item}>
          <WhatsappLogo size={19} weight="light" aria-hidden="true" />
          WhatsApp
        </a>
        <a href="#reservation" style={{ ...item, color: DARK, background: GOLD }}>
          <CalendarCheck size={19} weight="regular" aria-hidden="true" />
          Réserver
        </a>
      </nav>
    </>
  );
}
