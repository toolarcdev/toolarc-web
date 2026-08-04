---
name: revenue-article-template
description: Creates and rewrites ToolArc layer 2–3 revenue articles with the nine-part template, QUEST flow, three-point CTA design, and affiliate policy checks. Use for 本命CVリライト, 第2〜3層収益記事, 体験談・比較・疑念系記事, or requests to improve revenue conversion paths.
---

# revenue-article-template（第2〜3層・本命CV）

収益記事の初稿・リライト **手順**。判定基準は再定義しない。

| 領域 | 正本 |
|------|------|
| 文体・SEO・CTA一般・禁止・免責 | `docs/ai-context/writing-rules.md` |
| 空句 | `docs/ai-context/llm-forbidden-phrases.md` |
| 直アフィ可否 | `lib/affiliate/policy.ts` |
| 案件MD記法 | `docs/ai-context/affiliate-registry.md` |

推奨構成（Tips向け）と本Skillの9段は併用可。収益記事は9段＋QUESTを手順として使う。

## 対象 / 対象外

**使う**: 第2層（体験談／比較／疑念系）・第3層（周辺収益／本命CV）・既存収益記事の9段改修  
**使わない**: 非収益Tipsの軽微修正、`publish-article`、`l1-review-article`、ASP条件の転載

## 開始前

1. slug・記事層・検索意図・主オファーを特定する
2. 上表の正本を読む（基準をここにコピーしない）
3. アフィを置く場合 `isDirectAffiliateAllowed(slug, programId)` を確認する
4. 一次情報は writing-rules の根拠要件に従う（捏造禁止）

## 9段テンプレ

既存記事は検索意図を壊さない最小差分で不足を補う。

1. **リード** — 共感 → 問題提起 → 解決の約束
2. **この記事でわかること** — 3〜5点
3. **今日の結論＋CTA①** — 結論先出し。主オファーを早期提示
4. **判断基準** — 読者が選ぶ軸・前提条件
5. **比較／手順＋デメリット＋CTA②** — 判断材料のあと
6. **根拠・体験** — 本文へ自然に埋める。必要なら免責直前に読者向け見出し
7. **FAQ** — 原則4〜6問
8. **まとめ＋次の一歩＋CTA③**
9. **免責** — writing-rules「仕様・免責」形式

## QUESTの流れ

LPの煽りは借りず構造だけ使う: Qualify → Understand → Educate → Stimulate → Transition

## CTA・アフィリエイトの確認チェック

基準の文言は writing-rules / policy。ここは手順チェックのみ。

- [ ] CTA①②③が同一主目的・遷移先か
- [ ] 無料オファー型か／判断材料が前後にあるか
- [ ] バナー位置が writing-rules 準拠か
- [ ] `isDirectAffiliateAllowed` が false なら弱リンクのみか
- [ ] `peripheral-only` を直リンクしていないか

## 第2層の追加手順

- **体験談型**: 環境・時系列・失敗と修正 → 本命CVへ接続
- **比較型**: 向く人／向かない人。直アフィ禁止なら弱リンクのみ
- **疑念系**: 不安を事実で解消してから無料オファー（誇大禁止）

## 完了条件

- 9段・QUESTを満たす（不要節は理由付き）
- 上記CTAチェック済み
- writing-rules / llm-forbidden-phrases 準拠（詳細は正本）
- 次工程: `l1-review-article` → `publish-article`
