"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { projects } from "@/data/siteData";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, ExternalLink, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SUB_SERVICES_BY_CATEGORY: Record<string, string[]> = {
  "Business Growth": [
    "Website Design & Development",
    "Strong Online Presence",
    "Social Media Growth",
    "Social Media Management",
    "Content Creation",
    "UGC Videos"
  ],
  "Creative Services": [
    "Video Editing",
    "Thumbnail Design",
    "Graphic Design"
  ],
  "AI Solutions": [
    "AI Automation",
    "AI Agents",
    "Data Analytics"
  ]
};

function PortfolioContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("category");
  const subParam = searchParams.get("filter") || searchParams.get("subservice");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Business Growth");
  const [selectedSubService, setSelectedSubService] = useState("Website Design & Development");

  const categories = ["All", "Business Growth", "Creative Services", "AI Solutions"];
  const currentSubServices = SUB_SERVICES_BY_CATEGORY[selectedCategory] || [];

  // Parse category mapping to match values
  useEffect(() => {
    if (catParam) {
      const slugMap: Record<string, string> = {
        "business-growth": "Business Growth",
        "creative-services": "Creative Services",
        "ai-solutions": "AI Solutions",
        "Business Growth": "Business Growth",
        "Creative Services": "Creative Services",
        "AI Solutions": "AI Solutions"
      };
      const resolvedCat = slugMap[catParam];
      if (resolvedCat) {
        setSelectedCategory(resolvedCat);
      }
    }
  }, [catParam]);

  // Reset default sub-service when category changes or URL parameters load
  useEffect(() => {
    if (selectedCategory !== "All" && currentSubServices.length > 0) {
      if (subParam && currentSubServices.includes(subParam)) {
        setSelectedSubService(subParam);
      } else {
        setSelectedSubService(currentSubServices[0]);
      }
    } else {
      setSelectedSubService("");
    }
  }, [selectedCategory, subParam]);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.servicesBuilt && project.servicesBuilt.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())));
    
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;

    const matchesSubService = 
      !selectedSubService || 
      selectedSubService === "All" || 
      (project.servicesBuilt && project.servicesBuilt.some((s) => {
        const sLower = s.toLowerCase();
        const filterLower = selectedSubService.toLowerCase();
        return sLower.includes(filterLower) || filterLower.includes(sLower);
      }));

    return matchesSearch && matchesCategory && matchesSubService;
  });

  return (
    <main className="flex-1 bg-white font-sans text-left pt-20">
      
      {/* Hero */}
      <section className="py-16 sm:py-20 bg-slate-50/50 border-b border-slate-100 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-blue-600 text-xs font-extrabold uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
            Our Recent Projects
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mt-5 tracking-tight leading-tight max-w-3xl mx-auto">
            Category-Wise Projects & Featured Work
          </h1>
          <p className="text-slate-500 mt-4 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            Explore our real-world client projects, web applications, high-retention video productions, and digital growth systems.
          </p>
        </div>
      </section>

      {/* Main Filter & Showcase section */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Category Tabs & Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8 mb-8">
            
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-extrabold tracking-wide transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-slate-950 text-white shadow-md scale-105"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-950 border border-slate-200/60"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input bar */}
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects or technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/80 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all text-slate-800 font-medium"
              />
            </div>

          </div>

          {/* Clean Sub-Services Filter Pills */}
          {selectedCategory !== "All" && currentSubServices.length > 0 && (
            <div className="mb-12 flex flex-wrap gap-2.5">
              {currentSubServices.map((subService) => {
                const isActive = selectedSubService === subService;
                return (
                  <button
                    key={subService}
                    onClick={() => setSelectedSubService(subService)}
                    className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? "bg-slate-950 text-white shadow-md scale-105"
                        : "bg-slate-100/80 hover:bg-slate-200/70 text-slate-700 border border-transparent"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-blue-400" : "bg-blue-600"}`} />
                    {subService}
                  </button>
                );
              })}
            </div>
          )}

          {/* Grid Showcase */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={project.id}
                    className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col group"
                  >
                    
                    {/* Thumbnail frame */}
                    <div className="aspect-[16/10] relative overflow-hidden bg-slate-900 border-b border-slate-100 flex items-center justify-center">
                      {project.image.endsWith(".mp4") ? (
                        <video 
                          src={project.image}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-contain bg-black"
                        />
                      ) : (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={project.image}
                          alt={project.title}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm font-mono tracking-wider">
                        {project.beforeAfterMetrics?.growthPercentages?.revenue || "+380%"}
                      </div>
                    </div>

                    {/* Content body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full inline-block mb-3">
                          {project.category}
                        </span>
                        <h3 className="text-base sm:text-lg font-extrabold text-slate-950 group-hover:text-blue-600 transition-colors leading-snug mb-2">
                          {project.companyName}
                        </h3>
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-5 font-medium line-clamp-2">
                          {project.tagline}
                        </p>
                      </div>

                      {/* Services tags */}
                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {project.servicesBuilt.slice(0, 3).map((t) => (
                            <span key={t} className="bg-slate-100/80 text-slate-600 text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-md border border-slate-200/50">
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                          {project.liveUrl ? (
                            <a 
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-extrabold text-slate-900 hover:text-blue-600 flex items-center gap-1.5 group/btn"
                            >
                              <span>View Website</span>
                              <ExternalLink className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:scale-110" />
                            </a>
                          ) : project.image.endsWith(".mp4") || project.servicesBuilt.includes("Video Editing") ? (
                            <Link 
                              href={`/services/creative-services`}
                              className="text-xs font-extrabold text-slate-900 hover:text-blue-600 flex items-center gap-1.5 group/btn"
                            >
                              <span>Watch Video</span>
                              <Play className="h-3.5 w-3.5 fill-current transition-transform duration-200 group-hover/btn:scale-110" />
                            </Link>
                          ) : (
                            <Link 
                              href={`/portfolio/${project.id}`} 
                              className="text-xs font-extrabold text-slate-900 hover:text-blue-600 flex items-center gap-1.5 group/btn"
                            >
                              <span>View Project</span>
                              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                            </Link>
                          )}
                          <span className="text-[10px] text-slate-400 font-mono font-semibold uppercase">{project.companyName}</span>
                        </div>
                      </div>

                    </div>

                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-16 text-center text-slate-400 font-medium text-sm">
                  No projects matching &quot;{selectedSubService}&quot; were found. Try selecting another service filter.
                </div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white relative text-center overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Build Your Digital Growth Project?
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base max-w-xl mx-auto mb-8 font-medium">
            Schedule a free 30-minute consultation call with our team to map out your web development or video production strategy.
          </p>
          <Link href="/contact?ref=portfolio-page">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-full px-8 py-3.5 cursor-pointer shadow-lg hover:shadow-blue-500/25 transition-all">
              Book a Free Consultation
            </Button>
          </Link>
        </div>
      </section>

    </main>
  );
}

export default function Portfolio() {
  return (
    <Suspense fallback={
      <div className="py-20 text-center text-slate-500 font-semibold pt-32">
        Loading Portfolio Showcase...
      </div>
    }>
      <PortfolioContent />
    </Suspense>
  );
}
