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

function cleanImageUrl(image?: string | null) {
  if (!image) return "";

  if (image.startsWith("[")) {
    const match = image.match(/\((https?:\/\/[^)]+)\)/);

    if (match?.[1]) {
      return match[1];
    }
  }

  return image;
}

function getGameStatus(game: Game) {
  if (game.status === "archived") return "archived";
  if (game.status === "released") return "released";
  if (game.status === "upcoming") return "upcoming";

  if (game.release_date) {
    return new Date(game.release_date) <= new Date()
      ? "released"
      : "upcoming";
  }

  return "upcoming";
}

function formatReleaseDate(date?: string | null) {
  if (!date) return null;

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

function StatusBadge({ status }: { status: string }) {
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
        items-center
        rounded-full
        border
        px-3
        py-1
        text-[10px]
        font-black
        uppercase
        tracking-[0.18em]
        backdrop-blur-md
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
  compact = false,
}: {
  game: Game;
  featured?: boolean;
  compact?: boolean;
}) {
  const imageUrl = cleanImageUrl(game.image);
  const status = getGameStatus(game);
  const releaseDate = formatReleaseDate(game.release_date);

  return (
    <Link
      to={`/games/${game.id}`}
      className="group block h-full"
    >
      <BrandCard
        hover={false}
        status={featured ? "FEATURED GAME" : "GAME INTELLIGENCE"}
        className={`
          h-full
          overflow-hidden
          p-0
          transition-all
          duration-300
          group-hover:-translate-y-2
          group-hover:border-cyan-400/40
          group-hover:shadow-[0_0_40px_rgba(34,211,238,.12)]
        `}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={game.title}
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-700
                group-hover:scale-105
              "
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div
              className="
                flex
                h-full
                w-full
                items-center
                justify-center
                bg-black/50
                text-[10px]
                font-black
                uppercase
                tracking-[0.25em]
                text-slate-600
              "
            >
              NO COVER IMAGE
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          <div className="pointer-events-none absolute inset-x-0 top-0 h-px -translate-x-full bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {featured && (
              <span className="rounded-full border border-yellow-400/30 bg-yellow-500/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-yellow-300 backdrop-blur-md">
                ★ FEATURED
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
            <StatusBadge status={status} />

            {game.platform && (
              <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-200 backdrop-blur-md">
                {game.platform}
              </span>
            )}
          </div>
        </div>

        <div className={compact ? "p-5" : "p-6"}>
          <div className="flex flex-wrap gap-2">
            {game.category && (
              <span className="rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-cyan-300">
                {game.category}
              </span>
            )}

            {game.genre && (
              <span className="rounded-full border border-purple-500/20 bg-purple-500/5 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-purple-300">
                {game.genre}
              </span>
            )}
          </div>

          <h3
            className={`
              min-h-[2.5rem]
              font-black
              leading-tight
              text-white
              transition-colors
              duration-300
              group-hover:text-cyan-300
              ${compact ? "mt-3 text-xl" : "mt-4 text-2xl"}
            `}
          >
            {game.title}
          </h3>

          {game.description && !compact && (
            <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-400">
              {game.description}
            </p>
          )}

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-600">
                Release
              </p>

              <p className="mt-1 text-sm font-bold text-cyan-400">
                {releaseDate || "TBA"}
              </p>
            </div>

            <span className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/10 bg-cyan-500/5 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 transition-all group-hover:border-cyan-400/30 group-hover:bg-cyan-500/10 group-hover:text-cyan-300">
              Open File
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </div>
      </BrandCard>
    </Link>
  );
}

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "cyan" | "blue" | "green" | "yellow";
}) {
  const styles = {
    cyan: {
      border: "border-cyan-400/20",
      bg: "bg-cyan-500/5",
      text: "text-cyan-300",
    },
    blue: {
      border: "border-blue-400/20",
      bg: "bg-blue-500/5",
      text: "text-blue-300",
    },
    green: {
      border: "border-green-400/20",
      bg: "bg-green-500/5",
      text: "text-green-300",
    },
    yellow: {
      border: "border-yellow-400/20",
      bg: "bg-yellow-500/5",
      text: "text-yellow-300",
    },
  };

  const style = styles[tone];

  return (
    <div
      className={`
        rounded-2xl
        border
        p-5
        ${style.border}
        ${style.bg}
      `}
    >
      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
        {label}
      </p>

      <p className={`mt-2 text-3xl font-black ${style.text}`}>
        {value}
      </p>
    </div>
  );
}

