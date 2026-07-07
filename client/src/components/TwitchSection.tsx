type TwitchSectionProps = {
  channel: string;
};

export default function TwitchSection({
  channel,
}: TwitchSectionProps) {
  const parent =
    window.location.hostname === "localhost"
      ? "localhost"
      : window.location.hostname;

  return (
    <section className="bg-[#05070d] px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center gap-3">
          <span className="h-3 w-3 animate-pulse rounded-full bg-red-500 shadow-[0_0_15px_#ef4444]" />

          <h2 className="text-4xl font-black">
            LIVE <span className="text-red-500">NOW</span>
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="overflow-hidden rounded-3xl border border-cyan-500/20 bg-black shadow-[0_0_30px_#06b6d433]">
            <iframe
              src={`https://player.twitch.tv/?channel=${channel}&parent=${parent}`}
              height="600"
              width="100%"
              allowFullScreen
              title="PulsePlay Live Stream"
              className="aspect-video"
            />
          </div>

          <div className="overflow-hidden rounded-3xl border border-purple-500/20 bg-black shadow-[0_0_30px_#9333ea33]">
            <iframe
              src={`https://www.twitch.tv/embed/${channel}/chat?parent=${parent}`}
              height="600"
              width="100%"
              title="Twitch Chat"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href={`https://www.twitch.tv/${channel}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-purple-600 px-8 py-3 font-bold transition hover:bg-purple-700 hover:shadow-[0_0_25px_#9333ea]"
          >
            Watch on Twitch
          </a>
        </div>
      </div>
    </section>
  );
}