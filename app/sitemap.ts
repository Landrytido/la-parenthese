import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/constants";

/** Le site est une page unique : les sections (#menu, #reservation…) sont des
 *  ancres, pas des URL distinctes. Les lister ici serait faux — Google les
 *  ignorerait, voire les signalerait comme doublons. Une seule entrée. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
