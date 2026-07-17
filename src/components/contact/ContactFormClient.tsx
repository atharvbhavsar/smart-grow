"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, MapPin, MessageCircle, ArrowRight, CheckCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Invalid phone number format"),
  company: z.string().optional().or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(2, "Please enter project details"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

function ContactFormContent() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);

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
    try {
      const formBody = new URLSearchParams({
        "form-name": "contact",
        ...data,
      });

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody.toString(),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true);
    }
  };

  return (
    <main className="flex-1 bg-white font-sans pt-20">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-slate-50/50 border-b border-slate-100 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full">
            Free Consultation
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mt-6 tracking-tight leading-tight max-w-3xl mx-auto">
            Book A Discovery Session With Our Engineers
          </h1>
          <p className="text-slate-500 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            Discuss your website build, local SEO rank strategy, or custom AI agent automation pipeline with Pune&apos;s leading technical team.
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Let&apos;s Scale Operations Together
                </h2>
                <p className="text-slate-500 mt-3 text-sm sm:text-base leading-relaxed">
                  We reply within 4 business hours with a technical project estimate and architecture outline.
                </p>
              </div>

              {/* Direct Contact Cards */}
              <div className="space-y-4">
                <a
                  href="https://wa.me/917020951401?text=Hello,%20I'm%20interested%20in%20a%20project%20with%20SmartlyGrow!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200/80 bg-white hover:border-emerald-500 hover:shadow-md transition-all group"
                >
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Instant Chat</span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">WhatsApp Direct Line</span>
                  </div>
                </a>

                <a
                  href="mailto:aashish@smartlygrow.com"
                  className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200/80 bg-white hover:border-blue-600 hover:shadow-md transition-all group"
                >
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Official Email</span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">aashish@smartlygrow.com</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200/80 bg-white">
                  <div className="p-3 rounded-xl bg-slate-100 text-slate-600">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">HQ Location</span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-900">Koregaon Park, Pune, MH, India</span>
                  </div>
                </div>
              </div>

              {/* What Happens Next */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-3">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">What Happens Next:</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 shrink-0" /> 30-Minute Architecture & Audit Call
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 shrink-0" /> Tailored Proposal & Milestones Timeline
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 shrink-0" /> Rapid Prototype & Weekly Sprint Demos
                  </li>
                </ul>
              </div>

            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="inline-flex p-4 rounded-full bg-emerald-50 text-emerald-600 mb-2">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">Consultation Request Received!</h3>
                  <p className="text-slate-500 text-sm max-w-md mx-auto">
                    Our engineering lead will review your requirements and respond via email or WhatsApp within 4 business hours.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="mt-4 border-slate-200 text-slate-700 font-bold px-6 py-2.5 rounded-full text-xs uppercase"
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form 
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  onSubmit={handleSubmit(onSubmit)} 
                  className="space-y-6"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                        Full Name *
                      </label>
                      <input
                        {...register("name")}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-blue-600 transition-colors bg-white"
                      />
                      {errors.name && (
                        <p className="text-xs text-rose-500 font-bold">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                        Work Email *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-blue-600 transition-colors bg-white"
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-500 font-bold">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                        Phone / WhatsApp *
                      </label>
                      <input
                        {...register("phone")}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-blue-600 transition-colors bg-white"
                      />
                      {errors.phone && (
                        <p className="text-xs text-rose-500 font-bold">{errors.phone.message}</p>
                      )}
                    </div>

                    {/* Company */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                        Company Name (Optional)
                      </label>
                      <input
                        {...register("company")}
                        placeholder="Acme Inc."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-blue-600 transition-colors bg-white"
                      />
                    </div>
                  </div>

                  {/* Primary Service Select */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      Primary Target Service *
                    </label>
                    <select
                      {...register("service")}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-blue-600 transition-colors bg-white"
                    >
                      <option value="">Select a service focus...</option>
                      <option value="Website Development">Website Design & Next.js Development</option>
                      <option value="AI Automation">AI Workflow Automation & Custom Agents</option>
                      <option value="SEO & Business Growth">Local SEO & Google Business Profile Optimization</option>
                      <option value="Creative Services">Video Editing, UGC Content & Branding</option>
                      <option value="Custom Software">Custom Web Portal / App Engineering</option>
                    </select>
                    {errors.service && (
                      <p className="text-xs text-rose-500 font-bold">{errors.service.message}</p>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      Project Goals & Requirements *
                    </label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      placeholder="Tell us about your target goals, timeline, or current bottlenecks..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-blue-600 transition-colors bg-white"
                    />
                    {errors.message && (
                      <p className="text-xs text-rose-500 font-bold">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 rounded-xl text-sm tracking-wider uppercase shadow-lg shadow-blue-500/20 cursor-pointer transition-all min-h-[48px]"
                  >
                    {isSubmitting ? "Submitting Request..." : "Request Free Consultation →"}
                  </Button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

export default function ContactFormClient() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-28 text-center text-slate-400">Loading consultation form...</div>}>
      <ContactFormContent />
    </Suspense>
  );
}
