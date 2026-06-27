"use client";

import React from "react";
import { Search, Compass, Palette, Code, CheckSquare, Rocket, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export function ProcessTimeline() {
  const STEPS = [
    {
      num: "01",
      title: "Discovery",
      desc: "Audit of current technical systems, user conversion metrics, and business goals.",
      icon: Search,
    },
    {
      num: "02",
      title: "Strategy",
      desc: "Architecting site structure, AI tool mappings, database blueprints, and SEO targets.",
      icon: Compass,
    },
    {
      num: "03",
      title: "Design",
      desc: "Creating high-fidelity interactive wireframes in Figma according to premium visual standards.",
      icon: Palette,
    },
    {
      num: "04",
      title: "Development",
      desc: "Writing clean, type-safe Next.js code and configuring LLM agent routing scripts.",
      icon: Code,
    },
    {
      num: "05",
      title: "Testing",
      desc: "Running full usability sweeps, browser compatibility checks, and load test scripts.",
      icon: CheckSquare,
    },
    {
      num: "06",
      title: "Launch",
      desc: "Deploying to Vercel edge networks and running live calibration checks.",
      icon: Rocket,
    },
    {
      num: "07",
      title: "Growth",
      desc: "Ongoing optimization, SEO monitoring, and regular AI agent fine-tuning.",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white font-sans overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200/60 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
            Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 mt-4 tracking-tighter leading-[1.1]">
            From Blueprint To Operations In Seven Steps
          </h2>
          <p className="text-slate-500 mt-4 text-xs sm:text-sm tracking-wide leading-relaxed max-w-xl mx-auto">
            We follow a structured design and development pipeline to ensure that projects launch on time, remain perfectly secure, and drive growth.
          </p>
        </div>

        {/* Steps layout */}
        <div className="relative">
          {/* Connector line (desktop only) */}
          <div className="absolute top-[28px] left-[5%] right-[5%] h-0.5 bg-slate-100 -z-10 hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8 lg:gap-4">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  key={step.num}
                  className="flex flex-col items-center lg:items-start text-center lg:text-left relative group"
                >
                  {/* Step bubble */}
                  <div className="h-14 w-14 rounded-full bg-white border-2 border-slate-100 group-hover:border-blue-600 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors shadow-xs mb-4">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Num & Title */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-sm">
                      {step.num}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      {step.title}
                    </h3>
                  </div>

                  {/* Desc */}
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-[200px]">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
