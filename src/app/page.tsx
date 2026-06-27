import React from "react";
import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Trust } from "@/components/home/Trust";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { DarkVideoBanner } from "@/components/home/DarkVideoBanner";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { TeamGrid } from "@/components/home/TeamGrid";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { SocialPresence } from "@/components/home/SocialPresence";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "SmartyGrow | AI Powered Business Growth Agency",
  description: "SmartyGrow helps startups, SMEs, and creators scale operations and command digital authority through premium websites, AI workflow automations, and custom AI agents.",
  openGraph: {
    title: "SmartyGrow | AI Powered Business Growth Agency",
    description: "Scale operations and attract customers using custom Next.js systems and intelligent AI agents.",
    url: "https://smartygrow.com",
    siteName: "SmartyGrow",
    images: [
      {
        url: "/next.svg",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="flex-1 w-full bg-white">
      <Hero />
      <Trust />
      <ServicesGrid />
      <DarkVideoBanner />
      <PortfolioPreview />
      <SocialPresence />
      <TestimonialsCarousel />
      <TeamGrid />
      <FaqAccordion />
      <FinalCta />
    </main>
  );
}
