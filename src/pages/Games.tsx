import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";

import {
  getGames,
  type Game,
} from "../services/games";

type GameFilter =
  | "all"
  | "upcoming"
  | "released"
  | "featured";

function cleanImageUrl(image: string) {
  if (!image) {
    return "";
  }

  if (image.startsWith("[")) {
    const markdownMatch = image.match(
      /\((https?:\/\/[^)]+)\)/
    );

    if (markdownMatch?.[1]) {
      return markdownMatch[1];
    }
  }

  return image;
}

function getGameStatus(game: Game) {
  if (game.status === "archived") {
    return "archived";
  }

  if (game.status === "released") {
    return "released";
  }

  if (game.status === "upcoming") {
    return "upcoming";
  }

  if (game.release_date) {
    return new Date(game.release_date) <= new Date()
      ? "released"
      : "upcoming";
  }

  return "upcoming";
}

function formatReleaseDate(date?: string | null) {
  if (!date) {
    return null;
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString();
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const styles =
    status === "released"
      ? "border-green-400/30 bg-green-500/10 text-green-300"
      : status === "upcoming"
        ? "border-blue-400/30 bg-blue-500/10 text-blue-300"
        : "border-white/10 bg-white/5 text-slate-400";

  const label =
    status === "released"
      ? "RELEASED"
      : status === "upcoming"
        ? "COMING SOON"
        : status.toUpperCase();

  return (
    <span
      className={`
        inline-flex
        rounded-full
        border
        px-3
        py-1
        text-[11px]
        font-black
        uppercase
        tracking-wider
        ${styles}
      `}
    >
      {label}
    </span>
  );
}

function GameCard({
  game,
  featured = false,
}: {
  game: Game;
  featured?: boolean;
}) {
  const imageUrl = cleanImageUrl(game.image);
  const status = getGameStatus(game);
  const releaseDate = formatReleaseDate(
    game.release_date
  );

  return (
    <Link
      to={`/games/${game.id}`}
      className="group block h-full"
    >
      <BrandCard
        className="
          h-full
          p-0
          transition-all
          duration-300
          group-hover:-translate-y-2
          group-hover:border-cyan-400/30
        "
        status={
          featured
            ? "FEATURED GAME"
            : "GAME INTELLIGENCE"
        }
      >
        {/* COVER */}

        <div className="relative overflow-hidden">

          {imageUrl ? (
            <img
              src={imageUrl}
              alt={game.title}
              className="
                h-60
                w-full
                object-cover
                transition
                duration-500
                group-hover:scale-105
              "
              onError={(event) => {
                event.currentTarget.style.display =
                  "none";
              }}
            />
          ) : (
            <div
              className="
                flex
                h-60
                items-center
                justify-center
                bg-black/40
                text-sm
                font-bold
                uppercase
                tracking-wider
                text-slate-500
              "
            >
              No Cover Image
            </div>
          )}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-black/70
              via-transparent
              to-transparent
              opacity-80
            "
          />

          {featured && (
            <span
              className="
                absolute
                left-4
                top-4
                rounded-full
                border
                border-yellow-400/30
                bg-yellow-500/20
                px-3
                py-1
                text-[11px]
                font-black
                uppercase
                tracking-wider
                text-yellow-300
                backdrop-blur
              "
            >
              ⭐ Featured
            </span>
          )}

          <div
            className="
              absolute
              bottom-4
              left-4
              right-4
              flex
              flex-wrap
              gap-2
            "
          >
            <StatusBadge status={status} />

            {game.platform && (
              <span
                className="
                  rounded-full
                  border
                  border-white/10
                  bg-black/50
                  px-3
                  py-1
                  text-[11px]
                  font-black
                  uppercase
                  tracking-wider
                  text-slate-200
                  backdrop-blur
                "
              >
                {game.platform}
              </span>
            )}
          </div>
        </div>

        {/* CONTENT */}

        <div className="p-6">

          <div className="flex flex-wrap gap-2">

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
                  text-purple-300
                "
              >
                {game.genre}
              </span>
            )}

          </div>

          <h3
            className="
              mt-4
              text-2xl
              font-black
              text-white
              transition
              group-hover:text-cyan-300
            "
          >
            {game.title}
          </h3>

          {game.description && (
            <p
              className="
                mt-3
                line-clamp-3
                text-sm
                leading-7
                text-slate-400
              "
            >
              {game.description}
            </p>
          )}

          <div
            className="
              mt-6
              flex
              items-center
              justify-between
              gap-4
              border-t
              border-white/10
              pt-5
            "
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                Release
              </p>

              <p className="mt-1 text-sm font-bold text-cyan-400">
                {releaseDate || "TBA"}
              </p>
            </div>

            <span
              className="
                text-sm
                font-black
                uppercase
                tracking-wider
                text-cyan-400
                transition
                group-hover:text-cyan-300
              "
            >
              View Game →
            </span>
          </div>

        </div>
      </BrandCard>
    </Link>
  );
}

