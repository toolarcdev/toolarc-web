import Link from "next/link";

const GITHUB_URL = "https://github.com/toolarcdev/toolarc-web";

type BlogShellProps = {
  children: React.ReactNode;
};

/**
 * ブログ記事ページ共通の外枠（ヘッダー・フッター）。
 * TOP ページと同じ配色・ナビ構造を再利用する。
 */
export function BlogShell({ children }: BlogShellProps) {
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
          <nav
            aria-label="ブログナビゲーション"
            className="flex items-center gap-4 sm:gap-6"
          >
            <Link
              href="/#articles"
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

      {children}

      <footer className="border-t border-[#dbeafe] bg-[#f8fbff] px-4 py-8 sm:px-6">
        <p className="mx-auto max-w-3xl text-center text-sm text-slate-500">
          <Link href="/" className="hover:text-[#2563eb]">
            ToolArc トップへ
          </Link>
        </p>
      </footer>
    </div>
  );
}
