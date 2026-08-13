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
