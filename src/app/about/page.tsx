import React from "react";
import type { Metadata } from "next";
import { Check, Target, Compass, Award, Brain } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "About Us | SmartlyGrow",
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
  },
  {
    name: "Aryan Deshmukh",
    role: "Video Editor",
    bio: "Creative storytelling specialist crafting high-retention video edits, viral Reels, and high-converting ads.",
    image: "/photo/video.png"
  },
  {
    name: "Sudhir Swami",
    role: "Choreographer",
    bio: "Creative visual director choreographing video sequences, motion aesthetics, and dynamic screen performance styling.",
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
  return (
    <main className="flex-1 bg-white font-sans pt-20">
      
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

            {/* Right Graphic Mockup */}
            <div className="lg:col-span-6 relative flex justify-center">
              {/* Outer container with ambient glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl opacity-10 blur-xl pointer-events-none" />
              
              <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl w-full max-w-[480px] aspect-[4/3] flex flex-col justify-between overflow-hidden text-left font-mono">
                {/* Browser Header Bar */}
                <div className="flex items-center justify-between border-b border-slate-850 pb-3 mb-4 shrink-0">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <div className="bg-slate-950/80 text-[10px] text-slate-500 px-4 py-1 rounded-md border border-slate-800/40 select-none">
                    smartlygrow.com/system-dashboard
                  </div>
                  <div className="w-4" />
                </div>

                {/* Dashboard Grid */}
                <div className="flex-1 grid grid-cols-2 gap-3 mb-3">
                  {/* Left Column: Metrics */}
                  <div className="bg-slate-950/60 border border-slate-800/50 rounded-xl p-3.5 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] text-blue-400 font-bold uppercase tracking-wider">System Velocity</span>
                      <div className="text-xl font-extrabold text-white mt-1">99.8%</div>
                    </div>
                    <div className="h-10 flex items-end gap-1 mt-2">
                      <div className="w-full bg-blue-500/20 h-1/3 rounded-xs" />
                      <div className="w-full bg-blue-500/30 h-1/2 rounded-xs" />
                      <div className="w-full bg-blue-500/40 h-2/3 rounded-xs" />
                      <div className="w-full bg-blue-500 h-full rounded-xs shadow-md shadow-blue-500/20" />
                    </div>
                  </div>

                  {/* Right Column: AI Agent status */}
                  <div className="bg-slate-950/60 border border-slate-800/50 rounded-xl p-3.5 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">AI Automation</span>
                      <div className="text-[10px] text-slate-300 font-bold mt-1.5 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Active Agent Loop
                      </div>
                    </div>
                    <div className="text-[9px] text-slate-500 leading-snug space-y-1 mt-2">
                      <div>&gt; Syncing CRM database...</div>
                      <div className="text-emerald-400">&gt; Loop success (0.4ms)</div>
                    </div>
                  </div>

                  {/* Bottom Wide Column: Interactive Brand Certification */}
                  <div className="col-span-2 bg-gradient-to-br from-slate-950/80 to-slate-900/45 border border-slate-800/50 rounded-xl p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {/* Logo container inside dashboard */}
                      <div className="bg-white p-2 rounded-xl shadow-md flex items-center justify-center shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src="/logo-new.png" 
                          alt="SmartlyGrow Logo" 
                          className="h-7 w-auto object-contain" 
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white tracking-tight">SmartlyGrow System</div>
                        <div className="text-[9px] text-slate-500">Autonomous Deployment Core</div>
                      </div>
                    </div>
                    <span className="text-[9px] font-extrabold uppercase text-blue-500 bg-blue-950/50 border border-blue-900/50 px-2 py-1 rounded-md tracking-wider">
                      Verified v1.4
                    </span>
                  </div>
                </div>

                {/* Dashboard Footer/Status */}
                <div className="flex items-center justify-between text-[9px] text-slate-500 border-t border-slate-850 pt-2.5 shrink-0">
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    All nodes operational
                  </span>
                  <span>SSL SECURED</span>
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
