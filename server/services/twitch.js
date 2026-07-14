import fetch from "node-fetch";

let accessToken = null;
let tokenExpires = 0;

async function getTwitchToken() {
  if (accessToken && Date.now() < tokenExpires) {
    return accessToken;
  }

  const response = await fetch(
    "https://id.twitch.tv/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.TWITCH_CLIENT_ID,
        client_secret: process.env.TWITCH_CLIENT_SECRET,
        grant_type: "client_credentials",
      }),
    }
  );

  const data = await response.json();

  accessToken = data.access_token;

  tokenExpires =
    Date.now() + data.expires_in * 1000;

  return accessToken;
}

export async function getStreamStatus(channel) {
  const token = await getTwitchToken();

  const userResponse = await fetch(
    `https://api.twitch.tv/helix/users?login=${channel}`,
    {
      headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const userData = await userResponse.json();

  if (!userData.data?.length) {
    return null;
  }

  const userId = userData.data[0].id;

  const streamResponse = await fetch(
    `https://api.twitch.tv/helix/streams?user_id=${userId}`,
    {
      headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const streamData = await streamResponse.json();

  return streamData.data?.[0] || null;
}