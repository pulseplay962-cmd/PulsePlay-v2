import { Link } from "react-router-dom";

import TwitchSection from "../components/home/TwitchSection";
import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";

export default function Streams() {
  return (
    <main className="min-h-[72vh] bg-[#05070d] px-6 py-12 text-white">

      <div className="mx-auto max-w-7xl">

        {/* =========================================
            COMMAND CENTER HERO
        ========================================== */}

        <section
          className="
            relative
            mb-14
            overflow-hidden
            rounded-[2rem]
            border
            border-red-500/20
            bg-gradient-to-br
            from-red-950/30
            via-[#080b14]
            to-purple-950/30
            p-8
            shadow-[0_0_70px_rgba(239,68,68,.08)]
            md:p-12
          "
        >

          {/* Ambient HUD glow */}

          <div
            className="
              pointer-events-none
              absolute
              -right-32
              -top-32
              h-80
              w-80
              rounded-full
              bg-red-500/10
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
              bg-purple-500/10
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
              via-red-400
              to-transparent
              opacity-70
            "
          />

          <div className="relative">

            <div className="flex flex-wrap items-center gap-3">

              <span
                className="
                  h-3
                  w-3
                  animate-pulse
                  rounded-full
                  bg-red-500
                  shadow-[0_0_18px_rgba(239,68,68,.9)]
                "
              />

              <p
                className="
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.45em]
                  text-red-400
                "
              >
                Broadcast Command Center
              </p>

              <span
                className="
                  rounded-full
                  border
                  border-green-400/20
                  bg-green-500/5
                  px-3
                  py-1
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.25em]
                  text-green-400
                "
              >
                NETWORK ONLINE
              </span>

            </div>

            <h1
              className="
                mt-5
                max-w-5xl
                text-5xl
                font-black
                leading-[0.95]
                tracking-tight
                pp-gradient-text
                md:text-7xl
              "
            >
              BROADCAST
              <span className="block text-white">
                COMMAND CENTER
              </span>
            </h1>

            <p
              className="
                mt-7
                max-w-3xl
                text-lg
                leading-8
                text-slate-300
                md:text-xl
              "
            >
              Enter the PulsePlay broadcast network.
              Watch live gameplay, follow active missions,
              and connect with the gaming community.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">

              <a
                href="https://www.twitch.tv/Veiltactician"
                target="_blank"
                rel="noreferrer"
              >
                <BrandButton>
                  Enter Live Channel →
                </BrandButton>
              </a>

              <Link to="/games">
                <BrandButton variant="secondary">
                  Explore Game Intel
                </BrandButton>
              </Link>

            </div>

          </div>
        </section>


        {/* =========================================
            PRIMARY BROADCAST
        ========================================== */}

        <section className="mb-14">

          <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

            <div>

              <div className="flex items-center gap-3">

                <span
                  className="
                    h-2.5
                    w-2.5
                    animate-pulse
                    rounded-full
                    bg-red-500
                    shadow-[0_0_14px_rgba(239,68,68,.8)]
                  "
                />

                <p
                  className="
                    text-xs
                    font-black
                    uppercase
                    tracking-[0.4em]
                    text-red-400
                  "
                >
                  Primary Transmission
                </p>

              </div>

              <h2
                className="
                  mt-3
                  text-4xl
                  font-black
                  tracking-tight
                  pp-gradient-text
                  md:text-5xl
                "
              >
                Live Broadcast
              </h2>

              <p className="mt-3 max-w-2xl text-slate-400">
                Watch the current PulsePlay broadcast and
                monitor the Veiltactician transmission.
              </p>

            </div>

            <div
              className="
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-red-500/20
                bg-red-500/5
                px-4
                py-2
              "
            >
              <span
                className="
                  h-2
                  w-2
                  animate-pulse
                  rounded-full
                  bg-red-400
                "
              />

              <span
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.25em]
                  text-red-300
                "
              >
                Broadcast Link Active
              </span>

            </div>

          </div>


          <BrandCard
            status="PRIMARY TRANSMISSION"
            className="
              overflow-hidden
              border-red-500/20
              p-3
              shadow-[0_0_50px_rgba(239,68,68,.06)]
            "
          >

            <div
              className="
                mb-3
                flex
                flex-col
                gap-3
                px-3
                py-3
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >

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
                  Current Channel
                </p>

                <h3 className="mt-1 text-2xl font-black">
                  Veiltactician
                </h3>

              </div>

              <span
                className="
                  self-start
                  rounded-full
                  border
                  border-purple-400/20
                  bg-purple-500/5
                  px-3
                  py-1
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.25em]
                  text-purple-300
                  sm:self-auto
                "
              >
                PulsePlay Creator
              </span>

            </div>

            <TwitchSection channel="Veiltactician" />

          </BrandCard>

        </section>


        {/* =========================================
            BROADCAST INTELLIGENCE
        ========================================== */}

        <section className="mb-14">

          <div className="mb-7">

            <p
              className="
                text-xs
                font-black
                uppercase
                tracking-[0.4em]
                text-cyan-400
              "
            >
              Broadcast Intelligence
            </p>

            <h2 className="mt-2 text-4xl font-black pp-gradient-text">
              Network Status
            </h2>

            <p className="mt-3 max-w-3xl text-slate-400">
              Monitor the PulsePlay streaming network,
              creator activity, and community connection.
            </p>

          </div>


          <div className="grid gap-6 md:grid-cols-3">

            {/* Mission */}

            <BrandCard
              status="MISSION"
              className="
                border-cyan-500/20
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-cyan-400/40
              "
            >

              <div className="flex items-center justify-between">

                <span className="text-3xl">
                  🎮
                </span>

                <span
                  className="
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.25em]
                    text-cyan-400
                  "
                >
                  ACTIVE
                </span>

              </div>

              <h3 className="mt-5 text-xl font-black">
                Current Mission
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Follow the latest gameplay mission
                through the PulsePlay broadcast network.
              </p>

              <div
                className="
                  mt-6
                  border-t
                  border-white/10
                  pt-4
                "
              >

                <p className="text-[9px] font-black uppercase tracking-widest text-slate-600">
                  Transmission Status
                </p>

                <p className="mt-2 text-sm font-black text-cyan-300">
                  MONITORING CHANNEL
                </p>

              </div>

            </BrandCard>


            {/* Community */}

            <BrandCard
              status="COMMUNITY"
              className="
                border-purple-500/20
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-purple-400/40
              "
            >

              <div className="flex items-center justify-between">

                <span className="text-3xl">
                  📡
                </span>

                <span
                  className="
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.25em]
                    text-purple-400
                  "
                >
                  CONNECTED
                </span>

              </div>

              <h3 className="mt-5 text-xl font-black">
                Community Network
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Live gameplay, gaming events, creator
                broadcasts, and community activity.
              </p>

              <div
                className="
                  mt-6
                  border-t
                  border-white/10
                  pt-4
                "
              >

                <p className="text-[9px] font-black uppercase tracking-widest text-slate-600">
                  Network Status
                </p>

                <p className="mt-2 text-sm font-black text-purple-300">
                  COMMUNITY LINK ACTIVE
                </p>

              </div>

            </BrandCard>


            {/* Follow */}

            <BrandCard
              status="CREATOR"
              className="
                border-pink-500/20
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-pink-400/40
              "
            >

              <div className="flex items-center justify-between">

                <span className="text-3xl">
                  💜
                </span>

                <span
                  className="
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.25em]
                    text-pink-400
                  "
                >
                  JOIN
                </span>

              </div>

              <h3 className="mt-5 text-xl font-black">
                Join the Squad
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Follow Veiltactician and become part
                of the PulsePlay player network.
              </p>

              <div className="mt-6">

                <a
                  href="https://www.twitch.tv/Veiltactician"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BrandButton>
                    Follow Transmission →
                  </BrandButton>
                </a>

              </div>

            </BrandCard>

          </div>

        </section>


        {/* =========================================
            BROADCAST QUEUE
        ========================================== */}

        <section className="pb-16">

          <BrandCard
            status="STREAM QUEUE"
            className="
              relative
              overflow-hidden
              border-cyan-500/20
            "
          >

            <div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-56
                w-56
                rounded-full
                bg-cyan-500/5
                blur-3xl
              "
            />

            <div
              className="
                relative
                flex
                flex-col
                gap-8
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >

              <div className="max-w-3xl">

                <p
                  className="
                    text-xs
                    font-black
                    uppercase
                    tracking-[0.4em]
                    text-cyan-400
                  "
                >
                  Broadcast Queue
                </p>

                <h2 className="mt-3 text-3xl font-black md:text-4xl">
                  Upcoming Operations
                </h2>

                <p className="mt-4 leading-7 text-slate-400">
                  Future PulsePlay broadcasts, gaming
                  sessions, community events, and special
                  transmissions will appear here as they
                  are scheduled.
                </p>

              </div>


              <div
                className="
                  min-w-0
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/20
                  p-6
                  lg:min-w-[300px]
                "
              >

                <p
                  className="
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.3em]
                    text-slate-600
                  "
                >
                  Queue Status
                </p>

                <div className="mt-4 flex items-center gap-3">

                  <span
                    className="
                      h-2.5
                      w-2.5
                      rounded-full
                      bg-cyan-400
                      shadow-[0_0_12px_rgba(34,211,238,.7)]
                    "
                  />

                  <span className="text-sm font-black text-cyan-300">
                    STANDBY
                  </span>

                </div>

                <p className="mt-3 text-xs leading-5 text-slate-500">
                  No scheduled operations are being
                  displayed at this time.
                </p>

              </div>

            </div>

          </BrandCard>

        </section>


        {/* =========================================
            NETWORK FOOTER
        ========================================== */}

        <div
          className="
            flex
            flex-col
            gap-3
            border-t
            border-white/10
            pt-6
            text-[9px]
            font-black
            uppercase
            tracking-[0.25em]
            text-slate-600
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <span>
            BROADCAST NETWORK // PLAYER POWERED
          </span>

          <Link
            to="/"
            className="
              text-cyan-500
              transition-colors
              hover:text-cyan-300
            "
          >
            Return To PulsePlay →
          </Link>

        </div>

      </div>

    </main>
  );
}