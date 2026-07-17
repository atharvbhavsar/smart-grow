import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/siteData";
import CaseStudyClient from "@/components/portfolio/CaseStudyClient";
import JsonLd from "@/components/seo/JsonLd";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Case Study Not Found | SmartlyGrow",
    };
  }

  const title = `${project.companyName} Case Study | Web Development & AI Pune | SmartlyGrow`;
  const description = `${project.companyName}: ${project.tagline}. Explore how SmartlyGrow engineered Next.js web systems and AI automation for verified client impact.`;
  const canonical = `https://smartlygrow.in/portfolio/${id}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: [
        {
          url: project.image || "/logo-new.png",
          alt: `${project.companyName} Web Development Case Study Pune`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.image || "/logo-new.png"],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const relatedProjects = projects
    .filter((p) => p.categorySlug === project.categorySlug && p.id !== project.id)
    .slice(0, 3);

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": `${project.companyName} Case Study`,
    "headline": project.tagline,
    "description": project.description,
    "creator": {
      "@type": "Organization",
      "name": "SmartlyGrow",
      "url": "https://smartlygrow.in",
    },
    "image": project.image || "https://smartlygrow.in/logo-new.png",
    "url": `https://smartlygrow.in/portfolio/${id}`,
    "keywords": project.servicesBuilt,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://smartlygrow.in",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Portfolio",
        "item": "https://smartlygrow.in/portfolio",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": project.companyName,
        "item": `https://smartlygrow.in/portfolio/${id}`,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={creativeWorkSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <CaseStudyClient project={project} relatedProjects={relatedProjects} />
    </>
  );
}
