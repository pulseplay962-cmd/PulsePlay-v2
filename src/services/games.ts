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

const EDITION_TERMS = new Set(["remastered","remaster","remake","definitive","director","cut","deluxe","ultimate","complete","gold","goty","anniversary","enhanced","collector","collectors","edition"]);
function normalizeGameTitle(value: string): string { return String(value||"").toLowerCase().replace(/[’']/g,"").replace(/[^a-z0-9]+/g," ").replace(/\s+/g," ").trim(); }
function editionKey(value: string): string { return normalizeGameTitle(value).split(" ").filter(t=>EDITION_TERMS.has(t)).sort().join(" "); }
function platformKey(value?: string|null): Set<string> {
 const v=String(value||"").toLowerCase(), found=new Set<string>();
 const patterns:Array<[RegExp,string]>=[[/\b(?:ps5|playstation 5)\b/g,"ps5"],[/\b(?:ps4|playstation 4)\b/g,"ps4"],[/\b(?:xbox series x|xbox series s|xbox series x s|xbox series xs)\b/g,"xbox-series"],[/\b(?:xbox one)\b/g,"xbox-one"],[/\b(?:nintendo switch 2|switch 2)\b/g,"switch-2"],[/\b(?:nintendo switch|switch)\b/g,"switch"],[/\b(?:pc|windows|steam)\b/g,"pc"]];
 for(const [re,key] of patterns)if(re.test(v))found.add(key);return found;
}
function findManualGameMatch(candidate: GameInput, records: Pick<Game,"id"|"title"|"release_date"|"platform">[]) {
 const base=(value:string)=>normalizeGameTitle(value).split(" ").filter(t=>!EDITION_TERMS.has(t)).join(" ");
 for(const existing of records) {
  if(!base(candidate.title)||base(candidate.title)!==base(existing.title)||editionKey(candidate.title)!==editionKey(existing.title))continue;
  const a=String(candidate.release_date||"").slice(0,10),b=String(existing.release_date||"").slice(0,10);
  const x=platformKey(candidate.platform),y=platformKey(existing.platform),known=x.size>0&&y.size>0,overlap=[...x].some(k=>y.has(k));
  if(known&&!overlap)continue;
  if(a&&b&&a!==b)throw new Error(`Possible duplicate: "${existing.title}" is already listed with release date ${b}. Check the date and platform before adding this game.`);
  if(!a||!b||!known)throw new Error(`Possible duplicate: "${existing.title}" may be the same release. Confirm its release date and platform before adding this game.`);
  throw new Error(`This game release is already listed as "${existing.title}".`);
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