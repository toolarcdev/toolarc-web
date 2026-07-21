---
name: bake-og-text
description: >-
  Bakes Japanese title bands onto ToolArc OG / Series cover PNGs using a
  reproducible script and Vault staging. Use when the user asks to add Japanese
  text to an OG image, Series OG bake, or *-ja.png output. Does not regenerate
  composition with GenerateImage.
---

# bake-og-text

OG／Series 向けの**日本語帯焼きこみ**。構図の再生成はしない。

入出力の正: Vault `06_toolarc-business/blog-image-staging/`  
スクリプト: 本 Skill の `scripts/bake_og_text.py`  
トーン: `.cursor/rules/blog-image-tone.mdc`（帯色は既定 `#60a5fa`）

## 起動条件

- 「OGに日本語」「Series OG焼きこみ」「-ja.png を作って」など明示依頼
- 焼きこみ前 PNG（文字なし）が用意済み

## 入力

- ジョブフォルダ（推奨）: `.../blog-image-staging/jobs/YYYY-MM-DD__…/`
  - `raw/<name>.png`（上書き禁止）
  - `copy.json`（`main` / `sub` 等）
- または単発: 入力 PNG パス＋文言＋出力パス

## copy.json 例

```json
{
  "main": "メイン見出し（短く）",
  "sub": "サブ（任意・空文字可）",
  "accent": "#60a5fa"
}
```

## 手順

1. raw を別名で残す（**上書き禁止**。再生成は `__v2.png`）
2. `copy.json` の文言を確認（長すぎる場合は人間に短縮を求める）
3. スクリプト実行（ジョブフォルダ指定）:

```powershell
python .cursor/skills/bake-og-text/scripts/bake_og_text.py `
  --job "D:\ObsidianVault\Vault\06_toolarc-business\blog-image-staging\jobs\<job>" `
  --font "C:\Windows\Fonts\NotoSansCJKjp-Regular.otf"
```

フォントが無い場合は Noto Sans JP のローカルパスを人間に確認する（Vault にフォントバイナリを置かない）。

4. 出力は `baked/<name>-ja.png`
5. Read で目視（帯が切れていないか／本文が潰れていないか）
6. 人間が `adopt` したら `public/images/blog/<imageBasePath>/` へコピー
7. `job.md` / `_manifest.md` の状態を更新（raw → baked → adopt → wired）
8. `posts.ts` 配線は `publish-article` へ引き継ぎ

## 帯レイアウト（既定）

- 画面下部または中央下の半透明〜ソリッド帯（本線 `#60a5fa` 系）
- 白文字、十分なコントラスト
- main 1行優先。sub は小さめ・任意
- 1200×630 想定。他比率は中央寄せで破綻しないこと

## 出力

- baked パス一覧
- 使用フォントパス
- adopt / reject 待ちであること（勝手に public へ置かない）

## 禁止

- raw の上書き
- GenerateImage で「文字入りOG」を一発生成して完成扱いすること
- 採用前の WIP を `public/` に置くこと
- フォントバイナリを Vault / リポにコミットすること
