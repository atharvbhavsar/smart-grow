import React from "react";
import type { Metadata } from "next";
import { Check, Target, Compass, Award, Sparkles, Code, Brain } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us | SmartyGrow",
  description: "We are an AI-first business growth partner. We design high-performance Next.js websites, configure CRM and email automations, and build context-aware AI agents.",
};

const TEAM = [
  {
    name: "Aashish Jhumle",
    role: "Founder",
    bio: "Visionary growth strategist specializing in AI deployment, conversion funnel design, and scaling digital brands.",
    image: "/photo/founder.png"
  },
  {
    name: "Janhavi",
    role: "Co-Founder",
    bio: "Product design lead focused on creating premium interfaces, design systems, and cohesive branding architectures.",
    image: "/photo/cofunder.jpeg"
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
  return (
    <main className="flex-1 bg-white font-sans">
      
      {/* Hero Section */}
      <section className="py-20 lg:py-24 bg-slate-50/50 border-b border-slate-100 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full">
            Our Agency Story
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-6 tracking-tight leading-tight max-w-3xl mx-auto">
            We Build Digital Systems That Command Authority & Automate Admin Work
          </h1>
          <p className="text-slate-500 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            SmartyGrow was founded to bridge the gap between premium design aesthetics and AI-driven workflow engineering.
          </p>
        </div>
      </section>

      {/* Story Grid Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Moving Beyond Generic Web Templates
              </h2>
              <p className="text-slate-600 mt-4 text-sm sm:text-base leading-relaxed">
                Most agencies build traditional corporate websites, dump them on heavy servers, and walk away. That leaves clients with slow templates, manual contact entry tasks, and zero organic search traffic.
              </p>
              <p className="text-slate-600 mt-4 text-sm sm:text-base leading-relaxed">
                At SmartyGrow, we construct complete digital ecosystems. We combine lightning-fast Next.js React frontend setups with intelligent backends: AI routing pipelines that qualified leads, CRM automations, and custom customer chat agents.
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

            {/* Right Graphic Mockup */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="bg-slate-900 rounded-3xl p-6 shadow-xl w-full max-w-[480px] text-white aspect-[4/3] flex flex-col justify-between border border-slate-800">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span className="text-[10px] text-blue-400 font-mono tracking-widest uppercase">system_architecture.svg</span>
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                
                {/* Node system layout mockup */}
                <div className="flex-1 flex flex-col justify-center gap-4 text-xs font-mono">
                  <div className="flex justify-between items-center p-2.5 bg-slate-800/50 border border-slate-800 rounded-xl">
                    <span className="text-blue-400">&lt;NextJS Website&gt;</span>
                    <span className="text-slate-400">Sub-second Speed</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 bg-slate-800/50 border border-slate-800 rounded-xl ml-6">
                    <span className="text-purple-400">&lt;Claude AI Parser&gt;</span>
                    <span className="text-slate-400">Budgets & Context Qualified</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 bg-slate-800/50 border border-slate-800 rounded-xl ml-12">
                    <span className="text-emerald-400">&lt;Supabase / CRM&gt;</span>
                    <span className="text-slate-400">Live Lead Routed</span>
                  </div>
                </div>

                <div className="text-[9px] text-slate-500 border-t border-slate-800 pt-3 text-center uppercase tracking-wider font-semibold">
                  Intelligent Business Infrastructure Loop
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
              Our Values
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-4 tracking-tight leading-tight">
              The Rules We Live By
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
              Behind SmartyGrow
            </h2>
            <p className="text-slate-500 mt-3 text-sm sm:text-base">
              A lean team of system architects and designers building premium digital systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div 
                key={member.name}
                className="bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-6 shadow-2xs hover:shadow-md transition-all text-center md:text-left flex flex-col md:flex-row items-center md:items-start gap-6 group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-20 w-20 rounded-2xl object-cover border border-slate-100 shadow-2xs shrink-0"
                  loading="lazy"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    {member.name}
                  </h3>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mt-0.5 mb-3">
                    {member.role}
                  </span>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white relative text-center overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Accelerate Operations?
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Learn more about our pricing tiers or speak directly with Aashish Jhumle in a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-6 py-3 cursor-pointer">
                Book a consultation
              </Button>
            </Link>
            <Link href="/packages">
              <Button variant="outline" className="border-slate-800 hover:bg-slate-800 text-slate-200 hover:text-white font-bold rounded-xl px-6 py-3 cursor-pointer">
                View Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
