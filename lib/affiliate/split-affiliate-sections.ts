export type AffiliateBodySegment =
  | { type: "markdown"; content: string }
  | { type: "banner"; programId: string; creativeId: string };

const BANNER_START =
  /<!--\s*affiliate:banner:([a-z0-9-]+):([a-z0-9-]+)\s*-->/;

/** バナーマーカーで Markdown を分割する */
export function splitAffiliateSections(content: string): AffiliateBodySegment[] {
  const segments: AffiliateBodySegment[] = [];
  let remaining = content;

  while (remaining.length > 0) {
    const startMatch = remaining.match(BANNER_START);
    if (!startMatch || startMatch.index === undefined) {
      const tail = remaining.trim();
      if (tail) segments.push({ type: "markdown", content: tail });
      break;
    }

    const before = remaining.slice(0, startMatch.index).trim();
    if (before) segments.push({ type: "markdown", content: before });

    segments.push({
      type: "banner",
      programId: startMatch[1],
      creativeId: startMatch[2],
    });

    remaining = remaining.slice(startMatch.index + startMatch[0].length);
  }

  if (segments.length === 0 && content.trim()) {
    return [{ type: "markdown", content: content.trim() }];
  }

  return segments;
}
