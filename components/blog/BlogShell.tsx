type BlogShellProps = {
  children: React.ReactNode;
};

/**
 * Thin wrapper kept for backwards compatibility with custom article pages.
 * Header and Footer are now provided globally by app/layout.tsx.
 */
export function BlogShell({ children }: BlogShellProps) {
  return <>{children}</>;
}
