import type { Metadata } from "next";
import Link from "next/link";
import { blogSlugs } from "@/lib/blog/posts";
import { loadPost } from "@/lib/blog/load-post";

const GITHUB_URL = "https://github.com/toolarcdev/toolarc-web";

export const metadata: Metadata = {
  title: "ToolArc | 初心者向けの開発・AI学習ブログ",
  description:
    "Cursor、Claude、Next.js、GitHub、Vercelを使い始める初心者向けに、わかりやすい手順と実践記事をまとめています。",
};

const TOPICS = [
  "Cursor の使い方",
  "Claude の活用",
  "AI ワークフロー",
  "Next.js 入門",
  "GitHub / Vercel の設定",
  "開発ツール・ゲーム関連ユーティリティ",
] as const;

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  }).format(new Date(`${iso}T12:00:00+09:00`));
}

export default async function Home() {
  const articles = await Promise.all(
    blogSlugs.map(async (slug) => {
      const post = await loadPost(slug);
      return {
        slug,
        title: post.title,
        description: post.description,
        publishedAt: post.publishedAt,
      };
    }),
  );

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <header className="border-b border-[#dbeafe] bg-white">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4 sm:h-16 sm:px-6">
          <Link
            href="/"
            className="text-base font-semibold tracking-tight text-slate-900"
          >
            ToolArc
          </Link>
          <nav aria-label="メインナビゲーション" className="flex items-center gap-4 sm:gap-6">
            <Link
              href="#articles"
              className="text-sm text-slate-600 hover:text-[#2563eb]"
            >
              記事一覧
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-600 hover:text-[#2563eb]"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section
          aria-labelledby="hero-heading"
          className="border-b border-[#dbeafe] bg-[#f8fbff] px-4 py-14 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-medium text-[#2563eb]">
              初心者向け · 日本語ブログ
            </p>
            <h1
              id="hero-heading"
              className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl"
            >
              はじめての開発でも、
              <br className="hidden sm:block" />
              焦らず学べる場所
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              ToolArc は、Cursor や Claude、Next.js、GitHub、Vercel
              などを使い始める方のためのブログです。専門用語はできるだけ噛み砕き、手順を追いながら読める記事を中心に公開しています。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="#articles"
                className="inline-flex items-center justify-center rounded-lg bg-[#60a5fa] px-6 py-3 text-sm font-medium text-white hover:bg-[#3b82f6]"
              >
                記事を読む
              </Link>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-[#dbeafe] bg-white px-6 py-3 text-sm font-medium text-slate-700 hover:border-[#60a5fa] hover:text-[#2563eb]"
              >
                GitHub を見る
              </a>
            </div>
          </div>
        </section>

        <section
          id="articles"
          aria-labelledby="articles-heading"
          className="px-4 py-14 sm:px-6 sm:py-16"
        >
          <div className="mx-auto max-w-3xl">
            <h2
              id="articles-heading"
              className="text-2xl font-bold text-slate-900"
            >
              記事一覧
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              公開中の記事です。気になるタイトルからお読みください。
            </p>

            <ul className="mt-8 space-y-4" role="list">
              {articles.map((article) => (
                <li key={article.slug}>
                  <article className="rounded-xl border border-[#dbeafe] bg-white p-5 sm:p-6">
                    <time
                      dateTime={article.publishedAt}
                      className="text-sm text-slate-500"
                    >
                      {formatDate(article.publishedAt)}
                    </time>
                    <h3 className="mt-2 text-lg font-semibold leading-snug text-slate-900">
                      <Link
                        href={`/blog/${article.slug}`}
                        className="hover:text-[#2563eb]"
                      >
                        {article.title}
                      </Link>
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600 line-clamp-3">
                      {article.description}
                    </p>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="mt-4 inline-block text-sm font-medium text-[#2563eb] hover:underline"
                    >
                      記事を読む →
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="topics-heading"
          className="border-t border-[#dbeafe] bg-[#f8fbff] px-4 py-14 sm:px-6 sm:py-16"
        >
          <div className="mx-auto max-w-3xl">
            <h2
              id="topics-heading"
              className="text-2xl font-bold text-slate-900"
            >
              扱っているテーマ
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              今後も、初心者の検索意図に合わせた実践記事を追加していく予定です。
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2" role="list">
              {TOPICS.map((topic) => (
                <li
                  key={topic}
                  className="rounded-lg border border-[#dbeafe] bg-white px-4 py-3 text-sm text-slate-700"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="about-heading"
          className="px-4 py-14 sm:px-6 sm:py-16"
        >
          <div className="mx-auto max-w-3xl">
            <h2 id="about-heading" className="text-2xl font-bold text-slate-900">
              このサイトについて
            </h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-slate-600">
              <p>
                ToolArc は、個人開発や AI ツールの学習記録を共有するためのサイトです。完璧な知識がなくても、手順を追えば一歩ずつ進めることを大切にしています。
              </p>
              <p>
                記事では、うまくいったことだけでなく、詰まった場面や試した解決策も正直に書いています。同じ段階で学んでいる方の参考になれば幸いです。
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#dbeafe] bg-[#f8fbff] px-4 py-8 sm:px-6">
        <p className="mx-auto max-w-3xl text-center text-sm text-slate-500">
          © {new Date().getFullYear()} ToolArc
        </p>
      </footer>
    </div>
  );
}
