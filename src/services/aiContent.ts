import { supabase } from "../lib/supabase";



export type AIContentItem = {

  id?: string;

  title: string;

  content_type: string;

  category: string;

  body: string;

  social_caption: string;

  image_prompt: string;

  scheduled_date: string;

  status: string;

};





export async function getAIContent(){


  const { data, error } = await supabase

    .from("ai_content_queue")

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







export async function updateAIContent(

  id:string,

  updates:any

){


  const { data,error } = await supabase

    .from("ai_content_queue")

    .update(updates)

    .eq(
      "id",
      id
    )

    .select();



  if(error){

    throw error;

  }



  return data;

}







export async function deleteAIContent(
  id:string
){


  const { error } = await supabase

    .from("ai_content_queue")

    .delete()

    .eq(
      "id",
      id
    );



  if(error){

    throw error;

  }


}








export async function generateWeeklyContent(){


  const response = await fetch(

    `${
      import.meta.env.VITE_API_URL ||
      "http://localhost:5000"
    }/api/ai/generate-weekly`,

    {

      method:"POST",

      headers:{

        "Content-Type":
        "application/json"

      }

    }

  );



  if(!response.ok){

    throw new Error(
      "Failed generating weekly content"
    );

  }



  const result =
    await response.json();



  const posts =
    result.posts || [];



  const {data,error} = await supabase

    .from("ai_content_queue")

    .insert(

      posts.map((item:any)=>({

        title:item.title,

        content_type:item.content_type,

        category:item.category,

        body:item.body,

        social_caption:item.social_caption,

        image_prompt:item.image_prompt,

        scheduled_date:item.scheduled_date,

        status:"pending"

      }))

    )

    .select();



  if(error){

    throw error;

  }



  return data;

}









// ==================================
// Publish AI Content To News
// ==================================

export async function publishAIContent(

  item:AIContentItem

){



  const slug =

    item.title

    .toLowerCase()

    .trim()

    .replace(
      /[^a-z0-9]+/g,
      "-"
    )

    .replace(
      /^-|-$/g,
      ""
    );





  const { data:news,error:newsError } =

    await supabase

      .from("news")

      .insert({

        title:item.title,

        slug,

        excerpt:
          item.social_caption,

        content:
          item.body,

        image:"",

        category:
          item.category,

        featured:false,

        published:true,

        author:
          "PulsePlay AI",

        meta_description:
          item.body.substring(
            0,
            160
          ),

        facebook_post:
          item.social_caption,

        image_prompt:
          item.image_prompt,

        hashtags:[]

      })

      .select()

      .single();





  if(newsError){

    throw newsError;

  }







  const { error:updateError } =

    await supabase

      .from("ai_content_queue")

      .update({

        status:"published"

      })

      .eq(

        "id",

        item.id

      );





  if(updateError){

    throw updateError;

  }





  return news;

}