type Game = {
  title: string;
  genre: string;
  status: string;
};

const games: Game[] = [
  {
    title: "Horizon Forbidden West",
    genre: "Action RPG",
    status: "Featured",
  },
  {
    title: "Call of Duty",
    genre: "FPS",
    status: "Trending",
  },
  {
    title: "Fortnite",
    genre: "Battle Royale",
    status: "Popular",
  },
];

export default function FeatureGames() {
  return (
    <section className="bg-[#05070d] px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-5xl font-black">
          Featured <span className="text-cyan-400">Games</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {games.map((game) => (
            <article
              key={game.title}
              className="group overflow-hidden rounded-3xl border border-cyan-500/20 bg-white/5 transition duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-[0_0_30px_#22d3ee55]"
            >
              <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-cyan-500/20 to-purple-600/20">
                <span className="text-5xl">🎮</span>
              </div>

              <div className="p-6">
                <span className="rounded-full border border-cyan-400/30 px-3 py-1 text-xs font-bold text-cyan-300">
                  {game.status}
                </span>

                <h3 className="mt-4 text-2xl font-bold transition group-hover:text-cyan-300">
                  {game.title}
                </h3>

                <p className="mt-2 text-gray-400">
                  {game.genre}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}