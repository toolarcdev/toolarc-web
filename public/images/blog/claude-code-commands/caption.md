# claude-code-commands 画像メモ

Last Updated: 2026-08-25 22:33

## h2-1.png / og.png

- 用途: 本文挿絵（H2-1「カテゴリ別の基本コマンド表」冒頭）＋ **OG（同一画像を流用。bake-og-text なし）**
- 挿入位置: H2-1 直後（起動コマンド／スラッシュコマンドの区別説明の前）
- 種別: 4カテゴリ早見表（起動・終了／セッション管理／コンテキスト・ファイル操作／設定・ヘルプ）
- 原図: `01_Daily/2608/260825/claude-code-commands/ClaudeCode_カテゴリ別コマンド早見表.png`（約1.4MB）
- 後編集: なし（日本語は生成時焼き込み済み）。**OG 帯の焼き込みは実行していない**
- 軽量化: sharp palette PNG q80・長辺1600。1422KB → 359KB（1600-palette80）。目視OK
- 配置: `h2-1.png` を `og.png` に同一バイトでコピー（ハッシュ一致）
- `posts.ts`: `imageBasePath: /images/blog/claude-code-commands`／`ogImage: og.png`

### caption

```md
Claude Codeの基本コマンドを、起動・終了／セッション管理／コンテキスト・ファイル操作／設定・ヘルプの4カテゴリに分けた早見表です。
```

### alt text

```md
Claude Codeの基本コマンドを起動・終了／セッション管理／コンテキスト・ファイル操作／設定・ヘルプの4カテゴリに分けた早見表
```

## h2-2.png

- 用途: 本文挿絵（H2-2「短いセッション例」冒頭）
- 挿入位置: H2-2 直後（コードブロックの前）
- 種別: 起動→依頼→セッション管理→終了の流れ図
- 原図: `01_Daily/2608/260825/claude-code-commands/ClaudeCode_起動から終了まで.png`（約1.2MB）
- 後編集: なし（日本語は生成時焼き込み済み）
- 軽量化: sharp palette PNG q85・長辺1600。1213KB → 350KB（1600-palette85）。目視OK

### caption

```md
プロジェクトフォルダへ移動してから、起動・依頼・会話の整理・終了までを1本の流れで示した図です。
```

### alt text

```md
Claude Codeの基本操作として起動から依頼・セッション管理・終了までの流れを示す図
```
