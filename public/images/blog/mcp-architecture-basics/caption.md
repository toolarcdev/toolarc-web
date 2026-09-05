# mcp-architecture-basics 画像メモ

Last Updated: 2026-09-05 15:31

## h2-2.png

- 用途: 本文挿絵（H2「1つのClientは1つのServerと対になる（Serverの数だけClientがある）」）
- 挿入位置: 当該 H2 見出し直後〜1対1の説明文の近く
- 種別: 概念図（Host内の Client 1〜3 がそれぞれ Server 1〜3 と1対1で接続。Serverが増えれば Client も増える）
- 原図: `01_Daily/2609/260905/mcp-architecture-basics/h2-2.png`（約998KB・1672×941）
- 後編集: なし（日本語は作成時焼き込み済み）
- 軽量化: sharp palette PNG q85・長辺1600。998KB → 290KB（1600-palette85）。目視OK
- `posts.ts`: `imageBasePath: /images/blog/mcp-architecture-basics`（①で登録）

### caption

```md
Hostの中にClientが複数あり、それぞれが対応するServerと1対1でつながる。Serverが増えるとClientも増える。
```

### alt text

```md
Host（AIアプリ本体）の中のClient 1〜3が、それぞれServer 1〜3と1対1で接続し、Serverが増えればClientも増えることを示す概念図
```

## h2-3.png / og.png

- 用途: 本文挿絵（H2「要求が渡って結果が戻るまでの流れ」）＋ **OG（同一画像を流用。bake-og-text なし）**
- 挿入位置: 当該 H2 内・流れの説明文の後
- 種別: 概念図（Host → Client → Server の一往復。用意する→尋ねる→返す→呼ぶ→戻る。HostとServerは直接やり取りしない）
- 原図: `01_Daily/2609/260905/mcp-architecture-basics/h2-3.png`（約1329KB・1536×1024）
- 後編集: なし（日本語は作成時焼き込み済み）。**OG 帯の焼き込みは実行していない**
- 軽量化: sharp palette PNG q85・長辺維持。1329KB → 377KB（1536-palette85）。目視OK
- 配置: 軽量化後の `h2-3.png` を `og.png` に同一バイトでコピー
- `posts.ts`: `imageBasePath: /images/blog/mcp-architecture-basics`／`ogImage: og.png`（①で登録）

### caption

```md
要求はHostが用意したClientを経由してServerへ渡り、結果も同じ経路で会話に戻る。HostとServerは直接やり取りしない。
```

### alt text

```md
Host（呼び出し元）・Client（接続の入口）・Server（接続先）の間で、用意する・尋ねる・返す・呼ぶ・戻るの一往復がClient経由で進むことを示す概念図
```
