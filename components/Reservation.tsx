"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle, WhatsappLogo } from "@phosphor-icons/react";

import { RESTAURANT } from "@/lib/constants";
import { DARK, CREAM, GOLD, TEXT } from "@/lib/theme";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";

type FormData = {
  prenom: string; nom: string; email: string; tel: string;
  date: string; heure: string; personnes: string; occasion: string; message: string;
};

const HEURES = ["12:00","12:30","13:00","13:30","14:00","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30"];

const field: React.CSSProperties = {
  width: "100%", background: "rgba(245,237,216,0.05)",
  border: "1px solid rgba(245,237,216,0.12)", color: CREAM,
  padding: "12px 14px", fontSize: 14, outline: "none",
  transition: "border-color 0.2s ease, background 0.2s ease",
  fontFamily: "inherit",
};

export default function Reservation() {
  const [success, setSuccess] = useState(false);
  const [error,   setError  ] = useState(false);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (!FORMSPREE_ID) {
      await new Promise(r => setTimeout(r, 700));
      setSuccess(true); reset(); return;
    }
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) { setSuccess(true); reset(); } else setError(true);
    } catch { setError(true); }
  };

  const waText = encodeURIComponent("Bonjour, je souhaite réserver une table à La Parenthèse.");
  const { address, phone, whatsapp, email, hours } = RESTAURANT;

  return (
    <section id="reservation" style={{ background: DARK }}>
      <div style={{
        maxWidth: 1400, margin: "0 auto",
        padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,3.5rem)",
      }}>
        <style>{`
          @media (min-width: 900px) { .res-grid { grid-template-columns: 5fr 7fr !important; gap: 6rem !important; } }
          .res-field:focus { border-color: rgba(201,168,76,0.45) !important; background: rgba(245,237,216,0.08) !important; }
          .res-field::placeholder { color: rgba(245,237,216,0.42); }
          .res-field option { background: #1A1008; }
        `}</style>

        <div className="res-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3.5rem", alignItems: "start" }}>

          {/* Left — info */}
          <div>
            <h2 className="font-serif" style={{
              fontSize: "clamp(2.8rem,5vw,4rem)", fontWeight: 300, fontStyle: "italic",
              color: CREAM, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: "2.5rem",
            }}>
              Réservez<br /><span style={{ color: GOLD }}>votre table.</span>
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              {[
                { label: "Adresse",   value: address,       href: undefined },
                { label: "Horaires",  value: hours.full,    href: undefined },
                { label: "Téléphone", value: phone.display, href: phone.href },
              ].map(item => (
                <div key={item.label} style={{ paddingLeft: "1rem", borderLeft: `2px solid rgba(201,168,76,0.3)` }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: 6 }}>{item.label}</div>
                  {item.href ? (
                    <a href={item.href} style={{
                      fontSize: 14, color: TEXT.secondary, lineHeight: 1.65,
                      textDecoration: "none", transition: "color 0.2s ease",
                    }}
                      onMouseEnter={e => (e.currentTarget.style.color = CREAM)}
                      onMouseLeave={e => (e.currentTarget.style.color = TEXT.secondary)}
                    >{item.value}</a>
                  ) : (
                    <div style={{ fontSize: 14, color: TEXT.secondary, lineHeight: 1.65, whiteSpace: "pre-line" }}>{item.value}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Map */}
            <div style={{
              marginTop: "2rem", border: `1px solid rgba(201,168,76,0.18)`,
              overflow: "hidden", position: "relative",
            }}>
              <iframe
                title="Localisation La Parenthèse"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed&z=17`}
                width="100%"
                height="200"
                style={{ border: 0, display: "block", filter: "grayscale(15%) contrast(0.92) brightness(0.88)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 36,
                background: `linear-gradient(to top, ${DARK}, transparent)`,
                pointerEvents: "none",
              }} />
            </div>

            <a
              href={`https://wa.me/${whatsapp.number}?text=${waText}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.55rem",
                marginTop: "2.5rem", fontSize: 12, fontWeight: 500,
                letterSpacing: "0.08em", color: DARK, background: "#25D366",
                padding: "12px 22px", textDecoration: "none",
                transition: "opacity 0.2s ease, transform 0.16s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              onMouseDown={e => (e.currentTarget.style.transform = "scale(0.97)")}
              onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              <WhatsappLogo size={16} weight="fill" />
              Réserver par WhatsApp
            </a>
          </div>

          {/* Right — form */}
          <div>
            {success ? (
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                textAlign: "center", padding: "4rem 2rem",
                border: `1px solid rgba(201,168,76,0.2)`, gap: "1rem",
              }}>
                <CheckCircle size={44} weight="light" color={GOLD} />
                <h3 className="font-serif" style={{ fontSize: 26, fontWeight: 300, fontStyle: "italic", color: CREAM }}>
                  Demande envoyée.
                </h3>
                <p style={{ fontSize: 14, color: TEXT.secondary, maxWidth: "34ch", lineHeight: 1.6 }}>
                  Nous vous confirmerons votre réservation rapidement. A bientot !
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
                  {[
                    { name: "prenom" as const, label: "Prénom",    placeholder: "Aminata" },
                    { name: "nom"    as const, label: "Nom",       placeholder: "Diallo"  },
                  ].map(f => (
                    <div key={f.name} style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                      <label style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: TEXT.muted }}>{f.label}</label>
                      <input className="res-field" {...register(f.name, { required: true })} style={field} placeholder={f.placeholder} />
                    </div>
                  ))}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    <label style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: TEXT.muted }}>Email</label>
                    <input type="email" className="res-field" {...register("email", { required: true })} style={field} placeholder="aminata@gmail.com" />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    <label style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: TEXT.muted }}>Téléphone</label>
                    <input type="tel" className="res-field" {...register("tel")} style={field} placeholder="+32 4XX XX XX XX" />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.875rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    <label style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: TEXT.muted }}>Date</label>
                    <input type="date" className="res-field" {...register("date", { required: true })} style={{ ...field, colorScheme: "dark" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    <label style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: TEXT.muted }}>Heure</label>
                    <select className="res-field" {...register("heure", { required: true })} style={field}>
                      <option value="">--</option>
                      {HEURES.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    <label style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: TEXT.muted }}>Personnes</label>
                    <select className="res-field" {...register("personnes", { required: true })} style={field}>
                      <option value="">N°</option>
                      {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                      <option value="10+">10+</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  <label style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: TEXT.muted }}>Occasion (optionnel)</label>
                  <select className="res-field" {...register("occasion")} style={field}>
                    <option value="">Aucune en particulier</option>
                    <option value="anniversaire">Anniversaire</option>
                    <option value="romantique">Diner romantique</option>
                    <option value="professionnel">Repas professionnel</option>
                    <option value="famille">Repas en famille</option>
                  </select>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  <label style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: TEXT.muted }}>Message (optionnel)</label>
                  <textarea className="res-field" {...register("message")} rows={3}
                    style={{ ...field, resize: "vertical" }}
                    placeholder="Allergies, préférences, demandes spéciales..." />
                </div>

                {error && (
                  <p style={{ fontSize: 13, color: "#E87070" }}>
                    Erreur. Contactez-nous par WhatsApp ou par téléphone.
                  </p>
                )}

                <button
                  type="submit" disabled={isSubmitting}
                  style={{
                    marginTop: "0.5rem", alignSelf: "flex-start",
                    background: isSubmitting ? `rgba(201,168,76,0.5)` : GOLD,
                    color: DARK, border: "none", padding: "14px 32px",
                    fontSize: 12, fontWeight: 500, letterSpacing: "0.12em",
                    textTransform: "uppercase", cursor: isSubmitting ? "wait" : "pointer",
                    transition: "opacity 0.2s ease, transform 0.16s ease", fontFamily: "inherit",
                  }}
                  onMouseEnter={e => !isSubmitting && ((e.target as HTMLElement).style.opacity = "0.85")}
                  onMouseLeave={e => !isSubmitting && ((e.target as HTMLElement).style.opacity = "1")}
                  onMouseDown={e => ((e.target as HTMLElement).style.transform = "scale(0.97)")}
                  onMouseUp={e => ((e.target as HTMLElement).style.transform = "scale(1)")}
                >
                  {isSubmitting ? "Envoi..." : "Envoyer la demande"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
