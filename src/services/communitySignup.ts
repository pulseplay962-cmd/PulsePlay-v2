console.log("🔥 COMMUNITY SIGNUP SERVICE LOADED");


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
): Promise<CommunitySignup | null> {



  const sessionCheck =
    await supabase.auth.getSession();



  console.log(
    "🔐 AUTH BEFORE INSERT:",
    sessionCheck
  );





  const userRole =
    await supabase.rpc(
      "get_my_role"
    );



  console.log(
    "👤 ROLE CHECK:",
    userRole
  );





  console.log(
    "📤 INSERT DATA:",
    signup
  );







  const {

    data,

    error

  } = await supabase

    .from("community_signups")

    .insert([signup])

    .select()

    .single();







  if(error){


    console.error(
      "❌ SUPABASE INSERT ERROR:",
      error
    );


    throw error;


  }







  console.log(
    "✅ INSERT RETURNED:",
    data
  );






  return data as CommunitySignup | null;



}