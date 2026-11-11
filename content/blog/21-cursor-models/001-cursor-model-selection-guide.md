---
title: "Cursorモデルの選び方｜用途別おすすめとAuto・Freeの違い"
description: Cursorでどのモデルを選ぶか迷う人向けに、Composer 2.5・Grok 4.7・Claude・Gemini・GPT系の用途と特徴を比較します。Freeで選べるモデル、AutoとCursor Routerの違い、利用枠や追加料金の確認方法も紹介します。
date: 2026-07-29
tags:
  - Cursor
  - Cursor Pro
  - AIコーディング
  - モデル選定
last_update: 2026-11-11
site: toolarc.jp
target: "Cursorでどのモデルを選ぶか、Freeと有料プランで何が違うか知りたい利用者"
---

# Cursorモデルの選び方｜用途別おすすめとAuto・Freeの違い

Cursorのモデル選択画面に候補が増えると、「結局どれを使えばいいのか」で迷います。毎回モデルを選び直す必要があるのか、FreeでもAutoを使えるのか、追加料金はどこで確認するのかも気になるところです。

本記事ではCursor公式情報と、Proアカウントの設定・利用枠画面の例をもとに、作業別のモデル候補とプランごとの違いを整理します。おすすめは公式の用途説明をもとにした選び方であり、同じコードやタスクを使った独自ベンチマークの順位ではありません。

> **今日の結論**
>
> - 日々の対話型コーディングは **Composer 2.5**、Autoが選べるプランなら **Auto** から始める
> - 範囲が決まった修正は **Claude Sonnet 5.5**、難しい長時間作業は **Grok 4.7** を候補にする
> - 複雑な設計・推論には **Claude Opus 5.5** または **GPT-5.6 Sol**。**Claude Fable 5.2** はデータ保持条件を確認してから使う
> - 現行Freeは **Grok・Composerなどの自社モデルが対象**。旧Hobbyと同じ条件とは限りません
> - 利用枠と追加料金は **自分の契約に対応する利用状況・請求画面** で確認します

## 作業別に選ぶCursorモデル

まず作業内容から候補を絞り、難しい場面だけ別のモデルに切り替えると、毎回の選択が簡単になります。

