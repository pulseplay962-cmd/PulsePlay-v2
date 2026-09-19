const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

export type PulsePlayAIResponse = {
  success: boolean;
  answer?: string;
  mode?: string;
  error?: string;
};

export async function askPulsePlayAI(question: string): Promise<PulsePlayAIResponse> {
  const response = await fetch(`${API_URL}/api/ai/assistant`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.error || "PulsePlay AI is unavailable.");
  return data;
}
