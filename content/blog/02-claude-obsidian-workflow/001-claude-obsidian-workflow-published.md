---
title: Obsidianで素材整理 → Claudeで記事生成 → Cursorで公開するブログ制作ワークフロー
slug: obsidian-claude-article-workflow
tags:
  - obsidian
  - claude
  - ai-writing
  - blog
  - workflow
  - markdown
  - cursor
  - chatgpt
  - claude-obsidian-workflow-series
description: ObsidianとClaudeを使ったブログ記事制作の実践ワークフローを紹介。source.md・captions.mdで素材を整理してからClaudeへ渡す方法、Cursorでのページ化まで、初心者が再現できる実運用ベースの手順をまとめています。本記事はClaude + Obsidian Workflowシリーズの入口（Hub）です。
date: 2026-05-21
last_update: 2026-06-17
status: published
---

# Obsidianで素材整理 → Claudeで記事生成 → Cursorで公開するブログ制作ワークフロー

---

## 導入

「Claudeに記事を書かせたら、なんかぼんやりした内容になった。」

最初にAIで記事を書こうとしたとき、正直そう感じた。

文章のクオリティが低いわけではない。でも、自分が書きたかった内容とどこか違う。伝えたかった体験や感情が薄まっている。AIが文章を「作ってくれている」のに、なぜかそのまま使えない。

しばらくそのループを繰り返してから、ようやく気づいた。**問題はClaudeではなく、自分がAIへ渡していた素材の質だった。**

渡す前の整理が甘ければ、出力も甘くなる。当たり前といえば当たり前なのだが、実際にやってみるまで気づかなかった。

この記事では、その気づきをベースに構築した実運用ワークフローを紹介する。使っているのは無料Web版のClaudeで、有料プランは不要だ。Obsidianを持っていない人でも、メモアプリとMarkdownファイルがあれば同じ考え方を再現できる。

---

## はじめに：AIに記事を書かせようとして、最初は失敗した

最初にやってしまった失敗は、Obsidianに書き溜めたdaily notesをそのままコピペしてClaudeへ投げることだった。

結果として出てきた記事は、構成がバラバラだった。時系列で書いた作業ログが、そのまま記事になってしまっている。読者にとって重要な「なぜ詰まったか」「どう解決したか」という部分が薄く、どうでもいい作業メモが前に出てくる。

「AIが書いたっぽい記事」というやつだ。

何度か試してようやく気づいた。AIは整理されていない素材から、勝手に「重要なこと」を判断してくれるわけではない。**何が重要かを整理するのは、人間側の役割だった。**

この気づきが、今のワークフローの出発点になっている。

全体のフローはこうなっている。

```text
daily notes（作業ログ）
　↓
source.md（素材整理）
　↓
screenshots整理（raw / public）
　↓
captions.md（画像の意図を言語化）
　↓
Claudeへ段階投入
　↓
構成生成 → 本文生成
　↓
人間レビュー
　↓
published.md完成
　↓
CursorでWeb実装
　↓
GitHub PR → Vercel公開
```

---

## 使用ツールと全体フロー

### そもそもObsidianとは？（知らない人向けに一言）

Obsidianは、ローカルで動くMarkdownメモアプリだ。ファイルはすべて自分のPC上に保存される。クラウドに依存しないため、動作が速く、データの管理も自分でできる。

AIとの相性が良い理由は、Markdownで書けること。書いたメモをそのままClaudeへコピペして渡せるため、フォーマット変換の手間がない。

Obsidianを使っていない人でも、メモアプリとMarkdownファイルが使えれば同じ考え方は再現できる。ツールよりも「整理の発想」が重要だ。

### 使用ツール一覧

| ツール              | 用途                            |
| ------------------- | ------------------------------- |
| Obsidian            | ログ整理・記事素材管理          |
| Claude（無料Web版） | 構成生成・記事生成              |
| Cursor              | Webページ実装                   |
| ChatGPT             | 構成相談・SEO・ワークフロー改善 |
| GitHub              | バージョン管理                  |
| Vercel              | デプロイ・公開                  |

### コストについて

このワークフローで使うClaudeは**無料のWeb版で十分だ**。有料プランが不要な理由は後述するが、source.mdで素材を整理してから渡すことで情報量が最適化され、無料版でも精度の高い出力が得られる。

---

## STEP 1：Obsidian daily notesで作業ログを残す

> 所要時間の目安：作業のたびに5〜10分

### daily notesに書いていた具体的な内容

Obsidianのdaily notesには、その日の作業内容をざっくり記録していた。

- 実装した内容
- 発生したエラーと解決方法
- AIへの質問と回答
- 詰まった箇所
- そのときの感情メモ

ポイントは「完璧に書こうとしない」こと。箇条書きでもいい。感情が入った一言でもいい。後から記事にするとき、この断片がかなり重要な素材になる。

