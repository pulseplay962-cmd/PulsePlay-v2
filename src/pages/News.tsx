import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  getPublishedNews,
  type NewsArticle,
} from "../services/news";

import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";

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

  return parsed.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getArticleDate(article: NewsArticle) {
  const candidate =
    (article as NewsArticle & {
      published_at?: string | null;
      created_at?: string | null;
      date?: string | null;
    }).published_at ??
    (article as NewsArticle & {
      created_at?: string | null;
    }).created_at ??
    (article as NewsArticle & {
      date?: string | null;
    }).date;

  return candidate || null;
}

function ArticleCard({
  article,
  featured = false,
}: {
  article: NewsArticle;
  featured?: boolean;
}) {
  const imageUrl = cleanImageUrl(article.image);
  const publishedDate = getArticleDate(article);

  return (
    <Link
      to={`/news/${article.slug}`}
      className="group block h-full"
    >
      <BrandCard
        hover={false}
        status={
          featured
            ? "PRIORITY TRANSMISSION"
            : "INTELLIGENCE"
        }
        className={`
          h-full
          overflow-hidden
          p-0
          transition-all
          duration-300
          ${
            featured
              ? "border-pink-400/20 group-hover:border-pink-400/50 group-hover:shadow-[0_0_40px_rgba(236,72,153,.14)]"
              : "group-hover:border-cyan-400/40"
          }
          group-hover:-translate-y-2
        `}
      >
        <div className="relative overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={article.title}
              className={`
                w-full
                object-cover
                transition-transform
                duration-700
                group-hover:scale-105
                ${featured ? "h-80" : "h-52"}
              `}
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div
              className={`
                flex
                w-full
                items-center
                justify-center
                bg-black/50
                text-xs
                font-black
                uppercase
                tracking-[0.25em]
                text-slate-600
                ${featured ? "h-80" : "h-52"}
              `}
            >
              NO TRANSMISSION IMAGE
            </div>
          )}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-black
              via-black/20
              to-transparent
            "
          />

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
            <span
              className={`
                rounded-full
                border
                bg-black/70
                px-3
                py-1.5
                text-[10px]
                font-black
                uppercase
                tracking-widest
                backdrop-blur-md
                ${
                  featured
                    ? "border-pink-400/30 text-pink-300"
                    : "border-cyan-400/20 text-cyan-300"
                }
              `}
            >
              {article.category || "Gaming Intel"}
            </span>

            {featured && (
              <span className="rounded-full border border-yellow-400/30 bg-yellow-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-yellow-300 backdrop-blur-md">
                ⭐ PRIORITY
              </span>
            )}
          </div>
        </div>

        <div className={featured ? "p-7" : "p-5"}>
          <div className="flex items-center gap-3">
            <span
              className={`
                text-[9px]
                font-black
                uppercase
                tracking-[0.3em]
                ${
                  featured
                    ? "text-pink-400"
                    : "text-cyan-400"
                }
              `}
            >
              {featured
                ? "Priority Intel"
                : "Intelligence Transmission"}
            </span>

            <span className="h-px flex-1 bg-white/10" />
          </div>

          <h2
            className={`
              font-black
              leading-tight
              text-white
              transition-colors
              group-hover:text-cyan-300
              ${featured ? "mt-4 text-3xl md:text-4xl" : "mt-3 text-xl"}
            `}
          >
            {article.title}
          </h2>

          {article.excerpt && (
            <p
              className={`
                mt-4
                leading-relaxed
                text-slate-400
                ${featured ? "line-clamp-4 text-base" : "line-clamp-3 text-sm"}
              `}
            >
              {article.excerpt}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-600">
                Transmission Date
              </p>

              <p className="mt-1 text-xs font-bold text-slate-400">
                {formatDate(publishedDate)}
              </p>
            </div>

            <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 transition-colors group-hover:text-cyan-300">
              Open Intel →
            </div>
          </div>
        </div>
      </BrandCard>
    </Link>
  );
}

