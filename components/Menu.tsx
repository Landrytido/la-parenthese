"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { getDishesByCategory, menuCategories, type Dish } from "@/lib/menu";
import { DARK, CREAM, GOLD, TEXT } from "@/lib/theme";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/** `cats` liste les catégories réunies sous l'onglet. Les boissons en regroupent
 *  quatre : sans sous-titres elles formaient une liste à plat de 51 lignes où
 *  un soda et un whisky se ressemblaient.
 *  `dense` : ligne compacte nom + prix, sans description — pour les cartes où
 *  la description ne fait que paraphraser le nom. */
const TABS = [
  { key: "specialites", label: "Spécialités",     cats: ["specialites"], dense: false },
  { key: "viandes",     label: "Viandes",          cats: ["viandes"],     dense: false },
  { key: "poulets",     label: "Poulets",          cats: ["poulets"],     dense: false },
  { key: "poissons",    label: "Poissons",         cats: ["poissons"],    dense: false },
  { key: "complements", label: "Accompagnements",  cats: ["complements"], dense: false },
  { key: "boissons",    label: "Boissons",         cats: ["boissons", "bieres", "vins", "liqueurs"], dense: true },
];

/** Format belge : virgule décimale et centimes toujours affichés.
 *  Sans ça, 2.5 s'affichait « 2.5 € » au lieu de « 2,50 € ». */
const EUR = new Intl.NumberFormat("fr-BE", {
  style: "currency", currency: "EUR", minimumFractionDigits: 2,
});

function formatPrice(dish: Dish) {
  const amount = EUR.format(dish.price);
  return dish.priceRange ? `${dish.priceRange} ${amount}` : amount;
}

function SignatureBadge() {
  return (
    <span style={{
      fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase",
      color: DARK, background: GOLD, padding: "2px 6px", fontWeight: 600, flexShrink: 0,
    }}>
      Signature
    </span>
  );
}

function DenseRow({ dish }: { dish: Dish }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", padding: "0.5rem 0" }}>
      <span style={{ fontSize: 14, color: TEXT.primary, fontWeight: 300, flexShrink: 0 }}>
        {dish.name.fr}
      </span>
      {dish.isSignature && <SignatureBadge />}
      {/* Ligne de conduite : l'œil suit du nom jusqu'au prix */}
      <span aria-hidden="true" style={{
        flex: 1, minWidth: "1.5rem", alignSelf: "center",
        borderBottom: `1px dotted rgba(201,168,76,0.3)`,
      }} />
      <span className="font-serif" style={{
        fontSize: 15, color: GOLD, fontWeight: 500, whiteSpace: "nowrap", flexShrink: 0,
      }}>
        {formatPrice(dish)}
      </span>
    </div>
  );
}

function FullRow({ dish }: { dish: Dish }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "flex-start",
      gap: "1.5rem", padding: "1.25rem 0",
      borderBottom: `1px solid rgba(245,237,216,0.07)`,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", marginBottom: "0.3rem", flexWrap: "wrap" }}>
          <h4 className="font-serif" style={{ fontSize: 19, fontWeight: 500, color: CREAM, lineHeight: 1 }}>
            {dish.name.fr}
          </h4>
          {dish.isSignature && <SignatureBadge />}
          {dish.isWeekendOnly && (
            <span style={{
              fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase",
              color: GOLD, border: `1px solid rgba(201,168,76,0.4)`, padding: "2px 6px", flexShrink: 0,
            }}>
              Weekend
            </span>
          )}
        </div>
        <p style={{ fontSize: 13, color: TEXT.secondary, lineHeight: 1.6 }}>
          {dish.description.fr}
        </p>
      </div>
      <div className="font-serif" style={{
        fontSize: 18, fontWeight: 500, color: GOLD,
        whiteSpace: "nowrap", flexShrink: 0, paddingTop: 3,
      }}>
        {formatPrice(dish)}
      </div>
    </div>
  );
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState("specialites");
  const tab = TABS.find(t => t.key === activeTab)!;

  const groups = tab.cats
    .map(id => ({
      id,
      title: menuCategories.find(c => c.id === id)?.name.fr ?? id,
      dishes: getDishesByCategory(id),
    }))
    .filter(g => g.dishes.length > 0);

  // Un seul groupe : le sous-titre répéterait le nom de l'onglet.
  const showHeadings = groups.length > 1;

  return (
    <section id="menu" style={{ background: DARK, position: "relative" }}>
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
            color: CREAM, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: "3.5rem",
          }}
        >
          La <span style={{ color: GOLD }}>carte.</span>
        </motion.h2>

        <style>{`
          .menu-tabs { overflow-x: auto; scrollbar-width: none; }
          .menu-tabs::-webkit-scrollbar { display: none; }

          .menu-grid  { display: grid; grid-template-columns: 1fr; }
          .menu-dense { display: grid; grid-template-columns: 1fr; column-gap: 3rem; }

          @media (min-width: 700px) {
            .menu-dense { grid-template-columns: 1fr 1fr; }
          }
          @media (min-width: 900px) {
            .menu-grid  { grid-template-columns: 1fr 1fr; column-gap: 5rem; }
          }
          @media (min-width: 1150px) {
            .menu-dense { grid-template-columns: 1fr 1fr 1fr; }
          }
        `}</style>

        <div className="menu-tabs" style={{
          display: "flex", borderBottom: `1px solid rgba(245,237,216,0.1)`,
          marginBottom: "3rem", position: "relative",
        }}>
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              aria-current={activeTab === t.key}
              style={{
                padding: "10px 20px 13px", background: "none", border: "none",
                cursor: "pointer", fontSize: 11, fontWeight: 500,
                color: activeTab === t.key ? CREAM : TEXT.muted,
                letterSpacing: "0.1em", textTransform: "uppercase",
                position: "relative", transition: "color 0.2s ease",
                fontFamily: "inherit", whiteSpace: "nowrap", flexShrink: 0,
              }}
            >
              {t.label}
              {activeTab === t.key && (
                <motion.div
                  layoutId="tab-line"
                  style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 2, background: GOLD }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {groups.map((group, gi) => (
              <section key={group.id} style={{ marginTop: gi === 0 ? 0 : "3rem" }}>
                {showHeadings && (
                  <div style={{
                    display: "flex", alignItems: "center", gap: "1rem",
                    marginBottom: "1.25rem",
                  }}>
                    <h3 style={{
                      fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase",
                      color: GOLD, fontWeight: 500, flexShrink: 0,
                    }}>
                      {group.title}
                    </h3>
                    <span style={{ flex: 1, height: 1, background: `rgba(201,168,76,0.18)` }} />
                    <span style={{ fontSize: 10, color: TEXT.muted, flexShrink: 0 }}>
                      {group.dishes.length}
                    </span>
                  </div>
                )}

                <div className={tab.dense ? "menu-dense" : "menu-grid"}>
                  {group.dishes.map((dish, i) => (
                    <motion.div
                      key={dish.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.25), ease: EASE }}
                    >
                      {tab.dense ? <DenseRow dish={dish} /> : <FullRow dish={dish} />}
                    </motion.div>
                  ))}
                </div>
              </section>
            ))}
          </motion.div>
        </AnimatePresence>

        <p style={{ marginTop: "2.5rem", fontSize: 12, color: TEXT.muted, letterSpacing: "0.04em" }}>
          Tous nos plats sont préparés frais chaque jour. Informez-nous de vos allergies.
        </p>
      </div>
    </section>
  );
}
