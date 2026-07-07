import type { Metadata } from "next";
import BlogListClient from "@/components/blog/BlogListClient";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Blog & Insights | AI, Web Development & Business Growth | SmartlyGrow",
  description:
    "Expert guides on AI automation, Next.js performance, SEO strategy, and B2B business growth. Published by SmartlyGrow — India's leading AI & web agency.",
  keywords: [
    "AI Automation Blog",
    "Next.js Tips India",
    "SEO Strategy Blog",
    "Business Growth Insights",
    "SmartlyGrow Blog",
    "Web Development Guides India",
  ],
  alternates: {
    canonical: "https://smartlygrow.in/blog",
  },
  openGraph: {
    title: "Blog & Insights | SmartlyGrow",
    description:
      "Deep dives on AI, web performance, and B2B organic growth from the SmartlyGrow team.",
    url: "https://smartlygrow.in/blog",
    siteName: "SmartlyGrow",
    images: [
      {
        url: "https://smartlygrow.in/logo-new.png",
        width: 1200,
        height: 630,
        alt: "SmartlyGrow Blog",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Insights | SmartlyGrow",
    description:
      "Deep dives on AI, web performance, and B2B organic growth from the SmartlyGrow team.",
    images: ["https://smartlygrow.in/logo-new.png"],
  },
};

const blogPageSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://smartlygrow.in/blog/#blog",
  url: "https://smartlygrow.in/blog",
  name: "SmartlyGrow Operations Journal",
  description:
    "Deep dives, tutorials, and strategic advice on AI automation, web engineering, and B2B organic traffic from SmartlyGrow.",
  publisher: {
    "@type": "Organization",
    name: "SmartlyGrow",
    url: "https://smartlygrow.in",
    logo: {
      "@type": "ImageObject",
      url: "https://smartlygrow.in/logo-new.png",
    },
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://smartlygrow.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://smartlygrow.in/blog",
      },
    ],
  },
};

export default function BlogPage() {
  return (
    <main className="flex-1 bg-white font-sans text-left">
      <JsonLd schema={blogPageSchema} />

      {/* Hero — server-rendered for SEO */}
      <section className="py-20 lg:py-24 bg-slate-50/50 border-b border-slate-100 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full">
            Our Insights
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-6 tracking-tight leading-tight max-w-3xl mx-auto">
            The SmartlyGrow Operations Journal
          </h1>
          <p className="text-slate-500 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            Deep dives, tutorials, and strategic advice on software engineering,
            vector search agent training, and B2B organic traffic.
          </p>
        </div>
      </section>

      {/* Interactive blog list + CTA (Client Component) */}
      <BlogListClient />
    </main>
  );
}
