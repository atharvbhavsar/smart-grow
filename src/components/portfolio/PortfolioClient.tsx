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
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full">
            Case Studies & Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-6 tracking-tight leading-tight max-w-3xl mx-auto">
            Engineered For Measurable Commercial Impact
          </h1>
          <p className="text-slate-500 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            Explore software platforms, Next.js web systems, and AI automation pipelines built for clients in Pune and globally.
          </p>
        </div>
      </section>

      {/* Filter & Showcase */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Top Filter Controls */}
          <div className="space-y-6 mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Main Categories */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold tracking-wide transition-all cursor-pointer ${
                        active
                          ? "bg-slate-950 text-white shadow-md"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search case studies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 bg-white text-xs sm:text-sm font-medium focus:outline-none focus:border-blue-600 transition-colors"
                />
              </div>

            </div>

            {/* Sub-Service Pills */}
            {selectedCategory !== "All" && currentSubServices.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide pt-2 border-t border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0 pr-2">
                  Sub-Services:
                </span>
                {currentSubServices.map((sub) => {
                  const active = selectedSubService === sub;
                  return (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubService(sub)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                        active
                          ? "bg-blue-600 text-white shadow-xs"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60"
                      }`}
                    >
                      {sub}
                    </button>
                  );
                })}
              </div>
            )}

          </div>

          {/* Grid Layout */}
          {filteredProjects.length === 0 ? (
            <div className="bg-slate-50 rounded-3xl p-12 text-center border border-slate-100 my-8">
              <h3 className="text-xl font-bold text-slate-800 mb-2">No Case Studies Found</h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
                Try clearing your search filters to view full project catalog.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedSubService("");
                }}
                className="bg-slate-950 text-white font-extrabold text-xs uppercase tracking-widest px-6 py-3 rounded-full hover:bg-slate-900"
              >
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image / Video Header */}
                    <div className="relative h-56 w-full bg-slate-950 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image || "/logo-new.png"}
                        alt={`${project.companyName} - Web Development Case Study Pune`}
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      <div className="absolute top-4 left-4">
                        <span className="bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-6 sm:p-7 space-y-3">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 group-hover:text-blue-600 transition-colors">
                        {project.companyName}
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                        {project.tagline}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.servicesBuilt.slice(0, 3).map((svc, i) => (
                          <span key={i} className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                            {svc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6 sm:p-7 pt-0 border-t border-slate-100/60 mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-emerald-600 font-extrabold text-xs">
                      <span>{project.beforeAfterMetrics.growthPercentages.revenue}</span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Revenue Growth</span>
                    </div>

                    <Link
                      href={`/portfolio/${project.id}`}
                      className="inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-slate-900 hover:text-blue-600 transition-all group-hover:gap-2"
                    >
                      View Case Study <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </section>

    </main>
  );
}

export default function PortfolioClient() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-28 text-center text-slate-400">Loading portfolio showcase...</div>}>
      <PortfolioContent />
    </Suspense>
  );
}
