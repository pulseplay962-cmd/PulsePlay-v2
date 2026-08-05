import { supabase } from "../lib/supabase";


export type Feedback = {

    id?: string;

    name?: string;

    email?: string;

    rating: number;

    category: string;

    message: string;

    created_at?: string;

};



export async function submitFeedback(
    feedback: Omit<Feedback,"id" | "created_at">
){

    const { data, error } = await supabase
        .from("feedback")
        .insert([
            feedback
        ])
        .select()
        .single();


    if(error){

        throw error;

    }


    return data as Feedback;

}