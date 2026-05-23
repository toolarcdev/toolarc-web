"use client";

import { useEffect, useRef } from "react";
import { pushEvent } from "@/lib/analytics/gtm";

type Props = {
  slug: string;
  seriesSlug: string | null;
  readingTime: number;
  category: string;
};

export function ScrollDepthTracker({
  slug,
  seriesSlug,
  readingTime,
  category,
}: Props) {
  const firedRef = useRef(false);

  useEffect(() => {
    firedRef.current = false;
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      if (firedRef.current) return;

      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const pct = scrollTop / docHeight;
      if (pct >= 0.75) {
        firedRef.current = true;
        pushEvent("scroll_75", {
          slug,
          series_slug: seriesSlug,
          reading_time: readingTime,
          category,
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug, seriesSlug, readingTime, category]);

  return null;
}
