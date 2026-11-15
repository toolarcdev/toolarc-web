"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/** Home and dedicated LPs own their chrome; other routes keep the site chrome. */
export function SiteChrome({ children, header, footer }: {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
}) {
  const pathname = usePathname();
  if (
    pathname === "/" ||
    pathname === "/lp/ai-skill-academy-free-seminar" ||
    pathname === "/lp/ai-skill-academy-paid-school" ||
    pathname === "/lp/internet-academy-generative-ai" ||
    pathname === "/lp/programming-hacks"
  ) return children;
  const isBytechLp = pathname === "/lp/bytech-generative-ai";
  return (
    <>
      {isBytechLp ? null : header}
      <div className="flex flex-1 flex-col">{children}</div>
      {footer}
    </>
  );
}
