import type { Metadata } from "next";
import Link from "next/link";
import { BlogShell } from "@/components/blog/BlogShell";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { WorkflowDiagram } from "@/components/blog/ai-role-sharing/WorkflowDiagram";
import { AIRoleCards } from "@/components/blog/ai-role-sharing/AIRoleCards";
import { QuoteHighlight } from "@/components/blog/ai-role-sharing/QuoteHighlight";
import { StickyTOC } from "@/components/blog/ai-role-sharing/StickyTOC";
import { RelatedArticles } from "@/components/blog/ai-role-sharing/RelatedArticles";
import { SITE_URL, blogPostUrl } from "@/lib/blog/constants";

const SLUG = "ai-role-sharing-workflow";
const PAGE_URL = blogPostUrl(SLUG);
const PUBLISHED_AT = "2026-05-22";

const TITLE =
  "Cursor・Claude・ChatGPTはどう使い分ける？ 実際に試して分かったAI役割分担の話";
const DESCRIPTION =
  "Cursor・Claude・ChatGPTを実際に使い続けて気づいた「AI役割分担」の話。コード生成はCursor、長文整理はClaude、SEO相談はChatGPT——そう決まるまでの手探りと試行錯誤を、初心者目線でそのまま書きました。";

export const metadata: Metadata = {
  title: `${TITLE} | ToolArc`,
  description: DESCRIPTION,
  keywords: ["Cursor", "Claude", "ChatGPT", "AI役割分担", "AIワークフロー", "個人開発"],
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
  { id: "intro", label: "この記事で分かること" },
  { id: "all-in-chatgpt", label: "最初は全部ChatGPTに" },
  { id: "workflow-stable", label: "役割分担で安定した" },
  { id: "chatgpt-limit", label: "ChatGPTだけでは限界" },
  { id: "first-impression", label: "CursorとClaude" },
  { id: "actual-workflow", label: "実際の役割分担" },
  { id: "before-after", label: "Before / After" },
  { id: "human-org", label: "人間側の整理が大事" },
  { id: "ai-character", label: "3つのAIの空気感" },
  { id: "conclusion", label: "まとめ" },
] satisfies { id: string; label: string }[];

const RELATED_ARTICLES = [
  {
    href: "/blog/site-launch",
    title: "AI初心者がゼロからWebサイトを公開するまでにやったこと・詰まったこと全部まとめ",
    description:
      "Next.jsもReactもDNSもほぼ知らない状態から、AIツールを頼りながら実際にWebサイトを公開するまでの記録。",
    isParent: true,
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
  isPartOf: {
    "@type": "Blog",
    name: "ToolArc",
    url: SITE_URL,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "ToolArc",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "記事一覧",
      item: `${SITE_URL}/#articles`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: TITLE,
      item: PAGE_URL,
    },
  ],
};

