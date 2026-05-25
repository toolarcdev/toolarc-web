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

