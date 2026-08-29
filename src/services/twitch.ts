const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

export type TwitchStreamData = {
  title: string;
  game_name: string;
  viewer_count: number;
};

export type TwitchStatus = {
  live: boolean;
  stream: TwitchStreamData | null;
};

export async function getTwitchStatus(
  channel = "Veiltactician"
): Promise<TwitchStatus> {
  const response = await fetch(
    `${API_URL}/api/twitch/status?channel=${encodeURIComponent(channel)}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Twitch API error: ${response.status}`
    );
  }

  const data = await response.json();

  return {
    live: Boolean(data?.stream?.live),
    stream: data?.stream?.live
      ? data.stream.stream
      : null,
  };
}
