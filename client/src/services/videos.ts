import { supabase } from "../lib/supabase";

export async function getVideos() {
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(12);

  if (error) {
    throw error;
  }

  return data;
}


export async function addVideo(video: any) {
  const { data, error } = await supabase
    .from("videos")
    .insert([video])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}


export async function updateVideo(
  id: string,
  video: any
) {
  const { data, error } = await supabase
    .from("videos")
    .update(video)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}


export async function deleteVideo(id: string) {
  const { error } = await supabase
    .from("videos")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

  return true;
}