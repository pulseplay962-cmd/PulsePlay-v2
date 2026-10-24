import { supabase } from "../lib/supabase";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

async function getAdminHeaders(): Promise<Record<string, string>> {
  const { data, error } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (error || !token) {
    throw new Error("Please sign in with an administrator account to use the AI News Worker.");
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

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
  source_url?:string;
  source_name?:string;
};

// =====================================
// Refresh AI News
// =====================================

export async function refreshAINews() {
  const headers = await getAdminHeaders();
  const response = await fetch(
    `${API_URL}/api/news/refresh-ai`,
    {
      method: "POST",
      headers,
    }
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data?.error ||
      "Failed refreshing current gaming news"
    );
  }

  return data;
}

// =====================================
// Get AI Queue
// =====================================

export async function getAIContent(): Promise<AIContentItem[]> {
  const headers = await getAdminHeaders();
  const response = await fetch(
    `${API_URL}/api/ai/queue`,
    { headers }
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data?.error ||
      "Failed loading AI content"
    );
  }

  return data.queue || [];
}
// =====================================
// Generate Weekly Content
// =====================================

export async function generateWeeklyContent(){
  const headers = await getAdminHeaders();
  const response =
    await fetch(
      `${API_URL}/api/ai/generate-weekly-save`,
      {
        method:"POST",
        headers,
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

  const headers = await getAdminHeaders();
  const response =
    await fetch(
      `${API_URL}/api/ai/image/${id}`,
      {
        method:"POST",
        headers,
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
  if (updates.status !== "approved") {
    throw new Error("Only approval status updates are supported.");
  }

  const headers = await getAdminHeaders();
  const response = await fetch(
    `${API_URL}/api/ai/queue/${id}/status`,
    {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status: "approved" }),
    }
  );

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.error || "Failed updating AI content status.");
  }

  return data.item;
}

// =====================================
// Delete AI Content
// =====================================

export async function deleteAIContent(
  id:string
){
  const headers = await getAdminHeaders();
  const response = await fetch(
    `${API_URL}/api/ai/queue/${id}`,
    {
      method: "DELETE",
      headers,
    }
  );

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.error || "Failed deleting AI content.");
  }

  return true;
}

// =====================================
// Publish AI Content
// =====================================

export async function publishAIContent(
  id:string
){
  const headers = await getAdminHeaders();
  const response =
    await fetch(
      `${API_URL}/api/ai/publish/${id}`,
      {
        method:"POST",
        headers,
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
// Scan Game Releases (administrator session required)
// =====================================

export async function scanGameReleases(
  year: number,
  month: number,
  limit = 10
): Promise<GameReleaseScanResult> {
  const headers = await getAdminHeaders();
  const response = await fetch(
    `${API_URL}/api/ai/game-releases/scan`,
    {
      method: "POST",
      headers,
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
  const headers = await getAdminHeaders();
  const response = await fetch(
    `${API_URL}/api/ai/game-releases/generate`,
    {
      method: "POST",
      headers,
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


export async function refreshAINewsTest() {
  const headers = await getAdminHeaders();
  const response = await fetch(
    `${API_URL}/api/news/refresh-ai?test=true`,
    {
      method: "POST",
      headers,
    }
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data?.error ||
      "Failed running the no-credit news refresh test"
    );
  }

  return data;
}
