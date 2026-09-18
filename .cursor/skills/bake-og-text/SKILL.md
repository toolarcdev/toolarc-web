---
name: bake-og-text
description: >-
  LEGACY. Call ONLY when the user explicitly names bake-og-text or 帯焼きこみ.
  Do not invoke from blog-image-router, generate-blog-image, or because an OG
  needs Japanese. Scheduled for removal. Bakes a title band onto an existing PNG.
---

# bake-og-text

**レガシー／削除予定。** 既定の画像工程には含めない。  
**ユーザーが Skill 名 `bake-og-text` または「帯焼きこみ」を明示したときだけ**起動する。OG が要る・日本語が要る・Series カバー、だけでは呼ばない。他 Skill から自動委譲しない。

OG／Series 向けの**日本語帯焼きこみ**。構図の再生成はしない。

入出力の正: Vault `06_toolarc-business/blog-image-staging/`  
スクリプト: 本 Skill の `scripts/bake_og_text.py`  
トーン: `.cursor/rules/blog-image-tone.mdc`（帯色は既定 `#60a5fa`）

## 実行環境（手順0・毎回確認）

```powershell
python --version          # 3.13.14 で確認（2026-07-31）
python -c "import PIL; print(PIL.__version__)"   # 12.3.0 で確認
```

- どちらかが失敗したら**焼きこみに進まない**。Windows Store の `python.exe` スタブだけが PATH にある状態では Pillow を入れられない
- 未導入なら: `winget install --id Python.Python.3.13 --scope user --silent` → `python -m pip install pillow`
- **代替実装を書き起こさない**。System.Drawing 等で書き直すと座標指定や行間の扱いが変わり、既存 OG と揃わなくなる

## フォント

- 既定は `C:\Windows\Fonts\YuGothB.ttc`（Yu Gothic Bold。adopt 実績の書体）
- 代替は `C:\Windows\Fonts\NotoSansJP-VF.ttf`
- 無ければローカルパスを人間に確認する（Vault にフォントバイナリを置かない）

## 起動条件

次を**すべて**満たすときだけ進む。足りなければ起動しない（代替工程を提案しない。黙って他 Skill へも送らない）。

1. ユーザー自身の直近発話に **`bake-og-text` または「帯焼きこみ」** がある（「OGに日本語」「Series OG」だけでは不足）
2. 焼きこみ前 PNG が用意済み（**帯が無い状態**。図の中に日本語ラベルがあるのは可）
3. 本文図のラベル修正ではない（階層・段階の日本語は `generate-blog-image` の `diagram-infographic`）

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
  "accent": "#60a5fa",
  "scale": 2.0,
  "subAlign": "right"
}
```

- `scale` は帯フォント倍率（既定 `1.0`。150〜200%指定時は `1.5`〜`2.0`）。**記事OGの実績値は `2.0`**
- `subAlign` は `left`（既定）/ `right`。main 左・sub 右詰めが adopt 実績のレイアウト

## 手順

1. 元図を `notes/<name>-source.png` に退避する（**上書き禁止**）
2. **raw を作る**（下記「raw の作り方」）。raw は 1200×630・帯なし。再生成は `__v2.png`
3. `copy.json` の文言を確認（長すぎる場合は人間に短縮を求める）
4. スクリプト実行（ジョブフォルダ指定）:

```powershell
python .cursor/skills/bake-og-text/scripts/bake_og_text.py `
  --job "D:\ObsidianVault\Vault\06_toolarc-business\blog-image-staging\jobs\<job>" `
  --font "C:\Windows\Fonts\YuGothB.ttc"
```

5. 出力は `baked/<name>-ja.png`
6. **検証**（下記「検証」）。NG ならプロンプトではなく `copy.json` / raw を直して再生成する
7. 人間が `adopt` したら `public/images/blog/<imageBasePath>/` へコピー
8. `job.md` / `_manifest.md` の状態を更新（raw → baked → adopt → wired）
9. `posts.ts` 配線（`ogImage`）は `publish-article` へ引き継ぎ

## raw の作り方

スクリプトは**帯を上に重ねるだけ**で、図の縮小はしない。元図をそのまま raw にすると帯が図の下部を覆って情報が消える。先に次を用意する。

- 1200×630 の白キャンバスを作り、図を**帯の上の領域に収める**（帯は下端。`scale 2.0` なら帯高は約 160px）
- 図は横幅いっぱいを目標に等比縮小し、水平中央寄せ。図の下端と帯の間に 15〜25px の白を残す
- **元図が自前のタイトル帯を持つ場合は crop する**。残すと OG 帯と二重になり、図の使える面積も減る
- 元図末尾の「まとめコールアウト」も crop 候補。同じ主旨は帯の sub が担う

## 帯レイアウト（既定）

- 画面下部のソリッド帯（本線 `#60a5fa`・不透明度 230 で合成）
- 白文字。main 左揃え1行優先、sub は小さめ・任意（`subAlign` で左右）
- 1200×630 想定。他比率は中央寄せで破綻しないこと
- `scale 2.0` のときの実測: 帯 y=469 / 高さ 161 / 合成後の帯色 RGB(112,174,250) / 左右マージン 48px
- 白文字 on 帯のコントラスト比は約 2.3:1。WCAG は満たさないが、サイト内 OG の一貫性を優先している

## 検証

1. baked を **Read で目視**する（帯が切れていないか／図が潰れていないか／文字が枠外に出ていないか）
2. **文字位置をピクセルで確認**する。縮小表示だと左端への張り付きや枠外へのはみ出しを見落とす
3. NG だった baked を次の入力に使わない

## 出力

- baked パス一覧
- 使用フォントパス
- adopt / reject 待ちであること（勝手に public へ置かない）

## 禁止

- 明示宣言なしの起動（他 Skill からの自動委譲を含む）
- raw の上書き
- 採用前の WIP を `public/` に置くこと
- フォントバイナリを Vault / リポにコミットすること
- **本スクリプトの代替実装を書き起こすこと**（Python が動かないときは環境を直す。実装を増やすとレイアウトが分岐する）
- 本文 infographic のラベルを本スクリプトで後載せ・修正すること
