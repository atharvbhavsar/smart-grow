import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight, MessageCircle, Instagram } from "lucide-react";

export function FinalCta() {
  return (
    <section className="py-12 lg:py-16 bg-slate-900 text-white relative overflow-hidden font-sans">

      {/* Background radial shapes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl -z-10" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">

        {/* Sub title */}
        <span className="text-blue-400 text-xs font-bold uppercase tracking-widest bg-blue-500/10 px-3.5 py-2 rounded-full border border-blue-500/20">
          Ready To Scale Operations?
        </span>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mt-4 mb-4">
          Let&apos;s Build Something That Grows Your Business
        </h2>

        {/* Desc */}
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mb-6 leading-relaxed">
          Schedule a free 30-minute discovery call to map out a clear technical solution blueprint for your website design, operations audit, or customized AI agents.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link href="/contact">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl flex items-center gap-2 group cursor-pointer shadow-md shadow-blue-500/20 transition-all">
              Book a Free Consultation
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </Link>

          <a
            href="https://wa.me/917020951401?text=Hello,%20I'm%20interested%20in%20a%20project%20with%20SmartlyGrow!"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="border-slate-800 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-sm px-8 py-3.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer">
              <MessageCircle className="h-4.5 w-4.5 text-emerald-500 fill-emerald-500/20" />
              Chat on WhatsApp
            </Button>
          </a>
        </div>

      </div>
    </section>
  );
}

export function InstagramIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ig-grad" cx="0.3" cy="1.05" r="1.2">
          <stop offset="0" stopColor="#ffdb5c" />
          <stop offset="0.25" stopColor="#ff9f43" />
          <stop offset="0.5" stopColor="#e84393" />
          <stop offset="0.75" stopColor="#d63031" />
          <stop offset="1" stopColor="#6c5ce7" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="512" height="512" rx="128" fill="url(#ig-grad)" />
      <rect x="96" y="96" width="320" height="320" rx="90" fill="none" stroke="#ffffff" strokeWidth="36" />
      <circle cx="256" cy="256" r="76" fill="none" stroke="#ffffff" strokeWidth="36" />
      <circle cx="344" cy="168" r="22" fill="#ffffff" />
    </svg>
  );
}

// Floating Instagram widget (Left side)
export function FloatingInstagram() {
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <a
        href="https://www.instagram.com/smartlygrow.in?utm_source=qr&igsh=MXh0Mm50OWc2Nms3aA=="
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center h-14 w-14 rounded-full drop-shadow-[0_8px_25px_rgba(232,67,147,0.45)] hover:drop-shadow-[0_12px_30px_rgba(232,67,147,0.65)] transition-all duration-300 hover:scale-110 cursor-pointer group bg-transparent p-0"
        aria-label="Follow us on Instagram"
      >
        <InstagramIcon className="h-14 w-14" />
      </a>
    </div>
  );
}

export function WhatsAppIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 175.216 175.552" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#25D366"
        d="M.024 175.552l12.3-44.916C4.664 116.856.444 100.74.444 83.98.444 37.66 38.1.024 84.42.024c22.44 0 43.536 8.736 59.412 24.612 15.876 15.876 24.612 36.972 24.612 59.412 0 46.32-37.656 83.956-83.976 83.956-16.032 0-31.752-4.572-45.396-12.876L.024 175.552z"
      />
      <path
        fill="#FFF"
        d="M12.912 162.66l38.808-10.176 2.376 1.416c11.976 7.116 25.716 10.872 39.816 10.872 41.244 0 74.808-33.564 74.808-74.808 0-19.98-7.776-38.772-21.9-52.896-14.124-14.124-32.916-21.9-52.896-21.9-41.244 0-74.808 33.564-74.808 74.808 0 14.772 4.356 29.112 12.6 41.544l1.548 2.328-10.356 37.824z"
      />
      <path
        fill="#25D366"
        d="M83.916 14.664c-38.208 0-69.312 31.104-69.312 69.312 0 13.788 4.056 27.132 11.724 38.604l1.32 1.98-7.74 28.248 28.98-7.596 2.052 1.224c11.124 6.624 23.868 10.116 36.948 10.116 38.208 0 69.312-31.104 69.312-69.312 0-18.516-7.212-35.928-20.316-49.032-13.104-13.104-30.516-20.316-49.032-20.316z"
      />
      <path
        fill="#FFF"
        d="M62.916 48.756c-1.548-3.444-3.18-3.516-4.656-3.576-1.212-.048-2.604-.048-3.996-.048-1.392 0-3.66.528-5.58 2.628-1.92 2.1-7.332 7.164-7.332 17.472s7.512 20.268 8.556 21.672c1.044 1.404 14.472 22.752 35.592 31.308 17.556 7.116 21.132 5.688 24.96 5.34 3.828-.348 12.288-5.016 14.028-9.852 1.74-4.836 1.74-8.988 1.224-9.852-.516-.864-1.92-1.392-4.008-2.436-2.088-1.044-12.288-6.072-14.208-6.768-1.92-.696-3.312-1.044-4.716 1.044-1.392 2.1-5.4 6.768-6.624 8.16-1.224 1.392-2.436 1.572-4.524.528-2.088-1.044-8.82-3.252-16.8-10.368-6.204-5.532-10.392-12.36-11.604-14.448-1.212-2.088-.132-3.216.912-4.248.936-.936 2.088-2.436 3.132-3.66.18-.216.36-.432.54-.648 1.044-1.224 1.392-2.1.864-3.492-.528-1.392-4.656-11.412-6.444-15.528z"
      />
    </svg>
  );
}

// Floating WhatsApp widget (Right side)
export function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="https://wa.me/917020951401?text=Hello,%20I'm%20interested%20in%20a%20project%20with%20SmartlyGrow!"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center h-14 w-14 rounded-full drop-shadow-[0_8px_25px_rgba(37,211,102,0.45)] hover:drop-shadow-[0_12px_30px_rgba(37,211,102,0.65)] transition-all duration-300 hover:scale-110 cursor-pointer group bg-transparent p-0"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="h-14 w-14" />
      </a>
    </div>
  );
}
