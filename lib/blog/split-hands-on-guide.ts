export type HandsOnGuidePart =
  | { kind: "heading"; body: string }
  | { kind: "row"; images: string; text: string }
  | { kind: "code"; body: string; filename?: string }
  | { kind: "prose"; body: string };

const FILE_LINE = /^ファイル[：:]\s*(.+?)\s*$/;

function peelFilename(text: string): { text: string; filename?: string } {
  const lines = text.split(/\r?\n/);
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    const trimmed = lines[i].trim();
    if (!trimmed) continue;
    const match = trimmed.match(FILE_LINE);
    if (!match) break;
    const filename = match[1].replace(/^`+|`+$/g, "");
    const rest = [...lines.slice(0, i), ...lines.slice(i + 1)]
      .join("\n")
      .trim();
    return { text: rest, filename };
  }
  return { text };
}

function takeFilenameFromPrevious(parts: HandsOnGuidePart[]): string | undefined {
  const last = parts[parts.length - 1];
  if (last?.kind === "row") {
    const peeled = peelFilename(last.text);
    last.text = peeled.text;
    return peeled.filename;
  }
  if (last?.kind === "prose") {
    const peeled = peelFilename(last.body);
    last.body = peeled.text;
    return peeled.filename;
  }
  return undefined;
}

const IMAGE_LINE = /^!\[[^\]]*\]\([^)]+\)\s*$/;

function isFence(line: string): boolean {
  return line.trimStart().startsWith("```");
}

function flushRow(
  parts: HandsOnGuidePart[],
  images: string[],
  text: string[],
): void {
  if (!images.length && !text.length) return;
  if (images.length) {
    parts.push({
      kind: "row",
      images: images.join("\n\n"),
      text: text.join("\n\n").trim(),
    });
  } else {
    parts.push({ kind: "prose", body: text.join("\n\n").trim() });
  }
  images.length = 0;
  text.length = 0;
}

/**
 * 1ステップ内を「見出し / 画像+説明 / コード」に分ける。
 * 画像が連続したあとに説明が来る場合は、左に画像・右に説明へまとめる。
 */
export function splitHandsOnGuide(body: string): HandsOnGuidePart[] {
  const lines = body.split(/\r?\n/);
  const parts: HandsOnGuidePart[] = [];
  let i = 0;

  if (lines[0] && /^#{3,4}\s+/.test(lines[0])) {
    parts.push({ kind: "heading", body: lines[0] });
    i = 1;
  }

  const images: string[] = [];
  const text: string[] = [];

  while (i < lines.length) {
    const line = lines[i];

    if (isFence(line)) {
      flushRow(parts, images, text);
      const filename = takeFilenameFromPrevious(parts);
      const fence = [line];
      i += 1;
      while (i < lines.length && !isFence(lines[i])) {
        fence.push(lines[i]);
        i += 1;
      }
      if (i < lines.length) {
        fence.push(lines[i]);
        i += 1;
      }
      parts.push({ kind: "code", body: fence.join("\n"), filename });
      continue;
    }

    if (IMAGE_LINE.test(line.trim())) {
      if (text.length) flushRow(parts, images, text);
      images.push(line.trim());
      i += 1;
      continue;
    }

    if (line.trim() === "") {
      i += 1;
      continue;
    }

    const para: string[] = [line];
    i += 1;
    while (
      i < lines.length &&
      !isFence(lines[i]) &&
      !IMAGE_LINE.test(lines[i].trim()) &&
      !/^#{1,4}\s+/.test(lines[i])
    ) {
      para.push(lines[i]);
      i += 1;
    }
    text.push(para.join("\n").trim());
    if (images.length) flushRow(parts, images, text);
  }

  flushRow(parts, images, text);
  return parts;
}
