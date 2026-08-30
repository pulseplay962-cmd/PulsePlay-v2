import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";

import {
  getNewsBySlug,
  type NewsArticle as Article,
} from "../services/news";

import {
  getGames,
  type Game,
} from "../services/games";

import {
  trackPageView,
} from "../services/analytics";

function cleanImageUrl(image?: string | null) {
  if (!image) {
    return "";
  }

  if (image.startsWith("[")) {
    const markdownMatch = image.match(/\((https?:\/\/[^)]+)\)/);

    if (markdownMatch?.[1]) {
      return markdownMatch[1];
    }
  }

  return image;
}

function formatDate(date?: string | null) {
  if (!date) {
    return "DATE UNKNOWN";
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function NewsArticle() {
  const { slug } = useParams();

  const [article, setArticle] =
    useState<Article | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [featuredGames, setFeaturedGames] =
    useState<Game[]>([]);

  /*
   * ======================================
   * Load Article
   * ======================================
   */

  useEffect(() => {
    async function loadArticle() {
      if (!slug) {
        setError("No article slug provided");
        setLoading(false);
        return;
      }

      try {
        console.log(
          "Loading news article:",
          slug
        );

        const data =
          await getNewsBySlug(slug);

        console.log(
          "📰 NEWS ARTICLE DATA RESULT:",
          data
        );

        if (!data) {
          console.error(
            "❌ NEWS ARTICLE RETURNED NULL:",
            slug
          );

          throw new Error(
            "Article does not exist"
          );
        }

        setArticle(data);

        /*
         * ======================================
         * Article Analytics
         * ======================================
         */

        console.log(
          "🔥🔥 NEWS ARTICLE ANALYTICS START",
          {
            slug,
            id: data.id,
            title: data.title,
          }
        );

        const analyticsResult =
          await trackPageView(
            `/news/${slug}`,
            {
              contentType: "news",
              contentId: String(data.id),
              contentTitle: data.title,
            }
          );

        console.log(
          "🔥🔥 NEWS ARTICLE ANALYTICS RESULT:",
          analyticsResult
        );
      } catch (error: any) {
        console.error(
          "NEWS ARTICLE ERROR:",
          error
        );

        setError(
          error?.message ||
          "Unable to load article"
        );

        setArticle(null);
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, [slug]);

  /*
   * ======================================
   * Featured Games
   * ======================================
   */

  useEffect(() => {
    async function loadFeaturedGames() {
      try {
        const games = await getGames();

        const featured = games
          .filter(
            (game) =>
              game.featured === true
          )
          .slice(0, 3);

        setFeaturedGames(featured);
      } catch (error) {
        console.error(
          "FEATURED GAMES ERROR:",
          error
        );
      }
    }

    loadFeaturedGames();
  }, []);

  /*
   * ======================================
   * Loading State
   * ======================================
   */

  if (loading) {
    return (
      <main className="min-h-[72vh] px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <BrandCard
            scan
            status="INTELLIGENCE NETWORK"
            className="p-10"
          >
            <div className="flex items-center gap-5">
              <span className="pp-live-dot h-3 w-3 rounded-full bg-cyan-400" />

              <div>
                <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400">
                  PulsePlay Intelligence Network
                </p>

                <h1 className="mt-3 text-3xl font-black uppercase text-white md:text-5xl">
                  Establishing Connection...
                </h1>

                <p className="mt-3 text-slate-500">
                  Retrieving intelligence transmission.
                </p>
              </div>
            </div>
          </BrandCard>
        </div>
      </main>
    );
  }

  /*
   * ======================================
   * Error State
   * ======================================
   */

  if (error || !article) {
    return (
      <main className="min-h-[72vh] px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <BrandCard
            status="INTELLIGENCE OFFLINE"
            className="border-red-500/20 p-8 md:p-12"
          >
            <div className="text-center">
              <span className="text-5xl">⚠️</span>

              <p className="mt-6 text-xs font-black uppercase tracking-[0.4em] text-red-400">
                Transmission Failure
              </p>

              <h1 className="mt-3 text-4xl font-black text-white md:text-5xl">
                Intel Not Found
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                {error ||
                  "The requested report does not exist in the PulsePlay intelligence network."}
              </p>

              <div className="mt-8">
                <Link to="/news">
                  <BrandButton variant="secondary">
                    ← Return To Intelligence Feed
                  </BrandButton>
                </Link>
              </div>
            </div>
          </BrandCard>
        </div>
      </main>
    );
  }

  const imageUrl =
    cleanImageUrl(article.image);

  const publishedDate =
    article.published_at ||
    article.created_at;

  const isFeatured =
    article.featured === true;

  return (
    <main className="min-h-[72vh] px-6 py-12 text-white md:py-16">
      <div className="mx-auto max-w-7xl">

        {/* =========================================
            NAVIGATION
        ========================================== */}

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link to="/news">
            <BrandButton
              variant="secondary"
              className="px-5 py-2"
            >
              ← Intelligence Feed
            </BrandButton>
          </Link>

          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400 shadow-[0_0_14px_rgba(34,197,94,.8)]" />

            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-300">
              Network Online
            </span>
          </div>
        </div>

        {/* =========================================
            ARTICLE HERO
        ========================================== */}

        <article>
          <BrandCard
            scan={isFeatured}
            status={
              isFeatured
                ? "PRIORITY INTELLIGENCE"
                : "INTELLIGENCE TRANSMISSION"
            }
            className={`
              overflow-hidden
              p-0
              ${
                isFeatured
                  ? "border-pink-400/30"
                  : "border-cyan-500/20"
              }
            `}
          >

            {/* HERO IMAGE */}

            {imageUrl && (
              <div className="relative h-[320px] overflow-hidden md:h-[480px] lg:h-[560px]">
                <img
                  src={imageUrl}
                  alt={article.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(event) => {
                    console.error(
                      "NEWS ARTICLE IMAGE FAILED:",
                      imageUrl
                    );

                    event.currentTarget.style.display =
                      "none";
                  }}
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05070d] via-black/20 to-transparent" />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-purple-950/20 via-transparent to-cyan-950/20" />

                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-3 md:bottom-8 md:left-8 md:right-8">
                  <div className="flex flex-wrap gap-3">
                    {article.category && (
                      <span className="rounded-full border border-cyan-400/30 bg-black/70 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-cyan-300 backdrop-blur-md">
                        {article.category}
                      </span>
                    )}

                    {isFeatured && (
                      <span className="rounded-full border border-pink-400/30 bg-pink-500/20 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-pink-300 backdrop-blur-md">
                        ⭐ Priority
                      </span>
                    )}
                  </div>

                  <span className="rounded-full border border-white/10 bg-black/70 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 backdrop-blur-md">
                    Intelligence Report
                  </span>
                </div>
              </div>
            )}

            {/* ARTICLE HEADER */}

            <div className="p-7 md:p-10 lg:p-12">

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.35em] text-cyan-400">
                  PulsePlay Intelligence
                </span>

                <span className="h-px w-8 bg-white/20" />

                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-600">
                  Report ID: {article.id}
                </span>
              </div>

              {!imageUrl && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {article.category && (
                    <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-cyan-300">
                      {article.category}
                    </span>
                  )}

                  {isFeatured && (
                    <span className="rounded-full border border-pink-400/30 bg-pink-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-pink-300">
                      ⭐ Priority
                    </span>
                  )}
                </div>
              )}

              <h1 className="mt-6 max-w-6xl text-4xl font-black leading-[1.02] tracking-tight pp-gradient-text md:text-6xl lg:text-7xl">
                {article.title}
              </h1>

              {article.excerpt && (
                <p className="mt-7 max-w-4xl border-l-4 border-cyan-400 pl-5 text-lg leading-8 text-slate-300 md:text-xl">
                  {article.excerpt}
                </p>
              )}

              {/* METADATA HUD */}

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-600">
                    Classification
                  </p>

                  <p className="mt-2 text-sm font-black uppercase text-cyan-300">
                    {article.category ||
                      "Gaming Intel"}
                  </p>
                </div>

                <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-600">
                    Transmission Date
                  </p>

                  <p className="mt-2 text-sm font-black text-purple-300">
                    {formatDate(publishedDate)}
                  </p>
                </div>

                <div className="rounded-xl border border-pink-500/20 bg-pink-500/5 p-4">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-600">
                    Priority
                  </p>

                  <p className="mt-2 text-sm font-black uppercase text-pink-300">
                    {isFeatured
                      ? "Priority Intel"
                      : "Standard Intel"}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-600">
                    Analyst
                  </p>

                  <p className="mt-2 truncate text-sm font-black text-white">
                    {article.author ||
                      "PulsePlay Intelligence"}
                  </p>
                </div>

              </div>

            </div>
          </BrandCard>

          {/* =========================================
              ARTICLE CONTENT
          ========================================== */}

          <section className="mt-10">
            <BrandCard
              status="INTELLIGENCE REPORT"
              className="p-7 md:p-10 lg:p-12"
            >
              <div className="mb-8 flex flex-col gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.4em] text-purple-400">
                    Full Transmission
                  </p>

                  <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">
                    Intelligence Report
                  </h2>
                </div>

                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-600">
                  PULSEPLAY // VERIFIED REPORT
                </span>
              </div>

              <div className="max-w-4xl whitespace-pre-line text-base leading-8 text-slate-300 md:text-lg md:leading-9">
                {article.content}
              </div>
            </BrandCard>
          </section>

          {/* =========================================
              COMMUNITY TRANSMISSION
          ========================================== */}

          {article.facebook_post && (
            <section className="mt-10">
              <BrandCard
                status="COMMUNITY TRANSMISSION"
                className="border-purple-500/20 p-7 md:p-9"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.4em] text-purple-400">
                      Social Intelligence
                    </p>

                    <h2 className="mt-2 text-2xl font-black text-white md:text-3xl">
                      Community Transmission
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                      The social transmission generated for
                      this PulsePlay report.
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full border border-purple-400/20 bg-purple-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-purple-300">
                    Social Feed
                  </span>
                </div>

                <div className="mt-7 rounded-2xl border border-white/10 bg-black/30 p-6">
                  <p className="whitespace-pre-line text-base leading-8 text-slate-300">
                    {article.facebook_post}
                  </p>
                </div>
              </BrandCard>
            </section>
          )}

        </article>

        {/* =========================================
            KEEP EXPLORING
        ========================================== */}

        {featuredGames.length > 0 && (
          <section className="mt-14 pb-10">

            <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400">
                  Continue Intelligence
                </p>

                <h2 className="mt-2 text-3xl font-black pp-gradient-text md:text-4xl">
                  Keep Exploring PulsePlay
                </h2>

                <p className="mt-2 max-w-3xl text-slate-400">
                  Discover featured games across the PulsePlay gaming network.
                </p>
              </div>

              <Link to="/games">
                <BrandButton variant="secondary">
                  View Game Library
                </BrandButton>
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {featuredGames.map((game) => {
                const gameImage =
                  cleanImageUrl(game.image);

                return (
                  <Link
                    key={game.id}
                    to={`/games/${game.id}`}
                    className="group"
                  >
                    <BrandCard
                      hover={false}
                      status="FEATURED GAME"
                      className="
                        h-full
                        overflow-hidden
                        p-0
                        transition-all
                        duration-300
                        group-hover:-translate-y-2
                        group-hover:border-cyan-400/40
                      "
                    >
                      {gameImage ? (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={gameImage}
                            alt={game.title}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                            onError={(event) => {
                              event.currentTarget.style.display =
                                "none";
                            }}
                          />

                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        </div>
                      ) : (
                        <div className="flex h-48 items-center justify-center bg-black/40 text-[10px] font-black uppercase tracking-widest text-slate-600">
                          No Cover Image
                        </div>
                      )}

                      <div className="p-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">
                          {game.status === "released"
                            ? "Released"
                            : "Upcoming"}
                        </p>

                        <h3 className="mt-3 text-xl font-black text-white transition group-hover:text-cyan-300">
                          {game.title}
                        </h3>

                        <p className="mt-5 text-[10px] font-black uppercase tracking-widest text-purple-300">
                          View Game Intelligence →
                        </p>
                      </div>
                    </BrandCard>
                  </Link>
                );
              })}
            </div>

          </section>
        )}

        {/* =========================================
            NETWORK FOOTER
        ========================================== */}

        <div className="flex flex-col gap-3 border-t border-white/10 py-8 text-[10px] font-black uppercase tracking-[0.25em] text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <span>
            PULSEPLAY INTELLIGENCE NETWORK // REPORT COMPLETE
          </span>

          <Link
            to="/news"
            className="text-cyan-500 transition-colors hover:text-cyan-300"
          >
            Return To Intelligence Feed →
          </Link>
        </div>

      </div>
    </main>
  );
}
