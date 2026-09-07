import { supabase } from "../lib/supabase";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://pulseplay-api-yubf.onrender.com";

export type AIImageTestResult = {
  success: boolean;
  development: boolean;
  mode: string;
  imageUrl: string;
};

export async function testAIImage(
  prompt?: string
): Promise<AIImageTestResult> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error(
      "You must be logged in as an administrator."
    );
  }

  const response = await fetch(
    `${API_URL}/api/ai/test-image`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        prompt:
          prompt ||
          "A cinematic futuristic gaming setup with dark neon purple and cyan lighting, premium editorial gaming aesthetic, no logos, no text.",
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error ||
      `AI image generation failed: ${response.status}`
    );
  }

  return data;
}
