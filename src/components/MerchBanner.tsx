import { Link } from "react-router-dom";

export default function MerchBanner() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div
        className="
          group
          relative
          overflow-hidden
          rounded-3xl
          border
          border-purple-500/30
          bg-gradient-to-br
          from-[#060912]
          via-[#0b1020]
          to-purple-950/50
          p-6
          shadow-[0_0_70px_rgba(168,85,247,.12)]
          md:p-8
          lg:p-10
        "
      >
        {/* =========================
            AMBIENT HUD GLOWS
        ========================= */}

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            -top-32
            h-80
            w-80
            rounded-full
            bg-purple-500/10
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-40
            -left-32
            h-80
            w-80
            rounded-full
            bg-cyan-500/10
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-1/4
            top-1/2
            h-40
            w-40
            -translate-y-1/2
            rounded-full
            bg-pink-500/5
            blur-3xl
          "
        />

        {/* =========================
            SCAN LINES
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
            via-purple-400
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
            via-cyan-400/50
            to-transparent
          "
        />

        {/* =========================
            MAIN CONTENT
        ========================= */}

        <div
          className="
            relative
            z-10
            grid
            gap-8
            lg:grid-cols-[1fr_360px]
            lg:items-center
          "
        >
          {/* =========================
              STORE INTELLIGENCE
          ========================= */}

          <div>
            <div className="flex items-center gap-3">
              <span
                className="
                  pp-live-dot
                  h-3
                  w-3
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
                PulsePlay Merchandise Network
              </p>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span
                className="
                  rounded-lg
                  border
                  border-purple-400/20
                  bg-purple-500/5
                  px-3
                  py-1.5
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.25em]
                  text-purple-300
                "
              >
                STORE ONLINE
              </span>

              <span
                className="
                  rounded-lg
                  border
                  border-green-400/20
                  bg-green-500/5
                  px-3
                  py-1.5
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.25em]
                  text-green-300
                "
              >
                ACCESS GRANTED
              </span>
            </div>

            <h2
              className="
                mt-5
                text-4xl
                font-black
                uppercase
                leading-[0.95]
                tracking-tight
                text-white
                md:text-5xl
                lg:text-6xl
              "
            >
              Equip Your
              <span className="block pp-gradient-text">
                PulsePlay Loadout
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
              Official PulsePlay apparel, gaming gear, and
              creator equipment built for players who are
              ready to enter the next mission.
            </p>

            {/* LOADOUT CATEGORIES */}

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div
                className="
                  rounded-xl
                  border
                  border-white/10
                  bg-black/20
                  p-4
                "
              >
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-cyan-400">
                  01
                </p>

                <p className="mt-2 text-sm font-black uppercase text-white">
                  Apparel
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Wear the network.
                </p>
              </div>

              <div
                className="
                  rounded-xl
                  border
                  border-white/10
                  bg-black/20
                  p-4
                "
              >
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-purple-400">
                  02
                </p>

                <p className="mt-2 text-sm font-black uppercase text-white">
                  Gaming Gear
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Upgrade your station.
                </p>
              </div>

              <div
                className="
                  rounded-xl
                  border
                  border-white/10
                  bg-black/20
                  p-4
                "
              >
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-pink-400">
                  03
                </p>

                <p className="mt-2 text-sm font-black uppercase text-white">
                  Creator Gear
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Build your broadcast.
                </p>
              </div>
            </div>
          </div>

          {/* =========================
              STORE ACCESS TERMINAL
          ========================= */}

          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-purple-400/20
              bg-black/30
              p-6
              backdrop-blur-xl
              md:p-7
            "
          >
            <div
              className="
                absolute
                inset-x-0
                top-0
                h-px
                bg-gradient-to-r
                from-transparent
                via-purple-400
                to-transparent
              "
            />

            <div className="flex items-center justify-between">
              <div>
                <p
                  className="
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.3em]
                    text-slate-500
                  "
                >
                  Store Terminal
                </p>

                <h3 className="mt-2 text-xl font-black uppercase text-white">
                  Loadout Access
                </h3>
              </div>

              <span
                className="
                  rounded-lg
                  border
                  border-green-400/20
                  bg-green-400/5
                  px-3
                  py-1
                  text-[9px]
                  font-black
                  uppercase
                  tracking-widest
                  text-green-300
                "
              >
                ONLINE
              </span>
            </div>

            <div className="my-6 h-px bg-white/10" />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-slate-500">
                  Network
                </span>

                <span className="text-xs font-bold text-cyan-300">
                  PULSEPLAY
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-slate-500">
                  Inventory
                </span>

                <span className="text-xs font-bold text-purple-300">
                  ACTIVE
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-slate-500">
                  Access
                </span>

                <span className="text-xs font-bold text-green-300">
                  AUTHORIZED
                </span>
              </div>
            </div>

            <Link
              to="/merchandise"
              className="
                mt-7
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-xl
                border
                border-purple-400/40
                bg-gradient-to-r
                from-purple-500/20
                to-cyan-500/10
                px-6
                py-4
                text-xs
                font-black
                uppercase
                tracking-[0.18em]
                text-purple-200
                shadow-[0_0_30px_rgba(168,85,247,.12)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-purple-300/60
                hover:bg-purple-500/30
                hover:text-white
              "
            >
              Enter Merchandise
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <p className="mt-4 text-center text-[9px] font-black uppercase tracking-[0.25em] text-slate-600">
              EQUIP • CUSTOMIZE • DEPLOY
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
