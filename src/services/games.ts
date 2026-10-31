import { supabase } from "../lib/supabase";

/*
 * =========================
 * GAME TYPE
 * =========================
 *
 * This represents the complete
 * PulsePlay game record.
 */

export type Game = {
  id: string;

  // Game Library
  title: string;
  description: string;
  image: string;
  release_date?: string | null;
  genre?: string | null;
  platform?: string | null;
  featured?: boolean;

  // Organization
  category?: string | null;
  status?: "upcoming" | "released" | "archived" | null;

  // Article / SEO
  article_title?: string | null;
  meta_description?: string | null;
  article_content?: string | null;

  // Social / AI Content
  facebook_post?: string | null;
  image_prompt?: string | null;
  hashtags?: string | null;

  // Timestamps
  created_at?: string;
  updated_at?: string;
};

/*
 * =========================
 * GET ALL GAMES
 * =========================
 */

export async function getGames(): Promise<Game[]> {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data || [];
}

/*
 * =========================
 * GAME INPUT
 * =========================
 */

export type GameInput = {
  title: string;
  description: string;
  image: string;

  release_date?: string | null;

  genre?: string | null;
  platform?: string | null;

  featured?: boolean;

  category?: string | null;
  status?: "upcoming" | "released" | "archived" | null;

  article_title?: string | null;
  meta_description?: string | null;
  article_content?: string | null;

  facebook_post?: string | null;
  image_prompt?: string | null;
  hashtags?: string | null;
};

const EDITION_TERMS = new Set([
  "remastered", "remaster", "remake", "definitive", "director", "cut",
  "deluxe", "ultimate", "complete", "gold", "goty", "anniversary",
  "enhanced", "collector", "collectors", "edition",
]);

function normalizeGameTitle(value: string): string {
  return String(value || "").toLowerCase().replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
}

function editionKey(value: string): string {
  return normalizeGameTitle(value).split(" ")
    .filter((token) => EDITION_TERMS.has(token)).sort().join(" ");
}

function platformKey(value?: string | null): Set<string> {
  const normalized = String(value || "").toLowerCase();
  const patterns: Array<[RegExp, string]> = [
    [/\b(?:ps5|playstation 5)\b/, "ps5"],
    [/\b(?:ps4|playstation 4)\b/, "ps4"],
    [/\b(?:xbox series x|xbox series s|xbox series x s|xbox series xs)\b/, "xbox-series"],
    [/\b(?:xbox one)\b/, "xbox-one"],
    [/\b(?:nintendo switch 2|switch 2)\b/, "switch-2"],
    [/\b(?:nintendo switch|switch)\b/, "switch"],
    [/\b(?:pc|windows|steam)\b/, "pc"],
  ];
  const found = new Set<string>();
  for (const [pattern, token] of patterns) {
    if (pattern.test(normalized)) found.add(token);
  }
  return found;
}