export default function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] =
    useState<GameFilter>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadGames() {
      try {
        setLoading(true);

        const data = await getGames();

        setGames(data || []);
      } catch (error) {
        console.error(
          "FAILED TO LOAD GAMES:",
          error
        );

        setGames([]);
      } finally {
        setLoading(false);
      }
    }

    loadGames();
  }, []);

  const categorizedGames = useMemo(() => {
    const upcoming = games
      .filter(
        (game) =>
          getGameStatus(game) === "upcoming"
      )
      .sort((a, b) => {
        const aDate = a.release_date
          ? new Date(a.release_date).getTime()
          : Number.MAX_SAFE_INTEGER;

        const bDate = b.release_date
          ? new Date(b.release_date).getTime()
          : Number.MAX_SAFE_INTEGER;

        return aDate - bDate;
      });

    const released = games
      .filter(
        (game) =>
          getGameStatus(game) === "released"
      )
      .sort((a, b) => {
        const aDate = a.release_date
          ? new Date(a.release_date).getTime()
          : 0;

        const bDate = b.release_date
          ? new Date(b.release_date).getTime()
          : 0;

        return bDate - aDate;
      });

    const featured = games.filter(
      (game) =>
        game.featured === true &&
        getGameStatus(game) !== "archived"
    );

    return {
      upcoming,
      released,
      featured,
    };
  }, [games]);

  const filteredGames = useMemo(() => {
    const query = search.trim().toLowerCase();

    return games
      .filter((game) => {
        if (filter === "featured") {
          return game.featured === true;
        }

        if (filter === "upcoming") {
          return getGameStatus(game) === "upcoming";
        }

        if (filter === "released") {
          return getGameStatus(game) === "released";
        }

        return getGameStatus(game) !== "archived";
      })
      .filter((game) => {
        if (!query) {
          return true;
        }

        return [
          game.title,
          game.description,
          game.genre,
          game.category,
          game.platform,
        ]
          .filter(Boolean)
          .some((value) =>
            value!
              .toLowerCase()
              .includes(query)
          );
      });
  }, [games, filter, search]);

  if (loading) {
    return (
      <main className="min-h-[72vh] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <BrandCard status="GAME SYSTEM">
            <div className="flex items-center gap-4">
              <span className="pp-live-dot" />

              <div>
                <p className="font-black uppercase tracking-widest text-cyan-400">
                  PulsePlay Game Library
                </p>

                <p className="mt-1 text-slate-400">
                  Loading game intelligence...
                </p>
              </div>
            </div>
          </BrandCard>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[72vh] px-6 py-12">

      <div className="mx-auto max-w-7xl">

        {/* HERO */}

        <section
          className="
            relative
            mb-14
            overflow-hidden
            rounded-3xl
            border
            border-cyan-500/20
            bg-gradient-to-br
            from-purple-950/50
            via-[#070b16]
            to-cyan-950/30
            p-8
            shadow-[0_0_60px_rgba(34,211,238,.08)]
            md:p-12
          "
        >

          <div
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-72
              w-72
              rounded-full
              bg-purple-500/10
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-32
              -left-24
              h-72
              w-72
              rounded-full
              bg-cyan-500/10
              blur-3xl
            "
          />

          <div className="relative">

            <p
              className="
                text-xs
                font-black
                uppercase
                tracking-[0.45em]
                text-cyan-400
              "
            >
              PulsePlay Intelligence Network
            </p>

            <h1
              className="
                mt-4
                text-5xl
                font-black
                leading-none
                pp-gradient-text
                md:text-7xl
              "
            >
              Game Library
            </h1>

            <p
              className="
                mt-6
                max-w-3xl
                text-lg
                leading-8
                text-slate-300
              "
            >
              Explore the games driving the PulsePlay
              community — from upcoming releases to
              recently launched titles and featured
              experiences.
            </p>

            {/* STATS */}

            <div
              className="
                mt-10
                grid
                grid-cols-2
                gap-4
                md:grid-cols-4
              "
            >

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Total Games
                </p>

                <p className="mt-2 text-3xl font-black text-white">
                  {games.length}
                </p>
              </div>

              <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Upcoming
                </p>

                <p className="mt-2 text-3xl font-black text-blue-300">
                  {categorizedGames.upcoming.length}
                </p>
              </div>

              <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Released
                </p>

                <p className="mt-2 text-3xl font-black text-green-300">
                  {categorizedGames.released.length}
                </p>
              </div>

              <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Featured
                </p>

                <p className="mt-2 text-3xl font-black text-yellow-300">
                  {categorizedGames.featured.length}
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* EMPTY STATE */}

        {games.length === 0 && (
          <BrandCard status="GAME LIBRARY EMPTY">
            <div className="py-12 text-center">

              <p className="text-xs font-black uppercase tracking-[0.35em] text-purple-400">
                No Game Data
              </p>

              <h2 className="mt-4 text-3xl font-black text-white">
                No Games Available
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                Add games through the PulsePlay Admin
                Dashboard to populate the public library.
              </p>

            </div>
          </BrandCard>
        )}

        {games.length > 0 && (
          <>

            {/* FEATURED */}

            {categorizedGames.featured.length > 0 && (
              <section className="mb-14">

                <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.4em] text-yellow-400">
                      Curated Selection
                    </p>

                    <h2 className="mt-2 text-4xl font-black pp-gradient-text">
                      Featured Games
                    </h2>

                    <p className="mt-3 max-w-3xl text-slate-400">
                      Games currently receiving the
                      PulsePlay spotlight.
                    </p>
                  </div>

                  <BrandButton
                    variant="secondary"
                    type="button"
                    onClick={() =>
                      setFilter("featured")
                    }
                  >
                    ⭐ View Featured
                  </BrandButton>

                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                  {categorizedGames.featured
                    .slice(0, 3)
                    .map((game) => (
                      <GameCard
                        key={game.id}
                        game={game}
                        featured
                      />
                    ))}

                </div>
              </section>
            )}

            {/* RELEASE RADAR */}

            <section className="mb-14">

              <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.4em] text-blue-400">
                    Release Radar
                  </p>

                  <h2 className="mt-2 text-4xl font-black pp-gradient-text">
                    Upcoming Releases
                  </h2>

                  <p className="mt-3 max-w-3xl text-slate-400">
                    Keep an eye on the newest games
                    heading toward the PulsePlay community.
                  </p>
                </div>

                <BrandButton
                  variant="secondary"
                  type="button"
                  onClick={() =>
                    setFilter("upcoming")
                  }
                >
                  View Upcoming
                </BrandButton>

              </div>

              {categorizedGames.upcoming.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                  {categorizedGames.upcoming
                    .slice(0, 3)
                    .map((game) => (
                      <GameCard
                        key={game.id}
                        game={game}
                      />
                    ))}

                </div>
              ) : (
                <BrandCard status="RELEASE RADAR">
                  <p className="text-slate-400">
                    No upcoming releases are currently
                    listed.
                  </p>
                </BrandCard>
              )}

            </section>

            {/* RECENT RELEASES */}

            <section className="mb-14">

              <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.4em] text-green-400">
                    Launch Archive
                  </p>

                  <h2 className="mt-2 text-4xl font-black pp-gradient-text">
                    Recent Releases
                  </h2>

                  <p className="mt-3 max-w-3xl text-slate-400">
                    Explore games that have recently
                    entered the PulsePlay library.
                  </p>
                </div>

                <BrandButton
                  variant="secondary"
                  type="button"
                  onClick={() =>
                    setFilter("released")
                  }
                >
                  View Released
                </BrandButton>

              </div>

              {categorizedGames.released.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                  {categorizedGames.released
                    .slice(0, 3)
                    .map((game) => (
                      <GameCard
                        key={game.id}
                        game={game}
                      />
                    ))}

                </div>
              ) : (
                <BrandCard status="LAUNCH ARCHIVE">
                  <p className="text-slate-400">
                    No released games are currently
                    listed.
                  </p>
                </BrandCard>
              )}

            </section>

            {/* FULL LIBRARY */}

            <section className="pb-16">

              <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400">
                    Complete Database
                  </p>

                  <h2 className="mt-2 text-4xl font-black pp-gradient-text">
                    Full Game Library
                  </h2>

                  <p className="mt-3 text-slate-400">
                    Search and explore the complete
                    PulsePlay game database.
                  </p>
                </div>

                <div className="w-full lg:max-w-md">

                  <label
                    htmlFor="game-search"
                    className="sr-only"
                  >
                    Search games
                  </label>

                  <input
                    id="game-search"
                    type="search"
                    value={search}
                    onChange={(event) =>
                      setSearch(
                        event.target.value
                      )
                    }
                    placeholder="Search games, genres, platforms..."
                    className="
                      w-full
                      rounded-xl
                      border
                      border-cyan-500/20
                      bg-black/30
                      px-5
                      py-3
                      text-white
                      outline-none
                      transition
                      placeholder:text-slate-600
                      focus:border-cyan-400/50
                      focus:ring-2
                      focus:ring-cyan-500/10
                    "
                  />

                </div>

              </div>

              {/* FILTERS */}

              <div className="mb-8 flex flex-wrap gap-3">

                {(
                  [
                    ["all", "All Games"],
                    ["featured", "⭐ Featured"],
                    ["upcoming", "Coming Soon"],
                    ["released", "Released"],
                  ] as const
                ).map(([value, label]) => {

                  const active =
                    filter === value;

                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        setFilter(value)
                      }
                      className={`
                        rounded-xl
                        border
                        px-5
                        py-2.5
                        text-sm
                        font-black
                        uppercase
                        tracking-wider
                        transition-all
                        ${
                          active
                            ? "border-cyan-400/50 bg-cyan-500/15 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,.12)]"
                            : "border-white/10 bg-white/5 text-slate-400 hover:border-cyan-500/30 hover:text-cyan-300"
                        }
                      `}
                    >
                      {label}
                    </button>
                  );
                })}

              </div>

              {filteredGames.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                  {filteredGames.map((game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      featured={
                        game.featured === true
                      }
                    />
                  ))}

                </div>
              ) : (
                <BrandCard status="NO MATCHES">
                  <div className="py-10 text-center">

                    <h3 className="text-2xl font-black text-white">
                      No Games Found
                    </h3>

                    <p className="mt-3 text-slate-400">
                      Try another search or change the
                      library filter.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setFilter("all");
                      }}
                      className="
                        mt-6
                        rounded-xl
                        border
                        border-cyan-500/30
                        bg-cyan-500/10
                        px-6
                        py-3
                        font-black
                        uppercase
                        tracking-wider
                        text-cyan-300
                        transition
                        hover:bg-cyan-500/20
                      "
                    >
                      Reset Library
                    </button>

                  </div>
                </BrandCard>
              )}

            </section>

          </>
        )}

      </div>
    </main>
  );
}
