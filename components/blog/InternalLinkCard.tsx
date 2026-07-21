import Link from "next/link";

type InternalLinkCardProps = {
  href: string;
  title: string;
  description?: string;
};

/**
 * 記事途中の浮彫内部リンクカード（任意・必須ではない）。
 * 収益 CtaButton と誤認しないよう、枠＋淡い面・小さめコピーに留める。
 * MD: `<!-- internal-card:/blog/slug|表示タイトル -->`
 * @see docs/ai-context/internal-link-placement.md
 */
export function InternalLinkCard({
  href,
  title,
  description,
}: InternalLinkCardProps) {
  return (
    <aside className="my-8 rounded-xl border border-[#dbeafe] bg-[#f8fbff] p-4 shadow-sm transition hover:border-[#93c5fd] sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        あわせて読む
      </p>
      <Link
        href={href}
        className="mt-2 block text-base font-medium text-slate-900 hover:text-[#2563eb]"
      >
        {title}
      </Link>
      {description ? (
        <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
      ) : null}
    </aside>
  );
}
