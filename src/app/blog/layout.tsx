import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Blog & Insights | SmartlyGrow AI & Web Agency",
  description: "Read technical guides on Next.js frontend performance, vector search engine designs, and SEO traffic blueprints.",
  alternates: {
    canonical: "https://smartlygrow.in/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://smartlygrow.in/blog/#webpage",
    "url": "https://smartlygrow.in/blog",
    "name": "Blog & Insights | SmartlyGrow AI & Web Agency",
    "description": "Read technical guides on Next.js frontend performance, vector search engine designs, and SEO traffic blueprints.",
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
          "name": "Blog",
          "item": "https://smartlygrow.in/blog"
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
