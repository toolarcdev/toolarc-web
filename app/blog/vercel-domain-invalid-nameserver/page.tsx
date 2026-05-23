import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BlogShell } from "@/components/blog/BlogShell";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { StickyTOC } from "@/components/blog/ai-role-sharing/StickyTOC";
import { RelatedArticles } from "@/components/blog/ai-role-sharing/RelatedArticles";
import { QuoteHighlight } from "@/components/blog/ai-role-sharing/QuoteHighlight";
import { DnsFlowDiagram } from "@/components/blog/vercel-dns/DnsFlowDiagram";
import { DnsChecklist } from "@/components/blog/vercel-dns/DnsChecklist";
import { SITE_URL, blogPostUrl } from "@/lib/blog/constants";
import { loadPost } from "@/lib/blog/load-post";
import { estimateReadingTime } from "@/lib/blog/reading-time";
import { getSeriesForPost } from "@/lib/series/series";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";

const SLUG = "vercel-domain-invalid-nameserver";
const PAGE_URL = blogPostUrl(SLUG);
const PUBLISHED_AT = "2026-05-22";

const TITLE = "Vercelで「Invalid Configuration」が直らなかった原因はネームサーバー設定だった";
const DESCRIPTION =
  "Vercelに独自ドメインを設定したのに「Invalid Configuration」が続き、ブラウザでは「DNS_PROBE_FINISHED_NXDOMAIN」が出た。丸一日詰まった末に見つけた原因と、同じミスを防ぐための確認ポイントをまとめました。";

