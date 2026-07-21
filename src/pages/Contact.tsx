import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";


export default function Contact() {

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
          Contact PulsePlay
        </h1>


        <p
          className="
            mt-4
            text-slate-400
            max-w-2xl
            mx-auto
            text-lg
          "
        >
          Have questions, feedback, partnership ideas,
          or want to join the community?
          Reach out to us.
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
            Community
          </h2>


          <p
            className="
              mt-4
              text-slate-400
            "
          >
            Connect with other gamers, follow streams,
            and stay updated with everything happening
            in the PulsePlay universe.
          </p>


          <div className="mt-6">

            <BrandButton>
              Join Community
            </BrandButton>

          </div>


        </BrandCard>





        <BrandCard>


          <h2
            className="
              text-3xl
              font-bold
            "
          >
            Get In Touch
          </h2>


          <p
            className="
              mt-4
              text-slate-400
            "
          >
            For questions, partnerships, or support,
            send us a message and we'll get back to you.
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
                border-white/10
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
                border-white/10
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


        <BrandCard>


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
            Follow PulsePlay and be part of a growing
            gaming community built around streams,
            games, and discovery.
          </p>


        </BrandCard>


      </section>


    </main>

  );
}