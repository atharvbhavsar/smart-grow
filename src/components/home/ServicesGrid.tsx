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
  X
} from "lucide-react";

// Types
interface ServiceCategory {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  services: string[];
}

// 4-Category Data Structure matching PRD
const categoriesData: ServiceCategory[] = [
  {
    title: "Business Growth",
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
    description: "Capture attention with high-retention visual assets and storytelling that elevates your brand premium.",
    icon: Palette,
    services: [
      "Video Editing",
      "Thumbnail Design",
      "Graphic Design"
    ]
  },
  {
    title: "Startup Solutions",
    description: "Transform raw ideas into production-ready software systems with modern architecture and seamless integrations.",
    icon: Rocket,
    services: [
      "Business Websites",
      "Custom Web Applications",
      "AI Integration"
    ]
  },
  {
    title: "AI Solutions",
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
  "Startup Solutions": [
    {
      title: "Business Websites",
      description: "Credible, responsive, and polished corporate pages built to display credentials, explain solutions, and gather early leads.",
      features: ["Landing page designs", "Fast contact integrations", "Interactive grids"]
    },
    {
      title: "Custom Web Applications",
      description: "Scalable SaaS dashboards, multi-tenant portals, and internal tools built to solve complex operations and capture transactions.",
      features: ["Supabase database flows", "Custom UI dashboards", "Payment integrations"]
    },
    {
      title: "AI Integration",
      description: "Supercharge your software with custom-trained LLM pipelines, external API integrations, and smart functional triggers.",
      features: ["OpenAI & Claude APIs", "Prompt engineering rails", "Intelligent data parsing"]
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

  // Motion settings for staggered entry and scroll reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
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
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-extrabold uppercase tracking-widest text-blue-600">
            <Sparkles className="h-3 w-3 shrink-0" />
            Complete Scale Agency
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 mt-4 tracking-tighter leading-[1.1]">
            Streamline Business with our{" "}
            <span className="text-blue-600">Flexible Options</span>
          </h2>
          <p className="text-slate-500 mt-4 text-[15px] sm:text-base tracking-wide leading-relaxed max-w-xl mx-auto">
            SmartyGrow is not just a website development company. We offer complete business growth, custom AI systems, and content generation.
          </p>
        </div>

        {/* 2x2 Category Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {categoriesData.map((category, idx) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                onClick={() => setActiveCategory(category)}
                className="group relative bg-white border border-slate-200/80 rounded-2xl p-8 hover:-translate-y-1.5 hover:shadow-lg hover:border-blue-500/60 transition-all duration-300 ease-out flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-105 transition-transform duration-300 ease-out">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-950 group-hover:text-blue-600 transition-colors duration-200">
                      {category.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-slate-500 text-sm sm:text-[14.5px] leading-relaxed mb-6">
                    {category.description}
                  </p>
                </div>

                {/* Service Badges/Chips */}
                <div>
                  <div className="flex flex-wrap gap-2">
                    {category.services.map((service, sidx) => (
                      <span 
                        key={sidx} 
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700 hover:bg-blue-50/50 hover:border-blue-200/50 transition-colors duration-200"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                        {service}
                      </span>
                    ))}
                  </div>

                  {/* Explore Indicator */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                    <span>Explore Category Details</span>
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
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

                  {/* Detailed Services List */}
                  <div className="space-y-6">
                    {categoryDetails[activeCategory.title]?.map((service, idx) => (
                      <div key={idx} className="border-b border-slate-100 last:border-b-0 pb-6 last:pb-0">
                        <h4 className="text-base font-bold text-slate-950 flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-blue-600" />
                          {service.title}
                        </h4>
                        <p className="text-slate-500 text-sm mt-2 leading-relaxed pl-4">
                          {service.description}
                        </p>
                        {/* Features */}
                        <div className="flex flex-wrap gap-1.5 mt-3 pl-4">
                          {service.features.map((feat, fidx) => (
                            <span key={fidx} className="inline-flex items-center text-[11px] font-semibold text-slate-600 bg-slate-50 border border-slate-100/60 px-2.5 py-0.5 rounded-md">
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
                  <p className="text-xs text-slate-500 text-center sm:text-left">
                    Interested in starting a project in this category?
                  </p>
                  <a
                    href={`https://wa.me/917020951401?text=Hello,%20I'm%20interested%20in%20your%20${encodeURIComponent(activeCategory.title)}%20services!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer text-center"
                  >
                    Enquire via WhatsApp
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <a
              href="https://wa.me/917020951401?text=Hello,%20I%20want%20to%20book%20a%20free%20growth%20consultation!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors shadow-sm hover:shadow-md cursor-pointer text-center"
            >
              Book a Free Consultation
            </a>
            <Link
              href="/packages"
              className="inline-flex items-center justify-center w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 font-bold text-sm border border-slate-200/80 transition-all cursor-pointer text-center gap-1.5 group"
            >
              View All Services
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
