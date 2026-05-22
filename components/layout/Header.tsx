"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GITHUB_URL, NAV_LINKS } from "@/lib/navigation";

/**
 * Global sticky header.
 * Nav items come from lib/navigation.ts — never hardcode article links here.
 */
export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-slate-900 hover:text-[#2563eb]"
        >
          ToolArc
        </Link>

        <nav
          aria-label="メインナビゲーション"
          className="flex items-center gap-0.5"
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  isActive
                    ? "bg-[#eff6ff] font-medium text-[#2563eb]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1.5 rounded-md px-3 py-1.5 text-sm text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
