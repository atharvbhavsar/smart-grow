import type { Metadata } from "next";
import { teamProfiles } from "@/data/teamData";
import JsonLd from "@/components/seo/JsonLd";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const profile = teamProfiles[slug];

  if (!profile) {
    return {
      title: "Team Member Profile",
    };
  }

  return {
    title: `${profile.name} - ${profile.role} | SmartlyGrow`,
    description: profile.introduce,
    alternates: {
      canonical: `https://smartlygrow.in/team/${slug}`,
    },
    openGraph: {
      title: `${profile.name} - ${profile.role} | SmartlyGrow`,
      description: profile.introduce,
      images: [
        {
          url: profile.image,
          alt: profile.name,
        }
      ]
    }
  };
}

export default async function TeamMemberLayout({ children, params }: LayoutProps) {
  const { slug } = await params;
  const profile = teamProfiles[slug];

  if (!profile) {
    return <>{children}</>;
  }

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": profile.name,
    "jobTitle": profile.role,
    "worksFor": {
      "@type": "Organization",
      "name": "SmartlyGrow",
      "url": "https://smartlygrow.in"
    },
    "image": `https://smartlygrow.in${profile.image}`,
    "description": profile.aboutText,
    "email": profile.contact.email,
    "sameAs": [
      profile.socials.linkedin,
      profile.socials.github,
      profile.socials.twitter
    ].filter(Boolean)
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
        "name": "About",
        "item": "https://smartlygrow.in/about"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": profile.name,
        "item": `https://smartlygrow.in/team/${slug}`
      }
    ]
  };

  return (
    <>
      <JsonLd schema={personSchema} />
      <JsonLd schema={breadcrumbSchema} />
      {children}
    </>
  );
}
