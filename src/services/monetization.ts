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

export interface AffiliateLink {
  id: string;
  product_id: string | null;
  network: string;
  merchant: string | null;
  affiliate_url: string;
  tracking_code: string | null;
  status: "active" | "inactive" | string;
  clicks: number;
  conversions: number;
  revenue: number;
  created_at: string;
  updated_at?: string;
  product?: AffiliateProduct | null;
}

export interface AffiliateProduct {
  id: string;
  name: string;
  description?: string | null;
  price?: string | number | null;
  image?: string | null;
  category?: string | null;
}

export interface AffiliateLinkInput {
  product_id?: string | null;
  network: string;
  merchant?: string | null;
  affiliate_url: string;
  tracking_code?: string | null;
  status?: "active" | "inactive";
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
  pagePerformance: Array<{
    page_path: string;
    views: number;
    clicks: number;
    click_rate: number;
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

async function authorizedRequest<T>(token: string, path: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body?.error || "Monetization request failed.");
  }

  return body as T;
}

export async function getMonetizationStats(token: string) {
  return authorizedRequest<MonetizationStatsResponse>(token, "/api/monetization/stats");
}

export async function getMonetizationSettings(token: string) {
  return authorizedRequest<{
    success: boolean;
    settings: MonetizationSettings | null;
  }>(token, "/api/monetization/settings");
}

export async function updateMonetizationSettings(
  token: string,
  settings: Partial<MonetizationSettings>,
) {
  return authorizedRequest<{
    success: boolean;
    settings: MonetizationSettings;
  }>(token, "/api/monetization/settings", {
    method: "PUT",
    body: JSON.stringify(settings),
  });
}

export async function getAffiliateLinks(token: string) {
  return authorizedRequest<{ success: boolean; links: AffiliateLink[] }>(
    token,
    "/api/monetization/links",
  );
}

export async function createAffiliateLink(token: string, input: AffiliateLinkInput) {
  return authorizedRequest<{ success: boolean; link: AffiliateLink }>(
    token,
    "/api/monetization/links",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
}

export async function updateAffiliateLink(
  token: string,
  id: string,
  input: Partial<AffiliateLinkInput>,
) {
  return authorizedRequest<{ success: boolean; link: AffiliateLink }>(
    token,
    `/api/monetization/links/${encodeURIComponent(id)}`,
    {
      method: "PUT",
      body: JSON.stringify(input),
    },
  );
}

export async function deactivateAffiliateLink(token: string, id: string) {
  return authorizedRequest<{ success: boolean; link: AffiliateLink; message?: string }>(
    token,
    `/api/monetization/links/${encodeURIComponent(id)}`,
    { method: "DELETE" },
  );
}
