import React from "react";
import Link from "next/link";
import { projects } from "@/data/siteData";
import { Button } from "../ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";

export function PortfolioPreview() {
  // Show first 4 projects for the home page preview
  const previewProjects = projects.slice(0, 4);

  return (
    <section className="py-12 lg:py-16 bg-slate-50/50 border-y border-slate-100 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/60 text-xs font-extrabold uppercase tracking-widest text-slate-600 shadow-2xs">
            Our Recent Projects
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 mt-4 tracking-tight leading-[1.1]">
            Turning Visions Into Digital Reality
          </h2>
          <p className="text-slate-500 mt-4 text-sm sm:text-base tracking-wide leading-relaxed max-w-xl mx-auto font-medium">
            Explore how we design and deploy bespoke software, web applications, and high-converting platforms for our clients.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs hover:-translate-y-1 hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col group"
            >
              {/* Image Frame */}
              <div className="aspect-[16/10] relative overflow-hidden bg-slate-100 border-b border-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Impact Badge over Image */}
                <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm font-mono tracking-wider">
                  {project.beforeAfterMetrics?.growthPercentages?.revenue || "+380%"}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full inline-block mb-2.5">
                    {project.category}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {project.companyName}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2 font-medium">
                    {project.tagline}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between mt-auto">
                  {project.liveUrl ? (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs font-extrabold text-slate-900 hover:text-blue-600 flex items-center gap-1.5 group/link"
                    >
                      <span>View Website</span>
                      <ExternalLink className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:scale-110" />
                    </a>
                  ) : (
                    <Link 
                      href={`/portfolio/${project.id}`} 
                      className="text-xs font-extrabold text-slate-900 hover:text-blue-600 flex items-center gap-1.5 group/link"
                    >
                      <span>View Project</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Centered CTA */}
        <div className="flex justify-center mt-12">
          <Link href="/portfolio">
            <Button className="border border-slate-200 bg-slate-950 hover:bg-blue-600 text-white px-8 py-5 rounded-full text-xs font-extrabold tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2">
              <span>View All Projects</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
