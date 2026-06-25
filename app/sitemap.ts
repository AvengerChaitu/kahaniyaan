import { MetadataRoute } from "next";

const BASE = "https://dadima.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE,            priority: 1.0,  changeFrequency: "weekly"  },
    { url: `${BASE}/about`, priority: 0.8,  changeFrequency: "monthly" },
    { url: `${BASE}/blog`,  priority: 0.8,  changeFrequency: "weekly"  },
    { url: `${BASE}/help`,  priority: 0.7,  changeFrequency: "monthly" },
    { url: `${BASE}/contact`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE}/privacy`, priority: 0.4, changeFrequency: "yearly"  },
    { url: `${BASE}/terms`,   priority: 0.4, changeFrequency: "yearly"  },
    { url: `${BASE}/refund`,  priority: 0.4, changeFrequency: "yearly"  },
  ] as const;

  return staticPages.map(p => ({
    url:             p.url,
    lastModified:    new Date(),
    changeFrequency: p.changeFrequency as MetadataRoute.Sitemap[0]["changeFrequency"],
    priority:        p.priority,
  }));
}
