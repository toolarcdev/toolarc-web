# AI初心者がゼロからWebサイトを公開するまでにやったこと・詰まったこと全部まとめ

---

## はじめに

「AIを使えばプログラミング初心者でもWebサイトが作れる」という話を聞いたことがある人は多いと思う。でも実際のところ、どこまでできて、どこで詰まるのか、リアルな話はあまり出回っていない。

この記事は、Next.jsもReactもDNSもほぼ知らない状態から、AIツールを頼りながら実際にWebサイトを公開するまでの記録だ。うまくいったことだけじゃなく、何時間も悩んで、翌日も解決せずに肩が落ちた瞬間も正直に書いている。

「自分にもできるかな」と思っている人に、少しでもリアルな参考になれば嬉しい。

---

## この記事で分かること

- AI初心者・Next.js初心者がWebサイト公開に至るまでの全体の流れ
- Cursor / Claude / ChatGPTの実際の使い分け方
- GitHubやVercelで初心者が詰まりやすいポイント
- DNS設定で丸1日以上ハマった実体験と解決策
- AIをうまく活用するために大切な「質問力」と「ログ管理」の話

---

## このサイトを作った背景

### 「AIで個人開発」に興味を持ったきっかけ

AI時代の個人開発に興味があった。特に「初心者でもAIを使えばどこまでできるのか」を、話で聞くだけじゃなく自分で試してみたかった。

このサイトでは、AIを活用したWebサイトの作り方、公開までに苦労したこと、その他便利なツールの情報を、読者の役に立つ形でまとめていく。

### 開発前のスキル感（正直に書く）

出発点はこんな感じだった。

- Next.js：初心者
- React：知識ほぼなし
- DNS：理解ほぼなし
- Cloudflare・Vercel：未経験
- Git / GitHub：少し触ったことがある程度
- HTML / CSS：少しだけ触れたことがある

「本当に公開まで辿り着けるのか」「エラーが出たときに自分で解決できるのか」——そういう不安を抱えたままスタートした。

---

## 現在のサイト状態

今の **ToolArc** は最小構成だ。タイトル、説明文、GitHubリンク、Coming Soonのテキストが並ぶシンプルなTOPページのみ。

最初から完璧なものを作ろうとするのではなく、「とにかく公開する」を最優先にした。まず動くものを世に出して、そこから育てていく方針で進めている。ブログ機能の追加やツールの実装はこれからだ。

---

## 使ったツールと役割分担

### AIツール3種の使い分け（Cursor / Claude / ChatGPT）

今回の開発で使ったAIツールは3種類。それぞれ得意なことが違う。

| ツール | 主な使い方 |
|--------|------------|
| **Cursor**（無料版） | コード生成・UI修正・Next.js実装 |
| **Claude**（無料Web版） | 長文整理・記事構成・ログ整理 |
| **ChatGPT** | SEO・用語の解説・構成相談・ワークフロー改善 |

正直、最初はどれを使えばいいか分からなかった。使いながら徐々に「この作業はChatGPTに聞く」「コードを書くときはCursor」という感覚が掴めてきた。まだ完全に整理できているわけではないが、各AIの特徴を理解しているだけでもかなり違う。

### インフラ・開発ツール一覧

- 開発環境：VSCode、Next.js、GitHub、Vercel
- ドメイン・インフラ：Xserver Domain、Cloudflare
- 記録・管理：Obsidian

---

## 開発の流れをざっくり振り返る

### Cursor導入〜最小TOPページ作成

Cursorを導入して最初に驚いたのは、自然言語でコードを指示できることだ。「こういうページを作って」と伝えると、AIが実際にコードを書いてくれる。

これまでは「HTMLのこのパーツを学んで、CSSのこれを学んで……」という積み上げ方しか知らなかった。でもCursorを使うと、ある程度の完成形を先に作ってもらって、「このコードはどういう構造になっているのか」を後から学べる。学習の順番が逆になる感じで、これが思いのほか効率がよかった。

TOPページは最小限に絞った。タイトル、説明文、GitHubリンク、Coming Soonだけ。完璧を目指さず、まず公開することを優先した判断は正解だったと思う。

![ローカル環境でTOPページの表示に成功した画面](/images/blog/site-launch/01-success-webpage.png)
*▲ ChatGPTと一緒に作った最小限のTOPページ。ローカルで無事に表示されたときは、素直に安心した。*

### GitHubへの連携でちょっと詰まる

Git操作にはあまり慣れていなかったので、commitやpushの概念で少し混乱した。「保存」とは違う感覚が最初はピンとこなかった。

