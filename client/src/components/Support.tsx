export default function Support() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-32">

      <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-900/30 to-cyan-900/20 p-12 text-center">

        <h2 className="text-5xl font-black">
          Support PulsePlay
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-gray-300">
          Every purchase and contribution helps improve the stream,
          create better content, and grow the PulsePlay community.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-5">

          <a
            href="https://pulseplay-online.wegic.net/"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-cyan-400 px-8 py-4 font-bold text-black"
          >
            🌐 Website
          </a>

          <a
            href="https://throne.com/ve"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-purple-500 px-8 py-4"
          >
            🎁 Throne Wishlist
          </a>

          <a
            href="https://amzn.to/4vmEtDy"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-cyan-500 px-8 py-4"
          >
            🛒 Amazon Picks
          </a>

        </div>

      </div>

    </section>
  );
}