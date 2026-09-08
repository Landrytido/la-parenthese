import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Pinyon_Script } from "next/font/google";

import { SITE_URL, SOCIAL, PAYMENT } from "@/lib/constants";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pinyon",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "La Parenthèse — Restaurant Africain à Anderlecht, Bruxelles",
    template: "%s | La Parenthèse — Restaurant Africain",
  },
  description:
    "Restaurant camerounais et africain à Anderlecht (Bruxelles). Ndolé, Eru, Kontchap, poulet DG, brochettes, poisson braisé. Ouvert 7j/7 dès 12h (jusqu'à 2h le week-end). Réservation par téléphone ou WhatsApp.",
  keywords: [
    "restaurant africain Bruxelles",
    "restaurant africain Anderlecht",
    "cuisine africaine Belgique",
    "restaurant camerounais Bruxelles",
    "Ndolé Bruxelles",
    "La Parenthèse Anderlecht",
    "La Parenthèse restaurant africain",
  ],
  openGraph: {
    title: "La Parenthèse — Restaurant Africain à Anderlecht",
    description:
      "Cuisine camerounaise et africaine au cœur d'Anderlecht. Ndolé, Eru, grillades, ambiance chaleureuse. Réservations disponibles.",
    url: SITE_URL,
    siteName: "La Parenthèse — Restaurant Africain",
    locale: "fr_BE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Parenthèse — Restaurant Africain à Anderlecht",
    description:
      "Cuisine africaine authentique au cœur d'Anderlecht. Réservations disponibles.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: SITE_URL,
  },
  // Jeton public, permanent, propre à la propriété Search Console. Rien à
  // cacher, rien à faire varier selon l'environnement : en variable d'env, un
  // oubli de configuration ferait disparaître la balise sans le moindre signal.
  verification: { google: "6C_NU4a0x5wyHo00NEp9KYa01jHuMgFuh0M7QlEp_Sk" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  // `name` garde le nom exact de l'enseigne. La distinction d'avec les autres
  // « La Parenthèse » passe par les deux champs suivants, prevus pour ca —
  // pas par une repetition du mot-cle, que Google traite comme du bourrage.
  name: "La Parenthèse",
  alternateName: "La Parenthèse Restaurant Africain",
  disambiguatingDescription:
    "Restaurant camerounais et africain situé Boulevard de la Révision 5 à Anderlecht, Bruxelles — à ne pas confondre avec les autres établissements nommés La Parenthèse.",
  description:
    "Restaurant camerounais et africain à Anderlecht, Bruxelles.",
  url: SITE_URL,
  telephone: "+32465857417",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Boulevard de la Révision 5",
    addressLocality: "Anderlecht",
    postalCode: "1070",
    addressCountry: "BE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.8393,
    longitude: 4.2966,
  },
  servesCuisine: [
    "Cuisine africaine",
    "Cuisine d'Afrique centrale",
    "Cuisine camerounaise",
  ],
  priceRange: "€€",
  paymentAccepted: PAYMENT.join(", "),
  currenciesAccepted: "EUR",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "12:00",
      closes: "00:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "12:00",
      closes: "02:00",
    },
  ],
  hasMap: `https://maps.google.com/maps?q=Boulevard+de+la+R%C3%A9vision+5%2C+1070+Anderlecht`,
  // Relie ce site à la fiche Google Business et aux réseaux : c'est ce qui dit
  // à Google « ce site et cette entreprise sont la même entité ».
  // Se remplit tout seul dès qu'on ajoute une entrée dans SOCIAL.
  sameAs: SOCIAL.map(s => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${jost.variable} ${pinyon.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
