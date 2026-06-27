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
            href="https://wa.me/917020951401?text=Hello,%20I'm%20interested%20in%20a%20project%20with%20SmartyGrow!"
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

// Floating Instagram widget (Left side)
export function FloatingInstagram() {
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <a
        href="https://www.instagram.com/smartygrow.official"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white h-12 w-12 rounded-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:scale-110 cursor-pointer group"
        aria-label="Follow us on Instagram"
      >
        <svg
          className="h-6 w-6 fill-none stroke-white"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      </a>
    </div>
  );
}

// Floating WhatsApp widget (Right side)
export function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="https://wa.me/917020951401?text=Hello,%20I'm%20interested%20in%20a%20project%20with%20SmartyGrow!"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center bg-[#25D366] text-white h-12 w-12 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.35)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.55)] transition-all duration-300 hover:scale-110 cursor-pointer group"
        aria-label="Chat on WhatsApp"
      >
        <svg
          className="h-7 w-7 fill-white"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.031 2C6.479 2 2 6.477 2 12.029c0 1.91.533 3.69 1.455 5.215L2 22l4.957-1.422a9.98 9.98 0 005.074 1.378c5.551 0 10.03-4.477 10.03-10.029C22.062 6.477 17.58 2 12.03 2zm3.829 13.085c-.18.528-.897 1.002-1.452 1.134-.51.12-1.18.214-3.41-.714-2.846-1.182-4.664-4.072-4.806-4.26-.142-.19-1.168-1.554-1.168-2.96 0-1.406.732-2.1 1.018-2.385.285-.285.626-.356.837-.356.21 0 .426.002.613.01.196.008.459-.074.721.564.269.654.919 2.247.999 2.408.08.16.134.348.026.559-.108.21-.162.348-.323.535-.162.187-.339.42-.482.563-.162.162-.33.339-.142.664.187.324.835 1.372 1.792 2.222.957.85 1.764 1.114 2.091 1.277.328.162.52.139.712-.08.192-.22.827-.959.957-1.288.13-.33.26-.275.459-.2.2.074 1.27.6 1.488.71.218.11.363.165.417.258.054.093.054.538-.126 1.066z" />
        </svg>
      </a>
    </div>
  );
}