function findManualGameMatch(
  candidate: GameInput,
  records: Pick<Game, "id" | "title" | "release_date" | "platform">[],
): void {
  const baseTitle = (value: string) => normalizeGameTitle(value).split(" ")
    .filter((token) => !EDITION_TERMS.has(token)).join(" ");

  for (const existing of records) {
    if (!baseTitle(candidate.title) ||
        baseTitle(candidate.title) !== baseTitle(existing.title) ||
        editionKey(candidate.title) !== editionKey(existing.title)) continue;

    const candidateDate = String(candidate.release_date || "").slice(0, 10);
    const existingDate = String(existing.release_date || "").slice(0, 10);
    const candidatePlatforms = platformKey(candidate.platform);
    const existingPlatforms = platformKey(existing.platform);
    const platformsKnown = candidatePlatforms.size > 0 && existingPlatforms.size > 0;
    const platformOverlap = [...candidatePlatforms].some((key) => existingPlatforms.has(key));

    if (platformsKnown && !platformOverlap) continue;
    if (candidateDate && existingDate && candidateDate !== existingDate) {
      throw new Error(`Possible duplicate: "${existing.title}" is already listed with release date ${existingDate}. Check the date and platform before adding this game.`);
    }
    if (!candidateDate || !existingDate || !platformsKnown) {
      throw new Error(`Possible duplicate: "${existing.title}" may be the same release. Confirm its release date and platform before adding this game.`);
    }
    throw new Error(`This game release is already listed as "${existing.title}".`);
  }

  const tokens = (value: string) => new Set(normalizeGameTitle(value).split(" ").filter(Boolean));
  const incomingTokens = tokens(candidate.title);
  for (const existing of records) {
    if (editionKey(candidate.title) !== editionKey(existing.title)) continue;
    const existingTokens = tokens(existing.title);
    const overlap = [...incomingTokens].filter((token) => existingTokens.has(token)).length;
    const similarity = overlap / new Set([...incomingTokens, ...existingTokens]).size;
    const leftPlatforms = platformKey(candidate.platform);
    const rightPlatforms = platformKey(existing.platform);
    const platformsDiffer = leftPlatforms.size > 0 && rightPlatforms.size > 0 &&
      ![...leftPlatforms].some((key) => rightPlatforms.has(key));
    if (similarity >= 0.8 && existingTokens.size >= 2 && !platformsDiffer) {
      throw new Error(`Possible duplicate: "${existing.title}" looks similar. Review the release and platform before adding this game.`);
    }
  }
}

/*
 * =========================
 * ADD GAME
 * =========================
 */

export async function addGame(game: GameInput) {
  const { data: existingGames, error: duplicateQueryError } = await supabase
    .from("games").select("id,title,release_date,platform").limit(1000);
  if (duplicateQueryError) throw new Error(`Unable to check existing games before adding: ${duplicateQueryError.message}`);
  findManualGameMatch(game, existingGames || []);

  const { data, error } = await supabase
    .from("games")
    .insert({
      title: game.title,
      description: game.description,
      image: game.image,

      release_date: game.release_date ?? null,

      genre: game.genre ?? null,
      platform: game.platform ?? null,

      featured: game.featured ?? false,

      category: game.category ?? null,
      status: game.status ?? "upcoming",

      article_title: game.article_title ?? null,
      meta_description: game.meta_description ?? null,
      article_content: game.article_content ?? null,

      facebook_post: game.facebook_post ?? null,
      image_prompt: game.image_prompt ?? null,
      hashtags: game.hashtags ?? null,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/*
 * =========================
 * UPDATE GAME
 * =========================
 */

export async function updateGame(
  id: string,
  game: GameInput
) {
  const { data, error } = await supabase
    .from("games")
    .update({
      title: game.title,
      description: game.description,
      image: game.image,

      release_date: game.release_date ?? null,

      genre: game.genre ?? null,
      platform: game.platform ?? null,

      featured: game.featured ?? false,

      category: game.category ?? null,
      status: game.status ?? "upcoming",

      article_title: game.article_title ?? null,
      meta_description: game.meta_description ?? null,
      article_content: game.article_content ?? null,

      facebook_post: game.facebook_post ?? null,
      image_prompt: game.image_prompt ?? null,
      hashtags: game.hashtags ?? null,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/*
 * =========================
 * DELETE GAME
 * =========================
 */

export async function deleteGame(id: string) {
  const { error } = await supabase
    .from("games")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}

/*
 * =========================
 * GET ONE GAME
 * =========================
 *
 * Used by:
 *
 * /games/:id
 */

export async function getGameById(
  id: string
): Promise<Game | null> {
  console.log(
    "getGameById() called with:",
    id
  );

  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  console.log(
    "getGameById() data:",
    data
  );

  console.log(
    "getGameById() error:",
    error
  );

  if (error) {
    throw error;
  }

  return data;
}