import type { Metadata } from "next";
import Link from "next/link";
import { StaticPageShell } from "@/components/layout/StaticPageShell";

export const metadata: Metadata = {
  title: "広告・アフィリエイト表記 | ToolArc",
  description:
    "ToolArc（toolarc.jp）における広告・アフィリエイトリンクの取り扱いについて。",
  alternates: { canonical: "/affiliate-disclosure" },
};

export default function AffiliateDisclosurePage() {
  return (
    <StaticPageShell
      title="広告・アフィリエイト表記"
      description="収益導線に関する開示"
    >
      <p>
        本サイトの一部記事には、広告およびアフィリエイト（成果報酬型）リンクが含まれる場合があります。
        リンク経由で商品・サービスを契約・購入された場合、運営者に紹介料が発生することがあります。
      </p>
      <p>
        比較記事では、原則として「誰に向くか／向かないか」などの判断材料を併記し、
        本文中の直アフィリエイトを避けた導線設計を方針としています。
        掲載の有無や案件は記事・時期により異なります。
      </p>
      <p>
        広告収益を優先して、記事の情報密度や可読性を下げることは意図していません。
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
