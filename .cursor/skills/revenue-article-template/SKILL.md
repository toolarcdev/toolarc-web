---
name: revenue-article-template
description: Creates and rewrites ToolArc layer 2–3 revenue articles with the nine-part template, QUEST flow, three-point CTA design, and affiliate policy checks. Use for 本命CVリライト, 第2〜3層収益記事, 体験談・比較・疑念系記事, or requests to improve revenue conversion paths.
---

# revenue-article-template（第2〜3層・本命CV）

収益記事の初稿・リライト手順を供給する Skill。文体・SEOの正本は `docs/ai-context/writing-rules.md`、直アフィ可否の正本は `lib/affiliate/policy.ts`。

## 対象 / 対象外

**使う**:

- 第2層: 体験談型／比較型／疑念系（怪しい・やめとけ・無料制限）
- 第3層: 周辺収益記事／本命CV
- 既存収益記事の9段テンプレ改修

**使わない**:

- 非収益Tipsの軽微な修正
- `posts.ts` 登録・公開日確定・build（① `publish-article`）
- 公開前L1判定（④ `l1-review-article`）
- ASP成果条件・単価・否認条件の転載

## 開始前

1. 対象slug、記事層（第2／第3）、検索意図、主オファーを特定する。
2. `docs/ai-context/writing-rules.md` の文体・収益導線と `docs/ai-context/llm-forbidden-phrases.md` を読む。
3. アフィリエイトを置く場合、`lib/affiliate/policy.ts` と `lib/affiliate/registry.ts` で program id・直リンク可否を確認する。
4. 一次情報（実測値＋取得日／使用環境／失敗談）を確認する。無ければ捏造せず「筆者が確認した範囲」を明示する。

## 9段テンプレ

順序を基本形とし、既存記事では検索意図を壊さない最小差分で不足を補う。

1. **リード** — 共感 → 問題提起 → 解決の約束
2. **この記事でわかること** — 3〜5点
3. **今日の結論＋CTA①** — 結論先出し。主オファーを早期提示
4. **判断基準** — 読者が選ぶ軸・前提条件
5. **比較／手順＋デメリット＋CTA②** — 判断材料を出した後に提示
6. **一次情報** — 実測、環境、失敗談、確認範囲
7. **FAQ** — 原則4〜6問。料金・制限・向き不向きなど残る不安を解消
8. **まとめ＋次の一歩＋CTA③** — 読者が今できる一歩
9. **免責** — 執筆／更新時点、仕様変更、公式確認

## QUESTの流れ

9段テンプレ内で次の順を保つ。LPの煽り文句は借りず、構造だけ使う。

1. **Qualify（絞込）** — 誰向け／誰向けでないか
2. **Understand（共感）** — 困りごとと失敗しやすい状況
3. **Educate（教育）** — 判断基準、比較、手順、デメリット
4. **Stimulate（刺激）** — 解決後の具体的な変化を条件付きで示す
5. **Transition（行動）** — 無料オファーまたは次の記事へつなぐ

## CTA・アフィリエイトの必須確認

- CTA①／②／③は**同一の主目的・遷移先**。別商品を3つ並べない
- CTA文言は無料オファー型を優先し、「詳細はこちら」だけにしない
- CTA前後に「向く人／向かない人」、注意点、代替案、費用感などの判断材料を置く
- 本文主力はボタン型テキストリンク
- バナーは記事末（免責後など）またはサイド等の面に1枠。本文中盤へ置かない
- 比較記事本文へのバナー直貼り禁止
- `isDirectAffiliateAllowed(slug, programId)` が false の場合、直アフィを置かず周辺収益記事への `/blog/slug` 弱リンクにする
- `placement: peripheral-only` の案件は本命CV記事を含め直リンク不可。policyを優先する

## 第2層の追加ルール

- **体験談型**: 環境・時系列・失敗と修正を具体化し、本命CVへ接続
- **比較型**: 向く人／向かない人を明記。直アフィ禁止なら周辺収益への弱リンクのみ
- **疑念系**: 不安を事実で解消してから無料オファーへ。煽り・断定誇大は禁止

## 完了条件

- 9段テンプレの各要素がある（不要な節は理由を示す）
- QUESTの順が破綻していない
- CTA3点、無料オファー、向く／向かない、バナー位置、直アフィ可否を確認済み
- `writing-rules.md` の文末多様化・空句・一次情報要件を満たす
- 内部リンクは `/blog/slug`、未公開slugは「準備中」
- 次工程を「④ L1レビュー → ① 公開反映」として引き継ぐ
