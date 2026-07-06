import type { Metadata } from "next";
import { Outfit, Instrument_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MarqueeTicker } from "@/components/layout/MarqueeTicker";
import SmoothScrollProvider from "@/components/SmoothScroll";
import { FloatingInstagram, FloatingWhatsApp } from "@/components/home/FinalCta";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

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
  metadataBase: new URL("https://smartlygrow.in"),
  title: {
    default: "SmartlyGrow | AI Powered Business Growth Company",
    template: "%s | SmartlyGrow"
  },
  description: "SmartlyGrow helps businesses grow with AI Automation, Website Development, Branding, SEO, Digital Marketing, and Business Intelligence.",
  keywords: [
    "AI Website Development",
    "AI Business Automation",
    "Business Growth Company",
    "Website Development Company Pune",
    "AI Agency Pune",
    "AI Integration Services",
    "Digital Growth Agency Pune",
    "AI Automation Company India",
    "AI Marketing Agency"
  ],
  authors: [{ name: "SmartlyGrow Team", url: "https://smartlygrow.in" }],
  creator: "SmartlyGrow",
  publisher: "SmartlyGrow",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SmartlyGrow | AI Powered Business Growth Company",
    description: "SmartlyGrow helps businesses grow with AI Automation, Website Development, Branding, SEO, Digital Marketing, and Business Intelligence.",
    url: "https://smartlygrow.in",
    siteName: "SmartlyGrow",
    images: [
      {
        url: "/logo-new.png",
        width: 1200,
        height: 630,
        alt: "SmartlyGrow Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartlyGrow | AI Powered Business Growth Company",
    description: "SmartlyGrow helps businesses grow with AI Automation, Website Development, Branding, SEO, Digital Marketing, and Business Intelligence.",
    images: ["/logo-new.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    apple: "/logo-about.png",
  },
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
      <head>
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L7QDRR7K2E"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L7QDRR7K2E', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window,document,"clarity","script","qg64f33u56");
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NMC5K5P');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-600/10 selection:text-blue-600">
        {/* GTM Noscript */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-NMC5K5P"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <SmoothScrollProvider>
          <Header />
          <div className="flex-1 flex flex-col w-full bg-tech-grid pt-16">
            {children}
          </div>
          <MarqueeTicker />
          <Footer />
          <FloatingInstagram />
          <FloatingWhatsApp />
          <Analytics />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
