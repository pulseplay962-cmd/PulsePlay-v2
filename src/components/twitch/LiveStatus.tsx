import { useEffect, useState } from "react";
import { getTwitchStatus } from "../../services/twitch";

type TwitchStatus = {
  live: boolean;
  title: string;
  game: string;
  viewers: number;
  thumbnail: string;
  url: string;
};

export default function LiveStatus() {
  const [stream, setStream] = useState<TwitchStatus | null>(null);

 useEffect(() => {
  getTwitchStatus()
    .then(setStream)
    .catch(console.error);
}, []);

  if (!stream) {
    return (
      <div className="rounded-xl border border-cyan-500/20 bg-[#111827] p-6">
        Loading stream...
      </div>
    );
  }

  if (!stream.live) {
    return (
      <div className="rounded-xl border border-gray-700 bg-[#111827] p-6">
        <h2 className="text-2xl font-bold">Currently Offline</h2>

        <p className="mt-2 text-gray-400">
          Follow PulsePlay on Twitch to get notified when the next stream starts.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-cyan-500/20 bg-[#111827]">
      <img
        src={stream.thumbnail}
        alt={stream.title}
        className="aspect-video w-full object-cover"
      />

      <div className="p-6">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-sm font-bold">
          <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
          LIVE
        </div>

        <h2 className="text-3xl font-black">{stream.title}</h2>

        <p className="mt-2 text-cyan-400">{stream.game}</p>

        <p className="mt-1 text-gray-400">
          {stream.viewers.toLocaleString()} viewers
        </p>

        <a
          href={stream.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-lg bg-cyan-500 px-6 py-3 font-bold text-black transition hover:bg-cyan-400"
        >
          Watch Live
        </a>
      </div>
    </div>
  );
}