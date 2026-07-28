import { supabase } from "../lib/supabase";



export async function uploadMerchandiseImage(
  file: File
) {

  const fileName =
    `merchandise/${Date.now()}-${file.name}`;



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







// Upload multiple merchandise images

export async function uploadMerchandiseGallery(
  files: File[]
) {


  const uploadedImages:string[] = [];



  for (const file of files) {


    const imageUrl =
      await uploadMerchandiseImage(file);



    uploadedImages.push(
      imageUrl
    );


  }



  return uploadedImages;


}