import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { getFeaturedNews } from "../services/news";
import type { NewsArticle } from "../services/news";

import BrandCard from "./ui/BrandCard";
import BrandButton from "./ui/BrandButton";

export default function LatestNews() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadNews() {
      try {
        setLoading(true);

        const data = await getFeaturedNews();

        if (mounted) {
          setArticles(data ?? []);
        }
      } catch (error) {
        console.error("Failed to load featured news:", error);

        if (mounted) {
          setArticles([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadNews();

    return () => {
      mounted = false;
    };
  }, []);

  const featured = useMemo(() => articles[0] ?? null, [articles]);

  const secondary = useMemo(
    () => articles.slice(1, 7),
    [articles]
  );

  const totalIntel = articles.length;

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <BrandCard
          scan
          className="
            relative
            overflow-hidden
            border-pink-500/20
            p-8
            md:p-10
          "
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span
                  className="
                    h-3
                    w-3
                    rounded-full
                    bg-pink-400
                    shadow-[0_0_18px_rgba(244,114,182,.8)]
                    animate-pulse
                  "
                />

                <p
                  className="
                    text-xs
                    font-black
                    uppercase
                    tracking-[0.35em]
                    text-pink-400
                  "
                >
                  Intelligence Network
                </p>
              </div>

              <h2
                className="
                  mt-3
                  text-3xl
                  font-black
                  uppercase
                  tracking-tight
                  text-white
                  md:text-5xl
                "
              >
                Establishing Intel Link
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                Synchronizing the latest gaming transmissions,
                industry intelligence, and PulsePlay news feeds.
              </p>
            </div>

            <div
              className="
                rounded-2xl
                border
                border-pink-500/20
                bg-pink-500/5
                px-6
                py-4
              "
            >
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">
                Network Status
              </p>

              <p className="mt-2 text-sm font-black uppercase tracking-widest text-pink-300">
                CONNECTING...
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  h-32
                  animate-pulse
                  rounded-2xl
                  border
                  border-white/5
                  bg-white/[0.02]
                "
              />
            ))}
          </div>
        </BrandCard>
      </section>
    );
  }

  if (!featured) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <BrandCard
          scan
          className="
            border-pink-500/20
            p-8
            md:p-10
          "
        >
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <span className="text-5xl">📰</span>

            <p
              className="
                mt-5
                text-xs
                font-black
                uppercase
                tracking-[0.35em]
                text-pink-400
              "
            >
              Intelligence Network
            </p>

            <h2 className="mt-3 text-3xl font-black uppercase text-white">
              No Active Transmissions
            </h2>

            <p className="mt-3 max-w-xl text-slate-400">
              Gaming intelligence will appear here when new
              transmissions are published through the PulsePlay
              network.
            </p>

            <Link to="/news" className="mt-7">
              <BrandButton variant="secondary">
                Access News Network →
              </BrandButton>
            </Link>
          </div>
        </BrandCard>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <BrandCard
        scan
        className="
          relative
          overflow-hidden
          border-pink-500/20
          p-6
          md:p-8
          lg:p-10
        "
      >
        {/* Ambient Intelligence Glow */}

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            -top-32
            h-72
            w-72
            rounded-full
            bg-pink-500/10
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-40
            left-1/3
            h-72
            w-72
            rounded-full
            bg-cyan-500/5
            blur-3xl
          "
        />

        <div className="relative z-10">
          {/* COMMAND HEADER */}

          <div
            className="
              mb-10
              flex
              flex-col
              gap-6
              md:flex-row
              md:items-end
              md:justify-between
            "
          >
            <div>
              <div className="flex items-center gap-3">
                <span
                  className="
                    h-3
                    w-3
                    rounded-full
                    bg-pink-400
                    shadow-[0_0_18px_rgba(244,114,182,.8)]
                  "
                />

                <p
                  className="
                    text-xs
                    font-black
                    uppercase
                    tracking-[0.35em]
                    text-pink-400
                  "
                >
                  PulsePlay Intelligence Network
                </p>
              </div>

              <h2
                className="
                  mt-3
                  text-4xl
                  font-black
                  uppercase
                  tracking-tight
                  pp-gradient-text
                  md:text-5xl
                "
              >
                Latest Intelligence
              </h2>

              <p className="mt-3 max-w-2xl text-slate-400">
                Gaming news, industry developments, announcements,
                and critical transmissions from across the gaming
                network.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div
                className="
                  rounded-xl
                  border
                  border-pink-500/20
                  bg-black/30
                  px-5
                  py-3
                  text-center
                "
              >
                <p className="text-2xl font-black text-white">
                  {totalIntel}
                </p>

                <p
                  className="
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.25em]
                    text-slate-600
                  "
                >
                  Transmissions
                </p>
              </div>

              <Link to="/news">
                <BrandButton variant="secondary">
                  Full Intel →
                </BrandButton>
              </Link>
            </div>
          </div>

          {/* PRIORITY TRANSMISSION */}

          <Link
            to={`/news/${featured.slug}`}
            className="group block"
          >
            <BrandCard
              hover={false}
              status="PRIORITY TRANSMISSION"
              className="
                overflow-hidden
                border-pink-400/20
                p-0
                transition-all
                duration-500
                group-hover:-translate-y-1
                group-hover:border-pink-400/50
                group-hover:shadow-[0_0_45px_rgba(236,72,153,.14)]
              "
            >
              <div className="grid lg:grid-cols-[1.15fr_.85fr]">
                <div className="relative overflow-hidden">
                  {featured.image ? (
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="
                        h-[300px]
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-105
                        lg:h-[390px]
                      "
                    />
                  ) : (
                    <div
                      className="
                        flex
                        h-[300px]
                        items-center
                        justify-center
                        bg-black/50
                        text-xs
                        font-black
                        uppercase
                        tracking-[0.25em]
                        text-slate-600
                        lg:h-[390px]
                      "
                    >
                      No Intelligence Image
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

                  <div className="absolute bottom-5 left-5">
                    <span
                      className="
                        inline-flex
                        rounded-full
                        border
                        border-pink-400/30
                        bg-black/75
                        px-3
                        py-1.5
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.2em]
                        text-pink-300
                        backdrop-blur-md
                      "
                    >
                      {featured.category || "Gaming Intel"}
                    </span>
                  </div>
                </div>

                <div
                  className="
                    flex
                    flex-col
                    justify-center
                    bg-gradient-to-br
                    from-pink-500/[0.04]
                    to-transparent
                    p-6
                    md:p-8
                  "
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="
                        rounded-full
                        border
                        border-pink-400/20
                        bg-pink-400/5
                        px-3
                        py-1
                        text-[9px]
                        font-black
                        uppercase
                        tracking-[0.25em]
                        text-pink-300
                      "
                    >
                      Priority Intel
                    </span>

                    <span className="h-px flex-1 bg-white/10" />
                  </div>

                  <h3
                    className="
                      mt-5
                      text-2xl
                      font-black
                      leading-tight
                      text-white
                      transition-colors
                      duration-300
                      group-hover:text-cyan-300
                      md:text-3xl
                    "
                  >
                    {featured.title}
                  </h3>

                  {featured.excerpt && (
                    <p
                      className="
                        mt-4
                        line-clamp-4
                        text-sm
                        leading-7
                        text-slate-400
                        md:text-base
                      "
                    >
                      {featured.excerpt}
                    </p>
                  )}

                  <div className="mt-7 flex items-center gap-3">
                    <span
                      className="
                        text-xs
                        font-black
                        uppercase
                        tracking-[0.2em]
                        text-cyan-300
                      "
                    >
                      Open Transmission
                    </span>

                    <span
                      className="
                        text-lg
                        text-cyan-400
                        transition-transform
                        duration-300
                        group-hover:translate-x-2
                      "
                    >
                      →
                    </span>
                  </div>
                </div>
              </div>
            </BrandCard>
          </Link>

          {/* SECONDARY INTELLIGENCE */}

          {secondary.length > 0 && (
            <div className="mt-8">
              <div className="mb-5 flex items-center gap-4">
                <p
                  className="
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.3em]
                    text-slate-500
                  "
                >
                  Secondary Transmissions
                </p>

                <span className="h-px flex-1 bg-white/10" />
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {secondary.map((article, index) => (
                  <Link
                    key={article.id}
                    to={`/news/${article.slug}`}
                    className="group block"
                  >
                    <BrandCard
                      hover={false}
                      status={`INTEL ${String(index + 1).padStart(2, "0")}`}
                      className="
                        h-full
                        overflow-hidden
                        p-0
                        transition-all
                        duration-300
                        group-hover:-translate-y-1
                        group-hover:border-cyan-400/40
                        group-hover:shadow-[0_0_30px_rgba(34,211,238,.08)]
                      "
                    >
                      <div className="relative overflow-hidden">
                        {article.image ? (
                          <img
                            src={article.image}
                            alt={article.title}
                            className="
                              h-44
                              w-full
                              object-cover
                              transition-transform
                              duration-500
                              group-hover:scale-105
                            "
                          />
                        ) : (
                          <div
                            className="
                              flex
                              h-44
                              items-center
                              justify-center
                              bg-black/50
                              text-[10px]
                              font-black
                              uppercase
                              tracking-widest
                              text-slate-600
                            "
                          >
                            No Image
                          </div>
                        )}

                        <div
                          className="
                            pointer-events-none
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black/80
                            via-transparent
                            to-transparent
                          "
                        />

                        <div className="absolute bottom-3 left-3">
                          <span
                            className="
                              rounded-full
                              border
                              border-cyan-400/20
                              bg-black/75
                              px-2.5
                              py-1
                              text-[9px]
                              font-black
                              uppercase
                              tracking-widest
                              text-cyan-300
                              backdrop-blur-md
                            "
                          >
                            {article.category || "Gaming Intel"}
                          </span>
                        </div>
                      </div>

                      <div className="flex h-full flex-col p-5">
                        <p
                          className="
                            text-[9px]
                            font-black
                            uppercase
                            tracking-[0.3em]
                            text-slate-600
                          "
                        >
                          Intelligence Transmission
                        </p>

                        <h3
                          className="
                            mt-3
                            line-clamp-2
                            text-lg
                            font-black
                            leading-tight
                            text-white
                            transition-colors
                            duration-300
                            group-hover:text-cyan-300
                          "
                        >
                          {article.title}
                        </h3>

                        {article.excerpt && (
                          <p
                            className="
                              mt-3
                              line-clamp-3
                              text-sm
                              leading-6
                              text-slate-500
                            "
                          >
                            {article.excerpt}
                          </p>
                        )}

                        <div className="mt-auto pt-5">
                          <span
                            className="
                              inline-flex
                              items-center
                              gap-2
                              text-[10px]
                              font-black
                              uppercase
                              tracking-[0.2em]
                              text-cyan-400
                            "
                          >
                            Read Intel
                            <span className="transition-transform group-hover:translate-x-1">
                              →
                            </span>
                          </span>
                        </div>
                      </div>
                    </BrandCard>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* NETWORK FOOTER */}

          <div
            className="
              mt-8
              flex
              flex-col
              gap-4
              border-t
              border-white/10
              pt-6
              text-[9px]
              font-black
              uppercase
              tracking-[0.25em]
              text-slate-600
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div className="flex items-center gap-3">
              <span className="pp-live-dot h-2 w-2 bg-green-400" />

              <span>
                INTELLIGENCE NETWORK // ONLINE
              </span>
            </div>

            <Link
              to="/news"
              className="
                text-cyan-500
                transition-colors
                hover:text-cyan-300
              "
            >
              Browse All Transmissions →
            </Link>
          </div>
        </div>
      </BrandCard>
    </section>
  );
}
