"use client";

import type { ReactNode } from "react";
import {
  StickyTOC,
  type TocItem,
} from "@/components/blog/ai-role-sharing/StickyTOC";

type RichArticleLayoutProps = {
  tocItems: TocItem[];
  children: ReactNode;
};

export function RichArticleLayout({
  tocItems,
  children,
}: RichArticleLayoutProps) {
  return (
    // items-start だと aside が TOC 高さに縮み sticky が効かない → 既定の stretch を使う
    <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
      <div>{children}</div>
      <aside className="relative hidden lg:block" aria-label="目次サイドバー">
        {/* top-16 ≈ sticky header h-14 + gap; right rail only (no left TOC) */}
        <div className="sticky top-16">
          <StickyTOC items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
