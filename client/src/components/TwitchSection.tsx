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
    <section className="mx-auto max-w-7xl px-6 py-24">

      <div className="mb-8 flex items-center gap-3">
        <span className="h-3 w-3 animate-pulse rounded-full bg-red-500" />
        <h2 className="text-4xl font-black">LIVE NOW</h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

        <div className="overflow-hidden rounded-3xl border border-cyan-500/20 bg-black">
          <iframe
            src={`https://player.twitch.tv/?channel=${channel}&parent=${parent}`}
            height="600"
            width="100%"
            allowFullScreen
            title="PulsePlay Live Stream"
          />
        </div>

        <div className="overflow-hidden rounded-3xl border border-cyan-500/20 bg-black">
          <iframe
            src={`https://www.twitch.tv/embed/${channel}/chat?parent=${parent}`}
            height="600"
            width="100%"
            title="Twitch Chat"
          />
        </div>

      </div>

    </section>
  );
}