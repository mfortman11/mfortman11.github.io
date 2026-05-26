import eslint from '@eslint/js';
import astro from 'eslint-plugin-astro';

export default [
  { ignores: ['dist/**', '.astro/**', 'node_modules/**', 'public/archive/**'] },
  eslint.configs.recommended,
  ...astro.configs.recommended,
];
