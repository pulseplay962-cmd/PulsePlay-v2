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
      <main className="min-h-[72vh] px-6 py-16 text-white">
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
      <main className="min-h-[72vh] px-6 py-16 text-white">
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
    <main className="min-h-[72vh] px-6 py-12 text-white">
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
            from-purple-950/50
            via-[#070b16]
            to-cyan-950/30
            shadow-[0_0_80px_rgba(34,211,238,.08)]
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-32
              -top-32
              h-96
              w-96
              rounded-full
              bg-purple-500/10
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-40
              -left-32
              h-96
              w-96
              rounded-full
              bg-cyan-500/10
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-cyan-400
              to-transparent
              opacity-70
            "
          />

          <div className="relative grid lg:grid-cols-[1.08fr_.92fr]">

            {/* COVER */}

            <div className="relative min-h-[430px] overflow-hidden lg:min-h-[650px]">
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
                    duration-1000
                    hover:scale-[1.02]
                  "
                  onError={(event) => {
                    console.error(
                      "GAME IMAGE FAILED:",
                      imageUrl
                    );

                    event.currentTarget.style.display =
                      "none";
                  }}
                />
              ) : (
                <div
                  className="
                    flex
                    h-full
                    min-h-[430px]
                    items-center
                    justify-center
                    bg-black/50
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.3em]
                    text-slate-600
                  "
                >
                  NO COVER IMAGE
                </div>
              )}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#05070d]
                  via-black/10
                  to-transparent
                  lg:bg-gradient-to-r
                "
              />

              <div
                className="
                  absolute
                  left-6
                  right-6
                  top-6
                  flex
                  flex-wrap
                  gap-3
                "
              >
                {isFeatured && (
                  <span
                    className="
                      rounded-full
                      border
                      border-yellow-400/30
                      bg-yellow-500/15
                      px-4
                      py-2
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.18em]
                      text-yellow-300
                      backdrop-blur-md
                    "
                  >
                    ★ PRIORITY TARGET
                  </span>
                )}

                <StatusBadge status={status} />
              </div>

              <div
                className="
                  absolute
                  bottom-6
                  left-6
                  right-6
                  flex
                  items-end
                  justify-between
                  gap-4
                "
              >
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-cyan-300/80">
                    PulsePlay Mission File
                  </p>

                  <p className="mt-1 text-xs font-black uppercase tracking-widest text-white/70">
                    {game.platform || "MULTI-PLATFORM"}
                  </p>
                </div>

                <span className="hidden rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-slate-300 backdrop-blur-md sm:inline-flex">
                  {game.genre || "GAME INTELLIGENCE"}
                </span>
              </div>
            </div>

            {/* CORE INTEL */}

            <div className="relative flex flex-col justify-center p-7 md:p-10 lg:p-12">
              <div className="flex items-center gap-3">
                <span className="pp-live-dot" />

                <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400">
                  Game Intelligence Online
                </p>
              </div>

              <h1 className="mt-5 text-5xl font-black leading-[0.95] pp-gradient-text md:text-6xl lg:text-7xl">
                {game.title}
              </h1>

              {game.description && (
                <p className="mt-7 text-base leading-8 text-slate-300 md:text-lg">
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

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <DataCard
                  label="Release Date"
                  value={releaseDate}
                  tone="cyan"
                />

                <DataCard
                  label="Library Status"
                  value={statusLabel}
                  tone={
                    status === "released"
                      ? "green"
                      : "blue"
                  }
                />

                <DataCard
                  label="Deployment"
                  value={
                    game.platform ||
                    "MULTI-PLATFORM"
                  }
                  tone="purple"
                />

                <DataCard
                  label="PulsePlay Intel"
                  value={
                    isFeatured
                      ? "PRIORITY TARGET"
                      : "ACTIVE FILE"
                  }
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
            <DataCard
              label="Mission Status"
              value="INTELLIGENCE ONLINE"
              tone="green"
            />

            <DataCard
              label="Release State"
              value={statusLabel}
              tone={
                status === "released"
                  ? "green"
                  : "blue"
              }
            />

            <DataCard
              label="Platform"
              value={
                game.platform ||
                "MULTI-PLATFORM"
              }
              tone="purple"
            />

            <DataCard
              label="Network Priority"
              value={
                isFeatured
                  ? "PRIORITY TARGET"
                  : "ACTIVE FILE"
              }
              tone="yellow"
            />
          </div>
        </section>

        {/* =====================================================
            GAME INTELLIGENCE
        ====================================================== */}

        {game.article_content && (
          <section className="mb-10">
            <BrandCard
              scan
              status="GAME INTELLIGENCE"
              className="p-7 md:p-10"
            >
              <div className="max-w-4xl">
                <p className="text-xs font-black uppercase tracking-[0.4em] text-purple-400">
                  Mission Briefing
                </p>

                <h2 className="mt-3 text-3xl font-black pp-gradient-text md:text-4xl">
                  About {game.title}
                </h2>

                <div className="mt-7 whitespace-pre-line border-l border-cyan-400/30 pl-5 text-base leading-8 text-slate-300 md:text-lg">
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
