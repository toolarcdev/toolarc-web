# ToolArc (frontend)

AI workflows, gaming utilities, and developer-focused tools.

**公開リポジトリ** — ブログ・静的コンテンツ・PoE2 ツール UI を含みます。ゲームモッドの生データ（JSON）は含みません。

## リポジトリ構成

| リポ | 公開 | 役割 |
|------|------|------|
| `toolarc-web`（本リポ） | 公開 | Next.js サイト + PoE2 BFF |
| `toolarc-api` | 非公開 | モッド検索・regex 生成 API |
| `toolarc-data` | 非公開 | JSON・元 Markdown・生成手順 |

## セットアップ（ブログのみ）

```bash
npm install
npm run dev
```

`http://localhost:3000` でブログ等が動きます。

## PoE2 ツールのローカル開発

PoE2 regex ツール（`/tools/poe2-regex`）は **非公開 API** が必要です。

1. 隣接ディレクトリに `toolarc-api` を clone（または `c:\projects\toolarc-api` を参照）
2. API を起動:

```bash
cd ../toolarc-api
cp .env.example .env.local   # POE2_API_KEY を設定
npm install
npm run dev                  # http://localhost:3001
```

3. 本リポに `.env.local` を作成:

```env
POE2_API_URL=http://localhost:3001
POE2_API_KEY=dev-local-key
```

4. `npm run dev` で frontend を起動

**公開 repo だけ clone した場合**、PoE2 ページは「利用できません」と表示されます（意図した動作）。

## 本番デプロイ（Vercel）

詳細: [docs/vercel-poe2-deployment.md](docs/vercel-poe2-deployment.md)

- frontend: `POE2_API_URL`, `POE2_API_KEY`
- api（別プロジェクト）: `POE2_API_KEY`

## データディレクトリ

`data/poe2/` は `.gitignore` 済みです。**commit しないでください。** ローカル検証用に手元に置く場合は `toolarc-data` からコピーします。
