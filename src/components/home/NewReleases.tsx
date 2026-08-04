import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BrandCard from "../ui/BrandCard";
import BrandButton from "../ui/BrandButton";

import { getGames } from "../../services/games";

type Game = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  genre?: string;
  release_date?: string;
};

export default function NewReleases() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGames();
  }, []);

  async function loadGames() {
    try {
      const data = await getGames();
      const now = new Date();
      const windowStart = new Date(now);
      windowStart.setDate(now.getDate() - 60);
      const windowEnd = new Date(now);
      windowEnd.setDate(now.getDate() + 90);

      const releaseGames = (data || [])
        .filter((game: any) => game.release_date)
        .map((game: any) => ({
          ...game,
          release_date: game.release_date,
        }))
        .filter((game: any) => {
          const date = new Date(game.release_date);
          return date >= windowStart && date <= windowEnd;
        })
        .sort((a: any, b: any) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
        )
        .slice(0, 6);

      setGames(releaseGames);
    } catch (error) {
      console.error("Failed to load new releases:", error);
      setGames([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-20">
      <div className="mb-10">
        <h2 className="text-3xl md:text-5xl font-black pp-gradient-text">
          New Releases
        </h2>

        <p className="mt-3 text-slate-400 max-w-2xl">
          Check out the latest PulsePlay game releases and upcoming launches.
        </p>
      </div>

      {loading ? (
        <div className="text-center text-slate-400 py-10">
          Loading new releases...
        </div>
      ) : games.length === 0 ? (
        <BrandCard>
          <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
            <span className="text-4xl">🎮</span>
            <div>
              <h3 className="text-2xl font-bold text-white">No new releases yet</h3>
              <p className="mt-2 text-slate-400">
                Add upcoming or recently released games through the admin dashboard.
              </p>
            </div>
            <Link to="/games">
              <BrandButton>Browse All Games</BrandButton>
            </Link>
          </div>
        </BrandCard>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => {
            const isUpcoming =
              game.release_date && new Date(game.release_date) > new Date();
            return (
              <BrandCard key={game.id} className="card-hover">
                {game.image ? (
                  <img
                    src={game.image}
                    alt={game.title}
                    className="h-64 w-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="h-64 rounded-xl flex items-center justify-center bg-black/40 text-slate-500">
                    No Image
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-2">
                  {game.genre && (
                    <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-sm text-cyan-300">
                      {game.genre}
                    </span>
                  )}
                  {game.release_date && (
                    <span className={`rounded-full px-3 py-1 text-sm font-bold ${
                      isUpcoming
                        ? "bg-blue-500/20 text-blue-200"
                        : "bg-green-500/20 text-green-200"
                    }`}>
                      {isUpcoming ? "Coming Soon" : "Released"}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-2xl font-black text-white">{game.title}</h3>

                {game.description && (
                  <p className="mt-3 text-slate-400 line-clamp-3">
                    {game.description}
                  </p>
                )}

                {game.release_date && (
                  <p className="mt-4 text-sm uppercase tracking-widest text-slate-500">
                    Release: {new Date(game.release_date).toLocaleDateString()}
                  </p>
                )}

                <div className="mt-6">
                  <Link to={`/games#${game.id}`}>
                    <BrandButton>View Game</BrandButton>
                  </Link>
                </div>
              </BrandCard>
            );
          })}
        </div>
      )}
    </section>
  );
}
