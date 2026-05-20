import Link from "next/link";

type BlogShellProps = {
  children: React.ReactNode;
};

export function BlogShell({ children }: BlogShellProps) {
  return (
    <div className="min-h-screen bg-[#030303] text-zinc-50">
      <header className="sticky top-0 z-20 border-b border-white/6 bg-[#030303]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-100"
          >
            ← ToolArc
          </Link>
          <span className="font-mono text-[11px] tracking-wide text-zinc-600 uppercase">
            Blog
          </span>
        </div>
      </header>
      {children}
      <footer className="border-t border-white/4 py-8">
        <p className="text-center text-sm text-zinc-600">
          <Link href="/" className="transition-colors hover:text-zinc-400">
            ToolArc
          </Link>
        </p>
      </footer>
    </div>
  );
}
