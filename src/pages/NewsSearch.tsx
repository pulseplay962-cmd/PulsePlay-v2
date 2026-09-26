import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";
import { getPublishedNews, type NewsArticle } from "../services/news";

function formatDate(value?: string | null) {
  if (!value) return "DATE UNKNOWN";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function NewsSearch() {
  const [params] = useSearchParams();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [query, setQuery] = useState(params.get("query") || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPublishedNews()
      .then(setArticles)
      .catch((err) => {
        console.error("NEWS SEARCH LOAD ERROR:", err);
        setError("Unable to connect to the PulsePlay news database.");
      })
      .finally(() => setLoading(false));
  }, []);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return articles;
    return articles.filter((article) =>
      [article.title, article.excerpt, article.content, article.category, article.author, article.source_name]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(term))
    );
  }, [articles, query]);

  function openArticle(slug: string) {
    window.open("/news/" + slug, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="min-h-screen px-6 py-12 text-white md:py-16">
      <div className="mx-auto max-w-6xl">
        <BrandCard status="NEWS DATABASE SEARCH" className="p-7 md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400">PulsePlay Intelligence Network</p>
              <h1 className="mt-3 text-4xl font-black pp-gradient-text md:text-6xl">Search Gaming Intel</h1>
              <p className="mt-4 max-w-2xl text-slate-400">Find published stories without scrolling through the entire news archive.</p>
            </div>
            <button type="button" onClick={() => window.close()} className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white">Close Search Window</button>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search games, topics, headlines, platforms..."
              className="flex-1 rounded-xl border border-cyan-500/20 bg-black/30 px-5 py-4 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/10"
            />
            <BrandButton variant="secondary" type="button" onClick={() => setQuery("")}>Clear</BrandButton>
          </div>
        </BrandCard>

        {loading && <BrandCard className="mt-8 p-8">Loading intelligence database...</BrandCard>}
        {error && <BrandCard className="mt-8 border-red-500/20 p-8 text-red-300">{error}</BrandCard>}

        {!loading && !error && (
          <section className="mt-8 space-y-4">
            <p className="px-1 text-xs font-black uppercase tracking-widest text-slate-500">
              {results.length} matching transmission{results.length === 1 ? "" : "s"}
            </p>

            {results.map((article) => (
              <BrandCard key={article.id} className="p-6 transition hover:border-cyan-400/40">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-cyan-300">
                        {article.category || "Gaming Intel"}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                        {formatDate(article.published_at || article.created_at)}
                      </span>
                    </div>
                    <h2 className="mt-3 text-2xl font-black text-white">{article.title}</h2>
                    {article.excerpt && <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">{article.excerpt}</p>}
                    {article.source_name && <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Source: {article.source_name}</p>}
                  </div>
                  <BrandButton variant="secondary" type="button" onClick={() => openArticle(article.slug)}>Open Article ↗</BrandButton>
                </div>
              </BrandCard>
            ))}

            {results.length === 0 && (
              <BrandCard className="p-10 text-center">
                <p className="text-xs font-black uppercase tracking-widest text-pink-400">No matching intelligence</p>
                <p className="mt-3 text-slate-400">Try a game title, platform, topic, or headline.</p>
              </BrandCard>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
