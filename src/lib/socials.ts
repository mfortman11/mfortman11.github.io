// TODO_USER: confirm handles + add/remove platforms as desired.
// Keep this list short — anything that doesn't get checked weekly should go.

export type Social = {
  label: string;
  /** URL, or `mailto:` for email. */
  href: string;
};

export const socials: Social[] = [
  { label: 'GitHub', href: 'https://github.com/mfortman11' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mikefortman/' },
  { label: 'Email', href: 'mailto:mfortman11@gmail.com' }, // TODO_USER: confirm public-facing address
];
