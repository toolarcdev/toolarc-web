---
title: "Cursorモデルの選び方｜用途別おすすめとAuto・Freeの違い"
description: Cursorでどのモデルを選ぶか迷う人向けに、Composer 2.5・Grok 4.7・Claude・Gemini・GPT系の用途と特徴を比較します。Freeで選べるモデル、AutoとCursor Routerの違い、利用枠や追加料金の確認方法も紹介します。
date: 2026-07-29
tags:
  - Cursor
  - Cursor Pro
  - AIコーディング
  - モデル選定
last_update: 2026-10-07
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
> - 複雑な設計・推論には **Claude Opus 5.5** または **GPT-5.6 Sol**。**Claude Fable 5.1** はデータ保持条件を確認してから使う
> - Free（自分のAPIキーなし）は **Cursor Grok 4.6 Medium固定**。Autoは選べません
> - 利用枠と追加料金は **Plan & Usage** で確認できます

## 作業別に選ぶCursorモデル

まず作業内容から候補を絞り、難しい場面だけ別のモデルに切り替えると、毎回の選択が簡単になります。

![Cursorの作業別モデル選び。普段の実装・効率と複雑さ・長時間の作業から候補を選び、Free、有料プラン、Cursor Routerの条件は無彩色の独立パネルで示す図。](model-selection-map.png)

