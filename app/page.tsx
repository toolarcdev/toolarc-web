import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogSlugs } from "@/lib/blog/posts";
import { loadPost } from "@/lib/blog/load-post";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "ToolArc | AIツールの使い方と学び方",
  description: "AIツールを使い始めた方へ。ChatGPT・Cursor・Obsidianの使い方、AIやプログラミングの講座、記事制作やチームでのAI活用を紹介します。",
  alternates: { canonical: "/" },
};

type FeaturedArticle = {
  id: string;
  title: string;
  label: string;
  description: string;
  href: string;
  image?: string;
};

// Homepage selections only; article bodies and affiliate registries stay intact.
// Home images are pre-sized WebP thumbnails selected for each article's readers.
const featuredGroups: {
  id: string;
  title: string;
  description: string;
  articles: FeaturedArticle[];
}[] = [
  {
    id: "learn",
    title: "AIを学ぶ",
    description: "セミナーや講座を、内容と学び方から検討する。",
    articles: [
      {
        id: "seminar",
        title: "AIスキルアカデミー",
        label: "無料オンラインセミナー",
        description: "内容や参加方法、有料講座の案内も確認してから参加を決められます。",
        href: "/lp/ai-skill-academy-free-seminar",
        image: "/images/home/seminar.webp",
      },
      {
        id: "school",
        title: "AIスキルアカデミー",
        label: "有料講座",
        description: "学べるAIと活用例を見て、教材・支援・費用が自分に合うか検討できます。",
        href: "/lp/ai-skill-academy-paid-school",
        image: "/images/home/school.webp",
      },
      {
        id: "bytech",
        title: "バイテック生成AI",
        label: "課題・メンター相談",
        description: "教材・実践課題と、プランごとの相談方法・支援期間を比較できます。",
        href: "/lp/bytech-generative-ai",
        image: "/images/home/bytech.webp",
      },
      {
        id: "academy",
        title: "インターネット・アカデミー",
        label: "仕事でのAI活用",
        description: "商談メモ・社内文書・メールの活用例から、独学との違いを検討できます。",
        href: "/lp/internet-academy-generative-ai",
        image: "/images/home/academy.webp",
      },
    ],
  },
  {
    id: "code",
    title: "プログラミングを学ぶ",
    description: "講座と実践の入口から、自分に合う進め方を探す。",
    articles: [
      {
        id: "programming",
        title: "ProgrammingHacks",
        label: "プログラミング講座",
        description: "学ぶ順番とLINE質問の範囲を知り、無料教材との違いを比べられます。",
        href: "/lp/programming-hacks",
        image: "/images/home/programming.webp",
      },
      {
        id: "game",
        title: "ゲーム制作の学習ロードマップ",
        label: "学習ガイド",
        description: "初心者向けの学習ロードマップ5選を紹介。",
        href: "/blog/game-dev-roadmap-comparison",
      },
    ],
  },
  {
    id: "work",
    title: "AIを仕事・記事制作に使う",
    description: "記事を書く。会議を文字に残す。具体的な場面から考える。",
    articles: [
      {
        id: "writing",
        title: "AIブログ記事の作り方",
        label: "記事制作",
        description: "素材整理から公開まで、AIを使う記事制作の手順。",
        href: "/blog/ai-blog-writing-workflow-source-to-publish",
      },
      {
        id: "doraverse",
        title: "Notta無料版はどこまで使える？",
        label: "会議・議事録",
        description: "無料版の制限と、有料プランが必要になる使い方を確認できます。",
        href: "/blog/notta-free-plan-limits",
      },
    ],
  },
];

const toolLinks = [
  { name: "ChatGPT", description: "機種変更・履歴の引き継ぎ", href: "/series/chatgpt-account-migration-series" },
  { name: "Cursor", description: "モデル選び・開発の進め方", href: "/blog/cursor-model-selection-guide" },
  { name: "Obsidian", description: "ノート管理・AIとの組み合わせ", href: "/series/claude-obsidian-workflow-series" },
] as const;

const footerLinks = [
  { href: "/about", label: "運営者情報" },
  { href: "/contact", label: "問い合わせ" },
  { href: "/affiliate-disclosure", label: "広告掲載方針" },
  { href: "/privacy", label: "プライバシー" },
  { href: "/disclaimer", label: "免責" },
] as const;

