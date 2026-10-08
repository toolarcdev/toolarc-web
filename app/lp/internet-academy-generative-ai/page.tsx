/* Approved IA LP implementation · publication date: 2026-10-08. */
import type { Metadata } from "next";
import { AffiliateImpression } from "@/components/affiliate/AffiliateImpression";
import { buildAffiliateAnchorProps, isDirectAffiliateAllowed, resolveAffiliateLink } from "@/lib/affiliate";
import { LpCta } from "./LpActions";
import { LpDebugMode } from "./LpDebugMode";
import styles from "./page.module.css";

const pageTitle = "インターネット・アカデミー生成AI活用実践講座｜料金と向く人";
const pageDescription = "毎回の指示調整や社内資料の扱いに迷う社会人へ。インターネット・アカデミー生成AI活用実践講座で学ぶ内容を、商談メモ・社内文書・メールに活かすイメージで紹介。税込60,984円の受講料、独学や別講座との違い、受講前のQ&Aを整理し、自分に合う講座を無料相談で選ぶ準備ができます。";
const pageUrl = "https://www.toolarc.jp/lp/internet-academy-generative-ai";
const ogImage = "/images/lp/internet-academy-generative-ai/og-work-ai.jpg";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: { title: pageTitle, description: pageDescription, url: pageUrl, type: "article", locale: "ja_JP", siteName: "ToolArc", publishedTime: "2026-10-08T00:00:00+09:00", images: [{ url: ogImage, width: 1200, height: 630, alt: "生成AIを、仕事で使う｜インターネット・アカデミー生成AI活用実践講座の料金と向く人" }] },
  twitter: { card: "summary_large_image", title: pageTitle, description: pageDescription, images: [ogImage] },
};

