import { supabase } from "../lib/supabase";


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

  return data;
}



export async function addGame(game: {
  title: string;
  description: string;
  image: string;
  featured: boolean;
}) {
  const { data, error } = await supabase
    .from("games")
    .insert(game)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}



export async function updateGame(
  id: string,
  game: {
    title: string;
    description: string;
    image: string;
    featured: boolean;
  }
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

  return data;
}



export async function deleteGame(id: string) {
  const { error } = await supabase
    .from("games")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}