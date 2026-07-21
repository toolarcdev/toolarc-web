import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StaticPageShell } from "@/components/layout/StaticPageShell";
import {
  BRAND_DISPLAY_NAME,
  BRAND_MARK_ALT,
  BRAND_MARK_PATH,
  X_HANDLE,
  X_PROFILE_URL,
} from "@/lib/brand";
import { GITHUB_URL } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "About | ToolArc",
  description:
    "ToolArc（toolarc）の運営について。AI×エンジニア領域のTips・比較・自作ツールを公開しています。",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <StaticPageShell
      title="About"
      description="ToolArc の運営と方針"
    >
      <div className="flex items-start gap-4">
        <Image
          src={BRAND_MARK_PATH}
          alt={BRAND_MARK_ALT}
          width={72}
          height={72}
          className="h-[72px] w-[72px] shrink-0 rounded-xl"
          unoptimized
        />
        <div>
          <p className="text-lg font-semibold text-slate-900">
            {BRAND_DISPLAY_NAME}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            サイト表示名義。外部アカウントは取得都合でハンドルが異なる場合があります。
          </p>
        </div>
      </div>

      <section aria-labelledby="about-area">
        <h2 id="about-area" className="text-lg font-semibold text-slate-900">
          領域
        </h2>
        <p className="mt-2">
          エンジニアとしての開発経験をベースに、AI を使ったプロダクト開発と検証を続けています。
          Cursor・Claude・Next.js・Vercel などを題材に、現場で再現できる手順を Tips・比較・自作ツールとして公開しています。
        </p>
      </section>

      <section aria-labelledby="about-products">
        <h2 id="about-products" className="text-lg font-semibold text-slate-900">
          制作物・方針
        </h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <Link href="/blog" className="text-[#2563eb] hover:underline">
              Blog
            </Link>
            — AI 開発・ワークフロー・トラブル解決の実践記録
          </li>
          <li>
            <Link href="/series" className="text-[#2563eb] hover:underline">
              Series
            </Link>
            — テーマ別の連載入口
          </li>
          <li>
            <Link
              href="/tools/poe2-regex"
              className="text-[#2563eb] hover:underline"
            >
              PoE2 Regex
            </Link>
            — 自作ツール（拡充中）
          </li>
        </ul>
        <p className="mt-3">
          推測と実測を分けて書くこと、直アフィリエイト禁止の比較導線を守ることを方針としています。
          仕様や料金は執筆時点の注記を優先し、重要な判断は公式ドキュメントの確認を促します。
        </p>
      </section>

      <section aria-labelledby="about-links">
        <h2 id="about-links" className="text-lg font-semibold text-slate-900">
          リンク
        </h2>
        <ul className="mt-2 space-y-2">
          <li>
            <span className="text-slate-500">GitHub（主）: </span>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2563eb] hover:underline"
            >
              {GITHUB_URL.replace("https://", "")}
            </a>
          </li>
          <li>
            <span className="text-slate-500">X（副）: </span>
            <a
              href={X_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2563eb] hover:underline"
            >
              {X_HANDLE}
            </a>
          </li>
        </ul>
      </section>

      <section aria-labelledby="about-policy">
        <h2 id="about-policy" className="text-lg font-semibold text-slate-900">
          ポリシー
        </h2>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <li>
            <Link href="/privacy" className="text-[#2563eb] hover:underline">
              プライバシー
            </Link>
          </li>
          <li>
            <Link href="/disclaimer" className="text-[#2563eb] hover:underline">
              免責
            </Link>
          </li>
          <li>
            <Link
              href="/affiliate-disclosure"
              className="text-[#2563eb] hover:underline"
            >
              広告・アフィリエイト表記
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-[#2563eb] hover:underline">
              問い合わせ
            </Link>
          </li>
        </ul>
      </section>
    </StaticPageShell>
  );
}
