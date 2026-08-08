/**
 * CommonMark の強調 flanking 規則により、閉じ `**` 直前が句読点だと
 * 直後が日本語など非句読点のときに太字が成立しない（例: `**C#**は`）。
 * 閉じ直前へ ZWSP を挟み、表示は変えずにパースだけ通す。
 *
 * 適用: 記事 Markdown を ReactMarkdown に渡す直前（コードフェンス／インラインコードは除外）
 */

const ZWSP = "\u200B";

function isPunctuation(ch: string): boolean {
  return /\p{P}/u.test(ch);
}

function isWhitespace(ch: string): boolean {
  return /\s/u.test(ch);
}

function lastCodePoint(text: string): string | undefined {
  const chars = Array.from(text);
  return chars.length > 0 ? chars[chars.length - 1] : undefined;
}

function firstCodePoint(text: string): string | undefined {
  const chars = Array.from(text);
  return chars.length > 0 ? chars[0] : undefined;
}

/** プレーンテキスト区間だけを直し、`**…**` の閉じ直前に必要なら ZWSP を入れる */
export function fixEmphasisFlankingInPlainText(segment: string): string {
  let result = "";
  let i = 0;

  while (i < segment.length) {
    if (segment.startsWith("**", i)) {
      const close = segment.indexOf("**", i + 2);
      if (close === -1) {
        result += segment.slice(i);
        break;
      }

      const inner = segment.slice(i + 2, close);
      const after = segment.slice(close + 2);
      const last = lastCodePoint(inner);
      const next = firstCodePoint(after);

      const needsZwsp =
        Boolean(last) &&
        Boolean(next) &&
        isPunctuation(last!) &&
        !isWhitespace(next!) &&
        !isPunctuation(next!) &&
        !inner.endsWith(ZWSP);

      result += needsZwsp ? `**${inner}${ZWSP}**` : `**${inner}**`;
      i = close + 2;
      continue;
    }

    result += segment[i];
    i += 1;
  }

  return result;
}

function fixInlineCodeSafe(segment: string): string {
  // インラインコード `...` を保護（単純な非ネスト想定）
  return segment
    .split(/(`[^`\n]+`)/)
    .map((part) =>
      part.startsWith("`") && part.endsWith("`")
        ? part
        : fixEmphasisFlankingInPlainText(part),
    )
    .join("");
}

/**
 * Markdown 全文向け。フェンスコードブロックとインラインコードは変更しない。
 */
export function fixEmphasisFlanking(markdown: string): string {
  // ``` ... ```（言語タグ付き含む）。非貪欲で複数ブロック対応
  return markdown
    .split(/(```[\s\S]*?```)/)
    .map((part) =>
      part.startsWith("```") ? part : fixInlineCodeSafe(part),
    )
    .join("");
}
