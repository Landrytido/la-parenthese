"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { CheckCircle, WhatsappLogo } from "@phosphor-icons/react";

import { RESTAURANT, PAYMENT } from "@/lib/constants";
import { reservationSlots } from "@/lib/hours";
import { DARK, CREAM, GOLD, TEXT } from "@/lib/theme";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

type FormData = {
  prenom: string; nom: string; email: string; tel: string;
  date: string; heure: string; personnes: string; occasion: string; message: string;
};

// Service continu : les créneaux viennent des horaires réels (lib/hours.ts).
const HEURES = reservationSlots();

const field: React.CSSProperties = {
  width: "100%", background: "rgba(245,237,216,0.05)",
  border: "1px solid rgba(245,237,216,0.12)", color: CREAM,
  // 16px minimum : en dessous, Safari sur iPhone zoome à chaque saisie.
  padding: "12px 14px", fontSize: 16, minHeight: 48,
  transition: "border-color 0.2s ease, background 0.2s ease",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: TEXT.secondary,
};

/** Libellé relié à son champ, avec le message d'erreur annoncé avec lui. */
function Field({ id, label, error, className, children }: {
  id: string; label: string; error?: string; className?: string; children: React.ReactNode;
}) {
  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: "0.35rem", minWidth: 0 }}>
      <label htmlFor={`res-${id}`} style={labelStyle}>{label}</label>
      {children}
      {error && <span id={`res-${id}-error`} style={{ fontSize: 12, color: "#E87070" }}>{error}</span>}
    </div>
  );
}

export default function Reservation() {
  const [success, setSuccess] = useState(false);
  const [error,   setError  ] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();

  // Calculée côté client : la page est statique, une date posée au build serait périmée.
  const [today, setToday] = useState("");
  useEffect(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    setToday(d.toISOString().slice(0, 10));
  }, []);

  const REQUIRED: Partial<Record<keyof FormData, string>> = {
    prenom: "Indiquez votre prénom.", nom: "Indiquez votre nom.",
    email: "Indiquez votre e-mail.", date: "Choisissez une date.",
    heure: "Choisissez une heure.", personnes: "Combien serez-vous ?",
  };

  const bind = (name: keyof FormData) => ({
    id: `res-${name}`,
    ...register(name, REQUIRED[name] ? { required: REQUIRED[name] } : {}),
    "aria-required": REQUIRED[name] ? true : undefined,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `res-${name}-error` : undefined,
  });

  const onSubmit = async (data: FormData) => {
    setError(false);
    // Jamais de succès sans envoi réel : sans configuration, le client doit
    // savoir que sa demande n'est pas partie.
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setError(true); return;
    }
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        prenom: data.prenom,
        nom: data.nom,
        email: data.email,
        tel: data.tel || "—",
        date: data.date,
        heure: data.heure,
        personnes: data.personnes,
        occasion: data.occasion || "Aucune en particulier",
        message: data.message || "—",
      }, { publicKey: EMAILJS_PUBLIC_KEY });
      setSuccess(true); reset();
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
          .res-field[aria-invalid="true"] { border-color: #E87070 !important; }
          .res-pair { display: grid; grid-template-columns: 1fr; gap: 0.875rem; }
          .res-trio { display: grid; grid-template-columns: 1fr 1fr; gap: 0.875rem; }
          .res-trio .res-date { grid-column: 1 / -1; }
          @media (min-width: 560px) {
            .res-pair { grid-template-columns: 1fr 1fr; }
            .res-trio { grid-template-columns: 1.3fr 1fr 1fr; }
            .res-trio .res-date { grid-column: auto; }
          }
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
                { label: "Paiement",  value: PAYMENT.join(", "), href: undefined },
              ].map(item => (
                <div key={item.label} style={{ paddingLeft: "1rem", borderLeft: `2px solid rgba(201,168,76,0.3)` }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: 6 }}>{item.label}</div>
                  {item.href ? (
                    <a href={item.href} style={{
                      display: "inline-block", padding: "6px 0",
                      fontSize: 16, color: TEXT.secondary, lineHeight: 1.65,
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
              <div role="status" style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                textAlign: "center", padding: "4rem 2rem",
                border: `1px solid rgba(201,168,76,0.2)`, gap: "1rem",
              }}>
                <CheckCircle size={44} weight="light" color={GOLD} />
                <h3 className="font-serif" style={{ fontSize: 26, fontWeight: 300, fontStyle: "italic", color: CREAM }}>
                  Demande envoyée.
                </h3>
                <p style={{ fontSize: 14, color: TEXT.secondary, maxWidth: "34ch", lineHeight: 1.6 }}>
                  Nous vous confirmerons votre réservation rapidement. À bientôt !
                </p>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                <div className="res-pair">
                  <Field id="prenom" label="Prénom" error={errors.prenom?.message}>
                    <input className="res-field" {...bind("prenom")} autoComplete="given-name" style={field} placeholder="Aminata" />
                  </Field>
                  <Field id="nom" label="Nom" error={errors.nom?.message}>
                    <input className="res-field" {...bind("nom")} autoComplete="family-name" style={field} placeholder="Diallo" />
                  </Field>
                </div>

                <div className="res-pair">
                  <Field id="email" label="E-mail" error={errors.email?.message}>
                    <input type="email" className="res-field" {...bind("email")} autoComplete="email" style={field} placeholder="aminata@gmail.com" />
                  </Field>
                  <Field id="tel" label="Téléphone">
                    <input type="tel" className="res-field" {...bind("tel")} autoComplete="tel" style={field} placeholder="+32 4XX XX XX XX" />
                  </Field>
                </div>

                <div className="res-trio">
                  <Field id="date" label="Date" error={errors.date?.message} className="res-date">
                    <input type="date" className="res-field" {...bind("date")} min={today || undefined} style={{ ...field, colorScheme: "dark" }} />
                  </Field>
                  <Field id="heure" label="Heure" error={errors.heure?.message}>
                    <select className="res-field" {...bind("heure")} style={field}>
                      <option value="">--</option>
                      {HEURES.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </Field>
                  <Field id="personnes" label="Personnes" error={errors.personnes?.message}>
                    <select className="res-field" {...bind("personnes")} style={field}>
                      <option value="">N°</option>
                      {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                      <option value="10+">10+</option>
                    </select>
                  </Field>
                </div>

                <Field id="occasion" label="Occasion (optionnel)">
                  <select className="res-field" {...bind("occasion")} style={field}>
                    <option value="">Aucune en particulier</option>
                    <option value="anniversaire">Anniversaire</option>
                    <option value="romantique">Dîner romantique</option>
                    <option value="professionnel">Repas professionnel</option>
                    <option value="famille">Repas en famille</option>
                  </select>
                </Field>

                <Field id="message" label="Message (optionnel)">
                  <textarea className="res-field" {...bind("message")} rows={3}
                    style={{ ...field, resize: "vertical" }}
                    placeholder="Allergies, préférences, demandes spéciales..." />
                </Field>

                {error && (
                  <p role="alert" style={{ fontSize: 13, color: "#E87070" }}>
                    Votre demande n&apos;a pas été envoyée. Réservez par WhatsApp ou au {phone.display}.
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
