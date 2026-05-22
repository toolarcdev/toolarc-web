type QuoteHighlightProps = {
  quote: string;
  context?: string;
};

export function QuoteHighlight({ quote, context }: QuoteHighlightProps) {
  return (
    <figure className="my-8 rounded-xl border border-[#dbeafe] bg-[#f8fbff] px-6 py-7 sm:px-8">
      <blockquote>
        <p className="text-xl font-bold leading-relaxed tracking-tight text-slate-800 sm:text-2xl">
          &ldquo;{quote}&rdquo;
        </p>
      </blockquote>
      {context && (
        <figcaption className="mt-4 text-sm leading-7 text-slate-500">
          {context}
        </figcaption>
      )}
    </figure>
  );
}
