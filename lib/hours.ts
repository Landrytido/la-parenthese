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
