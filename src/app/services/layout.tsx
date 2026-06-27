import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | SmartyGrow",
  description: "Explore our AI solutions, digital products, creative services, and growth services designed to automate tasks and drive B2B revenue.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
