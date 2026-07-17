import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { teamProfiles } from "@/data/teamData";
import { projects } from "@/data/siteData";
import TeamMemberClient from "@/components/team/TeamMemberClient";
import JsonLd from "@/components/seo/JsonLd";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(teamProfiles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = teamProfiles[slug];

  if (!profile) {
    return {
      title: "Team Member Not Found | SmartlyGrow",
    };
  }

  const title = `${profile.name} | ${profile.role} at SmartlyGrow Pune`;
  const description = `${profile.name} is ${profile.role} at SmartlyGrow Pune. ${profile.introduce}`;
  const canonical = `https://smartlygrow.in/team/${slug}`;

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
      type: "profile",
      images: [
        {
          url: profile.image.startsWith("http") ? profile.image : `https://smartlygrow.in${profile.image}`,
          alt: `${profile.name} - ${profile.role} at SmartlyGrow Pune`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [profile.image.startsWith("http") ? profile.image : `https://smartlygrow.in${profile.image}`],
    },
  };
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params;
  const profile = teamProfiles[slug];

  if (!profile) {
    notFound();
  }

  const memberProjects = projects.filter((p) => profile.projectIds.includes(p.id));

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": profile.name,
    "jobTitle": profile.role,
    "worksFor": {
      "@type": "Organization",
      "name": "SmartlyGrow",
      "url": "https://smartlygrow.in",
    },
    "image": profile.image.startsWith("http") ? profile.image : `https://smartlygrow.in${profile.image}`,
    "description": profile.aboutText,
    "email": profile.contact.email,
    "sameAs": Object.values(profile.socials).filter(Boolean),
    "knowsAbout": profile.skills.map((s) => s.name),
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
        "name": "About",
        "item": "https://smartlygrow.in/about",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": profile.name,
        "item": `https://smartlygrow.in/team/${slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={personSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <TeamMemberClient profile={profile} memberProjects={memberProjects} />
    </>
  );
}
