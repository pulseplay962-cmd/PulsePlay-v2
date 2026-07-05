type Game = {
  title: string;
  genre: string;
};

const games: Game[] = [
  { title: "Horizon Forbidden West", genre: "Action RPG" },
  { title: "Call of Duty", genre: "FPS" },
  { title: "Fortnite", genre: "Battle Royale" },
];

export default function FeaturedGames() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="mb-12 text-center text-5xl font-black">
        Featured Games
      </h2>

      <div className="grid gap-8 md:grid-cols-3">
        {games.map((game) => (
          <article
            key={game.title}
            className="overflow-hidden rounded-3xl border border-cyan-500/20 bg-white/5 transition hover:-translate-y-1 hover:border-cyan-400"
          >
            <div className="aspect-video bg-slate-800" />

            <div className="p-6">
              <h3 className="text-2xl font-bold">{game.title}</h3>
              <p className="mt-2 text-gray-400">{game.genre}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}