import React from "react";
import { Brain, LineChart, MessageSquare, HeartHandshake, Zap, ShieldAlert } from "lucide-react";

export function WhyChooseUs() {
  const BENEFITS = [
    {
      title: "AI-First Approach",
      desc: "We don&apos;t treat AI as a buzzword. We build actual, working retrieval-augmented agents and LLM integrations that automate up to 80% of admin cycles.",
      icon: Brain,
      color: "text-blue-600 bg-blue-50"
    },
    {
      title: "Business-Focused Systems",
      desc: "We align websites with your growth goals. If a page feature doesn&apos;t shorten sales cycles or convert leads, we don&apos;t suggest building it.",
      icon: LineChart,
      color: "text-emerald-600 bg-emerald-50"
    },
    {
      title: "Transparent Channels",
      desc: "Weekly updates, live staging links, direct Slack access to your lead developers, and shared Figma workspace files. Zero hidden surprises.",
      icon: MessageSquare,
      color: "text-amber-600 bg-amber-50"
    },
    {
      title: "Long-term Support",
      desc: "A launch is just the beginning. We provide ongoing SEO improvements, model prompt updates, custom feature adjustments, and regular speed audits.",
      icon: HeartHandshake,
      color: "text-rose-600 bg-rose-50"
    },
    {
      title: "Fast Delivery Pipelines",
      desc: "Our Next.js 15 boilerplates and pre-built vector DB pipelines allow us to deploy robust, high-fidelity systems in weeks rather than months.",
      icon: Zap,
      color: "text-purple-600 bg-purple-50"
    },
    {
      title: "Modern Tech Standards",
      desc: "No slow WordPress templates. We use clean TypeScript, React, Next.js, and serverless databases to guarantee sub-second load times worldwide.",
      icon: ShieldAlert,
      color: "text-cyan-600 bg-cyan-50"
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-50/50 border-y border-slate-100 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/60 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
            Our Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 mt-4 tracking-tighter leading-[1.1]">
            We Measure Our Value In Client Growth, Not Just Line Codes
          </h2>
          <p className="text-slate-500 mt-4 text-xs sm:text-sm tracking-wide leading-relaxed max-w-xl mx-auto">
            We are not just freelancers taking orders. We are your digital operations partner, engineering software systems that increase margins and drive revenue loops.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFITS.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={i} 
                className="bg-white border border-slate-100/60 shadow-2xs rounded-2xl p-6 hover:-translate-y-1 hover:shadow-md hover:border-slate-200/80 transition-all duration-300"
              >
                <div className={`p-2.5 rounded-xl inline-block mb-4 ${benefit.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: benefit.desc }} />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
