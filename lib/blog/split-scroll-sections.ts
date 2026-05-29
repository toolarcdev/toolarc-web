export type ArticleSegment =
  | { type: "markdown"; content: string }
  | { type: "scroll"; label: string; content: string };

const SCROLL_START =
  /<!--\s*CURSOR実装メモ:\s*ここにスクロールコンテナ開始[\s\S]*?-->/;
const SCROLL_END =
  /<!--\s*CURSOR実装メモ:\s*スクロールコンテナ終了[\s\S]*?-->/;
const LABEL_RE = /ラベル:\s*「([^」]+)」/;
const OUTPUT_HEADING_RE = /^\*\*出力全文（スクロールして読む）\*\*\s*\n+/;

/** CURSOR実装メモのスクロールマーカーで Markdown を分割する */
export function splitScrollSections(content: string): ArticleSegment[] {
  const segments: ArticleSegment[] = [];
  let remaining = content;

  while (remaining.length > 0) {
    const startMatch = remaining.match(SCROLL_START);
    if (!startMatch || startMatch.index === undefined) {
      const tail = remaining.trim();
      if (tail) segments.push({ type: "markdown", content: tail });
      break;
    }

    const before = remaining.slice(0, startMatch.index).trim();
    if (before) segments.push({ type: "markdown", content: before });

    const label = startMatch[0].match(LABEL_RE)?.[1] ?? "AI出力全文";
    remaining = remaining.slice(startMatch.index + startMatch[0].length);

    const endMatch = remaining.match(SCROLL_END);
    if (!endMatch || endMatch.index === undefined) {
      const orphan = remaining.trim();
      if (orphan) segments.push({ type: "markdown", content: orphan });
      break;
    }

    let scrollContent = remaining.slice(0, endMatch.index).trim();
    scrollContent = scrollContent.replace(OUTPUT_HEADING_RE, "");
    segments.push({ type: "scroll", label, content: scrollContent });

    remaining = remaining.slice(endMatch.index + endMatch[0].length);
  }

  if (segments.length === 0 && content.trim()) {
    return [{ type: "markdown", content: content.trim() }];
  }

  return segments;
}
