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


        {/* Brand */}

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
              alt="PulsePlay Logo"
              className="
                w-12
                h-12
                rounded-xl
                shadow-[0_0_20px_rgba(34,211,238,.25)]
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

            {[
              {
                name:"Games",
                path:"/games"
              },
              {
                name:"Streams",
                path:"/streams"
              },
              {
                name:"News",
                path:"/news"
              },
              {
                name:"Store",
                path:"/store"
              },
            ].map((item)=>(
              
              <NavLink
                key={item.path}
                to={item.path}
                className="
                  block
                  text-slate-400
                  transition
                  hover:text-cyan-400
                  hover:translate-x-1
                "
              >
                {item.name}
              </NavLink>

            ))}


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
              gap-5
              flex-wrap
            "
          >


            <a
              href="https://www.twitch.tv/veiltactician"
              target="_blank"
              rel="noreferrer"
              aria-label="PulsePlay Twitch"
              className="
                text-slate-300
                transition
                hover:text-purple-400
                hover:drop-shadow-[0_0_10px_#a855f7]
              "
            >
              Twitch
            </a>



            <a
              href="#"
              aria-label="PulsePlay Discord"
              className="
                text-slate-300
                transition
                hover:text-cyan-400
              "
            >
              Discord
            </a>



            <a
              href="#"
              aria-label="PulsePlay X"
              className="
                text-slate-300
                transition
                hover:text-pink-400
              "
            >
              X
            </a>



            <a
              href="#"
              aria-label="PulsePlay Facebook"
              className="
                text-slate-300
                transition
                hover:text-blue-400
              "
            >
              Facebook
            </a>


          </div>


        </div>


      </div>






      {/* Bottom */}

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