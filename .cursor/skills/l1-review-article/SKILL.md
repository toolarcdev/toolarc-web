---
name: l1-review-article
description: >-
  Runs ToolArc L1 article quality review (slot ④): Output Contract checklist,
  minimal Markdown fixes, AI-log recording, and handoff notes for slot ①. Use
  when the user asks for L1レビュー, 公開前レビュー, Claude初稿のレビュー, or Output
  Contract 合否. Not for posts.ts registration, series.ts, build, publish-date
  confirmation, or full article drafting.
---

# l1-review-article（④ L1記事品質レビュー）

Skill = 手順。判定基準の正本は改善施策ノート **§4.3.1 L1判定基準**（Output Contract 8項目＋リズム／空句／一次情報＋誇大表現）。
矛盾したら **Vault 正本（改善施策ノート §4.3.1・§8）を優先**し、本 Skill を追従更新する。

## 正本と同期

| 層 | パス | 役割 |
|----|------|------|
| 判定基準の正本 | Vault `06_toolarc-business/202607/ToolArc生産性向上_改善施策と活用機能（2026-07）.md` §4.3.1 | L1判定基準（チェックリスト） |
| レビュー→反映テンプレ | 同ノート §4.3 | コピペ用 Review／Reflect |
| プロンプト参照（人） | 当日 AI-log「# ④SKILLを活用したプロンプト」節 | 人が読む起動文の見本。Agent手順の正本は本 Skill |
| スロット境界 | `docs/ai-context/chat-operations.md`（④節） | ④ / ① の担当分界 |
| 文体・SEO | `docs/ai-context/writing-rules.md` / `AGENTS.md`（Output Contract） | 合否判定の根拠 |
| LLM空句 | `docs/ai-context/llm-forbidden-phrases.md` | 空句・誤検知注意の正本 |

## やること / やらないこと

**やる**: L1項目別合否、必須修正の記事MD適用（最小差分）、AI-log への「L1レビュー実施」節追記、①への引き継ぎ文  
**やらない**: `posts.ts` / `series.ts` 登録、`npm run build`、公開日確定（すべて①＝`publish-article`）、全文初稿の作成（④のProduceは別）、GSC（②）、PoE2/api、全記事の一括再レビュー

## 手順

開始時: `Get-Date -Format "yyyy-MM-dd HH:mm"` → 編集した Vault ファイルの `Last Updated`／記録の実施日時に使う（手入力・推測禁止）

1. **L1レビュー（項目別合否）**: 次を ✅／要修正 で判定する（正本は改善施策ノート §4.3.1）
   - Output Contract 8項目: 想定読者／検索意図／主・副KW／結論3〜5点／構成（H2最大5前後）／収益導線／内部リンク／免責
   - 文体: 敬体ベース＋文末多様化（同一文末です／ますの**3連続禁止**）。一人称「筆者」。山場の体言止め・短い常体は `writing-rules.md` に従い許容
   - ある程度の長さがある記事で**体言止めが0件でないか**（ゼロ回避。文比率目標なし）
   - 連続する段落が同じ文数で刻まれていないか（均質さ）
   - 話題テスト（状況更新か／文書進行の実況だけか）
   - LLM空句リスト（`llm-forbidden-phrases.md`）該当の連打がないか
   - 一次情報マーカーが最低1つあるか（実測数値＋取得日／環境／失敗談）。無い場合は「確認範囲」の明示があるか
   - 追加観点: 誇大表現・未確認仕様の断定なし／slug 3点一致（ファイル名・frontmatter・依頼指定）／内部リンクは `/blog/slug` 相対形式／rich-toc なら `<!-- embed:* -->` 維持
2. **必須修正**: 記事MDへ直接適用（最小差分・全文書き換え禁止）。**任意改善は提示のみ**とし、適用可否をユーザーに確認する
3. **記録反映**:
   - 当日 AI-log に「## L1レビュー実施：<記事タイトル>」節を追加（実施日時・項目別合否・必須修正・任意改善・総合判定・①への引き継ぎ）。転記先が「# Claudeで記事作成：<inbox名>」の直後にある場合はその近くに置く
   - **該当タスクがある日だけ**: 改善施策ノート §8 の該当項目を Done 条件確認後に `[x]`、実行ログへ時系列エントリ＋進捗サマリー更新
4. **完了報告（短く）**: 項目別合否／適用した修正／未適用の任意改善／①への1行引き継ぎ

## 必須パス

- 記事MD: `content/blog/<contentId>/NNN-<slug>.md`
- 当日 AI-log: `D:\ObsidianVault\Vault\01_Daily\{YYMM}\{YYMMDD}\AI-log-{YYYY-MM-DD}.md`
- 判定基準の正本: Vault 改善施策ノート §4.3.1（迷ったときだけ該当節を読む。全文は読まない）
- 空句正本: `docs/ai-context/llm-forbidden-phrases.md`
- （該当日のみ）改善施策ノート §8 / 実行ログ

## 収益導線ありの記事のとき（追加確認）

- 比較Series4本は直アフィ禁止・周辺収益への弱リンクのみ。天秤AI Biz 本人NG、Rakurin 本人OK
- CTA が3点想定（リード直後／本文中／まとめ前）に近いか → **不足は任意改善として提示**（必須修正にしない）
- CTA前後に向く人／向かない人・注意点・代替案があるか。ASP成果条件・単価の記事転載がないか

## 厳守

- 日時は Get-Date 取得値。編集した Vault ファイルの `Last Updated` を同値で更新。未編集ファイルは触らない
- Vault内リンクはウィキリンク。記号（：など）入り見出しはアンカーを推測せず `[[ノート名]]＋見出し文` の形にする
- 公開記事リンクは `/blog/slug`。未公開は「準備中」、slug未確定ならリンクしない
- frontmatter `date` は仮値のまま（①が実装日で上書き）
- token節約: 対象記事・当日AI-log・§4.3.1・空句リスト以外は読まない。広範囲探索は実行前に確認

## 起動（人が貼る短文の例）

```text
L1レビューして。必須修正は反映。任意改善は確認してから。
対象: content/blog/20-investigate-something/NNN-<slug>.md
AI-log: D:\ObsidianVault\Vault\01_Daily\{YYMM}\{YYMMDD}\AI-log-{YYYY-MM-DD}.md
```

起動が弱いときは「`l1-review-article` の手順で進めて」。

## ①への引き継ぎ文（完了報告に添える定型）

```text
L1レビュー実施済（④・項目別合否はAI-log YYYY-MM-DD）。
slug: <slug>
残: posts.ts / series.ts / 公開日Get-Date / build
```
