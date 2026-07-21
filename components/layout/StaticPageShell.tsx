import type { ReactNode } from "react";

type StaticPageShellProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

/** Shared chrome for About / policy / contact pages. */
export function StaticPageShell({
  title,
  description,
  children,
}: StaticPageShellProps) {
  return (
    <main>
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-2 text-base text-slate-600">{description}</p>
          ) : null}
        </div>
      </div>
      <div className="px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-3xl space-y-6 text-base leading-8 text-slate-700">
          {children}
        </div>
      </div>
    </main>
  );
}
