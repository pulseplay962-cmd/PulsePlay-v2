const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getTwitchStatus() {
  const response = await fetch(`${API_URL}/api/twitch/status`);

  if (!response.ok) {
    throw new Error("Failed to fetch Twitch status");
  }

  return response.json();
}