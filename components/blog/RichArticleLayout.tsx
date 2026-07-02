"use client";

import type { ReactNode } from "react";
import { StickyTOC, type TocItem } from "@/components/blog/ai-role-sharing/StickyTOC";

type RichArticleLayoutProps = {
  tocItems: TocItem[];
  children: ReactNode;
};

export function RichArticleLayout({ tocItems, children }: RichArticleLayoutProps) {
  return (
    <div className="lg:grid lg:grid-cols-[1fr_220px] lg:items-start lg:gap-12">
      <div>{children}</div>
      <aside className="hidden lg:block" aria-label="目次サイドバー">
        <div className="sticky top-8">
          <StickyTOC items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
