import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | SmartyGrow",
  description: "Read the Terms & Conditions of SmartyGrow to understand our project delivery pipelines, SLA commitments, and terms of service.",
};

export default function TermsPage() {
  return (
    <main className="flex-1 py-16 sm:py-24 bg-white font-sans text-left">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-8">Terms & Conditions</h1>
        <div className="prose prose-slate space-y-6 text-sm text-slate-600 leading-relaxed">
          <p className="font-semibold text-slate-800">Effective Date: June 28, 2026</p>
          <p>
            Welcome to SmartyGrow. These Terms & Conditions outline the rules and regulations governing your use of our website, estimation calculators, and professional service offerings.
          </p>
          <h2 className="text-lg font-bold text-slate-900 pt-4">1. Acceptance of Terms</h2>
          <p>
            By accessing our marketing materials, filling out discovery briefs, or interacting with our AI widgets, you agree to comply with these terms. If you do not agree, please cease using our systems.
          </p>
          <h2 className="text-lg font-bold text-slate-900 pt-4">2. Intellectual Property Rights</h2>
          <p>
            Once a project contract is completed and paid in full, our clients receive 100% ownership and intellectual property rights over all customized Next.js code, design layouts, Figma tokens, and vector assets. SmartyGrow retains ownership of our proprietary baseline boilerplates and templates.
          </p>
          <h2 className="text-lg font-bold text-slate-900 pt-4">3. Limitation of Liability</h2>
          <p>
            Our baseline estimations, calculator values, and AI chat outputs are for operational scheduling and modeling purposes only. Final project prices, delivery schedules, and SLAs are governed solely by signed custom Service Agreements.
          </p>
        </div>
      </div>
    </main>
  );
}