export default function InternetAcademyGenerativeAiPage() {
  const resolved = isDirectAffiliateAllowed("internet-academy-generative-ai", "internet-academy")
    ? resolveAffiliateLink("internet-academy", "text-business-ai") : null;
  const props = resolved ? buildAffiliateAnchorProps(resolved) : null;
  const affiliateLink = props?.href ? { href: props.href, target: props.target, rel: `${props.rel} sponsored`, referrerPolicy: props.referrerPolicy } : null;
  return (
    <div className={styles.page} data-lp="internet-academy-generative-ai" data-debug="false" data-detail="true">
<a className="skip-link" href="#main">本文へ移動</a>
<header className="site-header container" data-ref="B00" data-label="媒体ヘッダー">
<span className="ref-label" aria-hidden="true">B00 · 媒体ヘッダー</span>
<a className="wordmark" href="https://www.toolarc.jp/" aria-label="ToolArc トップページ">ToolArc<span className="wordmark-dot" aria-hidden="true">
</span>
</a>
<span className="header-description">生成AI講座の比較・受講案内</span>
</header>
<main id="main">
<article>
<section className="hero container" id="intro" data-ref="B01" data-label="導入・結論">
<span className="ref-label" aria-hidden="true">B01 · 導入・結論</span>
<div className="prose">
<p className="ad-label">広告</p>
<h1>
<span className="title-school">インターネット・アカデミー</span>
<span className="title-course">生成AI活用実践講座</span>
<span className="title-context">料金と向く人</span>
</h1>
<div className="hero-lead" data-ref="B01-01" data-label="未来イメージ">
<span className="ref-label" aria-hidden="true">B01-01 · 未来イメージ</span>
<p>商談のあと、メモをAIで整理してから次の連絡を考える。社内マニュアルへの質問では、回答を見て元の文書を確かめる。メールの下書きは、相手と目的に合わせた指示で作る。そんな仕事の進め方を、生成AIを使って試してみたいと思いませんか。</p>
</div>
<p>ChatGPTは使い始めたけれど、指示を毎回書き直している。資料を仕事に活かしたいが、渡し方が分からない。こうした悩みがあり、専用アシスタントや文書活用を学びたい方におすすめしたいのが、インターネット・アカデミーの<strong>生成AI活用実践講座</strong>です。</p>
<p>受講料は約6万円。何を学び、仕事でどう試せるかをイメージしてから、独学や別の講座との違いを比べましょう。</p>
<aside className="conclusion" aria-label="この記事の結論" data-ref="B01-02" data-label="結論4点">
<span className="ref-label" aria-hidden="true">B01-02 · 結論4点</span>
<p>
<strong>この記事の結論</strong>
</p>
<ul>
<li>専用アシスタントや文書活用を仕事に取り入れたい方におすすめしたい講座です。商談メモの整理や、資料をもとにした質問を学びます。</li>
<li>公式講座別表示は<strong>税込60,984円・授業2回・学習目安4時間</strong>です。契約総額と受講期限は別に確かめる必要があります。</li>
<li>特定ツールの操作を一つ知りたいなら、まず独学で試す方法もあります。幅広い活用例を学ぶ「生成AI活用講座」とも選び分けられます。</li>
<li>無料カウンセリングは、目的と予算に合う講座を相談する場です。受講料や授業条件を比べるために利用できます。</li>
</ul>
</aside>
<p>「自分の仕事でも試してみたい」と感じたら、変えたい作業と予算を伝えて、どの講座が合うか無料で相談してみてください。</p>
<div className="cta" data-ref="CTA1" data-label="予約ボタン1">
<span className="ref-label" aria-hidden="true">CTA1 · 予約ボタン1</span>
<p className="cta-intent">目的と予算に合う講座を相談できます。</p>
<LpCta id="CTA1" link={affiliateLink} />
<p className="cta-note">講座選びの無料相談です。インターネット・アカデミーの公式サイトへ進みます。</p>
</div>
</div>
<nav className="contents" aria-label="ページ内目次" data-ref="B07" data-label="ページ内目次">
<span className="ref-label" aria-hidden="true">B07 · ページ内目次</span>
<p>気になるところから読む</p>
<ol>
<li>
<a href="#work-scenes">仕事での使い方<span aria-hidden="true">↓</span>
</a>
</li>
<li>
<a href="#compare">講座比較<span aria-hidden="true">↓</span>
</a>
</li>
<li>
<a href="#cost-support">料金と学び方<span aria-hidden="true">↓</span>
</a>
</li>
<li>
<a href="#questions">Q&A<span aria-hidden="true">↓</span>
</a>
</li>
<li>
<a href="#consultation">相談の準備<span aria-hidden="true">↓</span>
</a>
</li>
</ol>
</nav>
</section>
<section data-ref="B02" data-label="学んだ使い方を、3つの仕事場面で試す" className="section container" id="work-scenes">
<span className="ref-label" aria-hidden="true">B02 · 学んだ使い方を、3つの仕事場面で試す</span>
<div className="section-head">
<h2>学んだ使い方を、3つの仕事場面で試す</h2>
</div>
<p>この講座では、商談メモを整理するアシスタントの作成、NotebookLMに文書を読み込ませて質問する方法、クレーム対応メールの作成などを扱います。学んだ方法を日々の仕事に取り入れるなら、次のような使い方を目指せます。</p>
<figure className="work-wide" data-ref="IMG01" data-label="3場面のPC図解">
<span className="ref-label" aria-hidden="true">IMG01 · 3場面のPC図解</span>
<picture>
<source media="(max-width: 1063px)" srcSet="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221%22%20height%3D%221%22%2F%3E" />
<img src="/images/lp/internet-academy-generative-ai/work-scenes-pc.png" alt="商談メモ・社内文書・メールにAIを使い、人が内容を確認する3つの仕事場面" width="1620" height="971" loading="lazy" decoding="async" />
</picture>
</figure>

<div data-ref="B02-02" data-label="商談メモ" className="scene prose">
<span className="ref-label" aria-hidden="true">B02-02 · 商談メモ</span>
<h3>商談メモを、次の連絡に使える形へ</h3>
<figure className="work-mobile" data-ref="IMG02" data-label="商談メモのスマホ図解">
<span className="ref-label" aria-hidden="true">IMG02 · 商談メモのスマホ図解</span>
<picture>
<source media="(min-width: 1064px)" srcSet="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221%22%20height%3D%221%22%2F%3E" />
<img src="/images/lp/internet-academy-generative-ai/scene-sales-mobile.png" alt="商談メモをAIで項目ごとに整理し、人が内容を確かめて次の連絡を考える流れ" width="1086" height="1448" loading="lazy" decoding="async" />
</picture>
<figcaption>商談メモに学んだ方法を活かす例</figcaption>
</figure>
<p>授業では、マイGPTやGemsを使った専用アシスタントの作成を扱います。どちらも、ChatGPTやGeminiに用途に合わせた指示を設定する機能です。同じ作業に使う役割・条件・出力形式。これらを決めて、商談のたびに指示を一から考える状態から、繰り返し使う設定を用意する学習へ進めます。</p>
</div>
<div data-ref="B02-03" data-label="社内文書" className="scene prose">
<span className="ref-label" aria-hidden="true">B02-03 · 社内文書</span>
<h3>社内文書を、質問して確かめる資料へ</h3>
<figure className="work-mobile" data-ref="IMG03" data-label="社内文書のスマホ図解">
<span className="ref-label" aria-hidden="true">IMG03 · 社内文書のスマホ図解</span>
<picture>
<source media="(min-width: 1064px)" srcSet="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221%22%20height%3D%221%22%2F%3E" />
<img src="/images/lp/internet-academy-generative-ai/scene-documents-mobile.png" alt="利用できる資料を選び、AIへの質問のあとに元の文書を確認する流れ" width="1086" height="1448" loading="lazy" decoding="async" />
</picture>
<figcaption>社内文書に学んだ方法を活かす例</figcaption>
</figure>
<p>授業で扱うNotebookLMは、読み込ませた資料をもとに質問や要約を行うサービスです。社内の問い合わせ対応など、自分の担当業務への取り入れ方を考えられます。職場の資料を使う前には、利用できるサービスと入力してよい情報を社内ルールで確かめてください。</p>
</div>
<div data-ref="B02-04" data-label="メール" className="scene prose">
<span className="ref-label" aria-hidden="true">B02-04 · メール</span>
<h3>メールの下書きに、相手と目的を反映する</h3>
<figure className="work-mobile" data-ref="IMG04" data-label="メールのスマホ図解">
<span className="ref-label" aria-hidden="true">IMG04 · メールのスマホ図解</span>
<picture>
<source media="(min-width: 1064px)" srcSet="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221%22%20height%3D%221%22%2F%3E" />
<img src="/images/lp/internet-academy-generative-ai/scene-email-mobile.png" alt="相手と目的をAIへ伝え、下書きの事実と表現を人が確認する流れ" width="1086" height="1448" loading="lazy" decoding="async" />
</picture>
<figcaption>メールに学んだ方法を活かす例</figcaption>
</figure>
<p>講座では、質問の仕方やクレーム対応メールの作成を扱います。相手・目的・文章の調子を指示に含める使い方を、繰り返し発生する連絡の下書きへつなげて考えられます。</p>
</div>
<p>上の3場面は、<a href="https://www.internetacademy.jp/course/ai/chair_generative_ai_advanced.html">公式に掲載された講座内容</a>を仕事に活かす例です。業務の選び方や導入時の情報管理も扱います。実際に任せる範囲は職場の条件に合わせて判断します。</p>
</section>
<section data-ref="B03" data-label="独学と2つの生成AI講座は、学びたい範囲で選ぶ" className="section container" id="compare">
<span className="ref-label" aria-hidden="true">B03 · 独学と2つの生成AI講座は、学びたい範囲で選ぶ</span>
<div className="section-head">
<h2>独学と2つの生成AI講座は、学びたい範囲で選ぶ</h2>
</div>
<p>一つの操作で困っていて、公式ヘルプや教材を見ながら試せるなら、まず独学で解決する方法があります。一方、指示の設計、資料の使い方、業務への当てはめをまとめて学びたいなら、講座の内容と講師への質問の条件を比べる価値があります。</p>
<p>インターネット・アカデミーには、名前の似た2つの講座があります。</p>
<div className="responsive-comparison" data-ref="B03-01" data-label="講座比較">
<span className="ref-label" aria-hidden="true">B03-01 · 講座比較</span>
<div className="table-desktop">
<table>
<thead>
<tr>
<th>選択肢</th>
<th>学習内容・選ぶ目安</th>
<th>公式表示の受講料・授業数・学習目安</th>
</tr>
</thead>
<tbody>
<tr>
<td>独学・動画教材</td>
<td>特定の操作を調べたい、自分で試して修正できる。質問・添削の有無は教材ごとに異なる</td>
<td>利用する教材・サービスによって異なる</td>
</tr>
<tr>
<td>生成AI活用講座</td>
<td>仕組みやリスク、議事録・資料作成・Excelなどの幅広い活用例を学びたい</td>
<td>43,560円（税込）・2回・4〜6時間</td>
</tr>
<tr>
<td>生成AI活用実践講座</td>
<td>専用アシスタント、文書活用、自業務への導入計画を学びたい</td>
<td>60,984円（税込）・2回・4時間</td>
</tr>
</tbody>
</table>
</div>
<div className="comparison-mobile">
<div className="comparison-option ">
<h3>独学・動画教材</h3>
<dl>
<div>
<dt>学習内容・選ぶ目安</dt>
<dd>特定の操作を調べたい、自分で試して修正できる。質問・添削の有無は教材ごとに異なる</dd>
</div>
<div>
<dt>公式表示の受講料・授業数・学習目安</dt>
<dd>利用する教材・サービスによって異なる</dd>
</div>
</dl>
</div>
<div className="comparison-option ">
<h3>生成AI活用講座</h3>
<dl>
<div>
<dt>学習内容・選ぶ目安</dt>
<dd>仕組みやリスク、議事録・資料作成・Excelなどの幅広い活用例を学びたい</dd>
</div>
<div>
<dt>公式表示の受講料・授業数・学習目安</dt>
<dd>43,560円（税込）・2回・4〜6時間</dd>
</div>
</dl>
</div>
<div className="comparison-option option-practice">
<h3>生成AI活用実践講座</h3>
<dl>
<div>
<dt>学習内容・選ぶ目安</dt>
<dd>専用アシスタント、文書活用、自業務への導入計画を学びたい</dd>
</div>
<div>
<dt>公式表示の受講料・授業数・学習目安</dt>
<dd>60,984円（税込）・2回・4時間</dd>
</div>
</dl>
</div>
</div>
</div>
<p>出典：<a href="https://www.internetacademy.jp/course/ai/chair_generative_ai_utl.html">生成AI活用講座</a>、<a href="https://www.internetacademy.jp/course/ai/chair_generative_ai_advanced.html">生成AI活用実践講座</a>。料金は講座別欄の表示です。選ぶ目安は掲載内容から整理しています。</p>
<p>メールや商談メモに使う指示を整えたい方、文書を使った回答を試したい方には、実践講座をおすすめしたい理由があります。専用アシスタントの設計から、自分の仕事への導入計画まで学習内容に含まれるためです。ツールの種類やExcelへの活用も広く知りたいなら、生成AI活用講座の内容と比べてください。<strong>仕事で試したい使い方に、学ぶ内容が合っているか</strong>で選ぶのがよいでしょう。</p>
<p>継続的な個別伴走や、自社の業務改善を完成させる支援が必要な場合は、2回の講座で足りるかを先に検討してください。AI開発・データ分析の専門技術を身につけたい場合も、学習範囲が異なります。</p>
</section>
<section data-ref="B04" data-label="受講料60,984円と、講師を利用する学び方" className="section container" id="cost-support">
<span className="ref-label" aria-hidden="true">B04 · 受講料60,984円と、講師を利用する学び方</span>
<div className="section-head">
<h2>受講料60,984円と、講師を利用する学び方</h2>
</div>
<p>インターネット・アカデミーは、Web・IT分野を教えるスクールです。運営会社と所在地は<a href="https://www.internetacademy.jp/outline/">公式の企業概要</a>で確認できます。</p>
<p>講師の説明を受けたいか、映像を見て自分のペースで進めたいかは、有料で学ぶかを決める一つの軸です。<a href="https://www.internetacademy.jp/voices/">公式の受講スタイル案内</a>では、全講座がオンラインに対応し、ライブ・マンツーマン・オンデマンドの3形式と、授業・テキストについてのオンライン質問対応を案内しています。</p>
<div className="responsive-comparison" data-ref="B04-01" data-label="受講スタイル">
<span className="ref-label" aria-hidden="true">B04-01 · 受講スタイル</span>
<div className="table-desktop">
<table>
<thead>
<tr>
<th>学び方</th>
<th>利用を考えたい場面</th>
</tr>
</thead>
<tbody>
<tr>
<td>ライブ授業</td>
<td>講師の説明をリアルタイムで聞きたい</td>
</tr>
<tr>
<td>マンツーマン授業</td>
<td>分からない点を講師に直接聞きたい</td>
</tr>
<tr>
<td>オンデマンド授業</td>
<td>映像を見ながら自分のペースで進めたい</td>
</tr>
</tbody>
</table>
</div>
<div className="comparison-mobile">
<div className="comparison-option ">
<h3>ライブ授業</h3>
<dl>
<div>
<dt>利用を考えたい場面</dt>
<dd>講師の説明をリアルタイムで聞きたい</dd>
</div>
</dl>
</div>
<div className="comparison-option ">
<h3>マンツーマン授業</h3>
<dl>
<div>
<dt>利用を考えたい場面</dt>
<dd>分からない点を講師に直接聞きたい</dd>
</div>
</dl>
</div>
<div className="comparison-option option-practice">
<h3>オンデマンド授業</h3>
<dl>
<div>
<dt>利用を考えたい場面</dt>
<dd>映像を見ながら自分のペースで進めたい</dd>
</div>
</dl>
</div>
</div>
</div>
<p>この表は学校共通の案内を整理したものです。本講座の具体的な開催日時、予約方法、質問できる期間・回数は個別に確かめてください。自分で作った指示文への助言や、自社資料を使う演習を希望する場合も、対応範囲を聞くと学び方を判断できます。</p>
<div className="cost-panel" data-ref="B04-02" data-label="受講料と総額の確認">
<span className="ref-label" aria-hidden="true">B04-02 · 受講料と総額の確認</span>
<p>講座別の受講料は<strong>60,984円（税込）</strong>、授業は2回、学習目安は4時間です。この数字だけでは、受講期限や授業外に必要な準備・復習時間は分かりません。</p>
<p>予算を決めるときは、次の3つを分けます。</p>
<ul>
<li>
<strong>学校へ支払う総額</strong>：講座単独での申込み可否、入学金・教材等の内訳を含む見積もり。</li>
<li>
<strong>ツール・環境の費用</strong>：受講で必要なPC、アカウント、有料プランの有無。</li>
<li>
<strong>分割払いの総額</strong>：頭金・回数・手数料を含めた支払額。</li>
</ul>
<p>講座ページだけでは、これらすべての金額は確定できません。受講する講座名と利用する学び方を指定し、見積もりを確認してください。追加講座の提案を受けた場合も、今回学びたい内容に必要か、当初予算に収まるかを照合できます。</p>
</div>
<p>商談メモや社内文書への使い方を講師に聞きながら学びたいなら、受講する価値を判断するために、授業内容と総額を無料相談で確かめてみてください。</p>
<div className="cta" data-ref="CTA2" data-label="予約ボタン2">
<span className="ref-label" aria-hidden="true">CTA2 · 予約ボタン2</span>
<p className="cta-intent">講座の違いと、受講に必要な総額を相談できます。</p>
<LpCta id="CTA2" link={affiliateLink} />
<p className="cta-note">講座選びの無料相談です。授業・実習への申し込みとは異なります。</p>
</div>
</section>
<section data-ref="B05" data-label="受講前のQ&amp;A｜初心者・資料・費用の疑問" className="section container" id="questions">
<span className="ref-label" aria-hidden="true">B05 · 受講前のQ&amp;A｜初心者・資料・費用の疑問</span>
<div className="section-head">
<h2>受講前のQ&amp;A｜初心者・資料・費用の疑問</h2>
</div>
<div data-ref="B05-01" data-label="Q. プログラミング未経験でも受講できますか" className="question">
<span className="ref-label" aria-hidden="true">B05-01 · Q. プログラミング未経験でも受講できますか</span>
<h3>Q. プログラミング未経験でも受講できますか</h3>
<p>A. <strong>プログラミング知識不要</strong>です。</p>
<details className="disclosure">
<summary>受講前のPC操作・アカウントの準備を確認</summary>
<div className="disclosure-body">
<p>PC操作やChatGPTの利用経験、アカウントの事前準備は別の条件です。現在できる操作を伝え、受講前に何を準備すればよいか確かめてください。</p>
</div>
</details>
</div>
<div data-ref="B05-02" data-label="Q. 社内資料を持っていく必要がありますか" className="question">
<span className="ref-label" aria-hidden="true">B05-02 · Q. 社内資料を持っていく必要がありますか</span>
<h3>Q. 社内資料を持っていく必要がありますか</h3>
<p>
<strong>A.</strong> 自分の資料が必須かどうかは、公開情報では確認できていません。</p>
<details className="disclosure">
<summary>自社資料を使う場合に確認したいこと</summary>
<div className="disclosure-body">
<p>相談には「どんな文書を、何に使いたいか」という説明を用意できます。機密資料は持ち込まず、自社資料を使う演習の可否と、匿名化した資料や教材で学べるかを質問してください。</p>
</div>
</details>
</div>
<div data-ref="B05-03" data-label="Q. この講座に給付金は使えますか" className="question">
<span className="ref-label" aria-hidden="true">B05-03 · Q. この講座に給付金は使えますか</span>
<h3>Q. この講座に給付金は使えますか</h3>
<p>
<strong>A.</strong> 本講座単独への適用は、今回の確認では確定できていません。</p>
<details className="disclosure">
<summary>対象講座と受給条件の確認方法</summary>
<div className="disclosure-body">
<p>給付後の金額を前提に予算を組まず、対象となる正式な講座・コース名を確認してください。本人の受給条件については、<a href="https://www.internetacademy.jp/entry/benefit.html">公式の制度案内</a>に記載されたハローワークなどの窓口で確認します。</p>
</div>
</details>
</div>
<div data-ref="B05-04" data-label="Q. 受講をキャンセルした場合、全額戻りますか" className="question">
<span className="ref-label" aria-hidden="true">B05-04 · Q. 受講をキャンセルした場合、全額戻りますか</span>
<h3>Q. 受講をキャンセルした場合、全額戻りますか</h3>
<p>
<strong>A.</strong> 返金の条件は契約によって異なり、全額返金を前提にはできません。</p>
<details className="disclosure">
<summary>解約前後・分割払いで確かめる条件</summary>
<div className="disclosure-body">
<p>
<a href="https://www.internetacademy.jp/contents/agreement.pdf">公開受講約款</a>には、契約条件に応じた解約・返金の規定があります。契約前に交付される最新書面で、受講期限、日程変更、開始前・開始後の解約費用を確認してください。分割払いを使う場合は、ローンの精算方法も確認対象です。</p>
</div>
</details>
</div>
</section>
<section data-ref="B06" data-label="無料相談には、変えたい仕事を一つ持っていく" className="section container" id="consultation">
<span className="ref-label" aria-hidden="true">B06 · 無料相談には、変えたい仕事を一つ持っていく</span>
<div className="section-head">
<h2>無料相談には、変えたい仕事を一つ持っていく</h2>
</div>
<p>無料カウンセリングは、講座選びのための相談です。<a href="https://www.internetacademy.jp/contents/faq_qa005.html">公式FAQ</a>は、予算や目的に合わせたコース提案を案内しています。ここで受ける講座案内と、受講中の授業・実習は別です。</p>
<p>相談前は、仕事の課題、予算、受講しやすい時間をそれぞれ一つずつ書いておけば、話を具体的にできます。たとえば次のようなメモです。</p>
<blockquote className="consult-memo" data-ref="B06-01" data-label="相談メモの例">
<span className="ref-label" aria-hidden="true">B06-01 · 相談メモの例</span>
<p>商談メモを決まった項目で整理する指示を学びたいです。ChatGPTで文章作成は試しています。予算は○円まで、受講しやすいのは○曜日です。実践講座と活用講座のどちらが合うか、必要総額と質問対応の条件を知りたいです。</p>
</blockquote>
<p>学校へ聞く内容は、次の4つにまとめられます。</p>
<ol className="consult-questions" data-ref="B06-02" data-label="学校に聞く4項目">
<span className="ref-label" aria-hidden="true">B06-02 · 学校に聞く4項目</span>
<li>
<strong>講座と実習</strong>：この課題に合うのはどちらか。何を作り、自分の指示文や資料に助言を受けられるか。</li>
<li>
<strong>見積もりと準備</strong>：単独受講できるか。学校への総支払額と、必要なPC・アカウント・ツール契約は何か。</li>
<li>
<strong>日時とサポート</strong>：希望の授業形式で受けられるか。受講期限、質問期間、再視聴の条件は何か。</li>
<li>
<strong>契約と変更</strong>：日程変更や解約の条件は何か。提案内容を確認できる書面は何か。</li>
</ol>
<p>公式の予約フォームでは、オンラインのZoom実施または新宿アベニュー校を選び、希望日時を指定します。氏名・ふりがな・電話番号・メールアドレスが必須です。「興味がある分野」には生成AIの選択肢があります。個人情報の利用目的と、メール配信設定も確認して申し込みます。</p>
<details className="disclosure" data-ref="B06-03" data-label="予約後と契約前">
<span className="ref-label" aria-hidden="true">B06-03 · 予約後と契約前</span>
<summary>予約後の案内と、契約前に確認すること</summary>
<div className="disclosure-body">
<p>予約後は、学校からの案内で日時と参加方法を確認し、相談用のメモを用意してください。所要時間やZoomの接続案内を受け取る方法が分からない場合は、予約時に問い合わせると当日の予定を立てられます。受講を契約する段階では、提案された内容と見積もりを照合し、不明点を残さず判断しましょう。</p>
</div>
</details>
<p>次の商談メモをどう整理したいか。次の社内問い合わせで、どんな資料を使いたいか。<strong>まずは、仕事で試してみたい使い方を一つ</strong>選んでください。その使い方を学ぶ講座と、無理のない予算・受講時間を、無料カウンセリングで相談してみましょう。</p>
<div className="cta" data-ref="CTA3" data-label="予約ボタン3">
<span className="ref-label" aria-hidden="true">CTA3 · 予約ボタン3</span>
<p className="cta-intent">仕事で試したい使い方を、予算・受講時間と一緒に相談しましょう。</p>
<LpCta id="CTA3" link={affiliateLink} />
<p className="cta-note">公式サイトで日時と入力内容を確認して予約します。</p>
</div>
</section>
<footer className="article-footer container" data-ref="B08" data-label="調査範囲・媒体情報">
<span className="ref-label" aria-hidden="true">B08 · 調査範囲・媒体情報</span>
<div className="prose">
<p>本記事は2026年10月8日に確認した公式講座ページ、受講スタイル案内、FAQ、予約フォーム等をもとに整理しています。実受講やカウンセリング参加による評価ではありません。受講料、講座内容、予約枠、受講条件は変更される場合があります。契約前には最新の見積もりと契約書面をご確認ください。</p>
<div className="footer-credit">
<a className="footer-wordmark" href="https://www.toolarc.jp/" aria-label="ToolArc トップページ">ToolArc</a>
<a href="#intro">ページの先頭へ ↑</a>
</div>
</div>
</footer>
</article>
</main>

      <LpDebugMode />
      {process.env.NODE_ENV === "production" && resolved?.impressionUrl ? <AffiliateImpression src={resolved.impressionUrl} /> : null}
    </div>
  );
}
