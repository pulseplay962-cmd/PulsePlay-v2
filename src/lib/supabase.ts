import { createClient } from "@supabase/supabase-js";


const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL;


const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY;



if (!supabaseUrl || !supabaseKey) {

  throw new Error(
    "Missing Supabase environment variables. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
  );

}



console.log(
  "SUPABASE URL:",
  supabaseUrl
);


console.log(
  "SUPABASE KEY START:",
  supabaseKey.substring(0,30)
);



export const supabase = createClient(
  supabaseUrl,
  supabaseKey,
  {
    auth: {

      autoRefreshToken: true,

      persistSession: true,

      detectSessionInUrl: true,

    },
  }
);


// DEBUG ONLY
if (typeof window !== "undefined") {
  (window as any).supabase = supabase;
}