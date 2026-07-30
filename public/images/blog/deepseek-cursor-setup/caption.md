# deepseek-cursor-setup 画像メモ

Last Updated: 2026-07-30 11:31

## deepseek-api-key-name.png

- 用途: 本文挿絵（APIキー取得）
- 挿入位置: 「DeepSeek APIキーを取得する」
- 種別: 実画面スクリーンショット（DeepSeek Platform Create API Key / name）
- 原図: `01_Daily/2607/260730/deepseek-api-key-name.png`
- 後編集: なし

## deepseek-api-key-created.png

- 用途: 本文挿絵（APIキー発行直後）
- 挿入位置: 「DeepSeek APIキーを取得する」
- 種別: 実画面スクリーンショット
- 原図: `01_Daily/2607/260730/deepseek-api-key-created.png`
- 後編集: キー本体マスキング済み

## deepseek-api-key-list.png

- 用途: 本文挿絵（API Key一覧）
- 挿入位置: 「DeepSeek APIキーを取得する」
- 種別: 実画面スクリーンショット
- 原図: `01_Daily/2607/260730/deepseek-api-key-list.png`
- 後編集: なし

## cursor-openai-key-override-baseurl.png

- 用途: 本文挿絵（Cursor Models設定）
- 挿入位置: 「Cursor側の基本設定」
- 種別: 実画面スクリーンショット（OpenAI API Key / Override Base URL）
- 原図: `01_Daily/2607/260730/cursor-openai-key-override-baseurl.png`
- 後編集: ngrok ホスト部マスキング済み

## cursor-add-custom-model.png

- 用途: 本文挿絵（Add Custom Model）
- 挿入位置: 「Cursor側の基本設定」
- 種別: 実画面スクリーンショット
- 原図: `01_Daily/2607/260730/cursor-add-custom-model.png`
- 後編集: なし

## Cursor-DeepSeekV4.png

- 用途: 本文挿絵（経路図）
- 挿入位置: 「なぜV4だけ動かないのか」
- 種別: diagram（白背景／ブルー系）
- 原図: `01_Daily/2607/260730/Cursor-DeepSeekV4.png`
- 後編集: なし（図内に日本語ラベルあり）

## BaseURL-ngrokFree.app.png

- 用途: 本文挿絵（用語対応図）
- 挿入位置: 「Step3：起動順とBase URLの取得・Cursorへの反映」
- 種別: diagram（白背景／ブルー系）
- 原図: `01_Daily/2607/260730/BaseURL-ngrokFree.app.png`
- 後編集: なし（図内に日本語ラベルあり）

## apiBaseUrl.png

- 用途: 本文挿絵（プロキシ起動ログ）
- 挿入位置: 「Step3：起動順とBase URLの取得・Cursorへの反映」
- 種別: 実画面スクリーンショット（ターミナル）
- 原図: `01_Daily/2607/260730/apiBaseUrl.png`
- 後編集: `api_base_url` ホスト部マスキング済み

## cursor-provider-error-insufficient-balance.png

- 用途: 本文挿絵（残高不足エラー）
- 挿入位置: 「よくあるエラーと切り分け方」内 402
- 種別: 実画面スクリーンショット（Provider Error）
- 原図: `01_Daily/2607/260730/cursor-provider-error-insufficient-balance.png`
- 後編集: なし

## og.png

- 用途: OG
- 状態: **adopt 済**（2026-07-30 11:31）。staging `2026-07-30__deepseek-cursor-setup-og-v2` の `__v2-sub-right-ja.png` を配置
- 内容: 経路図全体＋帯（main左 / sub右詰め）`CursorでDeepSeek-V4を使う方法` / `重要なのはプロキシ`・scale 2.0
- 配置: `public/images/blog/deepseek-cursor-setup/og.png`（1200×630）

## caption

```md
DeepSeek APIキー取得から、CursorのOverride Base URL・プロキシ経由のV4設定、よくあるエラー画面までを実測スクショと経路図で示します。
```

## alt text

```md
DeepSeekのCreate API Key画面でnameを設定しているところ
発行されたAPIキーを表示している画面（キー本体はマスク）
DeepSeekのAPI Key一覧画面
CursorのModels画面でOpenAI API KeyとOverride Base URLを設定しているところ
Cursorのadd custom model画面でdeepseek-v4-flashを追加しているところ
Cursorからngrok・プロキシを経由してDeepSeek APIへ至る経路図
ホスト・dev domain・api_base_url・local_base_urlの対応とCursorへの設定箇所
プロキシ起動直後のターミナルでapi_base_urlが表示されている画面
Provider ErrorのInsufficient Balance表示
```
