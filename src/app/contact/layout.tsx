import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Book a Free Consultation | SmartlyGrow AI & Web Agency",
  description: "Schedule a discovery scope call to audit your website speed, custom SaaS layout design, or AI agent routing systems.",
  alternates: {
    canonical: "https://smartlygrow.in/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://smartlygrow.in/contact/#webpage",
    "url": "https://smartlygrow.in/contact",
    "name": "Book a Free Consultation | SmartlyGrow AI & Web Agency",
    "description": "Schedule a discovery scope call to audit your website speed, custom SaaS layout design, or AI agent routing systems.",
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

  return (
    <>
      <JsonLd schema={schema} />
      {children}
    </>
  );
}
