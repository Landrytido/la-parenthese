import { ImageResponse } from "next/og";

import { RESTAURANT } from "@/lib/constants";

export const alt =
  "La Parenthèse — Restaurant africain à Anderlecht, Bruxelles";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const DARK = "#1A1008";
const CREAM = "#F5EDD8";
const GOLD = "#C9A84C";

/** La marque, inlinée en data URI : Satori (le moteur d'ImageResponse) ne lit
 *  pas les fichiers du dossier public au rendu. */
const MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="240" height="240">
  <g fill="none" stroke="${GOLD}" stroke-width="5.5" stroke-linecap="round">
    <path d="M30 18 C 17 35, 17 65, 30 82" /><path d="M70 18 C 83 35, 83 65, 70 82" /></g>
  <g fill="none" stroke="${GOLD}" stroke-linejoin="round" stroke-linecap="round">
    <path d="M50 26 C 62 40, 62 60, 50 74 C 38 60, 38 40, 50 26 Z" stroke-width="4" />
    <path d="M50 30 L50 79" stroke-width="3.4" />
    <path d="M50 60 L40 51" stroke-width="3" /><path d="M50 60 L60 51" stroke-width="3" />
    <path d="M50 49 L41.5 41" stroke-width="3" /><path d="M50 49 L58.5 41" stroke-width="3" /></g></svg>`;

const markSrc = `data:image/svg+xml;base64,${Buffer.from(MARK).toString("base64")}`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 64,
          background: DARK,
          borderBottom: `10px solid ${GOLD}`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markSrc} width={240} height={240} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, color: CREAM, letterSpacing: -1 }}>
            La Parenthèse
          </div>
          <div style={{ fontSize: 30, color: GOLD, marginTop: 14 }}>
            Restaurant africain · Anderlecht, Bruxelles
          </div>
          <div style={{ fontSize: 25, color: "rgba(245,237,216,0.72)", marginTop: 22 }}>
            {RESTAURANT.address}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