| モデル | 特徴・おすすめの使い方 | 注意点 | 利用枠の例 |
| --- | --- | --- | --- |
| [Auto](https://cursor.com/help/models-and-usage/available-models) | 毎回候補を選ぶ手間を減らしたいとき。日常作業から始め、結果を見て手動選択に切り替える | 常に同じモデルが使われるわけではありません。Teams／EnterpriseのCursor Routerでは、選ばれたモデルに応じて利用枠と料金が変わります | 選ばれたモデルによる |
| [Composer 2.5](https://cursor.com/docs/models/cursor-composer-2-5) | 会話しながら進める実装、反復的な修正、普段のAgent作業。Cursorが高速・コスト効率を重視して案内するモデルです | 複雑な設計や長い作業で行き詰まったら、依頼を分割するか別モデルを試します | Cursor Models |
| [Claude Sonnet 5.5](https://cursor.com/docs/models/claude-sonnet-5-5) | 対象範囲のはっきりしたバグ修正や小さな機能追加など、品質と消費量のバランスを取りたい作業 | より高い思考設定はトークン消費が増えます。難所の最高品質を優先する用途とは分けます | Other Models |
| [Gemini 3.8 Flash](https://cursor.com/docs/models/gemini-3-8-flash) | 大きめのコードベースを扱う作業や、速さと低いトークン単価を重視する反復作業。長いコンテキストにも対応します | 読み込ませる範囲が広いほど、実際の総消費量も増えます | Other Models |
| [Muse Spark 1.3](https://cursor.com/docs/models/muse-spark-1-3) | 多段階のデバッグ、長いツール操作、大規模リポジトリを扱うAgent作業 | 高い思考設定ほどトークンを多く使います。Teams／Enterpriseでは管理者によるMetaモデルの有効化が必要な場合があります | Other Models |
| [Grok 4.7](https://cursor.com/docs/models/grok-4-7) | 難しい実装や、時間のかかるAgent作業。長い作業を続け、結果を自己確認する用途 | 日常の軽作業すべてに固定する必要はありません。長文脈の利用条件はモデル設定と料金表で確認します | Cursor Models |
| [Claude Opus 5.5](https://cursor.com/docs/models/claude-opus-5-5) | 複雑な設計、UI実装、長いAgent作業、複数の作業をまとめる判断 | SonnetやComposerより利用枠を早く消費しやすいため、難所に絞ると扱いやすくなります | Other Models |
| [GPT-5.6 Sol](https://cursor.com/docs/models/gpt-5-6-sol) | 複雑なコーディングや推論、計画・デバッグ、長時間のAgent作業 | GPT-5.6の他モデルや日常向け候補よりトークン単価が高めです | Other Models |
| [Claude Fable 5.1](https://cursor.com/docs/models/claude-fable-5-1) | 途中確認を少なくして進めたい、長時間の自律的な多段階作業 | 高単価です。Anthropicによる入力・出力の保持条件があり、Privacy Mode利用時や組織利用では事前承認が必要になる場合があります | Other Models |

モデル名と利用枠の区分は、[CursorのModels & Pricing](https://cursor.com/docs/models-and-pricing)に基づいています。作業別の使い分けは公式のモデル説明をもとにした目安です。コードの変更範囲や指示の出し方によって結果は変わるため、最初から単一の「最強モデル」を決める必要はありません。

Claude Fable 5.1には個別のデータ保持条件があります。Anthropicは安全性確認のため入力・出力を保持し、原則30日後に削除すると案内しています。Privacy Mode利用時やEnterpriseでは、モデルを使う前に管理画面での承認が必要になる場合があります。ソースコードを送る前に[Cursorのデータ保持条件](https://cursor.com/docs/enterprise/privacy-and-data-governance)を確認してください。

設定画面でモデルを有効にすると、チャットやAgentの選択候補に表示されます。次の画像はProアカウントのSettings画面例で、Freeの固定モデルの表示状態を示すものではありません。候補や有効・無効はプランやチーム設定で異なります。

![Cursor SettingsのModels画面に表示されたモデル一覧と有効・無効のトグル例。](models-enabled-example.png)

## Free・有料プラン・Cursor Routerの違い

Freeのモデル仕様は変わっています。Cursorサポートの回答では、自分のAPIキーを使わないFreeアカウントはCursor Grok 4.6 Mediumに固定され、Autoや他モデルを選べません。以前の「FreeはAutoのみ」という説明は現行仕様ではありません。[Cursorサポートの回答](https://forum.cursor.com/t/free-after-pro-model-picker-locked-to-grok-4-6-medium-cannot-select-auto/171805)では、ProからFreeへ切り替えた場合もこの表示が現在の仕様と説明されています。

一方、[Available Modelsのヘルプ](https://cursor.com/help/models-and-usage/available-models)は「Hobbyでは選択肢が少ない」と案内するものの、固定モデル名までは記していません。Freeの具体的なモデル名は上記のサポート回答に基づいています。アカウントやアプリの表示が異なる場合は、現在のモデルピッカーとプラン画面を確認してください。

有料プランでは、プランやアカウント設定に応じてAutoまたは個別モデルを選べます。プランや提供地域によって条件が異なるため、契約前には[最新のプラン・モデル条件](https://cursor.com/docs/models-and-pricing)も確認してください。**Autoはモデルピッカー上の選択肢、Cursor RouterはTeams／Enterprise向けのルーティング機能**です。Cursor RouterはTeamsでは既定で有効、Enterpriseでは管理者が有効化します。RouterのAutoではCost・Balance・Intelligenceの最適化モードを選べます。実際に使われるモデルはリクエストごとに異なり、モデルごとの料金が適用されます。[Cursor Routerの仕様](https://cursor.com/docs/cursor-router)

Cursorの候補にない外部モデルを接続したい場合は、[DeepSeekをCursorで使う設定手順](/blog/deepseek-cursor-setup)を確認できます。標準モデルのKimi K3を有効にする設定例は、[CursorでKimi K3を使う方法](/blog/kimi-k3-cursor-guide)にまとめています。

## 利用枠と追加料金を確認する

Proなど対象プランでは、利用状況がCursor ModelsとOther Modelsのプールに分かれて表示されます。Composer 2.5やGrok系はCursor Models、Claude・Gemini・GPT・Museなどの他社モデルはOther Modelsが目安です。プランによって含まれる枠は異なり、Autoでも実際に選ばれたモデルに応じて利用プールが変わります。[利用枠の説明](https://cursor.com/help/models-and-usage/usage-limits)

以下はProアカウントのPlan & Usage画面例です。画面内の使用率はそのアカウントの利用状況であり、すべてのPro契約に共通する上限や割合ではありません。

![Cursor ProのPlan & Usage画面でCursor ModelsとOther Modelsの利用状況を示す例。](usage-pools-pro-example.png)

含まれる利用枠を超えた後の扱いは、オンデマンド利用の設定やプランで変わります。追加利用を有効にしている場合は、モデルごとの単価で追加費用が発生することがあります。常にオンデマンドを有効または無効にするのではなく、Plan & Usage画面で各プールの残量、オンデマンド設定、必要なら上限額を確認してから選んでください。[オンデマンド利用と超過時の扱い](https://cursor.com/help/account-and-billing/overages)

自分のAPIキーを使う場合は、個人プランでは通常、利用料を各プロバイダーへ直接支払います。Teams／EnterpriseではCursor Token Rateが別途加算されます。[BYOK利用時の料金と利用枠](https://cursor.com/help/models-and-usage/usage-limits)を確認し、Cursorの利用枠とAPI提供元の請求先を分けてください。

## 迷ったときの切り替え方

次の順で試すと、モデル名を片端から選び直さずに済みます。

1. Autoが選べる場合はAuto、選べない場合はComposer 2.5で普段の実装を始めます。
2. 修正範囲が明確な作業ではSonnet 5.5、大きなコードベースを扱う作業ではGemini 3.8 FlashまたはMuse Spark 1.3を試します。
3. 設計や判断で詰まったときはOpus 5.5またはGPT-5.6 Sol、難しい長時間のAgent作業ではGrok 4.7を候補にします。
4. Fable 5.1を使う場合は、費用とデータ保持条件を先に確認します。
5. 生成された変更を確認し、利用枠の減り方も見て、普段使いの候補を決めます。

毎日使うモデルと、難所で使うモデルを分けておくと選びやすくなります。モデルの優劣を一般化せず、自分の作業とプランに合う組み合わせを選んでください。

## よくある質問

### SettingsでONにしたのに、モデル選択欄に出ないのはなぜですか？

モデル設定のトグルは、そのアカウントやチームで候補を有効にする設定です。プランの対象外だったり、チーム管理者が利用を制限していたりすると、ONにしてもモデル選択欄に出ないことがあります。現在のプランとチームのモデルアクセス設定も確認してください。

### Freeから有料プランに変えると、モデル選択欄も変わりますか？

Cursorサポートの案内では、Proなどの対象プランへ変更すると選択欄が切り替わります。表示されるモデルは契約プランやチーム設定によるため、アップグレード後にモデルピッカーを確認してください。

迷ったときは、目の前の作業を表の候補に当てはめて1つ試し、生成された変更と利用枠を見て次回の既定を決めます。

Cursorのモデル選びに加えて、生成AI全般の活用方法を基礎から学びたい方は、[AIスキルアカデミーの無料セミナーを見る](affiliate:ai-skill-academy:text-main:cta)こともできます。

---

本記事は執筆時点（2026年10月7日）のCursor公式ドキュメント、Cursorサポートフォーラムの回答、およびProアカウント画面をもとにしています。モデルの提供状況、プラン条件、料金、利用枠は変更される場合があります。Freeのモデル名はサポート回答、モデル設定と使用率は個別アカウントの画面例に基づくため、重要な判断はCursorの最新表示と公式情報で確認してください。おすすめ用途はモデルの公式説明をもとにした目安で、特定のコードベースにおける性能を保証するものではありません。
