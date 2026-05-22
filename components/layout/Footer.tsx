import Link from "next/link";
import { GITHUB_URL } from "@/lib/navigation";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-sm sm:flex-row sm:justify-between">
        <Link
          href="/"
          className="font-medium text-slate-700 hover:text-[#2563eb]"
        >
          ToolArc
        </Link>

        <nav
          aria-label="フッターナビゲーション"
          className="flex items-center gap-5 text-slate-500"
        >
          <Link href="/blog" className="hover:text-slate-700">
            Blog
          </Link>
          <Link href="/series" className="hover:text-slate-700">
            Series
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-700"
          >
            GitHub
          </a>
        </nav>

        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} ToolArc
        </p>
      </div>
    </footer>
  );
}
