"use client";

import React, { useState } from "react";
import Link from "next/link";
import { blogPosts } from "@/data/siteData";
import { Button } from "@/components/ui/button";
import { Search, Clock, ArrowRight, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Newsletter } from "../../components/Newsletter";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "AI & Automation", "Web Development", "Growth & Marketing", "Branding"];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="flex-1 bg-white font-sans text-left">
      
      {/* Hero */}
      <section className="py-20 lg:py-24 bg-slate-50/50 border-b border-slate-100 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full">
            Our Insights
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-6 tracking-tight leading-tight max-w-3xl mx-auto">
            The SmartyGrow Operations Journal
          </h1>
          <p className="text-slate-500 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            Deep dives, tutorials, and strategic advice on software engineering, vector search agent training, and B2B organic traffic.
          </p>
        </div>
      </section>

      {/* Blog list area */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8 mb-12">
            
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-100/55"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input bar */}
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-100 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all text-slate-800"
              />
            </div>

          </div>

          {/* Articles list */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={post.id}
                    className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-2xs hover:shadow-lg hover:border-slate-200 transition-all duration-300 flex flex-col group"
                  >
                    {/* Image */}
                    <div className="aspect-video relative overflow-hidden bg-slate-50 border-b border-slate-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.image}
                        alt={post.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-sm">
                            {post.category}
                          </span>
                          <span className="text-slate-400 text-[10px] font-semibold font-mono flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-3">
                          {post.title}
                        </h3>
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-5">
                          {post.summary}
                        </p>
                      </div>

                      {/* Footer: Author & Link */}
                      <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="h-7 w-7 rounded-full object-cover border border-slate-100 shadow-2xs"
                            loading="lazy"
                          />
                          <div>
                            <p className="text-[10px] font-bold text-slate-800 leading-none">{post.author.name}</p>
                            <p className="text-[9px] text-slate-400 mt-0.5">{post.date}</p>
                          </div>
                        </div>
                        <Link 
                          href={`/blog/${post.id}`} 
                          className="text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1 group/btn"
                        >
                          Read Article
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                        </Link>
                      </div>

                    </div>

                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-16 text-center text-slate-400 font-medium text-sm">
                  No articles matching your filters were found. Try modifying your search query.
                </div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white relative text-center overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Get Weekly Optimization Guides in Your Inbox
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Join 3,200+ founders and CTOs receiving our private automation outlines and SEO checklists. Zero spam.
          </p>
          <Newsletter variant="dark" />
        </div>
      </section>

    </main>
  );
}
