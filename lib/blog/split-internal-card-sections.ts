export type InternalCardSegment =
  | { type: "markdown"; content: string }
  | { type: "internal-card"; href: string; title: string };

/** `<!-- internal-card:/blog/slug|表示タイトル -->`（途中リンクは任意・必須ではない） */
const INTERNAL_CARD_START =
  /<!--\s*internal-card:([^|>\s]+)(?:\|([^>]*))?\s*-->/;

export function splitInternalCardSections(
  content: string,
): InternalCardSegment[] {
  const segments: InternalCardSegment[] = [];
  let remaining = content;

  while (remaining.length > 0) {
    const startMatch = remaining.match(INTERNAL_CARD_START);
    if (!startMatch || startMatch.index === undefined) {
      const tail = remaining.trim();
      if (tail) segments.push({ type: "markdown", content: tail });
      break;
    }

    const before = remaining.slice(0, startMatch.index).trim();
    if (before) segments.push({ type: "markdown", content: before });

    const href = startMatch[1].trim();
    const title =
      startMatch[2]?.trim() ||
      href.replace(/^\/blog\//, "").replace(/-/g, " ");

    segments.push({ type: "internal-card", href, title });

    remaining = remaining.slice(startMatch.index + startMatch[0].length);
  }

  if (segments.length === 0 && content.trim()) {
    return [{ type: "markdown", content: content.trim() }];
  }

  return segments;
}
