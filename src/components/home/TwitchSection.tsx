import { useEffect, useState } from "react";

import BrandButton from "../ui/BrandButton";


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
          max-w-7xl
          mx-auto
        "
      >



        {/* Header */}

        <div
          className="
            flex
            items-center
            gap-4
            mb-10
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





        {/* Stream Information */}

        {stream && (

          <div
            className="
              glass
              border
              border-red-500/30
              p-6
              mb-8
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



            <p
              className="
                mt-3
                text-slate-300
              "
            >
              Playing:
              {" "}
              {stream.game_name}
            </p>



            <p
              className="
                mt-3
                text-purple-400
                font-bold
              "
            >
              👀 {stream.viewer_count} viewers
            </p>


          </div>

        )}







        {/* Twitch Player */}

        <div
          className="
            grid
            lg:grid-cols-[2fr_1fr]
            gap-8
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

              src={
                `https://player.twitch.tv/?channel=${channel}&parent=${parent}`
              }

              height="600"

              width="100%"

              allowFullScreen

              title="PulsePlay Twitch Stream"

              className="
                aspect-video
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

              src={
                `https://www.twitch.tv/embed/${channel}/chat?parent=${parent}`
              }

              height="600"

              width="100%"

              title="Twitch Chat"

            />

          </div>



        </div>







        {/* Twitch Button */}

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