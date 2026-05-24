# PoE2: Vercel 2 プロジェクト構成

公開 frontend（`toolarc-web`）と非公開 api（`toolarc-api`）を別 Vercel プロジェクトで動かします。

## 1. 非公開 API（toolarc-api）

1. GitHub に **Private** リポ `toolarc-api` を作成し、`c:\projects\toolarc-api` を push
2. [Vercel](https://vercel.com) → Add New Project → `toolarc-api` を Import
3. **Environment Variables**（Production / Preview 両方）:

| 名前 | 値 |
|------|-----|
| `POE2_API_KEY` | 長いランダム文字列（frontend と同じ値） |

4. Deploy 完了後、URL を控える（例: `https://toolarc-api-xxx.vercel.app`）

任意: **Deployment Protection** を有効にし、直接 URL アクセスを制限する。

## 2. 公開 frontend（toolarc-web）

1. 公開リポ `toolarc-web` を Vercel に接続（既存プロジェクトなら Settings → Environment Variables）
2. 追加する変数:

| 名前 | 値 |
|------|-----|
| `POE2_API_URL` | 手順 1 の API URL（末尾スラッシュなし） |
| `POE2_API_KEY` | API と同じ秘密鍵 |

3. Redeploy

`POE2_API_KEY` は BFF（`/api/poe2/*`）でのみ使われ、ブラウザには送られません。

## 3. 動作確認

1. `/tools/poe2-regex` を開く
2. モッド検索・選択・regex コピーができること
3. 環境変数未設定時は「現在このツールは利用できません」と表示されること

## 4. データ更新時

1. `toolarc-data` で JSON を更新
2. `toolarc-api/data/poe2/item_mod_priority5.json` にコピーして commit
3. `toolarc-api` の Vercel が再デプロイ（通常は main への push で自動）

frontend の再デプロイは不要です。

## ローカル

| ターミナル | コマンド | ポート |
|-----------|----------|--------|
| api | `cd toolarc-api && npm run dev` | 3001 |
| web | `cd toolarc-web` + `.env.local` | 3000 |

両方の `.env` / `.env.local` で **同じ** `POE2_API_KEY` を使います。
