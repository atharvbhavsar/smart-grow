"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex-1 bg-white font-sans flex items-center justify-center pt-32 pb-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-md w-full">
        {/* Visual 404 badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-xs font-extrabold uppercase tracking-wider text-blue-600 mb-8 animate-pulse">
          <Compass className="h-4 w-4" />
          Page Not Found
        </div>

        <h1 className="text-7xl sm:text-8xl font-black text-slate-900 tracking-tighter leading-none mb-4 bg-gradient-to-tr from-slate-950 to-blue-600 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight mb-4">
          Lost in Operations?
        </h2>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-10 font-medium">
          The page you are looking for has either been moved, archived, or doesn&apos;t exist in our routing system. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="w-full sm:w-auto">
            <Button className="bg-slate-950 text-white hover:bg-slate-900 w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2">
              <Home className="h-4 w-4" /> Back to Home
            </Button>
          </Link>
          <Link href="/services" className="w-full sm:w-auto">
            <Button variant="outline" className="border-slate-200 bg-white hover:bg-slate-50 text-slate-800 w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2">
              <Compass className="h-4 w-4" /> Discover Services
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
