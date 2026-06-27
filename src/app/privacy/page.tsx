import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SmartyGrow",
  description: "Read the Privacy Policy of SmartyGrow to understand how we protect and manage your data.",
};

export default function PrivacyPage() {
  return (
    <main className="flex-1 py-16 sm:py-24 bg-white font-sans text-left">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-8">Privacy Policy</h1>
        <div className="prose prose-slate space-y-6 text-sm text-slate-600 leading-relaxed">
          <p className="font-semibold text-slate-800">Effective Date: June 28, 2026</p>
          <p>
            At SmartyGrow, protecting your privacy and security is central to our business strategy. This Privacy Policy outlines how we collect, process, and secure user information when visiting our website, filling out our discovery forms, or utilizing our interactive estimation tools.
          </p>
          <h2 className="text-lg font-bold text-slate-900 pt-4">1. Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily submit to us (such as name, work email address, phone number, company name, target services, and message details) through our forms and interactive widgets. We also collect anonymous tracking metrics (such as page views, CTR values, and scroll depth) to monitor platform engagement and improve layout usability.
          </p>
          <h2 className="text-lg font-bold text-slate-900 pt-4">2. How We Use Your Data</h2>
          <p>
            Your submitted project details are used exclusively to qualify business requirements, estimate budgets, and contact you for discovery calls. We do not sell your personal details or share them with unauthorized third-party platforms.
          </p>
          <h2 className="text-lg font-bold text-slate-900 pt-4">3. Data Security & Storage</h2>
          <p>
            We implement strict HTTPS, security headers, input validation, and rate-limiting scripts to secure our databases and prevent spam. For AI pipelines, we utilize official enterprise API pathways where your corporate information is never used to train model baselines.
          </p>
        </div>
      </div>
    </main>
  );
}
