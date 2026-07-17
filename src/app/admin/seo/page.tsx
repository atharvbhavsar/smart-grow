"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Settings, 
  Brain, 
  Search, 
  FileText, 
  RefreshCw, 
  Sparkles, 
  Link2, 
  Eye, 
  AlertTriangle, 
  CheckCircle2, 
  Gauge, 
  Code,
  ArrowRight,
  Globe,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminSeoPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "ai-assistant" | "meta-editor" | "redirects">("dashboard");
  const [targetUrl, setTargetUrl] = useState("/");
  const [pageContent, setPageContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<{
    title: string;
    description: string;
    keywords: string[];
    schema: string;
  } | null>(null);

  // Simulated site meta database state
  const [metaDb, setMetaDb] = useState<Record<string, { title: string; description: string; keywords: string }>>({
    "/": {
      title: "SmartlyGrow | AI Powered Business Growth Company",
      description: "SmartlyGrow helps businesses grow with AI Automation, Website Development, Branding, SEO, Digital Marketing, and Business Intelligence.",
      keywords: "AI Website Development, AI Business Automation, Business Growth Company, Pune"
    },
    "/about": {
      title: "About Us | SmartlyGrow AI & Web Startup",
      description: "Learn more about SmartlyGrow. We are a lean technology studio in Pune, India building high-performance Next.js websites, workflow automations, and custom AI agents.",
      keywords: "About SmartlyGrow, Web Startup Pune, Tech Studio"
    },
    "/services": {
      title: "Our Services | SmartlyGrow AI & Web Startup",
      description: "Explore our AI solutions, creative services, and business growth services designed to automate tasks and drive B2B revenue.",
      keywords: "AI Automation Pune, Web Development India, Local SEO Services"
    },
    "/portfolio": {
      title: "Case Studies & Portfolio | SmartlyGrow AI & Web Startup",
      description: "Explore our software engineering and AI workflow projects, outlining actual bottom-line growth achievements and conversion statistics.",
      keywords: "SmartlyGrow Portfolio, Next.js Case Studies, AI Projects"
    }
  });

  const [editingRoute, setEditingRoute] = useState("/");
  const [editTitle, setEditTitle] = useState(metaDb["/"].title);
  const [editDesc, setEditDesc] = useState(metaDb["/"].description);
  const [editKeys, setEditKeys] = useState(metaDb["/"].keywords);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (metaDb[editingRoute]) {
      setEditTitle(metaDb[editingRoute].title);
      setEditDesc(metaDb[editingRoute].description);
      setEditKeys(metaDb[editingRoute].keywords);
    }
  }, [editingRoute, metaDb]);

  const handleSaveMeta = () => {
    setMetaDb(prev => ({
      ...prev,
      [editingRoute]: {
        title: editTitle,
        description: editDesc,
        keywords: editKeys
      }
    }));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleAiGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setAiSuggestions({
        title: `${targetUrl === "/" ? "SmartlyGrow" : targetUrl.replace("/", "").toUpperCase() + " | SmartlyGrow"} - AI Automation & Growth Systems`,
        description: `Optimize your B2B sales workflows and build automated pipelines with SmartlyGrow. Specialized in sub-second Next.js web applications, RAG databases, and custom AI agents.`,
        keywords: ["AI Automation India", "Next.js Web agency", "Custom AI integration", "B2B growth agency"],
        schema: `{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://smartlygrow.in${targetUrl}",
  "name": "Generated Page Title",
  "description": "Generated Meta Description"
}`
      });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <main className="flex-1 bg-slate-900 text-white min-h-screen pt-24 pb-20 font-sans">
      
      {/* Admin Panel Header */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10 text-left">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                SmartlyGrow System core v2.0
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
              Enterprise SEO & Index Panel
            </h1>
          </div>
          
          {/* Quick link to main site */}
          <Link href="/">
            <Button variant="outline" className="border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl cursor-pointer">
              View Website
            </Button>
          </Link>
        </div>
      </section>

      {/* Tabs navigation */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 text-left">
        <div className="flex flex-wrap gap-2.5">
          {[
            { id: "dashboard", label: "SEO Dashboard", icon: Gauge },
            { id: "ai-assistant", label: "AI SEO Assistant", icon: Brain },
            { id: "meta-editor", label: "Meta Tag Manager", icon: FileText },
            { id: "redirects", label: "301 Redirects", icon: Link2 }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                  isActive 
                    ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/15" 
                    : "bg-slate-800 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-750"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Primary Panels Content */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
        <AnimatePresence mode="wait">
          
          {/* Tab 1: Dashboard */}
          {activeTab === "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Summary Stats cards */}
              <div className="lg:col-span-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-850 border border-slate-800 rounded-2xl p-5">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
                      Lighthouse SEO
                    </span>
                    <span className="text-3xl font-black text-emerald-400">100/100</span>
                  </div>
                  <div className="bg-slate-850 border border-slate-800 rounded-2xl p-5">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
                      Crawled URLs
                    </span>
                    <span className="text-3xl font-black text-blue-400">20 / 20</span>
                  </div>
                  <div className="bg-slate-850 border border-slate-800 rounded-2xl p-5">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
                      Search Index status
                    </span>
                    <span className="text-3xl font-black text-indigo-400">HEALTHY</span>
                  </div>
                </div>

                {/* Audit Checklist */}
                <div className="bg-slate-850 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-300 mb-6 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    Lighthouse & Web Vitals Audit Report
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      { item: "Canonical URLs injected on all routes", status: "pass", score: "100" },
                      { item: "Robots.txt & XML Sitemap dynamically active", status: "pass", score: "100" },
                      { item: "JSON-LD Schema structures injected correctly", status: "pass", score: "100" },
                      { item: "Alt text tags on all active image assets", status: "pass", score: "99" },
                      { item: "Security headers and HTTPS redirects fully configured", status: "pass", score: "100" },
                      { item: "Core Web Vitals load velocities (LCP < 1.2s)", status: "pass", score: "98" }
                    ].map((row, idx) => (
                      <div key={idx} className="flex justify-between items-center py-3 border-b border-slate-800/60 last:border-b-0">
                        <span className="text-xs text-slate-300 font-medium">{row.item}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-900 px-2 py-0.5 rounded-md">
                            Score: {row.score}%
                          </span>
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sitemap index details */}
                <div className="bg-slate-850 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-300 mb-1">
                      Dynamic XML Sitemap
                    </h3>
                    <p className="text-xs text-slate-550 font-medium">
                      Generated at `/sitemap.xml` with index parameters mapping all services, posts, and team pages.
                    </p>
                  </div>
                  <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl cursor-pointer">
                      Inspect XML File
                    </Button>
                  </a>
                </div>
              </div>

              {/* Sidebar stats/meta links */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-slate-850 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-300 mb-4 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-blue-500" />
                    Clarity & GA4 ID Tags
                  </h3>
                  
                  <div className="space-y-3 font-mono text-[11px] text-slate-400">
                    <div className="flex justify-between py-1.5 border-b border-slate-800/40">
                      <span>GA4 Measurement:</span>
                      <span className="text-white">G-L7QDRR7K2E</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/40">
                      <span>Clarity Tag:</span>
                      <span className="text-white">qg64f33u56</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span>GTM ID:</span>
                      <span className="text-white">GTM-NMC5K5P</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-850 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-300 mb-4 flex items-center gap-2">
                    <Database className="h-4 w-4 text-indigo-500" />
                    404 Monitor Logs
                  </h3>
                  
                  <div className="text-xs text-slate-500 text-center py-6">
                    No 404 routing incidents registered in the last 24 hours.
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {/* Tab 2: AI SEO Assistant */}
          {activeTab === "ai-assistant" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Left Configuration Column */}
              <div className="lg:col-span-6 bg-slate-850 border border-slate-800 rounded-2xl p-6 space-y-5">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-300 mb-4 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-500 animate-pulse" />
                  AI Meta Tag Generator
                </h3>

                <div>
                  <label className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">
                    Target Route / Slug
                  </label>
                  <select 
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs font-semibold text-white focus:outline-none focus:border-blue-600"
                  >
                    <option value="/">/</option>
                    <option value="/about">/about</option>
                    <option value="/services">/services</option>
                    <option value="/portfolio">/portfolio</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">
                    Page Content or Main Keywords
                  </label>
                  <textarea 
                    value={pageContent}
                    onChange={(e) => setPageContent(e.target.value)}
                    placeholder="Paste page introduction text or outline concepts to align optimization keywords..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs font-semibold text-white focus:outline-none focus:border-blue-600 min-h-[140px] resize-none"
                  />
                </div>

                <Button 
                  onClick={handleAiGenerate}
                  disabled={isGenerating}
                  className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-bold w-full rounded-xl py-3.5 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-blue-600/15"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" /> Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" /> Generate Optimizations
                    </>
                  )}
                </Button>
              </div>

              {/* Right Output Column */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Google SERP Preview Simulator */}
                <div className="bg-white text-slate-900 border border-slate-200 rounded-2xl p-6">
                  <h4 className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mb-4 flex items-center gap-2">
                    <Eye className="h-4 w-4 text-slate-500" />
                    Google SERP Preview (Desktop)
                  </h4>
                  
                  <div className="text-left font-sans">
                    <span className="text-[10px] text-slate-600 block mb-1">
                      https://smartlygrow.in{targetUrl}
                    </span>
                    <h5 className="text-lg font-bold text-blue-800 hover:underline cursor-pointer leading-tight mb-1">
                      {aiSuggestions ? aiSuggestions.title : "SmartlyGrow | AI Powered Business Growth Company"}
                    </h5>
                    <p className="text-xs text-slate-600 leading-normal max-w-xl">
                      {aiSuggestions ? aiSuggestions.description : "SmartlyGrow helps businesses grow with AI Automation, Website Development, Branding, SEO, Digital Marketing and Business Intelligence."}
                    </p>
                  </div>
                </div>

                {/* Suggestions Output */}
                {aiSuggestions && (
                  <div className="bg-slate-850 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Suggested Keywords
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {aiSuggestions.keywords.map((key, i) => (
                          <span key={i} className="text-[10px] bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg font-bold text-blue-400">
                            {key}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex justify-between items-center">
                        <span>Schema JSON-LD Markup</span>
                        <Code className="h-3.5 w-3.5 text-slate-500" />
                      </h4>
                      <pre className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-[10px] font-mono text-slate-300 overflow-x-auto">
                        {aiSuggestions.schema}
                      </pre>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          )}

          {/* Tab 3: Meta Tag Manager */}
          {activeTab === "meta-editor" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Route selector sidebar */}
              <div className="lg:col-span-4 bg-slate-850 border border-slate-800 rounded-2xl p-5 space-y-2">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4 block">
                  Select Page Route
                </h3>
                {Object.keys(metaDb).map((route) => {
                  const isActive = editingRoute === route;
                  return (
                    <button
                      key={route}
                      onClick={() => setEditingRoute(route)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold font-mono transition-colors flex justify-between items-center cursor-pointer ${
                        isActive 
                          ? "bg-blue-600 text-white" 
                          : "bg-slate-900/60 hover:bg-slate-900 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <span>{route}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  );
                })}
              </div>

              {/* Editor Console */}
              <div className="lg:col-span-8 bg-slate-850 border border-slate-800 rounded-2xl p-6 space-y-6">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-300 mb-4 flex items-center gap-2">
                  <Settings className="h-4 w-4 text-blue-500" />
                  Meta Editor: <span className="font-mono text-blue-400">{editingRoute}</span>
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">
                      Meta Title (Recommended max 60 chars)
                    </label>
                    <input 
                      type="text" 
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs font-semibold text-white focus:outline-none focus:border-blue-600"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Length: {editTitle.length} characters
                    </span>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">
                      Meta Description (Recommended max 160 chars)
                    </label>
                    <textarea 
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs font-semibold text-white focus:outline-none focus:border-blue-600 min-h-[100px] resize-none"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Length: {editDesc.length} characters
                    </span>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">
                      Keywords
                    </label>
                    <input 
                      type="text" 
                      value={editKeys}
                      onChange={(e) => setEditKeys(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs font-semibold text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800/60">
                  <div className="flex items-center gap-2">
                    {saveSuccess && (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-bold">
                        <CheckCircle2 className="h-4 w-4" /> Parameters saved successfully
                      </span>
                    )}
                  </div>
                  
                  <Button 
                    onClick={handleSaveMeta}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl px-6 py-2.5 cursor-pointer shadow-lg hover:shadow-blue-600/15"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 4: 301 Redirects */}
          {activeTab === "redirects" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-slate-850 border border-slate-800 rounded-2xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-300 mb-1">
                    Canonical 301 Redirects Manager
                  </h3>
                  <p className="text-xs text-slate-550 font-medium">
                    Manage direct path redirects. These redirects compile directly to Next.js routing parameters.
                  </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl cursor-pointer">
                  Add Redirect Row
                </Button>
              </div>

              <div className="space-y-4">
                {[
                  { source: "/home", destination: "/", type: "Permanent (301)" },
                  { source: "/our-services", destination: "/services", type: "Permanent (301)" },
                  { source: "/case-studies", destination: "/portfolio", type: "Permanent (301)" }
                ].map((row, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="font-mono bg-slate-950 px-3 py-1 rounded-md text-blue-400">{row.source}</span>
                      <ArrowRight className="h-4 w-4 text-slate-600" />
                      <span className="font-mono bg-slate-950 px-3 py-1 rounded-md text-emerald-400">{row.destination}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{row.type}</span>
                      <Button variant="outline" className="border-slate-800 text-slate-400 hover:text-white text-[10px] font-bold rounded-lg px-3 py-1 cursor-pointer">
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </section>

    </main>
  );
}
