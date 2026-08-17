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

/*
 * =========================
 * ADD GAME
 * =========================
 */

export async function addGame(game: GameInput) {
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