![[01-example-daily-note.png]]

### 記録が途切れたときに何が起きたか

正直に言うと、daily notesを書けない日が何度もあった。

ChatGPTとのやり取りに集中してしまうと、Obsidianへ戻る余裕がなくなる。「後で書けばいい」と思っているうちに、その日の作業内容を忘れてしまう。

後から記事化しようとしたとき、「何をしたか」「どこで詰まったか」が思い出せなくなった。記事の素材がない状態でClaudeへ渡しても、薄い内容しか出てこない。

**AI時代でも、素材を残すのは人間側の役割だ。** これはやってみて初めて実感した。daily notesの続け方は[Obsidian daily notesを書かない日が続いて、記事が作れなくなった](/blog/obsidian-daily-notes-workflow)でも詳しく書いている。

---

## STEP 2：source.md で記事素材を整理する

> 所要時間の目安：1時間程度

### daily notesをそのまま投げると何が起きるか

daily notesをそのままClaudeへ渡したとき、出てくる記事の問題点はおもに3つだった。

- 文脈が飛ぶ（なぜその作業をしたか伝わらない）
- 記事構成が弱い（重要なことと些細なことが混在する）
- 重要箇所が埋もれる（読者に届けたい学びが薄まる）

daily notesは時系列のログであって、記事の構造とは根本的に違う。Claude側で整理しきれない場面がどうしても出てくる。

### source.mdに書く6項目

そこで、記事テーマごとにsource.mdを作成し、人間側で整理してからClaudeへ渡すようにした。

書く内容はシンプルだ。

1. **目的**：この記事で何を伝えたいか
2. **作業内容**：実際に何をやったか
3. **問題**：何が起きたか・どこで詰まったか
4. **原因**：なぜそうなったか
5. **解決**：どう解決したか
6. **学び**：何を学んだか・何に気づいたか

### daily notesとsource.mdの違い

- daily notes＝時系列ログ（記録のため）
- source.md＝記事素材（AIへ渡すため）

この「変換作業」に1時間かかるが、ここを丁寧にやるかどうかで記事の精度がかなり変わった。

### 実際のsource.md記載例（抜粋）

![[02-example-source-claude.png]]

実際にはこのような形式で書いている。

```text
## DNS設定で苦戦した話

### 目的
ドメインをVercelへ向けるためにDNS設定をした

### 作業内容
ドメイン側でAレコードとCNAMEを設定した

### 問題
翌朝になってもDNS invalid のまま変わらなかった

### 原因
ドメイン側のネームサーバー設定が未設定だった

### 解決
ドメイン側のネームサーバーを設定した

### 学び
ドメイン側でDNSレコードの設定と、ネームサーバーの設定が必要だと理解した
DNS設定は即時反映されないため、焦らず待つことも必要だとわかった
```

**AIに全部考えさせるより、人間側で「何が重要か」を整理した方が強い。** source.mdを作るようになってから、Claudeの記事構成力と文脈のつながりが明らかに改善した。source.mdが効く理由は[source.md運用が記事生成AIと相性が良い理由【実運用Tips】](/blog/source-md-tips)にまとめている。

---

## STEP 3：screenshotsをraw / publicで分けて管理する

> 所要時間の目安：画像1枚あたり2〜3分

### screenshots管理で失敗したこと

最初はスクリーンショットをそのままフォルダへ保存していた。後から「この画像、公開して大丈夫か？」と確認する手間が発生して、作業が止まることがあった。

公開時の個人情報リスクを、最初は十分に考えられていなかった。

### raw / publicの分け方

今はフォルダを2つに分けて管理している。

```text
screenshots/
  raw/        ← 編集前。個人情報含む可能性あり
  public/     ← 公開用。不要情報を削除済み
```

rawには作業中のスクリーンショットをそのまま保存する。publicへ移すタイミングで、個人情報・内部URLなど公開に向かない情報を確認・削除する。

この判断にはChatGPTを使ったりしている。画像をそのまま添付して「この画像は公開して問題ないか」と聞くと、含まれている情報をかなり細かく確認してくれる。

![[05-qestion-imagefile-privacy.png]]

文章だけでなく画像も読み込んでくれるため、チェック精度が高くて驚いた。「文章でないといけない」と思い込んでいたが、画像を添付した方が回答精度が高い場面は多い。

---

## STEP 4：captions.md で画像の意図を言語化する

> 所要時間の目安：画像1枚あたり5分程度

### screenshotsだけではClaudeへ伝わらなかった

画像をそのままClaudeへ渡しても、「何のために使うか」が伝わらないことがあった。

Claudeは画像の内容は読める。でも「この画像をどのセクションのどの文脈で使いたいか」「この画像に込めた感情は何か」までは、画像単体では伝わらない。

