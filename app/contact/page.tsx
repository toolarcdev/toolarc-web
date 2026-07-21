import type { Metadata } from "next";
import Link from "next/link";
import { StaticPageShell } from "@/components/layout/StaticPageShell";

export const metadata: Metadata = {
  title: "問い合わせ | ToolArc",
  description: "ToolArc（toolarc.jp）へのお問い合わせについて。",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <StaticPageShell title="問い合わせ" description="連絡手段について">
      <p>
        公開の問い合わせ窓口（メールフォーム等）は、現時点では準備中です。
        整備でき次第、本ページを更新します。
      </p>
      <p>
        運営者・方針の概要は{" "}
        <Link href="/about" className="text-[#2563eb] hover:underline">
          About
        </Link>
        をご覧ください。ポリシー関連はフッタの各ページも参照できます。
      </p>
      <p className="text-sm text-slate-500">最終更新の目安: 2026-07-21。</p>
    </StaticPageShell>
  );
}