export default function AIRoleSharingWorkflowPage() {
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
          <nav
            aria-label="パンくずリスト"
            className="mb-8 text-sm text-slate-500"
          >
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
                <Link
                  href="/blog/site-launch"
                  className="hover:text-[#2563eb]"
                >
                  サイト公開記録
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li
                className="max-w-48 truncate text-slate-700 sm:max-w-xs"
                aria-current="page"
              >
                AI役割分担の話
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
                tags={["cursor", "claude", "chatgpt", "ai-workflow"]}
              />

              <div className="article mt-10 animate-fade-in">
                {/* ── Section 1: この記事で分かること ── */}
                <section aria-labelledby="intro">
                  <h2 id="intro" className="article-h2">
                    この記事で分かること
                  </h2>
                  <ul className="article-ul">
                    <li className="article-li">Cursor / Claude / ChatGPT の使い分け</li>
                    <li className="article-li">AI役割分担で作業効率が上がった理由</li>
                    <li className="article-li">AIにうまく渡すコツ</li>
                    <li className="article-li">ToolArc流のAI workflow</li>
                    <li className="article-li">「AIより整理力が大事」と感じた理由</li>
                  </ul>
                </section>

                {/* Workflow diagram */}
                <WorkflowDiagram />

                {/* ── Section 2: 最初は全部ChatGPTに投げていた ── */}
                <section aria-labelledby="all-in-chatgpt">
                  <h2 id="all-in-chatgpt" className="article-h2">
                    最初は全部ChatGPTに投げていた
                  </h2>
                  <p className="article-p">
                    最初は全部ChatGPTに投げていた。
                  </p>
                  <p className="article-p">
                    コード修正も、記事構成も、SEO相談も、「とりあえずChatGPT」でなんとかなると思っていたし、実際しばらくはそれで回っていた。
                  </p>
                  <p className="article-p">
                    でも開発や記事制作が少しずつ複雑になるにつれて、違和感が増えていった。
                  </p>
                  <ul className="article-ul">
                    <li className="article-li">コード修正は微妙にズレる</li>
                    <li className="article-li">長文構成は意図が崩れる</li>
                    <li className="article-li">初心者向け説明が少し硬い</li>
                    <li className="article-li">SEO相談が浅く感じることがある</li>
                  </ul>
                  <p className="article-p">
                    ひとつひとつは小さい。でも積み重なると、じわじわストレスになる。
                  </p>
                  <p className="article-p">
                    「AIを使いこなせていないのは自分のせいかな」と思っていたけど、もしかするとツールごとに得意分野が違うのではないか、と考え始めた。
                  </p>
                  <p className="article-p">そこから、AIを役割分担して使うようになった。</p>
                </section>

                {/* ── Section 3: AI役割分担で安定した ── */}
                <section aria-labelledby="workflow-stable">
                  <h2 id="workflow-stable" className="article-h2">
                    AI役割分担を意識してから、作業がかなり安定した
                  </h2>
                  <p className="article-p">今のワークフローは大体こんな感じ。</p>
                  <p className="article-p">
                    「どのAIに何を任せるか」を整理しただけで、かなり作業効率が変わった。もちろん完全固定ではない。でも方向性を持つだけで、迷いが減った。
                  </p>
                </section>

                {/* AI Role Cards */}
                <AIRoleCards />

                {/* ── Section 4: ChatGPTだけでは通用しなくなってきた ── */}
                <section aria-labelledby="chatgpt-limit">
                  <h2 id="chatgpt-limit" className="article-h2">
                    「とりあえずChatGPT」が通用しなくなってきた
                  </h2>
                  <p className="article-p">
                    AIを使い始めた頃、ツールの使い分けなんて考えていなかった。
                  </p>
                  <p className="article-p">
                    ChatGPTが一番有名で、一番使いやすくて、一番「AIっぽい」感じがしたから、なんでもそこに投げていた。最初はそれでよかった。
                  </p>
                  <p className="article-p">でも、</p>
                  <ul className="article-ul">
                    <li className="article-li">コードを直してほしいのに説明ばかり返ってくる</li>
                    <li className="article-li">長い構成メモを渡しても要点がズレる</li>
                    <li className="article-li">「初心者向けで」と頼んでも技術寄りになる</li>
                  </ul>
                  <p className="article-p">みたいなことが少しずつ増えていった。</p>
                  <p className="article-p">
                    その都度プロンプトを工夫して、それでもズレる。「自分の聞き方が悪いんだろうな」と思いながら使っていた。
                  </p>
                  <p className="article-p">
                    でも後から振り返ると、単純に「向いている役割」が違ったのかもしれない。
                  </p>
                </section>

                {/* ── Section 5: CursorとClaude ── */}
                <section aria-labelledby="first-impression">
                  <h2 id="first-impression" className="article-h2">
                    CursorとClaudeを試し始めたときの正直な感想
                  </h2>

                  <h3 className="article-h3">Cursorを使ったとき</h3>
                  <p className="article-p">
                    Cursorを使い始めたのは、「IDEにAIが入ってるらしい」という程度の理解からだった。最初は半信半疑だった。
                  </p>
                  <p className="article-p">
                    でも実際にNext.jsの実装を任せてみると、体感スピードがかなり違った。例えば、
                  </p>
                  <ul className="article-ul">
                    <li className="article-li">「SP時だけレイアウト崩れるので修正して」</li>
                    <li className="article-li">「Tailwindのpaddingだけ整えて」</li>
                    <li className="article-li">「このコンポーネントだけ軽くしたい」</li>
                  </ul>
                  <p className="article-p">
                    みたいな細かいUI調整がかなり速い。コード全体の文脈を理解した状態で会話できるので、「このファイルのこの部分を直して」が成立する。
                  </p>
                  <p className="article-p">
                    ただし、指示が曖昧だと想定外の実装をかなり速くやってくれる。「あれ、そこまで頼んでない」ということも普通にある。
                  </p>
                  <p className="article-p">だから今は、Cursorに渡す前に、</p>
                  <ul className="article-ul">
                    <li className="article-li">何を修正したいか</li>
                    <li className="article-li">何を変更したくないか</li>
                    <li className="article-li">どこまで触っていいか</li>
                  </ul>
                  <p className="article-p">を整理するようになった。</p>

                  <hr className="article-hr" />

                  <h3 className="article-h3">Claudeを使ったとき</h3>
                  <p className="article-p">
                    Claudeを使い始めたのはもう少し後だった。最初は「ChatGPTと似たようなものかな」と思っていた。
                  </p>
                  <p className="article-p">
                    でも長いsource.mdを渡したとき、かなり印象が変わった。例えば、
                  </p>
                  <ul className="article-ul">
                    <li className="article-li">読者ターゲット</li>
                    <li className="article-li">記事の温度感</li>
                    <li className="article-li">SEO方向性</li>
                    <li className="article-li">構成メモ</li>
                  </ul>
                  <p className="article-p">
                    をまとめて渡すと、「情報全体の意図」を踏まえた返答が返ってくる。それまでChatGPTでは、長文を渡すと後半の意図が薄れることがあった。
                  </p>
                  <p className="article-p">
                    Claudeは、長文整理・記事骨格・情報構造化との相性がかなり良かった。特に「この情報を整理して、初心者向けに構成してほしい」みたいな依頼は強い。
                  </p>
                </section>

                {/* ── Section 6: 実際の役割分担 ── */}
                <section aria-labelledby="actual-workflow">
                  <h2 id="actual-workflow" className="article-h2">
                    実際の役割分担——今はこう使っている
                  </h2>

                  <h3 className="article-h3">Cursor：コードを書く・直す・実装する</h3>
                  <p className="article-p">
                    実装はほぼCursorに任せている。Next.js実装、Tailwind修正、UI調整、軽微なエラー修正はかなり速い。
                  </p>
                  <p className="article-p">
                    ただし「なんとなくこういう感じ」で渡すと、独自解釈が始まる。だから最近は、修正対象・変更してほしくない箇所・目的を整理してから渡すようになった。
                  </p>

                  <hr className="article-hr" />

                  <h3 className="article-h3">Claude：長文整理・構成・記事の骨格づくり</h3>
                  <p className="article-p">
                    source.mdのような構成メモを渡して、記事の骨格を作るのに使っている。長い情報を渡しても、全体の意図を拾ってくれる感覚がある。
                  </p>
                  <p className="article-p">
                    特に「この読者向け」「この温度感」「初心者向け」「SEOを意識しつつ自然に」みたいな条件を整理して渡すと、精度がかなり変わる。
                  </p>

                  <hr className="article-hr" />

                  <h3 className="article-h3">ChatGPT：SEO相談・初心者向け説明・ワークフロー相談</h3>
                  <p className="article-p">ChatGPTは壁打ち的に使うことが多い。例えば、</p>
                  <ul className="article-ul">
                    <li className="article-li">「この検索意図って何だろう」</li>
                    <li className="article-li">「初心者はどこで詰まりそう？」</li>
                    <li className="article-li">「このworkflow、無駄ない？」</li>
                  </ul>
                  <p className="article-p">
                    みたいな相談。特に「ふわっとした相談」に付き合ってくれる感じがある。初心者向け説明の確認もしやすい。
                  </p>
                </section>

                {/* ── Section 7: Before / After ── */}
                <section aria-labelledby="before-after">
                  <h2 id="before-after" className="article-h2">
                    Before / Afterで見ると、かなり変わった
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-[#dbeafe] bg-white p-5">
                      <p className="mb-3 text-sm font-semibold text-slate-500">Before</p>
                      <ul className="space-y-2 text-sm text-slate-600">
                        {[
                          "全部ChatGPT",
                          "プロンプト迷子",
                          "AIの返答がズレる",
                          "毎回説明し直す",
                          "作業フローが不安定",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-[#dbeafe] bg-[#f8fbff] p-5">
                      <p className="mb-3 text-sm font-semibold text-[#2563eb]">After</p>
                      <ul className="space-y-2 text-sm text-slate-600">
                        {[
                          "ChatGPT → 壁打ち",
                          "Claude → 構成整理",
                          "Cursor → 実装",
                          "AIごとの得意分野を使う",
                          "workflowがかなり安定",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#60a5fa]" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Quote Highlight */}
                <QuoteHighlight
                  quote="AIより人間側の整理が大事だった"
                  context="どのAIに何を渡すか考えるようになってから、「自分が何をしたいのか」を整理するクセがついた。"
                />

                {/* ── Section 8: 気づいたこと ── */}
                <section aria-labelledby="human-org">
                  <h2 id="human-org" className="article-h2">
                    気づいたこと
                  </h2>
                  <p className="article-p">
                    役割分担を意識してから、かなり精度が上がった。でも同時に思った。
                  </p>
                  <p className="article-p">
                    「AIの精度が上がったのか、自分の整理が上がったのか、どっちだろう？」
                  </p>
                  <p className="article-p">多分、両方だと思う。</p>
                  <p className="article-p">
                    曖昧なまま投げると、曖昧な返答が返ってくる。これはどのAIでも同じだった。
                  </p>
                  <p className="article-p">逆に、</p>
                  <ul className="article-ul">
                    <li className="article-li">ゴール</li>
                    <li className="article-li">読者</li>
                    <li className="article-li">制約</li>
                    <li className="article-li">やりたいこと</li>
                  </ul>
                  <p className="article-p">
                    を整理して渡すと、かなり精度が変わる。最近は、「AIを使いこなす」というより、
                    <strong className="font-semibold text-slate-900">「自分の思考整理をAI経由でやっている」</strong>感覚に近い。
                  </p>
                </section>

                {/* ── Section 9: 3つのAIの空気感 ── */}
                <section aria-labelledby="ai-character">
                  <h2 id="ai-character" className="article-h2">
                    役割分担して感じた「3つのAIの空気感」
                  </h2>
                  <p className="article-p">
                    機能比較をしたいわけではない。でも使い続けると、なんとなく「キャラ」は感じる。
                  </p>

                  <h3 className="article-h3">Cursor — 職人・プログラマー</h3>
                  <p className="article-p">
                    こちらの意図を汲みながら、手を動かしてくれる。ただし指示が曖昧だと独自解釈も速い。
                  </p>

                  <h3 className="article-h3">Claude — 編集者</h3>
                  <p className="article-p">
                    素材を渡すと、情報整理・構造化・文脈調整を丁寧にやってくれる。
                  </p>

                  <h3 className="article-h3">ChatGPT — 相談相手</h3>
                  <p className="article-p">
                    AIと関わっている時間の大半がChatGPT。壁打ち、アイデア整理、「どう思う？」みたいな問いに付き合ってくれる感覚がある。ClaudeやCursorで作成された成果物のレビューも任せている。
                  </p>
                </section>

                {/* ── Section 10: まとめ ── */}
                <section aria-labelledby="conclusion">
                  <h2 id="conclusion" className="article-h2">
                    まとめというより、現時点での記録として
                  </h2>
                  <p className="article-p">
                    AIを全部同じように使っていた頃より、今のほうが明らかにworkflowが回っている。でも「これで完成」とは全然思っていない。
                  </p>
                  <p className="article-p">
                    Cursorも進化するし、ClaudeもChatGPTも変わっていく。今の役割分担が半年後もそのままとは限らない。
                  </p>
                  <p className="article-p">ただ今言えるのは、</p>
                  <p className="article-p">
                    <strong className="font-semibold text-slate-900">
                      「全部を雑に任せるより、役割分担して丁寧に渡したほうが強かった」
                    </strong>
                  </p>
                  <p className="article-p">ということ。</p>
                  <p className="article-p">
                    AIは万能じゃない。でも使えば使うほど、「どう渡すか」が重要になる。そしてその整理力は、そのまま自分のアウトプットの質につながっている気がする。
                  </p>
                  <p className="article-p">
                    ToolArcでは、こういう「AI個人開発 workflow」を今後も整理していく予定です。
                  </p>
                </section>
              </div>

              {/* Related articles + back link */}
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