ここはChatGPTにかなり助けてもらった。「commitって何をしてるの？」「pushのタイミングはいつ？」といった初歩的な質問にも丁寧に答えてくれて、少しずつ流れが掴めてきた。

### Vercelで初デプロイ——感動した瞬間

GitHubと連携してVercelにデプロイするのは、思ったよりスムーズだった。リポジトリを繋いでボタンを押すと、数分で公開URLが発行される。

CursorでTOPページを少し改善して、変更したファイルをGitHubにcommit・pushして、Vercelがデプロイを完了して——実際にブラウザでページの内容が変わったのを見た瞬間は、本当に感動した。「本当に公開できるんだ」という実感が、画面越しに伝わってきた。

ただ、Production / Deploy / Buildの概念の違いは最初よく分からなかった。なんとなく動かせているが、理解が追いついていない感覚は少しあった。

---

## Vercelで再デプロイできなくなった話

### 過去アカウントの紐づきが原因だった

実は以前、GitHubやVercelを使ったことがあった。その残っていたアカウントデータが紐づいてしまい、Vercelで再デプロイができなくなるという問題が発生した。

設定が正しいはずなのに動かない、という状況は初心者には特にキツい。「自分が何かを間違えているのか」「そもそもの仕組みの問題なのか」が判断できないからだ。

症状としては、新しく作ったつもりのVercelアカウントが、以前のアカウントに紐づくTeamアカウントとして認識されてしまい、redeployボタンが使えなくなっていた。ChatGPTに相談しても「Personalアカウントの設定を確認して」というアドバイスばかり来るのに、当のVercel画面にはPersonalという表記自体が見当たらない。調べても解決策が見つからず、かなり不安だった。

![Vercelのredeployエラー画面](/images/blog/site-launch/07-error-vercel-redeploy.png)
*▲ 「Hobby teams do not support collaboration」と表示され、redeployができない状態。Personalのはずが、なぜかTeamアカウント扱いになっていた。*

### 解決策：アカウント削除→再作成→再連携

試行錯誤の末、以下の手順で解決した。

1. GitHub・Vercelのアカウントを一度削除
2. 両方のアカウントを新規作成
3. GitHubとVercelを改めて連携
4. Vercel上に残っていた旧プロジェクトデータを削除
5. GitHubから再importして再設定

手順としてはシンプルだが、「アカウントを削除する」という判断は初心者には怖い。同じ状況で困っている人がいたら、この手順で解決できるかもしれないので参考にしてほしい。

---

## 一番苦戦したのはDNS設定だった

### 「invalid」が続いて不安になった

Cloudflareの設定を終えて、Vercelに独自ドメイン（toolarc.jp）を設定した。ドメイン側（Xserver Domain）にはAレコードとCNAMEレコードを追加して、あとはDNSが反映されれば公開完了のはずだった。

![xdomainのDNSレコード設定画面](/images/blog/site-launch/02-setting-xdomain-A-CNAME.png)
*▲ ドメイン側のDNSレコード設定。AレコードとCNAMEの2つを追加しただけで本当に動くのか、正直不安だった。*

でも、Vercel上のDNS認識がずっと「invalid」のままだった。

![Vercelがinvalidを示しているエラー画面](/images/blog/site-launch/04-error-vercel-invalid.png)
*▲ toolarc.jpもwww.toolarc.jpも「Invalid Configuration」のまま。この状態が半日以上続いた。*

「設定が間違っているのか」「それとも反映待ちなのか」——この2択が分からないのが一番つらかった。設定ミスなら直さないといけない。でも反映待ちなら下手に触るとまた時間がかかる。ChatGPTに何度も「まだinvalidなんだけど」と送るたびに、「まだ待て」と返ってきた。

「待て」と言われても、本当に待っていいのかが分からない。自分の判断に自信が持てない状態で待ち続けるのは、思ったより精神的に消耗した。

### 翌日もinvalidで肩が落ちた

結局その日は解決できないまま就寝した。

翌朝、恐る恐る確認すると——まだinvalidだった。

正直、肩が落ちた。「やっぱり何か間違えているのかもしれない」と思い、改めてChatGPTに状況を整理して相談した。

### 原因はネームサーバー設定の未設定だった

ChatGPTとやり取りしながら設定を一つひとつ確認していくと、ドメイン側の「ネームサーバー設定」が未設定のままだったことが分かった。

Cloudflareの設定はしていたが、ドメインレジストラ（Xserver Domain）側のネームサーバーを正しく変更する手順が抜けていたのだ。「確かに未設定だったけど、ここだけで直るのか？」と半信半疑で設定した。

