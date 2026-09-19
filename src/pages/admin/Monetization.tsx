import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";
import {
  createAffiliateLink,
  deactivateAffiliateLink,
  getAffiliateLinks,
  getMonetizationSettings,
  getMonetizationStats,
  updateAffiliateLink,
  updateMonetizationSettings,
  type AffiliateLink,
  type AffiliateProduct,
  type MonetizationSettings,
  type MonetizationSummary,
} from "../../services/monetization";

const DEFAULT_SETTINGS: MonetizationSettings = {
  ads_enabled: false,
  affiliate_enabled: true,
  merch_enabled: true,
  sponsorship_enabled: false,
  adsense_publisher_id: "",
  default_affiliate_network: "Amazon Associates",
};

type LinkForm = {
  product_id: string;
  network: string;
  merchant: string;
  affiliate_url: string;
  tracking_code: string;
  status: "active" | "inactive";
};

const EMPTY_FORM: LinkForm = {
  product_id: "",
  network: "Amazon Associates",
  merchant: "",
  affiliate_url: "",
  tracking_code: "",
  status: "active",
};

export default function Monetization() {
  const [summary, setSummary] = useState<MonetizationSummary>({
    totalLinks: 0,
    totalClicks: 0,
    totalConversions: 0,
    totalRevenue: 0,
  });

  const [links, setLinks] = useState<AffiliateLink[]>([]);
  const [products, setProducts] = useState<AffiliateProduct[]>([]);
  const [merchandiseCount, setMerchandiseCount] = useState(0);
  const [activeMerchandiseCount, setActiveMerchandiseCount] = useState(0);
  const [recentClicks, setRecentClicks] = useState<
    Array<{
      id: string;
      affiliate_link_id: string | null;
      product_id: string | null;
      page_path: string | null;
      campaign: string | null;
      created_at: string;
    }>
  >([]);

  const [settings, setSettings] =
    useState<MonetizationSettings>(DEFAULT_SETTINGS);

  const [form, setForm] = useState<LinkForm>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savingLink, setSavingLink] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function getToken() {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    if (!token) {
      throw new Error(
        "Your admin session has expired. Please sign in again."
      );
    }

    return token;
  }

  async function load(options?: { silent?: boolean }) {
    const silent = options?.silent ?? false;

    if (silent) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const token = await getToken();

      const [
        statsResponse,
        settingsResponse,
        linksResponse,
        productsResponse,
        merchandiseResponse,
      ] = await Promise.all([
        getMonetizationStats(token),
        getMonetizationSettings(token),
        getAffiliateLinks(token),
        supabase
          .from("products")
          .select("id, name, description, price, image, category")
          .order("name"),
        supabase
          .from("merchandise")
          .select("id, status"),
      ]);

      setSummary(statsResponse.summary);
      setRecentClicks(statsResponse.recentClicks || []);
      setLinks(linksResponse.links || []);

      setSettings({
        ...DEFAULT_SETTINGS,
        ...(settingsResponse.settings || {}),
      });

      if (merchandiseResponse.error) {
        console.warn(
          "Unable to load merchandise activity:",
          merchandiseResponse.error.message
        );
        setMerchandiseCount(0);
        setActiveMerchandiseCount(0);
      } else {
        const merchandiseRows = merchandiseResponse.data || [];
        setMerchandiseCount(merchandiseRows.length);
        setActiveMerchandiseCount(
          merchandiseRows.filter((item) => item.status === "active").length
        );
      }

      if (productsResponse.error) {
        console.warn(
          "Unable to load affiliate products:",
          productsResponse.error.message
        );
        setProducts([]);
      } else {
        setProducts(
          (productsResponse.data || []) as AffiliateProduct[]
        );
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load monetization data."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const conversionRate = useMemo(() => {
    if (!summary.totalClicks) return 0;

    return (
      (summary.totalConversions / summary.totalClicks) *
      100
    );
  }, [summary.totalClicks, summary.totalConversions]);

  const revenuePerClick = useMemo(() => {
    if (!summary.totalClicks) return 0;

    return summary.totalRevenue / summary.totalClicks;
  }, [summary.totalClicks, summary.totalRevenue]);

  const revenuePerConversion = useMemo(() => {
    if (!summary.totalConversions) return 0;

    return summary.totalRevenue / summary.totalConversions;
  }, [summary.totalConversions, summary.totalRevenue]);

  const topProducts = useMemo(() => {
    const grouped = new Map<
      string,
      {
        id: string;
        name: string;
        category: string | null;
        clicks: number;
        conversions: number;
        revenue: number;
      }
    >();

    for (const link of links) {
      const key = link.product_id || `unassigned-${link.id}`;

      const existing = grouped.get(key);

      const name =
        link.product?.name ||
        link.merchant ||
        "Unassigned Affiliate Product";

      const category = link.product?.category || null;

      if (existing) {
        existing.clicks += Number(link.clicks || 0);
        existing.conversions += Number(link.conversions || 0);
        existing.revenue += Number(link.revenue || 0);
      } else {
        grouped.set(key, {
          id: key,
          name,
          category,
          clicks: Number(link.clicks || 0),
          conversions: Number(link.conversions || 0),
          revenue: Number(link.revenue || 0),
        });
      }
    }

    return Array.from(grouped.values())
      .sort((a, b) => {
        if (b.revenue !== a.revenue) {
          return b.revenue - a.revenue;
        }

        if (b.conversions !== a.conversions) {
          return b.conversions - a.conversions;
        }

        return b.clicks - a.clicks;
      })
      .slice(0, 5);
  }, [links]);

  const topContent = useMemo(() => {
    const grouped = new Map<
      string,
      {
        path: string;
        clicks: number;
        lastClicked: string;
      }
    >();

    for (const click of recentClicks) {
      const path = click.page_path || "Unknown page";
      const existing = grouped.get(path);

      if (existing) {
        existing.clicks += 1;

        if (
          new Date(click.created_at).getTime() >
          new Date(existing.lastClicked).getTime()
        ) {
          existing.lastClicked = click.created_at;
        }
      } else {
        grouped.set(path, {
          path,
          clicks: 1,
          lastClicked: click.created_at,
        });
      }
    }

    return Array.from(grouped.values())
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 5);
  }, [recentClicks]);

  const monetizationCoverage = useMemo(() => {
    if (!merchandiseCount) return 0;
    return (activeMerchandiseCount / merchandiseCount) * 100;
  }, [activeMerchandiseCount, merchandiseCount]);

  const productNameById = useMemo(() => {
    const map = new Map<string, string>();

    for (const product of products) {
      map.set(product.id, product.name);
    }

    for (const link of links) {
      if (link.product_id && link.product?.name) {
        map.set(link.product_id, link.product.name);
      }
    }

    return map;
  }, [products, links]);

  async function saveSettings() {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const token = await getToken();

      const result = await updateMonetizationSettings(
        token,
        settings
      );

      setSettings({
        ...DEFAULT_SETTINGS,
        ...result.settings,
      });

      setMessage("Monetization settings saved.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save settings."
      );
    } finally {
      setSaving(false);
    }
  }

  function startAdd() {
    setEditingId(null);

    setForm({
      ...EMPTY_FORM,
      network:
        settings.default_affiliate_network ||
        "Amazon Associates",
    });

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function startEdit(link: AffiliateLink) {
    setEditingId(link.id);

    setForm({
      product_id: link.product_id || "",
      network: link.network || "Amazon Associates",
      merchant: link.merchant || "",
      affiliate_url: link.affiliate_url || "",
      tracking_code: link.tracking_code || "",
      status:
        link.status === "inactive"
          ? "inactive"
          : "active",
    });

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function saveAffiliateLink() {
    setSavingLink(true);
    setMessage("");
    setError("");

    try {
      const token = await getToken();

      const payload = {
        product_id: form.product_id || null,
        network: form.network.trim(),
        merchant: form.merchant.trim() || null,
        affiliate_url: form.affiliate_url.trim(),
        tracking_code: form.tracking_code.trim() || null,
        status: form.status,
      };

      if (!payload.network) {
        throw new Error(
          "Affiliate network is required."
        );
      }

      if (
        !/^https?:\/\//i.test(
          payload.affiliate_url
        )
      ) {
        throw new Error(
          "Affiliate URL must start with http:// or https://."
        );
      }

      if (editingId) {
        await updateAffiliateLink(
          token,
          editingId,
          payload
        );

        setMessage("Affiliate link updated.");
      } else {
        await createAffiliateLink(
          token,
          payload
        );

        setMessage(
          "Affiliate link added successfully."
        );
      }

      setEditingId(null);
      setForm(EMPTY_FORM);

      await load({ silent: true });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save affiliate link."
      );
    } finally {
      setSavingLink(false);
    }
  }

  async function deactivateLink(
    link: AffiliateLink
  ) {
    if (
      !window.confirm(
        `Deactivate the ${
          link.merchant || link.network
        } affiliate link?`
      )
    ) {
      return;
    }

    setMessage("");
    setError("");

    try {
      const token = await getToken();

      await deactivateAffiliateLink(
        token,
        link.id
      );

      setMessage(
        "Affiliate link deactivated. Click and revenue history was preserved."
      );

      await load({ silent: true });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to deactivate affiliate link."
      );
    }
  }

  function formatDate(value: string) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Unknown";
    }

    return date.toLocaleString();
  }

  function formatPath(path: string) {
    if (path === "Unknown page") {
      return path;
    }

    return path.length > 60
      ? `${path.slice(0, 57)}...`
      : path;
  }

  return (
    <div className="min-h-screen bg-[#070b14] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                Affiliate Command Center
              </p>

              <h1 className="mt-2 text-3xl font-bold md:text-4xl">
                Monetization
              </h1>

              <p className="mt-2 max-w-3xl text-slate-400">
                Track real affiliate performance, manage
                product links, and monitor PulsePlay revenue
                from one place.
              </p>
            </div>

            <button
              type="button"
              onClick={() => void load({ silent: true })}
              disabled={loading || refreshing}
              className="inline-flex items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {refreshing
                ? "Refreshing..."
                : "↻ Refresh Stats"}
            </button>
          </div>
        </header>

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {message && (
          <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200">
            {message}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-[#111827] p-8 text-center text-slate-400">
            Loading Affiliate Command Center...
          </div>
        ) : (
          <>
            <section>
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-400">
                  Live Performance
                </p>
                <h2 className="mt-1 text-xl font-bold">
                  Affiliate Revenue Overview
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                  label="Tracked Clicks"
                  value={summary.totalClicks.toLocaleString()}
                  detail="Real tracked affiliate redirects"
                />

                <MetricCard
                  label="Conversions"
                  value={summary.totalConversions.toLocaleString()}
                  detail={
                    summary.totalConversions === 0
                      ? "Awaiting network reporting"
                      : "Reported conversions"
                  }
                />

                <MetricCard
                  label="Affiliate Revenue"
                  value={`$${summary.totalRevenue.toFixed(2)}`}
                  detail="Reported affiliate revenue"
                  accent="cyan"
                />

                <MetricCard
                  label="Conversion Rate"
                  value={`${conversionRate.toFixed(2)}%`}
                  detail={
                    summary.totalClicks
                      ? "Conversions ÷ tracked clicks"
                      : "No tracked clicks yet"
                  }
                  accent="purple"
                />
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <MiniMetric
                  label="Active Affiliate Links"
                  value={summary.totalLinks.toLocaleString()}
                />

                <MiniMetric
                  label="Revenue / Click"
                  value={`$${revenuePerClick.toFixed(4)}`}
                />

                <MiniMetric
                  label="Revenue / Conversion"
                  value={`$${revenuePerConversion.toFixed(2)}`}
                />
              </div>
            </section>

            <section className="rounded-2xl border border-pink-400/20 bg-[#0d1324] p-6 shadow-xl shadow-black/20">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-400">
                    Merchandise
                  </p>
                  <h2 className="mt-1 text-xl font-bold">
                    Store Monetization Activity
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Catalog health alongside affiliate performance.
                  </p>
                </div>

                <span className="rounded-full border border-pink-400/20 bg-pink-400/10 px-3 py-1 text-xs font-semibold text-pink-300">
                  {activeMerchandiseCount} active
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <MiniMetric
                  label="Merchandise Items"
                  value={merchandiseCount.toLocaleString()}
                />
                <MiniMetric
                  label="Active Items"
                  value={activeMerchandiseCount.toLocaleString()}
                />
                <MiniMetric
                  label="Catalog Active Rate"
                  value={merchandiseCount ? `${monetizationCoverage.toFixed(0)}%` : "0%"}
                />
              </div>

              <p className="mt-4 text-xs text-slate-500">
                These are catalog metrics only; merchandise sales and profit are not
                reported here unless a sales data source is connected.
              </p>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-cyan-400/20 bg-[#0d1324] p-6 shadow-xl shadow-black/20">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                      Performance
                    </p>
                    <h2 className="mt-1 text-xl font-bold">
                      Top Products
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Ranked using real affiliate link activity.
                    </p>
                  </div>

                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                    Live Data
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  {topProducts.length === 0 ? (
                    <EmptyState text="No affiliate product activity yet." />
                  ) : (
                    topProducts.map((product, index) => (
                      <div
                        key={product.id}
                        className="rounded-xl border border-white/5 bg-[#070b14] p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-sm font-bold text-purple-300">
                            {index + 1}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate font-semibold text-white">
                              {product.name}
                            </p>

                            {product.category && (
                              <p className="mt-1 text-xs text-slate-500">
                                {product.category}
                              </p>
                            )}

                            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                              <StatCell
                                label="Clicks"
                                value={product.clicks.toLocaleString()}
                              />

                              <StatCell
                                label="Conv."
                                value={product.conversions.toLocaleString()}
                              />

                              <StatCell
                                label="Revenue"
                                value={`$${product.revenue.toFixed(2)}`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-purple-400/20 bg-[#0d1324] p-6 shadow-xl shadow-black/20">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">
                    Content Performance
                  </p>

                  <h2 className="mt-1 text-xl font-bold">
                    Top Content
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Pages generating the most recently recorded
                    affiliate clicks.
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  {topContent.length === 0 ? (
                    <EmptyState text="No affiliate content activity has been recorded yet." />
                  ) : (
                    topContent.map((content, index) => (
                      <div
                        key={content.path}
                        className="rounded-xl border border-white/5 bg-[#070b14] p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-sm font-bold text-cyan-300">
                            {index + 1}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p
                              className="truncate font-semibold text-white"
                              title={content.path}
                            >
                              {formatPath(content.path)}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              Last click:{" "}
                              {formatDate(
                                content.lastClicked
                              )}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="font-bold text-cyan-300">
                              {content.clicks.toLocaleString()}
                            </p>
                            <p className="text-[10px] uppercase tracking-wider text-slate-600">
                              clicks
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-[#111827] p-6">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                    Activity Feed
                  </p>

                  <h2 className="mt-1 text-xl font-bold">
                    Recent Affiliate Activity
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    The latest affiliate clicks recorded by the
                    PulsePlay API.
                  </p>
                </div>

                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {recentClicks.length} recent events
                </span>
              </div>

              {recentClicks.length === 0 ? (
                <div className="mt-6">
                  <EmptyState text="No affiliate clicks have been recorded yet." />
                </div>
              ) : (
                <div className="mt-6 overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">
                      <tr>
                        <th className="px-4 py-3">
                          Product
                        </th>
                        <th className="px-4 py-3">
                          Content
                        </th>
                        <th className="px-4 py-3">
                          Campaign
                        </th>
                        <th className="px-4 py-3">
                          Time
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-white/5">
                      {recentClicks
                        .slice(0, 20)
                        .map((click) => (
                          <tr
                            key={click.id}
                            className="hover:bg-white/[0.02]"
                          >
                            <td className="px-4 py-4">
                              <p className="max-w-[220px] truncate font-medium text-white">
                                {click.product_id
                                  ? productNameById.get(
                                      click.product_id
                                    ) ||
                                    "Affiliate Product"
                                  : "Unassigned Product"}
                              </p>
                            </td>

                            <td className="px-4 py-4">
                              <p
                                className="max-w-[260px] truncate text-slate-300"
                                title={
                                  click.page_path ||
                                  ""
                                }
                              >
                                {formatPath(
                                  click.page_path ||
                                    "Unknown page"
                                )}
                              </p>
                            </td>

                            <td className="px-4 py-4">
                              <span className="rounded-full border border-purple-400/20 bg-purple-400/10 px-2.5 py-1 text-xs text-purple-300">
                                {click.campaign ||
                                  "Direct"}
                              </span>
                            </td>

                            <td className="whitespace-nowrap px-4 py-4 text-slate-500">
                              {formatDate(
                                click.created_at
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}

        <section className="rounded-2xl border border-cyan-400/20 bg-[#0d1324] p-6 shadow-xl shadow-black/20">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Affiliate Product Manager
              </p>

              <h2 className="mt-1 text-xl font-bold">
                {editingId
                  ? "Edit Affiliate Link"
                  : "Add Affiliate Link"}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Store the real affiliate destination securely
                on the API. Visitors only receive the tracked
                redirect.
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={startAdd}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-white/5"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-300">
                PulsePlay product
              </span>

              <select
                value={form.product_id}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    product_id:
                      event.target.value,
                  }))
                }
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#070b14] px-4 py-3 text-white outline-none focus:border-cyan-400"
              >
                <option value="">
                  No product association
                </option>

                {products.map((product) => (
                  <option
                    key={product.id}
                    value={product.id}
                  >
                    {product.name}
                  </option>
                ))}
              </select>

              {products.length === 0 && (
                <p className="mt-1 text-xs text-slate-500">
                  No public products were available for
                  selection. You can still add the affiliate
                  link without a product association.
                </p>
              )}
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-300">
                Merchant
              </span>

              <input
                value={form.merchant}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    merchant:
                      event.target.value,
                  }))
                }
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#070b14] px-4 py-3 text-white outline-none focus:border-cyan-400"
                placeholder="Amazon, Best Buy, etc."
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-300">
                Affiliate network
              </span>

              <input
                value={form.network}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    network:
                      event.target.value,
                  }))
                }
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#070b14] px-4 py-3 text-white outline-none focus:border-cyan-400"
                placeholder="Amazon Associates"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-300">
                Status
              </span>

              <select
                value={form.status}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    status:
                      event.target.value as
                        | "active"
                        | "inactive",
                  }))
                }
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#070b14] px-4 py-3 text-white outline-none focus:border-cyan-400"
              >
                <option value="active">
                  Active
                </option>
                <option value="inactive">
                  Inactive
                </option>
              </select>
            </label>

            <label className="block md:col-span-2">
              <span className="text-sm font-medium text-slate-300">
                Real affiliate URL
              </span>

              <input
                type="url"
                value={form.affiliate_url}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    affiliate_url:
                      event.target.value,
                  }))
                }
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#070b14] px-4 py-3 text-white outline-none focus:border-cyan-400"
                placeholder="https://..."
              />

              <p className="mt-1 text-xs text-slate-500">
                This URL is sent only to the protected API. It
                is not exposed in the public product card.
              </p>
            </label>

            <label className="block md:col-span-2">
              <span className="text-sm font-medium text-slate-300">
                Tracking code{" "}
                <span className="text-slate-500">
                  (optional)
                </span>
              </span>

              <input
                value={form.tracking_code}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    tracking_code:
                      event.target.value,
                  }))
                }
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#070b14] px-4 py-3 text-white outline-none focus:border-cyan-400"
                placeholder="Optional campaign/subtag"
              />
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void saveAffiliateLink()}
              disabled={savingLink}
              className="rounded-lg bg-cyan-400 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {savingLink
                ? "Saving..."
                : editingId
                ? "Update Affiliate Link"
                : "Add Affiliate Link"}
            </button>

            <button
              type="button"
              onClick={startAdd}
              disabled={savingLink}
              className="rounded-lg border border-white/10 px-5 py-2.5 font-semibold text-slate-300 hover:bg-white/5 disabled:opacity-50"
            >
              Clear Form
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#0d1324] p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold">
                Monetization Controls
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Keep revenue channels independent so Printful
                merchandise remains separate from affiliate
                products.
              </p>
            </div>

            <button
              type="button"
              onClick={() => void saveSettings()}
              disabled={saving}
              className="rounded-lg bg-cyan-400 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Toggle
              label="Affiliate monetization"
              checked={settings.affiliate_enabled}
              onChange={(value) =>
                setSettings((current) => ({
                  ...current,
                  affiliate_enabled: value,
                }))
              }
            />

            <Toggle
              label="Merchandise monetization"
              checked={settings.merch_enabled}
              onChange={(value) =>
                setSettings((current) => ({
                  ...current,
                  merch_enabled: value,
                }))
              }
            />

            <Toggle
              label="Display ads"
              checked={settings.ads_enabled}
              onChange={(value) =>
                setSettings((current) => ({
                  ...current,
                  ads_enabled: value,
                }))
              }
            />

            <Toggle
              label="Sponsorships"
              checked={settings.sponsorship_enabled}
              onChange={(value) =>
                setSettings((current) => ({
                  ...current,
                  sponsorship_enabled: value,
                }))
              }
            />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-300">
                Default affiliate network
              </span>

              <input
                value={
                  settings.default_affiliate_network ||
                  ""
                }
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    default_affiliate_network:
                      event.target.value,
                  }))
                }
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#070b14] px-4 py-3 text-white outline-none focus:border-cyan-400"
                placeholder="Amazon Associates"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-300">
                AdSense Publisher ID
              </span>

              <input
                value={
                  settings.adsense_publisher_id || ""
                }
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    adsense_publisher_id:
                      event.target.value,
                  }))
                }
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#070b14] px-4 py-3 text-white outline-none focus:border-cyan-400"
                placeholder="Add when AdSense is approved"
              />
            </label>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#111827]">
          <div className="flex flex-col justify-between gap-4 border-b border-white/10 p-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold">
                Affiliate Links
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Manage active links without exposing their real
                destination URLs to visitors.
              </p>
            </div>

            <button
              type="button"
              onClick={startAdd}
              className="rounded-lg bg-purple-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-400"
            >
              + Add Affiliate Link
            </button>
          </div>

          {loading ? (
            <div className="p-6 text-slate-400">
              Loading affiliate links...
            </div>
          ) : links.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              No affiliate links have been added yet. Add
              your first real affiliate URL above.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-[#0d1324] text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4">
                      Product / Merchant
                    </th>
                    <th className="px-6 py-4">
                      Network
                    </th>
                    <th className="px-6 py-4">
                      Status
                    </th>
                    <th className="px-6 py-4">
                      Clicks
                    </th>
                    <th className="px-6 py-4">
                      Conversions
                    </th>
                    <th className="px-6 py-4">
                      Revenue
                    </th>
                    <th className="px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5">
                  {links.map((link) => (
                    <tr
                      key={link.id}
                      className="hover:bg-white/[0.02]"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">
                          {link.product?.name ||
                            link.merchant ||
                            "Unassigned product"}
                        </div>

                        {link.product?.category && (
                          <div className="mt-1 text-xs text-slate-500">
                            {link.product.category}
                          </div>
                        )}

                        {link.merchant &&
                          link.product?.name && (
                            <div className="mt-1 text-xs text-slate-400">
                              {link.merchant}
                            </div>
                          )}
                      </td>

                      <td className="px-6 py-4 text-slate-300">
                        {link.network}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs ${
                            link.status === "active"
                              ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                              : "border-slate-500/20 bg-slate-500/10 text-slate-400"
                          }`}
                        >
                          {link.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-slate-300">
                        {Number(
                          link.clicks || 0
                        ).toLocaleString()}
                      </td>

                      <td className="px-6 py-4 text-slate-300">
                        {Number(
                          link.conversions || 0
                        ).toLocaleString()}
                      </td>

                      <td className="px-6 py-4 font-semibold text-cyan-300">
                        $
                        {Number(
                          link.revenue || 0
                        ).toFixed(2)}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              startEdit(link)
                            }
                            className="rounded-md border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/5"
                          >
                            Edit
                          </button>

                          {link.status ===
                            "active" && (
                            <button
                              type="button"
                              onClick={() =>
                                void deactivateLink(
                                  link
                                )
                              }
                              className="rounded-md border border-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-500/10"
                            >
                              Deactivate
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  detail,
  accent = "cyan",
}: {
  label: string;
  value: string;
  detail: string;
  accent?: "cyan" | "purple";
}) {
  const accentClasses =
    accent === "purple"
      ? "border-purple-400/20 bg-purple-400/5"
      : "border-cyan-400/20 bg-[#111827]";

  const valueClasses =
    accent === "purple"
      ? "text-purple-300"
      : "text-cyan-300";

  return (
    <div
      className={`rounded-2xl border p-5 shadow-xl shadow-black/20 ${accentClasses}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p
        className={`mt-3 text-2xl font-bold ${valueClasses}`}
      >
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-600">
        {detail}
      </p>
    </div>
  );
}

function MiniMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0d1324] px-5 py-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
        {label}
      </p>

      <p className="mt-2 text-lg font-bold text-white">
        {value}
      </p>
    </div>
  );
}

function StatCell({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] px-2 py-2">
      <p className="text-[9px] uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <p className="mt-1 font-semibold text-slate-300">
        {value}
      </p>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-white/10 bg-[#070b14] p-6 text-center text-sm text-slate-500">
      {text}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-[#070b14] p-4">
      <span className="text-sm font-medium text-slate-200">
        {label}
      </span>

      <input
        type="checkbox"
        checked={checked}
        onChange={(event) =>
          onChange(event.target.checked)
        }
        className="h-5 w-5 accent-cyan-400"
      />
    </label>
  );
}
