"use client";

import { usePathname } from "next/navigation";

/**
 * ヘッダー直下のサイト説明＋PR開示帯（C11）。
 * 誇大表現なし。広告・アフィの有無は記事により異なる旨のみ。
 */
export function SiteDisclosureBand() {
  const pathname = usePathname();
  const isBlogArticle = /^\/blog\/[^/]+/.test(pathname);

  return (
    <div className="border-b border-[#1d4ed8] bg-[#2563eb]">
      <div className="mx-auto max-w-5xl px-4 py-2.5 sm:px-6 sm:py-3">
        <p className="text-xl font-semibold leading-7 text-white sm:text-2xl sm:leading-8">
          ToolArc — AIと開発のTips・比較
        </p>
        {(isBlogArticle || pathname.startsWith("/blog")) && (
          <p className="mt-1 text-[10px] font-normal leading-4 text-white/55">
            ※記事により広告・アフィリエイトリンクを含む場合があります。
          </p>
        )}
      </div>
    </div>
  );
}
