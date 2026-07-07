import { MetadataRoute } from "next";
import { blogPosts, projects, services } from "@/data/siteData";
import { teamProfiles } from "@/data/teamData";

const BASE_URL = "https://smartlygrow.in";

// Helper to format a Date to YYYY-MM-DD for lastmod
const toISODate = (date: Date): string => date.toISOString().split("T")[0];

const TODAY = toISODate(new Date());

export default function sitemap(): MetadataRoute.Sitemap {
  // ─── 1. Static Core Pages ──────────────────────────────────────────────────
  const corePages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: TODAY,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: TODAY,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: TODAY,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: TODAY,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: TODAY,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/packages`,
      lastModified: TODAY,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: TODAY,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: TODAY,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: TODAY,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // ─── 2. Dynamic Service Category Pages ─────────────────────────────────────
  // Derive unique category slugs directly from the services data to stay in sync
  const uniqueCategories = [...new Set(services.map((s) => s.category))];
  const categorySlugMap: Record<string, string> = {
    "digital-products": "business-growth",
    "ai-solutions": "ai-solutions",
    "creative-services": "creative-services",
    "growth-services": "business-growth",
  };

  const servicePageCategories = [
    "business-growth",
    "ai-solutions",
    "creative-services",
  ];

  // Also add service category pages based on uniqueCategories, mapped to route slugs
  const serviceCategorySet = new Set<string>();
  uniqueCategories.forEach((cat) => {
    const slug = categorySlugMap[cat];
    if (slug) serviceCategorySet.add(slug);
  });
  // Always include all three valid route slugs
  servicePageCategories.forEach((s) => serviceCategorySet.add(s));

  const serviceCategoryUrls: MetadataRoute.Sitemap = [...serviceCategorySet].map(
    (cat) => ({
      url: `${BASE_URL}/services/${cat}`,
      lastModified: TODAY,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })
  );

  // ─── 3. Dynamic Portfolio / Project Pages ──────────────────────────────────
  const portfolioUrls: MetadataRoute.Sitemap = projects.map((proj) => ({
    url: `${BASE_URL}/portfolio/${proj.id}`,
    lastModified: TODAY,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // ─── 4. Dynamic Team Member Profile Pages ──────────────────────────────────
  const teamUrls: MetadataRoute.Sitemap = Object.keys(teamProfiles).map(
    (slug) => ({
      url: `${BASE_URL}/team/${slug}`,
      lastModified: TODAY,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  // ─── 5. Dynamic Blog Post Pages ────────────────────────────────────────────
  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.id}`,
    lastModified: TODAY,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // ─── Final: Return de-duplicated merged list ────────────────────────────────
  const allUrls: MetadataRoute.Sitemap = [
    ...corePages,
    ...serviceCategoryUrls,
    ...portfolioUrls,
    ...teamUrls,
    ...blogUrls,
  ];

  // Deduplicate by URL
  const seen = new Set<string>();
  return allUrls.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
