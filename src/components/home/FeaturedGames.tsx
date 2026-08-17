import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BrandCard from "../ui/BrandCard";
import BrandButton from "../ui/BrandButton";

import {
  getGames,
  type Game,
} from "../../services/games";

export default function FeaturedGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadGames() {
    try {
      setLoading(true);

      const data = await getGames();

      const featuredGames = (data || [])
        .filter((game) => game.featured)
        .sort((a, b) => {
          const aDate = a.release_date
            ? new Date(a.release_date).getTime()
            : 0;

          const bDate = b.release_date
            ? new Date(b.release_date).getTime()
            : 0;

          return aDate - bDate;
        })
        .slice(0, 6);

      setGames(featuredGames);
    } catch (error) {
      console.error(
        "Failed to load featured games:",
        error
      );

      setGames([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGames();
  }, []);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-4xl font-black pp-gradient-text">
          Featured Games
        </h2>

        <p className="mt-4 text-slate-400">
          Loading featured games...
        </p>
      </section>
    );
  }

  return (
    <section
      className="
        mx-auto
        max-w-7xl
        px-6
        py-16
      "
    >
      {/* =========================
          HEADER
      ========================= */}

      <div
        className="
          flex
          flex-col
          justify-between
          gap-6
          md:flex-row
          md:items-center
        "
      >
        <div>
          <h2
            className="
              text-4xl
              font-black
              pp-gradient-text
            "
          >
            Featured Games
          </h2>

          <p
            className="
              mt-3
              text-slate-400
            "
          >
            Discover the latest adventures,
            releases, and games worth playing.
          </p>
        </div>

        <Link to="/games">
          <BrandButton>
            Browse Games
          </BrandButton>
        </Link>
      </div>

      {/* =========================
          EMPTY STATE
      ========================= */}

      {games.length === 0 && (
        <BrandCard className="mt-10">
          <h3 className="text-xl font-bold text-white">
            No Featured Games
          </h3>

          <p className="mt-2 text-slate-400">
            Featured games will appear here when
            they are added through the PulsePlay
            Admin Dashboard.
          </p>
        </BrandCard>
      )}

      {/* =========================
          FEATURED GAMES
      ========================= */}

      {games.length > 0 && (
        <div
          className="
            mt-10
            grid
            gap-8
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {games.map((game) => (
            <BrandCard
              key={game.id}
              className="card-hover"
            >
              {/* IMAGE */}

              {game.image ? (
                <img
                  src={game.image}
                  alt={game.title}
                  className="
                    h-64
                    w-full
                    rounded-xl
                    object-cover
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-64
                    items-center
                    justify-center
                    rounded-xl
                    bg-black/40
                    text-slate-500
                  "
                >
                  No Image
                </div>
              )}

              {/* CATEGORY / GENRE */}

              <div className="mt-5 flex flex-wrap gap-2">
                {game.category && (
                  <span
                    className="
                      rounded-full
                      border
                      border-cyan-500/30
                      bg-cyan-500/10
                      px-3
                      py-1
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-cyan-300
                    "
                  >
                    {game.category}
                  </span>
                )}

                {game.genre && (
                  <span
                    className="
                      rounded-full
                      border
                      border-purple-500/30
                      bg-purple-500/10
                      px-3
                      py-1
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-purple-300
                    "
                  >
                    {game.genre}
                  </span>
                )}
              </div>

              {/* TITLE */}

              <h3
                className="
                  mt-4
                  text-2xl
                  font-bold
                  text-white
                "
              >
                {game.title}
              </h3>

              {/* DESCRIPTION */}

              {game.description && (
                <p
                  className="
                    mt-3
                    line-clamp-3
                    text-slate-400
                  "
                >
                  {game.description}
                </p>
              )}

              {/* PLATFORM */}

              {game.platform && (
                <p
                  className="
                    mt-4
                    text-sm
                    font-bold
                    text-slate-400
                  "
                >
                  Platform:{" "}
                  <span className="text-white">
                    {game.platform}
                  </span>
                </p>
              )}

              {/* RELEASE DATE */}

              {game.release_date && (
                <p
                  className="
                    mt-2
                    text-xs
                    uppercase
                    tracking-widest
                    text-slate-500
                  "
                >
                  Release Date:{" "}
                  {new Date(
                    game.release_date
                  ).toLocaleDateString()}
                </p>
              )}

              {/* STATUS */}

              {game.status && (
                <p
                  className={`
                    mt-3
                    text-xs
                    font-black
                    uppercase
                    tracking-widest
                    ${
                      game.status === "upcoming"
                        ? "text-blue-400"
                        : game.status === "released"
                          ? "text-green-400"
                          : "text-slate-500"
                    }
                  `}
                >
                  {game.status}
                </p>
              )}

              {/* VIEW GAME */}

              <div className="mt-6">
                <Link
                  to={`/games/${game.id}`}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-cyan-500/30
                    bg-slate-900/80
                    px-6
                    py-3
                    font-black
                    uppercase
                    tracking-wider
                    text-cyan-300
                    shadow-[0_0_20px_rgba(34,211,238,.2)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-cyan-500/10
                    active:scale-95
                  "
                >
                  View Game
                </Link>
              </div>
            </BrandCard>
          ))}
        </div>
      )}
    </section>
  );
}