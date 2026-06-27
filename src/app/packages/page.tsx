import React from "react";
import type { Metadata } from "next";
import { packages } from "@/data/siteData";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, X, Sparkles, HelpCircle, PhoneCall } from "lucide-react";

export const metadata: Metadata = {
  title: "Packages & Pricing | SmartyGrow",
  description: "Review our transparent pricing packages for website development, Custom SaaS development, and AI workflow automation integrations.",
};

const COMPARISON_ROWS = [
  { feature: "Next.js 15 Pages Included", starter: "5 Pages", growth: "Custom", enterprise: "Unlimited" },
  { feature: "UX / Wireframe Prototypes", starter: "Yes", growth: "Yes", enterprise: "Yes" },
  { feature: "Mobile Responsive Layouts", starter: "Yes", growth: "Yes", enterprise: "Yes" },
  { feature: "Standard SEO Setup", starter: "Yes", growth: "Yes", enterprise: "Yes" },
  { feature: "Advanced Custom Code Features", starter: "No", growth: "Yes", enterprise: "Yes" },
  { feature: "Custom Web App / Portal", starter: "No", growth: "Yes", enterprise: "Yes" },
  { feature: "AI Workflow Automations", starter: "No", growth: "1 Pipeline", enterprise: "Unlimited" },
  { feature: "Autonomous Customer Agent", starter: "No", growth: "1 Agent", enterprise: "Unlimited" },
  { feature: "Content / Blog Strategy", starter: "No", growth: "4 articles/mo", enterprise: "Unlimited" },
  { feature: "Post-launch Maintenance Window", starter: "14 Days", growth: "Monthly", enterprise: "24/7 SLA" },
  { feature: "Support Channel Access", starter: "Email", growth: "Priority Slack", enterprise: "Dedicated Team" }
];

export default function PackagesPage() {
  return (
    <main className="flex-1 bg-white font-sans text-left">
      
      {/* Hero */}
      <section className="py-20 lg:py-24 bg-slate-50/50 border-b border-slate-100 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full">
            Pricing Plans
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-6 tracking-tight leading-tight max-w-3xl mx-auto">
            Modular Pricing Models Built For Measured Growth
          </h1>
          <p className="text-slate-500 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            Choose a starter package to lay down your digital authority, or configure custom AI integrations to automate operational bottlenecks.
          </p>
        </div>
      </section>

      {/* Package Cards section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {packages.map((pkg) => {
              const isScale = pkg.tier === "growth";
              return (
                <div
                  key={pkg.id}
                  className={`bg-white rounded-2xl flex flex-col justify-between transition-all duration-300 relative ${
                    isScale
                      ? "border-2 border-blue-600 shadow-xl shadow-slate-100 md:-translate-y-2.5 z-10"
                      : "border border-slate-100 shadow-xs hover:border-slate-200 hover:shadow-md"
                  }`}
                >
                  {isScale && (
                    <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-extrabold uppercase px-4 py-1.5 rounded-full tracking-wider flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      Most Popular Choice
                    </div>
                  )}

                  <div className="p-6 md:p-8">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {pkg.name}
                    </span>

                    <div className="flex items-baseline gap-1 mt-4">
                      <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tracking-tight">
                        {pkg.price}
                      </span>
                      <span className="text-slate-400 text-xs font-semibold">
                        / {pkg.period}
                      </span>
                    </div>

                    <p className="text-slate-500 text-xs sm:text-sm mt-4 leading-relaxed min-h-[50px]">
                      {pkg.description}
                    </p>

                    <div className="h-px bg-slate-100 my-6" />

                    <ul className="space-y-3.5">
                      {pkg.features.map((feat, fidx) => (
                        <li key={fidx} className="flex items-start gap-2.5 text-xs text-slate-600">
                          <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 md:p-8 bg-slate-50/50 rounded-b-2xl border-t border-slate-50 mt-6">
                    <Link 
                      href={`/contact?plan=${pkg.id}&ref=pricing-page`}
                    >
                      <Button
                        className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all shadow-xs cursor-pointer ${
                          isScale
                            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-100"
                            : "bg-slate-900 text-white hover:bg-slate-800"
                        }`}
                      >
                        {pkg.ctaText}
                      </Button>
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-16 sm:py-24 bg-slate-50/50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full">
              Comparison Grid
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-4 tracking-tight leading-tight">
              Compare Pricing Capabilities
            </h2>
          </div>

          <div className="max-w-5xl mx-auto overflow-x-auto bg-white border border-slate-100 rounded-3xl p-4 sm:p-6 shadow-2xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-4 text-xs font-bold uppercase text-slate-400 tracking-wider">Features Included</th>
                  <th className="py-4 text-xs font-bold uppercase text-slate-900 tracking-wider">Starter Growth</th>
                  <th className="py-4 text-xs font-bold uppercase text-blue-600 tracking-wider">Scale Accelerator</th>
                  <th className="py-4 text-xs font-bold uppercase text-slate-900 tracking-wider">Enterprise Custom</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs sm:text-sm text-slate-700 font-medium">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 pr-4 font-bold text-slate-900">{row.feature}</td>
                    <td className="py-4 pr-4 text-slate-500">
                      {row.starter === "Yes" ? <Check className="h-4.5 w-4.5 text-emerald-500" /> : row.starter === "No" ? <X className="h-4.5 w-4.5 text-slate-300" /> : row.starter}
                    </td>
                    <td className="py-4 pr-4 text-blue-600 font-bold">
                      {row.growth === "Yes" ? <Check className="h-4.5 w-4.5 text-blue-600" /> : row.growth}
                    </td>
                    <td className="py-4 pr-4 text-slate-800 font-semibold">
                      {row.enterprise === "Yes" ? <Check className="h-4.5 w-4.5 text-slate-800" /> : row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white text-center overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Need A Custom Operations Estimate?
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Connect with Aashish Jhumle directly. Tell us your systems stack and we will outline a custom monthly roadmap.
          </p>
          <a href="tel:+917020951401">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-8 py-3.5 cursor-pointer shadow-md shadow-blue-500/10 flex items-center gap-2 mx-auto">
              <PhoneCall className="h-4.5 w-4.5" />
              Call Aashish Jhumle Directly
            </Button>
          </a>
        </div>
      </section>

    </main>
  );
}
