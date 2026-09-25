import React from "react";
import type { Metadata } from "next";
import { Check, Target, Compass, Award, Brain } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "About Us | SmartlyGrow AI & Web Startup",
  description: "Learn more about SmartlyGrow. We are a lean technology studio in Pune, India building high-performance Next.js websites, workflow automations, and custom AI agents.",
  alternates: {
    canonical: "https://smartlygrow.in/about",
  },
};

const TEAM = [
  {
    name: "Ashish Jumle",
    role: "Founder",
    bio: "Visionary growth strategist specializing in AI deployment, conversion funnel design, and scaling digital brands.",
    image: "/photo/founder.png"
  },
  {
    name: "Janhavi",
    role: "Co-Founder",
    bio: "Product design lead focused on creating premium interfaces, design systems, and cohesive branding architectures.",
    image: "/photo/janhavi-new.jpg"
  },
  {
    name: "Sajan Bhoyar",
    role: "App Lead",
    bio: "Full stack engineer building lightning-fast Next.js systems, serverless database layers, and vector DB logic.",
    image: "/photo/app lead.png"
  },
  {
    name: "Atharv Bhavsar",
    role: "Web Lead",
    bio: "Operations architect managing technical pipelines, client deployments, and quality control systems.",
    image: "/photo/website lead.jpeg"
  },
  {
    name: "Hemant Bhoyar",
    role: "AI Lead",
    bio: "AI deployment expert building context-aware automation workflows, autonomous agents, and intelligence integrations.",
    image: "/photo/ai  lead.png"
  },
  {
    name: "Aryan Deshmukh",
    role: "Video Editor",
    bio: "Creative storytelling specialist crafting high-retention video edits, viral Reels, and high-converting ads.",
    image: "/photo/video.png"
  },
  {
    name: "Sudhir Swami",
    role: "Videographer",
    bio: "Creative visual director capturing high-quality video sequences, camera movements, and premium screen productions.",
    image: "/photo/image.png"
  }
];

const VALUES = [
  {
    title: "AI-First Operations",
    desc: "We look for intelligence triggers. We replace copy-paste admin tasks with autonomous LLM loops so humans can focus on deep strategy.",
    icon: Brain,
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Measurable Growth Only",
    desc: "We do not sell vanity stats. We focus on conversion rates, load speeds, pipeline values, and hours saved.",
    icon: Target,
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    title: "Radical Transparency",
    desc: "Weekly video logs, live dev staging servers, and shared Figma canvases. We run projects with zero hidden back-channels.",
    icon: Compass,
    color: "bg-amber-50 text-amber-600"
  },
  {
    title: "Obsessive Craftsmanship",
    desc: "Sub-second LCP scores, strict semantic layouts, and pixel-perfect design grids. Our standard is Vercel and Stripe visual levels.",
    icon: Award,
    color: "bg-rose-50 text-rose-600"
  }
];

export default function About() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://smartlygrow.in/about/#webpage",
    "url": "https://smartlygrow.in/about",
    "name": "About Us | SmartlyGrow AI & Web Agency",
    "description": "Learn more about SmartlyGrow. We are a lean technology studio in Pune, India building high-performance Next.js websites, workflow automations, and custom AI agents.",
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
          "name": "About",
          "item": "https://smartlygrow.in/about"
        }
      ]
    }
  };

  return (
    <main className="flex-1 bg-white font-sans pt-20">
      <JsonLd schema={aboutSchema} />
      
      {/* Hero Section */}
      <section className="py-20 lg:py-24 bg-slate-50/50 border-b border-slate-100 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-blue-600 text-xs font-extrabold uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
            Who Are We
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-6 tracking-tight leading-tight max-w-3xl mx-auto">
            Building Digital Future
          </h1>
          <p className="text-slate-500 mt-4 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            We are a dedicated team of systems architects, creative developers, and product designers building high-performance operational infrastructures.
          </p>
        </div>
      </section>

      {/* Story Grid Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 text-left">
              <span className="text-blue-600 text-xs font-extrabold uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md inline-block mb-4">
                Our Mission
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Who Are We?
              </h2>
              <p className="text-slate-655 mt-4 text-sm sm:text-base leading-relaxed font-medium">
                We are a lean, agile technology engineering studio. We help fast-growing startups and enterprises eliminate operational bottlenecks and command digital authority through lightning-fast Next.js portals, custom workflow integrations, and autonomous AI agents.
              </p>
              <p className="text-slate-655 mt-4 text-sm sm:text-base leading-relaxed font-medium">
                By integrating clean custom branding, modern visual systems, and structured codebases, we ensure your business remains highly-scalable, responsive, and positioned for measurable revenue expansion.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Figma visual tokens synced with codebases",
                  "Fully autonomous vector database training",
                  "Lighthouse scores averaging 95+ globally",
                  "Client teams trained for easy headless CMS updates"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                    <Check className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Logo Column */}
            <div className="lg:col-span-6 flex justify-center items-center">
              <div className="relative group max-w-[400px] w-full aspect-square flex items-center justify-center">
                {/* Glow wrap */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl opacity-10 blur-xl group-hover:opacity-15 transition-opacity duration-500 pointer-events-none" />
                <div className="relative w-full h-full rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-8 hover:shadow-md hover:border-slate-200 transition-all duration-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/logo-about.png" 
                    alt="SmartlyGrow Logo" 
                    className="w-full h-auto object-contain max-h-[280px]" 
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 sm:py-24 bg-slate-50/50 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full">
              Why Choose Us
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-4 tracking-tight leading-tight">
              Why Choose SmartlyGrow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div key={val.title} className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-all">
                  <div className={`p-3 rounded-xl inline-block mb-4 ${val.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
                    {val.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Team Grid Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full">
              Meet The Founders
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-4 tracking-tight leading-tight">
              Behind SmartlyGrow
            </h2>
            <p className="text-slate-500 mt-3 text-sm sm:text-base">
              A lean team of system architects and designers building premium digital systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((member) => {
              const slug = member.name.toLowerCase().replace(/\s+/g, "-");
              return (
                <Link 
                  href={`/team/${slug}`}
                  key={member.name}
                  className="bg-white border border-slate-100 hover:border-blue-500/30 rounded-2xl p-6 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center md:text-left flex flex-col md:flex-row items-center md:items-start gap-6 group cursor-pointer"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-20 w-20 rounded-2xl object-cover border border-slate-100 shadow-2xs shrink-0 group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                      {member.name}
                    </h3>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mt-0.5 mb-3">
                      {member.role}
                    </span>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                      {member.bio}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-blue-600 uppercase tracking-widest mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      View Profile →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white relative text-center overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Accelerate Operations?
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base max-w-xl mx-auto mb-8 font-medium">
            Learn more about our pricing tiers or speak directly with our team in a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl px-6 py-3 cursor-pointer shadow-lg hover:shadow-blue-500/25 transition-all">
                Book a consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
