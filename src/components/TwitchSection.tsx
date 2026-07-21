import BrandCard from "./ui/BrandCard";
import BrandButton from "./ui/BrandButton";

type TwitchSectionProps = {
  channel?: string;
};


export default function TwitchSection({
  channel = "Veiltactician",
}: TwitchSectionProps) {

  const parent =
    window.location.hostname || "localhost";


  return (
    <section className="mt-16">

      <BrandCard>

        <div
          className="
            flex
            flex-col
            lg:flex-row
            gap-8
          "
        >

          {/* Stream Info */}

          <div
            className="
              lg:w-1/3
              flex
              flex-col
              justify-center
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
                mb-4
              "
            >

              <span className="pp-live-dot" />

              <span
                className="
                  text-red-400
                  font-bold
                  uppercase
                  tracking-wider
                "
              >
                Live Now
              </span>

            </div>


            <h2
              className="
                text-3xl
                md:text-4xl
                font-black
                pp-gradient-text
              "
            >
              PulsePlay Live
            </h2>


            <p
              className="
                mt-4
                text-slate-400
              "
            >
              Watch live gameplay, join the community,
              and experience gaming with PulsePlay.
            </p>


            <div className="mt-6">

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



          {/* Twitch Player */}

          <div
            className="
              lg:w-2/3
            "
          >

            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-purple-500/30
                shadow-lg
                shadow-purple-500/20
              "
            >

              <iframe
                src={`https://player.twitch.tv/?channel=${channel}&parent=${parent}`}
                height="400"
                width="100%"
                allowFullScreen
                scrolling="no"
                frameBorder="0"
                title="PulsePlay Twitch Stream"
              />

            </div>

          </div>


        </div>


      </BrandCard>

    </section>
  );
}