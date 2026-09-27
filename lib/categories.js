// FreeToGame's API doesn't expose a /categories endpoint — these are the
// documented category values it accepts as a filter, curated down to the
// ones that produce good result counts.
export const CATEGORIES = [
  { value: "mmorpg", label: "MMORPG" },
  { value: "shooter", label: "Shooter" },
  { value: "moba", label: "MOBA" },
  { value: "battle-royale", label: "Battle Royale" },
  { value: "action-rpg", label: "Action RPG" },
  { value: "strategy", label: "Strategy" },
  { value: "card", label: "Card Game" },
  { value: "racing", label: "Racing" },
  { value: "sports", label: "Sports" },
  { value: "fighting", label: "Fighting" },
  { value: "survival", label: "Survival" },
  { value: "fantasy", label: "Fantasy" },
  { value: "sci-fi", label: "Sci-Fi" },
  { value: "anime", label: "Anime" },
  { value: "pvp", label: "PvP" },
];

export const PLATFORMS = [
  { value: "all", label: "All Platforms" },
  { value: "pc", label: "PC" },
  { value: "browser", label: "Browser" },
];

export const SORTS = [
  { value: "popularity", label: "Most Popular" },
  { value: "release-date", label: "Newest" },
  { value: "alphabetical", label: "A–Z" },
  { value: "relevance", label: "Relevance" },
];
