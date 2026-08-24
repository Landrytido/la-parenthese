/** Statut d'ouverture calculé à l'heure de Bruxelles, pas à celle du visiteur.
 *
 *  Horaires (cf. RESTAURANT.hours) :
 *    Lun – Ven : 12h – 00h
 *    Sam – Dim : 12h – 02h
 *
 *  Les services du week-end débordent après minuit : la fermeture est donc
 *  exprimée en heures depuis minuit du jour d'ouverture (24 = minuit, 26 = 2h). */

const TZ = "Europe/Brussels";
const OPEN_HOUR = 12;

const DAY_INDEX: Record<string, number> = {
  Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
};

function closingHour(day: number): number {
  return day === 0 || day === 6 ? 26 : 24;
}

function formatHour(h: number): string {
  return h === 0 ? "minuit" : `${h}h`;
}

function brusselsParts(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) => parts.find(p => p.type === type)?.value ?? "";

  return {
    day: DAY_INDEX[get("weekday")] ?? 0,
    // hourCycle h23 peut renvoyer "24" à minuit selon l'implémentation
    hours: Number(get("hour")) % 24,
    minutes: Number(get("minute")),
  };
}

/** Dernier créneau de réservation proposé.
 *  Le service est continu de 12h à minuit (2h le week-end), mais on ne prend
 *  pas de réservation jusqu'à l'heure de fermeture.
 *  23h est une hypothèse : l'heure de dernière commande en cuisine reste à
 *  confirmer avec le restaurant. */
const LAST_SLOT_HOUR = 23;

/** Créneaux du formulaire de réservation, dérivés des horaires réels.
 *  Auparavant codés en dur de 12h à 14h puis 19h à 22h30, ce qui laissait
 *  croire à une coupure l'après-midi alors que le service est continu. */
export function reservationSlots(stepMinutes = 30): string[] {
  const out: string[] = [];
  for (let m = OPEN_HOUR * 60; m <= LAST_SLOT_HOUR * 60; m += stepMinutes) {
    const h = Math.floor(m / 60);
    const min = m % 60;
    out.push(`${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`);
  }
  return out;
}

export type OpenState = {
  open: boolean;
  /** "Ouvert" | "Fermé" */
  label: string;
  /** "ferme à minuit" | "ouvre à 12h" */
  detail: string;
};

export function getOpenState(now: Date = new Date()): OpenState {
  const { day, hours, minutes } = brusselsParts(now);
  const t = hours + minutes / 60;

  // Encore dans le service de la veille (qui a débordé après minuit) ?
  const spill = closingHour((day + 6) % 7) - 24;
  if (t < spill) {
    return { open: true, label: "Ouvert", detail: `ferme à ${formatHour(spill)}` };
  }

  if (t >= OPEN_HOUR) {
    return {
      open: true,
      label: "Ouvert",
      detail: `ferme à ${formatHour(closingHour(day) % 24)}`,
    };
  }

  return { open: false, label: "Fermé", detail: `ouvre à ${formatHour(OPEN_HOUR)}` };
}
