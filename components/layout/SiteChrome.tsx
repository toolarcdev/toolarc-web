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
  if (pathname === "/lp/ai-skill-academy-free-seminar") return children;
  return <>{header}<div className="flex flex-1 flex-col">{children}</div>{footer}</>;
}
