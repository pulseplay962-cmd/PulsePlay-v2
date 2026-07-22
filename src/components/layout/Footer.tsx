export default function Footer() {

  const year = new Date().getFullYear();


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





        {/* System Header */}


        <div

          className="
            mb-10
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-5
          "

        >



          <div>


            <div

              className="
                inline-flex
                items-center
                gap-3
                px-4
                py-2
                rounded-full
                pp-hud
                text-cyan-300
                text-xs
                font-black
                tracking-[0.3em]
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
              text-green-400
              font-bold
              text-sm
            "

          >

            <span className="pp-live-dot" />

            NETWORK STATUS: ACTIVE

          </div>



        </div>









        <div

          className="
            grid
            md:grid-cols-3
            gap-10
          "

        >





          {/* Brand */}


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
                text-slate-400
                leading-relaxed
                max-w-sm
              "

            >

              Gaming.
              Streaming.
              Community.

              <br />

              PulsePlay connects players,
              creators, and gaming adventures
              together.

            </p>


          </div>









          {/* Navigation */}


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


              <a
                href="/"
                className="
                  text-slate-400
                  hover:text-cyan-400
                "
              >
                🏠 Command Center
              </a>



              <a
                href="/games"
                className="
                  text-slate-400
                  hover:text-cyan-400
                "
              >
                🎮 Mission Database
              </a>



              <a
                href="/streams"
                className="
                  text-slate-400
                  hover:text-cyan-400
                "
              >
                📡 Broadcast Center
              </a>



              <a
                href="/store"
                className="
                  text-slate-400
                  hover:text-cyan-400
                "
              >
                🛒 Armory
              </a>


            </div>


          </div>









          {/* Network */}


          <div>


            <h3

              className="
                mb-4
                font-black
                text-pink-400
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
                href="https://www.twitch.tv/veiltactician"
                target="_blank"
                rel="noreferrer"
                className="
                  text-slate-400
                  hover:text-cyan-400
                "
              >
                🎥 Twitch
              </a>





              <a
                href="https://throne.com/veiltactician"
                target="_blank"
                rel="noreferrer"
                className="
                  text-slate-400
                  hover:text-cyan-400
                "
              >
                🎁 Creator Support
              </a>






              <a
                href="https://amzn.to/4vmEtDy"
                target="_blank"
                rel="noreferrer"
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







      </div>







      {/* Bottom Terminal */}


      <div

        className="
          border-t
          border-cyan-500/20
          py-6
          text-center
          text-sm
          text-slate-500
        "

      >

        © {year} PulsePlay

        <br />

        SYSTEM VERSION 1.0 • ALL RIGHTS RESERVED


      </div>





    </footer>

  );

}