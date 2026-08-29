export default function MerchBanner() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div
        className="
          group
          relative
          overflow-hidden
          rounded-3xl
          border
          border-purple-500/30
          bg-gradient-to-br
          from-[#070b14]
          via-[#0b1120]
          to-purple-950/50
          p-8
          shadow-[0_0_50px_rgba(168,85,247,.12)]
          md:p-12
        "
      >
        {/* HUD glow */}
        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-64
            w-64
            rounded-full
            bg-purple-500/10
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-32
            -left-20
            h-64
            w-64
            rounded-full
            bg-cyan-500/10
            blur-3xl
          "
        />

        {/* Scan line */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-purple-400
            to-transparent
            opacity-70
          "
        />

        <div
          className="
            relative
            z-10
            flex
            flex-col
            gap-10
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* Content */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span
                className="
                  h-2.5
                  w-2.5
                  rounded-full
                  bg-purple-400
                  shadow-[0_0_14px_rgba(168,85,247,.8)]
                "
              />

              <p
                className="
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.35em]
                  text-purple-300
                "
              >
                Merchandise System
              </p>
            </div>

            <h2
              className="
                mt-4
                text-4xl
                font-black
                uppercase
                leading-tight
                text-white
                md:text-5xl
              "
            >
              Level Up Your
              <span className="block pp-gradient-text">
                Gaming Loadout
              </span>
            </h2>

            <p
              className="
                mt-5
                max-w-2xl
                text-base
                leading-7
                text-slate-400
                md:text-lg
              "
            >
              Official PulsePlay apparel and gaming gear built
              for streamers, creators, players, and the community
              behind the network.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span
                className="
                  rounded-full
                  border
                  border-cyan-500/20
                  bg-cyan-500/5
                  px-4
                  py-2
                  text-xs
                  font-black
                  uppercase
                  tracking-wider
                  text-cyan-300
                "
              >
                Creator Ready
              </span>

              <span
                className="
                  rounded-full
                  border
                  border-purple-500/20
                  bg-purple-500/5
                  px-4
                  py-2
                  text-xs
                  font-black
                  uppercase
                  tracking-wider
                  text-purple-300
                "
              >
                PulsePlay Official
              </span>
            </div>
          </div>

          {/* CTA panel */}
          <div
            className="
              min-w-full
              rounded-2xl
              border
              border-white/10
              bg-black/20
              p-6
              backdrop-blur-xl
              lg:min-w-[280px]
            "
          >
            <p
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.3em]
                text-slate-500
              "
            >
              LOADOUT ACCESS
            </p>

            <p
              className="
                mt-3
                text-sm
                font-bold
                text-slate-300
              "
            >
              Browse the latest PulsePlay merchandise drops.
            </p>

            <a
              href="/merchandise"
              className="
                mt-6
                inline-flex
                w-full
                items-center
                justify-center
                rounded-xl
                border
                border-purple-400/40
                bg-purple-600/20
                px-6
                py-3
                font-black
                uppercase
                tracking-wider
                text-purple-200
                shadow-[0_0_25px_rgba(168,85,247,.15)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-purple-500/30
                hover:text-white
              "
            >
              Explore Merchandise →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}