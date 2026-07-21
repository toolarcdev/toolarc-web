import { stripWrappingQuotes } from "@/lib/blog/strip-wrapping-quotes";

type ArticleIntroProps = {
  description: string;
  tags?: string[];
};

const VISIBLE_TAG_LIMIT = 5;

/**
 * Article intro card: description + tags (site design option 1+10+18+21).
 * Full border + pale fill; tags below the lead text inside the same card.
 */
export function ArticleIntro({ description, tags = [] }: ArticleIntroProps) {
  const text = stripWrappingQuotes(description);
  const visibleTags = tags.slice(0, VISIBLE_TAG_LIMIT);
  const hiddenTagCount = Math.max(0, tags.length - VISIBLE_TAG_LIMIT);

  if (!text && tags.length === 0) return null;

  return (
    <div className="mx-3 mt-4 rounded-xl border-2 border-[#2563eb] bg-[#eff6ff] px-5 py-4 sm:mx-6 sm:px-6 sm:py-5">
      {text ? (
        <p className="text-sm font-medium leading-5 text-slate-700 sm:text-base sm:leading-6">
          {text}
        </p>
      ) : null}
      {tags.length > 0 ? (
        <ul
          className={`flex flex-wrap gap-2 ${text ? "mt-3" : ""}`}
          aria-label="記事タグ"
        >
          {visibleTags.map((tag) => (
            <li key={tag}>
              <span className="inline-block rounded-full border border-[#2563eb]/40 bg-white px-3 py-1 text-xs font-medium text-[#1d4ed8]">
                {tag}
              </span>
            </li>
          ))}
          {hiddenTagCount > 0 ? (
            <li>
              <span className="inline-block rounded-full border border-[#2563eb]/25 bg-white/80 px-3 py-1 text-xs font-medium text-[#2563eb]/80">
                他{hiddenTagCount}
              </span>
            </li>
          ) : null}
        </ul>
      ) : null}
    </div>
  );
}
