"use client";

import { useEffect, useState } from "react";

import { getOpenState, type OpenState } from "@/lib/hours";
import { RESTAURANT } from "@/lib/constants";
import { GOLD, TEXT, STATUS } from "@/lib/theme";

/** Le statut dépend de l'heure courante : il ne peut pas être rendu côté serveur
 *  sans provoquer un écart d'hydratation. On affiche donc les horaires statiques
 *  jusqu'au montage, puis on bascule sur l'état réel. */
export default function OpenStatus() {
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const tick = () => setState(getOpenState());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  // Avant le montage le statut est inconnu : neutre, surtout pas rouge —
  // afficher « fermé » à un client qui pourrait passer serait le pire défaut.
  const dotColor = state
    ? (state.open ? STATUS.open : STATUS.closed)
    : "rgba(245,237,216,0.3)";

  return (
    <div>
      <style>{`
        @keyframes status-pulse {
          0%, 100% { opacity: 1;   transform: scale(1);   }
          50%      { opacity: .45; transform: scale(0.82); }
        }
        @media (prefers-reduced-motion: reduce) {
          .status-dot { animation: none !important; }
        }
      `}</style>

      <div style={{
        fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
        color: GOLD, marginBottom: 5,
      }}>
        Aujourd&apos;hui
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", minHeight: 22 }}>
        <span
          className="status-dot"
          aria-hidden="true"
          style={{
            width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
            background: dotColor,
            // Halo : sur fond brun un point de 7px se perd sans un peu de diffusion
            boxShadow: state ? `0 0 0 3px ${dotColor}22` : "none",
            animation: state?.open ? "status-pulse 2.4s ease-in-out infinite" : "none",
          }}
        />
        <span style={{ fontSize: 15, color: TEXT.secondary, fontWeight: 300 }}>
          {state ? (
            <>
              {state.label}
              <span style={{ color: TEXT.muted }}> · {state.detail}</span>
            </>
          ) : (
            RESTAURANT.hours.label
          )}
        </span>
      </div>
    </div>
  );
}
