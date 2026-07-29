import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BrandCard from "../components/ui/BrandCard";
import { getNews } from "../services/news";

type NewsItem = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  image?: string;
  category?: string;
  featured?: boolean;
  published?: boolean;
  author?: string;
  meta_description?: string;
  facebook_post?: string;
  image_prompt?: string;
  hashtags?: string[];
  created_at?: string;
  published_at?: string;
};

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      try {
        const data = await getNews();

        setNews(
          (data || []).filter(
            (article) => article.published !== false
          )
        );
      } catch (error) {
        console.error("Failed loading intel:", error);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  return (
    <main className="space-y-12">
      <section className="mb-16 text-center">
        <div
          className="
            pp-hud
            inline-flex
            items-center
            gap-3
            rounded-full
            px-5
            py-2
            text-sm
            font-black
            tracking-[0.35em]
            text-cyan-300
          "
        >
          🛰️ INTEL DATABASE ONLINE
        </div>

        <h1 className="pp-gradient-text mt-8 text-5xl font-black md:text-7xl">
          PULSEPLAY INTEL HUB
        </h1>

        <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-400">
          Gaming announcements, industry updates, release information, and
          community transmissions from across the gaming universe.
        </p>
      </section>

      {loading && (
        <BrandCard>
          <div className="flex items-center gap-3">
            <span className="pp-live-dot" />
            <p className="text-slate-400">
              Scanning incoming transmissions...
            </p>
          </div>
        </BrandCard>
      )}

      {!loading && news.length === 0 && (
        <BrandCard>
          <h2 className="text-2xl font-black">
            NO INTEL AVAILABLE
          </h2>

          <p className="mt-3 text-slate-400">
            Publish reports through the PulsePlay AI Content Studio.
          </p>
        </BrandCard>
      )}

      {!loading && news.length > 0 && (
        <section>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-black">
              LATEST REPORTS
            </h2>

            <span className="text-sm tracking-widest text-green-400">
              ● LIVE FEED
            </span>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {news.map((article) => (
              <BrandCard
                key={article.id}
                className="group card-hover"
              >
                {article.image ? (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-52 w-full rounded-xl object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-52 items-center justify-center rounded-xl bg-black/40 text-slate-500">
                    NO IMAGE
                  </div>
                )}

                <div className="mt-5 flex items-center gap-3">
                  {article.category && (
                    <span className="rounded-full border border-purple-400/30 bg-purple-500/20 px-3 py-1 text-xs font-black tracking-widest text-purple-300">
                      {article.category.toUpperCase()}
                    </span>
                  )}

                  {article.created_at && (
                    <span className="text-xs text-slate-500">
                      {new Date(article.created_at).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <h2 className="mt-5 text-2xl font-black">
                  {article.title}
                </h2>

                {article.excerpt && (
                  <p className="mt-3 line-clamp-3 text-slate-400">
                    {article.excerpt}
                  </p>
                )}

                {article.slug && (
                  <div className="mt-6">
                    <Link
                      to={`/news/${article.slug}`}
                      className="inline-flex items-center rounded-xl bg-purple-600 px-5 py-3 font-black text-white transition hover:bg-purple-500"
                    >
                      OPEN REPORT →
                    </Link>
                  </div>
                )}
              </BrandCard>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}