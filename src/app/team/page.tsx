import React from "react";
import type { Metadata } from "next";
import TeamPageClient from "@/components/team/TeamPageClient";
import JsonLd from "@/components/seo/JsonLd";
import { teamProfiles } from "@/data/teamData";

export const metadata: Metadata = {
  title: "Our Team | People Behind the Work | SmartlyGrow Pune",
  description:
    "Meet the leadership, marketing, and development team at SmartlyGrow. Meet the founders, systems architects, and designers engineering digital growth systems in Pune.",
  alternates: {
    canonical: "https://smartlygrow.in/team",
  },
  openGraph: {
    title: "Our Team | SmartlyGrow Digital & AI Studio Pune",
    description:
      "Meet the leadership, marketing, and engineering experts behind SmartlyGrow. Discover the developers, designers, and growth architects building high-performance digital systems.",
    url: "https://smartlygrow.in/team",
    siteName: "SmartlyGrow",
    images: [
      {
        url: "/photo/founder.png",
        width: 1200,
        height: 630,
        alt: "SmartlyGrow Leadership Team - Pune",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Team | SmartlyGrow Pune",
    description:
      "Meet the leadership, marketing, and engineering team bringing strategy, creativity, and AI automation to modern businesses.",
    images: ["/photo/founder.png"],
  },
};

export default function TeamPage() {
  const membersList = Object.values(teamProfiles);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://smartlygrow.in",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Team",
        "item": "https://smartlygrow.in/team",
      },
    ],
  };

  const teamSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "SmartlyGrow Team",
    "description": "The leadership, engineering, and creative specialists at SmartlyGrow Pune.",
    "numberOfItems": membersList.length,
    "itemListElement": membersList.map((m, index) => ({
      "@type": "Person",
      "position": index + 1,
      "name": m.name,
      "jobTitle": m.role,
      "url": `https://smartlygrow.in/team/${m.slug}`,
      "image": m.image.startsWith("http") ? m.image : `https://smartlygrow.in${m.image}`,
      "worksFor": {
        "@type": "Organization",
        "name": "SmartlyGrow",
        "url": "https://smartlygrow.in",
      },
    })),
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={teamSchema} />
      <TeamPageClient />
    </>
  );
}
