import assert from "node:assert/strict";
import { test } from "node:test";
import { extractTocHeadings } from "./heading-id";

test("excludes example headings from backtick and tilde fences", () => {
  const markdown = [
    "## 導入",
    "```markdown",
    "## サンプル",
    "```",
    "  ~~~markdown",
    "## Examples",
    "~~~",
    "## 本文 2",
  ].join("\r\n");

  assert.deepEqual(extractTocHeadings(markdown), [
    { id: "導入", label: "導入" },
    { id: "本文-2", label: "本文 2" },
  ]);
});

test("requires a matching closing fence at least as long as the opener", () => {
  const markdown = [
    "````md",
    "```",
    "## Still code",
    "~~~~",
    "## Also code",
    "````text",
    "## Still inside",
    "  `````  ",
    "## Real section",
    "~~~",
    "## Unclosed example",
  ].join("\n");

  assert.deepEqual(extractTocHeadings(markdown), [
    { id: "real-section", label: "Real section" },
  ]);
});

test("keeps the heading after an invalid backtick fence opener", () => {
  assert.deepEqual(extractTocHeadings("```bad`info\n## Kept"), [
    { id: "kept", label: "Kept" },
  ]);
});
