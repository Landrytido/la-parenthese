import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Pinyon_Script } from "next/font/google";
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://la-parenthese.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "La Parenthèse — Restaurant Africain à Anderlecht, Bruxelles",
    template: "%s | La Parenthèse",
  },
  description:
    "Restaurant africain authentique à Anderlecht (Bruxelles). Cuisine d'Afrique de l'Ouest : Ndolé, Thiéboudienne, Eru, brochettes. Ouvert Lun–Dim 12h–00h. Réservation par téléphone ou WhatsApp.",
  keywords: [
    "restaurant africain Bruxelles",
    "restaurant africain Anderlecht",
    "cuisine africaine Belgique",
    "restaurant camerounais Bruxelles",
    "restaurant sénégalais Bruxelles",
    "Ndolé Bruxelles",
    "Thiéboudienne Bruxelles",
    "La Parenthèse Anderlecht",
  ],
  openGraph: {
    title: "La Parenthèse — Restaurant Africain à Anderlecht",
    description:
      "Cuisine africaine authentique au cœur d'Anderlecht. Saveurs d'Afrique de l'Ouest, ambiance chaleureuse. Réservations disponibles.",
    url: SITE_URL,
    siteName: "La Parenthèse",
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
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "La Parenthèse",
  description:
    "Restaurant africain authentique à Anderlecht, Bruxelles. Cuisine d'Afrique de l'Ouest.",
  url: SITE_URL,
  telephone: "+3226496087",
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
    "Cuisine d'Afrique de l'Ouest",
    "Cuisine camerounaise",
    "Cuisine sénégalaise",
    "Cuisine congolaise",
  ],
  priceRange: "€€",
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
  sameAs: [] as string[],
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
