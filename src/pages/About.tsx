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
            border-purple-500/20
            bg-gradient-to-br
            from-purple-950/50
            via-[#070b16]
            to-cyan-950/30
            p-8
            shadow-[0_0_70px_rgba(147,51,234,.10)]
            md:p-12
          "
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-3 rounded-full border border-purple-400/20 bg-purple-500/5 px-5 py-2">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-purple-400 shadow-[0_0_15px_#c084fc]" />

                  <span className="text-xs font-black uppercase tracking-[0.35em] text-purple-300">
                    System Origin Found
                  </span>
                </div>

                <p className="mt-8 text-xs font-black uppercase tracking-[0.45em] text-cyan-400">
                  PulsePlay Intelligence Network
                </p>

                <h1 className="mt-4 text-5xl font-black leading-none pp-gradient-text md:text-7xl">
                  PULSEPLAY
                  <br />
                  ORIGIN
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                  A gaming network created for players, creators, and
                  communities who believe every adventure is better when
                  the experience is shared.
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-500/20 bg-black/20 p-5 backdrop-blur-sm lg:min-w-[280px]">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Network Status
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <span className="h-3 w-3 animate-pulse rounded-full bg-green-400 shadow-[0_0_15px_#22c55e]" />

                  <span className="text-lg font-black text-white">
                    COMMUNITY ONLINE
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  Building the next level of the PulsePlay gaming network.
                </p>
              </div>

            </div>

            {/* HERO STATS */}

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
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

        <section className="mb-14 grid gap-6 lg:grid-cols-2">

          <BrandCard
            status="MISSION PROTOCOL"
            className="h-full border-cyan-500/20"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
                  Primary Objective
                </p>

                <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">
                  Build a Better Place to Play
                </h2>

                <p className="mt-5 leading-relaxed text-slate-400">
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
              </div>

              <span className="text-4xl">🎯</span>
            </div>
          </BrandCard>


          <BrandCard
            status="PLAYER PHILOSOPHY"
            className="h-full border-purple-500/20"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-purple-400">
                  Player First
                </p>

                <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">
                  Every Player Has a Story
                </h2>

                <p className="mt-5 leading-relaxed text-slate-400">
                  Some players compete. Some create. Some explore massive
                  worlds one mission at a time.
                </p>

                <p className="mt-4 leading-relaxed text-slate-400">
                  PulsePlay exists to celebrate all of those experiences and
                  create a network where players can discover, share, and
                  level up together.
                </p>
              </div>

              <span className="text-4xl">🎮</span>
            </div>
          </BrandCard>

        </section>


        {/* =====================================
            CORE SYSTEMS
        ====================================== */}

        <section className="mb-14">

          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400">
              Network Architecture
            </p>

            <h2 className="mt-3 text-4xl font-black pp-gradient-text md:text-5xl">
              Core Systems
            </h2>

            <p className="mt-4 max-w-3xl text-slate-400">
              The PulsePlay network is built around the experiences that keep
              players connected to the games and communities they care about.
            </p>
          </div>


          <div className="grid gap-6 lg:grid-cols-3">

            {systems.map((system) => (
              <BrandCard
                key={system.label}
                hover
                status={system.label}
                className="group h-full"
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl">
                    {system.icon}
                  </span>

                  <span
                    className={`
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
                    SYSTEM ACTIVE
                  </span>
                </div>

                <h3 className="mt-7 text-2xl font-black text-white">
                  {system.title}
                </h3>

                <p className="mt-4 leading-relaxed text-slate-400">
                  {system.description}
                </p>

                <Link
                  to={system.to}
                  className="
                    mt-7
                    inline-flex
                    items-center
                    gap-2
                    text-xs
                    font-black
                    uppercase
                    tracking-widest
                    text-cyan-400
                    transition
                    hover:text-cyan-300
                  "
                >
                  {system.action}

                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
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
            className="overflow-hidden border-white/10 p-0"
          >
            <div className="grid lg:grid-cols-[1fr_2fr]">

              <div className="border-b border-white/10 bg-white/[0.02] p-8 lg:border-b-0 lg:border-r lg:p-10">
                <p className="text-xs font-black uppercase tracking-[0.4em] text-purple-400">
                  Network Principles
                </p>

                <h2 className="mt-4 text-4xl font-black pp-gradient-text">
                  PLAY.
                  <br />
                  CONNECT.
                  <br />
                  LEVEL UP.
                </h2>

                <p className="mt-6 leading-relaxed text-slate-400">
                  These principles shape the PulsePlay experience and the
                  direction of the network as it continues to grow.
                </p>
              </div>


              <div className="divide-y divide-white/10">

                {values.map((value) => (
                  <div
                    key={value.number}
                    className="
                      grid
                      gap-5
                      p-7
                      sm:grid-cols-[80px_1fr]
                      sm:items-start
                      md:p-9
                    "
                  >
                    <span className="text-3xl font-black text-cyan-400/70">
                      {value.number}
                    </span>

                    <div>
                      <h3 className="text-2xl font-black text-white">
                        {value.title}
                      </h3>

                      <p className="mt-3 leading-relaxed text-slate-400">
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
            from-[#07131d]
            via-[#080b14]
            to-purple-950/30
            p-8
            text-center
            shadow-[0_0_60px_rgba(34,211,238,.07)]
            md:p-14
          "
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl" />

          <div className="relative mx-auto max-w-4xl">

            <div className="inline-flex items-center gap-3 rounded-full border border-green-500/20 bg-green-500/5 px-5 py-2">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400" />

              <span className="text-xs font-black uppercase tracking-[0.35em] text-green-400">
                Future Protocol Active
              </span>
            </div>

            <p className="mt-8 text-xs font-black uppercase tracking-[0.45em] text-pink-400">
              The Next Level
            </p>

            <h2 className="mt-4 text-4xl font-black pp-gradient-text md:text-6xl">
              The Future of PulsePlay
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              PulsePlay is becoming more than a website. The vision is an
              evolving gaming network built around games, live content,
              intelligence, merchandise, creators, and communities.
            </p>

            <p className="mx-auto mt-5 max-w-3xl leading-relaxed text-slate-400">
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

              <span className="text-cyan-400">
                PULSEPLAY NETWORK ONLINE
              </span>

            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
