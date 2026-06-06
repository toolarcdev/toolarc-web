# caption.md

## 目的
この記事内で使用すると理解しやすい screenshots（スクリーンショット）候補と、そのまま使える caption（説明文）をまとめたファイルです。

対象記事：
「ChatGPTを新アカウントへ移行したい人へ｜履歴より重要な『知識資産』の考え方」

---

# 1. ChatGPT Export画面

## 推奨スクリーンショット

- ChatGPT Settings
- Data Controls
- Export Data ボタン

## 撮影箇所

ChatGPT
→ Settings
→ Data Controls
→ Export

## caption

```md
ChatGPTでは会話履歴をZIP形式でExportできます。ただし、これは「会話ログの保存」であり、AIの記憶そのものを移行する機能ではありません。
```

## alt text

```md
ChatGPTのData ControlsにあるExport Data画面
```

---

# 2. ChatGPT Memory設定画面

## 推奨スクリーンショット

- Memory ON/OFF
- Memory管理画面
- 「Saved memories」一覧

## 撮影箇所

ChatGPT
→ Settings
→ Personalization
→ Memory

## caption

```md
ChatGPTのMemoryは、会話内容の一部を保持する仕組みです。ただし、別アカウントへの移行機能は提供されていません。
```

## alt text

```md
ChatGPTのMemory設定画面
```

---

# 3. Export ZIPの中身

## 推奨スクリーンショット

- conversations.json
- chat.html
- exported files一覧

## caption

```md
Exportデータには会話ログが含まれていますが、そのまま新しいChatGPTへ学習データとして引き継げるわけではありません。
```

## alt text

```md
ChatGPT Export ZIPファイル
```

---

# 4. Obsidian Vault構成

## 推奨スクリーンショット

- AI関連フォルダ
- DailyNote
- templates
- context.md
- rules

## おすすめ構成例

```text
/AI
  /context
  /rules
  /templates
  /daily-note
```

## caption

```md
AI運用では、会話ログよりも「再利用できるMarkdown資産」を整理しておく方が重要です。
```

## alt text

```md
Obsidianで整理されたAI知識管理フォルダ
```

---

# 5. DailyNote運用画面

## 推奨スクリーンショット

- 今日の作業ログ
- AIとの試行錯誤
- issueメモ
- 学習内容

## caption

```md
DailyNoteを積み上げることで、AIとの試行錯誤や運用ノウハウを「知識資産」として蓄積できます。
```

## alt text

```md
AI運用ログとして活用しているDailyNote
```

---

# おすすめ追加スクリーンショット（SEO強化向け）

## 「できること / できないこと」比較表

### caption

```md
ChatGPTでは会話履歴の移行はできませんが、Markdown化した知識資産は再利用可能です。
```

---

## AI知識管理フロー図

### 推奨内容

```text
ChatGPT
↓
DailyNote
↓
Markdown整理
↓
context.md
↓
Claude / Cursor 再利用
```

### caption

```md
AI長期運用では、「会話」より「整理済み知識」を再利用する流れが重要になります。
```

---

# screenshots優先順位

## 最優先

1. ChatGPT Export画面
2. Memory設定画面
3. Obsidian Vault構成

---

## 余裕があれば追加

- DailyNote
- Markdown templates
- AI知識管理フロー図

---

# スクリーンショット撮影時の注意

## 個人情報を隠す

- メールアドレス
- API Key
- project secrets
- private repository
- conversation history

は必ず隠す。

---

## 解像度

推奨：

- 横幅 1400px 以上
- Retina推奨
- PNG推奨

---

# おすすめ画像構成（完成イメージ）

| セクション      | 推奨画像            |
| ---------- | --------------- |
| 導入         | ChatGPT会話画面     |
| Export解説   | Export Settings |
| Memory説明   | Memory設定        |
| 知識資産説明     | Obsidian Vault  |
| まとめ        | AI知識管理フロー       |

---

# 6. パターン1・2 比較図（003 スマホ移行 Tips）

## 推奨画像

- `pattern-comparison-both.png`

## 使用箇所

- 「先に確認｜あなたのケースはどちら？」（表の前）
- 「チェックリスト」2リストの後（振り返り用・同一画像再利用可）

## caption

```md
機種変更（同アカウント）と別アカウント移行（A→B）では手順が異なります。まずどちらのケースかを確認してください。
```

## alt text（1回目）

```md
パターン1（同アカウント・新スマホ）とパターン2（A→B移行）の違いを比較した図解
```

## alt text（2回目・チェックリスト後）

```md
チェックリスト実施前に確認する、2パターンの引き継ぎ方法の比較図
```

---

# 7. パターン1 図解（同アカウント・新スマホ）

## 推奨画像

- `pattern1-same-account-new-smartphone.png`

## 使用箇所

- 「パターン1｜同じアカウントで新しいスマホを使う」H2 直下

## caption

```md
会話履歴は端末ではなくアカウント側に保存されています。同じログイン方法・同じアカウントなら新スマホでも履歴は同期されます。
```

## alt text

```md
同じChatGPTアカウントで新スマホにログインすると履歴が同期される図解
```

---

# 8. パターン2 図解（A→B 移行）

## 推奨画像

- `pattern2-account-a-to-b-same-phone.png`

## 使用箇所

- 「パターン2｜アカウントAからアカウントBへ移行したい」H2 直下

## caption

```md
ChatGPTにはアカウント間の公式履歴移行機能はありません。重要な内容は手動で引継ぎ資料としてコピーする必要があります。
```

## alt text

```md
同じスマホでアカウントAからBへ移行する場合、公式の履歴移行は不可で手動引き継ぎが必要な図解
```

---

# 9. OG 画像（003 スマホ移行 Tips・SNS 専用）

## 推奨画像

- `og-smartphone-migration-tips.png`

## 用途

- Open Graph / Twitter Card 用（SNS シェアプレビュー）
- 記事本文には挿入しない
- Hub（001）・チェックリスト（002）は `ss-01-chatgpt-export.png` のまま。この記事（003）のみ差別化

## 仕様

- 比率: 1200×630（OG 標準）
- 内容: 大見出し + パターン1/2 簡略2パネル

## alt text（OG 相当）

```md
スマホでChatGPTのアカウントを引き継ぐ方法｜機種変更と別アカウント移行の違い（ToolArc）
```

## 設定箇所

- `lib/blog/posts.ts` → `chatgpt-smartphone-account-migration-tips` の `ogImage`

