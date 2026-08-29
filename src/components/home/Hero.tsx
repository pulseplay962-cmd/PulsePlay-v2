import { NavLink } from "react-router-dom";

import BrandButton from "../ui/BrandButton";
import BrandCard from "../ui/BrandCard";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">

      {/* ENERGY CORE */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          -z-20
          bg-gradient-to-r
          from-purple-600/30
          via-cyan-500/20
          to-pink-500/20
          blur-3xl
        "
      />

      {/* CYBER SCAN */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          pp-scan
          opacity-40
        "
      />

      <div className="mx-auto max-w-7xl px-6">

        {/* SYSTEM STATUS */}

        <div className="flex justify-center">

          <div
            className="
              inline-flex
              items-center
              gap-3
              rounded-full
              pp-panel
              px-5
              py-2.5
              text-xs
              font-black
              tracking-[0.2em]
              text-cyan-300
              md:px-6
              md:py-3
              md:text-sm
            "
          >

            <span className="pp-live-dot" />

            SYSTEM ONLINE

            <span className="text-slate-600">
              //
            </span>

            <span className="hidden sm:inline">
              PLAYER NETWORK CONNECTED
            </span>

            <span className="sm:hidden">
              NETWORK CONNECTED
            </span>

          </div>

        </div>

        {/* MAIN HERO */}

        <div className="mx-auto mt-12 max-w-6xl text-center md:mt-16">

          <p
            className="
              text-xs
              font-black
              uppercase
              tracking-[0.45em]
              text-purple-300
              md:text-sm
            "
          >
            Welcome to the Network
          </p>

          <h1
            className="
              mt-4
              text-6xl
              font-black
              leading-none
              tracking-tight
              pp-gradient-text
              sm:text-7xl
              md:text-9xl
            "
          >
            PULSEPLAY
          </h1>

          <p
            className="
              mt-6
              text-xl
              font-black
              uppercase
              tracking-[0.15em]
              text-white
              md:text-3xl
              md:tracking-[0.2em]
            "
          >
            Gaming Command Center
          </p>

          <p
            className="
              mx-auto
              mt-7
              max-w-3xl
              text-base
              leading-8
              text-slate-300
              md:text-lg
            "
          >
            Watch live broadcasts, discover new games, track gaming
            intelligence, explore the community, and power up your setup.
          </p>

        </div>

        {/* PRIMARY OBJECTIVE */}

        <BrandCard
          scan
          className="mx-auto mt-12 max-w-5xl p-6 md:mt-16 md:p-8"
        >

          <div
            className="
              flex
              flex-col
              gap-6
              md:flex-row
              md:items-center
              md:justify-between
            "
          >

            <div className="text-left">

              <div className="flex items-center gap-3">

                <span className="pp-live-dot" />

                <span
                  className="
                    text-xs
                    font-black
                    tracking-[0.3em]
                    text-purple-300
                  "
                >
                  PRIMARY OBJECTIVE
                </span>

              </div>

              <h2
                className="
                  mt-4
                  text-2xl
                  font-black
                  text-white
                  md:text-3xl
                "
              >
                Enter the PulsePlay Network.
              </h2>

              <p
                className="
                  mt-3
                  max-w-2xl
                  text-sm
                  leading-7
                  text-slate-400
                  md:text-base
                "
              >
                Your next stream, game, mission, and gaming discovery
                starts here.
              </p>

            </div>

            <div
              className="
                flex
                flex-col
                gap-3
                sm:flex-row
              "
            >

              <NavLink to="/streams">
                <BrandButton variant="primary">
                  📡 Watch Live
                </BrandButton>
              </NavLink>

              <NavLink to="/games">
                <BrandButton variant="secondary">
                  🎮 Explore Games
                </BrandButton>
              </NavLink>

            </div>

          </div>

        </BrandCard>

        {/* QUICK ACCESS */}

        <div
          className="
            mx-auto
            mt-8
            grid
            max-w-5xl
            grid-cols-2
            gap-3
            md:grid-cols-4
          "
        >

          <NavLink
            to="/news"
            className="
              rounded-xl
              border
              border-pink-500/20
              bg-pink-500/5
              p-4
              text-center
              transition-all
              hover:-translate-y-1
              hover:border-pink-400/50
              hover:bg-pink-500/10
            "
          >
            <div className="text-xl">
              📰
            </div>

            <div
              className="
                mt-2
                text-xs
                font-black
                tracking-widest
                text-pink-300
              "
            >
              GAMING INTEL
            </div>
          </NavLink>

          <NavLink
            to="/community"
            className="
              rounded-xl
              border
              border-cyan-500/20
              bg-cyan-500/5
              p-4
              text-center
              transition-all
              hover:-translate-y-1
              hover:border-cyan-400/50
              hover:bg-cyan-500/10
            "
          >
            <div className="text-xl">
              🌐
            </div>

            <div
              className="
                mt-2
                text-xs
                font-black
                tracking-widest
                text-cyan-300
              "
            >
              COMMUNITY
            </div>
          </NavLink>

          <NavLink
            to="/store"
            className="
              rounded-xl
              border
              border-purple-500/20
              bg-purple-500/5
              p-4
              text-center
              transition-all
              hover:-translate-y-1
              hover:border-purple-400/50
              hover:bg-purple-500/10
            "
          >
            <div className="text-xl">
              🛒
            </div>

            <div
              className="
                mt-2
                text-xs
                font-black
                tracking-widest
                text-purple-300
              "
            >
              MERCH
            </div>
          </NavLink>

          <NavLink
            to="/about"
            className="
              rounded-xl
              border
              border-blue-500/20
              bg-blue-500/5
              p-4
              text-center
              transition-all
              hover:-translate-y-1
              hover:border-blue-400/50
              hover:bg-blue-500/10
            "
          >
            <div className="text-xl">
              ⚡
            </div>

            <div
              className="
                mt-2
                text-xs
                font-black
                tracking-widest
                text-blue-300
              "
            >
              ABOUT PULSEPLAY
            </div>
          </NavLink>

        </div>

      </div>

    </section>
  );
}
