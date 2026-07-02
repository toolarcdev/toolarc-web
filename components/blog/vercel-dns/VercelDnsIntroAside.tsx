import Link from "next/link";

export function VercelDnsIntroAside() {
  return (
    <aside className="mb-8 rounded-lg border border-[#dbeafe] bg-[#f8fbff] px-5 py-4 text-sm leading-7 text-slate-600">
      この記事は、
      <Link href="/blog/site-launch" className="article-link font-medium">
        サイト公開までの記録
      </Link>
      の中で実際に詰まった体験を掘り下げたものです。
      DNS知識がほとんどない状態で個人開発サイトを公開しようとして、丸一日以上ハマった話をします。
    </aside>
  );
}
