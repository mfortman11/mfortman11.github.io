// Content collections — Astro 5/6 content layer API.
//
// `projects` uses the glob loader (one .md per case study) so each project
// gets a markdown body. `pokemon` and `nba` use the file() loader pointed at
// a single YAML file each — short blurbs don't need their own files.
//
// Schemas validate at build time; mismatch fails the build with a precise
// pointer to the offending entry.

import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob, file } from 'astro/loaders';
import yaml from 'yaml';

const yamlParser = (text: string) => yaml.parse(text);

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
  loader: file('src/data/pokemon.yml', { parser: yamlParser }),
  schema: z.object({
    name: z.string(),
    dex: z.number().int().positive(),
    types: z.array(pokemonType).min(1).max(2),
    // Path under /public (e.g. "/pokemon/charizard.png") or remote URL.
    sprite: z.string(),
    role: z.string(),
    // Squad position 1–6.
    order: z.number().int().min(1).max(6),
    // 1–2 sentences shown in the hex hover/focus reveal.
    blurb: z.string(),
  }),
});

const nba = defineCollection({
  loader: file('src/data/nba.yml', { parser: yamlParser }),
  schema: z.object({
    name: z.string(),
    // My personal rank, 1–25.
    rank: z.number().int().min(1).max(25),
    // Where the broader basketball internet tends to put them. Optional so
    // a newer player without consensus yet can be ranked without forcing one.
    consensusRank: z.number().int().min(1).max(50).optional(),
    // "1980s", "2000s–2010s", etc.
    era: z.string(),
    teams: z.array(z.string()),
    accolades: z.array(z.string()).default([]),
    photo: z.string().optional(),
    // Free-form take rendered in the card body. Supports paragraph breaks
    // (YAML blank lines fold to paragraph breaks with the `>` scalar).
    blurb: z.string(),
  }),
});

export const collections = { projects, pokemon, nba };
