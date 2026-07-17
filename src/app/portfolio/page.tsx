import React from "react";
import type { Metadata } from "next";
import PortfolioClient from "@/components/portfolio/PortfolioClient";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Case Studies & Portfolio | Web Development & AI Projects Pune | SmartlyGrow",
  description: "Explore SmartlyGrow's proven case studies in Next.js web development, AI workflow automation pipelines, SEO rank platforms, and custom SaaS software.",
  alternates: {
    canonical: "https://smartlygrow.in/portfolio",
  },
  openGraph: {
    title: "Case Studies & Portfolio | SmartlyGrow Pune",
    description: "Explore SmartlyGrow's proven case studies in Next.js web development, AI workflow automation pipelines, and custom SaaS software.",
    url: "https://smartlygrow.in/portfolio",
    siteName: "SmartlyGrow",
    images: [
      {
        url: "/logo-new.png",
        width: 1200,
        height: 630,
        alt: "SmartlyGrow Portfolio Case Studies",
      },
    ],
  },
};

export default function PortfolioPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "SmartlyGrow Portfolio & Case Studies",
    "url": "https://smartlygrow.in/portfolio",
    "description": "Verified case studies, web engineering deliverables, and AI automations built for clients by SmartlyGrow Pune.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://smartlygrow.in"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Portfolio",
          "item": "https://smartlygrow.in/portfolio"
        }
      ]
    }
  };

  return (
    <>
      <JsonLd schema={collectionSchema} />
      <PortfolioClient />
    </>
  );
}
