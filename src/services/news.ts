import { supabase } from "../lib/supabase";


export type NewsArticle = {

    id: string;

    title:string;

    slug:string;

    excerpt:string;

    content:string;

    image:string;

    category:string;

    author:string;

    published:boolean;

    featured:boolean;

    status?:string;

    ai_generated?:boolean;

    created_at?:string;

    published_at?:string;

    meta_description?:string | null;

    facebook_post?:string | null;

    image_prompt?:string | null;

    hashtags?:string[] | null;

};



// ================================
// Create Slug
// ================================

function createSlug(title:string){

    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g,"-")
        .replace(/(^-|-$)/g,"");

}





// ================================
// Get All News
// ================================

export async function getNews(){

    const {data,error}=

        await supabase
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
// Get Published News
// ================================

export async function getPublishedNews(){

    const {data,error}=

        await supabase
            .from("news")
            .select("*")
            .eq(
                "published",
                true
            )
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
// Get Featured News
// ================================

export async function getFeaturedNews(){

    const {data,error}=

        await supabase
            .from("news")
            .select("*")
            .eq(
                "featured",
                true
            )
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
// Get News By Slug
// ================================

export async function getNewsBySlug(
    slug: string
) {

    console.log(
        "🔥 NEWS LOOKUP START:",
        slug
    );


    const { data, error } =
        await supabase
            .from("news")
            .select("*")
            .eq("slug", slug)
            .maybeSingle();


    console.log(
        "🔥 NEWS LOOKUP RESULT:",
        {
            slug,
            data,
            error,
        }
    );


    if (error) {

        console.error(
            "❌ NEWS LOOKUP ERROR:",
            error
        );

        throw error;

    }


    if (!data) {

        console.warn(
            "⚠️ NEWS LOOKUP RETURNED NULL:",
            slug
        );

    }


    return data as NewsArticle | null;

}





// ================================
// Add News
// ================================

export async function addNews(
    article:Omit<NewsArticle,"id">
){

    const {data,error}=

        await supabase
            .from("news")
            .insert([
                article
            ])
            .select()
            .single();


    if(error){

        throw error;

    }


    return data as NewsArticle;

}





// ================================
// Update News
// ================================

export async function updateNews(
    id:string,
    article:Partial<NewsArticle>
){

    const {data,error}=

        await supabase
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
// Delete News
// ================================

export async function deleteNews(
    id:string
){

    const {error}=

        await supabase
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
// Save AI Draft
// ================================

export async function saveAIDraft(
    article:{
        title:string;
        content:string;
        type?:string;
    }
){

    const slug =
        createSlug(article.title);


    const {data,error}=

        await supabase
            .from("news")
            .insert([
                {

                    title:
                    article.title,

                    slug,

                    excerpt:
                    article.content.substring(
                        0,
                        180
                    ),

                    content:
                    article.content,

                    image:"",

                    category:
                    article.type || "Gaming",

                    featured:false,

                    published:false,

                    author:
                    "PulsePlay AI",

                    status:
                    "draft",

                    ai_generated:true

                }
            ])
            .select()
            .single();



    if(error){

        throw error;

    }


    return data as NewsArticle;

}