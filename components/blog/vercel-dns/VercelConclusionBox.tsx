export function VercelConclusionBox() {
  return (
    <div className="my-6 rounded-xl border border-[#dbeafe] bg-[#f0f7ff] px-5 py-5 sm:px-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#2563eb]">
        今回の原因
      </p>
      <p className="font-semibold leading-relaxed text-slate-800">
        ドメイン管理側（Xserver Domain）の
        <strong className="text-[#1d4ed8]">ネームサーバー設定が未変更</strong>
        のままだった。
      </p>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        DNSレコードは設定していたが、
        ドメインがそのDNS設定を参照するように設定されていなかった。
        結果として、Vercel側では「どのDNSを見ればいいか分からない」状態になっており、
        ずっと <code className="article-code-inline">Invalid Configuration</code>{" "}
        のままだった。
      </p>
    </div>
  );
}
