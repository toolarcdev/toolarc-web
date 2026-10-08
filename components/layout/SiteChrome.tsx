"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/** Keep the normal site's server-rendered chrome outside the dedicated LP. */
export function SiteChrome({ children, header, footer }: {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
}) {
  const pathname = usePathname();
  if (
    pathname === "/lp/ai-skill-academy-free-seminar" ||
    pathname === "/lp/ai-skill-academy-paid-school" ||
    pathname === "/lp/internet-academy-generative-ai"
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
