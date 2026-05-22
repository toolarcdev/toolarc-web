import type { Metadata } from "next";
import Link from "next/link";
import { BlogShell } from "@/components/blog/BlogShell";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { StickyTOC } from "@/components/blog/ai-role-sharing/StickyTOC";
import { RelatedArticles } from "@/components/blog/ai-role-sharing/RelatedArticles";
import { QuoteHighlight } from "@/components/blog/ai-role-sharing/QuoteHighlight";
import { SourceMdBlock } from "@/components/blog/source-md-ai-writing/SourceMdBlock";
import { BeforeAfterComparison } from "@/components/blog/source-md-ai-writing/BeforeAfterComparison";
import { SourceWorkflowDiagram } from "@/components/blog/source-md-ai-writing/SourceWorkflowDiagram";
import { KeyPointsCards } from "@/components/blog/source-md-ai-writing/KeyPointsCards";
import { SITE_URL, blogPostUrl } from "@/lib/blog/constants";

const SLUG = "source-md-ai-writing";
const PAGE_URL = blogPostUrl(SLUG);
const PUBLISHED_AT = "2026-05-22";

const TITLE = "Claude記事生成は「source.md」で精度が変わった";
const DESCRIPTION =
  "「AIへ渡す情報量が多ければ多いほどいい」と思っていた頃、Obsidian の daily notes をそのまま Claude に放り込んでいた。でも、できあがる記事がどうもしっくりこなかった。問題はプロンプトではなく、渡していた素材の構造にあった。";

