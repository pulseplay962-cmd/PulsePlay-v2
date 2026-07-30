import { supabase } from "../lib/supabase.js";


// =====================================
// Social Post Type
// =====================================

export type SocialPost = {

    id: number;

    news_id: string | null;

    platform: string;

    post_text: string;

    image_url: string | null;

    hashtags: string[];

    status: string;

    scheduled_at: string | null;

    published_at: string | null;

    created_at?: string;

};




// =====================================
// Get Social Queue
// =====================================

export async function getSocialQueue(): Promise<SocialPost[]>{

    try{


        const {
            data,
            error
        } = await supabase

            .from("social_queue")

            .select("*")

            .order(
                "created_at",
                {
                    ascending:false
                }
            );



        console.log(
            "SOCIAL QUEUE RESULT:",
            data
        );



        if(error){

            console.error(
                "SOCIAL QUEUE ERROR:",
                error
            );

            throw error;

        }



        return (data || []).map((post)=>({

            ...post,

            hashtags:

                Array.isArray(post.hashtags)

                ? post.hashtags

                : post.hashtags

                    ? post.hashtags.split(" ")

                    : []

        })) as SocialPost[];



    }catch(error){


        console.error(
            "GET SOCIAL QUEUE FAILED:",
            error
        );


        throw error;

    }

}







// =====================================
// Create Social Queue Post
// =====================================

export async function createSocialPost({

    newsId,

    platform = "facebook",

    postText = "",

    imageUrl = "",

    hashtags = [],

    scheduledAt = null


}:{

    newsId:string;

    platform?:string;

    postText?:string;

    imageUrl?:string;

    hashtags?:string | string[];

    scheduledAt?:string | null;

}){


    try{


        const {
            data,
            error
        } = await supabase

            .from("social_queue")

            .insert({

                news_id:
                newsId,

                platform,

                post_text:
                postText,

                image_url:
                imageUrl,

                hashtags:

                    Array.isArray(hashtags)

                    ? hashtags.join(" ")

                    : hashtags,

                status:
                "scheduled",

                scheduled_at:
                scheduledAt

            })

            .select()

            .single();




        if(error){

            console.error(
                "CREATE SOCIAL POST ERROR:",
                error
            );

            throw error;

        }



        return data;



    }catch(error){


        console.error(
            "SOCIAL QUEUE INSERT FAILED:",
            error
        );


        throw error;

    }

}







// =====================================
// Approve Social Post
// =====================================

export async function approveSocialPost(
    id: number | string
): Promise<SocialPost>{


    const {
        data,
        error
    } = await supabase

        .from("social_queue")

        .update({

            status:
            "approved"

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



    return data;

}







// =====================================
// Publish Social Post
// =====================================

export async function publishSocialPost(
    id:number | string
): Promise<SocialPost>{


    const {
        data,
        error
    } = await supabase

        .from("social_queue")

        .update({

            status:
            "published",

            published_at:

            new Date()
            .toISOString()

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



    return data;

}







// =====================================
// Update Social Post
// =====================================

export async function updateSocialPost(

    id:number | string,

    updates:{

        post_text?:string;

        image_url?:string;

        hashtags?:string | string[];

        status?:string;

        scheduled_at?:string | null;

    }

){


    const updateData = {

        ...updates,

        hashtags:

            Array.isArray(updates.hashtags)

            ? updates.hashtags.join(" ")

            : updates.hashtags

    };



    const {
        data,
        error
    } = await supabase

        .from("social_queue")

        .update(updateData)

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







// =====================================
// Delete Social Queue Post
// =====================================

export async function deleteSocialPost(
    id: number | string
): Promise<boolean>{


    const {
        error
    } = await supabase

        .from("social_queue")

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