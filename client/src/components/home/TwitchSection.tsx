import { useEffect, useState } from "react";

type TwitchSectionProps = {
  channel: string;
};

type StreamData = {
  title: string;
  game_name: string;
  viewer_count: number;
};

export default function TwitchSection({
  channel,
}: TwitchSectionProps) {

  const [stream, setStream] = useState<StreamData | null>(null);


  useEffect(() => {
    async function checkStream() {

      try {

        const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/twitch/status?channel=${channel}`
);

        const data = await response.json();

        setStream(data.stream);

      } catch (error) {

        console.error(
          "Failed to load Twitch status:",
          error
        );

      } finally {


      }

    }

    checkStream();

  }, [channel]);


  const parent =
    window.location.hostname === "localhost"
      ? "localhost"
      : window.location.hostname;


  return (
    <section className="bg-[#05070d] px-6 py-24 text-white">

      <div className="mx-auto max-w-7xl">


        <div className="mb-10 flex items-center gap-3">

          <span
            className={`h-3 w-3 rounded-full ${
              stream
                ? "animate-pulse bg-red-500"
                : "bg-gray-500"
            }`}
          />


          <h2 className="text-4xl font-black">

            {stream ? (
              <>
                LIVE{" "}
                <span className="text-red-500">
                  NOW
                </span>
              </>
            ) : (
              <>
                STREAM{" "}
                <span className="text-gray-400">
                  OFFLINE
                </span>
              </>
            )}

          </h2>

        </div>


        {stream && (
          <div className="mb-8 rounded-xl border border-red-500/30 bg-red-500/10 p-5">

            <h3 className="text-2xl font-bold">
              {stream.title}
            </h3>

            <p className="mt-2 text-gray-300">
              Playing: {stream.game_name}
            </p>

            <p className="mt-2 text-purple-400">
              👀 {stream.viewer_count} viewers
            </p>

          </div>
        )}



        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

          <div className="overflow-hidden rounded-3xl border border-cyan-500/20 bg-black">

            <iframe
              src={`https://player.twitch.tv/?channel=${channel}&parent=${parent}`}
              height="600"
              width="100%"
              allowFullScreen
              title="PulsePlay Live Stream"
              className="aspect-video"
            />

          </div>


          <div className="overflow-hidden rounded-3xl border border-purple-500/20 bg-black">

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
            className="rounded-lg bg-purple-600 px-8 py-3 font-bold hover:bg-purple-700"
          >
            Watch on Twitch
          </a>

        </div>


      </div>

    </section>
  );
}