type Side = {
  label: string;
  input: string[];
  output: string[];
};

const BEFORE: Side = {
  label: "Before",
  input: ["daily notes", "思考ログ", "時系列メモ"],
  output: [
    "情報が散らばっていて、何が重要かわからない",
    "文脈がつながっていない",
    "毎回プロンプトを調整しても安定しない",
    "「言いたいことと違う」箇所が多い",
  ],
};

const AFTER: Side = {
  label: "After",
  input: ["source.md", "記事構造", "読者視点で整理した素材"],
  output: [
    "記事の骨格がほぼそのまま出てくる",
    "読者への説明が自然につながる",
    "修正する箇所が大幅に減った",
    "自分が伝えたかったことが出やすくなった",
  ],
};

function SideCard({ side, variant }: { side: Side; variant: "before" | "after" }) {
  const isAfter = variant === "after";

  return (
    <div
      className={[
        "flex flex-col rounded-xl border p-5",
        isAfter
          ? "border-[#dbeafe] bg-[#f8fbff]"
          : "border-slate-200 bg-white",
      ].join(" ")}
    >
      <p
        className={[
          "mb-4 text-sm font-semibold",
          isAfter ? "text-[#2563eb]" : "text-slate-500",
        ].join(" ")}
      >
        {side.label}
      </p>

      <div className="space-y-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Input
          </p>
          <ul className="space-y-1.5">
            {side.input.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-slate-600"
              >
                <span
                  className={[
                    "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                    isAfter ? "bg-[#60a5fa]" : "bg-slate-300",
                  ].join(" ")}
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Output
          </p>
          <ul className="space-y-1.5">
            {side.output.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-slate-600"
              >
                <span
                  className={[
                    "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                    isAfter ? "bg-[#60a5fa]" : "bg-slate-300",
                  ].join(" ")}
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function BeforeAfterComparison() {
  return (
    <div className="my-8" aria-label="Before / After 比較">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
        Before / After
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <SideCard side={BEFORE} variant="before" />
        <SideCard side={AFTER} variant="after" />
      </div>
    </div>
  );
}
