import type { Metadata } from "next";
import { Poe2RegexBuilder } from "./Poe2RegexBuilder";
import { isPoe2ApiConfigured } from "@/lib/poe2/poe2-api-server";

const TITLE = "PoE2 アイテム検索 日本語Regex";

export const metadata: Metadata = {
  title: `${TITLE} | ToolArc`,
  description:
    "Path of Exile 2 日本語クライアント向けのアイテム検索 regex を生成するツール。モッドを選んで OR / AND 検索用文字列をコピーできます。",
  alternates: { canonical: "/tools/poe2-regex" },
};

export default function Poe2RegexPage() {
  const apiAvailable = isPoe2ApiConfigured();

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-10">
        <p className="text-sm font-medium text-[#2563eb]">Gaming Tool</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {TITLE}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          欲しいモッドを選ぶと、PoE2
          日本語環境のアイテム検索欄に貼り付けられる regex
          文字列を生成します。検索欄の上限は 50 文字です。
        </p>
      </header>

      {apiAvailable ? (
        <Poe2RegexBuilder />
      ) : (
        <div
          className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-6 text-sm text-amber-900"
          role="status"
        >
          <p className="font-medium">現在このツールは利用できません</p>
          <p className="mt-2 text-amber-800">
            データ API が未設定のため、モッド検索・regex
            生成を停止しています。しばらくしてから再度お試しください。
          </p>
        </div>
      )}
    </main>
  );
}
