import { supabase } from "../lib/supabase";

export async function uploadImage(
  file: File,
  folder: string
) {
  const fileName = `${folder}/${Date.now()}-${file.name}`;

  console.log("Uploading:", fileName);

  const { data, error } = await supabase.storage
    .from("pulseplay-images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error(
      "Storage upload failed:",
      error
    );

    throw error;
  }

  console.log(
    "Upload successful:",
    data
  );

  const publicUrl =
    supabase.storage
      .from("pulseplay-images")
      .getPublicUrl(fileName)
      .data.publicUrl;

  console.log(
    "Public URL:",
    publicUrl
  );

  return publicUrl;
}