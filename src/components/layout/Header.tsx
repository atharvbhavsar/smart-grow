"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "../Logo";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu, X } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full pt-4 sm:pt-6 px-3 sm:px-4 pointer-events-none transition-all duration-300 font-sans">
      <div className="mx-auto max-w-5xl w-full pointer-events-auto">
        <div className="flex items-center justify-between border border-slate-200/80 bg-white px-4 sm:px-8 md:px-14 py-3 sm:py-5 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.03)]">
          
          {/* Desktop Left Nav Links */}
          <div className="hidden md:flex items-center gap-16 flex-1 justify-end pr-14">
            <Link
              href="/packages"
              className={`text-[17px] font-bold tracking-tight transition-colors hover:text-blue-600 ${
                pathname === "/packages" ? "text-blue-600" : "text-slate-900"
              }`}
            >
              Prebuilt
            </Link>
            <Link
              href="/services"
              className={`text-[17px] font-bold tracking-tight transition-colors hover:text-blue-600 ${
                pathname.startsWith("/services") ? "text-blue-600" : "text-slate-900"
              }`}
            >
              Customized
            </Link>
          </div>

          {/* Centered Logo */}
          <Link href="/" className="flex-shrink-0 mx-2">
            <Logo showText={true} />
          </Link>

          {/* Desktop Right Nav Links */}
          <div className="hidden md:flex items-center gap-16 flex-1 pl-14">
            <Link
              href="/about"
              className={`text-[17px] font-bold tracking-tight transition-colors hover:text-blue-600 ${
                pathname === "/about" ? "text-blue-600" : "text-slate-900"
              }`}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className={`text-[17px] font-bold tracking-tight transition-colors hover:text-blue-600 ${
                pathname === "/contact" ? "text-blue-600" : "text-slate-900"
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Hamburger Trigger */}
          <div className="md:hidden flex-shrink-0">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger render={
                <Button variant="ghost" size="icon" className="text-slate-800 h-11 w-11 hover:bg-slate-50 rounded-full cursor-pointer flex items-center justify-center p-0">
                  <Menu className="h-5 w-5" />
                </Button>
              } />
              <SheetContent side="top" showCloseButton={false} className="w-full bg-white/98 backdrop-blur-md p-6 border-b border-slate-100 rounded-b-3xl">
                <div className="flex flex-col gap-6 py-2">
                  {/* Header row */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <Link href="/" onClick={() => setIsOpen(false)}>
                      <Logo />
                    </Link>
                    <Button variant="ghost" size="icon" className="h-11 w-11 rounded-full cursor-pointer flex items-center justify-center p-0 hover:bg-slate-50" onClick={() => setIsOpen(false)}>
                      <X className="h-5 w-5 text-slate-800" />
                    </Button>
                  </div>

                  {/* Nav links */}
                  <nav className="flex flex-col gap-1">
                    {[
                      { href: "/packages", label: "Prebuilt Packages" },
                      { href: "/services", label: "Customized Services" },
                      { href: "/about", label: "About Us" },
                      { href: "/contact", label: "Contact Us" },
                    ].map(({ href, label }) => {
                      const active = href === "/services" ? pathname.startsWith("/services") : pathname === href;
                      return (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setIsOpen(false)}
                          className={`text-sm font-bold uppercase tracking-wider py-3 px-4 rounded-xl hover:bg-slate-50 hover:text-blue-600 transition-all min-h-[44px] flex items-center ${
                            active ? "text-blue-600 bg-blue-50" : "text-slate-800"
                          }`}
                        >
                          {label}
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Primary CTA */}
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-full text-sm tracking-wide cursor-pointer min-h-[48px]">
                      Book Free Consultation →
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  );
}
