"use client";

import React from "react";
import Link from "next/link";
import { Newsletter } from "../Newsletter";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-150/80 mt-auto pt-12 sm:pt-20 pb-8 font-sans overflow-hidden relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-16 border-b border-slate-100">
          
          {/* Left: Contact info & Subscription */}
          <div className="md:col-span-6 flex flex-col items-start justify-between gap-8 w-full">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-2">
                Contact us at
              </p>
              <a 
                href="mailto:smartlygrow.offical@gmail.com" 
                className="text-lg sm:text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors break-all"
              >
                smartlygrow.offical@gmail.com
              </a>
            </div>

            {/* Production Newsletter component */}
            <Newsletter variant="minimal" />
          </div>

          {/* Right: Link grids */}
          <div className="md:col-span-6 grid grid-cols-2 gap-8 md:pl-12">
            
            {/* Quick Links */}
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4">
                Links
              </p>
              <ul className="space-y-2.5">
                {[
                  { label: "Home", href: "/" },
                  { label: "Portfolio", href: "/portfolio" },
                  { label: "Services", href: "/services" },
                  { label: "About Us", href: "/about" },
                  { label: "Contact Us", href: "/contact" }
                ].map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="text-sm font-bold uppercase tracking-wider text-slate-700 hover:text-blue-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4">
                Resources
              </p>
              <ul className="space-y-2.5">
                {[
                  { label: "Blogs", href: "/blog" },
                  { label: "Terms & Conditions", href: "/terms" },
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Refund Policy", href: "/refund" }
                ].map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="text-sm font-bold uppercase tracking-wider text-slate-700 hover:text-blue-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright & Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
          <p>© {new Date().getFullYear()} SmartlyGrow. All rights reserved.</p>
          <p>
            Prepared by{" "}
            <a 
              href="https://www.linkedin.com/in/atharv-bhavsar-53995a323/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-600 hover:text-blue-600 transition-colors underline decoration-slate-300 hover:decoration-blue-500 underline-offset-4"
            >
              Atharv Bhavsar
            </a>
          </p>
        </div>

      </div>

      {/* Giant Watermarked background logo at the bottom */}
      <div className="w-full mt-10 select-none pointer-events-none overflow-hidden">
        <div 
          className="leading-none uppercase select-none whitespace-nowrap w-full text-center"
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontWeight: 300,
            fontSize: "8.5vw",
            color: "#e2e2e2",
            letterSpacing: "0.01em",
            textShadow: [
              "0px -2px 2px rgba(0,0,0,0.14)",
              "0px 2px 0px rgba(255,255,255,1)",
              "0px 4px 6px rgba(0,0,0,0.04)",
            ].join(", "),
          }}
        >
          Smartlygrow
        </div>
      </div>
    </footer>
  );
}
