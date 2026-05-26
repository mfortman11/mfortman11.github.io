// Content collections — Astro 5/6 content layer API.
//
// Adding a new entry: drop a markdown file under the matching directory below.
// Filenames prefixed `_` (e.g. `_example.md`) are seeds — safe to delete once
// real content lands. They're still loaded into the collection because the
// glob doesn't filter them out, so routes render against them out of the box.

import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // 1–2 sentences shown on the project card.
      summary: z.string(),
      // "Lead frontend", "Solo", etc.
      role: z.string(),
      year: z.number().int(),
      tags: z.array(z.string()).default([]),
      links: z
        .array(
          z.object({
            label: z.string(),
            url: z.string().url(),
          }),
        )
        .default([]),
      hero: z
        .object({
          src: image(),
          alt: z.string(),
        })
        .optional(),
      // Surface on home page.
      featured: z.boolean().default(false),
      // Manual sort override; lower comes first.
      order: z.number().int().default(0),
    }),
});

const pokemonType = z.enum([
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
]);

const pokemon = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pokemon' }),
  schema: z.object({
    name: z.string(),
    dex: z.number().int().positive(),
    types: z.array(pokemonType).min(1).max(2),
    // Path under /public (e.g. "/pokemon/charizard.png") or remote URL.
    sprite: z.string(),
    role: z.string(),
    // Squad position 1–6.
    order: z.number().int().min(1).max(6),
  }),
});

const nba = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/nba' }),
  schema: z.object({
    name: z.string(),
    // 1–10.
    rank: z.number().int().min(1).max(10),
    // "1980s", "2000s–2010s", etc.
    era: z.string(),
    teams: z.array(z.string()),
    accolades: z.array(z.string()).default([]),
    photo: z.string().optional(),
  }),
});

export const collections = { projects, pokemon, nba };
