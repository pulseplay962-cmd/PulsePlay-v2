import { NavLink } from "react-router-dom";

import BrandButton from "../ui/BrandButton";


export default function Hero() {

  return (

    <section
      className="
        relative
        overflow-hidden
        py-20
        md:py-32
      "
    >


      {/* Background Glow */}

      <div
        className="
          absolute
          inset-0
          -z-10
          opacity-40
          blur-3xl
          bg-gradient-to-r
          from-cyan-500
          via-purple-600
          to-pink-500
        "
      />




      <div
        className="
          text-center
          max-w-5xl
          mx-auto
        "
      >


        <p
          className="
            uppercase
            tracking-[0.35em]
            text-cyan-400
            font-bold
            mb-6
          "
        >
          Gaming • Streaming • Community
        </p>



        <h1
          className="
            text-5xl
            md:text-7xl
            font-black
            leading-tight
            pp-gradient-text
          "
        >
          Level Up Your
          <br />
          Gaming Experience
        </h1>




        <p
          className="
            mt-8
            text-lg
            md:text-xl
            text-slate-400
            max-w-3xl
            mx-auto
          "
        >
          Welcome to PulsePlay — a gaming hub built
          for players, creators, and communities.
          Discover games, watch live streams,
          follow gaming news, and gear up.
        </p>





        <div
          className="
            mt-10
            flex
            flex-col
            sm:flex-row
            justify-center
            gap-5
          "
        >


          <NavLink to="/streams">

            <BrandButton>
              Watch Streams
            </BrandButton>

          </NavLink>




          <NavLink to="/store">

            <BrandButton variant="secondary">
              Visit Store
            </BrandButton>

          </NavLink>


        </div>




        {/* Stats */}

        <div
          className="
            mt-16
            grid
            grid-cols-1
            sm:grid-cols-3
            gap-6
          "
        >


          <div
            className="
              glass
              p-6
            "
          >

            <h3
              className="
                text-3xl
                font-black
                text-cyan-400
              "
            >
              Live
            </h3>

            <p className="text-slate-400">
              Gaming Streams
            </p>

          </div>




          <div
            className="
              glass
              p-6
            "
          >

            <h3
              className="
                text-3xl
                font-black
                text-purple-400
              "
            >
              New
            </h3>

            <p className="text-slate-400">
              Gaming News
            </p>

          </div>




          <div
            className="
              glass
              p-6
            "
          >

            <h3
              className="
                text-3xl
                font-black
                text-pink-400
              "
            >
              Gear
            </h3>

            <p className="text-slate-400">
              Gamer Essentials
            </p>

          </div>


        </div>



      </div>


    </section>

  );

}