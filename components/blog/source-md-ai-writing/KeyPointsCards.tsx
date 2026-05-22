type KeyPoint = {
  number: string;
  text: string;
};

const KEY_POINTS: KeyPoint[] = [
  { number: "01", text: "daily notes は時系列ログ" },
  { number: "02", text: "記事には構造が必要" },
  { number: "03", text: "source.md で整理すると生成精度が安定する" },
  { number: "04", text: "AIより入力素材設計の影響が大きい" },
  { number: "05", text: "プロンプト以前に「何を渡すか」が重要" },
];

export function KeyPointsCards() {
  return (
    <div className="my-8" aria-label="記事のキーポイント">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
        Key Points
      </p>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1" role="list">
        {KEY_POINTS.map((point) => (
          <li
            key={point.number}
            className="flex items-start gap-4 rounded-xl border border-[#dbeafe] bg-white px-5 py-4"
          >
            <span
              className="mt-0.5 shrink-0 font-mono text-xs font-semibold text-[#93c5fd]"
              aria-hidden="true"
            >
              {point.number}
            </span>
            <span className="text-sm leading-relaxed text-slate-700">
              {point.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
