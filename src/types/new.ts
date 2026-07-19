import { supabase } from "../lib/supabase";

export type NewsArticle = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  featured: boolean;
  published: boolean;
  author: string;
  created_at?: string;
};

export async function getNews() {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data as NewsArticle[];
}

export async function getAdminNews() {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data as NewsArticle[];
}

export async function getFeaturedNews() {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("published", true)
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) throw error;

  return data as NewsArticle[];
}

export async function getNewsBySlug(slug: string) {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;

  return data as NewsArticle;
}

export async function addNews(article: NewsArticle) {
  const { data, error } = await supabase
    .from("news")
    .insert([article])
    .select()
    .single();

  if (error) throw error;

  return data as NewsArticle;
}

export async function updateNews(
  id: string,
  article: Partial<NewsArticle>
) {
  const { data, error } = await supabase
    .from("news")
    .update(article)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data as NewsArticle;
}

export async function deleteNews(id: string) {
  const { error } = await supabase
    .from("news")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return true;
}