function ArticleCard({ article }: { article: FeaturedArticle }) {
  return (
    <article className={styles.entry}>
      <Link
        href={article.href}
        prefetch={false}
        className={`${styles.card} ${article.image ? styles.hasImage : ""}`}
        aria-labelledby={`card-${article.id}-title card-${article.id}-label`}
        data-home-card={article.id}
      >
        {article.image && (
          <div className={styles.cardImage}>
            <Image
              src={article.image}
              alt=""
              fill
              unoptimized
              sizes={article.id === "programming"
                ? "(max-width: 767px) calc(100vw - 40px), (max-width: 1050px) calc((100vw - 108px) / 2), 180px"
                : "(max-width: 767px) calc(100vw - 40px), (max-width: 1050px) calc((100vw - 108px) / 2), (max-width: 1200px) calc((100vw - 164px) / 4), 258px"}
            />
          </div>
        )}
        <div className={styles.cardBody}>
          <p className={styles.label} id={`card-${article.id}-label`}>{article.label}</p>
          <h3 id={`card-${article.id}-title`}>{article.title}</h3>
          <p className={styles.cardDescription}>{article.description}</p>
        </div>
      </Link>
    </article>
  );
}

export default async function Home() {
  const allArticles = await Promise.all(
    blogSlugs.map(async (slug) => {
      const post = await loadPost(slug);
      return { slug, title: post.title, publishedAt: post.publishedAt };
    }),
  );
  // Preserve the existing publication-date order, not an update-date feed.
  const latestArticles = allArticles
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3);

  return (
    <div className={styles.home}>
      <a className={styles.skipLink} href="#home-content">本文へ</a>
      <header className={styles.masthead}>
        <p>AIツールの使い方と学び方</p>
        <Link className={styles.brand} href="/" aria-label="ToolArc ホーム">ToolArc<span>.</span></Link>
        <nav aria-label="メインナビゲーション">
          <Link href="/blog">記事一覧</Link>
          <Link href="/search">検索</Link>
          <Link href="/series">シリーズ</Link>
          <Link href="/about">ToolArcについて</Link>
        </nav>
      </header>
      <main id="home-content">
        <section className={styles.introBand} aria-labelledby="home-heading">
          <div className={`${styles.wrap} ${styles.intro}`}>
            <h1 id="home-heading">AIを使う。<br />学び方を見つける。</h1>
            <div className={styles.introCopy}>
              <p>AIツールを使い始めた方へ。使い方の解説から、講座・サービスを検討するための情報まで届けます。</p>
              <nav className={styles.genreJumps} aria-label="このページのジャンル">
                {featuredGroups.map((group) => <a href={`#${group.id}`} key={group.id}>{group.title}</a>)}
              </nav>
            </div>
          </div>
        </section>
        <div className={styles.wrap}>
          {featuredGroups.map((group) => (
            <section className={styles.genre} id={group.id} key={group.id} aria-labelledby={`${group.id}-heading`} tabIndex={-1}>
              <div className={styles.sectionHead}>
                <h2 id={`${group.id}-heading`}>{group.title}</h2>
                <p>{group.description}</p>
              </div>
              <div className={`${styles.cards} ${group.id === "learn" ? styles.fourCards : styles.twoCards}`}>
                {group.articles.map((article) => <ArticleCard article={article} key={article.id} />)}
              </div>
            </section>
          ))}
          <section className={styles.tools} aria-labelledby="tools-heading">
            <div className={styles.sectionHead}>
              <h2 id="tools-heading">ツール別に読む</h2>
              <p>設定・使い方・困ったときの手順をまとめています。</p>
            </div>
            <div className={styles.toolLinks}>
              {toolLinks.map((tool) => (
                <Link href={tool.href} key={tool.name}><strong>{tool.name}</strong><span>{tool.description}</span></Link>
              ))}
            </div>
            <Link className={styles.smallLink} href="/series">シリーズ一覧を見る <span aria-hidden="true">↗</span></Link>
          </section>
          <section className={styles.latest} aria-labelledby="latest-heading">
            <div className={styles.latestHead}>
              <h2 id="latest-heading">最近公開した記事</h2>
              <Link className={styles.smallLink} href="/blog">記事一覧 <span aria-hidden="true">↗</span></Link>
            </div>
            <ul>
              {latestArticles.map((article) => (
                <li key={article.slug}>
                  <time dateTime={article.publishedAt}>{article.publishedAt.replaceAll("-", ".")}</time>
                  <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.wrap}>
          <div className={styles.footerTop}>
            <div>
              <Link className={styles.brand} href="/">ToolArc<span>.</span></Link>
              <p>AIツールの使い方や、学び方を紹介しています。</p>
            </div>
            <nav aria-label="透明性・ポリシー">
              {footerLinks.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
            </nav>
          </div>
          <p className={styles.disclosure}>当サイトはアフィリエイト広告を利用しています。</p>
          <small>© {new Date().getFullYear()} ToolArc</small>
        </div>
      </footer>
    </div>
  );
}
