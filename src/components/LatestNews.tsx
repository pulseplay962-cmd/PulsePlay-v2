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
      <section className="mx-auto max-w-7xl px-6 py-16">
        <BrandCard scan>
          <div className="flex items-center gap-4">
            <span className="pp-live-dot h-3 w-3 rounded-full bg-cyan-400" />

            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400">
                PulsePlay Network
              </p>

              <h2 className="mt-2 text-3xl font-black text-white">
                LOADING INTELLIGENCE...
              </h2>
            </div>
          </div>
        </BrandCard>
      </section>
    );
  }

  if (!articles.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <BrandCard scan>
        {/* =========================
            HEADER
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
                Intelligence Feed
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
              Gaming updates, industry developments,
              reviews, and PulsePlay transmissions.
            </p>
          </div>

          <Link to="/news">
            <BrandButton>
              View All Intelligence →
            </BrandButton>
          </Link>
        </div>

        {/* =========================
            ARTICLE GRID
        ========================= */}

        <div
          className="
            grid
            gap-6
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {articles.slice(0, 6).map((article) => (
            <BrandCard
              key={article.id}
              className="
                group
                h-full
                overflow-hidden
                p-0
                transition-all
                duration-300
                hover:-translate-y-2
              "
            >
              {/* IMAGE */}

              <div className="relative overflow-hidden">
                {article.image ? (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="
                      h-56
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
                      h-56
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

                {/* IMAGE OVERLAY */}

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

                {/* CATEGORY */}

                <div className="absolute bottom-4 left-4">
                  <span
                    className="
                      rounded-full
                      border
                      border-cyan-400/30
                      bg-black/70
                      px-3
                      py-1
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.2em]
                      text-cyan-300
                      backdrop-blur-md
                    "
                  >
                    {article.category || "Gaming Intel"}
                  </span>
                </div>
              </div>

              {/* CONTENT */}

              <div className="flex h-full flex-col p-6">
                <p
                  className="
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.3em]
                    text-pink-400
                  "
                >
                  Intelligence Transmission
                </p>

                <h3
                  className="
                    mt-3
                    line-clamp-2
                    text-xl
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
                      mt-4
                      line-clamp-3
                      text-sm
                      leading-relaxed
                      text-slate-400
                    "
                  >
                    {article.excerpt}
                  </p>
                )}

                <div className="mt-auto pt-6">
                  <Link
                    to={`/news/${article.slug}`}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-cyan-500/30
                      bg-slate-950/70
                      px-5
                      py-3
                      text-xs
                      font-black
                      uppercase
                      tracking-widest
                      text-cyan-300
                      shadow-[0_0_20px_rgba(34,211,238,.12)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-cyan-400/60
                      hover:bg-cyan-500/10
                    "
                  >
                    Read Intelligence
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </BrandCard>
          ))}
        </div>
      </BrandCard>
    </section>
  );
}
