import { supabase } from "../lib/supabase";


export async function getNews() {

  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", {
      ascending: false,
    })
    .limit(12);


  if (error) {
    throw error;
  }


  return data;
}




export async function addNews(article: {
  title: string;
  content: string;
  image: string;
  category: string;
  featured: boolean;
}) {

  const { data, error } = await supabase
    .from("news")
    .insert([article])
    .select()
    .single();


  if (error) {
    throw error;
  }


  return data;
}




export async function updateNews(
  id: string,
  article: {
    title: string;
    content: string;
    image: string;
    category: string;
    featured: boolean;
  }
) {

  const { data, error } = await supabase
    .from("news")
    .update(article)
    .eq("id", id)
    .select()
    .single();


  if (error) {
    throw error;
  }


  return data;
}




export async function deleteNews(id: string) {

  const { error } = await supabase
    .from("news")
    .delete()
    .eq("id", id);


  if (error) {
    throw error;
  }


  return true;
}