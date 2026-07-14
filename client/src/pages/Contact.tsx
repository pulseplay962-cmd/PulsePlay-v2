export default function Contact() {
  return (
    <section className="bg-[#05070d] px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl">

        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.4em] text-cyan-400">
            GET IN TOUCH
          </p>

          <h1 className="mt-4 text-5xl font-black md:text-6xl">
            Let's <span className="text-purple-400">Connect</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            Interested in collaborating, sponsoring a stream, or just saying
            hello? Reach out through one of the platforms below.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">

          <article className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8">
            <h2 className="text-2xl font-bold">🎮 Twitch</h2>

            <p className="mt-4 text-gray-400">
              Catch live streams, chat with the community, and never miss new
              content.
            </p>

            <a
              href="https://www.twitch.tv/Veiltactician"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block rounded-lg bg-cyan-400 px-6 py-3 font-bold text-black transition hover:bg-cyan-300"
            >
              Visit Twitch
            </a>
          </article>

          <article className="rounded-3xl border border-purple-500/20 bg-white/5 p-8">
            <h2 className="text-2xl font-bold">🌐 Website</h2>

            <p className="mt-4 text-gray-400">
              Visit the PulsePlay website for the latest updates and featured
              content.
            </p>

            <a
              href="https://pulseplay-online.wegic.net/"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block rounded-lg bg-purple-600 px-6 py-3 font-bold transition hover:bg-purple-700"
            >
              Visit Website
            </a>
          </article>

          <article className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8">
            <h2 className="text-2xl font-bold">🎁 Support</h2>

            <p className="mt-4 text-gray-400">
              Support future content through the Throne wishlist or Amazon
              recommendations.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="https://throne.com/ve"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-purple-500 px-5 py-3 transition hover:bg-purple-500/10"
              >
                Throne
              </a>

              <a
                href="https://amzn.to/4vmEtDy"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-cyan-500 px-5 py-3 transition hover:bg-cyan-500/10"
              >
                Amazon Picks
              </a>
            </div>
          </article>

          <article className="rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-900/30 to-cyan-900/20 p-8">
            <h2 className="text-2xl font-bold">
              🚀 Collaboration
            </h2>

            <p className="mt-4 text-gray-300">
              Business opportunities, creator collaborations, sponsorships,
              and future partnerships are always welcome as PulsePlay grows.
            </p>
          </article>

        </div>

      </div>
    </section>
  );
}