export const metadata: Metadata = {
  title: `${TITLE} | ToolArc`,
  description: DESCRIPTION,
  keywords: [
    "Claude",
    "Obsidian",
    "source.md",
    "AI記事生成",
    "AIワークフロー",
    "input設計",
    "個人開発",
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
  { id: "problem", label: "何が問題だったのか" },
  { id: "insight", label: "気づいたこと" },
  { id: "source-md", label: "source.md を作るようになった" },
  { id: "example", label: "source.md の例" },
  { id: "before-after", label: "何が変わったか" },
  { id: "principle", label: "素材の構造がそのまま出力に出る" },
  { id: "key-points", label: "Key Points" },
  { id: "workflow", label: "今のワークフロー" },
  { id: "conclusion", label: "おわりに" },
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
    href: "/blog/claude-obsidian-workflow",
    title: "ClaudeとObsidianで記事を量産するworkflow",
    description:
      "Obsidianのデイリーノートを素材に、Claudeで記事の骨格を作り、Cursorで実装するworkflowの全手順。",
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

const SOURCE_MD_EXAMPLE = `# 記事テーマ
Claude記事生成は source.md で変わった

# 読者
AIで記事を書いている個人開発者

# 問題
daily notes をそのまま渡すと記事構造が崩れる

# 原因
時系列ログになっていて、情報構造がない

# 改善
source.md で整理してから渡す

# 読者に伝えたいこと
AIより先に、入力素材の構造を見直したほうがいい`;

export default function SourceMdAiWritingPage() {
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
                source.md と記事生成
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
                tags={["claude", "obsidian", "ai-writing", "markdown", "workflow"]}
              />

              <div className="article mt-10 animate-fade-in">

                {/* ── 冒頭: 派生記事の文脈リンク ── */}
                <aside className="mb-8 rounded-lg border border-[#dbeafe] bg-[#f8fbff] px-5 py-4 text-sm leading-7 text-slate-600">
                  この記事は、
                  <Link
                    href="/blog/site-launch"
                    className="article-link font-medium"
                  >
                    サイト公開までの記録
                  </Link>
                  を書く過程で気づいた話を掘り下げたものです。
                  制作フロー全体を知りたい方は、先に親記事をどうぞ。
                </aside>

                {/* ── Section 1: 何が問題だったのか ── */}
                <section aria-labelledby="problem">
                  <h2 id="problem" className="article-h2">
                    何が問題だったのか
                  </h2>
                  <p className="article-p">
                    最初は「AIへ渡す情報量が多ければ多いほどいい」と思っていた。
                  </p>
                  <p className="article-p">
                    だから、Obsidian の daily notes をそのまま Claude に放り込んでいた。その日考えたこと、調べたこと、気づいたこと。全部まとめてペーストして、「これで記事を書いて」と。
                  </p>
                  <p className="article-p">
                    でも、できあがってくる記事がどうもしっくりこなかった。
                  </p>
                  <ul className="article-ul">
                    <li className="article-li">話の流れが唐突に飛ぶ</li>
                    <li className="article-li">重要なことが埋もれていて、どうでもいいことが目立つ</li>
                    <li className="article-li">自分が「伝えたかったこと」がうまく出てきていない</li>
                    <li className="article-li">なんとなく読みにくい</li>
                  </ul>
                  <p className="article-p">
                    最初は Claude の問題だと思っていた。あるいはプロンプトの書き方が悪いのだと。毎回微妙にプロンプトを変えて試していたが、あまり改善しなかった。
                  </p>
                  <p className="article-p">
                    そのうち「AIで記事を書くのには限界があるのかもしれない」と感じはじめていた。
                  </p>
                </section>

                {/* ── Section 2: 気づいたこと ── */}
                <section aria-labelledby="insight">
                  <h2 id="insight" className="article-h2">
                    気づいたこと
                  </h2>
                  <p className="article-p">
                    ある時、生成結果をながめながらふと思った。
                  </p>
                  <blockquote className="article-blockquote">
                    <p className="italic">自分は何を渡しているんだろう。</p>
                  </blockquote>
                  <p className="article-p">
                    daily notes というのは、基本的に「時系列のログ」だ。思ったことを順番に書いていく。その日の思考の記録であって、記事の構造ではない。
                  </p>
                  <p className="article-p">当たり前のことだけど、そこに気づいていなかった。</p>
                  <p className="article-p">記事には流れがある。</p>
                  <ul className="article-ul">
                    <li className="article-li">問題があって</li>
                    <li className="article-li">原因があって</li>
                    <li className="article-li">試したことがあって</li>
                    <li className="article-li">わかったことがある</li>
                  </ul>
                  <p className="article-p">
                    読者に何かを伝えるための「順番」がある。でも daily notes にはそれがない。出来事と感情と気づきが、時系列でごちゃまぜに並んでいるだけだ。
                  </p>
                  <p className="article-p">
                    AIがどれだけ優秀でも、構造のない素材から自然な記事を組み立てるのは難しい。むしろそれを期待していた自分がズレていた。
                  </p>
                </section>

                {/* ── Section 3: source.md を作るようになった ── */}
                <section aria-labelledby="source-md">
                  <h2 id="source-md" className="article-h2">
                    source.md を作るようになった
                  </h2>
                  <p className="article-p">
                    そこから、記事を書く前に「source.md」というファイルを一枚作るようにした。
                  </p>
                  <p className="article-p">
                    内容はシンプルで、こんな項目を書いておく。
                  </p>
                  <ul className="article-ul">
                    <li className="article-li">この記事で何を伝えたいのか</li>
                    <li className="article-li">誰に向けて書くのか</li>
                    <li className="article-li">どんな問題があったのか</li>
                    <li className="article-li">原因は何だったのか</li>
                    <li className="article-li">何を試したのか</li>
                    <li className="article-li">どう改善したのか</li>
                    <li className="article-li">読者にどう感じてほしいのか</li>
                  </ul>
                  <p className="article-p">
                    daily notes から情報を拾い集めながら、これらの項目を埋めていく。作業としてはそこそこ時間がかかる。でも、この整理をしてから Claude へ渡すと、明らかに出力が変わった。
                  </p>
                </section>

                {/* ── Section 4: source.md の例 ── */}
                <section aria-labelledby="example">
                  <h2 id="example" className="article-h2">
                    source.md の例
                  </h2>
                  <p className="article-p">
                    実際には、こんな感じの内容を先に整理している。
                  </p>
                  <SourceMdBlock
                    filename="source.md"
                    code={SOURCE_MD_EXAMPLE}
                    label="実際に使っている設計メモの形式。毎回フォーマットは少し変わるが、「何を伝える記事なのか」を先に整理することが重要。"
                  />
                  <p className="article-p">
                    もちろん毎回フォーマットは少し変わる。でも、「何を伝える記事なのか」を先に整理するだけで、生成結果がかなり安定するようになった。
                  </p>
                </section>

                {/* ── Section 5: 何が変わったか ── */}
                <section aria-labelledby="before-after">
                  <h2 id="before-after" className="article-h2">
                    何が変わったか
                  </h2>
                  <p className="article-p">
                    一番実感したのは「記事としての流れ」が自然になったことだ。
                  </p>
                  <BeforeAfterComparison />
                  <p className="article-p">
                    修正量が減ったのは地味に助かっている。生成後に「なんか違う」と感じて大幅に書き直す、というループがほとんどなくなった。
                  </p>
                </section>

                {/* ── Quote ── */}
                <QuoteHighlight
                  quote="入力素材の構造が、そのまま出力品質を変える"
                  context="プロンプトの書き方ではなく、そもそも「何をAIに渡すか」の段階で決まっていた。"
                />

                {/* ── Section 6: 素材の構造がそのまま出力に出る ── */}
                <section aria-labelledby="principle">
                  <h2 id="principle" className="article-h2">
                    AIに読み込ませる素材が重要
                  </h2>
                  <p className="article-p">
                    今振り返ると、問題はシンプルだった。
                  </p>
                  <p className="article-p">
                    AIは渡されたものを素材にして記事を組み立てる。だから、渡す素材の構造がそのまま出力に影響する。構造のない素材からは、構造のある記事は出てきにくい。
                  </p>
                  <p className="article-p">
                    「AIをうまく使う」という文脈でプロンプトエンジニアリングの話がよく出てくるけど、個人的にはそれ以前の「入力素材の整理」のほうが、少なくとも記事生成においては影響が大きかった。
                  </p>
                  <p className="article-p">
                    サイト制作全体の流れについては{" "}
                    <Link href="/blog/site-launch" className="article-link">
                      サイト公開記録
                    </Link>{" "}
                    で触れているが、その中でもこの「何をAIに渡すか」という設計の部分が、一番効いた気がしている。
                  </p>
                </section>

                {/* ── Section 7: Key Points ── */}
                <section aria-labelledby="key-points">
                  <h2 id="key-points" className="article-h2">
                    整理すると
                  </h2>
                  <KeyPointsCards />
                </section>

                {/* ── Section 8: 今のワークフロー ── */}
                <section aria-labelledby="workflow">
                  <h2 id="workflow" className="article-h2">
                    今のワークフロー
                  </h2>
                  <p className="article-p">今はこんな流れで動いている。</p>
                  <SourceWorkflowDiagram />
                  <p className="article-p">
                    source.md を作る工程が増えたぶん、総作業時間が減ったかというと正直わからない。でも、「AIが出してきたものを直す」という後工程のストレスはかなり減った。
                  </p>
                  <p className="article-p">
                    AI役割分担（Cursor・Claude・ChatGPT のどれに何を任せるか）については{" "}
                    <Link href="/blog/ai-role-sharing-workflow" className="article-link">
                      別記事
                    </Link>{" "}
                    で詳しく書いた。source.md はその流れの中の一つのステップでもある。
                  </p>
                </section>

                {/* ── Section 9: おわりに ── */}
                <section aria-labelledby="conclusion">
                  <h2 id="conclusion" className="article-h2">
                    おわりに
                  </h2>
                  <p className="article-p">
                    この方法が誰にでも合うかはわからないし、「source.md が正解」というつもりもない。
                  </p>
                  <p className="article-p">
                    ただ、AI記事生成がうまくいかないと感じている人は、プロンプトより先に「何を渡しているか」を見直してみると何か変わるかもしれない。
                  </p>
                  <p className="article-p">
                    自分の場合は、AIの性能の問題ではなく、渡していた素材の問題だった。それに気づけたのが一番の収穫だったと思っている。
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
