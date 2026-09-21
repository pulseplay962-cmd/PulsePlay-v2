import { useEffect, useState } from "react";
import AffiliateProductCard from "./AffiliateProductCard";
import {
  getAffiliateRecommendations,
  type AffiliateRecommendation,
  type RelatedContentRecommendation,
} from "../../services/recommendations";

type RelatedAffiliateProductsProps = {
  path: string;
};

export default function RelatedAffiliateProducts({ path }: RelatedAffiliateProductsProps) {
  const [recommendations, setRecommendations] = useState<AffiliateRecommendation[]>([]);
  const [relatedContent, setRelatedContent] = useState<RelatedContentRecommendation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!path.startsWith("/news/") && !path.startsWith("/games/")) {
        setRecommendations([]);
        return;
      }

      setLoading(true);

      try {
        const result = await getAffiliateRecommendations(path, 3);
        if (!cancelled) {
          setRecommendations(result.recommendations || []);
          setRelatedContent(result.relatedContent || []);
        }
      } catch (error) {
        console.error("AFFILIATE RECOMMENDATIONS ERROR:", error);
        if (!cancelled) {
          setRecommendations([]);
          setRelatedContent([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [path]);

  if (loading || (recommendations.length === 0 && relatedContent.length === 0)) return null;

  return (
    <section className="relative z-10 mx-auto mt-8 max-w-[1600px] px-4 lg:px-8">
      <div className="rounded-[28px] border border-purple-500/20 bg-[#0d1324]/90 p-6 shadow-[0_0_40px_rgba(139,92,246,.12)] backdrop-blur-md md:p-8">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.4em] text-purple-400">
              PulsePlay Picks
            </p>
            <h2 className="mt-2 text-2xl font-black text-white md:text-3xl">
              Recommended Gaming Gear
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Products selected from the PulsePlay affiliate catalog based on this page.
            </p>
          </div>

          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-cyan-300">
            Affiliate Picks
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((recommendation) => (
            <AffiliateProductCard
              key={recommendation.affiliateLinkId}
              product={recommendation.product}
              affiliateLinkId={recommendation.affiliateLinkId}
              campaign="contextual_recommendation"
              pagePath={path}
            />
          ))}
        </div>

        <p className="mt-5 text-center text-[10px] uppercase tracking-[0.2em] text-slate-600">
          PulsePlay may earn a commission from qualifying purchases.
        </p>
        {relatedContent.length > 0 && (
          <div className="mt-8 border-t border-white/5 pt-6">
            <div className="mb-4">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400">
                Keep Exploring
              </p>
              <h3 className="mt-1 text-xl font-black text-white">
                More from PulsePlay
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Related games and stories selected from this page.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {relatedContent.map((item) => (
                <a
                  key={`${item.type}-${item.id}`}
                  href={item.path}
                  className="group rounded-2xl border border-white/5 bg-[#111827]/80 p-4 transition hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-[#111827]"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="rounded-full border border-purple-400/20 bg-purple-400/5 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-purple-300">
                      {item.type === "news" ? "News" : "Game"}
                    </span>
                    {item.category && (
                      <span className="truncate text-[9px] font-bold uppercase tracking-widest text-slate-600">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <h4 className="line-clamp-2 text-base font-bold text-white transition group-hover:text-cyan-300">
                    {item.title}
                  </h4>
                  {item.excerpt && (
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                      {item.excerpt}
                    </p>
                  )}
                  <div className="mt-3 text-[10px] font-black uppercase tracking-widest text-cyan-400">
                    Explore →
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