| モデル | 特徴・おすすめの使い方 | 注意点 | 旧プランの利用枠例 |
| --- | --- | --- | --- |
| [Auto](https://cursor.com/help/models-and-usage/available-models) | 毎回候補を選ぶ手間を減らしたいとき。日常作業から始め、結果を見て手動選択に切り替える | 常に同じモデルが使われるわけではありません。Teams／EnterpriseのCursor Routerでは、選ばれたモデルに応じて利用枠と料金が変わります | 選ばれたモデルによる |
| [Composer 2.5](https://cursor.com/docs/models/cursor-composer-2-5) | 会話しながら進める実装、反復的な修正、普段のAgent作業。Cursorが高速・コスト効率を重視して案内するモデルです | 複雑な設計や長い作業で行き詰まったら、依頼を分割するか別モデルを試します | Cursor Models |
| [Claude Sonnet 5.5](https://cursor.com/docs/models/claude-sonnet-5-5) | 対象範囲のはっきりしたバグ修正や小さな機能追加など、品質と消費量のバランスを取りたい作業 | より高い思考設定はトークン消費が増えます。難所の最高品質を優先する用途とは分けます | Other Models |
| [Gemini 3.8 Flash](https://cursor.com/docs/models/gemini-3-8-flash) | 大きめのコードベースを扱う作業や、速さと低いトークン単価を重視する反復作業。長いコンテキストにも対応します | 読み込ませる範囲が広いほど、実際の総消費量も増えます | Other Models |
| [Muse Wonder](https://cursor.com/docs/models/muse-wonder) | 多段階のデバッグ、長いツール操作、大規模リポジトリを扱うAgent作業 | 高い思考設定ほどトークンを多く使います。Teams／Enterpriseでは管理者によるMetaモデルの有効化が必要な場合があります | Other Models |
| [Grok 4.7](https://cursor.com/docs/models/grok-4-7) | 難しい実装や、時間のかかるAgent作業。長い作業を続け、結果を自己確認する用途 | 日常の軽作業すべてに固定する必要はありません。長文脈の利用条件はモデル設定と料金表で確認します | Cursor Models |
| [Claude Opus 5.5](https://cursor.com/docs/models/claude-opus-5-5) | 複雑な設計、UI実装、長いAgent作業、複数の作業をまとめる判断 | SonnetやComposerより利用枠を早く消費しやすいため、難所に絞ると扱いやすくなります | Other Models |
| [GPT-5.6 Sol](https://cursor.com/docs/models/gpt-5-6-sol) | 複雑なコーディングや推論、計画・デバッグ、長時間のAgent作業 | GPT-5.6の他モデルや日常向け候補よりトークン単価が高めです | Other Models |
| [Claude Fable 5.2](https://cursor.com/docs/models/claude-fable-5-2) | 途中確認を少なくして進めたい、長時間の自律的な多段階作業 | 高単価です。Anthropicによる入力・出力の保持条件があり、Privacy Mode利用時や組織利用では事前承認が必要になる場合があります | Other Models |

モデル名は[CursorのModels & Pricing](https://cursor.com/docs/models-and-pricing)、表の利用枠例は[旧プランの説明](https://cursor.com/docs/account/pricing/legacy-cursor-plans)に基づきます。現行プランでは他社モデルの料金体系が異なるため、表のOther Modelsを含有枠と読み替えないでください。作業別の使い分けは公式のモデル説明をもとにした目安です。コードの変更範囲や指示の出し方によって結果は変わるため、最初から単一の「最強モデル」を決める必要はありません。

Claude Fable 5.2には個別のデータ保持条件があります。Anthropicは入力・出力を保持し、原則30日後に削除すると案内しています。安全性の調査や法的な保全が必要な場合は例外があります。Privacy Mode利用時やEnterpriseでは、モデルを使う前に管理画面での承認が必要になる場合があります。ソースコードを送る前に[Cursorのデータ保持条件](https://cursor.com/docs/enterprise/privacy-and-data-governance)を確認してください。

設定画面でモデルを有効にすると、チャットやAgentの選択候補に表示されます。次の画像は2026年10月7日の旧ProアカウントのSettings画面例です。現在のモデル一覧やFreeの表示状態を示すものではありません。候補や有効・無効はプランやチーム設定で異なります。

![Cursor SettingsのModels画面に表示されたモデル一覧と有効・無効のトグル例。](models-enabled-example.png)

## Free・有料プラン・Cursor Routerの違い

現行プランのFreeとPlusは、Grok 4.7・Grok 4.6・Grok 4.5・Composer 2.5など、Cursorの自社モデルが対象です。Claude・Gemini・GPTなどの他社モデルは対象外です。[利用可能モデルの公式ヘルプ](https://cursor.com/help/models-and-usage/available-models)と自分のモデル選択欄を照合してください。

旧HobbyやProは[旧Cursorプラン](https://cursor.com/docs/account/pricing/legacy-cursor-plans)として継続しています。以前のサポート回答には、Freeへ変更した特定のアカウントがGrok 4.6 Medium固定になった例がありますが、その回答を現行Free全体の条件には適用できません。現在使える候補は契約名、アプリ、チームの設定で確認してください。

有料プランでは、プランやアカウント設定に応じてAutoまたは個別モデルを選べます。プランや提供地域によって条件が異なるため、契約前には[最新のプラン・モデル条件](https://cursor.com/docs/models-and-pricing)も確認してください。**Autoはモデルピッカー上の選択肢、Cursor RouterはTeams／Enterprise向けのルーティング機能**です。Cursor RouterはTeamsでは既定で有効、Enterpriseでは管理者が有効化します。RouterのAutoではCost・Balance・Intelligenceの最適化モードを選べます。実際に使われるモデルはリクエストごとに異なり、モデルごとの料金が適用されます。[Cursor Routerの仕様](https://cursor.com/docs/cursor-router)

Cursorの候補にない外部モデルを接続したい場合は、[DeepSeekをCursorで使う設定手順](/blog/deepseek-cursor-setup)を確認できます。Kimi K3が表示される場合の設定例と提供状況の確認点は、[CursorでKimi K3を使う方法](/blog/kimi-k3-cursor-guide)にまとめています。

## 利用枠と追加料金を確認する

最初に、契約が現行のThe X Subscriptionか、旧Cursorプランかを確認します。利用枠の更新周期と他社モデルの支払い方法が異なるためです。

| 契約 | Cursor自社モデルの利用枠 | Claude・Gemini・GPTなどの他社モデル | 追加利用 |
| --- | --- | --- | --- |
| 現行The X Subscription | 有料プランはGrokと共有する週次枠。Freeは利用制限あり | Free/Plusは対象外。Premium以上では前払い残高からAPI公示単価で支払い | 残高追加と月間の追加利用上限を確認 |
| 旧Cursorプラン | 月次のCursor Models枠 | 対象のPro/Pro+/Ultra等では月次のOther Models枠 | オンデマンド利用と支出上限を確認 |

条件は[現行のモデル・料金表](https://cursor.com/docs/models-and-pricing)と[旧プランの比較表](https://cursor.com/docs/account/pricing/legacy-cursor-plans)で確認できます。同じUltraという名前でも新旧の契約があるため、名前だけで判断せず請求画面を確認してください。

以下は2026年10月7日の旧ProアカウントのPlan & Usage画面例です。2つの月次枠がある旧契約の例として残しており、現行プランの週次枠や前払い残高を示す画像ではありません。画面内の使用率も、このアカウントでの値です。

![旧Cursor ProのPlan & Usage画面でCursor ModelsとOther Modelsの利用状況を示す2026年10月7日の例。](usage-pools-pro-example.png)

追加費用を避けたいときは、自分の契約に対応する管理画面で残量と追加利用の設定を確認します。旧契約のオンデマンド設定と、現行契約の残高追加・月間上限は別の仕組みです。モデルごとの単価と上限を確認してから追加利用を有効にしてください。

自分のAPIキーを使う場合は、個人プランでは通常、利用料を各プロバイダーへ直接支払います。Teams／EnterpriseではCursor Token Rateが別途加算されます。[BYOK利用時の料金と利用枠](https://cursor.com/help/models-and-usage/usage-limits)を確認し、Cursorの利用枠とAPI提供元の請求先を分けてください。

## 迷ったときの切り替え方

次の順で試すと、モデル名を片端から選び直さずに済みます。

1. 自分のモデル選択欄で利用できる候補を確認し、Autoが選べるならAuto、Composer 2.5が選べるならComposerから普段の実装を始めます。
2. 修正範囲が明確な作業ではSonnet 5.5、大きなコードベースを扱う作業ではGemini 3.8 FlashまたはMuse Wonderを試します。
3. 設計や判断で詰まったときはOpus 5.5またはGPT-5.6 Sol、難しい長時間のAgent作業ではGrok 4.7を候補にします。
4. Fable 5.2を使う場合は、費用とデータ保持条件を先に確認します。
5. 生成された変更を確認し、利用枠の減り方も見て、普段使いの候補を決めます。

毎日使うモデルと、難所で使うモデルを分けておくと選びやすくなります。モデルの優劣を一般化せず、自分の作業とプランに合う組み合わせを選んでください。

## よくある質問

### SettingsでONにしたのに、モデル選択欄に出ないのはなぜですか？

モデル設定のトグルは、そのアカウントやチームで候補を有効にする設定です。プランの対象外だったり、チーム管理者が利用を制限していたりすると、ONにしてもモデル選択欄に出ないことがあります。現在のプランとチームのモデルアクセス設定も確認してください。

### Freeから有料プランに変えると、モデル選択欄も変わりますか？

現行プランではPremium以上、旧プランではProなどで他社モデルを利用できます。Plusは有料でも他社モデルの対象外です。表示されるモデルは契約プランやチーム設定によるため、アップグレード後にモデルピッカーを確認してください。

迷ったときは、目の前の作業を表の候補に当てはめて1つ試し、生成された変更と利用枠を見て次回の既定を決めます。

Cursorのモデル選びに加えて、生成AI全般の活用方法を基礎から学びたい方は、[AIスキルアカデミーの無料セミナーを見る](affiliate:ai-skill-academy:text-main:cta)こともできます。

---

本記事は2026年11月11日にプラン・利用枠・モデル情報をCursor公式資料で確認しています。掲載したPro画面は2026年10月7日の例であり、今回、Freeを含む実アカウントの再操作はしていません。モデルの提供状況、プラン条件、料金、利用枠は変更される場合があります。おすすめ用途は公式説明をもとにした目安で、特定のコードベースにおける性能を保証するものではありません。
