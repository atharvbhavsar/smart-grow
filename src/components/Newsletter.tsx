"use client";

// Trigger automatic build with correct Vercel environment variables
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";

// Form validation schema
const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .trim(),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

interface NewsletterProps {
  variant?: "default" | "dark" | "minimal";
}

export function Newsletter({ variant = "default" }: NewsletterProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: NewsletterFormValues) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      // Track start event
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "newsletter_subscription_started", {
          email: data.email,
        });
      }

      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to subscribe. Please try again.");
      }

      setStatus("success");
      reset();

      // Track success event
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "newsletter_subscription_successful");
      }
    } catch (err: any) {
      console.error("Subscription error:", err);
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again later.");

      // Track failure event
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "newsletter_subscription_failed", {
          error: err.message,
        });
      }
    }
  };

  // 1. MINIMAL VARIANT (Inline pill, ideal for footer)
  if (variant === "minimal") {
    return (
      <div className="w-full max-w-md font-sans">
        <p className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
          Subscribe to our newsletter
        </p>
        
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 p-3 rounded-full px-5"
            >
              <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
              <span className="text-xs font-bold text-slate-700">
                Thank you! You have subscribed successfully.
              </span>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-2"
              noValidate
            >
              <div className="bg-slate-50 border border-slate-200/80 p-1.5 rounded-full flex items-center justify-between shadow-2xs relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  disabled={status === "loading"}
                  aria-label="Email address"
                  {...register("email")}
                  className="bg-transparent text-slate-800 text-sm px-4 focus:outline-hidden w-full placeholder:text-slate-400 font-medium"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-slate-950 text-white hover:bg-slate-900 px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer flex-shrink-0 flex items-center gap-1.5 min-h-[38px] disabled:opacity-80"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" />
                      ...
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>

              {/* Validation/API error states below input */}
              {errors.email && (
                <p className="text-xs font-bold text-red-500 pl-4 mt-1 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 shrink-0" />
                  {errors.email.message}
                </p>
              )}

              {status === "error" && (
                <p className="text-xs font-bold text-red-500 pl-4 mt-1 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 shrink-0" />
                  {errorMessage}
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // 2. DARK VARIANT (Transparent / inline container for dark backgrounds like the blog page)
  if (variant === "dark") {
    return (
      <div className="w-full max-w-md mx-auto font-sans">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex items-center justify-center gap-2 bg-slate-800/80 border border-slate-700 p-4 rounded-xl"
            >
              <CheckCircle2 className="h-4.5 w-4.5 text-blue-400 shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-white">
                Thank you! Welcome to the Growth Circle. 🚀
              </span>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-2 text-left"
              noValidate
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your work email..."
                  disabled={status === "loading"}
                  aria-label="Email address"
                  {...register("email")}
                  className="bg-slate-800 border border-slate-700 focus:bg-slate-950 focus:border-blue-600 rounded-xl px-4 py-3 text-sm outline-hidden text-white w-full transition-all duration-300 placeholder:text-slate-500 font-medium"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-6 py-3 cursor-pointer shrink-0 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-80"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    "Subscribe Free"
                  )}
                </button>
              </div>

              {errors.email && (
                <p className="text-xs font-bold text-red-400 pl-2 mt-1 flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  {errors.email.message}
                </p>
              )}

              {status === "error" && (
                <p className="text-xs font-bold text-red-400 pl-2 mt-1 flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  {errorMessage}
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // 3. DEFAULT VARIANT (Light Card, standard UI)
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-2xs relative overflow-hidden font-sans">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-950 tracking-tight">
              Join the Growth Circle
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Get bi-weekly AI workflows and conversion tips.
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-start gap-3 bg-emerald-50/80 border border-emerald-100 p-4 rounded-2xl"
            >
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-extrabold text-slate-950">
                  Thank you for subscribing!
                </p>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed mt-1">
                  You'll receive SmartlyGrow's latest updates, AI insights, and business growth tips.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-xs text-blue-600 hover:text-blue-700 font-bold mt-2 hover:underline cursor-pointer"
                >
                  Subscribe another email
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-3"
              noValidate
            >
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    disabled={status === "loading"}
                    aria-label="Email address"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                    className={`w-full bg-white text-slate-800 text-sm pl-4 pr-10 py-3 rounded-full border transition-all duration-300 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 ${
                      errors.email
                        ? "border-red-300 focus:border-red-400 focus:ring-red-400/10"
                        : "border-slate-200/80"
                    }`}
                  />
                  {errors.email && (
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-red-500">
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-slate-950 text-white hover:bg-slate-900 px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer disabled:opacity-80 shrink-0 flex items-center justify-center gap-2 min-h-[44px]"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>

              {/* Validation errors */}
              {errors.email && (
                <p className="text-xs font-bold text-red-500 pl-3">
                  {errors.email.message}
                </p>
              )}

              {/* API errors */}
              {status === "error" && (
                <div className="flex items-center gap-2 text-xs font-bold text-red-500 pl-3">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