そこでcaptions.mdを作ることにした。

### captions.mdに書く5項目

- 画像内容（何が写っているか）
- 何を説明したいか
- 記事内用途（どのセクションで使うか）
- 感情（その場面でどう感じていたか）
- 推奨配置（どの見出しの直後か）

### 実際のcaptions.md記載例

![[06-example-caption.png]]

```text
- DNS invalid画面
- 「翌朝もinvalidだった」文脈で使用
- 感情：肩が落ちた
- H2「DNS設定で苦戦した話」の直後に配置
```

captions.mdを追加してから、Claudeが画像の意図・感情・配置まで理解した上で記事を構成してくれるようになった。**画像だけではなく、「画像の意味」を整理することが重要だった。** 詳しい書き方は[captions.mdを作るとAI記事生成の精度が上がる【実運用Tips】](/blog/captions-md-tips)で解説している。

---

## STEP 5：Claudeへ渡す順番が大事だった

> 所要時間の目安：構成確認含め30〜60分

### 最初から全部投げると何が起きるか

source.md・captions.md・screenshots・daily notesをまとめて一気に投げたとき、出てきた記事はこんな状態だった。

- 重要ではない作業ログが記事の中心になっている
- 感情メモがそのまま本文に混入している
- 「なんか長いだけで読みにくい」仕上がりになっている

情報量が多いほど良いと思い込んでいたが、Claudeは情報量が多すぎると重要度の判断が不安定になる。**優先度を人間側が整理してから渡す必要があった。**

### 4段階の投入手順

今は以下の順番で段階的に渡している。

```text
STEP 1：source.mdのみ投入 → 記事構成を生成させる
　↓
STEP 2：構成を確認・修正 → そのまま本文生成
　↓
STEP 3：captions.mdを追加 → 画像用途を補強
　↓
STEP 4：screenshots/publicを追加 → 必要画像を補完
```

![[07-prompt-claude-source-caption.png]]

実際にはsource.mdのみで記事構成・本文を作成した後、captions.mdと画像データを追加している。source.mdやcaptions.mdは自分で作成しているため、記事全体のイメージがある程度できあがっている。Claudeの出力がそのイメージと合致する部分が多く、ほとんど手直しせずに次の工程へ移れた。

---

## STEP 6：Claude生成後は必ず人間がレビューする

AI生成をそのまま公開することはしていない。

Claudeが出力した記事には、必ず以下の観点でレビューを入れる。

- **感情の薄い箇所に感情を足す**：「詰まった」「驚いた」などの実感が抜けやすい
- **読みにくい箇所を修正する**：文が長くなりすぎているところを分割する
- **導入文を書き直す**：AIが書く導入は少し説明的になりすぎることが多い
- **SEO微調整**：キーワードの出現箇所や見出しの言葉を調整する

**AIは強力だが、最終的な「人間味」は自分で調整した方が良い。** これはAIへの不信感ではなく、記事の主語が自分である以上、最後の仕上げは自分でやるべきだという感覚からきている。レビューで見落としやすい誤記の確認手順は[Claude初稿はCursorに渡す前に目視確認する——誤記を防ぐ4点チェック](/blog/claude-draft-review-before-publish)にまとめている。

---

## STEP 7：CursorでWeb記事化 → GitHub → Vercel公開

### 実際の公開フロー

Claudeで完成したpublished.mdをCursorへ渡して、ブログページを作成する。

```text
published.md完成
　↓
Cursorへ投入
　↓
markdown表示 / slug設定 / blog route対応
　↓
Git feature branch作成
　↓
PR → Vercel deploy
　↓
公開
```

下の画面は、同じ `published.md` から Cursor が実際に組み立てたブログ記事ページだ。

![Cursorで実装した当該記事のブログページ](08-cursor-create-webpage.png)

Claudeで記事を作成するまではじっくりと作業していたが、CursorでのWebページ作成はさくっと完了した。早くできあがりすぎて、逆に不安になるくらいだった。

### ObsidianとWeb側のフォルダ構成

```text
【Obsidian側】
09_article-source/
  02-claude-obsidian-workflow/
    source.md
    captions.md
    screenshots/
      raw/
      public/
    drafts/
    published/

【Web側】
content/blog/
  02-claude-obsidian-workflow/

public/images/blog/
  02-claude-obsidian-workflow/
```

### Git運用で気をつけること（初心者向け）

最初はmainブランチを直接修正していた。エラーは起きなかったが、途中からfeature branch運用に変更した。

mainを直接修正し続けると、こういったリスクがある。

- 「この変更やっぱり取り消したい」となったときに戻しにくい
- 複数の変更を同時にmainへ入れると、Vercelのビルドが壊れたときにどの変更が原因か特定しにくい
- 本番が壊れたまま調査することになる

