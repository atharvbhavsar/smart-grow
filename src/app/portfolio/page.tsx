import React from "react";
import type { Metadata } from "next";
import PortfolioClient from "@/components/portfolio/PortfolioClient";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Our Work & Portfolio | Websites, Social Growth, Ads & Real Estate | SmartlyGrow",
  description: "Explore SmartlyGrow's visual portfolio showcasing custom Next.js websites, high-growth social media campaigns, performance marketing ads, cinematic video edits, and dedicated real estate solutions.",
  alternates: {
    canonical: "https://smartlygrow.in/portfolio",
  },
  openGraph: {
    title: "Portfolio — Work That Speaks For Itself | SmartlyGrow",
    description: "Explore SmartlyGrow's curated work: Websites, Social Media Growth, Performance Ads, Video Editing & Real Estate Systems.",
    url: "https://smartlygrow.in/portfolio",
    siteName: "SmartlyGrow",
    images: [
      {
        url: "/shree-ganesha.png",
        width: 1200,
        height: 630,
        alt: "SmartlyGrow Portfolio Work",
      },
    ],
  },
};

export default function PortfolioPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "SmartlyGrow Portfolio — Work That Speaks For Itself",
    "url": "https://smartlygrow.in/portfolio",
    "description": "Visual portfolio of websites, social media management, performance marketing, video editing, and real estate marketing engineered by SmartlyGrow.",
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
