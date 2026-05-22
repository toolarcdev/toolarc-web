type FlowStep = {
  label: string;
  sublabel?: string;
  isHighlighted?: boolean;
  isError?: boolean;
};

const STEPS: FlowStep[] = [
  {
    label: "Xserver Domain",
    sublabel: "ドメイン購入・管理",
  },
  {
    label: "ネームサーバー設定",
    sublabel: "どのDNSを使うか指定する",
    isHighlighted: true,
    isError: true,
  },
  {
    label: "DNS設定（レコード）",
    sublabel: "AレコードやCNAMEを書く場所",
  },
  {
    label: "Vercel",
    sublabel: "ドメインが Valid になる",
  },
];

export function DnsFlowDiagram() {
  return (
    <figure className="my-8">
      <div className="rounded-xl border border-[#dbeafe] bg-[#f8fbff] px-5 py-6 sm:px-8 sm:py-7">
        <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-slate-400">
          ドメイン→Vercel の流れ
        </p>
        <ol
          className="flex flex-col items-center gap-0 sm:flex-row sm:items-stretch sm:justify-between"
          role="list"
        >
          {STEPS.map((step, i) => (
            <li
              key={step.label}
              className="flex flex-col items-center sm:flex-1"
            >
              {/* Node */}
              <div
                className={[
                  "relative w-full max-w-36 rounded-xl border px-3 py-3 text-center sm:max-w-none",
                  step.isError
                    ? "border-red-200 bg-red-50"
                    : "border-[#dbeafe] bg-white",
                ].join(" ")}
              >
                {step.isError && (
                  <span className="mb-1 inline-block rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-600">
                    ここが未設定だった
                  </span>
                )}
                <p
                  className={[
                    "text-sm font-semibold leading-tight",
                    step.isError ? "text-red-700" : "text-slate-800",
                  ].join(" ")}
                >
                  {step.label}
                </p>
                {step.sublabel && (
                  <p className="mt-1 text-xs leading-snug text-slate-500">
                    {step.sublabel}
                  </p>
                )}
              </div>

              {/* Arrow (not after last item) */}
              {i < STEPS.length - 1 && (
                <>
                  {/* Vertical arrow for mobile */}
                  <div
                    className="flex flex-col items-center py-1 sm:hidden"
                    aria-hidden="true"
                  >
                    <div className="h-5 w-px bg-[#bfdbfe]" />
                    <span className="text-[#93c5fd]">▼</span>
                  </div>
                  {/* Horizontal arrow for desktop */}
                  <div
                    className="hidden items-center sm:flex sm:flex-1"
                    aria-hidden="true"
                  >
                    <div className="h-px flex-1 bg-[#bfdbfe]" />
                    <span className="text-[#93c5fd]">▶</span>
                  </div>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="article-figcaption">
        DNSレコードを設定しても、ネームサーバーが正しく設定されていなければドメインはそのDNSを参照しない
      </figcaption>
    </figure>
  );
}
