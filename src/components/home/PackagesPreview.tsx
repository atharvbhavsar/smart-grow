import React from "react";
import Link from "next/link";
import Image from "next/image";

const PRODUCTS = [
  {
    id: "custom-dev",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
    title: "Custom Development",
    price: null,
    description: "Fully bespoke websites and web apps built from scratch to match your exact brand and business requirements.",
    href: "/packages?type=custom",
    badge: "Tailor-Made",
    badgeColor: "bg-blue-600 text-white",
  },
  {
    id: "saas-prebuilt",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    title: "SaaS Prebuilt",
    price: "50,000 /-",
    description: "Launch fast with ready-to-deploy SaaS products — customised to your brand and live in days.",
    href: "/packages?type=prebuilt",
    badge: "Best Value",
    badgeColor: "bg-emerald-500 text-white",
  },
  {
    id: "ai-automation",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    title: "AI Automation",
    price: null,
    description: "Automate repetitive workflows with custom AI agents that save hours every day and cut costs.",
    href: "/packages?type=ai",
    badge: "AI Powered",
    badgeColor: "bg-violet-600 text-white",
  },
  {
    id: "social-growth",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
    title: "Social Media Growth",
    price: null,
    description: "Content strategy, posting, engagement and analytics — we manage your full social presence.",
    href: "/packages?type=social",
    badge: "Growth",
    badgeColor: "bg-pink-500 text-white",
  },
];

export function PackagesPreview() {
  return (
    <section className="py-12 lg:py-16 bg-white" id="pricing">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full">
            Our Packages
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight leading-tight">
            Streamline Business with our<br />
            <span className="text-blue-600">Flexible Options</span>
          </h2>
          <p className="text-slate-500 mt-3 text-sm sm:text-base">
            No complex hidden licensing, no surprises. Pick what fits your growth stage.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href={product.href}
              className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-slate-200 transition-all duration-300 flex flex-col"
            >
              {/* Photo background */}
              <div className="w-full h-[210px] relative overflow-hidden rounded-t-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-all duration-300" />
                {/* Badge */}
                {product.badge && (
                  <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${product.badgeColor} shadow-sm`}>
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Card content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {product.title}
                    {product.price && (
                      <span className="text-slate-500 font-semibold text-sm ml-1">
                        @ {product.price}
                      </span>
                    )}
                  </h3>
                </div>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-7 py-3 rounded-full transition-all shadow-sm"
          >
            View All Packages →
          </Link>
        </div>

      </div>
    </section>
  );
}
