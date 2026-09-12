import { supabase } from "../lib/supabase";


const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";



export type AIContentItem = {

  id:string;

  title:string;

  content_type:string;

  category:string;

  body:string;

  social_caption?:string;

  image_prompt?:string;

  image_url?:string;

  status:string;

  scheduled_date?:string;

  created_at?:string;

  updated_at?:string;

};



// =====================================
// Get AI Queue
// =====================================

export async function getAIContent():Promise<AIContentItem[]> {


  const response =
    await fetch(
      `${API_URL}/api/ai/queue`
    );


  const data =
    await response.json();



  if(!response.ok){

    throw new Error(
      data.error ||
      "Failed loading AI content"
    );

  }



  return data.queue || [];

}




// =====================================
// Generate Weekly Content
// =====================================

export async function generateWeeklyContent(){


  const response =
    await fetch(

      `${API_URL}/api/ai/generate-weekly-save`,

      {
        method:"POST",

        headers:{
          "Content-Type":"application/json",
        },
      }

    );



  const data =
    await response.json();



  if(!response.ok){

    throw new Error(
      data.error ||
      "Failed generating weekly content"
    );

  }



  return data.posts || [];

}




// =====================================
// Generate AI Image
// =====================================

export async function generateAIImage(
  id:string
){


  console.log(
    "GENERATING IMAGE FOR:",
    id
  );


  const response =
    await fetch(

      `${API_URL}/api/ai/image/${id}`,

      {
        method:"POST",

        headers:{
          "Content-Type":"application/json",
        },
      }

    );



  const data =
    await response.json();



  console.log(
    "IMAGE RESPONSE:",
    data
  );



  if(!response.ok){

    throw new Error(
      data.error ||
      "Failed generating AI image"
    );

  }



  return data.item;

}




// =====================================
// Update AI Content
// =====================================

export async function updateAIContent(
  id:string,
  updates:Partial<AIContentItem>
){


  const {
    error
  } = await supabase

    .from("ai_content_queue")

    .update(updates)

    .eq(
      "id",
      id
    );



  if(error){

    throw error;

  }



  return true;

}




// =====================================
// Delete AI Content
// =====================================

export async function deleteAIContent(
  id:string
){


  const {
    error
  } = await supabase

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




// =====================================
// Publish AI Content
// =====================================

export async function publishAIContent(
  id:string
){


  const response =
    await fetch(

      `${API_URL}/api/ai/publish/${id}`,

      {
        method:"POST",

        headers:{
          "Content-Type":"application/json",
        },
      }

    );



  const data =
    await response.json();



  if(!response.ok){

    throw new Error(
      data.error ||
      "Failed publishing AI content"
    );

  }



  return data.article;

}

// =====================================
// GAME RELEASE AI
// =====================================

export type GameReleaseCandidate = {
  title: string;
  release_date: string;
  platform?: string;
  genre?: string;
  category?: string;
  source?: string;
  source_url?: string;
};

export type GameReleasePackage = {
  title: string;
  description: string;
  release_date: string;
  genre?: string;
  platform?: string;
  category?: string;
  status?: string;
  featured?: boolean;
  article_title?: string;
  meta_description?: string;
  article_content?: string;
  facebook_post?: string;
  image_prompt?: string;
  hashtags?: string;
  research_source?: string;
  research_source_url?: string;
};

export type GameReleaseScanResult = {
  success: boolean;
  year: number;
  month: number;
  requested_limit: number;
  releases: GameReleaseCandidate[];
};

export type GameReleasePublishResult = {
  success: boolean;
  action?: string;
  game?: unknown;
  social_queue?: unknown;
};


// =====================================
// Scan Game Releases
// =====================================

export async function scanGameReleases(
  year: number,
  month: number,
  limit = 10
): Promise<GameReleaseScanResult> {

  const response = await fetch(
    `${API_URL}/api/ai/game-releases/scan`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        year,
        month,
        limit,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error ||
      "Failed scanning game releases."
    );
  }

  return data;
}


// =====================================
// Generate Game Release Package
// =====================================

export async function generateGameReleasePackage(
  release: GameReleaseCandidate
): Promise<GameReleasePackage> {

  const response = await fetch(
    `${API_URL}/api/ai/game-releases/generate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        release,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error ||
      "Failed generating game release package."
    );
  }

  if (!data?.package) {
    throw new Error(
      "Game release package was not returned."
    );
  }

  return data.package;
}


// =====================================
// Publish Game Release Package
// =====================================

export async function publishGameRelease(
  packageData: GameReleasePackage,
  selectedYear: number,
  selectedMonth: number,
  maxGames = 10
): Promise<GameReleasePublishResult> {

  /*
   * Get the currently authenticated Supabase
   * session. The backend requireAdmin middleware
   * validates this access token and confirms
   * profiles.role === "admin".
   */

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error(
      "You must be logged in as an administrator."
    );
  }

  const response = await fetch(
    `${API_URL}/api/ai/game-releases/publish`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${session.access_token}`,
      },

      body: JSON.stringify({
        package: packageData,
        selectedYear,
        selectedMonth,
        maxGames,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error ||
      "Failed publishing game release."
    );
  }

  return data;
}
