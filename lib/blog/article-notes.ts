import { splitMarkedMarkdown } from "./split-marked-markdown";

export type ArticleNotesChunk = { kind: "markdown" | "notes"; body: string };

/** Explicit supplementary ranges only; ordinary article content stays unchanged. */
export function splitArticleNotes(content: string): ArticleNotesChunk[] {
  return splitMarkedMarkdown(content, "article-notes").map(chunk => ({
    kind: chunk.kind === "marked" ? "notes" : "markdown",
    body: chunk.body,
  }));
}