自分は幸いエラーは出なかったが、feature branch運用に変えてから安全に作業できている感覚がある。AI開発でもGit管理はかなり重要だ。

---

## やってみてわかったこと：AI記事制作の本質は「素材整理」

AI時代の記事制作は、「AIが全部書く」というより「人間が素材を整理してAIへ渡す」という作業だと実感した。

特に以下の3つが、記事品質に大きく影響した。

- **source.md**：何が重要かを人間側が整理する
- **screenshots**：raw / publicで安全に管理する
- **captions.md**：画像の意図・感情・配置を言語化する

この3つを整えてからClaudeへ渡すと、出力の精度がかなり変わる。逆にこれらが甘いと、どれだけClaudeが優秀でも記事はぼんやりする。

**AIは補助であり、整理するのは人間側だ。** それを実運用を通じて実感できたことが、このワークフローを構築した一番の収穫だった。

---

## 今後改善したいこと

このワークフローは完璧ではない。現時点で改善したいと感じている点を正直に書いておく。

- screenshots の命名ルールが統一できていない
- captions.md のテンプレートを作って毎回一から書かなくて済むようにしたい
- source.md のテンプレートも整備したい
- SEOチェックのプロセスをもう少し体系化したい
- Claudeへの入力テンプレートを改善して、投入の手間を減らしたい

完璧なワークフローを最初から目指さなくても良い。試しながら少しずつ改善していく方が、実際には続けられる。

---

## このシリーズで読む順番

このワークフローの各ステップは、個別の実践Tipsとして記事化しています。気になる工程から読み進めてください。

| 順 | カテゴリ | 記事 |
|----|----------|------|
| 1 | 素材整理 | [captions.mdを追加したらClaudeの記事精度が改善した話](/blog/captions-md-workflow) |
| 2 | 素材整理 | [captions.mdを作るとAI記事生成の精度が上がる【実運用Tips】](/blog/captions-md-tips) |
| 3 | 素材整理 | [AIにスクショ＋キャプションを渡すと精度が上がる理由【実運用Tips】](/blog/ai-screenshot-caption-tips) |
| 4 | 素材整理 | [source.md運用が記事生成AIと相性が良い理由【実運用Tips】](/blog/source-md-tips) |
| 5 | レビュー | [Claude初稿はCursorに渡す前に目視確認する——誤記を防ぐ4点チェック](/blog/claude-draft-review-before-publish) |
| 6 | DailyNote運用 | [Obsidian daily notesを書かない日が続いて、記事が作れなくなった](/blog/obsidian-daily-notes-workflow) |
| 7 | DailyNote運用 | [ObsidianのDaily NotesをAIログ化する最小手順【3ブロック構成】](/blog/obsidian-daily-notes-ai-log) |
| 8 | Obsidian操作 | [Obsidianの3モード使い分け｜Live PreviewとSourceを切り替える基本](/blog/obsidian-mode-live-preview-source) |
| 9 | DailyNote運用 | [DailyNoteをcontext圧縮装置として使う理由【AI運用Tips】](/blog/dailynote-context-compression) |
| 10 | DailyNote運用 | [DailyNote→AI-log→source.mdの読み込み順を固定する理由【AI運用Tips】](/blog/dailynote-ai-log-source-reading-order) |
| 11 | AI設計 | [「重複は無駄」はAIに通じない——docs設計で意図的に繰り返す理由](/blog/ai-docs-duplication-tips) |
| 12 | Obsidian操作 | [Dashboard.mdを3〜10件フォーカスで回す日次運用【Obsidian Tips】](/blog/obsidian-dashboard-focus-tips) |
| 13 | Obsidian操作 | [Obsidianでチェックボックスを作るショートカット(Ctrl+L)の使い方](/blog/obsidian-checkbox-shortcut-ctrl-l) |

---

## まとめ：AIへ丸投げしない記事制作ワークフロー

このワークフローを一言でまとめると、「整理してから渡す」だ。

```text
daily notes → source.md → screenshots → captions.md → Claude → レビュー → Cursor → 公開
```

AIへ何を渡すかより、渡す前に何を整理するかの方がずっと重要だった。

もしこの記事を読んで「試してみようかな」と思ったら、まずsource.mdを1つ作るところから始めてほしい。フォーマットはシンプルで良い。目的・問題・原因・解決・学び、この5つを書くだけでも、Claudeへ渡したときの出力が変わってくるはずだ。

Obsidianを使っていなくても、メモアプリとMarkdownファイルがあれば同じ考え方は再現できる。ツールよりも発想が大事だ。

AIとうまくやっていくコツは、AIを過信しないことと、自分側の準備をさぼらないことだと思っている。

---

_この記事は、実際に公開したワークフローの実践記録をもとに作成しました。_