export const metadata: Metadata = {
  title: `${TITLE} | ToolArc`,
  description: DESCRIPTION,
  keywords: [
    "Vercel",
    "domain invalid",
    "Invalid Configuration",
    "DNS_PROBE_FINISHED_NXDOMAIN",
    "ネームサーバー",
    "nameserver",
    "xserver",
    "独自ドメイン",
    "DNS設定",
    "Vercel DNS error",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    locale: "ja_JP",
    url: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "ToolArc",
    publishedTime: PUBLISHED_AT,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const TOC_ITEMS = [
  { id: "conclusion", label: "先に結論" },
  { id: "what-happened", label: "ずっとinvalidのまま" },
  { id: "browser-error", label: "DNS_PROBE_FINISHED_NXDOMAIN" },
  { id: "root-cause", label: "原因はネームサーバー未設定" },
  { id: "resolved", label: "数分後にvalidになった" },
  { id: "understanding", label: "当時理解できていなかったこと" },
  { id: "reflection", label: "振り返ってみると" },
  { id: "checklist", label: "確認チェックリスト" },
  { id: "advice", label: "同じところで詰まっている人へ" },
  { id: "ai-note", label: "AIに相談したときの話" },
] satisfies { id: string; label: string }[];

const RELATED_ARTICLES = [
  {
    href: "/blog/site-launch",
    title:
      "AI初心者がゼロからWebサイトを公開するまでにやったこと・詰まったこと全部まとめ",
    description:
      "Next.jsもReactもDNSもほぼ知らない状態から、AIツールを頼りながら実際にWebサイトを公開するまでの記録。この記事はそこから派生した話です。",
    isParent: true,
  },
  {
    href: "/blog/ai-role-sharing-workflow",
    title:
      "Cursor・Claude・ChatGPTはどう使い分ける？ 実際に試して分かったAI役割分担の話",
    description:
      "各AIツールの得意分野を理解して役割分担することで、ワークフローが安定した話。",
  },
  {
    href: "/blog/source-md-ai-writing",
    title: "Claude記事生成は「source.md」で精度が変わった",
    description:
      "AIへ渡す素材の構造を整理することで、記事生成の品質が大きく変わった話。",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: PUBLISHED_AT,
  inLanguage: "ja",
  author: { "@type": "Organization", name: "ToolArc" },
  publisher: { "@type": "Organization", name: "ToolArc" },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  isPartOf: { "@type": "Blog", name: "ToolArc", url: SITE_URL },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ToolArc", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "記事一覧",
      item: `${SITE_URL}/#articles`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "サイト公開記録",
      item: `${SITE_URL}/blog/site-launch`,
    },
    { "@type": "ListItem", position: 4, name: TITLE, item: PAGE_URL },
  ],
};

export default async function VercelDomainInvalidPage() {
  const post = await loadPost(SLUG);
  const series = getSeriesForPost(SLUG);
  const readingTime = estimateReadingTime(post.content);

  return (
    <BlogShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ScrollDepthTracker
        slug={SLUG}
        seriesSlug={series?.slug ?? null}
        readingTime={readingTime}
        category={post.category}
      />

      <main className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-5xl">
          {/* Breadcrumb */}
          <nav aria-label="パンくずリスト" className="mb-8 text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#2563eb]">
                  トップ
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#articles" className="hover:text-[#2563eb]">
                  記事一覧
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog/site-launch" className="hover:text-[#2563eb]">
                  サイト公開記録
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li
                className="max-w-48 truncate text-slate-700 sm:max-w-xs"
                aria-current="page"
              >
                Vercel domain invalid
              </li>
            </ol>
          </nav>

          {/* Series badge */}
          <div className="mb-6 flex items-center gap-2">
            <span className="rounded-full border border-[#dbeafe] bg-[#f8fbff] px-3 py-1 text-xs font-medium text-[#2563eb]">
              ToolArc workflow シリーズ
            </span>
            <Link
              href="/blog/site-launch"
              className="text-xs text-slate-500 hover:text-[#2563eb] hover:underline"
            >
              親記事を読む →
            </Link>
          </div>

          {/* Two-column layout: content + sticky TOC */}
          <div className="lg:grid lg:grid-cols-[1fr_220px] lg:items-start lg:gap-12">
            {/* Main article content */}
            <article itemScope itemType="https://schema.org/BlogPosting">
              <ArticleHeader
                title={TITLE}
                description={DESCRIPTION}
                publishedAt={PUBLISHED_AT}
                tags={["vercel", "dns", "nameserver", "xserver", "独自ドメイン", "beginner"]}
              />

              <div className="article mt-10 animate-fade-in">

                {/* ── 冒頭: 派生記事の文脈リンク ── */}
                <aside className="mb-8 rounded-lg border border-[#dbeafe] bg-[#f8fbff] px-5 py-4 text-sm leading-7 text-slate-600">
                  この記事は、
                  <Link href="/blog/site-launch" className="article-link font-medium">
                    サイト公開までの記録
                  </Link>
                  の中で実際に詰まった体験を掘り下げたものです。
                  DNS知識がほとんどない状態で個人開発サイトを公開しようとして、丸一日以上ハマった話をします。
                </aside>

                {/* ── Section 1: 先に結論 ── */}
                <section aria-labelledby="conclusion">
                  <h2 id="conclusion" className="article-h2">
                    先に結論
                  </h2>
                  <p className="article-p">
                    同じ症状で詰まっている人のために、最初に答えを書いておきます。
                  </p>

                  {/* 結論ボックス */}
                  <div className="my-6 rounded-xl border border-[#dbeafe] bg-[#f0f7ff] px-5 py-5 sm:px-6">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#2563eb]">
                      今回の原因
                    </p>
                    <p className="font-semibold leading-relaxed text-slate-800">
                      ドメイン管理側（Xserver Domain）の
                      <strong className="text-[#1d4ed8]">ネームサーバー設定が未変更</strong>
                      のままだった。
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      DNSレコードは設定していたが、
                      ドメインがそのDNS設定を参照するように設定されていなかった。
                      結果として、Vercel側では「どのDNSを見ればいいか分からない」状態になっており、
                      ずっと <code className="article-code-inline">Invalid Configuration</code> のままだった。
                    </p>
                  </div>

                  <p className="article-p">
                    以下では、なぜこのミスが起きたのか、どうやって気づいたのか、の流れを整理します。
                  </p>
                </section>

                {/* ── Section 2: ずっとinvalidのまま ── */}
                <section aria-labelledby="what-happened">
                  <h2 id="what-happened" className="article-h2">
                    ドメインを追加したのに、ずっとinvalidのまま
                  </h2>
                  <p className="article-p">
                    Vercelのダッシュボードに独自ドメインを追加した。
                    設定画面には、Vercel側で必要なDNSレコードが表示されていたので、それを入力した。
                  </p>
                  <p className="article-p">
                    当時はDNSの仕組みをほとんど理解しておらず、
                    「DNSレコードを設定すれば動くはず」と思っていた。
                    でも、いくら待っても画面は変わらなかった。
                  </p>

                  {/* 画像: Invalid Configuration */}
                  <p className="article-p">
                    Vercelのダッシュボードで確認すると、こんな状態が続いていた。
                  </p>
                  <figure className="article-figure">
                    <Image
                      src="/images/blog/vercel-domain-invalid-nameserver/01-vercel-invalid.png"
                      alt="Vercelダッシュボードに「Invalid Configuration」と表示されている画面"
                      width={900}
                      height={480}
                      className="article-img"
                      priority
                    />
                    <figcaption className="article-figcaption">
                      「Invalid Configuration」の表示が消えない。設定は合っているはずなのに、なぜ？
                    </figcaption>
                  </figure>

                  <p className="article-p">
                    「DNS反映には時間がかかる」とよく言われる。だから最初は「そういうものかな」と思って待っていた。
                    でも数時間経っても変わらない。「設定は合っているはずなのに、なぜ」という状態が続いた。
                  </p>
                </section>

                {/* ── Section 3: DNS_PROBE_FINISHED_NXDOMAIN ── */}
                <section aria-labelledby="browser-error">
                  <h2 id="browser-error" className="article-h2">
                    ブラウザで確認したら、もっと怖いエラーが出た
                  </h2>
                  <p className="article-p">
                    ダッシュボードが invalid のまま変わらないので、ブラウザで直接アクセスしてみた。
                  </p>

                  {/* エラー強調ボックス */}
                  <div className="my-5 rounded-lg border border-red-200 bg-red-50 px-5 py-4">
                    <p className="font-mono text-base font-bold text-red-700 sm:text-lg">
                      DNS_PROBE_FINISHED_NXDOMAIN
                    </p>
                    <p className="mt-1 text-sm text-red-600">
                      「このサイトにアクセスできません」— Chromeのエラー画面
                    </p>
                  </div>

                  <p className="article-p">
                    実際にブラウザで表示された画面がこれだった。
                  </p>
                  <figure className="article-figure">
                    <Image
                      src="/images/blog/vercel-domain-invalid-nameserver/02-dns-probe-finished-nxdomain.png"
                      alt="ChromeブラウザにDNS_PROBE_FINISHED_NXDOMAINエラーが表示されている画面"
                      width={900}
                      height={560}
                      className="article-img"
                    />
                    <figcaption className="article-figcaption">
                      DNS_PROBE_FINISHED_NXDOMAIN — ドメインのDNSが解決できない状態。設定の問題であり、サイトが壊れているわけではない。
                    </figcaption>
                  </figure>

                  <p className="article-p">
                    DNS知識がほとんどなかったので、最初は「サイトが壊れた」と思った。
                    実際には「ドメインのDNSが解決できない」というエラーで、設定の問題なのだが、当時はそんなことも分からなかった。怖かった。
                  </p>
                  <p className="article-p">
                    「DNS反映待ちなのか、設定ミスなのか」の切り分けができない状態がいちばんつらかった。
                    待てばいいのか、どこかを直すべきなのか、判断できなかった。
                  </p>
                </section>

                {/* ── Section 4: 原因はネームサーバー未設定 ── */}
                <section aria-labelledby="root-cause">
                  <h2 id="root-cause" className="article-h2">
                    翌朝もまだinvalid。原因はDNSレコードではなかった
                  </h2>
                  <p className="article-p">
                    一晩寝れば解決しているかもしれない、と思って翌朝確認した。
                    まだ invalid だった。
                  </p>
                  <p className="article-p">
                    DNSの反映には最大72時間かかることもある、という情報をどこかで見ていたので、
                    「まだ待つべきか？」とも思った。でも24時間近く経っても変化がないのは、さすがにおかしい気がした。
                  </p>
                  <p className="article-p">
                    もう一度、最初から設定を見直すことにした。
                    DNSレコード自体は問題なさそうだった。Vercel側の設定も間違っているようには見えなかった。
                    では、何が足りないのか。
                  </p>
                  <p className="article-p">
                    そこで気づいた。
                  </p>

                  {/* 気づきの強調ボックス */}
                  <blockquote className="article-blockquote">
                    <p className="font-semibold">
                      ドメイン管理側（Xserver Domain）の
                      <strong>ネームサーバー設定</strong>を変更していなかった。
                    </p>
                  </blockquote>

                  <p className="article-p">
                    ドメインを購入したXserver Domain側で、ネームサーバーの設定を確認した。
                    デフォルトのXserverのネームサーバーが入ったままになっていた。
                  </p>

                  {/* 画像: ネームサーバー設定画面 */}
                  <p className="article-p">
                    ここが今回の核心だった。ネームサーバー設定画面を開いて初めて、見落としに気づいた。
                  </p>
                  <figure className="article-figure">
                    <Image
                      src="/images/blog/vercel-domain-invalid-nameserver/04-nameserver-setting.png"
                      alt="Xserver Domainのネームサーバー設定画面。デフォルトのネームサーバーが設定されたままになっている"
                      width={900}
                      height={480}
                      className="article-img"
                    />
                    <figcaption className="article-figcaption">
                      Xserver Domainのネームサーバー設定。ここがデフォルト（Xserver）のまま変更されていなかった
                    </figcaption>
                  </figure>

                  <p className="article-p">
                    つまり、こういう状態だった。
                  </p>
                  <ul className="article-ul">
                    <li className="article-li">DNSレコードは設定していた</li>
                    <li className="article-li">でも、ドメインがそのDNSを参照していなかった</li>
                    <li className="article-li">だから、Vercelはドメインを検証できないままだった</li>
                  </ul>
                  <p className="article-p">
                    「ここを見落としていたのか」と、驚きと安堵が同時に来た感覚だった。
                  </p>
                </section>

                {/* ── Section 5: 数分後にvalidになった ── */}
                <section aria-labelledby="resolved">
                  <h2 id="resolved" className="article-h2">
                    ネームサーバーを修正したら、数分後にvalidになった
                  </h2>
                  <p className="article-p">
                    ネームサーバー設定を正しい値に修正してから数分後、Vercelのダッシュボードを確認した。
                  </p>
                  <figure className="article-figure">
                    <Image
                      src="/images/blog/vercel-domain-invalid-nameserver/05-vercel-valid.png"
                      alt="Vercelダッシュボードでドメインが「Valid Configuration」になり、青いチェックマークが表示されている"
                      width={900}
                      height={480}
                      className="article-img"
                    />
                    <figcaption className="article-figcaption">
                      「Invalid Configuration」が消えた。両方のドメインに青いチェックマークがついた状態
                    </figcaption>
                  </figure>
                  <p className="article-p">
                    長時間 invalid のままだった画面が、あっさり解決した。
                    正直、拍子抜けするくらい呆気なかった。
                    ネームサーバー設定という一箇所を直すだけで、すべてが動き出した。
                  </p>
                </section>

                {/* ── Quote ── */}
                <QuoteHighlight
                  quote="DNSレコードを書くだけでは不十分。ドメインがどのDNSを使うかも設定が必要だった"
                  context="「DNSレコードを追加した」ことと「ドメインがそのDNSを参照している」ことは別の話。この違いが分かっていなかった。"
                />

                {/* ── Section 6: 当時理解できていなかったこと ── */}
                <section aria-labelledby="understanding">
                  <h2 id="understanding" className="article-h2">
                    当時理解できていなかったこと
                  </h2>
                  <p className="article-p">
                    当時は、ドメイン・ネームサーバー・DNS設定・Vercel の関係を理解できていなかった。
                    これらが別々のレイヤーで動いていることを知らなかった。
                  </p>
                  <p className="article-p">
                    実際には、この順番で設定が連携して初めて機能する。
                  </p>

                  <DnsFlowDiagram />

                  <p className="article-p">
                    DNSレコードを書くだけではなく、「どのDNSを使うか」をドメイン側（Xserver Domain）で指定する必要があった。
                    ネームサーバー設定はその「どのDNSを使うか」を決める箇所だった。
                  </p>
                  <p className="article-p">
                    今回の構成は Cloudflare を使っておらず、DNS として
                    <code className="article-code-inline">1.1.1.1</code> /
                    <code className="article-code-inline">1.0.0.1</code> を利用していたが、
                    ネームサーバーを変更していなかったため、
                    「DNSレコードは書いたけれど、ドメインはそのDNSを見ていない」状態が続いていた。
                  </p>
                </section>

                {/* ── Section 7: 振り返ってみると ── */}
                <section aria-labelledby="reflection">
                  <h2 id="reflection" className="article-h2">
                    振り返ってみると
                  </h2>
                  <p className="article-p">
                    今回の問題を整理すると、こういうことだった。
                  </p>
                  <ul className="article-ul">
                    <li className="article-li">DNSレコードは設定していた</li>
                    <li className="article-li">でも、ドメインのネームサーバー設定が未変更だった</li>
                    <li className="article-li">つまり、DNS設定は「存在していたけど、使われていない」状態だった</li>
                  </ul>
                  <p className="article-p">
                    ドメイン管理、DNS設定、Vercelという複数の設定を別々に確認していたので、
                    どこが「つながり」を担っているのかを見落としていた。
                  </p>
                  <p className="article-p">
                    DNSは「複数の箇所が連携して初めて機能する」ものだと、身をもって理解した。
                    一箇所だけ正しくしても、他が繋がっていなければ機能しない。
                  </p>
                </section>

                {/* ── Section 8: 確認チェックリスト ── */}
                <section aria-labelledby="checklist">
                  <h2 id="checklist" className="article-h2">
                    Vercel domain invalid の確認チェックリスト
                  </h2>
                  <p className="article-p">
                    同じ状況で詰まっている場合は、この順番で確認してみてください。
                  </p>
                  <DnsChecklist />
                </section>

                {/* ── Section 9: 同じところで詰まっている人へ ── */}
                <section aria-labelledby="advice">
                  <h2 id="advice" className="article-h2">
                    同じところで詰まっている人へ
                  </h2>
                  <p className="article-p">
                    Vercelで domain invalid が続いているとき、確認してほしいのはこの2点です。
                  </p>

                  <div className="my-6 space-y-3">
                    <div className="rounded-lg border border-[#dbeafe] bg-[#f8fbff] px-5 py-4">
                      <p className="text-sm font-semibold text-slate-800">
                        <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#2563eb] text-xs font-bold text-white">
                          1
                        </span>
                        Vercelが要求しているDNSレコードを設定しているか
                      </p>
                      <p className="mt-1 pl-7 text-sm text-slate-600">
                        Project Settings → Domains に表示されているAレコードまたはCNAMEを確認
                      </p>
                    </div>
                    <div className="rounded-lg border border-[#1d4ed8] bg-[#eff6ff] px-5 py-4">
                      <p className="text-sm font-semibold text-[#1d4ed8]">
                        <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1d4ed8] text-xs font-bold text-white">
                          2
                        </span>
                        ドメイン側のネームサーバー設定が正しいか
                        <span className="ml-2 text-xs font-normal text-[#2563eb]">← 今回の原因</span>
                      </p>
                      <p className="mt-1 pl-7 text-sm text-slate-600">
                        ドメイン管理画面（Xserver Domainなど）でネームサーバーを確認する
                      </p>
                    </div>
                  </div>

                  <p className="article-p">
                    自分は 2 を完全に忘れていた。
                    「DNSレコードを書いた」だけでは不十分で、「ドメインがどのDNSを使うか」まで確認が必要だった。
                  </p>
                </section>

                {/* ── Section 10: AIに相談したときの話 ── */}
                <section aria-labelledby="ai-note">
                  <h2 id="ai-note" className="article-h2">
                    AIに相談したときの話
                  </h2>
                  <p className="article-p">
                    ChatGPTに状況を説明しながら作業していたが、今回はうまく問題を解決できなかった。
                  </p>
                  <p className="article-p">
                    原因は、相談するときに「自分の状況の整理」ができていなかったことだと思う。
                    AIは与えられた情報から推測するのは得意だが、
                    「自分がまだ気づいていない前提」を発見するのは難しい。
                  </p>
                  <p className="article-p">
                    今回で言えば、自分自身が「ネームサーバー」という視点を持てていなかった。
                    そのため、AIにも十分な文脈を渡せていなかった。
                  </p>
                  <p className="article-p">
                    「自分が何を確認して、何を確認していないか」の整理は自分でやる必要がある、と感じた体験だった。
                    AIに頼る前に、まず「確認済みのこと・未確認のこと」を書き出すのが有効だったかもしれない。
                  </p>
                  <p className="article-p text-sm text-slate-500">
                    今後も個人開発で詰まった体験を記録していこうと思います。
                  </p>
                </section>
              </div>

              {/* Related articles */}
              <RelatedArticles articles={RELATED_ARTICLES} />

              <div className="mt-8">
                <Link
                  href="/#articles"
                  className="text-sm font-medium text-[#2563eb] hover:underline"
                >
                  ← 記事一覧に戻る
                </Link>
              </div>
            </article>

            {/* Sticky TOC sidebar */}
            <aside className="hidden lg:block" aria-label="目次サイドバー">
              <div className="sticky top-8">
                <StickyTOC items={TOC_ITEMS} />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </BlogShell>
  );
}
