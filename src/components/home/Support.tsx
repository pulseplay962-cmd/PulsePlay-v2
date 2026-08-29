import { Link } from "react-router-dom";

export default function Support() {
  return (
    <section className="relative overflow-hidden bg-[#05070d] px-6 pb-32 pt-20 text-white">
      {/* =========================
          AMBIENT NETWORK EFFECTS
      ========================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-96
          w-96
          -translate-x-1/2
          rounded-full
          bg-purple-600/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-10
          left-0
          h-72
          w-72
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-0
          top-1/3
          h-64
          w-64
          rounded-full
          bg-pink-500/5
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-7xl">
        <div
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-cyan-500/20
            bg-gradient-to-br
            from-[#0b1120]
            via-[#080d18]
            to-purple-950/30
            shadow-[0_0_70px_rgba(34,211,238,.08)]
          "
        >
          {/* =========================
              HUD SCAN LINES
          ========================= */}

          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-cyan-400
              to-transparent
              opacity-80
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-purple-400/60
              to-transparent
            "
          />

          {/* =========================
              SYSTEM HEADER
          ========================= */}

          <div
            className="
              relative
              flex
              flex-col
              gap-5
              border-b
              border-white/10
              px-6
              py-6
              md:flex-row
              md:items-center
              md:justify-between
              md:px-10
              lg:px-12
            "
          >
            <div>
              <div className="flex items-center gap-3">
                <span
                  className="
                    pp-live-dot
                    h-3
                    w-3
                    rounded-full
                    bg-cyan-400
                    shadow-[0_0_14px_rgba(34,211,238,.8)]
                  "
                />

                <p
                  className="
                    text-xs
                    font-black
                    uppercase
                    tracking-[0.4em]
                    text-cyan-400
                  "
                >
                  PulsePlay Network
                </p>
              </div>

              <p className="mt-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
                COMMUNITY SUPPORT TERMINAL // ACTIVE
              </p>
            </div>

            <div
              className="
                inline-flex
                w-fit
                items-center
                gap-3
                rounded-full
                border
                border-green-500/20
                bg-green-500/5
                px-4
                py-2
                text-[10px]
                font-black
                uppercase
                tracking-[0.2em]
                text-green-400
              "
            >
              <span
                className="
                  pp-live-dot
                  h-2.5
                  w-2.5
                  rounded-full
                  bg-green-400
                  shadow-[0_0_12px_rgba(34,197,94,.7)]
                "
              />

              SYSTEM ONLINE
            </div>
          </div>

          {/* =========================
              SUPPORT CONTENT
          ========================= */}

          <div className="relative z-10 p-6 md:p-10 lg:p-12">
            <div className="mx-auto max-w-4xl text-center">
              <p
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.4em]
                  text-purple-400
                "
              >
                Network Support Hub
              </p>

              <h2
                className="
                  mt-4
                  text-4xl
                  font-black
                  uppercase
                  tracking-tight
                  text-white
                  sm:text-5xl
                  md:text-6xl
                "
              >
                Support
                <span className="block pp-gradient-text">
                  PulsePlay
                </span>
              </h2>

              <p
                className="
                  mx-auto
                  mt-5
                  max-w-3xl
                  text-base
                  leading-7
                  text-slate-300
                  md:text-lg
                "
              >
                Every follow, purchase, wishlist contribution, and
                community connection helps power the next PulsePlay
                broadcast, mission, and content drop.
              </p>
            </div>

            {/* =========================
                SUPPORT CHANNELS
            ========================= */}

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {/* NETWORK */}

              <Link
                to="/"
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-cyan-500/20
                  bg-cyan-500/5
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-cyan-400/50
                  hover:bg-cyan-500/10
                  hover:shadow-[0_0_35px_rgba(34,211,238,.12)]
                "
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">🌐</span>

                  <span
                    className="
                      rounded-full
                      border
                      border-cyan-400/20
                      px-2.5
                      py-1
                      text-[9px]
                      font-black
                      uppercase
                      tracking-widest
                      text-cyan-400
                    "
                  >
                    ACCESS
                  </span>
                </div>

                <p className="mt-6 text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">
                  CHANNEL 01
                </p>

                <h3 className="mt-2 text-xl font-black text-white">
                  Visit PulsePlay
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Explore broadcasts, games, news, merchandise,
                  community features, and the complete PulsePlay network.
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyan-400">
                  Enter Network
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>

              {/* THRONE */}

              <a
                href="https://throne.com/ve"
                target="_blank"
                rel="noreferrer"
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-purple-500/20
                  bg-purple-500/5
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-purple-400/50
                  hover:bg-purple-500/10
                  hover:shadow-[0_0_35px_rgba(147,51,234,.15)]
                "
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">🎁</span>

                  <span
                    className="
                      rounded-full
                      border
                      border-purple-400/20
                      px-2.5
                      py-1
                      text-[9px]
                      font-black
                      uppercase
                      tracking-widest
                      text-purple-400
                    "
                  >
                    SUPPORT
                  </span>
                </div>

                <p className="mt-6 text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">
                  CHANNEL 02
                </p>

                <h3 className="mt-2 text-xl font-black text-white">
                  Throne Wishlist
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Help upgrade the gaming station, streaming setup,
                  equipment, and future PulsePlay content.
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-purple-400">
                  View Wishlist
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </a>

              {/* AMAZON */}

              <a
                href="https://amzn.to/4vmEtDy"
                target="_blank"
                rel="noreferrer"
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-cyan-500/20
                  bg-cyan-500/5
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-cyan-400/50
                  hover:bg-cyan-500/10
                  hover:shadow-[0_0_35px_rgba(34,211,238,.12)]
                "
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">🛒</span>

                  <span
                    className="
                      rounded-full
                      border
                      border-cyan-400/20
                      px-2.5
                      py-1
                      text-[9px]
                      font-black
                      uppercase
                      tracking-widest
                      text-cyan-400
                    "
                  >
                    GEAR
                  </span>
                </div>

                <p className="mt-6 text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">
                  CHANNEL 03
                </p>

                <h3 className="mt-2 text-xl font-black text-white">
                  Amazon Picks
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Browse gaming gear, accessories, and equipment
                  selected and featured through the PulsePlay network.
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyan-400">
                  Browse Picks
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </a>
            </div>

            {/* =========================
                NETWORK STATUS
            ========================= */}

            <div
              className="
                mt-10
                grid
                gap-4
                border-t
                border-white/10
                pt-6
                sm:grid-cols-3
              "
            >
              <div className="rounded-xl border border-white/5 bg-black/20 p-4 text-center sm:text-left">
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-600">
                  NETWORK STATUS
                </p>

                <p className="mt-2 text-xs font-black uppercase tracking-widest text-green-400">
                  OPERATIONAL
                </p>
              </div>

              <div className="rounded-xl border border-white/5 bg-black/20 p-4 text-center sm:text-left">
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-600">
                  COMMUNITY
                </p>

                <p className="mt-2 text-xs font-black uppercase tracking-widest text-cyan-400">
                  PLAYER POWERED
                </p>
              </div>

              <div className="rounded-xl border border-white/5 bg-black/20 p-4 text-center sm:text-left">
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-600">
                  MISSION
                </p>

                <p className="mt-2 text-xs font-black uppercase tracking-widest text-purple-400">
                  KEEP GAMING
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center justify-between gap-3 text-center text-[9px] font-black uppercase tracking-[0.3em] text-slate-600 sm:flex-row sm:text-left">
              <span>PLAYER POWERED // COMMUNITY DRIVEN</span>

              <span className="text-cyan-400">
                PULSEPLAY ONLINE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
