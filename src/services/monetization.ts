const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

export interface MonetizationSummary {
  totalLinks: number;
  totalClicks: number;
  totalConversions: number;
  totalRevenue: number;
}

export interface MonetizationSettings {
  id?: string;
  ads_enabled: boolean;
  affiliate_enabled: boolean;
  merch_enabled: boolean;
  sponsorship_enabled: boolean;
  adsense_publisher_id?: string | null;
  default_affiliate_network?: string | null;
}

export interface AffiliateLinkStats {
  id: string;
  product_id: string | null;
  network: string;
  merchant: string | null;
  status: string;
  clicks: number;
  conversions: number;
  revenue: number;
  created_at: string;
}

export interface MonetizationStatsResponse {
  success: boolean;
  summary: MonetizationSummary;
  links: AffiliateLinkStats[];
  recentClicks: Array<{
    id: string;
    affiliate_link_id: string | null;
    product_id: string | null;
    page_path: string | null;
    campaign: string | null;
    created_at: string;
  }>;
}

export function getAffiliateRedirectUrl(
  linkId: string,
  options?: {
    campaign?: string;
    pagePath?: string;
    sessionId?: string;
  },
) {
  const params = new URLSearchParams();

  if (options?.campaign) params.set("campaign", options.campaign);
  if (options?.pagePath) params.set("page_path", options.pagePath);
  if (options?.sessionId) params.set("session_id", options.sessionId);

  const query = params.toString();
  return `${API_URL}/api/monetization/go/${encodeURIComponent(linkId)}${query ? `?${query}` : ""}`;
}

export async function getMonetizationStats(token: string) {
  const response = await fetch(`${API_URL}/api/monetization/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("Unable to load monetization stats.");
  return (await response.json()) as MonetizationStatsResponse;
}

export async function getMonetizationSettings(token: string) {
  const response = await fetch(`${API_URL}/api/monetization/settings`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("Unable to load monetization settings.");
  return (await response.json()) as {
    success: boolean;
    settings: MonetizationSettings | null;
  };
}

export async function updateMonetizationSettings(
  token: string,
  settings: Partial<MonetizationSettings>,
) {
  const response = await fetch(`${API_URL}/api/monetization/settings`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(settings),
  });

  if (!response.ok) throw new Error("Unable to update monetization settings.");
  return (await response.json()) as {
    success: boolean;
    settings: MonetizationSettings;
  };
}
