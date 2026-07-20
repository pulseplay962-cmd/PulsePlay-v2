import { supabase } from "../lib/supabase";


export type Game = {
  id: string;
  title: string;
  description: string;
  image: string;
  genre?: string;
  platform?: string;
  featured: boolean;
  created_at?: string;
};



// Get all games

export async function getGames() {

  const { data, error } = await supabase
    .from("games")
    .select("*")
    .order("created_at", {
      ascending: false,
    });


  if (error) {

    throw error;

  }


  return data as Game[];

}





// Get featured games

export async function getFeaturedGames() {

  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("featured", true)
    .order("created_at", {
      ascending: false,
    });


  if (error) {

    throw error;

  }


  return data as Game[];

}





// Get single game

export async function getGameById(
  id: string
) {

  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("id", id)
    .single();


  if (error) {

    throw error;

  }


  return data as Game;

}





// Add game

export async function addGame(
  game: Omit<Game, "id" | "created_at">
) {

  const { data, error } = await supabase
    .from("games")
    .insert(game)
    .select()
    .single();


  if (error) {

    throw error;

  }


  return data as Game;

}





// Update game

export async function updateGame(
  id: string,
  game: Partial<Omit<Game, "id" | "created_at">>
) {

  const { data, error } = await supabase
    .from("games")
    .update(game)
    .eq("id", id)
    .select()
    .single();


  if (error) {

    throw error;

  }


  return data as Game;

}





// Delete game

export async function deleteGame(
  id: string
) {

  const { error } = await supabase
    .from("games")
    .delete()
    .eq("id", id);


  if (error) {

    throw error;

  }


  return true;

}