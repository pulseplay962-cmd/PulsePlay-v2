import TwitchSection from "../components/home/TwitchSection";

export default function Streams() {
  return (
    <section className="bg-[#05070d] text-white">

      <div className="mx-auto max-w-7xl px-6 pt-24 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.4em] text-red-500">
          LIVE CONTENT
        </p>

        <h1 className="mt-4 text-5xl font-black md:text-6xl">
          Watch <span className="text-cyan-400">PulsePlay</span> Live
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
          Join the stream, chat with the community, and watch gameplay live as
          PulsePlay tackles new adventures, competitive matches, and community
          events.
        </p>
      </div>

      <TwitchSection channel="Veiltactician" />

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-8 md:grid-cols-3">

          <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8">
            <h2 className="text-2xl font-bold text-cyan-400">
              🎮 Currently Playing
            </h2>

            <p className="mt-4 text-gray-300">
              Horizon Forbidden West
            </p>
          </div>

          <div className="rounded-3xl border border-purple-500/20 bg-white/5 p-8">
            <h2 className="text-2xl font-bold text-purple-400">
              🔴 Stream Schedule
            </h2>

            <p className="mt-4 text-gray-300">
              New stream times will be posted here.
            </p>
          </div>

          <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8">
            <h2 className="text-2xl font-bold text-cyan-400">
              💜 Follow
            </h2>

            <a
              href="https://www.twitch.tv/Veiltactician"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block rounded-lg bg-purple-600 px-6 py-3 font-bold transition hover:bg-purple-700 hover:shadow-[0_0_20px_#9333ea]"
            >
              Follow on Twitch
            </a>
          </div>

        </div>
      </section>

    </section>
  );
}