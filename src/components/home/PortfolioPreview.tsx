import React from "react";
import Link from "next/link";
import { projects } from "@/data/siteData";
import { Button } from "../ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";

export function PortfolioPreview() {
  // Show first 3 projects for the home page preview
  const previewProjects = projects.slice(0, 3);

  return (
    <section className="py-12 lg:py-16 bg-slate-50/50 border-y border-slate-100 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/60 text-xs font-extrabold uppercase tracking-widest text-slate-500">
            Case Studies
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 mt-4 tracking-tighter leading-[1.1]">
            Turning Visions Into Digital Reality
          </h2>
          <p className="text-slate-500 mt-4 text-sm sm:text-base tracking-wide leading-relaxed max-w-xl mx-auto">
            Explore how we design and deploy bespoke software and automated AI systems that deliver actual bottom-line growth for our clients.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-white border border-slate-100/60 rounded-2xl overflow-hidden shadow-2xs hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-100/40 hover:border-slate-200/80 transition-all duration-300 flex flex-col group"
            >
              {/* Image Frame */}
              <div className="aspect-video relative overflow-hidden bg-slate-100 border-b border-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Impact Badge over Image */}
                <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-xs text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm font-mono tracking-wider">
                  {project.impact}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-sm inline-block mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-sm sm:text-[15px] leading-relaxed mb-4">
                    {project.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-50 flex items-center justify-between mt-auto">
                  <Link href={`/portfolio/${project.id}`} className="text-sm font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1.5 group/link">
                    Read Case Study
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                  </Link>
                  <span className="text-xs font-semibold text-slate-400 font-mono">
                    {project.client}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Centered CTA */}
        <div className="flex justify-center mt-12">
          <Link href="/portfolio">
            <Button className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 px-8 py-5 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-2xs cursor-pointer">
              View All
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
