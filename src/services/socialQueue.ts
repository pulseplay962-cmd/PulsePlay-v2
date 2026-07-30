import { supabase } from "../lib/supabase.js";


// =====================================
// Get Social Queue
// =====================================

export async function getSocialQueue(){

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


        return data || [];


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

    hashtags = "",

    scheduledAt = null

}){


    console.log(
        "🔥 CREATE SOCIAL POST FUNCTION HIT",
        {
            newsId,
            platform,
            postText
        }
    );



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



        console.log(
            "🔥 SOCIAL QUEUE INSERT RESULT",
            {
                data,
                error
            }
        );



        if(error){

            throw error;

        }


        return data;



    }catch(error){


        console.error(
            "🔥 SOCIAL QUEUE INSERT FAILED",
            error
        );


        throw error;

    }

}






// =====================================
// Approve Social Post
// =====================================

export async function approveSocialPost(
    id:number | string
){


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

        console.error(
            "APPROVE SOCIAL POST ERROR:",
            error
        );

        throw error;

    }



    return data;

}







// =====================================
// Publish Social Post
// =====================================

export async function publishSocialPost(
    id:number | string
){


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

        console.error(
            "PUBLISH SOCIAL POST ERROR:",
            error
        );

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
        hashtags?:string;
        status?:string;
        scheduled_at?:string | null;
    }

){


    const {
        data,
        error
    } = await supabase

        .from("social_queue")

        .update({

            ...updates

        })

        .eq(
            "id",
            id
        )

        .select()

        .single();



    if(error){

        console.error(
            "UPDATE SOCIAL POST ERROR:",
            error
        );

        throw error;

    }



    return data;

}








// =====================================
// Delete Social Queue Post
// =====================================

export async function deleteSocialPost(
    id:number | string
){


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

        console.error(
            "DELETE SOCIAL POST ERROR:",
            error
        );

        throw error;

    }



    return true;

}