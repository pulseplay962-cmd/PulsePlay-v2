import { Link } from "react-router-dom";

import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";

const channels = [
  {
    icon: "🎮",
    label: "PLAYER SUPPORT",
    title: "Need Help With PulsePlay?",
    description:
      "Explore the PulsePlay network, follow broadcasts, discover games, and connect with the growing gaming community.",
    action: "JOIN THE NETWORK",
    to: "/community",
    accent: "cyan",
  },
  {
    icon: "🤝",
    label: "PARTNERSHIPS",
    title: "Let's Build Something",
    description:
      "Interested in collaborations, creator opportunities, partnerships, or working with the PulsePlay gaming network?",
    action: "OPEN CONTACT CHANNEL",
    to: "mailto:pulseplay962@gmail.com",
    accent: "purple",
  },
  {
    icon: "💡",
    label: "PLAYER FEEDBACK",
    title: "Help Shape the Network",
    description:
      "Have an idea, suggestion, or feedback that could make PulsePlay better? The network is built to evolve.",
    action: "SEND FEEDBACK",
    to: "/feedback",
    accent: "pink",
  },
];

const statuses = [
  {
    label: "Community Network",
    status: "ONLINE",
    color: "green",
  },
  {
    label: "Creator Support",
    status: "ACTIVE",
    color: "purple",
  },
  {
    label: "New Connections",
    status: "READY",
    color: "cyan",
  },
];

