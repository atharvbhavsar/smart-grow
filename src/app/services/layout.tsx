import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Our Services | SmartlyGrow AI & Web Startup",
  description: "Explore our AI solutions, creative services, and business growth services designed to automate tasks and drive B2B revenue.",
  alternates: {
    canonical: "https://smartlygrow.in/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://smartlygrow.in/services/#webpage",
    "url": "https://smartlygrow.in/services",
    "name": "Our Services | SmartlyGrow AI & Web Startup",
    "description": "Explore our AI solutions, creative services, and business growth services designed to automate tasks and drive B2B revenue.",
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
          "name": "Services",
          "item": "https://smartlygrow.in/services"
        }
      ]
    }
  };

  return (
    <>
      <JsonLd schema={servicesSchema} />
      {children}
    </>
  );
}
