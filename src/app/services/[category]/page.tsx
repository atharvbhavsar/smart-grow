"use client";

import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { projects } from "@/data/siteData";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, ArrowLeft, ExternalLink, Play, X } from "lucide-react";

const CATEGORY_MAP: Record<string, { title: string; subtitle: string }> = {
  "business-growth": {
    title: "Business Growth",
    subtitle: "High-performance digital systems, local SEO dominance, and web platforms built for rapid revenue expansion."
  },
  "creative-services": {
    title: "Creative Services",
    subtitle: "High-retention video production, custom visual identities, thumbnail art, and brand asset systems."
  },
  "ai-solutions": {
    title: "AI Solutions",
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

function ServiceCategoryContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const categorySlug = params?.category as string;

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
        <Link href="/#services" className="text-blue-600 font-bold hover:underline">
          Return to All Services
        </Link>
      </div>
    );
  }

  // Filter projects matching this category & sub-service
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
          <Link href="/#services" className="hover:text-blue-600 transition-colors">Services</Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
          <span className="text-slate-900 font-bold">{categoryInfo.title}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {categoryInfo.title}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2 tracking-tight">
              Featured Projects & Work
            </h1>
          </div>

          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-blue-600 bg-slate-50 border border-slate-200/80 px-4 py-2.5 rounded-full transition-all hover:bg-slate-100 self-start sm:self-auto"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Services
          </Link>
        </div>
      </div>

      {/* Clean Sub-Service Filter Pills (No 'All Services', Black Active Pill, No Header Text) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap gap-2.5">
          {subServices.map((serviceName) => {
            const isActive = selectedSubService === serviceName;
            return (
              <button
                key={serviceName}
                onClick={() => setSelectedSubService(serviceName)}
                className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-slate-950 text-white shadow-md scale-105"
                    : "bg-slate-100/80 hover:bg-slate-200/70 text-slate-700 border border-transparent"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-blue-400" : "bg-blue-600"}`} />
                {serviceName}
              </button>
            );
          })}
        </div>
      </section>

      {/* Projects Showcase (Pixel-Perfect Matching Reference Screenshot) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            <div className="space-y-20 lg:space-y-28">
              {filteredProjects.map((project, idx) => {
                const isEven = idx % 2 === 0;

                // Build 4 clear feature points matching reference image (01, 02, 03, 04)
                const points = project.companyOverview?.requirements?.length >= 3
                  ? [
                      project.tagline,
                      ...project.companyOverview.requirements.slice(0, 3)
                    ]
                  : [
                      project.tagline,
                      project.description,
                      `Custom deliverables: ${project.servicesBuilt.slice(0, 3).join(", ")}`,
                      `Industry: ${project.industry}`
                    ];

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className={`flex flex-col ${
                      isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                    } items-center gap-10 lg:gap-16`}
                  >
                    {/* Thumbnail Card Frame */}
                    <div className="w-full lg:w-1/2 bg-[#f3f4f6]/80 rounded-3xl p-4 sm:p-6 flex items-center justify-center group border border-slate-100/80">
                      <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-sm relative border border-slate-200/60 bg-black flex items-center justify-center">
                        {project.image.endsWith(".mp4") ? (
                          <div className="relative w-full h-full group/video cursor-pointer" onClick={() => setActiveVideoModal({ src: project.image, title: project.companyName })}>
                            <video 
                              src={project.image}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-contain bg-black rounded-2xl"
                            />
                            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <span className="inline-flex items-center gap-2 bg-blue-600 text-white font-extrabold text-xs px-5 py-2.5 rounded-full shadow-lg">
                                <Play className="h-4 w-4 fill-current" /> Play Full Screen
                              </span>
                            </div>
                          </div>
                        ) : (
                          <img 
                            src={project.image} 
                            alt={project.companyName}
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                          />
                        )}
                      </div>
                    </div>

                    {/* Details Side */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                          {project.companyName}
                        </h3>
                      </div>

                      {/* Numbered Points (01, 02, 03, 04) */}
                      <div className="space-y-4">
                        {points.slice(0, 4).map((pt, pidx) => (
                          <div key={pidx} className="flex items-start gap-3.5">
                            <span className="text-[11px] font-mono font-extrabold text-slate-500 bg-slate-100/90 px-2 py-0.5 rounded-md shrink-0 mt-0.5 border border-slate-200/50">
                              0{pidx + 1}
                            </span>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                              {pt}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Action Button */}
                      <div className="pt-2">
                        {project.servicesBuilt.includes("Video Editing") || selectedSubService === "Video Editing" ? (
                          <button 
                            onClick={() => setActiveVideoModal({ src: project.image, title: project.companyName })}
                            className="inline-flex items-center gap-2 bg-slate-950 hover:bg-blue-600 text-white font-extrabold text-xs tracking-wide py-3 px-6 rounded-full transition-all duration-300 shadow-2xs hover:shadow-md cursor-pointer group/btn"
                          >
                            <span>Watch Video</span>
                            <Play className="h-3.5 w-3.5 fill-current transition-transform duration-200 group-hover/btn:scale-110" />
                          </button>
                        ) : project.liveUrl ? (
                          <a 
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-slate-950 hover:bg-blue-600 text-white font-extrabold text-xs tracking-wide py-3 px-6 rounded-full transition-all duration-300 shadow-2xs hover:shadow-md cursor-pointer group/btn"
                          >
                            <span>View Website</span>
                            <ExternalLink className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:scale-110" />
                          </a>
                        ) : (
                          <Link 
                            href={`/portfolio/${project.id}`}
                            className="inline-flex items-center gap-2 bg-slate-950 hover:bg-blue-600 text-white font-extrabold text-xs tracking-wide py-3 px-6 rounded-full transition-all duration-300 shadow-2xs hover:shadow-md cursor-pointer group/btn"
                          >
                            <span>View Case Study</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center text-slate-400 font-medium text-sm bg-slate-50 rounded-3xl border border-slate-100">
              No projects matching &quot;{selectedSubService}&quot; were found. Try selecting another service filter.
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* Full-Screen Video Lightbox Modal */}
      <AnimatePresence>
        {activeVideoModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md"
            onClick={() => setActiveVideoModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    {activeVideoModal.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Video Player */}
              <div className="aspect-video w-full bg-black flex items-center justify-center">
                <video 
                  src={activeVideoModal.src}
                  autoPlay
                  controls
                  playsInline
                  className="w-full h-full max-h-[75vh] object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function ServiceCategoryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-32 text-center text-slate-500">
        Loading Projects...
      </div>
    }>
      <ServiceCategoryContent />
    </Suspense>
  );
}
