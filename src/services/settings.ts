import { supabase } from "../lib/supabase";

export async function getSettings() {
  const { data, error } = await supabase
    .from("settings")
    .select("*");

  if (error) throw error;

  return data;
}

export async function updateSetting(key: string, value: string) {
  const { error } = await supabase
    .from("settings")
    .update({
      value,
      updated_at: new Date().toISOString(),
    })
    .eq("key", key);

  if (error) throw error;
}