import { useEffect, useState } from "react";

import BrandButton from "../ui/BrandButton";


type TwitchSectionProps = {
  channel?: string;
};


type StreamData = {
  title: string;
  game_name: string;
  viewer_count: number;
};



export default function TwitchSection({
  channel = "Veiltactician",
}: TwitchSectionProps) {


  const [stream, setStream] = useState<StreamData | null>(null);


  useEffect(() => {


    async function checkStream() {

      try {

        const api =
          import.meta.env.VITE_API_URL;


        if (!api) {

          console.warn(
            "VITE_API_URL is missing"
          );

          return;

        }


        const response = await fetch(
          `${api}/api/twitch/status?channel=${channel}`
        );


        if (!response.ok) {

          throw new Error(
            `Twitch API error: ${response.status}`
          );

        }


        const data = await response.json();


        setStream(
          data?.stream || null
        );


      } catch (error) {

        console.error(
          "Failed to load Twitch status:",
          error
        );


        setStream(null);

      }

    }


    checkStream();


  }, [channel]);





  const parent =
    window.location.hostname === "localhost"
      ? "localhost"
      : window.location.hostname;





  return (

    <section
      className="
        py-24
        px-6
      "
    >

      <div
        className="
          mx-auto
          max-w-7xl
        "
      >


        {/* Header */}

        <div
          className="
            mb-10
            flex
            items-center
            gap-4
          "
        >

          <span
            className={`
              h-4
              w-4
              rounded-full
              ${
                stream
                  ? "bg-red-500 pp-live-dot"
                  : "bg-slate-600"
              }
            `}
          />


          <h2
            className="
              text-4xl
              md:text-5xl
              font-black
              pp-gradient-text
            "
          >

            {stream
              ? "LIVE NOW"
              : "STREAM OFFLINE"
            }

          </h2>


        </div>





        {/* Stream Info */}

        {stream && (

          <div
            className="
              mb-8
              rounded-3xl
              border
              border-red-500/30
              bg-white/5
              p-6
              backdrop-blur-xl
            "
          >

            <h3
              className="
                text-2xl
                font-bold
              "
            >

              {stream.title}

            </h3>


            <p className="mt-3 text-slate-300">

              Playing:
              {" "}
              {stream.game_name}

            </p>


            <p
              className="
                mt-3
                font-bold
                text-purple-400
              "
            >

              👀 {stream.viewer_count} viewers

            </p>


          </div>

        )}






        {/* Twitch Player + Chat */}

        <div
          className="
            grid
            gap-8
            lg:grid-cols-[2fr_1fr]
          "
        >



          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-cyan-500/30
              bg-black
              shadow-xl
            "
          >

            <iframe

              src={`https://player.twitch.tv/?channel=${channel}&parent=${parent}`}

              height="600"

              width="100%"

              allowFullScreen

              scrolling="no"

              title="PulsePlay Twitch Stream"

              className="
                aspect-video
                w-full
              "

            />

          </div>






          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-purple-500/30
              bg-black
            "
          >

            <iframe

              src={`https://www.twitch.tv/embed/${channel}/chat?parent=${parent}`}

              height="600"

              width="100%"

              scrolling="no"

              title="PulsePlay Twitch Chat"

            />

          </div>


        </div>







        {/* Twitch CTA */}

        <div
          className="
            mt-10
            flex
            justify-center
          "
        >

          <a
            href={`https://www.twitch.tv/${channel}`}
            target="_blank"
            rel="noreferrer"
          >

            <BrandButton>

              Watch on Twitch

            </BrandButton>


          </a>


        </div>


      </div>


    </section>

  );

}