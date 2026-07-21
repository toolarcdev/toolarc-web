/**
 * Strip wrapping ASCII/Japanese quotation marks from a description string.
 * Frontmatter often stores SEO descriptions quoted; those marks are not UI chrome.
 */
export function stripWrappingQuotes(text: string): string {
  let value = text.trim();
  const pairs: Array<[string, string]> = [
    ['"', '"'],
    ["'", "'"],
    ["“", "”"],
    ["„", "“"],
    ["「", "」"],
    ["『", "』"],
    ["＂", "＂"],
  ];

  let changed = true;
  while (changed && value.length >= 2) {
    changed = false;
    for (const [open, close] of pairs) {
      if (
        value.startsWith(open) &&
        value.endsWith(close) &&
        value.length > open.length + close.length
      ) {
        value = value.slice(open.length, -close.length).trim();
        changed = true;
        break;
      }
    }
  }

  return value;
}
