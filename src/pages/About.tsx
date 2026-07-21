import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";


export default function About() {

  return (

    <main>


      <section
        className="
          text-center
          mb-16
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
            mt-5
            mx-auto
            max-w-3xl
            text-lg
            text-slate-400
          "
        >
          A gaming platform built for players,
          creators, and communities who believe
          gaming is better together.
        </p>


      </section>




      <section
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-8
        "
      >

        <BrandCard className="card-hover">

          <h2
            className="
              text-3xl
              font-black
              text-cyan-400
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
            PulsePlay brings gamers together
            through live streams, gaming news,
            community conversations, and
            carefully selected gaming gear.
          </p>

        </BrandCard>





        <BrandCard className="card-hover">

          <h2
            className="
              text-3xl
              font-black
              text-purple-400
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
            casual gamer, content creator, or
            discovering your next adventure,
            PulsePlay is built for you.
          </p>

        </BrandCard>


      </section>






      <section
        className="
          mt-8
          grid
          grid-cols-1
          md:grid-cols-3
          gap-8
        "
      >

        <BrandCard className="card-hover">

          <h3 className="text-xl font-black text-white">
            🎮 Discover Games
          </h3>


          <p className="mt-3 text-slate-400">
            Find new releases, upcoming titles,
            and games worth playing.
          </p>

        </BrandCard>





        <BrandCard className="card-hover">

          <h3 className="text-xl font-black text-white">
            📺 Watch & Connect
          </h3>


          <p className="mt-3 text-slate-400">
            Follow streams, interact with creators,
            and be part of the community.
          </p>

        </BrandCard>





        <BrandCard className="card-hover">

          <h3 className="text-xl font-black text-white">
            🛒 Gear Up
          </h3>


          <p className="mt-3 text-slate-400">
            Explore gaming accessories and gear
            recommended by PulsePlay.
          </p>

        </BrandCard>


      </section>






      <section className="mt-8">


        <BrandCard className="card-hover">


          <div
            className="
              text-center
              mx-auto
              max-w-3xl
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