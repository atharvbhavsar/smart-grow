import React from "react";
import type { Metadata } from "next";
import { Compass, Zap, TrendingUp, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import JsonLd from "@/components/seo/JsonLd";
import LogoAnimationVideo from "@/components/about/LogoAnimationVideo";


export const metadata: Metadata = {
  title: "About Us | SmartlyGrow AI & Web Startup",
  description: "Learn more about SmartlyGrow. We are a lean technology studio in Pune, India building high-performance Next.js websites, workflow automations, and custom AI agents.",
  alternates: {
    canonical: "https://smartlygrow.in/about",
  },
};

const VALUES = [
  {
    title: "1. We Understand Before We Build",
    desc: "We first understand your business, goals, customers, and challenges. Then we create a solution that fits your needs.",
    icon: Compass,
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "2. Fast & Direct Support",
    desc: "Reach us directly through calls, WhatsApp, or in person. We aim to respond to queries within 30 minutes during support hours.",
    icon: Zap,
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    title: "3. From Local Business to Growing Brand",
    desc: "Whether you're starting from scratch or already established, we help you build your online presence, reach more customers, and grow from a local business into a stronger brand.",
    icon: TrendingUp,
    color: "bg-amber-50 text-amber-600"
  },
  {
    title: "4. Complete Support at a Fair Price",
    desc: "From planning and development to launch and ongoing support, we handle the complete journey with clear timelines and pricing designed for businesses of different sizes.",
    icon: ShieldCheck,
    color: "bg-rose-50 text-rose-600"
  }
];

export default function About() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://smartlygrow.in/about/#webpage",
    "url": "https://smartlygrow.in/about",
    "name": "About Us | SmartlyGrow AI & Web Agency",
    "description": "Learn more about SmartlyGrow. We are a lean technology studio in Pune, India building high-performance Next.js websites, workflow automations, and custom AI agents.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://smartlygrow.in"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "About",
          "item": "https://smartlygrow.in/about"
        }
      ]
    }
  };

  return (
    <main className="flex-1 bg-white font-sans pt-20">
      <JsonLd schema={aboutSchema} />
      
      {/* Hero Section */}
      <section className="py-20 lg:py-24 bg-slate-50/50 border-b border-slate-100 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-blue-600 text-xs font-extrabold uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
            Who We Are
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mt-6 tracking-tight leading-tight max-w-3xl mx-auto">
            We Help Businesses Grow From the Ground Up.
          </h1>
          <p className="text-slate-600 mt-5 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            SmartlyGrow is a digital growth partner for businesses at every stage of their journey.
          </p>
        </div>
      </section>

      {/* Story Grid Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 text-left">
              <span className="text-blue-600 text-xs font-extrabold uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md inline-block mb-4">
                Our Mission
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Who We Are
              </h2>
              <p className="text-slate-700 mt-5 text-sm sm:text-base leading-relaxed font-semibold">
                SmartlyGrow is a digital growth partner for businesses at every stage of their journey.
              </p>
              <p className="text-slate-600 mt-3.5 text-sm sm:text-base leading-relaxed font-normal">
                Whether you&apos;re just starting out and need to build your first online presence, or you&apos;re an established business looking to scale, we help you move from where you are today to where you want to be tomorrow.
              </p>
              <p className="text-slate-600 mt-3.5 text-sm sm:text-base leading-relaxed font-normal">
                We bring together web development, AI, automation, and digital growth strategies to help businesses build their foundation, reach more customers, streamline their operations, and grow with confidence.
              </p>
            </div>

            {/* Right Logo Animation Column */}
            <div className="lg:col-span-6 flex justify-center items-center">
              <LogoAnimationVideo />
            </div>

          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 sm:py-24 bg-slate-50/50 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full">
              Why Choose Us
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-4 tracking-tight leading-tight">
              Why Choose SmartlyGrow?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div key={val.title} className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-all">
                  <div className={`p-3 rounded-xl inline-block mb-4 ${val.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
                    {val.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white relative text-center overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Accelerate Operations?
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base max-w-xl mx-auto mb-8 font-medium">
            Learn more about our pricing tiers or speak directly with our team in a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl px-6 py-3 cursor-pointer shadow-lg hover:shadow-blue-500/25 transition-all">
                Book a consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
