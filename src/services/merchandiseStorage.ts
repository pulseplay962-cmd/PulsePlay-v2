import { supabase } from "../lib/supabase";


export async function uploadMerchandiseImage(
  file: File
) {

  const fileName =
    `${Date.now()}-${file.name}`;


  const { data, error } =
    await supabase.storage
      .from("merchandise")
      .upload(
        fileName,
        file,
        {
          cacheControl: "3600",
          upsert: false,
        }
      );


  if (error) {
    throw error;
  }


  const { data: urlData } =
    supabase.storage
      .from("merchandise")
      .getPublicUrl(
        data.path
      );


  return urlData.publicUrl;

}