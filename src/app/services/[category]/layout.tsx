import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

const CATEGORY_MAP: Record<string, { title: string; subtitle: string }> = {
  "business-growth": {
    title: "Business Growth Solutions",
    subtitle: "High-performance digital systems, local SEO dominance, and web platforms built for rapid B2B revenue expansion."
  },
  "creative-services": {
    title: "Creative Visual Services",
    subtitle: "High-retention video production, custom visual identities, thumbnail art, and brand asset systems."
  },
  "ai-solutions": {
    title: "Enterprise AI Solutions",
    subtitle: "Autonomous LLM agents, 24/7 lead triage, CRM integrations, and intelligence automation engines."
  }
};

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const categoryInfo = CATEGORY_MAP[category] || { title: "Services", subtitle: "Explore our professional digital growth services." };

  return {
    title: `${categoryInfo.title} | SmartlyGrow`,
    description: categoryInfo.subtitle,
    alternates: {
      canonical: `https://smartlygrow.in/services/${category}`,
    },
  };
}

export default async function ServiceCategoryLayout({ children, params }: LayoutProps) {
  const { category } = await params;
  const categoryInfo = CATEGORY_MAP[category] || { title: "Services", subtitle: "Explore our professional digital growth services." };

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://smartlygrow.in/services/${category}/#webpage`,
    "url": `https://smartlygrow.in/services/${category}`,
    "name": `${categoryInfo.title} | SmartlyGrow`,
    "description": categoryInfo.subtitle,
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
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": categoryInfo.title,
          "item": `https://smartlygrow.in/services/${category}`
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
