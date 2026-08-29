export default function Support() {
  return (
    <section className="relative overflow-hidden bg-[#05070d] px-6 pb-32 pt-16 text-white">

      {/* Ambient HUD glow */}
      <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-600/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-10 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        <div className="overflow-hidden rounded-[2rem] border border-cyan-500/20 bg-gradient-to-br from-[#0b1120] via-[#0a0d18] to-purple-950/30 shadow-[0_0_60px_rgba(34,211,238,.08)]">

          {/* HUD header */}
          <div className="flex flex-col gap-4 border-b border-white/10 px-8 py-6 md:flex-row md:items-center md:justify-between md:px-12">

            <div>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400">
                PULSEPLAY NETWORK
              </p>

              <p className="mt-2 text-sm text-slate-500">
                COMMUNITY SUPPORT TERMINAL // ONLINE
              </p>
            </div>

            <div className="inline-flex items-center gap-3 self-start rounded-full border border-green-500/20 bg-green-500/5 px-4 py-2 text-xs font-black uppercase tracking-widest text-green-400 md:self-auto">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400 shadow-[0_0_15px_#22c55e]" />
              SYSTEM ONLINE
            </div>

          </div>


          {/* Main content */}
          <div className="p-8 md:p-12">

            <div className="mx-auto max-w-4xl text-center">

              <p className="mb-4 text-sm font-black uppercase tracking-[0.4em] text-purple-400">
                Join The Community
              </p>

              <h2 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                Support{" "}
                <span className="pp-gradient-text">
                  PulsePlay
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
                Every follow, purchase, and contribution helps improve the
                stream, create better content, and grow the PulsePlay gaming
                community.
              </p>

            </div>


            {/* Support cards */}
            <div className="mt-12 grid gap-5 md:grid-cols-3">

              <a
                href="https://pulseplay-online.wegic.net/"
                target="_blank"
                rel="noreferrer"
                className="
                  group
                  rounded-2xl
                  border
                  border-cyan-500/20
                  bg-cyan-500/5
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-cyan-400/50
                  hover:bg-cyan-500/10
                  hover:shadow-[0_0_30px_rgba(34,211,238,.12)]
                "
              >
                <div className="flex items-center justify-between">

                  <span className="text-3xl">
                    🌐
                  </span>

                  <span className="text-xs font-black uppercase tracking-widest text-cyan-400">
                    ACCESS
                  </span>

                </div>

                <h3 className="mt-5 text-xl font-black">
                  Visit PulsePlay
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Explore the full gaming network, streams, news, games,
                  merchandise, and community features.
                </p>

                <div className="mt-5 font-bold text-cyan-400 transition group-hover:text-cyan-300">
                  Enter Network →
                </div>

              </a>


              <a
                href="https://throne.com/ve"
                target="_blank"
                rel="noreferrer"
                className="
                  group
                  rounded-2xl
                  border
                  border-purple-500/20
                  bg-purple-500/5
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-purple-400/50
                  hover:bg-purple-500/10
                  hover:shadow-[0_0_30px_rgba(147,51,234,.15)]
                "
              >
                <div className="flex items-center justify-between">

                  <span className="text-3xl">
                    🎁
                  </span>

                  <span className="text-xs font-black uppercase tracking-widest text-purple-400">
                    SUPPORT
                  </span>

                </div>

                <h3 className="mt-5 text-xl font-black">
                  Throne Wishlist
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Help upgrade the gaming setup, streaming gear, and future
                  PulsePlay content.
                </p>

                <div className="mt-5 font-bold text-purple-400 transition group-hover:text-purple-300">
                  View Wishlist →
                </div>

              </a>


              <a
                href="https://amzn.to/4vmEtDy"
                target="_blank"
                rel="noreferrer"
                className="
                  group
                  rounded-2xl
                  border
                  border-cyan-500/20
                  bg-cyan-500/5
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-cyan-400/50
                  hover:bg-cyan-500/10
                  hover:shadow-[0_0_30px_rgba(34,211,238,.12)]
                "
              >
                <div className="flex items-center justify-between">

                  <span className="text-3xl">
                    🛒
                  </span>

                  <span className="text-xs font-black uppercase tracking-widest text-cyan-400">
                    GEAR
                  </span>

                </div>

                <h3 className="mt-5 text-xl font-black">
                  Amazon Picks
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Check out gaming gear, accessories, and equipment featured
                  through the PulsePlay network.
                </p>

                <div className="mt-5 font-bold text-cyan-400 transition group-hover:text-cyan-300">
                  Browse Picks →
                </div>

              </a>

            </div>


            {/* Bottom status strip */}
            <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-center text-xs font-bold uppercase tracking-[0.25em] text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">

              <span>
                PLAYER POWERED // COMMUNITY DRIVEN
              </span>

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
