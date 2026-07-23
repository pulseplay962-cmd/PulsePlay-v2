import { supabase } from "../lib/supabase";

export type Video = {
  id: string;
  title: string;
  description?: string | null;
  thumbnail?: string | null;
  url?: string | null;
  platform?: string | null;
  created_at?: string;
};

export async function getVideos(): Promise<Video[]> {
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(12);

  if (error) {
    console.error("Error loading videos:", error);
    return [];
  }

  return (data as Video[]) ?? [];
}

export async function addVideo(video: Omit<Video, "id" | "created_at">) {
  const { data, error } = await supabase
    .from("videos")
    .insert(video)
    .select()
    .single();

  if (error) {
    console.error("Error adding video:", error);
    throw error;
  }

  return data as Video;
}

export async function updateVideo(
  id: string,
  video: Partial<Omit<Video, "id" | "created_at">>
) {
  const { data, error } = await supabase
    .from("videos")
    .update(video)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating video:", error);
    throw error;
  }

  return data as Video;
}

export async function deleteVideo(id: string) {
  const { error } = await supabase
    .from("videos")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting video:", error);
    throw error;
  }

  return true;
}