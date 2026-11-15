export type ArticleNotesChunk = { kind: "markdown" | "notes"; body: string };

const START = "<!-- article-notes:start -->";
const END = "<!-- article-notes:end -->";

/** Explicit supplementary ranges only. Malformed markers leave all text unchanged. */
export function splitArticleNotes(content: string): ArticleNotesChunk[] {
  const fallback: ArticleNotesChunk[] = [{ kind: "markdown", body: content }];
  if (!content.includes(START)) return fallback;
  const lines = content.split(/\r?\n/);
  const markers: { index: number; kind: "start" | "end" }[] = [];
  let fence: { char: string; length: number } | undefined;
  for (const [index, line] of lines.entries()) {
    const match = /^ {0,3}(`{3,}|~{3,})(.*)$/.exec(line);
    if (fence) {
      if (match && match[1][0] === fence.char && match[1].length >= fence.length && !match[2].trim()) fence = undefined;
      continue;
    }
    if (match) {
      fence = { char: match[1][0], length: match[1].length };
      continue;
    }
    if (line.trim() === START) markers.push({ index, kind: "start" });
    if (line.trim() === END) markers.push({ index, kind: "end" });
  }
  if (!markers.length || markers.length % 2) return fallback;
  const chunks: ArticleNotesChunk[] = [];
  let cursor = 0;
  for (let i = 0; i < markers.length; i += 2) {
    const start = markers[i], end = markers[i + 1];
    if (start.kind !== "start" || end.kind !== "end") return fallback;
    const body = lines.slice(start.index + 1, end.index).join("\n");
    if (!body.trim()) return fallback;
    if (start.index > cursor) chunks.push({ kind: "markdown", body: lines.slice(cursor, start.index).join("\n") });
    chunks.push({ kind: "notes", body });
    cursor = end.index + 1;
  }
  if (cursor < lines.length) chunks.push({ kind: "markdown", body: lines.slice(cursor).join("\n") });
  return chunks;
}
