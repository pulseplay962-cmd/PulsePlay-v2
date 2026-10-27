import { supabase } from "../lib/supabase";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { data, error } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (error || !token) throw new Error("Please sign in with an administrator account to use the POD Agent.");
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(init.headers || {}),
    },
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || "The POD Agent request failed.");
  return result as T;
}

export type PODConceptStatus = "draft" | "approved" | "rejected";
export type PODConcept = {
  id: string;
  title: string;
  prompt: string;
  mode: "new" | "improve";
  product_name: string | null;
  status: PODConceptStatus;
  artwork_path: string;
  artwork_url: string;
  created_at: string;
  updated_at: string;
  decision_at: string | null;
};

export async function generatePODDesignPreview(prompt: string): Promise<string> {
  const result = await apiRequest<{ imageDataUrl: string }>("/api/ai/pod/design-preview", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });
  return result.imageDataUrl;
}

export async function listPODConcepts(): Promise<PODConcept[]> {
  const result = await apiRequest<{ concepts: PODConcept[] }>("/api/ai/pod/concepts");
  return result.concepts;
}

export async function savePODConcept(input: {
  title: string;
  prompt: string;
  mode: "new" | "improve";
  product_name: string | null;
  imageDataUrl: string;
}): Promise<PODConcept> {
  const result = await apiRequest<{ concept: PODConcept }>("/api/ai/pod/concepts", {
    method: "POST",
    body: JSON.stringify(input),
  });
  return result.concept;
}

export async function setPODConceptStatus(id: string, status: "approved" | "rejected"): Promise<PODConcept> {
  const result = await apiRequest<{ concept: PODConcept }>(`/api/ai/pod/concepts/${encodeURIComponent(id)}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  return result.concept;
}
