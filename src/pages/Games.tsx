import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";

import {
  getGames,
  type Game,
} from "../services/games";

export default function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGames() {
      try {
        setLoading(true);

        const data = await getGames();

        console.log("GAMES PAGE DATA:", data);

        setGames(data || []);
      } catch (error) {
        console.error("FAILED TO LOAD GAMES:", error);
        setGames([]);
      } finally {
        setLoading(false);
      }
    }

    loadGames();
  }, []);

  const now = new Date();

  const upcomingGames = games
    .filter(
      (game) =>
        game.release_date &&
        new Date(game.release_date) > now
    )
    .sort(
      (a, b) =>
        new Date(a.release_date || "").getTime() -
        new Date(b.release_date || "").getTime()
    )
    .slice(0, 3);

  const releasedGames = games
    .filter(
      (game) =>
        game.release_date &&
        new Date(game.release_date) <= now
    )
    .sort(
      (a, b) =>
        new Date(b.release_date || "").getTime() -
        new Date(a.release_date || "").getTime()
    )
    .slice(0, 3);

  if (loading) {
    return (
      <main>
        <BrandCard>
          <div className="flex items-center gap-3">
            <span className="pp-live-dot" />

            <p className="text-slate-400">
              Loading games...
            </p>
          </div>
        </BrandCard>
      </main>
    );
  }

  return (
    <main>
      {/* =========================
          PAGE HEADER
      ========================= */}

      <section className="mb-16 text-center">
        <h1
          className="
            text-5xl
            font-black
            pp-gradient-text
            md:text-6xl
          "
        >
          Game Library
        </h1>

        <p
          className="
            mx-auto
            mt-5
            max-w-3xl
            text-lg
            text-slate-400
          "
        >
          Explore featured games, upcoming releases,
          and the titles powering the PulsePlay community.
        </p>
      </section>

      {/* =========================
          EMPTY STATE
      ========================= */}

      {games.length === 0 && (
        <BrandCard>
          <h2
            className="
              text-2xl
              font-bold
              text-white
            "
          >
            No Games Available
          </h2>

          <p className="mt-3 text-slate-400">
            Add games through the PulsePlay Admin Dashboard.
          </p>
        </BrandCard>
      )}

      {/* =========================
          GAME CONTENT
      ========================= */}

      {games.length > 0 && (
        <>
          {/* =========================
              UPCOMING RELEASES
          ========================= */}

          {upcomingGames.length > 0 && (
            <section className="mb-12">
              <div
                className="
                  mb-8
                  flex
                  flex-col
                  gap-4
                  md:flex-row
                  md:items-end
                  md:justify-between
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
                    Upcoming Releases
                  </h2>

                  <p
                    className="
                      mt-3
                      max-w-3xl
                      text-slate-400
                    "
                  >
                    Keep an eye on the newest games
                    heading to PulsePlay.
                  </p>
                </div>

                <BrandButton
                  variant="secondary"
                  type="button"
                >
                  <span className="font-bold">
                    Upcoming
                  </span>
                </BrandButton>
              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-8
                  md:grid-cols-2
                  lg:grid-cols-3
                "
              >
                {upcomingGames.map((game) => (
                  <BrandCard
                    key={game.id}
                    className="card-hover"
                  >
                    {/* Cover */}
                    {game.image ? (
                      <img
                        src={game.image}
                        alt={game.title}
                        className="
                          h-56
                          w-full
                          rounded-xl
                          object-cover
                        "
                      />
                    ) : (
                      <div
                        className="
                          flex
                          h-56
                          items-center
                          justify-center
                          rounded-xl
                          bg-black/40
                          text-slate-500
                        "
                      >
                        No Cover Image
                      </div>
                    )}

                    {/* Tags */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {game.genre && (
                        <span
                          className="
                            inline-flex
                            rounded-full
                            border
                            border-purple-500/30
                            bg-purple-500/10
                            px-3
                            py-1
                            text-sm
                            font-bold
                            text-purple-300
                          "
                        >
                          {game.genre}
                        </span>
                      )}

                      <span
                        className="
                          inline-flex
                          rounded-full
                          bg-blue-500/20
                          px-3
                          py-1
                          text-sm
                          font-bold
                          text-blue-200
                        "
                      >
                        Coming Soon
                      </span>
                    </div>

                    {/* Title */}
                    <h2
                      className="
                        mt-5
                        text-2xl
                        font-black
                        text-white
                      "
                    >
                      {game.title}
                    </h2>

                    {/* Description */}
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

                    {/* Release Date */}
                    {game.release_date && (
                      <p
                        className="
                          mt-4
                          text-sm
                          font-bold
                          text-cyan-400
                        "
                      >
                        Release: {game.release_date}
                      </p>
                    )}

                    {/* View Game */}
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
                          px-7
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
            </section>
          )}

          {/* =========================
              RECENT RELEASES
          ========================= */}

          {releasedGames.length > 0 && (
            <section className="mb-12">
              <div
                className="
                  mb-8
                  flex
                  flex-col
                  gap-4
                  md:flex-row
                  md:items-end
                  md:justify-between
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
                    Recent Releases
                  </h2>

                  <p
                    className="
                      mt-3
                      max-w-3xl
                      text-slate-400
                    "
                  >
                    Browse the games that just launched
                    on PulsePlay.
                  </p>
                </div>

                <BrandButton
                  variant="secondary"
                  type="button"
                >
                  <span className="font-bold">
                    Released
                  </span>
                </BrandButton>
              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-8
                  md:grid-cols-2
                  lg:grid-cols-3
                "
              >
                {releasedGames.map((game) => (
                  <BrandCard
                    key={game.id}
                    className="card-hover"
                  >
                    {/* Cover */}
                    {game.image ? (
                      <img
                        src={game.image}
                        alt={game.title}
                        className="
                          h-56
                          w-full
                          rounded-xl
                          object-cover
                        "
                      />
                    ) : (
                      <div
                        className="
                          flex
                          h-56
                          items-center
                          justify-center
                          rounded-xl
                          bg-black/40
                          text-slate-500
                        "
                      >
                        No Cover Image
                      </div>
                    )}

                    {/* Tags */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {game.genre && (
                        <span
                          className="
                            inline-flex
                            rounded-full
                            border
                            border-purple-500/30
                            bg-purple-500/10
                            px-3
                            py-1
                            text-sm
                            font-bold
                            text-purple-300
                          "
                        >
                          {game.genre}
                        </span>
                      )}

                      <span
                        className="
                          inline-flex
                          rounded-full
                          bg-green-500/20
                          px-3
                          py-1
                          text-sm
                          font-bold
                          text-green-200
                        "
                      >
                        Released
                      </span>
                    </div>

                    {/* Title */}
                    <h2
                      className="
                        mt-5
                        text-2xl
                        font-black
                        text-white
                      "
                    >
                      {game.title}
                    </h2>

                    {/* Description */}
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

                    {/* Release Date */}
                    {game.release_date && (
                      <p
                        className="
                          mt-4
                          text-sm
                          font-bold
                          text-cyan-400
                        "
                      >
                        Release: {game.release_date}
                      </p>
                    )}

                    {/* View Game */}
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
                          px-7
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
            </section>
          )}

          {/* =========================
              FULL GAME LIBRARY
          ========================= */}

          <section
            className="
              grid
              grid-cols-1
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
                {/* Cover */}
                {game.image ? (
                  <img
                    src={game.image}
                    alt={game.title}
                    className="
                      h-56
                      w-full
                      rounded-xl
                      object-cover
                    "
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-56
                      items-center
                      justify-center
                      rounded-xl
                      bg-black/40
                      text-slate-500
                    "
                  >
                    No Cover Image
                  </div>
                )}

                {/* Genre */}
                {game.genre && (
                  <span
                    className="
                      mt-5
                      inline-flex
                      rounded-full
                      border
                      border-purple-500/30
                      bg-purple-500/10
                      px-3
                      py-1
                      text-sm
                      font-bold
                      text-purple-300
                    "
                  >
                    {game.genre}
                  </span>
                )}

                {/* Title */}
                <h2
                  className="
                    mt-5
                    text-2xl
                    font-black
                    text-white
                  "
                >
                  {game.title}
                </h2>

                {/* Description */}
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

                {/* Release */}
                {game.release_date && (
                  <p
                    className="
                      mt-4
                      text-sm
                      font-bold
                      text-cyan-400
                    "
                  >
                    Release: {game.release_date}
                  </p>
                )}

                {/* View Game */}
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
                      px-7
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
          </section>
        </>
      )}
    </main>
  );
}