import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";


export default function About() {

  return (

    <main>


      <section
        className="
          text-center
          mb-12
        "
      >

        <h1
          className="
            text-5xl
            md:text-6xl
            font-black
            pp-gradient-text
          "
        >
          About PulsePlay
        </h1>


        <p
          className="
            mt-4
            text-slate-400
            max-w-3xl
            mx-auto
            text-lg
          "
        >
          A gaming platform built for players,
          creators, and communities who want to
          experience gaming together.
        </p>


      </section>




      <section
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        "
      >


        <BrandCard>

          <h2
            className="
              text-3xl
              font-bold
            "
          >
            Our Mission
          </h2>


          <p
            className="
              mt-4
              text-slate-400
              leading-relaxed
            "
          >
            PulsePlay was created to bring gamers
            together through live streams, gaming
            news, community discussions, and
            carefully selected gaming products.
          </p>


        </BrandCard>




        <BrandCard>

          <h2
            className="
              text-3xl
              font-bold
            "
          >
            Level Up Together
          </h2>


          <p
            className="
              mt-4
              text-slate-400
              leading-relaxed
            "
          >
            Whether you are a competitive player,
            casual gamer, streamer, or someone
            discovering your next favorite game,
            PulsePlay is built for you.
          </p>


        </BrandCard>



      </section>





      <section className="mt-8">


        <BrandCard>


          <div
            className="
              text-center
              max-w-3xl
              mx-auto
            "
          >

            <h2
              className="
                text-3xl
                font-black
                pp-gradient-text
              "
            >
              Join the Community
            </h2>


            <p
              className="
                mt-4
                text-slate-400
              "
            >
              Follow the journey, watch streams,
              discover games, and help shape the
              future of PulsePlay.
            </p>


            <div className="mt-6">

              <BrandButton>
                Join PulsePlay
              </BrandButton>

            </div>


          </div>


        </BrandCard>


      </section>



    </main>

  );
}