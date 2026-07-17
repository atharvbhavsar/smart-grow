"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { projects } from "@/data/siteData";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, ArrowLeft, Play, X } from "lucide-react";

const CATEGORY_MAP: Record<string, { title: string; subtitle: string }> = {
  "business-growth": {
    title: "Business Growth Services",
    subtitle: "High-performance digital systems, local SEO dominance, and custom web platforms built for rapid revenue expansion in Pune & global markets."
  },
  "creative-services": {
    title: "Creative Services & Branding",
    subtitle: "High-retention video production, custom visual identities, thumbnail art, and brand asset systems."
  },
  "ai-solutions": {
    title: "AI Solutions & Automation",
    subtitle: "Autonomous LLM agents, 24/7 lead triage, CRM integrations, and intelligence automation engines."
  }
};

const SUB_SERVICES_MAP: Record<string, string[]> = {
  "business-growth": [
    "Website Design & Development",
    "Strong Online Presence",
    "Social Media Growth",
    "Social Media Management",
    "Content Creation",
    "UGC Videos"
  ],
  "creative-services": [
    "Video Editing",
    "Thumbnail Design",
    "Graphic Design"
  ],
  "ai-solutions": [
    "AI Automation",
    "AI Agents",
    "Data Analytics"
  ]
};

function ServiceCategoryContent({ categorySlug }: { categorySlug: string }) {
  const searchParams = useSearchParams();
  const categoryInfo = CATEGORY_MAP[categorySlug];
  const subServices = SUB_SERVICES_MAP[categorySlug] || ["Website Design & Development"];

  const urlFilter = searchParams.get("filter");
  const [selectedSubService, setSelectedSubService] = useState<string>(
    urlFilter || subServices[0]
  );

  const [activeVideoModal, setActiveVideoModal] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    if (urlFilter) {
      setSelectedSubService(urlFilter);
    } else if (subServices.length > 0) {
      setSelectedSubService(subServices[0]);
    }
  }, [urlFilter, categorySlug]);

  if (!categoryInfo) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 font-sans bg-white">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Category Not Found</h1>
        <p className="text-slate-500 mb-6">The requested service category could not be located.</p>
        <Link href="/services" className="text-blue-600 font-bold hover:underline">
          Return to All Services
        </Link>
      </div>
    );
  }

  const filteredProjects = projects.filter((p) => {
    if (p.categorySlug !== categorySlug) return false;

    const filterLower = selectedSubService.toLowerCase();
    return p.servicesBuilt.some((s) => {
      const sLower = s.toLowerCase();
      return filterLower.includes(sLower) || sLower.includes(filterLower);
    });
  });

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 pt-28 pb-28">
      {/* Breadcrumb & Navigation Back */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
          <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
          <span className="text-slate-900 font-bold">{categoryInfo.title}</span>
        </div>

        <Link 
          href="/services" 
          className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-slate-500 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 px-4 py-2 rounded-full transition-all border border-slate-200/60"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to All Services
        </Link>
      </div>

      {/* Hero Banner Header */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-slate-950 rounded-[32px] p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl -z-10" />

          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight text-white">
              {categoryInfo.title}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal pt-2">
              {categoryInfo.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Sub-Services Pill Selector */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-400">
            Select Specific Service Line:
          </h2>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-hide">
          {subServices.map((sub) => {
            const active = selectedSubService === sub;
            return (
              <button
                key={sub}
                onClick={() => setSelectedSubService(sub)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold tracking-wide transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  active
                    ? "bg-slate-950 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {sub}
              </button>
            );
          })}
        </div>
      </section>

      {/* Dynamic Projects Showcase Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest">
              Verified Client Deliverables
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
              {selectedSubService} Projects
            </h3>
          </div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 bg-slate-100 px-3.5 py-1.5 rounded-full">
            {filteredProjects.length} {filteredProjects.length === 1 ? "Case Study" : "Case Studies"}
          </span>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="bg-slate-50 rounded-3xl p-12 text-center border border-slate-100 my-8">
            <h4 className="text-xl font-bold text-slate-800 mb-2">Expanding Deliverables</h4>
            <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
              We are currently onboarding case studies for &ldquo;{selectedSubService}&rdquo;. Schedule a discovery session to view live enterprise demos.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-extrabold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full hover:bg-blue-700 transition-all shadow-md"
            >
              Request Custom Showcase <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Media Preview Container */}
                  <div className="relative h-56 w-full bg-slate-950 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image || "/logo-new.png"}
                      alt={`${project.companyName} - ${project.category} Pune`}
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    <div className="absolute top-4 left-4">
                      <span className="bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 sm:p-7 space-y-3">
                    <h4 className="text-xl sm:text-2xl font-extrabold text-slate-950 group-hover:text-blue-600 transition-colors">
                      {project.companyName}
                    </h4>
                    <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {project.tagline}
                    </p>

                    {/* Deliverables tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.servicesBuilt.slice(0, 3).map((svc, i) => (
                        <span key={i} className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Impact Link */}
                <div className="p-6 sm:p-7 pt-0 border-t border-slate-100/60 mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-emerald-600 font-extrabold text-xs">
                    <span>{project.beforeAfterMetrics.growthPercentages.revenue}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Revenue Growth</span>
                  </div>

                  <Link
                    href={`/portfolio/${project.id}`}
                    className="inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-slate-900 hover:text-blue-600 transition-all group-hover:gap-2"
                  >
                    Case Study <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* Video Modal Popup */}
      <AnimatePresence>
        {activeVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4"
            onClick={() => setActiveVideoModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800">
                <h4 className="text-sm font-extrabold text-white">{activeVideoModal.title} Deliverable</h4>
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="relative aspect-video w-full bg-slate-950">
                <video
                  src={activeVideoModal.src}
                  className="w-full h-full object-contain"
                  controls autoPlay
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

export default function ServiceCategoryClient({ categorySlug }: { categorySlug: string }) {
  return (
    <Suspense fallback={<div className="min-h-screen pt-28 text-center text-slate-400">Loading service details...</div>}>
      <ServiceCategoryContent categorySlug={categorySlug} />
    </Suspense>
  );
}
