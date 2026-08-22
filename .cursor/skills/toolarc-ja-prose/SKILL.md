---
name: toolarc-ja-prose
description: Rewrites and polishes ToolArc Japanese article prose by checking rhythm, paragraph density, empty LLM phrases, evidence boundaries, topic progression, and causal explanations. Use for 日本語文章の推敲, AI臭の軽減, 文体調整, 読み味改善, or article prose rewrites. Not for L1 approval, publishing, or changing revenue strategy.
---

# toolarc-ja-prose（ToolArc日本語推敲）

意味・検索意図・導線を維持したまま、日本語の均質さを減らす **手順**。  
判定基準は複製しない。正本: `docs/ai-context/writing-rules.md`（文体6ルール）／`docs/ai-context/llm-forbidden-phrases.md`（空句）。矛盾時は正本優先。

## 対象 / 対象外

**使う**: 初稿推敲、AI臭・リズム改善、文末／段落／見出し／根拠の局所修正  
**使わない**: L1合否（`l1-review-article`）、CTA設計（`revenue-article-template`）、公開（`publish-article`）、事実・料金・実測の創作

## 手順

### 1. 守る内容を固定する

検索意図・結論・事実・内部リンク・CTA・免責を確認。文体依頼なら構成・情報追加へ広げない。

### 2. writing-rules の6ルールで推敲する

各項の詳細は正本を開く。ここでは観点名のみ:

1. 敬体ベース＋文末多様化（3連続禁止・**免責は対象外**／体言止めは段落途中の山場／ゼロ回避・**段落末は敬体**。詳細は writing-rules）
2. 一人称は必要時だけ＋実在感（「筆者」の濫用禁止）
3. 断定と逡巡の使い分け（結論先延ばし禁止）
4. 空句削除（リストは `llm-forbidden-phrases.md`）
5. 段落設計（1トピック・密度波形・テンプレ連打回避）
6. 因果に機構を一文

### 3. 話題テスト

状況更新がない実況文・言い換えだけの文を削る／統合する。

### 4. 見出しと句読点

writing-rules の見出し・句読点節に従う（抽象ラベル単独を避ける等）。

### 5. 最小差分で仕上げる

良い具体例・実測・固有表現は残す。全文の均一な作り直し禁止。再確認は正本のチェック観点に従う。

## 入れないもの

- 結論遅延型の引っ張り
- 体言止めの比率目標
- 一文ごとの機械的改行
- 「です・ます」「筆者」の一律禁止
- 禁止語リストの丸写し検閲
- 文体を理由にした CTA・内部リンク・事実の無断変更

## 完了報告

1. 改善した観点  
2. 意図的に維持した内容  
3. 未確認・任意改善
