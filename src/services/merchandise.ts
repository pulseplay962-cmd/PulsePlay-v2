import { supabase } from "../lib/supabase";


export async function getMerchandise() {

  const { data, error } = await supabase
    .from("merchandise")
    .select("*")
    .order("created_at", {
      ascending: false,
    });


  if (error) {
    throw error;
  }


  return data || [];

}



export async function addMerchandise(item: any) {

  const { data, error } = await supabase
    .from("merchandise")
    .insert(item)
    .select()
    .single();


  if (error) {
    throw error;
  }


  return data;

}



export async function updateMerchandise(
  id: string,
  updates: any
) {

  const { data, error } = await supabase
    .from("merchandise")
    .update(updates)
    .eq("id", id)
    .select()
    .single();


  if (error) {
    throw error;
  }


  return data;

}



export async function deleteMerchandise(
  id: string
) {

  const { error } = await supabase
    .from("merchandise")
    .delete()
    .eq("id", id);


  if (error) {
    throw error;
  }


  return true;

}