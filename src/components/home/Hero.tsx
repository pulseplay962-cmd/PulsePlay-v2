export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-[#05070d] px-6 text-center text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#7c3aed33,transparent_40%)]" />

      <div className="relative z-10 max-w-5xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.4em] text-purple-400">
          Next Level Gaming Experience
        </p>

        <h1 className="text-6xl font-black tracking-tight sm:text-7xl">
          Pulse<span className="text-purple-500">Play</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-300">
          Watch live gaming streams, discover new content, join the community,
          and power up your gaming experience.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="/streams"
            className="rounded-lg bg-purple-600 px-8 py-3 font-bold transition hover:bg-purple-700 hover:shadow-[0_0_25px_#9333ea]"
          >
            🎮 Watch Streams
          </a>

          <a
            href="/store"
            className="rounded-lg border border-purple-500/40 px-8 py-3 font-bold transition hover:bg-purple-500/10 hover:shadow-[0_0_25px_#9333ea]"
          >
            🛒 Visit Store
          </a>
        </div>

        <div className="mt-12 flex justify-center gap-8 text-sm text-gray-400">
          <div>
            <span className="block text-2xl font-bold text-white">LIVE</span>
            Gaming Streams
          </div>

          <div>
            <span className="block text-2xl font-bold text-white">24/7</span>
            Community
          </div>

          <div>
            <span className="block text-2xl font-bold text-white">∞</span>
            Content
          </div>
        </div>
      </div>
    </section>
  );
}