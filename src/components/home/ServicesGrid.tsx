"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  Palette, 
  Rocket, 
  Cpu, 
  ArrowRight,
  Sparkles,
  X,
  ChevronRight
} from "lucide-react";

// Types
interface ServiceCategory {
  title: string;
  slug: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  services: string[];
}

// 3-Category Data Structure matching PRD
const categoriesData: ServiceCategory[] = [
  {
    title: "Business Growth",
    slug: "business-growth",
    description: "Accelerate your market reach and build a powerful online audience that drives consistent, high-value customer inquiries.",
    icon: TrendingUp,
    services: [
      "Website Design & Development",
      "Strong Online Presence",
      "Social Media Growth",
      "Social Media Management",
      "Content Creation",
      "UGC Videos"
    ]
  },
  {
    title: "Creative Services",
    slug: "creative-services",
    description: "Capture attention with high-retention visual assets and storytelling that elevates your brand premium.",
    icon: Palette,
    services: [
      "Video Editing",
      "Thumbnail Design",
      "Graphic Design"
    ]
  },
  {
    title: "AI Solutions",
    slug: "ai-solutions",
    description: "Streamline operations, automate customer support, and extract intelligence with autonomous intelligence agents.",
    icon: Cpu,
    services: [
      "AI Automation",
      "AI Agents",
      "Data Analytics"
    ]
  }
];

// Detailed service information for modal displays
const categoryDetails: {
  [key: string]: {
    title: string;
    description: string;
    features: string[];
  }[];
} = {
  "Business Growth": [
    {
      title: "Website Design & Development",
      description: "Stunning, high-performance marketing websites built with Next.js and Tailwind CSS to convert visitors into customers.",
      features: ["Custom UI/UX Design", "Next.js App Router", "Full SEO Integration"]
    },
    {
      title: "Strong Online Presence",
      description: "Establish search engine dominance, optimized local business maps, and professional network listings to be the default choice.",
      features: ["Local SEO sync", "Google Maps optimization", "Directory submissions"]
    },
    {
      title: "Social Media Growth",
      description: "Exponentially increase your organic reach, followers, and engagement rates on Instagram, LinkedIn, and Twitter using viral content loops.",
      features: ["Reach hacking", "Content funnels", "Follower campaigns"]
    },
    {
      title: "Social Media Management",
      description: "Full management of your profiles, publishing schedules, graphics, and community interaction to maintain an active presence.",
      features: ["Calendar mapping", "Grid coordination", "Inquiry monitoring"]
    },
    {
      title: "Content Creation",
      description: "High-value blog posts, newsletters, and thought-leadership articles that pull organic traffic and establish industry expertise.",
      features: ["SEO-optimized articles", "Newsletter funnels", "LinkedIn creator copy"]
    },
    {
      title: "UGC Videos",
      description: "Relatable User-Generated Content videos designed to build instant trust, drive viral views, and skyrocket social ad conversions.",
      features: ["Native casting", "Direct-to-camera scripting", "TikTok & Reels optimization"]
    }
  ],
  "Creative Services": [
    {
      title: "Video Editing",
      description: "High-retention editing for long-form content, Reels, Shorts, and ads that hook viewers in 3 seconds and maintain retention.",
      features: ["Pacing optimization", "Animated typography", "Premium sound design"]
    },
    {
      title: "Thumbnail Design",
      description: "Scroll-stopping, high-click thumbnails optimized for human curiosity to maximize click-through rates (CTR) on video platforms.",
      features: ["Click-through optimization", "A/B test templates", "High-contrast text"]
    },
    {
      title: "Graphic Design",
      description: "Bespoke digital graphics, presentation pitch decks, slide layouts, and social media carousels aligned with your brand guidelines.",
      features: ["Pitch deck visual styling", "Visual guidelines", "Infographics & SVG shapes"]
    }
  ],
  "AI Solutions": [
    {
      title: "AI Automation",
      description: "Connect your business applications (CRMs, email, Slack) to eliminate repetitive tasks and reclaim hundreds of hours.",
      features: ["Zapier & Make workflows", "Auto lead responding", "Cross-system data sync"]
    },
    {
      title: "AI Agents",
      description: "Deploy autonomous agents trained on your business data to qualify leads, schedule meetings, and answer queries 24/7.",
      features: ["Context-aware RAG systems", "Slack & WhatsApp bots", "Auto calendar scheduling"]
    },
    {
      title: "Data Analytics",
      description: "Turn raw spreadsheets and logs into live, visual dashboards that reveal conversion rates, bottle-necks, and growth trends.",
      features: ["Interactive dashboards", "Key performance metrics", "Predictive growth reports"]
    }
  ]
};