export default function Contact() {
  return (
    <main className="min-h-[72vh] px-6 py-12">
      <div className="mx-auto max-w-7xl">

        {/* =====================================
            COMMAND HEADER
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
            via-[#070b16]
            to-purple-950/30
            p-8
            shadow-[0_0_70px_rgba(34,211,238,.08)]
            md:p-12
          "
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="relative">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

              <div className="max-w-4xl">

                <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-500/5 px-5 py-2">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400 shadow-[0_0_15px_#22c55e]" />

                  <span className="text-xs font-black uppercase tracking-[0.35em] text-cyan-300">
                    Support Terminal Online
                  </span>
                </div>

                <p className="mt-8 text-xs font-black uppercase tracking-[0.45em] text-purple-400">
                  PulsePlay Communication Network
                </p>

                <h1 className="mt-4 text-5xl font-black leading-none pp-gradient-text md:text-7xl">
                  COMMAND
                  <br />
                  SUPPORT
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                  Need assistance, want to collaborate, or have feedback for
                  the PulsePlay network? Choose a communication channel and
                  transmit your message.
                </p>

              </div>


              <div className="rounded-2xl border border-green-500/20 bg-black/20 p-5 backdrop-blur-sm lg:min-w-[280px]">

                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Terminal Status
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <span className="h-3 w-3 animate-pulse rounded-full bg-green-400 shadow-[0_0_15px_#22c55e]" />

                  <span className="text-lg font-black text-white">
                    CHANNELS OPEN
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  The PulsePlay communication network is ready for new
                  transmissions.
                </p>

              </div>

            </div>


            {/* QUICK STATUS */}

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Primary Channel
                </p>

                <p className="mt-2 text-lg font-black text-cyan-300">
                  SUPPORT
                </p>
              </div>


              <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Collaboration
                </p>

                <p className="mt-2 text-lg font-black text-purple-300">
                  AVAILABLE
                </p>
              </div>


              <div className="rounded-2xl border border-pink-500/20 bg-pink-500/5 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Feedback
                </p>

                <p className="mt-2 text-lg font-black text-pink-300">
                  ACCEPTING
                </p>
              </div>


              <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Network
                </p>

                <p className="mt-2 text-lg font-black text-green-300">
                  ONLINE
                </p>
              </div>

            </div>

          </div>
        </section>


        {/* =====================================
            COMMUNICATION CHANNELS
        ====================================== */}

        <section className="mb-14">

          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400">
              Communication Protocol
            </p>

            <h2 className="mt-3 text-4xl font-black pp-gradient-text md:text-5xl">
              Choose Your Channel
            </h2>

            <p className="mt-4 max-w-3xl text-slate-400">
              Select the connection point that best matches what you want to
              discuss with the PulsePlay network.
            </p>
          </div>


          <div className="grid gap-6 lg:grid-cols-3">

            {channels.map((channel) => (
              <BrandCard
                key={channel.label}
                hover
                status={channel.label}
                className="group flex h-full flex-col"
              >

                <div className="flex items-center justify-between">

                  <span className="text-4xl">
                    {channel.icon}
                  </span>

                  <span
                    className={`
                      text-[10px]
                      font-black
                      uppercase
                      tracking-widest
                      ${
                        channel.accent === "purple"
                          ? "text-purple-400"
                          : channel.accent === "pink"
                            ? "text-pink-400"
                            : "text-cyan-400"
                      }
                    `}
                  >
                    CHANNEL OPEN
                  </span>

                </div>


                <h3 className="mt-7 text-2xl font-black text-white">
                  {channel.title}
                </h3>


                <p className="mt-4 flex-1 leading-relaxed text-slate-400">
                  {channel.description}
                </p>


                {channel.to.startsWith("mailto:") ? (
                  <a
                    href={channel.to}
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
                    {channel.action}

                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                ) : (
                  <Link
                    to={channel.to}
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
                    {channel.action}

                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                )}

              </BrandCard>
            ))}

          </div>

        </section>


        {/* =====================================
            DIRECT CONTACT TERMINAL
        ====================================== */}

        <section className="mb-14">

          <BrandCard
            status="DIRECT COMMUNICATION"
            className="overflow-hidden border-cyan-500/20 p-0"
          >

            <div className="grid lg:grid-cols-[1fr_1.2fr]">

              <div className="border-b border-white/10 bg-white/[0.02] p-8 lg:border-b-0 lg:border-r lg:p-10">

                <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400">
                  Contact Channel
                </p>

                <h2 className="mt-4 text-4xl font-black pp-gradient-text">
                  Transmit
                  <br />
                  Directly
                </h2>

                <p className="mt-6 leading-relaxed text-slate-400">
                  For direct questions, partnerships, creator opportunities,
                  or support requests, use the primary PulsePlay contact
                  channel.
                </p>

              </div>


              <div className="space-y-5 p-8 md:p-10">

                <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">

                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    Primary Communication
                  </p>

                  <a
                    href="mailto:pulseplay962@gmail.com"
                    className="
                      mt-3
                      block
                      break-all
                      text-xl
                      font-black
                      text-cyan-300
                      transition
                      hover:text-cyan-200
                      md:text-2xl
                    "
                  >
                    pulseplay962@gmail.com
                  </a>

                  <p className="mt-3 text-sm text-slate-400">
                    Support, collaboration, questions, and general
                    PulsePlay communication.
                  </p>

                </div>


                <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6">

                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    Social Network
                  </p>

                  <p className="mt-3 text-xl font-black text-purple-300">
                    @PulsePlay
                  </p>

                  <p className="mt-3 text-sm text-slate-400">
                    Follow the PulsePlay network for broadcasts, gaming
                    content, updates, and community activity.
                  </p>

                </div>

              </div>

            </div>

          </BrandCard>

        </section>


        {/* =====================================
            SYSTEM STATUS
        ====================================== */}

        <section className="mb-14">

          <div className="mb-8 text-center">

            <p className="text-xs font-black uppercase tracking-[0.4em] text-green-400">
              Network Diagnostics
            </p>

            <h2 className="mt-3 text-4xl font-black pp-gradient-text md:text-5xl">
              System Status
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Current communication and community network status.
            </p>

          </div>


          <div className="grid gap-5 md:grid-cols-3">

            {statuses.map((item) => (
              <BrandCard
                key={item.label}
                status="SYSTEM STATUS"
                className="text-center"
              >

                <div className="flex justify-center">
                  <span
                    className={`
                      h-3
                      w-3
                      animate-pulse
                      rounded-full
                      ${
                        item.color === "purple"
                          ? "bg-purple-400 shadow-[0_0_15px_#c084fc]"
                          : item.color === "cyan"
                            ? "bg-cyan-400 shadow-[0_0_15px_#22d3ee]"
                            : "bg-green-400 shadow-[0_0_15px_#22c55e]"
                      }
                    `}
                  />
                </div>


                <h3
                  className={`
                    mt-5
                    text-2xl
                    font-black
                    ${
                      item.color === "purple"
                        ? "text-purple-300"
                        : item.color === "cyan"
                          ? "text-cyan-300"
                          : "text-green-300"
                    }
                  `}
                >
                  {item.status}
                </h3>


                <p className="mt-2 text-slate-400">
                  {item.label}
                </p>

              </BrandCard>
            ))}

          </div>

        </section>


        {/* =====================================
            FINAL CTA
        ====================================== */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-purple-500/20
            bg-gradient-to-br
            from-purple-950/30
            via-[#080b14]
            to-cyan-950/20
            p-8
            text-center
            shadow-[0_0_60px_rgba(147,51,234,.08)]
            md:p-14
          "
        >

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl" />

          <div className="relative mx-auto max-w-4xl">

            <div className="inline-flex items-center gap-3 rounded-full border border-green-500/20 bg-green-500/5 px-5 py-2">

              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400" />

              <span className="text-xs font-black uppercase tracking-[0.35em] text-green-400">
                Connection Ready
              </span>

            </div>


            <h2 className="mt-8 text-4xl font-black pp-gradient-text md:text-6xl">
              READY TO
              <br />
              LEVEL UP?
            </h2>


            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Join the PulsePlay network and become part of a growing gaming
              universe built around games, broadcasts, creators, and
              community.
            </p>


            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

              <Link to="/community">
                <BrandButton>
                  JOIN THE NETWORK
                </BrandButton>
              </Link>

              <Link to="/games">
                <BrandButton variant="secondary">
                  EXPLORE GAMES
                </BrandButton>
              </Link>

            </div>


            <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-600 sm:flex-row sm:items-center sm:justify-between">

              <span>
                COMMUNICATION NETWORK // ACTIVE
              </span>

              <span className="text-cyan-400">
                PULSEPLAY SUPPORT ONLINE
              </span>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}
