"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { BLOG_ALL_ARTICLES_ID } from "@/lib/blog/pagination";

export function BlogScrollToAllArticles() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash !== `#${BLOG_ALL_ARTICLES_ID}`) {
      return;
    }

    const target = document.getElementById(BLOG_ALL_ARTICLES_ID);
    if (!target) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    target.scrollIntoView({
      block: "start",
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [pathname]);

  return null;
}
