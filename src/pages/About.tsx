import { Link } from "react-router-dom";

import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";

const systems = [
  {
    icon: "🎮",
    label: "GAME DATABASE",
    title: "Discover the Next Adventure",
    description:
      "Track featured games, upcoming releases, recently launched titles, and the experiences driving the PulsePlay community.",
    to: "/games",
    action: "Explore Games",
    color: "cyan",
  },
  {
    icon: "📡",
    label: "BROADCAST NETWORK",
    title: "Experience Gaming Live",
    description:
      "Watch live gameplay, follow ongoing missions, and connect with the community through PulsePlay broadcasts.",
    to: "/streams",
    action: "Open Broadcasts",
    color: "purple",
  },
  {
    icon: "📰",
    label: "INTELLIGENCE NETWORK",
    title: "Stay Connected",
    description:
      "Follow gaming news, industry developments, announcements, and the latest transmissions from across the gaming world.",
    to: "/news",
    action: "Access Intel",
    color: "pink",
  },
];

const values = [
  {
    number: "01",
    title: "PLAY",
    description:
      "Gaming is at the center of everything. Every world, mission, challenge, and victory starts with the player.",
  },
  {
    number: "02",
    title: "CONNECT",
    description:
      "Great gaming experiences become even better when players, creators, and communities can share them together.",
  },
  {
    number: "03",
    title: "LEVEL UP",
    description:
      "PulsePlay is built around growth — better content, stronger communities, new experiences, and the next adventure.",
  },
];