export default function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<GameFilter>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadGames() {
      try {
        setLoading(true);

        const data = await getGames();

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

  const categorizedGames = useMemo(() => {
    const upcoming = games
      .filter((game) => getGameStatus(game) === "upcoming")
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
      .filter((game) => getGameStatus(game) === "released")
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
          return (
            game.featured === true &&
            getGameStatus(game) !== "archived"
          );
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
        if (!query) return true;

        return [
          game.title,
          game.description,
          game.genre,
          game.category,
          game.platform,
        ]
          .filter(Boolean)
          .some((value) =>
            value!.toLowerCase().includes(query)
          );
      });
  }, [games, filter, search]);

  if (loading) {
    return (
      <main className="min-h-[72vh] px-6 py-16">
        <div className="mx-auto w-full max-w-[1500px]">
          <BrandCard scan status="GAME SYSTEM" className="p-8 md:p-10">
            <div className="flex items-center gap-4">
              <span className="pp-live-dot" />

              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
                  PulsePlay Game Intelligence
                </p>

                <h1 className="mt-2 text-3xl font-black uppercase text-white md:text-4xl">
                  Establishing Connection...
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Loading mission database and release intelligence.
                </p>
              </div>
            </div>
          </BrandCard>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[72vh] px-4 py-10 text-white sm:px-6 sm:py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">

        <section
          className="
            relative
            mb-14
            overflow-hidden
            rounded-[2rem]
            border
            border-cyan-500/20
            bg-gradient-to-br
            from-cyan-950/30
            via-[#060a14]
            to-purple-950/40
            p-8
            shadow-[0_0_100px_rgba(34,211,238,.10)]
            ring-1
            ring-white/5
            md:p-12
            lg:p-14
          "
        >
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />

          <div className="relative">

            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">

              <div className="max-w-4xl">

                <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-500/5 px-5 py-2">
                  <span className="pp-live-dot" />

                  <span className="text-xs font-black uppercase tracking-[0.35em] text-cyan-300">
                    Game Database Online
                  </span>
                </div>

                <p className="mt-8 text-xs font-black uppercase tracking-[0.45em] text-purple-400">
                  PulsePlay Intelligence Network // Game Database
                </p>

                <h1 className="mt-4 text-5xl font-black leading-[0.86] tracking-[-0.04em] pp-gradient-text md:text-7xl lg:text-8xl">
                  GAME
                  <br />
                  COMMAND
                  <br />
                  CENTER
                </h1>

                <p className="mt-7 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8 md:text-xl">
                  Discover the games powering the PulsePlay network. Track
                  upcoming releases, featured missions, and the worlds players
                  are exploring right now.
                </p>

                <div className="mt-8 flex flex-wrap gap-3 text-[10px] font-black uppercase tracking-[0.2em]">

                  <span className="rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-2 text-cyan-300">
                    GAME INTELLIGENCE
                  </span>

                  <span className="rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-2 text-purple-300">
                    RELEASE TRACKING
                  </span>

                  <span className="rounded-full border border-green-500/20 bg-green-500/5 px-4 py-2 text-green-300">
                    LIVE DATABASE
                  </span>

                </div>

              </div>


              <div className="w-full rounded-2xl border border-green-500/20 bg-black/30 p-6 backdrop-blur-sm lg:max-w-[310px]">

                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    Database Diagnostics
                  </p>

                  <span className="text-[10px] font-black uppercase tracking-widest text-green-400">
                    LIVE
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <span className="h-3 w-3 animate-pulse rounded-full bg-green-400 shadow-[0_0_18px_#22c55e]" />

                  <span className="text-xl font-black text-white">
                    SYSTEM ONLINE
                  </span>
                </div>

                <div className="mt-5 space-y-3 border-t border-white/10 pt-5">

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Indexed Games
                    </span>

                    <span className="text-sm font-black text-cyan-300">
                      {games.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Upcoming Intel
                    </span>

                    <span className="text-sm font-black text-purple-300">
                      {categorizedGames.upcoming.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Featured Missions
                    </span>

                    <span className="text-sm font-black text-yellow-300">
                      {categorizedGames.featured.length}
                    </span>
                  </div>

                </div>

              </div>

            </div>


            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              <StatCard
                label="Total Games"
                value={games.length}
                tone="cyan"
              />

              <StatCard
                label="Upcoming"
                value={categorizedGames.upcoming.length}
                tone="blue"
              />

              <StatCard
                label="Released"
                value={categorizedGames.released.length}
                tone="green"
              />

              <StatCard
                label="Featured"
                value={categorizedGames.featured.length}
                tone="yellow"
              />
            </div>

          </div>
        </section>

        {games.length === 0 && (
          <BrandCard scan status="DATABASE EMPTY" className="mb-14">
            <div className="py-14 text-center">
              <div className="text-5xl">🎮</div>

              <p className="mt-6 text-xs font-black uppercase tracking-[0.35em] text-purple-400">
                No Mission Data
              </p>

              <h2 className="mt-3 text-3xl font-black text-white">
                No Games Available
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                Add games through the PulsePlay Admin Dashboard to
                populate the public mission database.
              </p>
            </div>
          </BrandCard>
        )}

        {games.length > 0 && (
          <>
            {categorizedGames.featured.length > 0 && (
              <section className="mb-16">
                <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.4em] text-yellow-400">
                      Priority Missions
                    </p>

                    <h2 className="mt-2 text-4xl font-black pp-gradient-text md:text-5xl">
                      Featured Games
                    </h2>

                    <p className="mt-3 max-w-3xl text-slate-400">
                      Current games receiving the PulsePlay network spotlight.
                    </p>
                  </div>

                  <BrandButton
                    variant="secondary"
                    type="button"
                    onClick={() => setFilter("featured")}
                  >
                    ★ View Featured
                  </BrandButton>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {categorizedGames.featured.slice(0, 3).map((game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      featured
                    />
                  ))}
                </div>
              </section>
            )}

            <section className="mb-16">
              <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.4em] text-blue-400">
                    Release Radar
                  </p>

                  <h2 className="mt-2 text-4xl font-black pp-gradient-text md:text-5xl">
                    Upcoming Releases
                  </h2>

                  <p className="mt-3 max-w-3xl text-slate-400">
                    Monitor the next games entering the PulsePlay operational zone.
                  </p>
                </div>

                <BrandButton
                  variant="secondary"
                  type="button"
                  onClick={() => setFilter("upcoming")}
                >
                  View Upcoming
                </BrandButton>
              </div>

              {categorizedGames.upcoming.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {categorizedGames.upcoming.slice(0, 3).map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              ) : (
                <BrandCard scan status="RELEASE RADAR">
                  <div className="py-6">
                    <p className="text-sm text-slate-400">
                      No upcoming releases are currently listed.
                    </p>
                  </div>
                </BrandCard>
              )}
            </section>

            <section className="mb-16">
              <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.4em] text-green-400">
                    Launch Archive
                  </p>

                  <h2 className="mt-2 text-4xl font-black pp-gradient-text md:text-5xl">
                    Recent Releases
                  </h2>

                  <p className="mt-3 max-w-3xl text-slate-400">
                    Review the latest titles that have entered the active game library.
                  </p>
                </div>

                <BrandButton
                  variant="secondary"
                  type="button"
                  onClick={() => setFilter("released")}
                >
                  View Released
                </BrandButton>
              </div>

              {categorizedGames.released.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {categorizedGames.released.slice(0, 3).map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              ) : (
                <BrandCard scan status="LAUNCH ARCHIVE">
                  <div className="py-6">
                    <p className="text-sm text-slate-400">
                      No released games are currently listed.
                    </p>
                  </div>
                </BrandCard>
              )}
            </section>

            <section className="pb-16">
              <div className="mb-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="pp-live-dot" />

                      <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400">
                        Complete Database
                      </p>
                    </div>

                    <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] pp-gradient-text md:text-5xl">
                      Full Game Library
                    </h2>

                    <p className="mt-3 max-w-3xl text-slate-400">
                      Search, filter, and open any game intelligence file in
                      the PulsePlay database.
                    </p>
                  </div>

                  <div className="w-full lg:max-w-md">
                    <label htmlFor="game-search" className="sr-only">
                      Search games
                    </label>

                    <div className="relative rounded-2xl border border-cyan-500/20 bg-black/30 p-1 shadow-[0_0_30px_rgba(34,211,238,.05)]">
                      <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-cyan-400">
                        ⌕
                      </span>

                      <input
                        id="game-search"
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search games, genres, platforms..."
                        className="w-full rounded-xl bg-transparent py-3.5 pl-11 pr-5 text-sm font-semibold text-white outline-none transition placeholder:text-slate-600 focus:ring-2 focus:ring-cyan-500/10"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-4 border-y border-white/10 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-green-400 shadow-[0_0_10px_#22c55e]" />

                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                      Query Results
                    </span>

                    <span className="font-mono text-sm font-black text-cyan-300">
                      {filteredGames.length}
                    </span>

                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
                      FILES
                    </span>
                  </div>

                  {(search || filter !== "all") && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setFilter("all");
                      }}
                      className="text-left text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 transition hover:text-purple-300 sm:text-right"
                    >
                      Reset Query →
                    </button>
                  )}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {(
                    [
                      ["all", "All Games"],
                      ["featured", "★ Featured"],
                      ["upcoming", "Coming Soon"],
                      ["released", "Released"],
                    ] as const
                  ).map(([value, label]) => {
                    const active = filter === value;

                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setFilter(value)}
                        className={`
                          rounded-xl
                          border
                          px-5
                          py-2.5
                          text-xs
                          font-black
                          uppercase
                          tracking-[0.15em]
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
              </div>

              {filteredGames.length > 0 ? (
                <>
                  <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-600">
                      {filteredGames.length}{" "}
                      {filteredGames.length === 1 ? "Game" : "Games"} Located
                    </p>

                    {(search || filter !== "all") && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearch("");
                          setFilter("all");
                        }}
                        className="text-[10px] font-black uppercase tracking-widest text-cyan-400 transition hover:text-cyan-300"
                      >
                        Reset Filters →
                      </button>
                    )}
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredGames.map((game) => (
                      <GameCard
                        key={game.id}
                        game={game}
                        featured={game.featured === true}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <BrandCard scan status="NO MATCHES">
                  <div className="py-12 text-center">
                    <div className="text-4xl">⌕</div>

                    <h3 className="mt-5 text-2xl font-black text-white">
                      No Games Found
                    </h3>

                    <p className="mt-3 text-slate-400">
                      Try another search term or change the active library filter.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setFilter("all");
                      }}
                      className="mt-6 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-6 py-3 text-xs font-black uppercase tracking-wider text-cyan-300 transition hover:bg-cyan-500/20"
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
