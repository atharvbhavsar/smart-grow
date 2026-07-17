import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceCategoryClient from "@/components/services/ServiceCategoryClient";
import JsonLd from "@/components/seo/JsonLd";

interface Props {
  params: Promise<{ category: string }>;
}

const META_MAP: Record<string, { title: string; description: string; keywords: string[] }> = {
  "business-growth": {
    title: "Website Development & Business Growth Services in Pune | SmartlyGrow",
    description: "Scale your business with Pune's premier web development company. Custom Next.js web design, local SEO dominance, Google Business Profile optimization, and conversion platforms.",
    keywords: [
      "Website Development Company Pune",
      "Web Design Company Pune",
      "Best Web Development Company in Pune",
      "Digital Marketing Agency Pune",
      "SEO Services Pune"
    ]
  },
  "creative-services": {
    title: "Creative Services & Branding Company in Pune | SmartlyGrow",
    description: "Elevate your brand with high-retention video editing, visual design systems, custom thumbnail art, and brand identity design in Pune.",
    keywords: [
      "Branding Agency Pune",
      "UI UX Design Company Pune",
      "Video Editing Services Pune",
      "Graphic Design Company Pune"
    ]
  },
  "ai-solutions": {
    title: "AI Automation & AI Development Company in Pune | SmartlyGrow",
    description: "Deploy autonomous AI agents, automated CRM lead qualifying workflows, custom LLM models, and intelligence engines built by Pune's leading AI development company.",
    keywords: [
      "AI Automation Company Pune",
      "AI Development Company Pune",
      "AI Agents Pune",
      "Software Development Company Pune"
    ]
  }
};

export async function generateStaticParams() {
  return [
    { category: "business-growth" },
    { category: "creative-services" },
    { category: "ai-solutions" }
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const meta = META_MAP[category];

  if (!meta) {
    return {
      title: "Service Category Not Found | SmartlyGrow",
    };
  }

  const canonical = `https://smartlygrow.in/services/${category}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      type: "website",
      images: [
        {
          url: "/logo-new.png",
          alt: `${meta.title} - SmartlyGrow Pune`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/logo-new.png"],
    },
  };
}

export default async function ServiceCategoryPage({ params }: Props) {
  const { category } = await params;
  const meta = META_MAP[category];

  if (!meta) {
    notFound();
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": meta.title,
    "provider": {
      "@type": "LocalBusiness",
      "name": "SmartlyGrow - Best Web Development & AI Company in Pune",
      "url": "https://smartlygrow.in",
      "telephone": "+917020951401",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Koregaon Park",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "411001",
        "addressCountry": "IN"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": "Pune"
    },
    "description": meta.description
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
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
        "name": "Services",
        "item": "https://smartlygrow.in/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": meta.title,
        "item": `https://smartlygrow.in/services/${category}`
      }
    ]
  };

  return (
    <>
      <JsonLd schema={serviceSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <ServiceCategoryClient categorySlug={category} />
    </>
  );
}
