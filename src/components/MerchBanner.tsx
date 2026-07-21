export default function MerchBanner() {
  return (
    <section className="px-6 py-10">

      <div
        className="
          mx-auto
          max-w-6xl
          overflow-hidden
          rounded-2xl
          border
          border-purple-500/40
          bg-gradient-to-r
          from-[#0b1120]
          to-purple-900/40
          p-10
          text-white
          shadow-lg
        "
      >

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">


          <div>

            <p className="font-bold text-cyan-400">
              🔥 NEW DROP AVAILABLE
            </p>


            <h2
              className="
                mt-2
                text-4xl
                font-black
              "
            >
              PULSEPLAY
              <br />
              LEVEL UP COLLECTION
            </h2>


            <p
              className="
                mt-4
                max-w-xl
                text-gray-300
              "
            >
              Official gaming apparel and setup gear built for
              streamers, creators, and the PulsePlay community.
            </p>


          </div>


          <a
            href="/merchandise"
            className="
              rounded-lg
              bg-purple-600
              px-8
              py-4
              font-black
              text-white
              transition
              hover:bg-purple-500
            "
          >
            Explore Merch
          </a>


        </div>


      </div>

    </section>
  );
}