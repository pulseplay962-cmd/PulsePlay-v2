export default function About() {
  return (
    <section className="bg-[#05070d] px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl">

        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.4em] text-purple-400">
            ABOUT PULSEPLAY
          </p>

          <h1 className="mt-4 text-5xl font-black md:text-6xl">
            Gaming. Community. <span className="text-cyan-400">Passion.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            PulsePlay is a gaming community built around live streaming,
            exciting gameplay, and bringing players together. Whether you're
            watching the latest adventure, checking out new gaming gear, or
            hanging out with the community, there's always something happening.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          <article className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8">
            <div className="mb-4 text-5xl">🎮</div>
            <h2 className="text-2xl font-bold">Play</h2>
            <p className="mt-4 text-gray-400">
              Explore new worlds, competitive games, and unforgettable gaming
              moments.
            </p>
          </article>

          <article className="rounded-3xl border border-purple-500/20 bg-white/5 p-8">
            <div className="mb-4 text-5xl">📺</div>
            <h2 className="text-2xl font-bold">Stream</h2>
            <p className="mt-4 text-gray-400">
              Live broadcasts, highlights, and interactive content for every
              member of the community.
            </p>
          </article>

          <article className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8">
            <div className="mb-4 text-5xl">💜</div>
            <h2 className="text-2xl font-bold">Connect</h2>
            <p className="mt-4 text-gray-400">
              Build friendships, support creators, and become part of the
              PulsePlay community.
            </p>
          </article>

        </div>

        <div className="mt-20 rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-900/30 to-cyan-900/20 p-10 text-center">
          <h2 className="text-4xl font-black">
            Level Up Together
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-gray-300">
            PulsePlay is more than a stream—it's a growing community of gamers
            who enjoy sharing great experiences, discovering new games, and
            supporting one another.
          </p>
        </div>

      </div>
    </section>
  );
}