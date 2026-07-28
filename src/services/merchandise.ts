import { supabase } from "../lib/supabase";


export type MerchandiseItem = {

  id: string;

  name: string;

  description?: string;

  category?: string;

  collection?: string;

  price: number;

  sku?: string;

  supplier?: string;

  image_url?: string;

  images?: string[];

  product_url?: string;

  status?: string;

  created_at?: string;

};





export async function getMerchandise(): Promise<MerchandiseItem[]> {


  const { data, error } = await supabase

    .from("merchandise")

    .select("*")

    .order(
      "created_at",
      {
        ascending:false
      }
    );



  if(error){

    throw error;

  }



  return data || [];

}







export async function addMerchandise(
  item:Partial<MerchandiseItem>
){


  const { data,error } = await supabase

    .from("merchandise")

    .insert(item)

    .select()

    .single();



  if(error){

    throw error;

  }



  return data;

}







export async function updateMerchandise(

  id:string,

  updates:Partial<MerchandiseItem>

){


  const { data,error } = await supabase

    .from("merchandise")

    .update(updates)

    .eq(
      "id",
      id
    )

    .select()

    .single();



  if(error){

    throw error;

  }



  return data;

}







export async function deleteMerchandise(
  id:string
){


  const { error } = await supabase

    .from("merchandise")

    .delete()

    .eq(
      "id",
      id
    );



  if(error){

    throw error;

  }



  return true;

}