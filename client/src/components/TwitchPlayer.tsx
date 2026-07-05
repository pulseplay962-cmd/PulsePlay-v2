type TwitchPlayerProps = {
  channel: string;
};

export default function TwitchPlayer({
  channel,
}: TwitchPlayerProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-cyan-500/30 shadow-2xl">
      <iframe
        src={`https://player.twitch.tv/?channel=${channel}&parent=localhost`}
        title="PulsePlay Live Stream"
        width="100%"
        height="500"
        allowFullScreen
      />
    </div>
  );
}