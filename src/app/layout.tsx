import type { Metadata } from "next";
import { Outfit, Instrument_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/SmoothScroll";
import { FloatingInstagram, FloatingWhatsApp } from "@/components/home/FinalCta";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200"],
});

export const metadata: Metadata = {
  title: {
    default: "SmartyGrow - AI Powered Business Growth Agency",
    template: "%s | SmartyGrow"
  },
  description: "SmartyGrow is an AI-powered growth agency building high-performance Next.js systems, custom SaaS applications, and context-aware AI agents for modern companies.",
  icons: {
    icon: "/icon.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${instrumentSans.variable} ${montserrat.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-600/10 selection:text-blue-600">
        <SmoothScrollProvider>
          <Header />
          <div className="flex-1 flex flex-col w-full">
            {children}
          </div>
          <Footer />
          <FloatingInstagram />
          <FloatingWhatsApp />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
