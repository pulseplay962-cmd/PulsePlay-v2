import { supabase } from "../lib/supabase";



const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";





export type AIContentItem = {

  id: string;

  title: string;

  content_type: string;

  category: string;

  body: string;

  social_caption?: string;

  image_prompt?: string;

  image_url?: string;

  status: string;

  scheduled_date?: string;

  created_at?: string;

  updated_at?: string;

};








// =====================================
// Get AI Queue
// =====================================

export async function getAIContent(){

  const response =
    await fetch(
      `${API_URL}/api/ai/queue`
    );



  const data =
    await response.json();



  if(!response.ok){

    throw new Error(
      data.error ||
      "Failed loading AI content"
    );

  }



  return data.queue || [];

}








// =====================================
// Generate Weekly Content
// =====================================

export async function generateWeeklyContent(){

  const response =
    await fetch(

      `${API_URL}/api/ai/generate-weekly-save`,

      {
        method:"POST",

        headers:{
          "Content-Type":"application/json",
        },

      }

    );



  const data =
    await response.json();



  if(!response.ok){

    throw new Error(
      data.error ||
      "Failed generating weekly content"
    );

  }



  return data.posts || [];

}








// =====================================
// Generate AI Image
// =====================================

export async function generateAIImage(

  id:string

){

  const response =
    await fetch(

      `${API_URL}/api/ai/image/${id}`,

      {

        method:"POST",

        headers:{

          "Content-Type":"application/json",

        },

      }

    );





  const data =
    await response.json();





  if(!response.ok){

    throw new Error(

      data.error ||

      "Failed generating AI image"

    );

  }





  return data.item;

}








// =====================================
// Update AI Content
// =====================================

export async function updateAIContent(

  id:string,

  updates:Partial<AIContentItem>

){


  const {
    error
  } = await supabase

    .from("ai_content_queue")

    .update(updates)

    .eq(
      "id",
      id
    );



  if(error){

    throw error;

  }



  return true;

}








// =====================================
// Delete AI Content
// =====================================

export async function deleteAIContent(

  id:string

){


  const {
    error
  } = await supabase

    .from("ai_content_queue")

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








// =====================================
// Publish AI Content
// =====================================

export async function publishAIContent(

  id:string

){


  const response =
    await fetch(

      `${API_URL}/api/ai/publish/${id}`,

      {

        method:"POST",

        headers:{

          "Content-Type":"application/json",

        },

      }

    );





  const data =
    await response.json();





  if(!response.ok){

    throw new Error(

      data.error ||

      "Failed publishing AI content"

    );

  }





  return data.article;

}