![xdomainのネームサーバー設定画面](/images/blog/site-launch/05-setting-xdomain-nameserver.png)
*▲ xdomain側のネームサーバー設定。ns1〜ns3.xdomain.ne.jpへの変更が未設定だった。これが原因のすべてだった。*

正しく設定したところ、数分後にはVercelのステータスが「valid」に変わり、toolarc.jpが無事に公開された。

![Vercelがvalidになった画面](/images/blog/site-launch/06-solved-vercel-dns.png)
*▲ toolarc.jpもwww.toolarc.jpも無事にValid Configuration＋SSL証明書の生成へ。半日以上ずっと見ていたエラーが消えた瞬間は、本当に安心した。*

あれだけ悩んでいた問題が、原因が分かってしまえば数分で解決した。ただ、「設定ミスなのか反映待ちなのか」が判断できない状態で待ち続けた時間は、今も鮮明に覚えている。同じような DNS トラブルは、[Vercelでdomain invalidが直らず苦戦した話](/blog/vercel-domain-invalid-nameserver)や[Vercel独自ドメイン接続で詰まりやすいポイント5選【DNS設定完全チェック】](/blog/vercel-domain-connection-tips)でも手順を整理している。

### 補足：開発PCのDNS設定について

Cloudflare導入にあわせて、自分のPCのDNSサーバーも手動で設定した（優先DNS: 1.1.1.1 / 代替DNS: 1.0.0.1）。

![PCのDNS設定後の確認画面](/images/blog/site-launch/03-setting-cloudflare-devPC-dns.png)
![PCのDNS設定内容の編集画面](/images/blog/site-launch/03-devPC-dns-setting-cloudflare2.png)
*▲ 開発PCのDNSサーバーをCloudflareのアドレスに手動設定した。固定値として入れる手順なのは理解できたが、「なぜこれが必要なのか」を完全に理解できていたわけではなく、知識的な不安は残った。*

---

## AIを使って感じたこと

### 良かったこと

- 作業スピードが明らかに上がる
- 初心者でも詰まりながらも前進し続けられる
- エラーの原因究明と解決の補助が強い
- 作りながら学べるので、理解が実感として積み上がっていく

### 難しかったこと

AIを使えば何でも解決するかというと、そうではなかった。

**AIの説明が理解できない時がある。** 用語が分からないまま回答が来ることがある。そういうときは、分からない部分だけを切り取って「これはどういう意味？」と聞き直すと解決できることが多かった。

**AIごとに得意分野が違う。** 最初はどのAIに何を聞けばいいか分からず、全部ChatGPTに投げていた。使い込んでいくうちに「コードはCursor」「長文整理はClaude」「SEOや構成相談はChatGPT」という役割が自然と決まってきた。分担ルールを文章にまとめたのが[ChatGPT・Cursor・Claudeの役割分担｜AIツールを使い分けるだけで品質が安定する](/blog/chatgpt-cursor-claude-role-sharing-tips)だ。

**指示が曖昧だと欲しい答えが返ってこない。** 「これ直して」より「〇〇が原因でエラーが出ているので、△△を修正してほしい」のほうが精度が上がる。AIに聞く力、つまり「質問力」は、使いながら少しずつ身についていくものだと感じた。

---

## ログ整理の重要性

今回の開発を通じて、ログを残すことの大切さを強く感じた。

使っているのはObsidianというメモツールで、daily notesとして毎日の作業ログを記録している。このログがあることで「あのとき何をしたか」「どのエラーでどう解決したか」が後から追えるし、AIに状況を説明するときも整理された情報として渡せる。

AIに大量の雑然としたログを渡すと、回答の精度が落ちることがある。逆に、整理された情報を渡すと、的確な回答が返ってくる確率が上がる。ログ管理は「AIをうまく使う」ための土台でもあった。

今は、daily notesで記録したものをarticle-sourceとして整理し、Claudeで記事構成を作って、ChatGPTでSEO調整するというフローが定着しつつある。source.md を起点にした記事生成の考え方は[Claude記事生成は「source.md」で精度が変わった](/blog/source-md-ai-writing)にまとめている。

---

## このシリーズで読む順番

本記事はサイト公開シリーズの入口（Hub）です。全体像を把握したあとは、下記の Spoke 記事を順に読むと迷いにくくなります。

