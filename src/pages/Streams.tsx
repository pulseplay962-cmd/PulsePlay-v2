import TwitchSection from "../components/home/TwitchSection";

import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";


export default function Streams() {

  return (

    <main>


      <section
        className="
          text-center
          mb-16
        "
      >


        <p
          className="
            text-sm
            font-black
            uppercase
            tracking-[0.4em]
            text-red-500
          "
        >
          LIVE CONTENT
        </p>



        <h1
          className="
            mt-5
            text-5xl
            md:text-6xl
            font-black
            pp-gradient-text
          "
        >
          Watch PulsePlay Live
        </h1>



        <p
          className="
            mx-auto
            mt-6
            max-w-3xl
            text-lg
            text-slate-400
          "
        >
          Join the community, watch gameplay,
          and experience PulsePlay adventures
          live on Twitch.
        </p>



      </section>








      <TwitchSection channel="Veiltactician" />









      <section
        className="
          grid
          gap-8
          md:grid-cols-3
          mt-16
        "
      >



        <BrandCard
          className="card-hover"
        >

          <h2
            className="
              text-2xl
              font-black
              text-cyan-400
            "
          >
            🎮 Currently Playing
          </h2>


          <p
            className="
              mt-4
              text-slate-300
            "
          >
            Horizon Forbidden West
          </p>


        </BrandCard>








        <BrandCard
          className="card-hover"
        >

          <h2
            className="
              text-2xl
              font-black
              text-purple-400
            "
          >
            🔥 Community Streams
          </h2>


          <p
            className="
              mt-4
              text-slate-300
            "
          >
            Watch live gameplay, community events,
            and future PulsePlay broadcasts.
          </p>


        </BrandCard>








        <BrandCard
          className="card-hover"
        >

          <h2
            className="
              text-2xl
              font-black
              text-cyan-400
            "
          >
            💜 Follow PulsePlay
          </h2>



          <p
            className="
              mt-4
              text-slate-300
            "
          >
            Follow the channel and join the
            PulsePlay gaming community.
          </p>




          <div className="mt-6">

            <a
              href="https://www.twitch.tv/Veiltactician"
              target="_blank"
              rel="noreferrer"
            >

              <BrandButton>
                Follow on Twitch
              </BrandButton>


            </a>


          </div>



        </BrandCard>





      </section>






    </main>

  );

}