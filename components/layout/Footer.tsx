import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "プライバシー" },
  { href: "/disclaimer", label: "免責" },
  { href: "/affiliate-disclosure", label: "広告・アフィリエイト表記" },
  { href: "/contact", label: "問い合わせ" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 text-sm">
        <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <Link
            href="/"
            className="font-medium text-slate-700 hover:text-[#2563eb]"
          >
            ToolArc
          </Link>
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} ToolArc
          </p>
        </div>

        <nav
          aria-label="透明性・ポリシー"
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-slate-500"
        >
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-slate-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
