"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getDishesByCategory, type Dish } from "@/lib/menu";

const EASE  = [0.16, 1, 0.3, 1] as [number, number, number, number];
const DARK  = "#1A1008";
const CREAM = "#F5EDD8";
const GOLD  = "#C9A84C";

const TABS = [
  { key: "specialites", label: "Spécialités"     },
  { key: "viandes",     label: "Viandes"          },
  { key: "poulets",     label: "Poulets"          },
  { key: "poissons",    label: "Poissons"         },
  { key: "complements", label: "Accompagnements"  },
  { key: "boissons",    label: "Boissons"         },
];

function getDishes(key: string): Dish[] {
  if (key === "boissons")
    return ["boissons", "bieres", "vins", "liqueurs"].flatMap(c => getDishesByCategory(c));
  return getDishesByCategory(key);
}

function formatPrice(dish: Dish) {
  return dish.priceRange
    ? `${dish.priceRange} ${dish.price} €`
    : `${dish.price} €`;
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState("specialites");
  const dishes = getDishes(activeTab);

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

        {/* Tabs */}
        <style>{`
          .menu-tabs { overflow-x: auto; scrollbar-width: none; }
          .menu-tabs::-webkit-scrollbar { display: none; }
          @media (min-width: 900px) { .menu-grid { grid-template-columns: 1fr 1fr !important; column-gap: 5rem !important; } }
        `}</style>
        <div className="menu-tabs" style={{
          display: "flex", borderBottom: `1px solid rgba(245,237,216,0.1)`,
          marginBottom: "3rem", position: "relative",
        }}>
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: "10px 20px 13px", background: "none", border: "none",
                cursor: "pointer", fontSize: 11, fontWeight: 500,
                color: activeTab === tab.key ? CREAM : `rgba(245,237,216,0.35)`,
                letterSpacing: "0.1em", textTransform: "uppercase",
                position: "relative", transition: "color 0.2s ease",
                fontFamily: "inherit", whiteSpace: "nowrap", flexShrink: 0,
              }}
            >
              {tab.label}
              {activeTab === tab.key && (
                <motion.div
                  layoutId="tab-line"
                  style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 2, background: GOLD }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Dish list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div className="menu-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0 }}>
              {dishes.map((dish, i) => (
                <motion.div
                  key={dish.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.3), ease: EASE }}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                    gap: "1.5rem", padding: "1.25rem 0",
                    borderBottom: `1px solid rgba(245,237,216,0.07)`,
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", marginBottom: "0.3rem", flexWrap: "wrap" }}>
                      <h3 className="font-serif" style={{ fontSize: 19, fontWeight: 500, color: CREAM, lineHeight: 1 }}>
                        {dish.name.fr}
                      </h3>
                      {dish.isSignature && (
                        <span style={{
                          fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase",
                          color: DARK, background: GOLD, padding: "2px 6px", fontWeight: 600, flexShrink: 0,
                        }}>
                          Signature
                        </span>
                      )}
                      {dish.isWeekendOnly && (
                        <span style={{
                          fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase",
                          color: GOLD, border: `1px solid rgba(201,168,76,0.4)`, padding: "2px 6px", flexShrink: 0,
                        }}>
                          Weekend
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: 13, color: `rgba(245,237,216,0.42)`, lineHeight: 1.6 }}>
                      {dish.description.fr}
                    </p>
                  </div>
                  <div className="font-serif" style={{
                    fontSize: 18, fontWeight: 500, color: GOLD,
                    whiteSpace: "nowrap", flexShrink: 0, paddingTop: 3,
                  }}>
                    {formatPrice(dish)}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <p style={{ marginTop: "2.5rem", fontSize: 12, color: `rgba(245,237,216,0.22)`, letterSpacing: "0.04em" }}>
          Tous nos plats sont préparés frais chaque jour. Informez-nous de vos allergies.
        </p>
      </div>
    </section>
  );
}
