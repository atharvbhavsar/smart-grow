import React from "react";
import type { Metadata } from "next";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Website Development & AI Automation Services in Pune | SmartlyGrow",
  description: "Explore SmartlyGrow's core services: Custom Next.js website development, AI workflow automation agents, local SEO dominance, Google Business Profile optimization, and B2B growth systems.",
  alternates: {
    canonical: "https://smartlygrow.in/services",
  },
  openGraph: {
    title: "Website Development & AI Automation Services in Pune | SmartlyGrow",
    description: "Explore SmartlyGrow's core services: Custom Next.js website development, AI workflow automation agents, local SEO dominance, and B2B growth systems.",
    url: "https://smartlygrow.in/services",
    siteName: "SmartlyGrow",
    images: [
      {
        url: "/logo-new.png",
        width: 1200,
        height: 630,
        alt: "SmartlyGrow Services Pune",
      },
    ],
  },
};

export default function ServicesPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Web Development & AI Automation",
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
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "SmartlyGrow Services Catalog",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Website Development Services Pune"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Automation Services Pune"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO & Google Business Profile Optimization Pune"
          }
        }
      ]
    }
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
      }
    ]
  };

  return (
    <main className="flex-1 bg-white font-sans pt-20">
      <JsonLd schema={serviceSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <ServicesGrid />
    </main>
  );
}