| 読む順 | テーマ | 記事 |
|--------|--------|------|
| 1 | AI | [Cursor・Claude・ChatGPTはどう使い分ける？ 実際に試して分かったAI役割分担の話](/blog/ai-role-sharing-workflow) |
| 2 | AI | [ChatGPT・Cursor・Claudeの役割分担｜AIツールを使い分けるだけで品質が安定する](/blog/chatgpt-cursor-claude-role-sharing-tips) |
| 3 | AI | [Claude記事生成は「source.md」で精度が変わった](/blog/source-md-ai-writing) |
| 4 | DNS | [Vercelでdomain invalidが直らず苦戦した話](/blog/vercel-domain-invalid-nameserver) |
| 5 | DNS | [Vercel独自ドメイン接続で詰まりやすいポイント5選【DNS設定完全チェック】](/blog/vercel-domain-connection-tips) |
| 6 | SEO | [Next.js canonical設定の基本とインデックス未登録対策【実運用Tips】](/blog/nextjs-canonical-settings-tips) |
| 7 | OG | [OG画像が404になる前に——fallback設計で公開品質を守る](/blog/nextjs-og-image-fallback-tips) |
| 8 | Vercel | [Vercel Previewを本番前に確認する理由——PR単位でミスを防ぐ手順](/blog/nextjs-vercel-preview-check-tips) |
| 9 | 画像 | [Next.jsで画像差し替えしても反映されない時の対処法｜1分Tips](/blog/nextjs-image-replace-not-reflecting) |
| 10 | UX | [ブログ一覧を15件ずつページ送りにする目安（Next.js）](/blog/blog-page-size-15-tips) |
| 11 | リンク | [MarkdownのhttpリンクはNext.jsで外部リンク扱いになる](/blog/markdown-internal-link-relative-path-tips) |
| 12 | 画像 | [Next.jsのpublic/images配下に画像を置く理由](/blog/nextjs-public-images-absolute-path) |
| 13 | 画像 | [同一画像を記事内で再利用するときはaltテキストを変える](/blog/reuse-same-image-alt-text) |
| 14 | UX | [ページ送り後に#all-articlesへスクロールする方法](/blog/app-router-scroll-to-all-articles) |
| 15 | Vercel | [Previewだけ更新されProductionに反映されないときの確認手順](/blog/vercel-production-not-reflecting-tips) |
| 16 | Vercel | [Promote to Productionとは？本番反映に使う場面](/blog/vercel-promote-to-production-tips) |
| 17 | Vercel | [Auto Deployが動かないときに確認する設定](/blog/vercel-auto-deploy-not-working-tips) |
| 18 | 構築 | [create-next-appを現在フォルダへ直接作成する方法](/blog/create-next-app-current-folder) |
| 19 | リンク | [/posts の旧URLを301リダイレクトする手順](/blog/nextjs-301-redirect-legacy-url-tips) |
| 20 | 運用 | [series.tsのシリーズ判定は先勝ち｜移管は同一コミットで完結させる](/blog/series-ts-get-series-for-post-first-win-same-commit-tips) |
| 21 | 運用 | [ブログのリライトで公開日を書き換えない運用ルール](/blog/blog-rewrite-published-date-rule-tips) |

---

## まとめ

### 初心者でもできた理由

結論として、今回の経験で「初心者でもWebサイトを公開できた」のには、いくつかの理由があると思っている。

- **AIがエラー解決を補助してくれた**ので、詰まっても前進できた
- **最小構成を優先した**ので、完璧を求めて止まることがなかった
- **ログを残し続けた**ので、状況を整理してAIに相談しやすかった
- **分からないことをすぐ聞いた**ので、理解が少しずつ積み上がった

### AIが全部やってくれるわけじゃない

ただ正直に言うと、AIがあれば全部解決するという感覚にはならなかった。

DNSで丸1日以上ハマったこと、Vercelのアカウント問題で試行錯誤したこと、AIの回答が理解できずに別の聞き方を考えたこと——これらは全部、自分で考えて、整理して、判断した部分だ。

AIは強力な相棒だけれど、問題を整理するのも、質問を考えるのも、最終的に動かすのも、自分だ。

「AIがあれば何でもできる」でも「AIがなければ何もできない」でもなく、AIをうまく使いながら自分で前進していく——そのバランス感覚が、個人開発を続けていく上で大切だと感じている。

---

## メタディスクリプション

> AI初心者・Next.js未経験がCursor・ChatGPT・Claudeを使いながら実際にWebサイトを公開するまでの全記録。DNS設定で丸1日詰まった実体験やVercelの再デプロイ問題の解決策など、リアルな失敗と学びをまとめています。

---

## SEOタイトル案

1. **AI初心者がゼロからWebサイトを公開するまでにやったこと・詰まったこと全部まとめ**
2. **プログラミング初心者がCursor・ChatGPTでWebサイト公開した話【DNS地獄も経験】**
3. **AIツールだけでWebサイトは作れる？初心者が実際にやってみてわかったこと**
