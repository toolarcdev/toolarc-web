import Link from "next/link";

const GITHUB_URL = "https://github.com/toolarcdev/toolarc-web";

const CAPABILITIES = [
  { label: "AI Workflows", icon: SparklesIcon },
  { label: "Gaming Utilities", icon: GamepadIcon },
  { label: "Developer Tools", icon: TerminalIcon },
] as const;

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      viewBox="0 0 32 32"
    >
      <rect
        className="stroke-zinc-700"
        height="28"
        rx="8"
        strokeWidth="1"
        width="28"
        x="2"
        y="2"
      />
      <path
        className="stroke-violet-400"
        d="M9 22 L16 10 L23 22"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <circle className="fill-violet-400" cx="16" cy="10" r="2" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
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

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.455 2.456Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GamepadIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        d="M6 12h4m-2-2v4m7-1h.01M16 12h.01M18 10.5V9a3 3 0 0 0-3-3h-1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 9H4.5A3 3 0 0 0 1.5 12v3a6 6 0 0 0 6 6h6a6 6 0 0 0 6-6v-3a3 3 0 0 0-3-3H18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TerminalIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        d="m6.75 7.5 3 3-3 3m4.5 0h6.75M4.5 6.75h15A1.5 1.5 0 0 1 21 8.25v7.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 15.75v-7.5A1.5 1.5 0 0 1 4.5 6.75Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        d="M13.5 6H18m0 0v4.5M18 6l-7.5 7.5M6 9.75v8.25A2.25 2.25 0 0 0 8.25 20.25h8.25A2.25 2.25 0 0 0 18.75 18V13.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030303] text-zinc-50">
      {/* Ambient light */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-128 w-3xl -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-cyan-600/8 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(24,24,27,0.8),transparent)]"
      />

      {/* Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_75%_55%_at_50%_35%,#000_20%,transparent_75%)]"
      />

      {/* Header */}
      <header className="animate-fade-up relative z-20 border-b border-white/6 bg-[#030303]/60 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link
            className="group flex items-center gap-2.5 text-zinc-100"
            href="/"
          >
            <LogoMark className="size-8 transition-transform duration-300 group-hover:scale-105" />
            <span className="text-sm font-semibold tracking-tight">
              ToolArc
            </span>
          </Link>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/3 px-3.5 py-1.5 text-xs font-medium text-zinc-400 transition-all hover:border-white/[0.14] hover:bg-white/6 hover:text-zinc-200"
          >
            <GitHubIcon className="size-4" />
            GitHub
          </a>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col items-center justify-center px-6 py-20">
        <div className="flex w-full max-w-2xl flex-col items-center text-center">
          <div className="animate-fade-up-delay-1 mb-8 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/6 px-4 py-1.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/40" />
              <span className="relative inline-flex size-2 animate-pulse-soft rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-emerald-300/90 uppercase">
              Coming Soon
            </span>
          </div>

          <h1 className="animate-fade-up-delay-2 text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
            <span className="text-shimmer">ToolArc</span>
          </h1>

          <p className="animate-fade-up-delay-2 mt-6 max-w-md text-base leading-relaxed text-zinc-400 sm:text-lg">
            A curated suite of{" "}
            <span className="text-zinc-300">AI workflows</span>,{" "}
            <span className="text-zinc-300">gaming utilities</span>, and{" "}
            <span className="text-zinc-300">developer tools</span> — built for
            people who ship.
          </p>

          <ul className="animate-fade-up-delay-3 mt-10 flex flex-wrap justify-center gap-2.5">
            {CAPABILITIES.map(({ label, icon: Icon }) => (
              <li key={label}>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/6 bg-white/2 px-3.5 py-2 text-xs text-zinc-400">
                  <Icon className="size-3.5 text-violet-400/80" />
                  {label}
                </span>
              </li>
            ))}
          </ul>

          <div className="animate-fade-up-delay-4 mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-zinc-50 px-6 py-3 text-sm font-medium text-zinc-950 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <GitHubIcon className="size-4" />
              View on GitHub
              <ExternalIcon className="size-3.5 opacity-40 transition-opacity group-hover:opacity-70" />
            </a>

            <p className="font-mono text-xs text-zinc-600">
              toolarcdev / toolarc-web
            </p>
          </div>
        </div>

        {/* Decorative card */}
        <div
          aria-hidden
          className="animate-fade-up-delay-4 pointer-events-none absolute inset-x-6 top-1/2 -z-10 mx-auto h-72 max-w-3xl -translate-y-1/2 rounded-3xl border border-white/4 bg-linear-to-b from-white/3 to-transparent shadow-[0_0_80px_-20px_rgba(139,92,246,0.15)]"
        />
      </main>

      <footer className="animate-fade-up-delay-4 relative z-10 border-t border-white/4 py-6">
        <p className="text-center font-mono text-[11px] tracking-wide text-zinc-600">
          © {new Date().getFullYear()} ToolArc. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
