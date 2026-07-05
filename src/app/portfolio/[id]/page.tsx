"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { projects, Project } from "@/data/siteData";
import { motion } from "framer-motion";
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

export default function CaseStudyPage() {
  const params = useParams();
  const projectId = params?.id as string;

  const project = projects.find((p) => p.id === projectId) || projects[0];

  // Related projects from same category (excluding current)
  const relatedProjects = projects
    .filter((p) => p.categorySlug === project.categorySlug && p.id !== project.id)
    .slice(0, 3);

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
        <div className="relative bg-slate-950 text-white rounded-3xl p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl border border-slate-800">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-l from-blue-600/20 via-indigo-600/10 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-xs font-extrabold uppercase tracking-widest text-blue-400">
                <Building2 className="h-3.5 w-3.5" />
                {project.industry}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-widest text-slate-300">
                <Award className="h-3.5 w-3.5 text-amber-400" />
                Verified Case Study
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
              {project.title}
            </h1>

            <p className="text-lg sm:text-xl font-semibold text-blue-400 mb-8 leading-relaxed">
              {project.tagline}
            </p>

            {/* Quick Metrics Summary Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Revenue</span>
                <span className="text-xl sm:text-2xl font-extrabold text-emerald-400">{project.beforeAfterMetrics.growthPercentages.revenue}</span>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Leads</span>
                <span className="text-xl sm:text-2xl font-extrabold text-blue-400">{project.beforeAfterMetrics.growthPercentages.leads}</span>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Conversion</span>
                <span className="text-xl sm:text-2xl font-extrabold text-purple-400">{project.beforeAfterMetrics.growthPercentages.conversionRate}</span>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Load Speed</span>
                <span className="text-xl sm:text-2xl font-extrabold text-amber-400">{project.beforeAfterMetrics.growthPercentages.loadSpeed}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">

        {/* SECTION 1: COMPANY OVERVIEW */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600">Company Background</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Company Overview & Objectives
              </h2>
            </div>
          </div>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 font-medium">
            {project.companyOverview.about}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
            {/* Requirements */}
            <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100/80">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
                Client Requirements
              </h3>
              <ul className="space-y-3">
                {project.companyOverview.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pre-SmartlyGrow Challenges */}
            <div className="bg-rose-50/50 rounded-2xl p-6 border border-rose-100/80">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0" />
                Challenges Before Working With SmartlyGrow
              </h3>
              <ul className="space-y-3">
                {project.companyOverview.challenges.map((ch, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: WHAT WE BUILT */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">Deliverables</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                What We Built
              </h2>
            </div>
          </div>

          <p className="text-slate-500 text-sm sm:text-base mb-8">
            SmartlyGrow engineered an end-to-end transformation suite tailored to {project.companyName}&apos;s specific operations:
          </p>

          <div className="flex flex-wrap gap-3">
            {project.servicesBuilt.map((service, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-xs sm:text-sm font-bold shadow-xs hover:bg-blue-600 transition-colors cursor-default"
              >
                <ShieldCheck className="h-4 w-4 text-blue-400" />
                <span>{service}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: BEFORE VS AFTER RESULTS WITH ANIMATED METRICS */}
        <section className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />

          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-400/30">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400">Measurable Transformation</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Before vs After Results
              </h2>
            </div>
          </div>

          {/* Side by Side Comparison Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

            {/* BEFORE Card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Status Quo</span>
                <span className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold uppercase">
                  BEFORE SMARTLYGROW
                </span>
              </div>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between items-center p-3 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-slate-400 font-sans font-medium text-xs sm:text-sm">Monthly Revenue:</span>
                  <span className="font-bold text-rose-300 text-base">{project.beforeAfterMetrics.before.revenue}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-slate-400 font-sans font-medium text-xs sm:text-sm">Monthly Lead Volume:</span>
                  <span className="font-bold text-rose-300 text-base">{project.beforeAfterMetrics.before.leads}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-slate-400 font-sans font-medium text-xs sm:text-sm">Conversion Rate:</span>
                  <span className="font-bold text-rose-300 text-base">{project.beforeAfterMetrics.before.conversionRate}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-slate-400 font-sans font-medium text-xs sm:text-sm">Page Load Speed:</span>
                  <span className="font-bold text-rose-300 text-base">{project.beforeAfterMetrics.before.loadSpeed}</span>
                </div>
              </div>
            </div>

            {/* AFTER Card */}
            <div className="bg-gradient-to-br from-blue-900/40 via-slate-900 to-indigo-900/40 border border-blue-500/30 rounded-3xl p-6 sm:p-8 relative shadow-lg">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-blue-500/20">
                <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400">Measured Growth</span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> AFTER SMARTLYGROW
                </span>
              </div>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between items-center p-3 rounded-xl bg-blue-950/60 border border-blue-400/20">
                  <span className="text-slate-200 font-sans font-medium text-xs sm:text-sm">Monthly Revenue:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-emerald-400 text-base sm:text-lg">{project.beforeAfterMetrics.after.revenue}</span>
                    <span className="text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">{project.beforeAfterMetrics.growthPercentages.revenue}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-blue-950/60 border border-blue-400/20">
                  <span className="text-slate-200 font-sans font-medium text-xs sm:text-sm">Monthly Lead Volume:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-blue-400 text-base sm:text-lg">{project.beforeAfterMetrics.after.leads}</span>
                    <span className="text-[10px] font-sans font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">{project.beforeAfterMetrics.growthPercentages.leads}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-blue-950/60 border border-blue-400/20">
                  <span className="text-slate-200 font-sans font-medium text-xs sm:text-sm">Conversion Rate:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-purple-400 text-base sm:text-lg">{project.beforeAfterMetrics.after.conversionRate}</span>
                    <span className="text-[10px] font-sans font-bold bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">{project.beforeAfterMetrics.growthPercentages.conversionRate}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-blue-950/60 border border-blue-400/20">
                  <span className="text-slate-200 font-sans font-medium text-xs sm:text-sm">Page Load Speed:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-amber-400 text-base sm:text-lg">{project.beforeAfterMetrics.after.loadSpeed}</span>
                    <span className="text-[10px] font-sans font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">{project.beforeAfterMetrics.growthPercentages.loadSpeed}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Visual Progress Bar Indicators */}
          <div className="space-y-6 pt-6 border-t border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Visual Metric Growth Comparison</h3>
            {project.beforeAfterMetrics.visualMetrics.map((vm, idx) => {
              const maxVal = Math.max(vm.beforeValue, vm.afterValue);
              const beforePct = (vm.beforeValue / maxVal) * 100;
              const afterPct = (vm.afterValue / maxVal) * 100;

              return (
                <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm font-bold text-slate-300">
                    <span>{vm.label}</span>
                    <span className="text-emerald-400 font-mono">{vm.percentage}</span>
                  </div>
                  <div className="space-y-1.5">
                    {/* Before Bar */}
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-slate-400 w-12 shrink-0">BEFORE</span>
                      <div className="flex-1 bg-white/10 h-3 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${beforePct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8 }}
                          className="bg-rose-500 h-full rounded-full"
                        />
                      </div>
                      <span className="text-xs font-mono text-slate-400 w-16 text-right">{vm.beforeValue} {vm.unit}</span>
                    </div>
                    {/* After Bar */}
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-emerald-400 w-12 shrink-0">AFTER</span>
                      <div className="flex-1 bg-white/10 h-3.5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${afterPct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full"
                        />
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-bold w-16 text-right">{vm.afterValue} {vm.unit}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: BUSINESS GROWTH TIMELINE */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600">Transformation Journey</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Business Growth Timeline
              </h2>
            </div>
          </div>

          <div className="relative border-l-2 border-blue-200 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
            {project.timeline.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative group"
              >
                {/* Step Circle */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-0 h-8 w-8 rounded-full bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center shadow-md border-4 border-white">
                  {step.step}
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:border-blue-300 hover:bg-blue-50/30 transition-all">
                  <h3 className="text-base sm:text-lg font-bold text-slate-950 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 5: CLIENT TESTIMONIAL */}
        <section className="bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white rounded-3xl p-8 sm:p-12 border border-blue-100 shadow-sm">
          <div className="flex items-center gap-1 mb-4">
            {[...Array(project.testimonial.rating)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
            ))}
          </div>

          <blockquote className="text-slate-900 text-lg sm:text-2xl font-bold leading-relaxed mb-8 italic">
            &ldquo;{project.testimonial.quote}&rdquo;
          </blockquote>

          <div className="flex items-center gap-4">
            <img 
              src={project.testimonial.photo} 
              alt={project.testimonial.name}
              className="h-14 w-14 rounded-full object-cover border-2 border-white shadow-md"
            />
            <div>
              <h4 className="text-base font-extrabold text-slate-950">{project.testimonial.name}</h4>
              <p className="text-xs font-semibold text-slate-500">{project.testimonial.role}, {project.testimonial.company}</p>
            </div>
          </div>
        </section>

        {/* SECTION 6: RELATED PROJECTS */}
        {relatedProjects.length > 0 && (
          <section className="pt-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-extrabold text-slate-900">
                Related {project.category} Case Studies
              </h3>
              <Link 
                href={`/services/${project.categorySlug}`}
                className="text-xs font-bold uppercase tracking-wider text-blue-600 hover:underline flex items-center gap-1"
              >
                View All <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => (
                <Link 
                  key={rel.id} 
                  href={`/portfolio/${rel.id}`}
                  className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs hover:shadow-lg hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="aspect-video relative overflow-hidden bg-slate-100">
                    <img 
                      src={rel.image} 
                      alt={rel.companyName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-1 block">
                      {rel.industry}
                    </span>
                    <h4 className="text-base font-bold text-slate-950 group-hover:text-blue-600 transition-colors mb-2">
                      {rel.companyName}
                    </h4>
                    <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                      {rel.description}
                    </p>
                  </div>
                  <div className="px-5 pb-5 pt-0 flex items-center text-xs font-extrabold text-blue-600">
                    <span>Read Case Study</span>
                    <ChevronRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
