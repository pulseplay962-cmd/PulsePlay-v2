const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

export type AffiliateRecommendation = {
  affiliateLinkId: string;
  merchant: string | null;
  network: string;
  product: {
    id: string;
    name: string;
    description?: string | null;
    price?: string | number | null;
    image?: string | null;
    category?: string | null;
  };
};

export async function getAffiliateRecommendations(path: string, limit = 3) {
  const params = new URLSearchParams({
    path,
    limit: String(limit),
  });

  const response = await fetch(`${API_URL}/api/recommendations?${params.toString()}`);
  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body?.error || "Unable to load affiliate recommendations.");
  }

  return body as {
    success: boolean;
    context?: {
      id: string;
      type: string;
      title: string;
      category: string | null;
    };
    recommendations: AffiliateRecommendation[];
  };
}
