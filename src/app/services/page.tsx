"use client";

import React from "react";
import { services } from "@/data/siteData";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe, Layout, Cpu, Bot, Sparkles, FileText, Share2, TrendingUp, Video, Palette, ArrowRight, Check } from "lucide-react";

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Globe: Globe,
  Layout: Layout,
  Cpu: Cpu,
  Bot: Bot,
  Sparkles: Sparkles,
  FileText: FileText,
  Share2: Share2,
  TrendingUp: TrendingUp,
  Video: Video,
  Palette: Palette,
};

export default function ServicesPage() {
  // Group services by category
  const categories = [
    { id: "digital-products", title: "Digital Products", desc: "Premium Next.js websites, dynamic web dashboards, and custom client portal systems." },
    { id: "ai-solutions", title: "AI Solutions", desc: "Workflow automations, vector search engines, and context-aware autonomous agents." },
    { id: "creative-services", title: "Creative Services", desc: "Design tokens, logo systems, copy, and high-retention video edits." },
    { id: "growth-services", title: "Growth Services", desc: "Buyer-intent SEO strategy, social management, and organic marketing systems." }
  ];

  return (
    <main className="flex-1 bg-white font-sans">
      
      {/* Hero */}
      <section className="py-20 lg:py-24 bg-slate-50/50 border-b border-slate-100 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full">
            Our Offerings
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-6 tracking-tight leading-tight max-w-3xl mx-auto">
            Interactive Digital Capabilities Engineering Growth
          </h1>
          <p className="text-slate-500 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            We build modular, scalable systems utilizing advanced frameworks and AI loops to maximize your business operational throughput.
          </p>
        </div>
      </section>

      {/* Services Categories Detail List */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {categories.map((cat, catIdx) => {
              const catServices = services.filter((s) => s.category === cat.id);
              const isEven = catIdx % 2 === 0;

              return (
                <div 
                  key={cat.id} 
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  
                  {/* Column 1: Category Info */}
                  <div className={`lg:col-span-4 text-left ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <span className="text-blue-600 text-[10px] font-extrabold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full inline-block mb-4">
                      Pillar {catIdx + 1}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                      {cat.title}
                    </h2>
                    <p className="text-slate-500 mt-3 text-sm leading-relaxed">
                      {cat.desc}
                    </p>
                    <div className="mt-6 pt-6 border-t border-slate-100 hidden lg:block">
                      <Link href="/contact">
                        <Button className="bg-slate-950 text-white hover:bg-slate-800 rounded-xl px-5 py-2.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm">
                          Configure {cat.title}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Column 2: Service Cards List */}
                  <div className={`lg:col-span-8 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {catServices.map((service) => {
                        const Icon = iconMap[service.icon] || Globe;
                        return (
                          <div 
                            key={service.id}
                            className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-md hover:border-slate-200 transition-all flex flex-col justify-between group"
                          >
                            <div>
                              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl inline-block mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                                <Icon className="h-5 w-5" />
                              </div>
                              <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors duration-150">
                                {service.title}
                              </h3>
                              <p className="text-slate-500 text-xs sm:text-sm mt-3 leading-relaxed">
                                {service.shortDesc}
                              </p>
                              
                              <ul className="mt-4 space-y-2 border-t border-slate-50 pt-4">
                                {service.features.slice(0, 2).map((feat, fidx) => (
                                  <li key={fidx} className="flex items-center gap-2 text-[11px] text-slate-600 font-medium">
                                    <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                                    <span>{feat}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                              <Link 
                                href={`/services/${service.id}`}
                                className="text-xs font-bold text-blue-600 flex items-center gap-1 group/btn"
                              >
                                View Integration Specs
                                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Bottom Section */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white relative text-center overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Not Sure Which Capabilities You Need?
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Take our 10-second interactive cost estimation audit or request an expert audit from Aashish Jhumle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-6 py-3 cursor-pointer">
                Book a Consultation
              </Button>
            </Link>
            <button 
              onClick={() => {
                // Scroll to top and open widget calculator
                window.scrollTo({ top: 0, behavior: "smooth" });
                // We'll let the user click the floating widget which is easy
              }}
              className="border border-slate-800 hover:bg-slate-800 text-slate-200 hover:text-white font-bold rounded-xl px-6 py-3 transition-colors cursor-pointer"
            >
              Open AI Cost Estimator
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
