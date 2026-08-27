/**
 * first-h2-section-image の単体テスト
 *
 * ## テスト対象
 *
 * - `getFirstH2SectionImageSrc(markdown)`
 *   記事本文から「最初の ##（H2）の直後 〜 次の ## の手前」に出てくる
 *   **最初の1枚の画像の src** を返す。LCP 向け priority 付与の判定に使う。
 * - `stripFencedCodeForScan(markdown)`
 *   コードフェンス内をスキャン対象から外す前処理（誤検出防止）。
 *
 * ## 判定ルール（実装の前提）
 *
 * | 項目 | 内容 |
 * |------|------|
 * | H2 の定義 | 行頭が `## ` で始まる見出し（`###` 以降は H2 境界にしない） |
 * | 対象区間 | 1つ目の H2 の直後 〜 2つ目の H2 の手前（2つ目が無ければ文末まで） |
 * | 画像の定義 | `![alt](src)` 形式。src は絶対パス `/images/...` でも相対 `h2-1.png` でも可 |
 * | 除外 | H2 より前の画像、2つ目以降の H2 内の画像、コードフェンス内の疑似画像 |
 * | 戻り値 | 該当 src 文字列。該当なしは `null` |
 *
 * ## 実行方法と想定結果
 *
 * ```bash
 * npm run test:unit
 * ```
 *
 * 全テスト成功時: **11 passed, 0 failed**（2 suite / 11 tests）
 *
 * ---
 *
 * ### getFirstH2SectionImageSrc（10件）
 *
 * 1. **最初の H2 区間の1枚目を返す**
 *    - 入力: H2「First section」直後に h2-1.png、次の H2 直後に h2-2.png
 *    - 期待: `/images/blog/foo/h2-1.png`（2枚目は対象外）
 *
 * 2. **H2 より前の画像は無視**
 *    - 入力: 導入に intro.png、最初の H2 下に section.png
 *    - 期待: `/images/blog/foo/section.png`（intro は選ばれない）
 *
 * 3. **最初の H2 区間に画像が無い**
 *    - 入力: 1つ目の H2 はテキストのみ、2つ目の H2 下に画像
 *    - 期待: `null`
 *
 * 4. **H2 が1つも無い**
 *    - 入力: H1 と画像のみ
 *    - 期待: `null`
 *
 * 5. **### は H2 境界にしない**
 *    - 入力: H2 下に ### があり、その下に keep.png、次の H2 下に skip.png
 *    - 期待: `/images/blog/foo/keep.png`（### 区間も「最初の H2 区間」に含む）
 *
 * 6. **コードフェンス内の ![...](...) は無視**
 *    - 入力: フェンス内に fake.png、フェンス外に real.png
 *    - 期待: `/images/blog/foo/real.png`
 *
 * 7. **相対パス・title 付き alt も解析**
 *    - 入力: `![alt](h2-1.png "caption")`
 *    - 期待: `h2-1.png`
 *
 * 8. **同一 H2 区間内は最初の1枚だけ**
 *    - 入力: 同じ H2 下に /a.png と /b.png
 *    - 期待: `/a.png`
 *
 * 9. **ToolArc 記事型（導入・今日の結論・複数 H2）**
 *    - 入力: git-workflow 記事と同型（結論ブロックのあと、1つ目の H2 下に h2-1.png）
 *    - 期待: `/images/blog/claude-code-git-workflow/h2-1.png`
 *
 * 10. **空入力**
 *     - 入力: `""` および空白のみ
 *     - 期待: いずれも `null`
 *
 * ### stripFencedCodeForScan（1件）
 *
 * 11. **フェンス内テキストを除去し行数は維持**
 *     - 入力: コードブロック内に `line` を含む markdown
 *     - 期待: 出力に `line` が含まれない／改行数は入力と同じ
 *
 * ## MarkdownArticle との連携
 *
 * `MarkdownArticle` は本文 `content` に対して本関数を1回実行し、
 * 各 `<Image>` の `src`（markdown 上のパス）が返値と一致したときだけ `priority` を付与する。
 * ファイル名（h2-1.png 等）ではなく **配置位置** で決まる。
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getFirstH2SectionImageSrc,
  stripFencedCodeForScan,
} from "./first-h2-section-image";

describe("getFirstH2SectionImageSrc", () => {
  it("returns the first image after the first H2 and before the next H2", () => {
    const md = `# Title

Intro paragraph.

## First section

![alt](/images/blog/foo/h2-1.png)

Body text.

## Second section

![other](/images/blog/foo/h2-2.png)
`;
    assert.equal(
      getFirstH2SectionImageSrc(md),
      "/images/blog/foo/h2-1.png",
    );
  });

  it("ignores images before the first H2", () => {
    const md = `# Title

![intro](/images/blog/foo/intro.png)

## First section

![section](/images/blog/foo/section.png)
`;
    assert.equal(
      getFirstH2SectionImageSrc(md),
      "/images/blog/foo/section.png",
    );
  });

  it("returns null when the first H2 section has no image", () => {
    const md = `## First

Only text.

## Second

![later](/images/blog/foo/later.png)
`;
    assert.equal(getFirstH2SectionImageSrc(md), null);
  });

  it("returns null when there is no H2", () => {
    const md = `# Only H1

![x](/images/blog/foo/x.png)
`;
    assert.equal(getFirstH2SectionImageSrc(md), null);
  });

  it("ignores ### and deeper headings as H2 boundaries", () => {
    const md = `## First

### Sub

![keep](/images/blog/foo/keep.png)

## Second

![skip](/images/blog/foo/skip.png)
`;
    assert.equal(getFirstH2SectionImageSrc(md), "/images/blog/foo/keep.png");
  });

  it("ignores images inside fenced code blocks", () => {
    const md = `## First

\`\`\`md
![fake](/images/blog/foo/fake.png)
\`\`\`

![real](/images/blog/foo/real.png)
`;
    assert.equal(getFirstH2SectionImageSrc(md), "/images/blog/foo/real.png");
  });

  it("supports relative image paths and optional title", () => {
    const md = `## First

![alt](h2-1.png "caption")
`;
    assert.equal(getFirstH2SectionImageSrc(md), "h2-1.png");
  });

  it("uses only the first image in the first H2 section", () => {
    const md = `## First

![one](/a.png)

![two](/b.png)
`;
    assert.equal(getFirstH2SectionImageSrc(md), "/a.png");
  });

  it("matches ToolArc-style absolute blog image under first H2", () => {
    const md = `# Claude CodeでGit操作｜branch作成からcommit・PR作成までの流れ

導入文。

> **今日の結論**
> - 要点

## 対話でbranch作成からcommitまで進める（依頼例つき）

![説明](/images/blog/claude-code-git-workflow/h2-1.png)

本文。

## PR作成までの流れ（GitHub連携の前提つき）

![別](/images/blog/claude-code-git-workflow/h2-2.png)
`;
    assert.equal(
      getFirstH2SectionImageSrc(md),
      "/images/blog/claude-code-git-workflow/h2-1.png",
    );
  });

  it("returns null for empty input", () => {
    assert.equal(getFirstH2SectionImageSrc(""), null);
    assert.equal(getFirstH2SectionImageSrc("   \n"), null);
  });
});

describe("stripFencedCodeForScan", () => {
  it("removes fenced content while preserving line count shape", () => {
    const input = "a\n```\nline\n```\nb";
    const out = stripFencedCodeForScan(input);
    assert.equal(out.includes("line"), false);
    assert.equal(out.split("\n").length, input.split("\n").length);
  });
});
