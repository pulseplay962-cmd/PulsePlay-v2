import { supabase } from "../lib/supabase";


export type CommunitySignup = {

  id?: string;

  name: string;

  email: string;

  discord?: string;

  created_at?: string;

};





export async function submitCommunitySignup(

  signup: CommunitySignup

){

  const {

    data,

    error

  } = await supabase

    .from("community_signups")

    .insert([signup])

    .select()

    .single();



  if(error){

    throw error;

  }


  return data as CommunitySignup;

}