export function ServicesGrid() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | null>(null);

  React.useEffect(() => {
    if (activeCategory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeCategory]);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring" as const,
        stiffness: 100, 
        damping: 15,
        duration: 0.4
      } 
    }
  };

  return (
    <section className="py-14 lg:py-20 bg-white font-sans overflow-hidden" id="services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading: Strictly ONLY "Our Services" with rich visual design accents */}
        <div className="relative text-center max-w-4xl mx-auto mb-14 sm:mb-16 px-4">
          {/* Ambient Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-28 bg-blue-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

          {/* Main Title - Strictly ONLY "Our Services" */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight"
          >
            Our <span className="text-blue-600">Services</span>
          </motion.h2>

          {/* Glowing Animated Divider */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-1 w-12 bg-gradient-to-r from-transparent via-blue-500 to-indigo-600 rounded-full" />
            <div className="h-2 w-2 bg-blue-600 rounded-full animate-ping" />
            <div className="h-1 w-12 bg-gradient-to-r from-indigo-600 via-blue-500 to-transparent rounded-full" />
          </div>
        </div>

        {/* 3-Column Category Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {categoriesData.map((category, idx) => {
            const IconComponent = category.icon;
            return (
              <Link href={`/services/${category.slug}`} key={idx} className="flex flex-col">
                <motion.div
                  variants={cardVariants}
                  className="group relative bg-gradient-to-b from-white to-slate-50/40 border border-slate-200/80 rounded-3xl p-8 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/35 transition-all duration-300 ease-out flex flex-col justify-between cursor-pointer overflow-hidden h-full"
                >
                  {/* Top accent glow line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[5px] bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Category Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3.5 bg-blue-50/80 text-blue-600 rounded-2xl border border-blue-100/50 shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 group-hover:text-blue-600 transition-colors duration-200">
                        {category.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                      {category.description}
                    </p>
                  </div>

                  {/* Service Capabilities Checklist */}
                  <div className="flex-1 flex flex-col justify-between mt-2">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-4">
                        Capabilities Include:
                      </span>
                      <ul className="space-y-3.5 mb-8">
                        {category.services.map((service, sidx) => (
                          <li 
                            key={sidx} 
                            className="flex items-start gap-3.5 text-xs font-semibold text-slate-700 group-hover:text-slate-900 transition-colors"
                          >
                            <div className="h-5 w-5 rounded-full bg-blue-50 border border-blue-100/40 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 shrink-0 mt-0.5">
                              <ChevronRight className="h-3.5 w-3.5 stroke-[3]" />
                            </div>
                            <span className="leading-normal">{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Explore Indicator */}
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-blue-600 group-hover:text-blue-700 transition-colors">
                      <span>View Projects</span>
                      <div className="p-2 rounded-xl bg-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>

        {/* Modal Overlay for Interactive Service Detail Display */}
        <AnimatePresence>
          {activeCategory && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
              {/* Tap outer area to close */}
              <div 
                onClick={() => setActiveCategory(null)} 
                className="absolute inset-0 z-0 cursor-pointer" 
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col z-10 overflow-hidden font-sans"
              >
                {/* Sticky Header */}
                <div className="sticky top-0 bg-white z-20 px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-slate-100 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 pr-8">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shrink-0">
                      {React.createElement(activeCategory.icon, { className: "h-6 w-6" })}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight leading-tight">
                        {activeCategory.title}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] font-extrabold text-blue-600 uppercase tracking-widest mt-0.5">
                        Service Category
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="text-slate-400 hover:text-slate-900 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer shrink-0"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 [scrollbar-width:thin] [-webkit-overflow-scrolling:touch] overscroll-y-contain">
                  <p className="text-slate-500 text-sm sm:text-[14.5px] leading-relaxed mb-6">
                    {activeCategory.description}
                  </p>

                  {/* Detailed Services List with Direct Project Links */}
                  <div className="space-y-4">
                    {categoryDetails[activeCategory.title]?.map((service, idx) => (
                      <div 
                        key={idx} 
                        className="group/item p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-200"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                          <h4 className="text-base font-bold text-slate-950 flex items-center gap-2 group-hover/item:text-blue-600 transition-colors">
                            <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                            {service.title}
                          </h4>
                          <Link 
                            href={`/services/${activeCategory.slug}?filter=${encodeURIComponent(service.title)}`}
                            onClick={() => setActiveCategory(null)}
                            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-extrabold text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-2xs transition-all duration-200 shrink-0 self-start sm:self-auto cursor-pointer"
                          >
                            <span>View Projects</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed pl-4">
                          {service.description}
                        </p>
                        {/* Features */}
                        <div className="flex flex-wrap gap-1.5 mt-3 pl-4">
                          {service.features.map((feat, fidx) => (
                            <span key={fidx} className="inline-flex items-center text-[11px] font-semibold text-slate-600 bg-white border border-slate-200/60 px-2.5 py-0.5 rounded-md">
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Bottom Padding for scroll space (80-100px) */}
                  <div className="h-24 sm:h-28" />
                </div>

                {/* Sticky Footer */}
                <div className="sticky bottom-0 bg-white z-20 px-6 sm:px-8 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Link
                    href={`/services/${activeCategory.slug}`}
                    onClick={() => setActiveCategory(null)}
                    className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-xs transition-colors cursor-pointer text-center gap-1.5"
                  >
                    <span>View All {activeCategory.title} Projects</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <a
                    href={`https://wa.me/917020951401?text=Hello,%20I'm%20interested%20in%20your%20${encodeURIComponent(activeCategory.title)}%20services!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition-colors shadow-xs cursor-pointer text-center"
                  >
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Section Call-to-Action matching PRD */}
        <div className="mt-24 max-w-3xl mx-auto text-center border-t border-slate-100 pt-16">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Ready to Grow Your Business?
          </h3>
          <p className="text-slate-500 mt-3 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Let&apos;s discuss your goals and build the right digital solution for your business.
          </p>
          <div className="flex justify-center mt-8">
            <a
              href="https://wa.me/917020951401?text=Hello,%20I%20want%20to%20book%20a%20free%20growth%20consultation!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors shadow-sm hover:shadow-md cursor-pointer text-center"
            >
              Book a Free Consultation
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
