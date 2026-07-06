import { MetadataRoute } from "next";
import { blogPosts, projects } from "@/data/siteData";
import { teamProfiles } from "@/data/teamData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://smartlygrow.in";

  // Static URLs
  const staticUrls = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/blog",
    "/contact",
    "/packages",
    "/terms",
    "/privacy"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8
  }));

  // Service categories
  const serviceCategories = ["business-growth", "creative-services", "ai-solutions"];
  const serviceUrls = serviceCategories.map((cat) => ({
    url: `${baseUrl}/services/${cat}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  // Dynamic portfolio items
  const portfolioUrls = projects.map((proj) => ({
    url: `${baseUrl}/portfolio/${proj.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  // Dynamic team profile items
  const teamUrls = Object.keys(teamProfiles).map((slug) => ({
    url: `${baseUrl}/team/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  // Dynamic blog post items
  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7
  }));

  return [
    ...staticUrls,
    ...serviceUrls,
    ...portfolioUrls,
    ...teamUrls,
    ...blogUrls
  ];
}
