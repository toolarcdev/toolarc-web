"use client";

import type { ReactNode } from "react";
import { RailAffiliateSlot } from "@/components/affiliate/RailAffiliateSlot";
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
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-12">
      <div className="min-w-0">{children}</div>
      <aside className="relative hidden lg:block" aria-label="目次サイドバー">
        {/* TOC を優先（flex-1）。レールは shrink-0 で TOC を潰さない */}
        <div className="sticky top-16 flex max-h-[calc(100vh-5.5rem)] flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            <StickyTOC items={tocItems} />
          </div>
          <RailAffiliateSlot />
        </div>
      </aside>
    </div>
  );
}
