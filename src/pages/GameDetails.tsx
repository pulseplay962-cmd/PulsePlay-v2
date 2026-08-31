import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";

import {
  getGameById,
  type Game,
} from "../services/games";

import {
  getPublishedNews,
  type NewsArticle,
} from "../services/news";

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
  if (!date) return "TBA";

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
        items-center
        rounded-full
        border
        px-4
        py-2
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

function DataCard({
  label,
  value,
  tone = "cyan",
}: {
  label: string;
  value: string;
  tone?: "cyan" | "purple" | "blue" | "green" | "yellow";
}) {
  const styles = {
    cyan: {
      border: "border-cyan-400/20",
      bg: "bg-cyan-500/5",
      text: "text-cyan-300",
    },
    purple: {
      border: "border-purple-400/20",
      bg: "bg-purple-500/5",
      text: "text-purple-300",
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
      <p className="text-[9px] font-black uppercase tracking-[0.28em] text-slate-600">
        {label}
      </p>

      <p
        className={`
          mt-2
          text-sm
          font-black
          uppercase
          tracking-wider
          ${style.text}
        `}
      >
        {value}
      </p>
    </div>
  );
}

function NewsCard({
  article,
}: {
  article: NewsArticle;
}) {
  return (
    <Link
      to={`/news/${article.slug}`}
      className="group block h-full"
    >
      <BrandCard
        status="NEWS FEED"
        className="
          h-full
          overflow-hidden
          p-0
          transition-all
          duration-300
          group-hover:-translate-y-2
          group-hover:border-cyan-400/40
          group-hover:shadow-[0_0_35px_rgba(34,211,238,.10)]
        "
      >
        {article.image ? (
          <div className="relative overflow-hidden">
            <img
              src={cleanImageUrl(article.image)}
              alt={article.title}
              className="
                h-48
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

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-t
                from-black
                via-transparent
                to-transparent
              "
            />
          </div>
        ) : (
          <div
            className="
              flex
              h-48
              items-center
              justify-center
              bg-black/40
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

        <div className="p-6">
          {article.category && (
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-purple-300">
              {article.category}
            </p>
          )}

          <h3
            className="
              mt-3
              text-xl
              font-black
              leading-tight
              text-white
              transition-colors
              group-hover:text-cyan-300
            "
          >
            {article.title}
          </h3>

          {article.excerpt && (
            <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-400">
              {article.excerpt}
            </p>
          )}

          <p className="mt-5 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">
            Read Intelligence →
          </p>
        </div>
      </BrandCard>
    </Link>
  );
}

export default function GameDetails() {
  const { id } = useParams<{ id: string }>();

  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [relatedNews, setRelatedNews] =
    useState<NewsArticle[]>([]);

  useEffect(() => {
    async function loadGame() {
      try {
        if (!id) {
          setErrorMessage("No game ID was provided.");
          setGame(null);
          return;
        }

        setLoading(true);
        setErrorMessage("");

        const data = await getGameById(id);

        if (!data) {
          setGame(null);
          setErrorMessage(
            `No game was found with ID: ${id}`
          );
          return;
        }

        setGame(data);
      } catch (error) {
        console.error(
          "FAILED TO LOAD GAME DETAILS:",
          error
        );

        setGame(null);

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "An unknown error occurred."
        );
      } finally {
        setLoading(false);
      }
    }

    loadGame();
  }, [id]);

  useEffect(() => {
    async function loadRelatedNews() {
      if (!game?.title) {
        return;
      }

      try {
        const articles = await getPublishedNews();

        const gameTitle =
          game.title.toLowerCase();

        const matches = articles
          .filter((article) => {
            const title =
              article.title?.toLowerCase() || "";

            const content =
              article.content?.toLowerCase() || "";

            const excerpt =
              article.excerpt?.toLowerCase() || "";

            return (
              title.includes(gameTitle) ||
              content.includes(gameTitle) ||
              excerpt.includes(gameTitle)
            );
          })
          .slice(0, 3);

        setRelatedNews(matches);
      } catch (error) {
        console.error(
          "RELATED NEWS ERROR:",
          error
        );

        setRelatedNews([]);
      }
    }

    loadRelatedNews();
  }, [game]);

  const imageUrl = useMemo(
    () => cleanImageUrl(game?.image),
    [game?.image]
  );

  if (loading) {
    return (
      <main className="min-h-[72vh] px-4 py-10 text-white sm:px-6 sm:py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <BrandCard
            scan
            status="GAME SYSTEM"
            className="p-8 md:p-10"
          >
            <div className="flex items-center gap-4">
              <span className="pp-live-dot" />

              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
                  PulsePlay Game Intelligence
                </p>

                <h1 className="mt-2 text-3xl font-black uppercase md:text-4xl">
                  Establishing Connection...
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Loading mission file and related intelligence.
                </p>
              </div>
            </div>
          </BrandCard>
        </div>
      </main>
    );
  }

  if (!game) {
    return (
      <main className="min-h-[72vh] px-4 py-10 text-white sm:px-6 sm:py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <BrandCard
            scan
            status="GAME DATA OFFLINE"
            className="p-8 md:p-10"
          >
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-red-400">
                Intelligence Error
              </p>

              <h1 className="mt-4 text-4xl font-black md:text-5xl">
                Game Not Found
              </h1>

              <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-400">
                The requested game could not be located in
                the PulsePlay mission database.
              </p>

              {id && (
                <div className="mx-auto mt-6 max-w-xl rounded-xl border border-white/10 bg-black/30 p-4">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">
                    Requested File
                  </p>

                  <p className="mt-2 break-all font-mono text-sm text-cyan-400">
                    {id}
                  </p>
                </div>
              )}

              {errorMessage && (
                <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                  <p className="text-sm leading-6 text-red-300">
                    {errorMessage}
                  </p>
                </div>
              )}

              <div className="mt-8">
                <Link to="/games">
                  <BrandButton variant="secondary">
                    ← Back to Game Library
                  </BrandButton>
                </Link>
              </div>
            </div>
          </BrandCard>
        </div>
      </main>
    );
  }

  const status = getGameStatus(game);
  const statusLabel =
    status === "upcoming"
      ? "COMING SOON"
      : status === "released"
        ? "RELEASED"
        : status.toUpperCase();

  const isFeatured = game.featured === true;
  const releaseDate = formatReleaseDate(
    game.release_date
  );

  return (
    <main className="min-h-[72vh] px-4 py-10 text-white sm:px-6 sm:py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            NAVIGATION
        ====================================================== */}

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link to="/games">
            <BrandButton
              variant="secondary"
              className="px-5 py-2.5"
            >
              ← Game Library
            </BrandButton>
          </Link>

          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">
            <span className="pp-live-dot" />
            Mission File Online
          </div>
        </div>

        {/* =====================================================
            COMMAND HERO
        ====================================================== */}

        <section
          className="
            relative
            mb-10
            overflow-hidden
            rounded-[2rem]
            border
            border-cyan-400/20
            bg-gradient-to-br
            from-cyan-950/30
            via-[#050811]
            to-purple-950/50
            shadow-[0_0_100px_rgba(34,211,238,.08)]
          "
        >
          <div className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-purple-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:48px_48px] opacity-30" />

          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />

          <div className="relative grid lg:grid-cols-[1.05fr_.95fr]">

            {/* COVER */}

            <div className="group relative min-h-[460px] overflow-hidden border-b border-white/10 lg:min-h-[680px] lg:border-b-0 lg:border-r">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={game.title}
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-[1200ms]
                    group-hover:scale-[1.04]
                  "
                  onError={(event) => {
                    console.error("GAME IMAGE FAILED:", imageUrl);
                    event.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="flex h-full min-h-[460px] items-center justify-center bg-black/50 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
                  NO COVER IMAGE
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#03050a] via-black/20 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#050811]/80" />

              <div className="absolute left-6 right-6 top-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-3">
                  {isFeatured && (
                    <span className="rounded-full border border-yellow-400/30 bg-yellow-500/15 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-yellow-300 backdrop-blur-md">
                      ★ PRIORITY TARGET
                    </span>
                  )}

                  <StatusBadge status={status} />
                </div>

                <span className="rounded-full border border-white/10 bg-black/40 px-3 py-2 text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 backdrop-blur-md">
                  FILE // ACTIVE
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.35em] text-cyan-300">
                      PulsePlay Mission File
                    </p>

                    <p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-white/70">
                      {game.platform || "MULTI-PLATFORM"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md">
                    <p className="text-[8px] font-black uppercase tracking-[0.25em] text-slate-600">
                      Release
                    </p>

                    <p className="mt-1 text-sm font-black text-white">
                      {releaseDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CORE INTEL */}

            <div className="relative flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="pp-live-dot" />

                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">
                    Game Intelligence Online
                  </p>
                </div>

                <span className="hidden font-mono text-[9px] uppercase tracking-widest text-slate-600 sm:block">
                  PP // INTEL
                </span>
              </div>

              <p className="mt-7 text-xs font-black uppercase tracking-[0.4em] text-purple-400">
                Mission Database // Active File
              </p>

              <h1 className="mt-3 max-w-4xl text-5xl font-black leading-[0.86] tracking-[-0.04em] pp-gradient-text sm:text-6xl md:text-7xl lg:text-8xl">
                {game.title}
              </h1>

              {game.description && (
                <p className="mt-7 max-w-3xl text-base leading-8 text-slate-300 md:text-lg lg:text-xl">
                  {game.description}
                </p>
              )}

              <div className="mt-7 flex flex-wrap gap-2">
                {game.category && (
                  <span className="rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-cyan-300">
                    {game.category}
                  </span>
                )}

                {game.genre && (
                  <span className="rounded-full border border-purple-500/20 bg-purple-500/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-purple-300">
                    {game.genre}
                  </span>
                )}

                {game.platform && (
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-300">
                    {game.platform}
                  </span>
                )}
              </div>

              <div className="mt-8 flex items-center gap-3 border-y border-white/10 py-4">
                <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />

                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Intelligence File Active
                </span>

                <span className="ml-auto font-mono text-[9px] uppercase tracking-widest text-slate-600">
                  {isFeatured ? "PRIORITY" : "STANDARD"}
                </span>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <DataCard
                  label="Release Date"
                  value={releaseDate}
                  tone="cyan"
                />

                <DataCard
                  label="Library Status"
                  value={statusLabel}
                  tone={status === "released" ? "green" : "blue"}
                />

                <DataCard
                  label="Deployment"
                  value={game.platform || "MULTI-PLATFORM"}
                  tone="purple"
                />

                <DataCard
                  label="PulsePlay Intel"
                  value={isFeatured ? "PRIORITY TARGET" : "ACTIVE FILE"}
                  tone="yellow"
                />
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/games">
                  <BrandButton>
                    Explore Game Library
                  </BrandButton>
                </Link>

                {relatedNews.length > 0 && (
                  <a
                    href="#game-news"
                    className="
                      inline-flex
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-purple-500/40
                      bg-purple-500/10
                      px-7
                      py-3
                      text-sm
                      font-black
                      uppercase
                      tracking-wider
                      text-purple-300
                      transition-all
                      hover:-translate-y-1
                      hover:bg-purple-500/20
                    "
                  >
                    📰 Game News
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            STATUS STRIP
        ====================================================== */}

        <section className="mb-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="group relative overflow-hidden rounded-2xl border border-green-400/20 bg-green-500/[0.04] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-green-400/40 hover:bg-green-500/[0.07]">
              <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-green-400/10 blur-2xl" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-black uppercase tracking-[0.28em] text-slate-600">
                    Mission Status
                  </p>

                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-400 shadow-[0_0_12px_#22c55e]" />
                </div>

                <p className="mt-3 text-sm font-black uppercase tracking-wider text-green-300">
                  Intelligence Online
                </p>
              </div>
            </div>

            <DataCard
              label="Release State"
              value={statusLabel}
              tone={status === "released" ? "green" : "blue"}
            />

            <DataCard
              label="Platform"
              value={game.platform || "MULTI-PLATFORM"}
              tone="purple"
            />

            <div className="group relative overflow-hidden rounded-2xl border border-yellow-400/20 bg-yellow-500/[0.04] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-yellow-500/[0.07]">
              <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-yellow-400/10 blur-2xl" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-black uppercase tracking-[0.28em] text-slate-600">
                    Network Priority
                  </p>

                  <span className="text-sm text-yellow-300">
                    ★
                  </span>
                </div>

                <p className="mt-3 text-sm font-black uppercase tracking-wider text-yellow-300">
                  {isFeatured ? "Priority Target" : "Active File"}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* =====================================================
            MISSION SIGNAL
        ====================================================== */}

        <section className="mb-10">
          <BrandCard
            status="MISSION SIGNAL"
            className="overflow-hidden border-cyan-400/20 bg-gradient-to-br from-cyan-950/10 via-black/20 to-purple-950/10 shadow-[0_0_60px_rgba(34,211,238,.05)]"
          >
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">

              <div>
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_14px_#22d3ee]" />

                  <p className="text-[10px] font-black uppercase tracking-[0.35em] text-cyan-400">
                    Active Mission File
                  </p>
                </div>

                <h2 className="mt-3 text-2xl font-black tracking-tight text-white md:text-3xl lg:text-4xl">
                  {status === "upcoming"
                    ? "Prepare for Deployment"
                    : "Mission Intelligence Available"}
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400 md:text-base">
                  {status === "upcoming"
                    ? `${game.title} is currently tracked as an upcoming release in the PulsePlay database.`
                    : `PulsePlay is tracking ${game.title} as an active game file within the network.`}
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-400/10 bg-black/30 px-6 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,.04)]">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">
                  File Status
                </p>

                <p className="mt-2 text-lg font-black uppercase tracking-wider text-cyan-300">
                  {statusLabel}
                </p>

                <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-slate-600">
                  PP // {isFeatured ? "PRIORITY" : "STANDARD"}
                </p>
              </div>

            </div>
          </BrandCard>
        </section>

        {/* =====================================================
            GAME INTELLIGENCE
        ====================================================== */}

        {game.article_content && (
          <section className="mb-10">
            <BrandCard
              scan
              status="GAME INTELLIGENCE"
              className="relative overflow-hidden p-6 sm:p-8 md:p-10 lg:p-12"
            >
              <div className="max-w-4xl">
                <p className="text-xs font-black uppercase tracking-[0.4em] text-purple-400">
                  Mission Briefing
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight pp-gradient-text md:text-4xl lg:text-5xl">
                  About {game.title}
                </h2>

                <div className="mt-8 whitespace-pre-line border-l-2 border-cyan-400/30 pl-5 text-base leading-8 text-slate-300 md:pl-7 md:text-lg md:leading-9">
                  {game.article_content}
                </div>
              </div>
            </BrandCard>
          </section>
        )}

        {/* =====================================================
            GAME PROFILE
        ====================================================== */}

        <section className="mb-14">
          <div className="mb-7">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400">
              System Data
            </p>

            <h2 className="mt-2 text-3xl font-black pp-gradient-text md:text-4xl">
              Game Profile
            </h2>

            <p className="mt-2 max-w-3xl text-slate-400">
              Core metadata currently registered in the
              PulsePlay mission database.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {game.category && (
              <DataCard
                label="Category"
                value={game.category}
                tone="cyan"
              />
            )}

            {game.genre && (
              <DataCard
                label="Genre"
                value={game.genre}
                tone="purple"
              />
            )}

            {game.platform && (
              <DataCard
                label="Platform"
                value={game.platform}
                tone="blue"
              />
            )}

            <DataCard
              label="Release"
              value={releaseDate}
              tone="green"
            />
          </div>
        </section>

        {/* =====================================================
            RELATED NEWS
        ====================================================== */}

        {relatedNews.length > 0 && (
          <section
            id="game-news"
            className="border-t border-white/10 pt-10 pb-16"
          >
            <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.4em] text-purple-400">
                  Live Intelligence Feed
                </p>

                <h2 className="mt-2 text-3xl font-black pp-gradient-text md:text-5xl">
                  Latest {game.title} News
                </h2>

                <p className="mt-3 max-w-3xl text-slate-400">
                  The latest PulsePlay coverage connected
                  to this mission file.
                </p>
              </div>

              <Link to="/news">
                <BrandButton variant="secondary">
                  View All News
                </BrandButton>
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {relatedNews.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                />
              ))}
            </div>
          </section>
        )}

        {/* =====================================================
            RETURN
        ====================================================== */}

        <div className="border-t border-white/10 py-8">
          <Link
            to="/games"
            className="
              text-[10px]
              font-black
              uppercase
              tracking-[0.25em]
              text-cyan-400
              transition-colors
              hover:text-cyan-300
            "
          >
            ← Return To Game Command Center
          </Link>
        </div>
      </div>
    </main>
  );
}
