const AXES = [
  {
    label: "Security",
    title: "機密情報を入れられるか",
    description: "入力データの学習利用や社内情報の扱いを先に確認します。",
  },
  {
    label: "Admin",
    title: "メンバー管理しやすいか",
    description: "権限・退職者対応・SSOなど、管理者側の運用負荷を見ます。",
  },
  {
    label: "Cost",
    title: "人数分の予算を読めるか",
    description: "月額・年額・最低人数・従量課金の有無を横並びにします。",
  },
  {
    label: "Support",
    title: "法人向け窓口があるか",
    description: "トラブル時に誰が問い合わせるかまで含めて判断します。",
  },
  {
    label: "Compare",
    title: "同じ条件で比較できるか",
    description: "複数AIを1つずつ開く手間を減らせるかを確認します。",
  },
];

export function BusinessAiComparisonAxes() {
  return (
    <section
      aria-labelledby="business-ai-comparison-axes-heading"
      className="my-8 rounded-2xl border border-[#dbeafe] bg-[#f8fbff] p-5 sm:p-6"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-[#2563eb]">
        Business AI Checklist
      </p>
      <h2
        id="business-ai-comparison-axes-heading"
        className="mt-2 text-lg font-semibold leading-relaxed text-slate-900"
      >
        業務導入では「回答の好み」より先に確認する軸があります
      </h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2" role="list">
        {AXES.map((axis) => (
          <li
            key={axis.label}
            className="rounded-xl border border-[#dbeafe] bg-white p-4"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-[#60a5fa]">
              {axis.label}
            </span>
            <p className="mt-1 font-semibold leading-relaxed text-slate-900">
              {axis.title}
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {axis.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