export default function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);
        setError("");

        const data = await getPublishedNews();

        setArticles(data || []);
      } catch (err) {
        console.error("FAILED TO LOAD NEWS:", err);

        setArticles([]);
        setError(
          "Unable to establish connection with the intelligence network."
        );
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();

    articles.forEach((article) => {
      const value = article.category || "Gaming Intel";
      counts.set(value, (counts.get(value) || 0) + 1);
    });

    return Array.from(counts.entries()).sort((a, b) =>
      a[0].localeCompare(b[0])
    );
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return articles.filter((article) => {
      const articleCategory =
        article.category || "Gaming Intel";

      const categoryMatch =
        category === "all" ||
        articleCategory.toLowerCase() === category.toLowerCase();

      if (!categoryMatch) {
        return false;
      }

      if (!query) {
        return true;
      }

      return [
        article.title,
        article.excerpt,
        article.category,
        article.author,
      ]
        .filter(Boolean)
        .some((value) =>
          value!.toLowerCase().includes(query)
        );
    });
  }, [articles, category, search]);

  const featuredArticle = filteredArticles[0];
  const secondaryArticles = filteredArticles.slice(1);

  if (loading) {
    return (
      <main className="min-h-[72vh] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <BrandCard
            scan
            status="INTELLIGENCE NETWORK"
            className="p-10"
          >
            <div className="flex items-center gap-5">
              <span className="pp-live-dot h-3 w-3 rounded-full bg-pink-400" />

              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-pink-400">
                  PulsePlay Intelligence Network
                </p>

                <h1 className="mt-2 text-3xl font-black uppercase text-white md:text-5xl">
                  Establishing Connection...
                </h1>

                <p className="mt-3 text-slate-500">
                  Retrieving the latest gaming transmissions.
                </p>
              </div>
            </div>
          </BrandCard>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[72vh] px-6 py-12 text-white md:py-16">
      <div className="mx-auto max-w-7xl">

        {/* COMMAND HERO */}

        <section
          className="
            relative
            mb-14
            overflow-hidden
            rounded-[2rem]
            border
            border-pink-500/20
            bg-gradient-to-br
            from-purple-950/50
            via-[#080b16]
            to-pink-950/20
            p-8
            shadow-[0_0_70px_rgba(236,72,153,.08)]
            md:p-12
          "
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-pink-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-70" />

          <div className="relative">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full border border-pink-400/20 bg-pink-500/5 px-4 py-2">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-pink-400 shadow-[0_0_15px_rgba(236,72,153,.8)]" />

                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-300">
                    NEWS DATABASE ONLINE
                  </span>
                </div>

                <p className="mt-8 text-xs font-black uppercase tracking-[0.45em] text-cyan-400">
                  PulsePlay Intelligence Network
                </p>

                <h1 className="mt-3 text-5xl font-black leading-none pp-gradient-text md:text-7xl">
                  Gaming Intel
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                  The latest gaming news, industry developments,
                  announcements, updates, and community transmissions
                  from across the PulsePlay network.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur-xl md:min-w-[190px]">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">
                  NETWORK STATUS
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400 shadow-[0_0_15px_rgba(34,197,94,.8)]" />

                  <span className="text-sm font-black uppercase text-green-300">
                    ONLINE
                  </span>
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  {articles.length} active transmissions
                </p>
              </div>
            </div>

            {/* STATS */}

            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                  Total Intel
                </p>

                <p className="mt-2 text-3xl font-black text-white">
                  {articles.length}
                </p>
              </div>

              <div className="rounded-2xl border border-pink-500/20 bg-pink-500/5 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                  Priority
                </p>

                <p className="mt-2 text-3xl font-black text-pink-300">
                  {articles.length > 0 ? 1 : 0}
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                  Categories
                </p>

                <p className="mt-2 text-3xl font-black text-cyan-300">
                  {categories.length}
                </p>
              </div>

              <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                  Coverage
                </p>

                <p className="mt-2 text-3xl font-black text-purple-300">
                  LIVE
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ERROR */}

        {error && (
          <BrandCard
            status="NETWORK ERROR"
            className="mb-10 border-red-500/20"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-red-400">
                  Transmission Failure
                </p>

                <p className="mt-2 text-slate-400">
                  {error}
                </p>
              </div>

              <BrandButton
                variant="secondary"
                type="button"
                onClick={() => window.location.reload()}
              >
                Reconnect
              </BrandButton>
            </div>
          </BrandCard>
        )}

        {/* NO ARTICLES */}

        {!error && articles.length === 0 && (
          <BrandCard
            scan
            status="INTELLIGENCE DATABASE EMPTY"
            className="p-12"
          >
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-purple-400">
                No Active Transmissions
              </p>

              <h2 className="mt-4 text-3xl font-black text-white">
                Intelligence Offline
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                No published gaming news is currently available.
                New PulsePlay transmissions will appear here when
                they are published.
              </p>
            </div>
          </BrandCard>
        )}

        {articles.length > 0 && (
          <>
            {/* SEARCH / FILTER TERMINAL */}

            <section className="mb-12">
              <BrandCard
                status="INTELLIGENCE FILTER TERMINAL"
                className="p-6 md:p-8"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
                      Search Network
                    </p>

                    <h2 className="mt-2 text-2xl font-black text-white md:text-3xl">
                      Find Intelligence
                    </h2>
                  </div>

                  <div className="w-full lg:max-w-xl">
                    <label
                      htmlFor="news-search"
                      className="sr-only"
                    >
                      Search news
                    </label>

                    <input
                      id="news-search"
                      type="search"
                      value={search}
                      onChange={(event) =>
                        setSearch(event.target.value)
                      }
                      placeholder="Search titles, topics, authors..."
                      className="
                        w-full
                        rounded-xl
                        border
                        border-cyan-500/20
                        bg-black/30
                        px-5
                        py-3.5
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

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setCategory("all")}
                    className={`
                      rounded-xl
                      border
                      px-4
                      py-2.5
                      text-[10px]
                      font-black
                      uppercase
                      tracking-widest
                      transition-all
                      ${
                        category === "all"
                          ? "border-cyan-400/50 bg-cyan-500/15 text-cyan-300"
                          : "border-white/10 bg-white/5 text-slate-500 hover:border-cyan-500/30 hover:text-cyan-300"
                      }
                    `}
                  >
                    All Intel
                  </button>

                  {categories.map(([name, count]) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setCategory(name)}
                      className={`
                        rounded-xl
                        border
                        px-4
                        py-2.5
                        text-[10px]
                        font-black
                        uppercase
                        tracking-widest
                        transition-all
                        ${
                          category.toLowerCase() === name.toLowerCase()
                            ? "border-pink-400/50 bg-pink-500/10 text-pink-300"
                            : "border-white/10 bg-white/5 text-slate-500 hover:border-pink-500/30 hover:text-pink-300"
                        }
                      `}
                    >
                      {name} ({count})
                    </button>
                  ))}
                </div>
              </BrandCard>
            </section>

            {/* RESULT STATUS */}

            <div className="mb-7 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.4em] text-pink-400">
                  Active Transmissions
                </p>

                <h2 className="mt-2 text-4xl font-black pp-gradient-text">
                  Intelligence Feed
                </h2>
              </div>

              <p className="text-xs font-black uppercase tracking-widest text-slate-600">
                {filteredArticles.length}{" "}
                {filteredArticles.length === 1
                  ? "TRANSMISSION"
                  : "TRANSMISSIONS"}{" "}
                MATCHED
              </p>
            </div>

            {filteredArticles.length > 0 ? (
              <>
                {/* PRIORITY */}

                {featuredArticle && (
                  <section className="mb-10">
                    <ArticleCard
                      article={featuredArticle}
                      featured
                    />
                  </section>
                )}

                {/* SECONDARY */}

                {secondaryArticles.length > 0 && (
                  <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {secondaryArticles.map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                      />
                    ))}
                  </section>
                )}
              </>
            ) : (
              <BrandCard status="NO MATCHES">
                <div className="py-12 text-center">
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-pink-400">
                    Search Returned Zero Results
                  </p>

                  <h3 className="mt-4 text-2xl font-black text-white">
                    No Intelligence Found
                  </h3>

                  <p className="mt-3 text-slate-400">
                    Try another search term or category.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setCategory("all");
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
                    Reset Intelligence
                  </button>
                </div>
              </BrandCard>
            )}

            {/* NETWORK FOOTER */}

            <div
              className="
                mt-12
                flex
                flex-col
                gap-3
                border-t
                border-white/10
                pt-6
                text-[10px]
                font-black
                uppercase
                tracking-[0.25em]
                text-slate-600
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <span>
                PULSEPLAY INTELLIGENCE NETWORK // ONLINE
              </span>

              <Link
                to="/"
                className="text-cyan-500 transition-colors hover:text-cyan-300"
              >
                Return To Command Center →
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
