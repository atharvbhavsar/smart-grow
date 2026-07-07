import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all bots to crawl public content
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/_next/",
          "/admin/dashboard",
          "/admin/seo",
        ],
      },
      {
        // Google Search — full access to all public pages
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        // Bing / Microsoft Bot — full access
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: "https://smartlygrow.in/sitemap.xml",
    host: "https://smartlygrow.in",
  };
}
