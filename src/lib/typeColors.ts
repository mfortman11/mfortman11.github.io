// Pokémon type badge colors. Keep values low-saturation so they sit well
// against both light and dark surfaces; the badge itself adds a subtle border.
//
// Used by PokemonCard.astro — if you want to retheme these, do it here rather
// than per-component.

export const typeColors: Record<string, { bg: string; fg: string }> = {
  normal: { bg: '#a8a77a', fg: '#fff' },
  fire: { bg: '#ee8130', fg: '#fff' },
  water: { bg: '#6390f0', fg: '#fff' },
  electric: { bg: '#f7d02c', fg: '#1a1a1a' },
  grass: { bg: '#7ac74c', fg: '#fff' },
  ice: { bg: '#96d9d6', fg: '#1a1a1a' },
  fighting: { bg: '#c22e28', fg: '#fff' },
  poison: { bg: '#a33ea1', fg: '#fff' },
  ground: { bg: '#e2bf65', fg: '#1a1a1a' },
  flying: { bg: '#a98ff3', fg: '#fff' },
  psychic: { bg: '#f95587', fg: '#fff' },
  bug: { bg: '#a6b91a', fg: '#fff' },
  rock: { bg: '#b6a136', fg: '#fff' },
  ghost: { bg: '#735797', fg: '#fff' },
  dragon: { bg: '#6f35fc', fg: '#fff' },
  dark: { bg: '#705746', fg: '#fff' },
  steel: { bg: '#b7b7ce', fg: '#1a1a1a' },
  fairy: { bg: '#d685ad', fg: '#fff' },
};
