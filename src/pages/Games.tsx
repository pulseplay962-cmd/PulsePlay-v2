import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import BrandCard from "../components/ui/BrandCard";
import { getGames, type Game } from "../services/games";

type GameFilter = "all" | "featured" | "upcoming" | "released";
type GameSort = "featured" | "az" | "newest" | "release";

function cleanImageUrl(image?: string | null) {
  if (!image) return "";

  if (image.startsWith("[")) {
    const match = image.match(/\((https?:\/\/[^)]+)\)/);
    return match?.[1] || "";
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
  if (Number.isNaN(parsed.getTime())) return date;

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
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] backdrop-blur-md ${styles}`}
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
  const releaseDate = formatReleaseDate(game.release_date);

  return (
    <Link to={`/games/${game.id}`} className="group block h-full">
      <BrandCard
        hover={false}
        status={featured ? "FEATURED" : "GAME FILE"}
        className="h-full overflow-hidden p-0 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-cyan-400/40 group-hover:shadow-[0_0_38px_rgba(34,211,238,.10)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[#050812]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={game.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-950/30 via-black to-purple-950/30">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-600">
                NO COVER IMAGE
              </span>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent" />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {featured && (
              <span className="rounded-full border border-yellow-400/30 bg-yellow-500/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-yellow-300 backdrop-blur-md">
                ★ FEATURED
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
            <StatusBadge status={status} />
            {game.platform && (
              <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-200 backdrop-blur-md">
                {game.platform}
              </span>
            )}
          </div>
        </div>

        <div className="flex h-[220px] flex-col p-5 sm:p-6">
          <div className="flex flex-wrap gap-2">
            {game.category && (
              <span className="rounded-full border border-cyan-500/20 bg-cyan-500/5 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-cyan-300">
                {game.category}
              </span>
            )}
            {game.genre && (
              <span className="rounded-full border border-purple-500/20 bg-purple-500/5 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-purple-300">
                {game.genre}
              </span>
            )}
          </div>

          <h3 className="mt-3 line-clamp-2 text-xl font-black leading-tight text-white transition-colors group-hover:text-cyan-300 sm:text-2xl">
            {game.title}
          </h3>

          {game.description && (
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
              {game.description}
            </p>
          )}

          <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/10 pt-4">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">
                Release
              </p>
              <p className="mt-1 text-xs font-bold text-cyan-400">
                {releaseDate || "TBA"}
              </p>
            </div>

            <span className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/10 bg-cyan-500/5 px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-400 transition-all group-hover:border-cyan-400/30 group-hover:bg-cyan-500/10">
              View Game
              <span className="transition-transform group-hover:translate-x-1">→</span>
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
    cyan: "border-cyan-400/20 bg-cyan-500/5 text-cyan-300",
    blue: "border-blue-400/20 bg-blue-500/5 text-blue-300",
    green: "border-green-400/20 bg-green-500/5 text-green-300",
    yellow: "border-yellow-400/20 bg-yellow-500/5 text-yellow-300",
  };

  return (
    <div className={`rounded-2xl border p-4 sm:p-5 ${styles[tone]}`}>
      <p className="text-[9px] font-black uppercase tracking-[0.22em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-2xl font-black sm:text-3xl">{value}</p>
    </div>
  );
}

const selectClass =
  "w-full rounded-xl border border-white/10 bg-[#090d18] px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-300 outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-500/10";

export default function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<GameFilter>("all");
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [platform, setPlatform] = useState("all");
  const [sort, setSort] = useState<GameSort>("featured");

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

  const activeGames = useMemo(
    () => games.filter((game) => getGameStatus(game) !== "archived"),
    [games]
  );

  const featuredGames = useMemo(
    () => activeGames.filter((game) => game.featured === true),
    [activeGames]
  );

  const genres = useMemo(
    () =>
      Array.from(
        new Set(activeGames.map((game) => game.genre).filter(Boolean))
      ).sort((a, b) => a!.localeCompare(b!)) as string[],
    [activeGames]
  );

  const platforms = useMemo(
    () =>
      Array.from(
        new Set(activeGames.map((game) => game.platform).filter(Boolean))
      ).sort((a, b) => a!.localeCompare(b!)) as string[],
    [activeGames]
  );

  const filteredGames = useMemo(() => {
    const query = search.trim().toLowerCase();

    const results = activeGames
      .filter((game) => {
        if (filter === "featured") return game.featured === true;
        if (filter === "upcoming") return getGameStatus(game) === "upcoming";
        if (filter === "released") return getGameStatus(game) === "released";
        return true;
      })
      .filter((game) => genre === "all" || game.genre === genre)
      .filter((game) => platform === "all" || game.platform === platform)
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
          .some((value) => value!.toLowerCase().includes(query));
      });

    return [...results].sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);

      if (sort === "newest") {
        const aDate = a.release_date
          ? new Date(a.release_date).getTime()
          : 0;
        const bDate = b.release_date
          ? new Date(b.release_date).getTime()
          : 0;
        return bDate - aDate;
      }

      if (sort === "release") {
        const aDate = a.release_date
          ? new Date(a.release_date).getTime()
          : Number.MAX_SAFE_INTEGER;
        const bDate = b.release_date
          ? new Date(b.release_date).getTime()
          : Number.MAX_SAFE_INTEGER;
        return aDate - bDate;
      }

      if (a.featured !== b.featured) return a.featured ? -1 : 1;

      return a.title.localeCompare(b.title);
    });
  }, [activeGames, filter, genre, platform, search, sort]);

  const resetFilters = () => {
    setSearch("");
    setFilter("all");
    setGenre("all");
    setPlatform("all");
    setSort("featured");
  };

  if (loading) {
    return (
      <main className="min-h-[72vh] px-4 py-12 sm:px-6 md:py-16">
        <div className="mx-auto w-full max-w-7xl">
          <BrandCard scan status="GAME DATABASE">
            <div className="flex items-center gap-4 p-6 sm:p-8">
              <span className="pp-live-dot" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400">
                  PulsePlay Game Hub
                </p>
                <h1 className="mt-2 text-2xl font-black uppercase text-white sm:text-4xl">
                  Syncing Game Library...
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  Connecting to the PulsePlay game database.
                </p>
              </div>
            </div>
          </BrandCard>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[72vh] px-4 py-8 text-white sm:px-6 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <section className="relative mb-10 overflow-hidden rounded-[2rem] border border-cyan-500/20 bg-gradient-to-br from-cyan-950/30 via-[#060a14] to-purple-950/40 p-6 shadow-[0_0_90px_rgba(34,211,238,.08)] ring-1 ring-white/5 sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:48px_48px] opacity-30" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_300px] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-500/5 px-4 py-2">
                <span className="pp-live-dot" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-300">
                  Game Database Online
                </span>
              </div>

              <p className="mt-7 text-[10px] font-black uppercase tracking-[0.4em] text-purple-400 sm:text-xs">
                PulsePlay Gaming Network
              </p>

              <h1 className="mt-3 text-5xl font-black leading-[0.9] tracking-[-0.04em] pp-gradient-text sm:text-6xl lg:text-8xl">
                GAME HUB
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Discover featured titles, upcoming releases, and the games
                powering the PulsePlay community.
              </p>
            </div>

            <div className="rounded-2xl border border-green-500/20 bg-black/30 p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-500">
                  Network Status
                </p>
                <span className="text-[9px] font-black uppercase tracking-widest text-green-400">
                  ONLINE
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <span className="h-3 w-3 animate-pulse rounded-full bg-green-400 shadow-[0_0_16px_#22c55e]" />
                <span className="text-lg font-black text-white">
                  GAME DATABASE READY
                </span>
              </div>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                Browse the library below or jump directly into a featured game.
              </p>
            </div>
          </div>

          <div className="relative mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label="Games" value={activeGames.length} tone="cyan" />
            <StatCard
              label="Upcoming"
              value={activeGames.filter((g) => getGameStatus(g) === "upcoming").length}
              tone="blue"
            />
            <StatCard
              label="Released"
              value={activeGames.filter((g) => getGameStatus(g) === "released").length}
              tone="green"
            />
            <StatCard label="Featured" value={featuredGames.length} tone="yellow" />
          </div>
        </section>

        {activeGames.length === 0 ? (
          <BrandCard scan status="DATABASE EMPTY">
            <div className="py-16 text-center">
              <div className="text-5xl">🎮</div>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.3em] text-purple-400">
                No Game Data
              </p>
              <h2 className="mt-2 text-3xl font-black text-white">
                The Game Hub Is Waiting
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">
                Add games through the PulsePlay Admin Dashboard to populate the public library.
              </p>
            </div>
          </BrandCard>
        ) : (
          <>
            {featuredGames.length > 0 && (
              <section className="mb-12">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.35em] text-yellow-400">
                      PulsePlay Spotlight
                    </p>
                    <h2 className="mt-2 text-3xl font-black pp-gradient-text sm:text-4xl">
                      Featured Games
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500">
                    {featuredGames.length} spotlight {featuredGames.length === 1 ? "title" : "titles"}
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {featuredGames.slice(0, 3).map((game) => (
                    <GameCard key={game.id} game={game} featured />
                  ))}
                </div>
              </section>
            )}

            <section>
              <div className="mb-6">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="pp-live-dot" />
                      <p className="text-[10px] font-black uppercase tracking-[0.35em] text-cyan-400">
                        Explore
                      </p>
                    </div>
                    <h2 className="mt-2 text-3xl font-black pp-gradient-text sm:text-4xl">
                      Game Library
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                      Search and filter the complete PulsePlay game database.
                    </p>
                  </div>

                  <div className="w-full lg:max-w-md">
                    <label htmlFor="game-search" className="sr-only">
                      Search games
                    </label>
                    <div className="relative rounded-2xl border border-cyan-500/20 bg-black/30 p-1">
                      <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-cyan-400">
                        ⌕
                      </span>
                      <input
                        id="game-search"
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search games, genres, platforms..."
                        className="w-full rounded-xl bg-transparent py-3.5 pl-11 pr-5 text-sm font-semibold text-white outline-none placeholder:text-slate-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <select
                    value={filter}
                    onChange={(event) => setFilter(event.target.value as GameFilter)}
                    className={selectClass}
                    aria-label="Game status filter"
                  >
                    <option value="all">All Games</option>
                    <option value="featured">Featured</option>
                    <option value="upcoming">Coming Soon</option>
                    <option value="released">Released</option>
                  </select>

                  <select
                    value={genre}
                    onChange={(event) => setGenre(event.target.value)}
                    className={selectClass}
                    aria-label="Genre filter"
                  >
                    <option value="all">All Genres</option>
                    {genres.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>

                  <select
                    value={platform}
                    onChange={(event) => setPlatform(event.target.value)}
                    className={selectClass}
                    aria-label="Platform filter"
                  >
                    <option value="all">All Platforms</option>
                    {platforms.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>

                  <select
                    value={sort}
                    onChange={(event) => setSort(event.target.value as GameSort)}
                    className={selectClass}
                    aria-label="Game sort order"
                  >
                    <option value="featured">Sort: Featured</option>
                    <option value="az">Sort: A–Z</option>
                    <option value="newest">Sort: Newest</option>
                    <option value="release">Sort: Release Date</option>
                  </select>
                </div>

                <div className="mt-4 flex flex-col gap-3 border-y border-white/10 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
                    {filteredGames.length} {filteredGames.length === 1 ? "game" : "games"} found
                  </p>

                  {(search || filter !== "all" || genre !== "all" || platform !== "all" || sort !== "featured") && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="text-left text-[10px] font-black uppercase tracking-[0.18em] text-purple-400 transition hover:text-purple-300 sm:text-right"
                    >
                      Reset Filters →
                    </button>
                  )}
                </div>
              </div>

              {filteredGames.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {filteredGames.map((game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      featured={game.featured === true}
                    />
                  ))}
                </div>
              ) : (
                <BrandCard scan status="NO MATCHES">
                  <div className="py-14 text-center">
                    <div className="text-4xl">⌕</div>
                    <h3 className="mt-4 text-2xl font-black text-white">
                      No Games Found
                    </h3>
                    <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                      Try a different title, genre, platform, or filter.
                    </p>
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="mt-6 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-6 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-300 transition hover:bg-cyan-500/20"
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
