import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Insights | SmartyGrow",
  description: "Read technical guides on Next.js frontend performance, vector search engine designs, and SEO traffic blueprints.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
