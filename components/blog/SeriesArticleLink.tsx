"use client";

import Link from "next/link";
import { pushEvent } from "@/lib/analytics/gtm";

type LinkType = "hub" | "spoke" | "badge" | "related";

type Props = {
  href: string;
  seriesSlug: string;
  targetSlug: string;
  linkType: LinkType;
  className?: string;
  children: React.ReactNode;
};

export function SeriesArticleLink({
  href,
  seriesSlug,
  targetSlug,
  linkType,
  className,
  children,
}: Props) {
  const handleClick = () => {
    pushEvent("series_click", {
      series_slug: seriesSlug,
      target_slug: targetSlug,
      link_type: linkType,
    });
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
