"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex-1 bg-white font-sans flex items-center justify-center pt-32 pb-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-md w-full">
        {/* Visual Error badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-50 border border-rose-150/40 text-xs font-extrabold uppercase tracking-wider text-rose-600 mb-8">
          <AlertCircle className="h-4 w-4" />
          System Incident Detected
        </div>

        <h1 className="text-7xl sm:text-8xl font-black text-slate-900 tracking-tighter leading-none mb-4 bg-gradient-to-tr from-slate-950 to-rose-600 bg-clip-text text-transparent">
          500
        </h1>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight mb-4">
          Something went wrong
        </h2>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-10 font-medium">
          An unexpected processing bottleneck occurred. The system logs have been updated, and our AI pipeline is triaging the issue.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            onClick={() => reset()}
            className="bg-blue-600 hover:bg-blue-500 text-white w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" /> Try Again
          </Button>
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" className="border-slate-200 bg-white hover:bg-slate-50 text-slate-800 w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2">
              <Home className="h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
