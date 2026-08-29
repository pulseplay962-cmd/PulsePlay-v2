import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getFeaturedNews } from "../services/news";
import type { NewsArticle } from "../services/news";

import BrandCard from "./ui/BrandCard";
import BrandButton from "./ui/BrandButton";

export default function LatestNews() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);

        const data = await getFeaturedNews();

        setArticles(data || []);
      } catch (error) {
        console.error(
          "Failed to load featured news:",
          error
        );

        setArticles([]);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <BrandCard scan className="p-8 md:p-10">
          <div className="flex items-center gap-4">
            <span className="pp-live-dot h-3 w-3 rounded-full bg-pink-400" />

            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-pink-400">
                PulsePlay Intelligence Network
              </p>

              <h2 className="mt-2 text-3xl font-black uppercase text-white md:text-4xl">
                LOADING INTELLIGENCE...
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Establishing secure connection to the latest gaming
                transmissions.
              </p>
            </div>
          </div>
        </BrandCard>
      </section>
    );
  }

  if (!articles.length) {
    return null;
  }

  const featured = articles[0];
  const secondary = articles.slice(1, 6);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <BrandCard scan className="p-6 md:p-8 lg:p-10">

        {/* =========================
            COMMAND HEADER
        ========================= */}

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
              <span className="pp-live-dot h-3 w-3 rounded-full bg-pink-400" />

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
              Real-time gaming news, industry developments,
              announcements, and critical PulsePlay transmissions.
            </p>
          </div>

          <Link to="/news">
            <BrandButton variant="secondary">
              Access Full Intel →
            </BrandButton>
          </Link>
        </div>

        {/* =========================
            INTELLIGENCE GRID
        ========================= */}

        <div
          className="
            grid
            gap-6
            lg:grid-cols-2
          "
        >

          {/* =========================
              PRIMARY TRANSMISSION
          ========================= */}

          <Link
            to={`/news/${featured.slug}`}
            className="group block"
          >
            <BrandCard
              hover={false}
              status="PRIORITY TRANSMISSION"
              className="
                h-full
                border-pink-400/20
                p-0
                transition-all
                duration-300
                group-hover:-translate-y-2
                group-hover:border-pink-400/50
                group-hover:shadow-[0_0_40px_rgba(236,72,153,.15)]
              "
            >
              <div className="relative overflow-hidden">

                {featured.image ? (
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="
                      h-[340px]
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                    "
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-[340px]
                      items-center
                      justify-center
                      bg-black/50
                      text-xs
                      font-black
                      uppercase
                      tracking-[0.25em]
                      text-slate-500
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
                    via-black/30
                    to-transparent
                  "
                />

                <div className="absolute bottom-5 left-5 right-5">
                  <span
                    className="
                      inline-flex
                      rounded-full
                      border
                      border-pink-400/30
                      bg-black/70
                      px-3
                      py-1
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

              <div className="p-6 md:p-7">

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-400">
                    Priority Intel
                  </span>

                  <span className="h-px flex-1 bg-white/10" />
                </div>

                <h3
                  className="
                    mt-4
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
                      leading-relaxed
                      text-slate-400
                    "
                  >
                    {featured.excerpt}
                  </p>
                )}

                <div
                  className="
                    mt-6
                    inline-flex
                    items-center
                    gap-2
                    text-xs
                    font-black
                    uppercase
                    tracking-widest
                    text-cyan-300
                  "
                >
                  Open Transmission
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>

              </div>
            </BrandCard>
          </Link>


          {/* =========================
              SECONDARY TRANSMISSIONS
          ========================= */}

          <div className="grid gap-5 sm:grid-cols-2">
            {secondary.map((article) => (
              <Link
                key={article.id}
                to={`/news/${article.slug}`}
                className="group block"
              >
                <BrandCard
                  hover={false}
                  status="INTEL"
                  className="
                    h-full
                    p-0
                    transition-all
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:border-cyan-400/40
                  "
                >

                  <div className="relative overflow-hidden">

                    {article.image ? (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="
                          h-40
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
                          h-40
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
                        from-black/70
                        to-transparent
                      "
                    />

                    <div className="absolute bottom-3 left-3">
                      <span
                        className="
                          rounded-full
                          border
                          border-cyan-400/20
                          bg-black/70
                          px-2
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

                  <div className="p-5">

                    <p
                      className="
                        text-[9px]
                        font-black
                        uppercase
                        tracking-[0.3em]
                        text-slate-500
                      "
                    >
                      Intelligence Transmission
                    </p>

                    <h3
                      className="
                        mt-2
                        line-clamp-2
                        text-lg
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
                      <p
                        className="
                          mt-3
                          line-clamp-2
                          text-sm
                          leading-relaxed
                          text-slate-500
                        "
                      >
                        {article.excerpt}
                      </p>
                    )}

                    <div
                      className="
                        mt-4
                        text-[10px]
                        font-black
                        uppercase
                        tracking-widest
                        text-cyan-400
                      "
                    >
                      Read Intel →
                    </div>

                  </div>

                </BrandCard>
              </Link>
            ))}
          </div>

        </div>

        {/* =========================
            NETWORK FOOTER
        ========================= */}

        <div
          className="
            mt-8
            flex
            flex-col
            gap-3
            border-t
            border-white/10
            pt-6
            text-xs
            font-black
            uppercase
            tracking-[0.2em]
            text-slate-600
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <span>
            INTELLIGENCE NETWORK // ONLINE
          </span>

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

      </BrandCard>
    </section>
  );
}
