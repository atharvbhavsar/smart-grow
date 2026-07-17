import React from "react";
import type { Metadata } from "next";
import ContactFormClient from "@/components/contact/ContactFormClient";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Book a Free Consultation | Web Development & AI Company Pune | SmartlyGrow",
  description: "Schedule a free 30-minute technical discovery call with SmartlyGrow Pune. Audit your website load speed, custom Next.js architecture, local SEO rankings, or AI automation pipelines.",
  alternates: {
    canonical: "https://smartlygrow.in/contact",
  },
  openGraph: {
    title: "Book a Free Consultation | SmartlyGrow Pune",
    description: "Schedule a free 30-minute technical discovery call with SmartlyGrow Pune. Audit your website speed, custom Next.js architecture, or AI automation pipelines.",
    url: "https://smartlygrow.in/contact",
    siteName: "SmartlyGrow",
    images: [
      {
        url: "/logo-new.png",
        width: 1200,
        height: 630,
        alt: "SmartlyGrow Contact Consultation Pune",
      },
    ],
  },
};

export default function ContactPage() {
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Book a Free Discovery Call - SmartlyGrow Pune",
    "url": "https://smartlygrow.in/contact",
    "description": "Schedule a 30-minute discovery call with SmartlyGrow engineers to map out website development, SEO, or AI automation solutions.",
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
          "name": "Contact",
          "item": "https://smartlygrow.in/contact"
        }
      ]
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "SmartlyGrow - Best Web Development & AI Company in Pune",
    "url": "https://smartlygrow.in",
    "telephone": "+917020951401",
    "email": "aashish@smartlygrow.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Koregaon Park",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.5362,
      "longitude": 73.8930
    }
  };

  return (
    <>
      <JsonLd schema={contactPageSchema} />
      <JsonLd schema={localBusinessSchema} />
      <ContactFormClient />
    </>
  );
}
