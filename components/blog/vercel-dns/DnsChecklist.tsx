type CheckItem = {
  label: string;
  detail?: string;
  isKey?: boolean;
};

const ITEMS: CheckItem[] = [
  {
    label: "Vercel側にドメインを追加しているか",
    detail: "Project Settings → Domains に対象ドメインが登録されているか確認",
  },
  {
    label: "DNSレコードを追加しているか",
    detail: "Vercelが要求するAレコードまたはCNAMEが入力されているか確認",
  },
  {
    label: "ネームサーバー設定が正しいか",
    detail:
      "ドメイン管理画面（xserver など）で、使用しているDNSサービスのネームサーバーに変更されているか確認",
    isKey: true,
  },
  {
    label: "Proxy設定が意図通りか",
    detail: "Cloudflareなどを使っている場合、Proxyの状態がVercel連携に合っているか確認",
  },
  {
    label: "DNS反映待ちではないか",
    detail: "変更直後は反映に数分〜数時間かかることがある。ただし24時間以上変わらない場合は設定ミスを疑う",
  },
];

export function DnsChecklist() {
  return (
    <figure className="my-8">
      <div className="rounded-xl border border-[#dbeafe] bg-white overflow-hidden">
        <div className="border-b border-[#dbeafe] bg-[#f8fbff] px-5 py-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            確認チェックリスト
          </p>
        </div>
        <ul className="divide-y divide-[#f0f7ff]" role="list">
          {ITEMS.map((item) => (
            <li
              key={item.label}
              className={[
                "flex items-start gap-3 px-5 py-4",
                item.isKey ? "bg-blue-50/60" : "",
              ].join(" ")}
            >
              <span
                className={[
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs",
                  item.isKey
                    ? "border-[#60a5fa] bg-[#dbeafe] font-bold text-[#2563eb]"
                    : "border-[#dbeafe] bg-white text-slate-400",
                ].join(" ")}
                aria-hidden="true"
              >
                {item.isKey ? "★" : "□"}
              </span>
              <div className="min-w-0">
                <p
                  className={[
                    "text-sm font-semibold leading-snug",
                    item.isKey ? "text-[#1d4ed8]" : "text-slate-800",
                  ].join(" ")}
                >
                  {item.label}
                  {item.isKey && (
                    <span className="ml-2 inline-block rounded-full bg-[#dbeafe] px-2 py-0.5 text-[10px] font-semibold text-[#2563eb]">
                      今回の原因
                    </span>
                  )}
                </p>
                {item.detail && (
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                    {item.detail}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
