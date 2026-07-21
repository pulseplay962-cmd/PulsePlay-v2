import { NavLink } from "react-router-dom";


export default function Footer() {

  return (

    <footer
      className="
        mt-20
        border-t
        border-white/10
        bg-[#070b14]
      "
    >

      <div
        className="
          max-w-1400
          mx-auto
          px-6
          py-10
          grid
          grid-cols-1
          md:grid-cols-3
          gap-8
        "
      >



        {/* Brand */}

        <div>

          <h2
            className="
              text-3xl
              font-black
              pp-gradient-text
            "
          >
            PulsePlay
          </h2>


          <p
            className="
              mt-4
              text-slate-400
            "
          >
            Level up your gaming experience with
            live streams, gaming news, community,
            and gear built for gamers.
          </p>


        </div>





        {/* Navigation */}

        <div>

          <h3
            className="
              text-xl
              font-bold
              text-white
            "
          >
            Explore
          </h3>


          <div
            className="
              mt-4
              space-y-2
            "
          >

            <NavLink
              to="/games"
              className="
                block
                text-slate-400
                hover:text-cyan-400
              "
            >
              Games
            </NavLink>


            <NavLink
              to="/streams"
              className="
                block
                text-slate-400
                hover:text-cyan-400
              "
            >
              Streams
            </NavLink>


            <NavLink
              to="/store"
              className="
                block
                text-slate-400
                hover:text-cyan-400
              "
            >
              Store
            </NavLink>


            <NavLink
              to="/news"
              className="
                block
                text-slate-400
                hover:text-cyan-400
              "
            >
              News
            </NavLink>


          </div>


        </div>





        {/* Community */}

        <div>


          <h3
            className="
              text-xl
              font-bold
              text-white
            "
          >
            Community
          </h3>


          <p
            className="
              mt-4
              text-slate-400
            "
          >
            Follow PulsePlay for streams,
            updates, gaming discussions,
            and future events.
          </p>



          <div
            className="
              mt-5
              flex
              gap-4
            "
          >

            <a
              href="#"
              className="
                text-slate-400
                hover:text-purple-400
              "
            >
              Twitch
            </a>


            <a
              href="#"
              className="
                text-slate-400
                hover:text-cyan-400
              "
            >
              Discord
            </a>


            <a
              href="#"
              className="
                text-slate-400
                hover:text-pink-400
              "
            >
              X
            </a>


          </div>


        </div>



      </div>





      <div
        className="
          border-t
          border-white/10
          py-5
          text-center
          text-slate-500
          text-sm
        "
      >

        © {new Date().getFullYear()} PulsePlay.
        All rights reserved.

      </div>


    </footer>

  );

}