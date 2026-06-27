import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free Consultation | SmartyGrow",
  description: "Schedule a discovery scope call to audit your website speed, custom SaaS layout design, or AI agent routing systems.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
