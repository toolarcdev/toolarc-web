"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  NAV_LINKS,
  SEARCH_ENTRY_HREF,
  SEARCH_ENTRY_LABEL,
} from "@/lib/navigation";

/**
 * Global sticky header (site design D3).
 * Single breakpoint: md — desktop full nav / mobile hamburger only.
 * No Series/Tools dropdown yet (C4: 中身未充足).
 */
export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onPointerDown = (event: MouseEvent | PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  const linkClass = (href: string, options?: { markActive?: boolean }) => {
    const markActive = options?.markActive !== false;
    const isActive =
      markActive &&
      (href === "/blog"
        ? pathname === "/blog" || pathname.startsWith("/blog/")
        : pathname === href || pathname.startsWith(`${href}/`));
    return `rounded-md px-3 py-1.5 text-sm transition-colors ${
      isActive
        ? "bg-[#eff6ff] font-medium text-[#2563eb]"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`;
  };

  const navItems = (
    <>
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={linkClass(link.href)}
          onClick={() => setMenuOpen(false)}
        >
          {link.label}
        </Link>
      ))}
      <Link
        href={SEARCH_ENTRY_HREF}
        className={linkClass(SEARCH_ENTRY_HREF, { markActive: false })}
        onClick={() => setMenuOpen(false)}
        aria-label="記事を検索"
      >
        {SEARCH_ENTRY_LABEL}
      </Link>
    </>
  );

  return (
    <header
      ref={rootRef}
      className="sticky top-0 z-40 border-b border-slate-200 bg-white"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-slate-900 hover:text-[#2563eb]"
        >
          ToolArc
        </Link>

        {/* Desktop: full horizontal nav (md+ only) */}
        <nav
          aria-label="メインナビゲーション"
          className="hidden items-center gap-0.5 md:flex"
        >
          {navItems}
        </nav>

        {/* Mobile: hamburger only below md */}
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-700 hover:bg-slate-50 md:hidden"
          aria-controls={menuId}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">メニュー</span>
          <span aria-hidden className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-5 bg-current transition ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {menuOpen ? (
        <nav
          id={menuId}
          aria-label="モバイルナビゲーション"
          className="border-t border-slate-200 bg-white px-4 py-3 md:hidden"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-1">{navItems}</div>
        </nav>
      ) : null}
    </header>
  );
}
