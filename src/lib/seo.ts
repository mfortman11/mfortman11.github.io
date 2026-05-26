// Default metadata used by <SEO />. Update siteName / defaultDescription /
// author once the real bio copy is locked.
//
// TODO_USER: socials live separately in src/lib/socials.ts.

export const siteName = 'Mike Fortman';
export const defaultDescription =
  'Frontend engineer. Building fast, accessible, design-token-driven web UIs.';
export const author = 'Mike Fortman';

/** "Page · Site" title template, or just siteName for the home page. */
export function formatTitle(page?: string): string {
  if (!page || page === siteName) return siteName;
  return `${page} · ${siteName}`;
}
