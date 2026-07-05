import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-[#05070d] text-white">
      <section className="mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
          🔴 LIVE • STREAM • GAME • REPEAT
        </span>

        <h1 className="mt-8 text-6xl font-black md:text-8xl">
          PULSE<span className="text-cyan-400">PLAY</span>
        </h1>

        <p className="mt-6 max-w-3xl text-xl text-gray-300">
          The home of live gaming streams, creator content, giveaways,
          merchandise, and an awesome gaming community.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-5">
          <Link
            to="/streams"
            className="rounded-xl bg-cyan-400 px-8 py-4 font-bold text-black hover:bg-cyan-300"
          >
            Watch Live
          </Link>

          <Link
            to="/store"
            className="rounded-xl border border-purple-500 px-8 py-4 font-bold hover:bg-purple-500/20"
          >
            Shop Gear
          </Link>
        </div>
      </section>
    </div>
  );
}