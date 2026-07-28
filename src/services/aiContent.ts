import { supabase } from "../lib/supabase";



export type AIContentItem = {
  id: string;
  title: string;
  content_type: string;
  category: string;
  body: string;
  social_caption: string;
  image_prompt: string;
  scheduled_date: string;
  status: string;
};





export async function getAIContent(): Promise<AIContentItem[]>{


  const { data,error } = await supabase

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



  return (data || []) as AIContentItem[];

}









export async function addAIContent(

  content:AIContentItem

){


  const { data,error } = await supabase

    .from("ai_content_queue")

    .insert(content)

    .select()

    .single();



  if(error){

    throw error;

  }



  return data;

}









export async function updateAIContent(

  id:string,

  updates:Partial<AIContentItem>

){


  const { data,error } = await supabase

    .from("ai_content_queue")

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



  return true;

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





  if(posts.length === 0){


    throw new Error(

      "AI returned no content"

    );


  }








  const formattedPosts =

    posts.map((item:any)=>({


      title:
        item.title,


      content_type:
        item.content_type,


      category:
        item.category,


      body:
        item.body,


      social_caption:
        item.social_caption,


      image_prompt:
        item.image_prompt,


      scheduled_date:
        item.scheduled_date,


      status:
        "pending"


    }));








  const {data,error} = await supabase

    .from("ai_content_queue")

    .insert(
      formattedPosts
    )

    .select();





  if(error){

    throw error;

  }



  return data;

}









// Future Publishing Workflow
// AI Queue -> News Table -> Website

export async function publishAIContent(

  item:AIContentItem

){


  const { data,error } = await supabase

    .from("news")

    .insert({

      title:item.title,

      content:item.body,

      excerpt:item.social_caption,

      category:item.category,

      featured:false,

      published:true,

      author:"PulsePlay",

      meta_description:item.title,

      image_prompt:item.image_prompt,

    })

    .select()

    .single();





  if(error){

    throw error;

  }






  await updateAIContent(

    item.id!,

    {
      status:"published"
    }

  );





  return data;

}