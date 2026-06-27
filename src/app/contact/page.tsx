"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, MapPin, MessageCircle, ArrowRight, CheckCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Form Validation Schema (budget field removed)
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Invalid phone number format"),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

function ContactFormContent() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);

  // Prepopulate form values from query parameters
  const defaultService = searchParams.get("type") || searchParams.get("plan") || "";
  const defaultFeatures = searchParams.get("features") || "";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: defaultService,
      message: defaultFeatures 
        ? `Hi, I estimated my project using your calculator. Selected addons: ${defaultFeatures}.` 
        : "",
    },
  });

  useEffect(() => {
    if (defaultService) {
      setValue("service", defaultService);
    }
    if (defaultFeatures) {
      setValue("message", `Hi, I estimated my project using your calculator. Selected addons: ${defaultFeatures}.`);
    }
  }, [defaultService, defaultFeatures, setValue]);

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Contact form submitted data:", data);
    setSubmitted(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      {/* Left Info Column */}
      <div className="lg:col-span-5 text-left">
        <span className="text-blue-600 text-xs font-bold uppercase tracking-widest bg-blue-50/70 border border-blue-100/40 px-3 py-1.5 rounded-full">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight leading-tight">
          Let&apos;s Architect Your Growth
        </h1>
        <p className="text-slate-500 mt-4 text-sm sm:text-base leading-relaxed">
          Have an idea for a platform, custom automation, or a high-performance marketing site? Send us a message or jump directly to WhatsApp.
        </p>

        {/* Contact details list */}
        <div className="mt-8 space-y-6">
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Us</h4>
              <a href="mailto:growth@smartygrow.com" className="text-slate-800 hover:text-blue-600 font-semibold transition-colors text-sm sm:text-base">
                growth@smartygrow.com
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Call Directly</h4>
              <a href="tel:+917020951401" className="text-slate-800 hover:text-blue-600 font-semibold transition-colors text-sm sm:text-base">
                +91 70209 51401
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fast WhatsApp Support</h4>
              <a href="https://wa.me/917020951401" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline font-semibold transition-colors text-sm sm:text-base">
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Office Location</h4>
              <p className="text-slate-700 text-sm font-medium leading-relaxed">
                Pune, Maharashtra, India<br />
                Available for Virtual Audits globally
              </p>
            </div>
          </div>
        </div>

        {/* Tiny map placeholder card */}
        <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-4 relative overflow-hidden flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-900">Virtual Office Audits Available</h4>
            <p className="text-slate-500 text-[11px] mt-1">We service clients internationally across US, Europe & APAC timezones.</p>
          </div>
          <HelpCircle className="h-8 w-8 text-slate-300" />
        </div>
      </div>

      {/* Right Form Column */}
      <div className="lg:col-span-7 bg-white border border-slate-200/60 p-6 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
        {submitted ? (
          <div className="text-center py-12 flex flex-col items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-6">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Consultation Booked!</h2>
            <p className="text-slate-500 mt-2 text-sm sm:text-base max-w-sm mx-auto">
              Thank you for submitting your details. Aashish Jhumle will review your brief and email you a calendar booking invitation in under 4 hours.
            </p>
            <Button 
              onClick={() => setSubmitted(false)}
              className="mt-8 bg-slate-950 text-white hover:bg-slate-800 rounded-xl cursor-pointer"
            >
              Submit Another Inquiry
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="flex flex-col gap-1.5 items-start">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Your Name *</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  {...register("name")}
                  className={`w-full border bg-slate-50/50 hover:bg-slate-50 focus:bg-white rounded-xl px-4 py-3 text-sm outline-none transition-all ${
                    errors.name ? "border-red-500 ring-2 ring-red-100" : "border-slate-200 focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 focus:shadow-xs"
                  }`}
                />
                {errors.name && <span className="text-[11px] text-red-500 font-semibold">{errors.name.message}</span>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5 items-start">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Work Email *</label>
                <input
                  type="email"
                  placeholder="e.g. john@company.com"
                  {...register("email")}
                  className={`w-full border bg-slate-50/50 hover:bg-slate-50 focus:bg-white rounded-xl px-4 py-3 text-sm outline-none transition-all ${
                    errors.email ? "border-red-500 ring-2 ring-red-100" : "border-slate-200 focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 focus:shadow-xs"
                  }`}
                />
                {errors.email && <span className="text-[11px] text-red-500 font-semibold">{errors.email.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Phone */}
              <div className="flex flex-col gap-1.5 items-start">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Phone Number *</label>
                <input
                  type="text"
                  placeholder="e.g. +1 (555) 000-0000"
                  {...register("phone")}
                  className={`w-full border bg-slate-50/50 hover:bg-slate-50 focus:bg-white rounded-xl px-4 py-3 text-sm outline-none transition-all ${
                    errors.phone ? "border-red-500 ring-2 ring-red-100" : "border-slate-200 focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 focus:shadow-xs"
                  }`}
                />
                {errors.phone && <span className="text-[11px] text-red-500 font-semibold">{errors.phone.message}</span>}
              </div>

              {/* Company */}
              <div className="flex flex-col gap-1.5 items-start">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. Stripe Inc"
                  {...register("company")}
                  className="w-full border border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white rounded-xl px-4 py-3 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 focus:shadow-xs"
                />
              </div>
            </div>

            {/* Target Service (Full width since Budget is removed) */}
            <div className="flex flex-col gap-1.5 items-start">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Target Service *</label>
              <select
                {...register("service")}
                className={`w-full border bg-slate-50/50 hover:bg-slate-50 focus:bg-white rounded-xl px-4 py-3 text-sm outline-none transition-all ${
                  errors.service ? "border-red-500 ring-2 ring-red-100" : "border-slate-200 focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 focus:shadow-xs"
                }`}
              >
                <option value="">Select an option...</option>
                <option value="website-development">Website Development</option>
                <option value="web-applications">Web Applications</option>
                <option value="ai-automation">AI Automation</option>
                <option value="ai-agents">AI Agents</option>
                <option value="branding">Branding & System Tokens</option>
                <option value="content-creation">Content Marketing</option>
                <option value="social-media-management">Social Channels</option>
                <option value="seo">SEO Dominance</option>
                <option value="video-editing">Video Editing</option>
              </select>
              {errors.service && <span className="text-[11px] text-red-500 font-semibold">{errors.service.message}</span>}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5 items-start">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Project Details & Objectives *</label>
              <textarea
                rows={5}
                placeholder="Describe what you want to build and your business targets..."
                {...register("message")}
                className={`w-full border bg-slate-50/50 hover:bg-slate-50 focus:bg-white rounded-xl px-4 py-3 text-sm outline-none transition-all ${
                  errors.message ? "border-red-500 ring-2 ring-red-100" : "border-slate-200 focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 focus:shadow-xs"
                }`}
              />
              {errors.message && <span className="text-[11px] text-red-500 font-semibold">{errors.message.message}</span>}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-100 cursor-pointer"
            >
              {isSubmitting ? "Validating & Submitting..." : "Send Consultation Brief"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <main className="flex-1 py-16 sm:py-24 bg-white font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Suspense fallback={
          <div className="py-20 text-center text-slate-500 text-sm font-semibold">
            Loading Form Architecture...
          </div>
        }>
          <ContactFormContent />
        </Suspense>
      </div>
    </main>
  );
}
