import assert from "node:assert/strict";
import test from "node:test";
import { splitArticleDisclosures } from "./article-disclosures";

const start = "<!-- article-disclosure:start -->";
const end = "<!-- article-disclosure:end -->";

test("unmarked articles keep their original content, including CRLF", () => {
  const content = "## Heading\r\n\r\nText\r\n";
  assert.deepEqual(splitArticleDisclosures(content), [{ kind: "markdown", body: content }]);
});

test("only the marked section collapses; the following pricing section remains outside", () => {
  const chunks = splitArticleDisclosures(`Intro\n${start}\n## How to use\n\n### Record\nSteps\n${end}\n## Prices\n100円`);
  assert.deepEqual(chunks.map(c => c.kind), ["markdown", "disclosure", "markdown"]);
  assert.equal(chunks[1].kind === "disclosure" && chunks[1].heading, "## How to use");
  assert.equal(chunks[2].body, "## Prices\n100円");
});

test("markers in fenced examples are ordinary content", () => {
  for (const fence of ["```md", "~~~md"]) {
    const content = `${fence}\n${start}\n## Example\nText\n${end}\n${fence.slice(0, 3)}`;
    assert.deepEqual(splitArticleDisclosures(content), [{ kind: "markdown", body: content }]);
  }
});

test("an unclosed, nested, empty or headingless block never hides text", () => {
  for (const content of [
    `${start}\n## Use\nText`,
    `${start}\n## Use\nText\n${start}\n## Nested\nText\n${end}\n${end}`,
    `${start}\n## Use\n\n${end}`,
    `${start}\nText\n${end}`,
  ]) assert.deepEqual(splitArticleDisclosures(content), [{ kind: "markdown", body: content }]);
});

test("a misplaced end marker cannot collapse another top-level section", () => {
  const content = `${start}\n## Use\nText\n## Prices\n100円\n${end}`;
  assert.deepEqual(splitArticleDisclosures(content), [{ kind: "markdown", body: content }]);
});

test("headings and marker examples inside a code block do not truncate a disclosure", () => {
  const content = `${start}\n## Use\n\n\`\`\`md\n## Sample\n${end}\n\`\`\`\nText\n${end}`;
  const chunks = splitArticleDisclosures(content);
  assert.equal(chunks.length, 1);
  assert.equal(chunks[0].kind, "disclosure");
  assert.ok(chunks[0].body.includes("## Sample"));
});
