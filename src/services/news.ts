import { supabase } from "../lib/supabase";



export type NewsArticle = {

  id: string;

  title: string;

  slug: string;

  excerpt: string;

  content: string;

  image: string;

  category: string;

  featured: boolean;

  published: boolean;

  author: string;


  meta_description?: string;

  facebook_post?: string;

  image_prompt?: string;

  hashtags?: string[];


  created_at?: string;

  updated_at?: string;

  published_at?: string;

};






export type CreateNewsArticle = {

  title: string;

  slug: string;

  excerpt: string;

  content: string;

  image?: string;


  category: string;

  featured?: boolean;

  published?: boolean;


  author: string;


  meta_description?: string;

  facebook_post?: string;

  image_prompt?: string;

  hashtags?: string[];


  published_at?: string;

};









// ================================
// Get All News
// ================================

export async function getNews(){


  const { data,error } = await supabase

    .from("news")

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



  return (data || []) as NewsArticle[];

}









// ================================
// Featured News
// ================================

export async function getFeaturedNews(){


  const { data,error } = await supabase

    .from("news")

    .select("*")

    .eq(
      "featured",
      true
    )

    .eq(
      "published",
      true
    )

    .order(
      "created_at",
      {
        ascending:false
      }
    )

    .limit(3);



  if(error){

    throw error;

  }



  return (data || []) as NewsArticle[];

}









// ================================
// Single Article
// ================================

export async function getNewsBySlug(
  slug:string
){

  const { data,error } = await supabase

    .from("news")

    .select("*")

    .eq(
      "slug",
      slug
    )
    
    .limit(1);



  if(error){

    console.error(
      "GET NEWS BY SLUG ERROR:",
      error
    );

    throw error;

  }



  if(!data || data.length === 0){

    throw new Error(
      "No article found for this slug"
    );

  }



  return data[0] as NewsArticle;

}









// ================================
// Create News Article
// ================================

export async function addNews(
  article:CreateNewsArticle
){


  const { data,error } = await supabase

    .from("news")

    .insert([

      {

        ...article,

        image:
          article.image || "",


        featured:
          article.featured ?? false,


        published:
          article.published ?? false,


      }

    ])

    .select()

    .single();



  if(error){

    throw error;

  }



  return data as NewsArticle;

}









// ================================
// Update News Article
// ================================

export async function updateNews(

  id:string,

  article:Partial<CreateNewsArticle>

){


  const { data,error } = await supabase

    .from("news")

    .update(article)

    .eq(
      "id",
      id
    )

    .select()

    .single();



  if(error){

    throw error;

  }



  return data as NewsArticle;

}









// ================================
// Delete News Article
// ================================

export async function deleteNews(

  id:string

){


  const { error } = await supabase

    .from("news")

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









// ================================
// Publish AI Generated Article
// ================================

export async function publishNews(

  id:string

){


  const { data,error } = await supabase

    .from("news")

    .update({

      published:true,

      published_at:
        new Date().toISOString()

    })

    .eq(
      "id",
      id
    )

    .select()

    .single();



  if(error){

    throw error;

  }



  return data as NewsArticle;

}

// ================================
// Publish AI Article Into News
// ================================

export async function createAINewsArticle(

  article:{
    title:string;
    article:string;
    metaDescription?:string;
    facebookPost?:string;
    imagePrompt?:string;
    hashtags?:string[];
    image?:string;
    category?:string;
  }

){


  const slug = article.title

    .toLowerCase()

    .replace(/[^a-z0-9]+/g,"-")

    .replace(/(^-|-$)/g,"");




  const {data,error} = await supabase

    .from("news")

    .insert([

      {

        title:
          article.title,


        slug,


        excerpt:
          article.article.substring(0,180),


        content:
          article.article,


        image:
          article.image || "",


        category:
          article.category || "Games",


        featured:false,


        published:true,


        author:
          "PulsePlay AI",


        meta_description:
          article.metaDescription || "",


        facebook_post:
          article.facebookPost || "",


        image_prompt:
          article.imagePrompt || "",


        hashtags:
          article.hashtags || [],


        published_at:
          new Date().toISOString()

      }

    ])

    .select()

    .single();





  if(error){

    console.error(
      "AI NEWS INSERT ERROR:",
      error
    );

    throw error;

  }





  return data as NewsArticle;


}