/** Palette 60-30-10 — source unique de vérité.
 *  Les mêmes valeurs sont exposées en CSS dans app/globals.css (@theme). */
export const DARK  = "#1A1008";
export const CREAM = "#F5EDD8";
export const GOLD  = "#C9A84C";

/** Échelle de contraste sur fond sombre.
 *  Ne jamais descendre sous `muted` : en dessous on passe sous le seuil WCAG AA
 *  et le texte devient illisible en plein jour sur mobile. */
export const TEXT = {
  primary:   "rgba(245,237,216,0.92)",
  secondary: "rgba(245,237,216,0.72)",
  muted:     "rgba(245,237,216,0.55)",
} as const;

/** Statut d'ouverture — les deux seules couleurs hors palette du site.
 *  Volontairement désaturées et tirées vers le chaud : un vert/rouge primaire
 *  jurerait sur le brun. La couleur n'est jamais le seul signal, le libellé
 *  « Ouvert »/« Fermé » est toujours affiché à côté. */
export const STATUS = {
  open:   "#7FA65C",
  closed: "#C4553A",
} as const;

/** Même échelle, sur fond crème. */
export const TEXT_ON_CREAM = {
  primary:   "rgba(26,16,8,0.92)",
  secondary: "rgba(26,16,8,0.75)",
  muted:     "rgba(26,16,8,0.6)",
} as const;
