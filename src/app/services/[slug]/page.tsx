import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/data/siteData";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Globe, Layout, Cpu, Bot, Sparkles, FileText, Share2, TrendingUp, Video, Palette, 
  ArrowRight, CheckCircle, HelpCircle, ArrowLeft, Settings, ShieldCheck, Play 
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | Services`,
    description: service.shortDesc,
  };
}

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

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  const IconComponent = iconMap[service.icon] || Globe;

  return (
    <main className="flex-1 bg-white font-sans text-left">
      
      {/* Top Breadcrumb Nav */}
      <div className="border-b border-slate-100 bg-slate-50/30 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link 
            href="/services" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Services
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-slate-50/50 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-4">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <IconComponent className="h-4 w-4" />
              {service.category.replace("-", " ")}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {service.title}
            </h1>
            <p className="text-slate-500 mt-2 text-base sm:text-lg max-w-3xl leading-relaxed">
              {service.shortDesc}
            </p>
            <Link href={`/contact?type=${service.id}&ref=service-detail`} className="mt-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-6 py-3 cursor-pointer">
                Book a Scope Call
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Detailed Overview & Benefits */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: Detailed long description */}
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Service Integration Blueprint</h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                {service.longDesc}
              </p>
              
              {/* Features grid */}
              <h3 className="text-lg font-bold text-slate-900 mt-10 mb-4">Scope Capabilities & Inclusions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <ShieldCheck className="h-4.5 w-4.5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 font-semibold">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Benefits Card */}
            <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
              <h3 className="text-base font-bold text-white mb-6 uppercase tracking-wider text-blue-400">
                Operational Benefits
              </h3>
              <ul className="space-y-4">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-xs sm:text-sm">
                    <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300 leading-relaxed font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-slate-800">
                <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-2">Technologies Deployed</p>
                <div className="flex flex-wrap gap-1.5">
                  {service.technologies.map((tech) => (
                    <span key={tech} className="bg-slate-800 border border-slate-800 text-slate-300 text-[10px] font-mono px-2.5 py-1 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Integration Process */}
      <section className="py-16 sm:py-24 bg-slate-50/50 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full">
              Project Lifecycle
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-4 tracking-tight leading-tight">
              Our {service.title} Delivery Pipeline
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {service.process.map((step, idx) => (
              <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl flex flex-col justify-between group">
                <span className="text-xs font-extrabold font-mono text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md self-start">
                  0{idx + 1}
                </span>
                <div className="mt-6">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-2">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full">
              Knowledge
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-4 tracking-tight leading-tight">
              Service Specific FAQs
            </h2>
          </div>

          <div className="bg-slate-50/50 border border-slate-100 rounded-3xl p-6">
            <Accordion className="w-full">
              {service.faqs.map((faq, idx) => (
                <AccordionItem 
                  value={`item-${idx}`} 
                  key={idx}
                  className="border-b border-slate-100 last:border-b-0 py-1"
                >
                  <AccordionTrigger className="text-left text-sm sm:text-base font-bold text-slate-900 hover:text-blue-600 hover:no-underline py-4 cursor-pointer">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-500 text-xs sm:text-sm leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white text-center overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight animate-fade-in">
            Secure a Custom {service.title} Quote
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Tell us about your project features, budget limits, and timeline. Get a blueprint proposal within 24 hours.
          </p>
          <Link href={`/contact?type=${service.id}&ref=service-detail-cta`}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-8 py-3.5 cursor-pointer shadow-md shadow-blue-500/10">
              Get Started Now
              <ArrowRight className="h-4.5 w-4.5 ml-2 animate-bounce-horizontal" />
            </Button>
          </Link>
        </div>
      </section>

    </main>
  );
}
