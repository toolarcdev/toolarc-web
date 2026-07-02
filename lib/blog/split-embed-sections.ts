export type EmbedBodySegment =
  | { type: "markdown"; content: string }
  | { type: "embed"; componentName: string };

const EMBED_START = /<!--\s*embed:([A-Za-z0-9]+)\s*-->/;

/** `<!-- embed:ComponentName -->` マーカーで Markdown を分割する */
export function splitEmbedSections(content: string): EmbedBodySegment[] {
  const segments: EmbedBodySegment[] = [];
  let remaining = content;

  while (remaining.length > 0) {
    const startMatch = remaining.match(EMBED_START);
    if (!startMatch || startMatch.index === undefined) {
      const tail = remaining.trim();
      if (tail) segments.push({ type: "markdown", content: tail });
      break;
    }

    const before = remaining.slice(0, startMatch.index).trim();
    if (before) segments.push({ type: "markdown", content: before });

    segments.push({ type: "embed", componentName: startMatch[1] });

    remaining = remaining.slice(startMatch.index + startMatch[0].length);
  }

  if (segments.length === 0 && content.trim()) {
    return [{ type: "markdown", content: content.trim() }];
  }

  return segments;
}
