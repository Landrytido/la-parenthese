/** URL publique du site — source unique pour metadata, canonical, JSON-LD,
 *  sitemap et robots.
 *  ATTENTION : `la-parenthese.vercel.app` (sans le suffixe `-nu`) appartient à
 *  un autre restaurant du même nom, à Sète. Ne pas y revenir.
 *  À changer ici, et ici seulement, le jour d'un domaine personnalisé. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://la-parenthese-nu.vercel.app";

export type SocialLink = {
  label: string;
  href: string;
  icon: "facebook" | "instagram" | "google";
};

/** Profils officiels du restaurant.
 *
 *  Alimente DEUX choses à la fois : l'icône du footer et le champ `sameAs` du
 *  JSON-LD, qui indique à Google que ce site et cette entreprise sont une seule
 *  et même entité — c'est ce qui relie le site à la fiche Google Business.
 *
 *  Note : on pointe la FICHE, pas le lien `/review`. `sameAs` doit désigner la
 *  page de l'entité, pas une action. Le lien pour déposer un avis est le même
 *  suivi de `/review` — utile comme bouton, pas comme identité. */
export const SOCIAL: SocialLink[] = [
  {
    label: "La Parenthèse sur Google Maps",
    href: "https://g.page/r/CRi--Qk901p5EBM",
    icon: "google",
  },
];

/** Lien direct vers le formulaire d'avis Google. Les avis sont le premier
 *  facteur de classement local — non utilisé pour l'instant. */
export const REVIEW_URL = "https://g.page/r/CRi--Qk901p5EBM/review";

export const RESTAURANT = {
  name:    "La Parenthèse",
  address: "Boulevard de la Révision 5, 1070 Anderlecht, Bruxelles",
  phone: {
    raw:     "026496087",
    display: "02 649 60 87",
    href:    "tel:+3226496087",
  },
  whatsapp: {
    number:  "32465857417",
    display: "+32 465 85 74 17",
  },
  email: "contact@laparenthese.be",
  hours: {
    label:    "Lun – Dim",
    weekday:  "12h – 00h",
    weekend:  "12h – 02h",
    full:     "Lun – Ven : 12h – 00h\nSam – Dim : 12h – 02h",
  },
  since: "2019",
} as const;
