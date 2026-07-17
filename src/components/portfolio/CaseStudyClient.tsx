"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Project } from "@/data/siteData";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Star, 
  ChevronRight, 
  Sparkles, 
  Clock, 
  Layers, 
  ArrowUpRight,
  ShieldCheck,
  Zap,
  BarChart3,
  Award
} from "lucide-react";

export default function CaseStudyClient({ 
  project, 
  relatedProjects 
}: { 
  project: Project; 
  relatedProjects: Project[]; 
}) {
  const [activeTab, setActiveTab] = useState<"overview" | "challenge" | "solution" | "results">("overview");

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 pt-28 pb-24 selection:bg-blue-600/10 selection:text-blue-600">
      {/* Breadcrumb Navigation */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 mb-4">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <Link href={`/services/${project.categorySlug}`} className="hover:text-blue-600 transition-colors">
            {project.category}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">{project.companyName}</span>
        </div>

        <Link 
          href={`/services/${project.categorySlug}`} 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 bg-blue-50 px-3.5 py-2 rounded-full transition-all hover:gap-3"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to {project.category} Showcase
        </Link>
      </div>

      {/* Hero Banner Header */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-slate-950 rounded-[32px] p-6 sm:p-10 lg:p-14 text-white relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Title & Specs */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-md">
                  {project.category}
                </span>
                <span className="text-slate-400 text-xs font-semibold flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-blue-400" /> Industry: {project.industry}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight text-white">
                {project.companyName}
              </h1>

              <p className="text-slate-300 text-base sm:text-xl font-medium leading-relaxed">
                {project.tagline}
              </p>

              {/* Technologies Pill Grid */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Deliverables:</span>
                {project.servicesBuilt.map((svc, idx) => (
                  <span key={idx} className="bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold px-3 py-1 rounded-full">
                    {svc}
                  </span>
                ))}
              </div>
            </div>

            {/* Top Stat Banner */}
            <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-center space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block">
                Primary Impact Milestone
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold text-blue-400 tracking-tight">
                {project.beforeAfterMetrics.growthPercentages.revenue}
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-300">
                Revenue Growth
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Main Case Study Body */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Tab Navigation Controls */}
            <div className="flex border-b border-slate-200 overflow-x-auto scrollbar-hide">
              {[
                { id: "overview", label: "Overview & Scope" },
                { id: "challenge", label: "The Bottleneck" },
                { id: "solution", label: "Engineering Solution" },
                { id: "results", label: "Verified Results" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3.5 px-6 font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50/50"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content Panels */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8">
              
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-extrabold text-slate-950">Executive Summary</h2>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                    {project.companyOverview.about}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                        Client Entity
                      </span>
                      <span className="text-slate-900 font-bold text-sm sm:text-base">{project.companyName}</span>
                    </div>
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                        Deployment Region
                      </span>
                      <span className="text-slate-900 font-bold text-sm sm:text-base">Pune, Maharashtra, India</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "challenge" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-amber-600">
                    <AlertTriangle className="h-6 w-6" />
                    <h2 className="text-2xl font-extrabold text-slate-950">Operational Bottlenecks</h2>
                  </div>

                  <div className="bg-amber-50/60 rounded-2xl p-6 border border-amber-200/60 text-amber-950 space-y-2">
                    <h3 className="font-extrabold text-sm uppercase tracking-wide">Key Friction Points Solved:</h3>
                    <ul className="space-y-1.5 text-xs sm:text-sm">
                      {project.companyOverview.challenges.map((ch, i) => (
                        <li key={i} className="flex items-start gap-2">• {ch}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "solution" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-blue-600">
                    <Zap className="h-6 w-6" />
                    <h2 className="text-2xl font-extrabold text-slate-950">Technical Architecture Built</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    {project.companyOverview.requirements.map((req, idx) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
                        <span className="text-xs sm:text-sm font-extrabold text-slate-800">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "results" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-emerald-600">
                    <TrendingUp className="h-6 w-6" />
                    <h2 className="text-2xl font-extrabold text-slate-950">Verified Revenue Statistics</h2>
                  </div>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                    <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-2xl p-5 text-center">
                      <span className="text-xl sm:text-2xl font-extrabold text-emerald-700 tracking-tight block">
                        {project.beforeAfterMetrics.growthPercentages.revenue}
                      </span>
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mt-1">
                        Revenue
                      </span>
                    </div>
                    <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-2xl p-5 text-center">
                      <span className="text-xl sm:text-2xl font-extrabold text-emerald-700 tracking-tight block">
                        {project.beforeAfterMetrics.growthPercentages.leads}
                      </span>
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mt-1">
                        Leads
                      </span>
                    </div>
                    <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-2xl p-5 text-center">
                      <span className="text-xl sm:text-2xl font-extrabold text-emerald-700 tracking-tight block">
                        {project.beforeAfterMetrics.growthPercentages.conversionRate}
                      </span>
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mt-1">
                        Conversion
                      </span>
                    </div>
                    <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-2xl p-5 text-center">
                      <span className="text-xl sm:text-2xl font-extrabold text-emerald-700 tracking-tight block">
                        {project.beforeAfterMetrics.growthPercentages.loadSpeed}
                      </span>
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mt-1">
                        Speed
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Testimonial Quote if present */}
            {project.testimonial && (
              <section className="bg-blue-600 text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-xl">
                <Sparkles className="absolute top-4 right-4 h-12 w-12 text-white/10" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-blue-200 block mb-3">
                  Client Endorsement
                </span>
                <p className="text-lg sm:text-xl font-bold italic leading-relaxed">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </p>
                <div className="mt-6 pt-4 border-t border-white/20">
                  <span className="font-extrabold text-sm block">{project.testimonial.name}</span>
                  <span className="text-xs text-blue-100 font-medium block">{project.testimonial.role} - {project.testimonial.company}</span>
                </div>
              </section>
            )}

          </div>

          {/* Sidebar CTA & Related Deliverables */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Quick Action Box */}
            <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                Scale Similar System
              </span>
              <h3 className="text-2xl font-extrabold tracking-tight leading-tight text-white">
                Ready For High-Performance Digital Authority?
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Schedule a free 30-minute discovery consultation to audit your website speed, local SEO rank, or custom AI agent logic.
              </p>

              <Link href="/contact">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer">
                  Book Free Discovery Call <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-3">
                  Related Case Studies
                </h3>

                <div className="space-y-4">
                  {relatedProjects.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/portfolio/${rel.id}`}
                      className="group block p-3 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                    >
                      <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {rel.companyName}
                      </h4>
                      <p className="text-slate-500 text-xs line-clamp-1 mt-0.5">{rel.tagline}</p>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 inline-flex items-center gap-1 mt-2">
                        View Study <ChevronRight className="h-3 w-3" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

    </main>
  );
}
