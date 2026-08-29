import { useEffect, useState } from "react";
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

        const gameTitle = game.title.toLowerCase();

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

  if (loading) {
    return (
      <main className="min-h-[72vh] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <BrandCard>
            <div className="flex items-center gap-4">
              <span className="pp-live-dot" />

              <div>
                <p className="font-black uppercase tracking-widest text-cyan-400">
                  PulsePlay Intelligence
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

  if (!game) {
    return (
      <main className="min-h-[72vh] px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <BrandCard status="GAME DATA OFFLINE">
            <div className="text-center">
              <p className="text-sm font-black uppercase tracking-[0.35em] text-red-400">
                Intelligence Error
              </p>

              <h1 className="mt-4 text-4xl font-black text-white">
                Game Not Found
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                The requested game could not be located
                in the PulsePlay game library.
              </p>

              {id && (
                <p className="mt-4 break-all text-sm text-cyan-400">
                  GAME ID: {id}
                </p>
              )}

              {errorMessage && (
                <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                  <p className="text-sm text-red-300">
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

  let imageUrl = game.image || "";

  if (imageUrl.startsWith("[")) {
    const markdownMatch = imageUrl.match(
      /\((https?:\/\/[^)]+)\)/
    );

    if (markdownMatch?.[1]) {
      imageUrl = markdownMatch[1];
    }
  }

  const isFeatured = game.featured === true;

  const gameStatus =
    game.status ||
    (game.release_date &&
    new Date(game.release_date) <= new Date()
      ? "released"
      : "upcoming");

  const statusLabel =
    gameStatus === "upcoming"
      ? "COMING SOON"
      : gameStatus === "released"
        ? "RELEASED"
        : gameStatus.toUpperCase();

  const statusClass =
    gameStatus === "upcoming"
      ? "border-blue-400/30 bg-blue-500/10 text-blue-300"
      : gameStatus === "released"
        ? "border-green-400/30 bg-green-500/10 text-green-300"
        : "border-white/10 bg-white/5 text-slate-300";

  return (
    <main className="min-h-[72vh] px-6 py-12">

      <div className="mx-auto max-w-7xl">

        {/* BACK */}

        <div className="mb-8">
          <Link to="/games">
            <BrandButton
              variant="secondary"
              className="px-5 py-2"
            >
              ← Game Library
            </BrandButton>
          </Link>
        </div>

        {/* HERO */}

        <BrandCard
          className="p-0"
          status="GAME INTELLIGENCE ONLINE"
        >
          <div className="relative overflow-hidden rounded-2xl">

            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-cyan-900/20 pointer-events-none" />

            <div className="grid gap-0 lg:grid-cols-[1.05fr_.95fr]">

              {/* IMAGE */}

              <div className="relative min-h-[420px] lg:min-h-[620px]">

                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={game.title}
                    className="absolute inset-0 h-full w-full object-cover"
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
                  <div className="flex h-full min-h-[420px] items-center justify-center bg-black/40 text-slate-500">
                    No Cover Image
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-transparent to-transparent lg:bg-gradient-to-r" />

                <div className="absolute bottom-6 left-6 flex flex-wrap gap-3">

                  {isFeatured && (
                    <span className="rounded-full border border-yellow-400/30 bg-yellow-500/20 px-4 py-2 text-xs font-black uppercase tracking-wider text-yellow-300">
                      ⭐ Featured
                    </span>
                  )}

                  <span
                    className={`rounded-full border px-4 py-2 text-xs font-black uppercase tracking-wider ${statusClass}`}
                  >
                    {statusLabel}
                  </span>

                </div>
              </div>

              {/* INFORMATION */}

              <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">

                <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400">
                  PulsePlay Game Intelligence
                </p>

                <h1 className="mt-5 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
                  {game.title}
                </h1>

                {game.description && (
                  <p className="mt-6 text-lg leading-8 text-slate-300">
                    {game.description}
                  </p>
                )}

                {/* TAGS */}

                <div className="mt-7 flex flex-wrap gap-3">

                  {game.category && (
                    <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-bold text-cyan-300">
                      {game.category}
                    </span>
                  )}

                  {game.genre && (
                    <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm font-bold text-purple-300">
                      {game.genre}
                    </span>
                  )}

                  {game.platform && (
                    <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-300">
                      {game.platform}
                    </span>
                  )}

                </div>

                {/* INTELLIGENCE GRID */}

                <div className="mt-8 grid gap-3 sm:grid-cols-2">

                  {game.release_date && (
                    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                        Release Date
                      </p>

                      <p className="mt-2 font-black text-cyan-400">
                        {new Date(
                          game.release_date
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                      Library Status
                    </p>

                    <p className="mt-2 font-black uppercase text-white">
                      {statusLabel}
                    </p>
                  </div>

                </div>

                {/* CTA */}

                <div className="mt-8 flex flex-wrap gap-4">

                  <Link to="/games">
                    <BrandButton>
                      Explore Game Library
                    </BrandButton>
                  </Link>

                  {relatedNews.length > 0 && (
                    <a
                      href="#game-news"
                      className="inline-flex items-center justify-center rounded-xl border border-purple-500/40 bg-purple-500/10 px-7 py-3 font-black uppercase tracking-wider text-purple-300 transition-all hover:-translate-y-1 hover:bg-purple-500/20"
                    >
                      📰 Game News
                    </a>
                  )}

                </div>

              </div>

            </div>
          </div>
        </BrandCard>

        {/* ABOUT */}

        {game.article_content && (
          <section className="mt-10">
            <BrandCard status="GAME INTELLIGENCE">

              <div className="max-w-4xl">

                <p className="text-xs font-black uppercase tracking-[0.4em] text-purple-400">
                  Game Intelligence
                </p>

                <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">
                  About {game.title}
                </h2>

                <div className="mt-6 whitespace-pre-line text-lg leading-8 text-slate-300">
                  {game.article_content}
                </div>

              </div>

            </BrandCard>
          </section>
        )}

        {/* GAME METADATA */}

        <section className="mt-10">

          <div className="mb-6">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400">
              System Data
            </p>

            <h2 className="mt-2 text-3xl font-black text-white">
              Game Profile
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {game.category && (
              <BrandCard
                status="CATEGORY"
                className="p-5"
              >
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Category
                </p>

                <p className="mt-2 text-xl font-black text-white">
                  {game.category}
                </p>
              </BrandCard>
            )}

            {game.genre && (
              <BrandCard
                status="GENRE"
                className="p-5"
              >
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Genre
                </p>

                <p className="mt-2 text-xl font-black text-white">
                  {game.genre}
                </p>
              </BrandCard>
            )}

            {game.platform && (
              <BrandCard
                status="PLATFORM"
                className="p-5"
              >
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Platform
                </p>

                <p className="mt-2 text-xl font-black text-white">
                  {game.platform}
                </p>
              </BrandCard>
            )}

            {game.release_date && (
              <BrandCard
                status="RELEASE"
                className="p-5"
              >
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Release
                </p>

                <p className="mt-2 text-xl font-black text-cyan-400">
                  {new Date(
                    game.release_date
                  ).toLocaleDateString()}
                </p>
              </BrandCard>
            )}

          </div>
        </section>

        {/* RELATED NEWS */}

        {relatedNews.length > 0 && (
          <section
            id="game-news"
            className="mt-14 pb-16"
          >

            <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

              <div>
                <p className="text-xs font-black uppercase tracking-[0.4em] text-purple-400">
                  Live Intelligence Feed
                </p>

                <h2 className="mt-2 text-3xl font-black pp-gradient-text md:text-4xl">
                  Latest {game.title} News
                </h2>

                <p className="mt-2 max-w-3xl text-slate-400">
                  The latest PulsePlay coverage connected to this game.
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
                <Link
                  key={article.id}
                  to={`/news/${article.slug}`}
                  className="group"
                >

                  <BrandCard
                    className="h-full p-0 transition-all duration-300 group-hover:-translate-y-1"
                    status="NEWS FEED"
                  >

                    {article.image && (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-48 w-full rounded-t-2xl object-cover transition duration-500 group-hover:scale-[1.02]"
                      />
                    )}

                    <div className="p-6">

                      {article.category && (
                        <p className="text-xs font-black uppercase tracking-widest text-purple-300">
                          {article.category}
                        </p>
                      )}

                      <h3 className="mt-3 text-xl font-black text-white transition group-hover:text-cyan-300">
                        {article.title}
                      </h3>

                      {article.excerpt && (
                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400">
                          {article.excerpt}
                        </p>
                      )}

                      <p className="mt-5 text-sm font-black uppercase tracking-wider text-cyan-400">
                        Read Article →
                      </p>

                    </div>

                  </BrandCard>

                </Link>
              ))}

            </div>

          </section>
        )}

      </div>
    </main>
  );
}
