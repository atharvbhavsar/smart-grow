import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WEBSITE_PROJECTS, WebsiteProject } from "@/data/portfolioData";
import JsonLd from "@/components/seo/JsonLd";
import Link from "next/link";
import {
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Layers,
  ArrowRight,
  Globe,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { FinalCta } from "@/components/home/FinalCta";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return WEBSITE_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = WEBSITE_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | SmartlyGrow",
    };
  }

  const title = `${project.name} | Web Development Case Study Pune | SmartlyGrow`;
  const description = `${project.name}: ${project.tagline}. Learn how SmartlyGrow engineered custom Next.js architectures, high-speed UI, and conversion engines.`;
  const canonical = `https://smartlygrow.in/portfolio/website/${slug}`;

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
          url: project.coverImage,
          alt: `${project.name} Web Development Case Study Pune`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.coverImage],
    },
  };
}

export default async function WebsiteProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = WEBSITE_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = WEBSITE_PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": `${project.name} Web Platform Case Study`,
    "headline": project.tagline,
    "description": project.description,
    "creator": {
      "@type": "Organization",
      "name": "SmartlyGrow",
      "url": "https://smartlygrow.in",
    },
    "image": `https://smartlygrow.in${project.coverImage}`,
    "url": `https://smartlygrow.in/portfolio/website/${slug}`,
    "keywords": project.techStack,
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
        "name": project.name,
        "item": `https://smartlygrow.in/portfolio/website/${slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={creativeWorkSchema} />
      <JsonLd schema={breadcrumbSchema} />

      <main className="flex-1 bg-white font-sans text-left pt-24 sm:pt-28">
        
        {/* Top Back Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Portfolio Hub
          </Link>
        </div>

        {/* Hero Section */}
        <section className="py-8 sm:py-12 bg-slate-50/50 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    {project.category}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    Client: {project.client} · {project.year}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
                  {project.name}
                </h1>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  {project.tagline}
                </p>
              </div>

              {project.liveUrl && (
                <div className="shrink-0">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-lg"
                  >
                    Visit Live Website <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Main Media Showcase (Multiple High-Res Screenshots) */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Primary Cover Device Frame */}
            <div className="rounded-3xl overflow-hidden bg-slate-950 border border-slate-200 shadow-2xl">
              <div className="h-10 bg-slate-900 px-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-xs text-slate-400 font-mono tracking-tight">
                  {project.liveUrl || `https://${project.slug}.com`}
                </div>
                <div className="w-10" />
              </div>

              <div className="relative aspect-video sm:min-h-[500px] max-h-[700px] w-full bg-slate-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.coverImage}
                  alt={`${project.name} Main Interface`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Metrics Ticker */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {project.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-2"
                  >
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {m.label}
                    </span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight">
                      {m.value}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {m.sublabel}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* In-Depth Case Study Context */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4">
              <div className="lg:col-span-8 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">
                    Project Overview & Strategic Objective
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Challenges & Solutions */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-lg font-bold text-slate-950">
                    Core Engineering Challenges Solved
                  </h3>
                  <div className="space-y-3">
                    {project.challenges.map((ch, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100/80 text-xs sm:text-sm text-slate-700 flex items-start gap-3"
                      >
                        <ShieldCheck className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{ch}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-lg font-bold text-slate-950">
                    Key Features Built
                  </h3>
                  <ul className="space-y-3">
                    {project.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="lg:col-span-4 space-y-8">
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Deliverables:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.deliverables.map((del, i) => (
                        <span
                          key={i}
                          className="text-xs font-semibold text-slate-800 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs"
                        >
                          {del}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Technology Stack:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <Link
                      href="/contact"
                      className="w-full py-3 rounded-full bg-slate-950 hover:bg-blue-600 text-white text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      Book A Discovery Call <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Project Screenshots Gallery */}
            <div className="space-y-6 pt-8">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xl">
                <Layers className="h-5 w-5 text-blue-600" /> Additional Interface Screens
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.screenshots.slice(1).map((s, idx) => (
                  <div
                    key={idx}
                    className="group rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md"
                  >
                    <div className="relative aspect-video w-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={s.url}
                        alt={s.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 bg-white border-t border-slate-100 text-xs font-medium text-slate-700">
                      {s.caption}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Website Works */}
            <div className="space-y-6 pt-12 border-t border-slate-100">
              <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">
                Explore More Website Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/portfolio/website/${rel.slug}`}
                    className="group p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 mb-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={rel.coverImage}
                          alt={rel.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                        {rel.category}
                      </span>
                      <h4 className="text-base font-extrabold text-slate-950 group-hover:text-blue-600 transition-colors mt-1">
                        {rel.name}
                      </h4>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-blue-600">
                      <span>View Case Study</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Global CTA */}
        <FinalCta />
      </main>
    </>
  );
}
