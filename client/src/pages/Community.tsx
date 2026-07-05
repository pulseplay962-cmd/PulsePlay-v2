export default function Community() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 text-white">
      <h1 className="text-5xl font-black">
        Community
      </h1>

      <p className="mt-4 text-gray-400">
        Connect with gamers, join giveaways, and become part of PulsePlay.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-3">

        <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8">
          <h2 className="text-2xl font-bold">Discord</h2>
          <p className="mt-3 text-gray-400">
            Chat with the community and stay updated.
          </p>
        </div>

        <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8">
          <h2 className="text-2xl font-bold">Giveaways</h2>
          <p className="mt-3 text-gray-400">
            Win games, accessories, and PulsePlay merch.
          </p>
        </div>

        <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8">
          <h2 className="text-2xl font-bold">Events</h2>
          <p className="mt-3 text-gray-400">
            Participate in tournaments and community nights.
          </p>
        </div>

      </div>
    </div>
  );
}