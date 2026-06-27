import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/siteData";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar, Share2, MessageSquare, ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.id === slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.summary,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.id === slug);

  if (!post) {
    notFound();
  }

  // Find related posts (exclude current)
  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <main className="flex-1 bg-white font-sans text-left">
      
      {/* Top Breadcrumb Nav */}
      <div className="border-b border-slate-100 bg-slate-50/30 py-4">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Insights
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-16 sm:py-20 border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col items-start gap-4 mb-6">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {post.title}
            </h1>
            
            {/* Meta details */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400 mt-2 font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Author Block */}
          <div className="flex items-center gap-3 border-t border-b border-slate-100 py-4 my-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-10 w-10 rounded-full object-cover border border-slate-100 shadow-2xs"
              loading="lazy"
            />
            <div>
              <p className="text-xs font-bold text-slate-900 leading-none">{post.author.name}</p>
              <p className="text-[10px] text-slate-500 font-medium mt-1">{post.author.role}</p>
            </div>
          </div>

          {/* Article Banner Image */}
          <div className="aspect-video w-full rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 mb-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.title}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Main Prose Text content */}
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-sm sm:text-base space-y-6">
            <p className="font-semibold text-slate-800 text-base sm:text-lg">
              {post.summary}
            </p>
            <p>
              {post.content}
            </p>
            <p>
              When implementing these workflows, it is crucial to think about custom guardrails. Standard models can drift or misinterpret structured instructions if templates are not engineered with type constraints. We recommend building direct validation layers that audit parsed outputs against predefined schemas before executing downstream tasks (such as writing database records or routing CRM logs).
            </p>
            <h3 className="text-lg font-bold text-slate-900 pt-4">Engineering for Core Web Vitals</h3>
            <p>
              Additionally, migrating frontends from standard CMS platforms to React server-side rendering guarantees that landing pages render immediately, reducing bounce rates and directly compounding organic ranking authority. With sitemaps automatically generated and structural semantic markups configured, search engine bots can easily parse page nodes and categorize transactional search intents.
            </p>
          </div>

        </div>
      </article>

      {/* Recommended Related Posts */}
      <section className="py-16 sm:py-20 bg-slate-50/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-bold text-slate-900 mb-8">Related Operational Insights</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {relatedPosts.map((rPost) => (
              <div 
                key={rPost.id}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-sm inline-block mb-3">
                    {rPost.category}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-2">
                    {rPost.title}
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed mb-4">
                    {rPost.summary}
                  </p>
                </div>
                <Link 
                  href={`/blog/${rPost.id}`}
                  className="text-xs font-bold text-blue-600 flex items-center gap-1 mt-4 group/btn"
                >
                  Read Article
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white text-center overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Let&apos;s Build Something That Grows Your Business
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Schedule a free 30-minute discovery call to map out a clear technical solution blueprint.
          </p>
          <Link href="/contact?ref=blog-detail-cta">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-8 py-3.5 cursor-pointer shadow-md shadow-blue-500/10">
              Book Your Free Consultation
            </Button>
          </Link>
        </div>
      </section>

    </main>
  );
}
