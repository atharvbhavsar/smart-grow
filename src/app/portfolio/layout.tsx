import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Case Studies & Portfolio | SmartlyGrow AI & Web Agency",
  description: "Explore our software engineering and AI workflow projects, outlining actual bottom-line growth achievements and conversion statistics.",
  alternates: {
    canonical: "https://smartlygrow.in/portfolio",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://smartlygrow.in/portfolio/#webpage",
    "url": "https://smartlygrow.in/portfolio",
    "name": "Case Studies & Portfolio | SmartlyGrow AI & Web Agency",
    "description": "Explore our software engineering and AI workflow projects, outlining actual bottom-line growth achievements and conversion statistics.",
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
      <JsonLd schema={schema} />
      {children}
    </>
  );
}
