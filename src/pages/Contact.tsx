import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";


export default function Contact() {

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
          Contact PulsePlay
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
          Have questions, feedback, partnership ideas,
          or want to join the community?
          Connect with PulsePlay.
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


        <BrandCard
          className="card-hover"
        >

          <h2
            className="
              text-3xl
              font-black
              text-cyan-400
            "
          >
            🎮 Community
          </h2>


          <p
            className="
              mt-4
              text-slate-400
              leading-relaxed
            "
          >
            Connect with gamers, follow streams,
            discover new releases, and stay updated
            with everything happening in the
            PulsePlay universe.
          </p>



          <div className="mt-6">

            <BrandButton>
              Join Community
            </BrandButton>

          </div>


        </BrandCard>







        <BrandCard
          className="card-hover"
        >

          <h2
            className="
              text-3xl
              font-black
              text-purple-400
            "
          >
            💬 Get In Touch
          </h2>



          <p
            className="
              mt-4
              text-slate-400
              leading-relaxed
            "
          >
            For questions, partnerships,
            feedback, or support, reach out
            to the PulsePlay team.
          </p>




          <div
            className="
              mt-6
              space-y-3
            "
          >

            <div
              className="
                rounded-xl
                border
                border-cyan-500/20
                bg-black/20
                p-4
                text-slate-300
              "
            >
              Email: support@pulseplay.online
            </div>



            <div
              className="
                rounded-xl
                border
                border-purple-500/20
                bg-black/20
                p-4
                text-slate-300
              "
            >
              Social: @PulsePlay
            </div>


          </div>


        </BrandCard>


      </section>







      <section className="mt-8">


        <BrandCard
          className="card-hover"
        >


          <div
            className="
              text-center
            "
          >

            <h2
              className="
                text-3xl
                font-black
                pp-gradient-text
              "
            >
              Ready to Level Up?
            </h2>



            <p
              className="
                mt-4
                text-slate-400
              "
            >
              Follow PulsePlay and become part
              of a growing gaming community built
              around streams, games, and discovery.
            </p>


          </div>


        </BrandCard>


      </section>


    </main>

  );

}