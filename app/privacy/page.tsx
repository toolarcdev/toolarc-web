import type { Metadata } from "next";
import Link from "next/link";
import { StaticPageShell } from "@/components/layout/StaticPageShell";

export const metadata: Metadata = {
  title: "プライバシー | ToolArc",
  description: "ToolArc（toolarc.jp）のプライバシーに関する方針です。",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <StaticPageShell title="プライバシー" description="個人情報の取り扱いについて">
      <p>
        ToolArc（https://www.toolarc.jp）は、サイト改善とアクセス解析のため、Cookie
        や類似技術を利用する場合があります（例: Google Analytics / Google Tag
        Manager、Microsoft Clarity、Vercel Analytics）。
      </p>
      <p>
        これらのツールが収集する情報の範囲・保持期間は各提供者のポリシーに従います。
        ブラウザ設定で Cookie を制限できますが、一部機能に影響する場合があります。
      </p>
      <p>
        お問い合わせフォーム等で個人情報を取得する仕組みは、現時点では未整備です。
        整備時は本ページを更新します。
      </p>
      <p className="text-sm text-slate-500">
        最終更新の目安: 2026-07-21。内容は予告なく変更される場合があります。
        運営については{" "}
        <Link href="/about" className="text-[#2563eb] hover:underline">
          About
        </Link>
        を参照してください。
      </p>
    </StaticPageShell>
  );
}
