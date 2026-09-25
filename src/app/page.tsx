import React from "react";
import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Trust } from "@/components/home/Trust";
import { ServicesGrid } from "@/components/home/ServicesGrid";
// import { DarkVideoBanner } from "@/components/home/DarkVideoBanner";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
// import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { TeamGrid } from "@/components/home/TeamGrid";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { SocialPresence } from "@/components/home/SocialPresence";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Best Web Development Company in Pune | SmartlyGrow AI & Growth Studio",
  description: "SmartlyGrow is a top-rated Web Development & AI Automation Company in Pune, India. We engineer Next.js websites, AI agents, SEO rank systems, and custom web applications.",
  alternates: {
    canonical: "https://smartlygrow.in",
  },
  openGraph: {
    title: "Best Web Development Company in Pune | SmartlyGrow",
    description: "SmartlyGrow helps Pune businesses scale using custom Next.js web applications, AI automation, Google Business Profile optimization, and SEO systems.",
    url: "https://smartlygrow.in",
    siteName: "SmartlyGrow",
    images: [
      {
        url: "/logo-new.png",
        width: 1200,
        height: 630,
        alt: "SmartlyGrow Web Development Company Pune",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SmartlyGrow",
    "url": "https://smartlygrow.in",
    "logo": "https://smartlygrow.in/logo-new.png",
    "email": "aashish@smartlygrow.com",
    "telephone": "+917020951401",
    "sameAs": [
      "https://linkedin.com/company/smartlygrow",
      "https://x.com/smartlygrow",
      "https://instagram.com/smartlygrow"
    ],
    "founder": {
      "@type": "Person",
      "name": "Ashish Jumle"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "SmartlyGrow - Best Web Development & AI Company in Pune",
    "image": "https://smartlygrow.in/logo-new.png",
    "@id": "https://smartlygrow.in/#localbusiness",
    "url": "https://smartlygrow.in",
    "telephone": "+917020951401",
    "email": "aashish@smartlygrow.com",
    "priceRange": "$$",
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
    },
    "areaServed": [
      { "@type": "City", "name": "Pune" },
      { "@type": "State", "name": "Maharashtra" },
      { "@type": "Country", "name": "India" }
    ],
    "knowsAbout": [
      "Web Development Company Pune",
      "AI Automation Company Pune",
      "SEO Company Pune",
      "Google Business Profile Optimization Pune",
      "App Development Company Pune"
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SmartlyGrow",
    "url": "https://smartlygrow.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://smartlygrow.in/portfolio?query={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why is SmartlyGrow the best web development company in Pune?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SmartlyGrow builds custom Next.js platforms engineered for sub-second load speeds, modern SEO architecture, custom AI automation agents, and conversion-focused UI/UX design."
        }
      },
      {
        "@type": "Question",
        "name": "How does SmartlyGrow use AI to help my business grow?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We integrate advanced artificial intelligence directly into your digital platforms: sub-second Next.js sites, automated CRM pipelines, lead qualifying bots, and 24/7 AI customer support agents."
        }
      },
      {
        "@type": "Question",
        "name": "How fast can you deliver a completed website or automation pipeline?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our typical delivery time for custom landing pages is 7-14 days. For complex web portals and AI automation pipelines, it ranges from 3-6 weeks depending on requirements."
        }
      }
    ]
  };

  return (
    <main className="flex-1 w-full bg-white">
      <JsonLd schema={organizationSchema} />
      <JsonLd schema={localBusinessSchema} />
      <JsonLd schema={websiteSchema} />
      <JsonLd schema={faqSchema} />
      
      <Hero />
      <Trust />
      <ServicesGrid />
      {/* <DarkVideoBanner /> */}
      <PortfolioPreview />
      <SocialPresence />
      {/* <TestimonialsCarousel /> */}
      <TeamGrid />
      <FaqAccordion />
    </main>
  );
}
