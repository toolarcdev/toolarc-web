export type HandsOnChunk =
  | { kind: "prose"; body: string }
  | { kind: "step"; body: string }
  | { kind: "trouble"; body: string };

/**
 * 番号付き手順（`### ① …` / `#### 1. …`）から次の H1〜H3 直前までを
 * 1ステップの作業単位として切り出す。ハンズオン確認用。
 */
const STEP_HEADING = /^#{3,4}\s+(?:[①-⑳]|\d+\.)\s+/;
const EXTRA_STEP_HEADING = /^#{3,4}\s+(?:[①-⑳]|\d+\.)\s+さらにもう一歩/;
const TROUBLE_HEADING = /^#{2,3}\s+うまくいかないとき/;

export function isHandsOnExtraStep(body: string): boolean {
  const first = body.split(/\r?\n/).find((line) => line.trim());
  return Boolean(first && EXTRA_STEP_HEADING.test(first));
}

export function splitHandsOnChunks(content: string): HandsOnChunk[] {
  const lines = content.split(/\r?\n/);
  const chunks: HandsOnChunk[] = [];
  let buf: string[] = [];
  let kind: HandsOnChunk["kind"] = "prose";

  const flush = () => {
    const body = buf.join("\n").trim();
    if (body) chunks.push({ kind, body });
    buf = [];
  };

  for (const line of lines) {
    const isStep = STEP_HEADING.test(line);
    const isTrouble = TROUBLE_HEADING.test(line);
    const isBoundary = /^#{1,3}\s+/.test(line);
    if (isStep) {
      flush();
      kind = "step";
      buf.push(line);
    } else if (isTrouble) {
      flush();
      kind = "trouble";
      buf.push(line);
    } else if (kind === "step" && isBoundary) {
      flush();
      kind = "prose";
      buf.push(line);
    } else if (kind === "trouble" && /^#{1,2}\s+/.test(line)) {
      flush();
      kind = "prose";
      buf.push(line);
    } else {
      buf.push(line);
    }
  }
  flush();
  return chunks;
}
