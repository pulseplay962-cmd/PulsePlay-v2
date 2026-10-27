import { supabase } from "../lib/supabase";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
export async function generatePODDesignPreview(prompt: string): Promise<string> {
  const { data, error } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (error || !token) throw new Error("Please sign in with an administrator account to use the POD Agent.");
  const response = await fetch(`${API_URL}/api/ai/pod/design-preview`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ prompt }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || "Could not generate a design preview.");
  return result.imageDataUrl;
}