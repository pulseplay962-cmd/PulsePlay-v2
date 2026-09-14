type AffiliateProduct = {
  id: string;
  name: string;
  description?: string | null;
  price?: string | number | null;
  image?: string | null;
  category?: string | null;
};

type AffiliateProductCardProps = {
  product: AffiliateProduct;
  affiliateLinkId: string;
  pagePath?: string;
  campaign?: string;
  className?: string;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AffiliateProductCard({
  product,
  affiliateLinkId,
  pagePath,
  campaign,
  className = "",
}: AffiliateProductCardProps) {
  const handleClick = () => {
    const params = new URLSearchParams();
    const currentPath = pagePath || window.location.pathname;

    if (currentPath) params.set("page_path", currentPath);
    if (campaign) params.set("campaign", campaign);

    try {
      const sessionId = window.sessionStorage.getItem("pulseplay_session_id");
      if (sessionId) params.set("session_id", sessionId);
    } catch {
      // Tracking still works without session storage.
    }

    const query = params.toString();
    const destination = `${API_URL}/api/monetization/go/${affiliateLinkId}${
      query ? `?${query}` : ""
    }`;

    window.location.assign(destination);
  };

  return (
    <article className={`group overflow-hidden rounded-2xl border border-cyan-400/10 bg-[#111827] shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-cyan-400/30 ${className}`}>
      <div className="aspect-[16/10] overflow-hidden bg-[#0d1324]">
        {product.image ? (
          <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl text-cyan-300/60">🎮</div>
        )}
      </div>

      <div className="space-y-3 p-5">
        {product.category && (
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300/80">{product.category}</div>
        )}

        <h3 className="text-lg font-bold text-white">{product.name}</h3>

        {product.description && (
          <p className="line-clamp-3 text-sm leading-6 text-slate-300">{product.description}</p>
        )}

        <div className="flex items-center justify-between gap-3 pt-2">
          <span className="font-semibold text-cyan-300">
            {product.price !== null && product.price !== undefined && product.price !== "" ? `$${product.price}` : "View deal"}
          </span>

          <button type="button" onClick={handleClick} className="rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-2 text-sm font-bold text-slate-950 transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-[#111827]">
            View Deal
          </button>
        </div>
      </div>
    </article>
  );
}
