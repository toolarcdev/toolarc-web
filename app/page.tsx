const GITHUB_URL = "https://github.com/toolarcdev/toolarc-web";

function GitHubIcon() {
  return (
    <svg
      aria-hidden
      className="size-5"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-6 font-sans text-zinc-50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.12),transparent)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(39,39,42,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(39,39,42,0.4)_1px,transparent_1px)] bg-size-[3.5rem_3.5rem] mask-[radial-gradient(ellipse_70%_60%_at_50%_0%,#000_50%,transparent_100%)]"
      />

      <div className="relative z-10 flex max-w-lg flex-col items-center gap-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1.5 text-xs font-medium tracking-widest text-zinc-400 uppercase backdrop-blur-sm">
          <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          Coming Soon
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
            ToolArc
          </h1>
          <p className="text-base leading-relaxed text-zinc-400 sm:text-lg">
            AI workflows, gaming utilities, and developer-focused tools.
          </p>
        </div>

        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 rounded-lg border border-zinc-800 bg-zinc-900/60 px-5 py-2.5 text-sm font-medium text-zinc-300 backdrop-blur-sm transition-colors hover:border-zinc-700 hover:bg-zinc-800/80 hover:text-zinc-50"
        >
          <GitHubIcon />
          View on GitHub
          <span
            aria-hidden
            className="text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-400"
          >
            →
          </span>
        </a>
      </div>
    </main>
  );
}
