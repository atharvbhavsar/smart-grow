"use client";

import React from "react";
import { faqData } from "@/data/siteData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export function FaqAccordion() {
  return (
    <section className="py-12 lg:py-16 bg-slate-50/30 border-t border-slate-100 font-sans" id="faq">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column (Title & Subtitle) */}
          <div className="lg:col-span-5 flex flex-col items-start justify-start lg:sticky lg:top-32 h-fit">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/60 text-xs font-extrabold uppercase tracking-widest text-slate-500">
              FAQS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 mt-4 tracking-tighter leading-[1.1]">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 mt-4 text-sm sm:text-[15px] tracking-wide leading-relaxed max-w-sm">
              Can&apos;t find what you are looking for? Reach out directly via our contact form or live WhatsApp support channels.
            </p>
          </div>
 
          {/* Right Column (Accent Accordion List) */}
          <div className="lg:col-span-7">
            <Accordion className="w-full">
              {faqData.map((faq, idx) => (
                <AccordionItem 
                  value={`item-${idx}`} 
                  key={idx}
                  className="bg-white border border-slate-200/60 rounded-2xl px-5 py-2 mb-4 shadow-2xs hover:shadow-xs transition-all border-l-4 border-l-transparent data-[state=open]:border-l-blue-600 hover:border-l-blue-600 cursor-pointer last:mb-0"
                >
                  <AccordionTrigger className="text-left text-sm sm:text-base font-bold text-slate-900 hover:text-blue-600 hover:no-underline py-3 cursor-pointer">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-500 text-sm sm:text-[15px] leading-relaxed pb-3">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

        </div>

      </div>
    </section>
  );
}
