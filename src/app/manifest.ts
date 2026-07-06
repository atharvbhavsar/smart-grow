import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SmartlyGrow",
    short_name: "SmartlyGrow",
    description: "SmartlyGrow is an AI-powered business growth agency building custom Next.js platforms, CRM systems, and AI agents.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
