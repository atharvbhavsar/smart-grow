import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies & Portfolio | SmartyGrow",
  description: "Explore our software engineering and AI workflow projects, outlining actual bottom-line growth achievements and conversion statistics.",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
