import { NavLink } from "react-router-dom";
import { socials } from "../../data/socials";


export default function Footer() {

  const year = new Date().getFullYear();


  // Replace this with your real Discord invite link
  const discordInvite =
    "https://discord.gg/UTTbVJtnb";



  const navigation = [

    {
      name:"🏠 Command Center",
      path:"/"
    },

    {
      name:"🎮 Mission Database",
      path:"/games"
    },

    {
      name:"📡 Broadcast Center",
      path:"/streams"
    },

    {
      name:"🛒 Armory",
      path:"/store"
    },

    {
      name:"📰 Intel Network",
      path:"/news"
    },

    {
      name:"🌐 Community",
      path:"/community"
    },

    {
      name:"📝 Feedback",
      path:"/feedback"
    }

  ];



  return (

    <footer
      className="
      mt-20
      border-t
      border-cyan-500/20
      bg-[#05070d]
      "
    >


      <div
        className="
        mx-auto
        max-w-7xl
        px-6
        py-12
        "
      >



        <div
          className="
          mb-10
          flex
          flex-col
          gap-5
          md:flex-row
          md:items-center
          md:justify-between
          "
        >


          <div>


            <div
              className="
              inline-flex
              items-center
              gap-3
              rounded-full
              px-4
              py-2
              pp-hud
              text-xs
              font-black
              tracking-[0.3em]
              text-cyan-300
              "
            >

              ⚡ COMMAND CENTER ONLINE

            </div>



            <h2
              className="
              mt-5
              text-3xl
              font-black
              pp-gradient-text
              "
            >

              PULSEPLAY

            </h2>


          </div>





          <div
            className="
            flex
            items-center
            gap-3
            font-bold
            text-green-400
            "
          >

            <span className="pp-live-dot"/>

            NETWORK STATUS: ACTIVE

          </div>


        </div>





        <div
          className="
          grid
          gap-10
          md:grid-cols-4
          "
        >





          {/* BRAND */}

          <div>

            <h3
              className="
              text-xl
              font-black
              text-cyan-400
              "
            >

              GAMING NETWORK

            </h3>



            <p
              className="
              mt-4
              max-w-sm
              leading-relaxed
              text-slate-400
              "
            >

              Gaming.
              Streaming.
              Community.

              <br/><br/>

              PulsePlay connects players,
              creators, and gaming adventures
              through one unified command center.

            </p>


          </div>







          {/* NAVIGATION */}


          <div>


            <h3
              className="
              mb-4
              font-black
              text-purple-400
              "
            >

              SYSTEM SECTORS

            </h3>



            <div
              className="
              flex
              flex-col
              gap-3
              "
            >

              {
                navigation.map((item)=>(

                  <NavLink

                    key={item.path}

                    to={item.path}

                    className="
                    text-slate-400
                    transition
                    hover:text-cyan-400
                    "

                  >

                    {item.name}

                  </NavLink>

                ))
              }


            </div>


          </div>







          {/* COMMUNITY */}


          <div>


            <h3
              className="
              mb-4
              font-black
              text-pink-400
              "
            >

              JOIN THE NETWORK

            </h3>



            <p
              className="
              mb-4
              text-sm
              text-slate-400
              "
            >

              Get gaming updates,
              stream alerts,
              Discord events,
              and community drops.

            </p>





            <a

              href={discordInvite}

              target="_blank"

              rel="noopener noreferrer"

              className="
              block
              rounded-xl
              bg-gradient-to-r
              from-purple-600
              to-pink-500
              px-5
              py-3
              text-center
              font-black
              text-white
              transition
              hover:scale-105
              "

            >

              🎮 Join PulsePlay Discord

            </a>






            <NavLink

              to="/feedback"

              className="
              mt-3
              block
              rounded-xl
              border
              border-cyan-400/30
              px-5
              py-3
              text-center
              font-bold
              text-cyan-300
              transition
              hover:bg-cyan-400/10
              "

            >

              📝 Submit Feedback

            </NavLink>


          </div>








          {/* SOCIAL */}


          <div>


            <h3
              className="
              mb-4
              font-black
              text-yellow-400
              "
            >

              NETWORK LINKS

            </h3>



            <div
              className="
              flex
              flex-col
              gap-3
              "
            >


              <a
                href={socials.twitch}
                target="_blank"
                rel="noopener noreferrer"
                className="
                text-slate-400
                hover:text-cyan-400
                "
              >
                🎥 Twitch
              </a>




              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="
                text-slate-400
                hover:text-cyan-400
                "
              >
                📘 Facebook
              </a>




              <a
                href={socials.throne}
                target="_blank"
                rel="noopener noreferrer"
                className="
                text-slate-400
                hover:text-cyan-400
                "
              >
                🎁 Creator Support
              </a>




              <a
                href={socials.amazon}
                target="_blank"
                rel="noopener noreferrer"
                className="
                text-slate-400
                hover:text-cyan-400
                "
              >
                ⚙️ Gear Armory
              </a>


            </div>


          </div>



        </div>







        <div
          className="
          mt-12
          border-t
          border-white/10
          pt-6
          text-center
          text-sm
          text-slate-500
          "
        >


          <div className="flex justify-center gap-5 mb-3">


            <NavLink
              to="/privacy"
              className="hover:text-cyan-400"
            >
              Privacy
            </NavLink>



            <NavLink
              to="/terms"
              className="hover:text-cyan-400"
            >
              Terms
            </NavLink>


          </div>



          © {year} PulsePlay

          <br/>

          SYSTEM VERSION 2.1 • ALL RIGHTS RESERVED


        </div>



      </div>


    </footer>

  );

}