export default function About() {
  return (
    <main className="min-h-[72vh] px-6 py-12">
      <div className="mx-auto max-w-7xl">

        {/* =====================================
            HERO / ORIGIN TERMINAL
        ====================================== */}

        <section
          className="
            relative
            mb-14
            overflow-hidden
            rounded-[2rem]
            border
            border-cyan-500/20
            bg-gradient-to-br
            from-cyan-950/30
            via-[#060a14]
            to-purple-950/40
            p-8
            shadow-[0_0_90px_rgba(34,211,238,.08)]
            md:p-12
            lg:p-14
          "
        >
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />

          <div className="relative">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">

              <div className="max-w-4xl">

                <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-500/5 px-5 py-2">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400 shadow-[0_0_15px_#22c55e]" />

                  <span className="text-xs font-black uppercase tracking-[0.35em] text-cyan-300">
                    PulsePlay Network Online
                  </span>
                </div>

                <p className="mt-8 text-xs font-black uppercase tracking-[0.45em] text-purple-400">
                  Intelligence Network // System Origin
                </p>

                <h1 className="mt-4 text-5xl font-black leading-[0.9] pp-gradient-text md:text-7xl lg:text-8xl">
                  BUILT FOR
                  <br />
                  THE NEXT
                  <br />
                  LEVEL
                </h1>

                <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
                  PulsePlay is a gaming network built for players, creators,
                  broadcasts, games, and communities — bringing the entire
                  experience together in one place.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link to="/games">
                    <BrandButton>
                      EXPLORE THE NETWORK
                    </BrandButton>
                  </Link>

                  <Link to="/community">
                    <BrandButton variant="secondary">
                      JOIN THE COMMUNITY
                    </BrandButton>
                  </Link>
                </div>

              </div>

              <div className="w-full rounded-2xl border border-green-500/20 bg-black/30 p-6 backdrop-blur-sm lg:max-w-[310px]">

                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    Network Diagnostics
                  </p>

                  <span className="text-[10px] font-black uppercase tracking-widest text-green-400">
                    LIVE
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <span className="h-3 w-3 animate-pulse rounded-full bg-green-400 shadow-[0_0_18px_#22c55e]" />

                  <span className="text-xl font-black text-white">
                    SYSTEM ONLINE
                  </span>
                </div>

                <div className="mt-5 space-y-3 border-t border-white/10 pt-5">

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Game Intelligence
                    </span>
                    <span className="text-xs font-black text-cyan-300">
                      ACTIVE
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Broadcast Network
                    </span>
                    <span className="text-xs font-black text-purple-300">
                      ACTIVE
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Community
                    </span>
                    <span className="text-xs font-black text-green-300">
                      ONLINE
                    </span>
                  </div>

                </div>

              </div>

            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Core Mission
                </p>

                <p className="mt-2 text-xl font-black text-cyan-300">
                  CONNECT PLAYERS
                </p>
              </div>

              <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Network Focus
                </p>

                <p className="mt-2 text-xl font-black text-purple-300">
                  GAMING CULTURE
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Broadcast Mode
                </p>

                <p className="mt-2 text-xl font-black text-cyan-300">
                  LIVE & ACTIVE
                </p>
              </div>

              <div className="rounded-2xl border border-pink-500/20 bg-pink-500/5 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Future State
                </p>

                <p className="mt-2 text-xl font-black text-pink-300">
                  LEVELING UP
                </p>
              </div>

            </div>
          </div>
        </section>


        {/* =====================================
            MISSION + PHILOSOPHY
        ====================================== */}

        <section className="mb-14">

          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-purple-400">
              Core Directive
            </p>

            <h2 className="mt-3 text-4xl font-black pp-gradient-text md:text-5xl">
              Why PulsePlay Exists
            </h2>

            <p className="mt-4 max-w-3xl text-slate-400">
              Two principles drive the network: build a better place to play
              and make sure every kind of player has a place within it.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">

            <BrandCard
              status="MISSION PROTOCOL"
              className="group relative h-full overflow-hidden border-cyan-500/20"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl transition group-hover:bg-cyan-500/20" />

              <div className="relative">

                <div className="flex items-start justify-between gap-6">

                  <div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-xl">
                        🎯
                      </span>

                      <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
                        Primary Objective
                      </p>
                    </div>

                    <h3 className="mt-6 text-3xl font-black text-white md:text-4xl">
                      Build a Better Place to Play
                    </h3>
                  </div>

                  <span className="hidden text-[10px] font-black uppercase tracking-widest text-cyan-400 sm:block">
                    DIRECTIVE 01
                  </span>

                </div>

                <div className="mt-6 h-px bg-gradient-to-r from-cyan-500/30 via-white/10 to-transparent" />

                <p className="mt-6 leading-relaxed text-slate-400">
                  PulsePlay was created to bring together live broadcasts,
                  gaming intelligence, community interaction, and player
                  experiences under one evolving network.
                </p>

                <p className="mt-4 leading-relaxed text-slate-400">
                  The goal is simple: create a place where discovering games,
                  following gaming stories, watching live content, and
                  connecting with other players feels like part of the same
                  experience.
                </p>

                <div className="mt-7 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-cyan-400">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
                  Mission Active
                </div>

              </div>
            </BrandCard>


            <BrandCard
              status="PLAYER PHILOSOPHY"
              className="group relative h-full overflow-hidden border-purple-500/20"
            >
              <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />

              <div className="relative">

                <div className="flex items-start justify-between gap-6">

                  <div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-xl">
                        🎮
                      </span>

                      <p className="text-xs font-black uppercase tracking-[0.35em] text-purple-400">
                        Player First
                      </p>
                    </div>

                    <h3 className="mt-6 text-3xl font-black text-white md:text-4xl">
                      Every Player Has a Story
                    </h3>
                  </div>

                  <span className="hidden text-[10px] font-black uppercase tracking-widest text-purple-400 sm:block">
                    DIRECTIVE 02
                  </span>

                </div>

                <div className="mt-6 h-px bg-gradient-to-r from-purple-500/30 via-white/10 to-transparent" />

                <p className="mt-6 leading-relaxed text-slate-400">
                  Some players compete. Some create. Some explore massive
                  worlds one mission at a time.
                </p>

                <p className="mt-4 leading-relaxed text-slate-400">
                  PulsePlay exists to celebrate all of those experiences and
                  create a network where players can discover, share, and
                  level up together.
                </p>

                <div className="mt-7 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-purple-400">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400 shadow-[0_0_12px_#c084fc]" />
                  Player First
                </div>

              </div>
            </BrandCard>

          </div>

        </section>


        {/* =====================================
            CORE SYSTEMS
        ====================================== */}

        <section className="mb-14">

          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400">
                Network Architecture
              </p>

              <h2 className="mt-3 text-4xl font-black pp-gradient-text md:text-5xl">
                Core Systems
              </h2>

              <p className="mt-4 max-w-3xl text-slate-400">
                The PulsePlay network is built around the experiences that keep
                players connected to the games, broadcasts, stories, and
                communities they care about.
              </p>
            </div>

            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-green-400">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400 shadow-[0_0_15px_#22c55e]" />
              All Systems Active
            </div>

          </div>


          <div className="grid gap-6 lg:grid-cols-3">

            {systems.map((system, index) => (
              <BrandCard
                key={system.label}
                hover
                status={system.label}
                className={`
                  group
                  relative
                  h-full
                  overflow-hidden
                  ${
                    system.color === "purple"
                      ? "border-purple-500/20"
                      : system.color === "pink"
                        ? "border-pink-500/20"
                        : "border-cyan-500/20"
                  }
                `}
              >

                <div
                  className={`
                    pointer-events-none
                    absolute
                    -right-16
                    -top-16
                    h-40
                    w-40
                    rounded-full
                    blur-3xl
                    ${
                      system.color === "purple"
                        ? "bg-purple-500/10 group-hover:bg-purple-500/20"
                        : system.color === "pink"
                          ? "bg-pink-500/10 group-hover:bg-pink-500/20"
                          : "bg-cyan-500/10 group-hover:bg-cyan-500/20"
                    }
                  `}
                />

                <div className="relative">

                  <div className="flex items-center justify-between">

                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
                      SYSTEM {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={`
                        flex
                        items-center
                        gap-2
                        text-[10px]
                        font-black
                        uppercase
                        tracking-widest
                        ${
                          system.color === "purple"
                            ? "text-purple-400"
                            : system.color === "pink"
                              ? "text-pink-400"
                              : "text-cyan-400"
                        }
                      `}
                    >
                      <span
                        className={`
                          h-2
                          w-2
                          animate-pulse
                          rounded-full
                          ${
                            system.color === "purple"
                              ? "bg-purple-400 shadow-[0_0_12px_#c084fc]"
                              : system.color === "pink"
                                ? "bg-pink-400 shadow-[0_0_12px_#f472b6]"
                                : "bg-cyan-400 shadow-[0_0_12px_#22d3ee]"
                          }
                        `}
                      />
                      ACTIVE
                    </span>

                  </div>


                  <div className="mt-7 flex items-center justify-between">

                    <span className="text-5xl transition-transform duration-300 group-hover:scale-110">
                      {system.icon}
                    </span>

                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-600">
                      PULSEPLAY // NODE
                    </span>

                  </div>


                  <h3 className="mt-7 text-2xl font-black text-white md:text-3xl">
                    {system.title}
                  </h3>


                  <p className="mt-4 leading-relaxed text-slate-400">
                    {system.description}
                  </p>


                  <div className="mt-7 border-t border-white/10 pt-5">

                    <Link
                      to={system.to}
                      className={`
                        inline-flex
                        items-center
                        gap-3
                        text-xs
                        font-black
                        uppercase
                        tracking-[0.2em]
                        transition-all
                        group-hover:gap-4
                        ${
                          system.color === "purple"
                            ? "text-purple-400 hover:text-purple-300"
                            : system.color === "pink"
                              ? "text-pink-400 hover:text-pink-300"
                              : "text-cyan-400 hover:text-cyan-300"
                        }
                      `}
                    >
                      {system.action}
                      <span>→</span>
                    </Link>

                  </div>

                </div>

              </BrandCard>
            ))}

          </div>

        </section>


        {/* =====================================
            PLAYER VALUES
        ====================================== */}

        <section className="mb-14">

          <BrandCard
            status="PLAYER PROTOCOL"
            className="overflow-hidden border-purple-500/20 p-0"
          >

            <div className="grid lg:grid-cols-[0.9fr_2.1fr]">

              <div
                className="
                  relative
                  overflow-hidden
                  border-b
                  border-white/10
                  bg-gradient-to-br
                  from-purple-950/30
                  via-white/[0.02]
                  to-cyan-950/20
                  p-8
                  lg:border-b-0
                  lg:border-r
                  lg:p-10
                "
              >

                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />

                <div className="relative">

                  <div className="flex items-center justify-between">

                    <p className="text-xs font-black uppercase tracking-[0.4em] text-purple-400">
                      Network Principles
                    </p>

                    <span className="text-[10px] font-black uppercase tracking-widest text-green-400">
                      ACTIVE
                    </span>

                  </div>

                  <h2 className="mt-5 text-4xl font-black leading-[0.95] pp-gradient-text md:text-5xl">
                    PLAY.
                    <br />
                    CONNECT.
                    <br />
                    LEVEL UP.
                  </h2>

                  <div className="mt-7 h-px bg-gradient-to-r from-purple-500/40 via-cyan-500/20 to-transparent" />

                  <p className="mt-6 leading-relaxed text-slate-400">
                    These principles shape the PulsePlay experience and guide
                    the direction of the network as it continues to grow.
                  </p>

                  <div className="mt-8 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-purple-400">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400 shadow-[0_0_12px_#c084fc]" />
                    Player First Protocol
                  </div>

                </div>

              </div>


              <div className="divide-y divide-white/10">

                {values.map((value, index) => (

                  <div
                    key={value.number}
                    className="
                      group
                      relative
                      grid
                      gap-6
                      overflow-hidden
                      p-7
                      transition-colors
                      hover:bg-white/[0.025]
                      sm:grid-cols-[80px_1fr]
                      sm:items-start
                      md:p-9
                    "
                  >

                    <div className="flex items-center gap-4 sm:block">

                      <span className="text-3xl font-black text-cyan-400/60 transition-colors group-hover:text-cyan-300">
                        {value.number}
                      </span>

                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-600 sm:mt-3 sm:block">
                        PROTOCOL {String(index + 1).padStart(2, "0")}
                      </span>

                    </div>


                    <div>

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                        <h3 className="text-2xl font-black text-white md:text-3xl">
                          {value.title}
                        </h3>

                        <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-400">
                          <span className="h-2 w-2 animate-pulse rounded-full bg-green-400 shadow-[0_0_10px_#22c55e]" />
                          ACTIVE
                        </span>

                      </div>

                      <p className="mt-3 max-w-3xl leading-relaxed text-slate-400">
                        {value.description}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </BrandCard>

        </section>


        {/* =====================================
            FUTURE VISION
        ====================================== */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-cyan-500/20
            bg-gradient-to-br
            from-cyan-950/20
            via-[#060a14]
            to-purple-950/40
            p-8
            text-center
            shadow-[0_0_90px_rgba(34,211,238,.08)]
            md:p-14
          "
        >
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />

          <div className="relative mx-auto max-w-5xl">

            <div className="inline-flex items-center gap-3 rounded-full border border-green-500/20 bg-green-500/5 px-5 py-2">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400 shadow-[0_0_15px_#22c55e]" />

              <span className="text-xs font-black uppercase tracking-[0.35em] text-green-400">
                Future Protocol Active
              </span>
            </div>


            <p className="mt-8 text-xs font-black uppercase tracking-[0.45em] text-pink-400">
              Intelligence Network // Next Phase
            </p>


            <h2 className="mt-4 text-5xl font-black leading-[0.9] pp-gradient-text md:text-7xl">
              THE NEXT
              <br />
              LEVEL STARTS
              <br />
              HERE
            </h2>


            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              PulsePlay is growing beyond a website into an evolving gaming
              network built around games, broadcasts, intelligence,
              merchandise, creators, and community.
            </p>


            <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">

              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10 text-lg">
                  🎮
                </span>

                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                  Game Network
                </p>

                <p className="mt-2 text-sm font-black text-cyan-300">
                  EXPANDING
                </p>
              </div>


              <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5">
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-500/10 text-lg">
                  📡
                </span>

                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                  Creator Network
                </p>

                <p className="mt-2 text-sm font-black text-purple-300">
                  ACTIVATING
                </p>
              </div>


              <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5">
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-green-400/20 bg-green-500/10 text-lg">
                  🌐
                </span>

                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                  Community
                </p>

                <p className="mt-2 text-sm font-black text-green-300">
                  LEVELING UP
                </p>
              </div>

            </div>


            <p className="mx-auto mt-8 max-w-3xl leading-relaxed text-slate-400">
              The network will continue to grow, evolve, and level up — one
              game, one broadcast, one player, and one new adventure at a
              time.
            </p>


            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

              <Link to="/community">
                <BrandButton>
                  JOIN THE NETWORK
                </BrandButton>
              </Link>

              <Link to="/contact">
                <BrandButton variant="secondary">
                  CONTACT PULSEPLAY
                </BrandButton>
              </Link>

            </div>


            <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-600 sm:flex-row sm:items-center sm:justify-between">

              <span>
                PLAYER POWERED // COMMUNITY DRIVEN
              </span>

              <span className="flex items-center justify-center gap-2 text-cyan-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                PULSEPLAY NETWORK ONLINE
              </span>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}
