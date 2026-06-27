import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/siteData";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, Flame, Target, Trophy } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.tagline,
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex-1 bg-white font-sans text-left">
      
      {/* Top Breadcrumb Nav */}
      <div className="border-b border-slate-100 bg-slate-50/30 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link 
            href="/portfolio" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Case Studies
          </Link>
        </div>
      </div>

      {/* Hero Header with Impact Metric */}
      <section className="py-16 sm:py-20 bg-slate-50/50 border-b border-slate-100 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Title / Info */}
            <div className="lg:col-span-8">
              <span className="text-blue-600 text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full inline-block mb-4">
                {project.category}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {project.title}
              </h1>
              <p className="text-slate-500 mt-4 text-base sm:text-lg max-w-2xl leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* Impact Metric Card */}
            <div className="lg:col-span-4 bg-blue-600 text-white p-6 rounded-3xl shadow-xl shadow-blue-100 flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-2xl">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <div>
                <span className="text-[10px] text-blue-200 font-bold uppercase tracking-wider font-mono">Measurable Impact</span>
                <p className="text-2xl font-bold text-white mt-0.5">{project.impact}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Case Study Details grid */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Problem/Challenge */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5 mb-4">
                  <Flame className="h-5 w-5 text-rose-500" />
                  The Business Challenge
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              {/* Solution */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5 mb-4">
                  <Target className="h-5 w-5 text-blue-600" />
                  Proposed System Solution
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {project.solution}
                </p>
              </div>

            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-4 bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8">
              
              {/* Project Info */}
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Client Name</h4>
                  <p className="text-slate-800 text-sm sm:text-base font-bold mt-0.5">{project.client}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category Pillar</h4>
                  <p className="text-slate-800 text-sm sm:text-base font-bold mt-0.5">{project.category}</p>
                </div>
              </div>

              <div className="h-px bg-slate-200/60 my-6" />

              {/* Technologies deployed */}
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Technologies Deployed</h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="bg-white border border-slate-200/60 text-slate-600 text-[10px] font-mono px-2.5 py-1 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Results details */}
      <section className="py-16 sm:py-24 bg-slate-50/50 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full">
              Results Outlined
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-4 tracking-tight leading-tight">
              Project Delivery Outcomes
            </h2>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            {project.results.map((result, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-100 rounded-2xl p-5 flex gap-4 items-start shadow-2xs"
              >
                <CheckCircle className="h-6 w-6 text-emerald-500 shrink-0" />
                <p className="text-slate-700 text-sm sm:text-base font-semibold leading-relaxed">
                  {result}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white text-center overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Build Similar Growth Loops?
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Speak directly with our founder Aashish Jhumle in a free consultation. Learn how you can integrate these technologies.
          </p>
          <Link href={`/contact?plan=${project.id}&ref=portfolio-detail-cta`}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-8 py-3.5 cursor-pointer shadow-md shadow-blue-500/10">
              Request Similar Project Blueprint
              <ArrowRight className="h-4.5 w-4.5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

    </main>
  );
}
