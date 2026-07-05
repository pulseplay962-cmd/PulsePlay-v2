import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#06b6d440,transparent_40%),radial-gradient(circle_at_bottom_right,#7c3aed40,transparent_35%)]" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl items-center px-6">
        <div className="max-w-3xl">

          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            LIVE • GAME • CREATE • CONNECT
          </span>

          <h1 className="mt-8 text-6xl font-black leading-none md:text-8xl">
            LEVEL UP
            <br />
            <span className="text-cyan-400">YOUR GAME</span>
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-8 text-gray-300">
            PulsePlay brings together live streams, gaming gear,
            community events, giveaways, and creator content in one place.
          </p>

          <div className="mt-12 flex flex-wrap gap-5">
            <Link
              to="/streams"
              className="rounded-xl bg-cyan-400 px-8 py-4 font-bold text-black transition hover:scale-105"
            >
              🎮 Watch Live
            </Link>

            <Link
              to="/store"
              className="rounded-xl border border-purple-500 px-8 py-4 font-bold transition hover:bg-purple-500/20"
            >
              🛒 Shop Gear
            </Link>
          </div>

          <div className="mt-16 flex gap-12">
            <div>
              <div className="text-4xl font-black text-cyan-400">500+</div>
              <div className="text-gray-400">Streams</div>
            </div>

            <div>
              <div className="text-4xl font-black text-cyan-400">100+</div>
              <div className="text-gray-400">Community Events</div>
            </div>

            <div>
              <div className="text-4xl font-black text-cyan-400">24/7</div>
              <div className="text-gray-400">Gaming Content</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}