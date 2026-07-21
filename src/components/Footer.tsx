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
          max-w-[1400px]
          mx-auto
          px-6
          py-12
          grid
          grid-cols-1
          md:grid-cols-3
          gap-10
        "
      >



        {/* Brand Section */}

        <div>

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <img
              src="/pulseplay-logo.svg"
              alt="PulsePlay"
              className="
                w-12
                h-12
                rounded-xl
              "
            />


            <h2
              className="
                text-3xl
                font-black
                pp-gradient-text
              "
            >
              PulsePlay
            </h2>


          </div>



          <p
            className="
              mt-5
              text-slate-400
              leading-relaxed
            "
          >
            Level up your gaming experience with
            live streams, gaming news, community
            content, and gamer gear.
          </p>


        </div>






        {/* Explore */}

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
              mt-5
              space-y-3
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
              to="/news"
              className="
                block
                text-slate-400
                hover:text-cyan-400
              "
            >
              News
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
            Join The Community
          </h3>



          <p
            className="
              mt-5
              text-slate-400
            "
          >
            Follow PulsePlay for streams,
            updates, gaming discussions,
            and new releases.
          </p>



          <div
            className="
              mt-6
              flex
              gap-4
              flex-wrap
            "
          >

            <a
              href="https://www.twitch.tv/veiltactician"
              target="_blank"
              rel="noreferrer"
              className="
                text-slate-300
                hover:text-purple-400
              "
            >
              Twitch
            </a>


            <a
              href="#"
              className="
                text-slate-300
                hover:text-cyan-400
              "
            >
              Discord
            </a>


            <a
              href="#"
              className="
                text-slate-300
                hover:text-pink-400
              "
            >
              X
            </a>


            <a
              href="#"
              className="
                text-slate-300
                hover:text-blue-400
              "
            >
              Facebook
            </a>


          </div>


        </div>


      </div>






      {/* Bottom Bar */}

      <div
        className="
          border-t
          border-white/10
          py-5
          text-center
          text-sm
          text-slate-500
        "
      >

        © {new Date().getFullYear()} PulsePlay.
        All rights reserved.

      </div>



    </footer>

  );

}