import { NavLink } from "react-router-dom";

import BrandButton from "../ui/BrandButton";
import BrandCard from "../ui/BrandCard";


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



      {/* Background Energy Core */}

      <div

        className="
          absolute
          inset-0
          -z-10
          opacity-40
          blur-3xl
          bg-gradient-to-r
          from-purple-600
          via-cyan-500
          to-pink-500
          animate-pulse
        "

      />





      {/* Cyber Scan */}

      <div

        className="
          absolute
          inset-0
          -z-10
          pp-scan
        "

      />








      <div

        className="
          mx-auto
          max-w-7xl
          px-6
          text-center
        "

      >





        {/* System Status */}

        <div

          className="
            inline-flex
            items-center
            gap-3
            rounded-full
            pp-panel
            px-6
            py-3
            mb-10
            text-xs
            md:text-sm
            font-black
            tracking-[0.25em]
            text-cyan-300
          "

        >


          <span className="pp-live-dot" />

          SYSTEM ONLINE


          <span className="text-slate-500">
            //
          </span>


          PLAYER NETWORK CONNECTED


        </div>









        {/* Main Logo */}

        <h1

          className="
            text-6xl
            md:text-9xl
            font-black
            leading-none
            tracking-tight
            pp-gradient-text
          "

        >

          PULSEPLAY


        </h1>





        <p

          className="
            mt-5
            text-xl
            md:text-3xl
            font-black
            uppercase
            tracking-[0.2em]
            text-white
          "

        >

          Gaming Command Center


        </p>









        <p

          className="
            mx-auto
            mt-8
            max-w-3xl
            text-lg
            text-slate-300
            leading-relaxed
          "

        >

          Enter the ultimate gaming network.
          Watch live streams, discover new worlds,
          follow gaming intel, and upgrade your setup.


        </p>









        {/* Mission HUD */}


        <BrandCard

          className="
            mx-auto
            mt-14
            max-w-4xl
            text-left
          "

          scan

        >



          <div

            className="
              flex
              items-center
              justify-between
              mb-5
            "

          >


            <span

              className="
                text-purple-300
                text-sm
                font-black
                tracking-[0.3em]
              "

            >

              PRIMARY OBJECTIVE


            </span>





            <span

              className="
                flex
                items-center
                gap-2
                text-green-400
                text-sm
                font-black
              "

            >

              <span className="pp-live-dot" />

              ACTIVE


            </span>


          </div>






          <h2

            className="
              text-3xl
              font-black
              text-white
            "

          >

            Explore The Gaming Universe


          </h2>






          <p

            className="
              mt-3
              text-slate-400
            "

          >

            Access streams, gaming news,
            community events, featured games,
            and premium gamer equipment.


          </p>



        </BrandCard>









        {/* Launch Controls */}


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

              🔴 Launch Stream


            </BrandButton>


          </NavLink>





          <NavLink to="/store">


            <BrandButton variant="secondary">


              ⚙ Enter Armory


            </BrandButton>


          </NavLink>



        </div>









        {/* Player Data */}


        <div

          className="
            mt-16
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
          "

        >





          <BrandCard>


            <h3

              className="
                text-4xl
                font-black
                text-cyan-400
              "

            >

              LIVE


            </h3>


            <p className="text-slate-400 mt-2">

              Broadcast Center

            </p>


          </BrandCard>






          <BrandCard>


            <h3

              className="
                text-4xl
                font-black
                text-purple-400
              "

            >

              XP+


            </h3>


            <p className="text-slate-400 mt-2">

              Gaming Intelligence

            </p>


          </BrandCard>






          <BrandCard>


            <h3

              className="
                text-4xl
                font-black
                text-pink-400
              "

            >

              ONLINE


            </h3>


            <p className="text-slate-400 mt-2">

              Player Community

            </p>


          </BrandCard>





        </div>







      </div>


    </section>

  );

}