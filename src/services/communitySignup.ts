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
  console.log("📤 PULSEPLAY NETWORK SIGNUP:", {
    name: signup.name,
    email: signup.email,
    discord: signup.discord || null,
  });

  const { error } = await supabase
    .from("community_signups")
    .insert([
      {
        name: signup.name,
        email: signup.email,
        discord: signup.discord || null,
      },
    ]);

  if (error) {
    console.error("❌ SUPABASE NETWORK SIGNUP ERROR:", error);
    throw error;
  }

  console.log("✅ PULSEPLAY NETWORK SIGNUP SUCCESS");

  return null;
}
