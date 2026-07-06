import type { Metadata } from "next";
import { projects } from "@/data/siteData";
import JsonLd from "@/components/seo/JsonLd";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id) || projects[0];

  return {
    title: `${project.companyName} Case Study | SmartlyGrow`,
    description: project.tagline || project.description,
    alternates: {
      canonical: `https://smartlygrow.in/portfolio/${id}`,
    },
    openGraph: {
      title: `${project.companyName} Case Study | SmartlyGrow`,
      description: project.tagline || project.description,
      images: [
        {
          url: project.image,
          alt: `${project.companyName} Case Study`,
        }
      ]
    }
  };
}

export default async function ProjectDetailLayout({ children, params }: LayoutProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id) || projects[0];

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "url": `https://smartlygrow.in/portfolio/${project.id}`,
    "image": `https://smartlygrow.in${project.image}`,
    "provider": {
      "@type": "Organization",
      "name": "SmartlyGrow",
      "url": "https://smartlygrow.in"
    },
    "about": {
      "@type": "Thing",
      "name": project.category
    },
    "publisher": {
      "@type": "Organization",
      "name": "SmartlyGrow"
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
        "name": "Portfolio",
        "item": "https://smartlygrow.in/portfolio"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": project.companyName,
        "item": `https://smartlygrow.in/portfolio/${project.id}`
      }
    ]
  };

  return (
    <>
      <JsonLd schema={creativeWorkSchema} />
      <JsonLd schema={breadcrumbSchema} />
      {children}
    </>
  );
}
