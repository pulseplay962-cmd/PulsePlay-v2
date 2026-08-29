import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";

import {
  getGames,
  type Game,
} from "../services/games";

type FilterStatus =
  | "all"
  | "upcoming"
  | "released";

function formatReleaseDate(date?: string | null) {
  if (!date) {
    return "Release date TBA";
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getGameStatus(game: Game): "upcoming" | "released" {
  if (game.status === "upcoming") {
    return "upcoming";
  }

  if (game.status === "released") {
    return "released";
  }

  if (game.release_date) {
    return new Date(game.release_date) > new Date()
      ? "upcoming"
      : "released";
  }

  return "upcoming";
}

export default function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [platform, setPlatform] = useState("all");
  const [status, setStatus] =
    useState<FilterStatus>("all");

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

  const genres = useMemo(() => {
    return Array.from(
      new Set(
        games
          .map((game) => game.genre?.trim())
          .filter(Boolean) as string[]
      )
    ).sort();
  }, [games]);

  const platforms = useMemo(() => {
    return Array.from(
      new Set(
        games
          .map((game) => game.platform?.trim())
          .filter(Boolean) as string[]
      )
    ).sort();
  }, [games]);

  const filteredGames = useMemo(() => {
    const query = search.trim().toLowerCase();

    return games.filter((game) => {
      const matchesSearch =
        !query ||
        game.title.toLowerCase().includes(query) ||
        game.description
          ?.toLowerCase()
          .includes(query) ||
        game.genre
          ?.toLowerCase()
          .includes(query);

      const matchesGenre =
        genre === "all" ||
        game.genre === genre;

      const matchesPlatform =
        platform === "all" ||
        game.platform === platform;

      const matchesStatus =
        status === "all" ||
        getGameStatus(game) === status;

      return (
        matchesSearch &&
        matchesGenre &&
        matchesPlatform &&
        matchesStatus
      );
    });
  }, [
    games,
    search,
    genre,
    platform,
    status,
  ]);

  const upcomingGames = useMemo(() => {
    return filteredGames
      .filter(
        (game) =>
          getGameStatus(game) === "upcoming"
      )
      .sort((a, b) => {
        const aTime = a.release_date
          ? new Date(a.release_date).getTime()
          : Number.MAX_SAFE_INTEGER;

        const bTime = b.release_date
          ? new Date(b.release_date).getTime()
          : Number.MAX_SAFE_INTEGER;

        return aTime - bTime;
      });
  }, [filteredGames]);

  const releasedGames = useMemo(() => {
    return filteredGames
      .filter(
        (game) =>
          getGameStatus(game) === "released"
      )
      .sort((a, b) => {
        const aTime = a.release_date
          ? new Date(a.release_date).getTime()
          : 0;

        const bTime = b.release_date
          ? new Date(b.release_date).getTime()
          : 0;

        return bTime - aTime;
      });
  }, [filteredGames]);

  const featuredGame = useMemo(() => {
    return games.find(
      (game) => game.featured === true
    );
  }, [games]);

  function clearFilters() {
    setSearch("");
    setGenre("all");
    setPlatform("all");
    setStatus("all");
  }

  if (loading) {
    return (
      <main className="min-h-[72vh] px-6 py-12">
        <BrandCard>
          <div className="flex items-center gap-3">
            <span className="pp-live-dot" />

            <p className="text-slate-400">
              Loading game intelligence...
            </p>
          </div>
        </BrandCard>
      </main>
    );
  }

  return (
    <main className="min-h-[72vh] px-6 py-12">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <section className="mx-auto mb-14 max-w-7xl">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          <div>
            <div className="mb-4 flex items-center gap-3 text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
              <span className="pp-live-dot" />
              PulsePlay Intelligence
            </div>

            <h1 className="text-5xl font-black pp-gradient-text md:text-6xl">
              Game Library
            </h1>

            <p className="mt-5 max-w-3xl text-lg text-slate-400">
              Explore the games powering the PulsePlay
              community — from upcoming releases to
              titles already in the rotation.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">

            <div className="pp-panel min-w-[100px] p-4 text-center">
              <p className="text-2xl font-black text-white">
                {games.length}
              </p>

              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Games
              </p>
            </div>

            <div className="pp-panel min-w-[100px] p-4 text-center">
              <p className="text-2xl font-black text-cyan-400">
                {upcomingGames.length}
              </p>

              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Upcoming
              </p>
            </div>

            <div className="pp-panel min-w-[100px] p-4 text-center">
              <p className="text-2xl font-black text-green-400">
                {releasedGames.length}
              </p>

              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Released
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================
          FEATURED GAME
      ========================= */}

      {featuredGame && (
        <section className="mx-auto mb-14 max-w-7xl">

          <BrandCard
            className="overflow-hidden p-0"
            scan
          >

            <div className="grid lg:grid-cols-2">

              <div className="relative min-h-[300px]">

                {featuredGame.image ? (
                  <img
                    src={featuredGame.image}
                    alt={featuredGame.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-slate-500">
                    No Cover Image
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-transparent to-transparent lg:bg-gradient-to-r" />

                <div className="absolute left-6 top-6 rounded-full border border-cyan-400/40 bg-black/70 px-4 py-2 text-xs font-black uppercase tracking-widest text-cyan-300 backdrop-blur">
                  Featured Transmission
                </div>

              </div>

              <div className="flex flex-col justify-center p-8 lg:p-12">

                <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
                  PulsePlay Featured
                </p>

                <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">
                  {featuredGame.title}
                </h2>

                {featuredGame.description && (
                  <p className="mt-5 line-clamp-4 text-slate-400">
                    {featuredGame.description}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap gap-2">

                  {featuredGame.genre && (
                    <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-300">
                      {featuredGame.genre}
                    </span>
                  )}

                  {featuredGame.platform && (
                    <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300">
                      {featuredGame.platform}
                    </span>
                  )}

                </div>

                <div className="mt-7 flex flex-wrap items-center gap-4">

                  <Link to={`/games/${featuredGame.id}`}>
                    <BrandButton>
                      View Game
                    </BrandButton>
                  </Link>

                  <span className="text-sm font-bold text-slate-500">
                    {formatReleaseDate(
                      featuredGame.release_date
                    )}
                  </span>

                </div>

              </div>

            </div>

          </BrandCard>

        </section>
      )}

      {/* =========================
          FILTER COMMAND BAR
      ========================= */}

      <section className="mx-auto mb-14 max-w-7xl">

        <BrandCard>

          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400">
                Library Command
              </p>

              <h2 className="mt-1 text-2xl font-black text-white">
                Find Your Next Game
              </h2>
            </div>

            <p className="text-sm text-slate-500">
              {filteredGames.length} of {games.length} results
            </p>

          </div>

          <div className="grid gap-4 lg:grid-cols-4">

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search games..."
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-black/40
                px-4
                py-3
                text-white
                outline-none
                transition
                placeholder:text-slate-600
                focus:border-cyan-400/50
                focus:ring-2
                focus:ring-cyan-400/10
              "
            />

            <select
              value={genre}
              onChange={(event) =>
                setGenre(event.target.value)
              }
              className="
                rounded-xl
                border
                border-white/10
                bg-[#0b1120]
                px-4
                py-3
                text-white
                outline-none
                focus:border-cyan-400/50
              "
            >
              <option value="all">
                All Genres
              </option>

              {genres.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={platform}
              onChange={(event) =>
                setPlatform(event.target.value)
              }
              className="
                rounded-xl
                border
                border-white/10
                bg-[#0b1120]
                px-4
                py-3
                text-white
                outline-none
                focus:border-cyan-400/50
              "
            >
              <option value="all">
                All Platforms
              </option>

              {platforms.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value as FilterStatus
                )
              }
              className="
                rounded-xl
                border
                border-white/10
                bg-[#0b1120]
                px-4
                py-3
                text-white
                outline-none
                focus:border-cyan-400/50
              "
            >
              <option value="all">
                All Status
              </option>

              <option value="upcoming">
                Upcoming
              </option>

              <option value="released">
                Released
              </option>
            </select>

          </div>

          {(search ||
            genre !== "all" ||
            platform !== "all" ||
            status !== "all") && (
            <div className="mt-5">

              <BrandButton
                variant="secondary"
                onClick={clearFilters}
              >
                Reset Filters
              </BrandButton>

            </div>
          )}

        </BrandCard>

      </section>

      {/* =========================
          EMPTY LIBRARY
      ========================= */}

      {games.length === 0 && (
        <section className="mx-auto max-w-7xl">
          <BrandCard>
            <h2 className="text-2xl font-black text-white">
              No Games Available
            </h2>

            <p className="mt-3 text-slate-400">
              Add games through the PulsePlay Admin Dashboard.
            </p>
          </BrandCard>
        </section>
      )}

      {/* =========================
          FILTERED EMPTY
      ========================= */}

      {games.length > 0 &&
        filteredGames.length === 0 && (
          <section className="mx-auto max-w-7xl">
            <BrandCard>
              <h2 className="text-2xl font-black text-white">
                No Matching Games
              </h2>

              <p className="mt-3 text-slate-400">
                No games match the current intelligence
                filters.
              </p>

              <div className="mt-6">
                <BrandButton
                  variant="secondary"
                  onClick={clearFilters}
                >
                  Clear Filters
                </BrandButton>
              </div>
            </BrandCard>
          </section>
        )}

      {/* =========================
          UPCOMING
      ========================= */}

      {upcomingGames.length > 0 && (
        <section className="mx-auto mb-16 max-w-7xl">

          <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">

            <div>
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,.8)]" />

                <h2 className="text-3xl font-black pp-gradient-text">
                  Upcoming Releases
                </h2>
              </div>

              <p className="mt-2 text-slate-400">
                Games on the horizon.
              </p>
            </div>

            <span className="text-sm font-bold uppercase tracking-widest text-slate-500">
              {upcomingGames.length} Incoming
            </span>

          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {upcomingGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                status="upcoming"
              />
            ))}

          </div>

        </section>
      )}

      {/* =========================
          RELEASED
      ========================= */}

      {releasedGames.length > 0 && (
        <section className="mx-auto mb-16 max-w-7xl">

          <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">

            <div>
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-green-400 shadow-[0_0_15px_rgba(74,222,128,.8)]" />

                <h2 className="text-3xl font-black pp-gradient-text">
                  Released Games
                </h2>
              </div>

              <p className="mt-2 text-slate-400">
                Games currently in the PulsePlay library.
              </p>
            </div>

            <span className="text-sm font-bold uppercase tracking-widest text-slate-500">
              {releasedGames.length} Available
            </span>

          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {releasedGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                status="released"
              />
            ))}

          </div>

        </section>
      )}

    </main>
  );
}

function GameCard({
  game,
  status,
}: {
  game: Game;
  status: "upcoming" | "released";
}) {
  return (
    <BrandCard
      className="card-hover flex h-full flex-col"
      status={
        status === "upcoming"
          ? "INCOMING"
          : "AVAILABLE"
      }
    >

      <div className="relative">

        {game.image ? (
          <img
            src={game.image}
            alt={game.title}
            className="h-60 w-full rounded-xl object-cover"
          />
        ) : (
          <div className="flex h-60 items-center justify-center rounded-xl bg-black/40 text-slate-500">
            No Cover Image
          </div>
        )}

        <div
          className={`
            absolute
            left-4
            top-4
            rounded-full
            px-3
            py-1
            text-xs
            font-black
            uppercase
            tracking-wider
            backdrop-blur
            ${
              status === "upcoming"
                ? "bg-blue-500/80 text-white"
                : "bg-green-500/80 text-white"
            }
          `}
        >
          {status === "upcoming"
            ? "Coming Soon"
            : "Released"}
        </div>

      </div>

      <div className="flex flex-1 flex-col">

        <div className="mt-5 flex flex-wrap gap-2">

          {game.genre && (
            <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-300">
              {game.genre}
            </span>
          )}

          {game.platform && (
            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-300">
              {game.platform}
            </span>
          )}

        </div>

        <h2 className="mt-4 text-2xl font-black text-white">
          {game.title}
        </h2>

        {game.description && (
          <p className="mt-3 line-clamp-3 text-slate-400">
            {game.description}
          </p>
        )}

        <div className="mt-auto pt-6">

          <div className="mb-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4">

            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Release
            </span>

            <span className="text-sm font-bold text-cyan-400">
              {formatReleaseDate(
                game.release_date
              )}
            </span>

          </div>

          <Link to={`/games/${game.id}`}>
            <BrandButton
              variant="secondary"
              className="w-full"
            >
              View Game
            </BrandButton>
          </Link>

        </div>

      </div>

    </BrandCard>
  );
}
