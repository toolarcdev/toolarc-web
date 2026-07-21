import type { Metadata } from "next";
import Link from "next/link";
import { StaticPageShell } from "@/components/layout/StaticPageShell";

export const metadata: Metadata = {
  title: "免責 | ToolArc",
  description: "ToolArc（toolarc.jp）の免責事項です。",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <StaticPageShell title="免責" description="情報の取り扱いに関する注意">
      <p>
        本サイトの記事・ツールは、執筆・公開時点の情報に基づく実践記録です。
        ソフトウェアやサービスの仕様・料金・UI は予告なく変更されることがあります。
      </p>
      <p>
        掲載内容の正確性・完全性・特定目的への適合性について保証するものではありません。
        重要な判断をされる際は、各公式ドキュメントや提供元の最新情報をご確認ください。
      </p>
      <p>
        本サイトの情報の利用により生じた損害について、運営者は責任を負いません。
      </p>
      <p className="text-sm text-slate-500">
        最終更新の目安: 2026-07-21。
        運営については{" "}
        <Link href="/about" className="text-[#2563eb] hover:underline">
          About
        </Link>
        を参照してください。
      </p>
    </StaticPageShell>
  );
}
