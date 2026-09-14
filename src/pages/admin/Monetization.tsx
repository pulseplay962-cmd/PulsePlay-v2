import { useEffect, useState } from "react";
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
  const [settings, setSettings] = useState<MonetizationSettings>(DEFAULT_SETTINGS);
  const [form, setForm] = useState<LinkForm>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingLink, setSavingLink] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function getToken() {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) throw new Error("Your admin session has expired. Please sign in again.");
    return token;
  }

  async function load() {
    setLoading(true);
    setError("");

    try {
      const token = await getToken();
      const [statsResponse, settingsResponse, linksResponse, productsResponse] = await Promise.all([
        getMonetizationStats(token),
        getMonetizationSettings(token),
        getAffiliateLinks(token),
        supabase.from("products").select("id, name, description, price, image, category").order("name"),
      ]);

      setSummary(statsResponse.summary);
      setLinks(linksResponse.links || []);
      setSettings({ ...DEFAULT_SETTINGS, ...(settingsResponse.settings || {}) });

      if (productsResponse.error) {
        console.warn("Unable to load affiliate products:", productsResponse.error.message);
        setProducts([]);
      } else {
        setProducts((productsResponse.data || []) as AffiliateProduct[]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load monetization data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function saveSettings() {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const token = await getToken();
      const result = await updateMonetizationSettings(token, settings);
      setSettings({ ...DEFAULT_SETTINGS, ...result.settings });
      setMessage("Monetization settings saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save settings.");
    } finally {
      setSaving(false);
    }
  }

  function startAdd() {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, network: settings.default_affiliate_network || "Amazon Associates" });
    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startEdit(link: AffiliateLink) {
    setEditingId(link.id);
    setForm({
      product_id: link.product_id || "",
      network: link.network || "Amazon Associates",
      merchant: link.merchant || "",
      affiliate_url: link.affiliate_url || "",
      tracking_code: link.tracking_code || "",
      status: link.status === "inactive" ? "inactive" : "active",
    });
    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
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

      if (!payload.network) throw new Error("Affiliate network is required.");
      if (!/^https?:\/\//i.test(payload.affiliate_url)) {
        throw new Error("Affiliate URL must start with http:// or https://.");
      }

      if (editingId) {
        await updateAffiliateLink(token, editingId, payload);
        setMessage("Affiliate link updated.");
      } else {
        await createAffiliateLink(token, payload);
        setMessage("Affiliate link added successfully.");
      }

      setEditingId(null);
      setForm(EMPTY_FORM);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save affiliate link.");
    } finally {
      setSavingLink(false);
    }
  }

  async function deactivateLink(link: AffiliateLink) {
    if (!window.confirm(`Deactivate the ${link.merchant || link.network} affiliate link?`)) return;

    setMessage("");
    setError("");

    try {
      const token = await getToken();
      await deactivateAffiliateLink(token, link.id);
      setMessage("Affiliate link deactivated. Click and revenue history was preserved.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to deactivate affiliate link.");
    }
  }

  return (
    <div className="min-h-screen bg-[#070b14] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">Revenue Command Center</p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">Monetization</h1>
          <p className="mt-2 max-w-3xl text-slate-400">
            Manage PulsePlay affiliate revenue, product links, and monetization settings from one place.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>
        )}
        {message && (
          <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200">{message}</div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Affiliate Links", summary.totalLinks],
            ["Tracked Clicks", summary.totalClicks],
            ["Conversions", summary.totalConversions],
            ["Revenue", `$${summary.totalRevenue.toFixed(2)}`],
          ].map(([label, value]) => (
            <div key={String(label)} className="rounded-2xl border border-white/10 bg-[#111827] p-5 shadow-xl shadow-black/20">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
              <p className="mt-3 text-2xl font-bold text-white">{value}</p>
            </div>
          ))}
        </div>

        <section className="rounded-2xl border border-cyan-400/20 bg-[#0d1324] p-6 shadow-xl shadow-black/20">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Affiliate Product Manager</p>
              <h2 className="mt-1 text-xl font-bold">{editingId ? "Edit Affiliate Link" : "Add Affiliate Link"}</h2>
              <p className="mt-1 text-sm text-slate-400">
                Store the real affiliate destination securely on the API. Visitors only receive the tracked redirect.
              </p>
            </div>
            {editingId && (
              <button type="button" onClick={startAdd} className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-white/5">
                Cancel Edit
              </button>
            )}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-300">PulsePlay product</span>
              <select
                value={form.product_id}
                onChange={(event) => setForm((current) => ({ ...current, product_id: event.target.value }))}
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#070b14] px-4 py-3 text-white outline-none focus:border-cyan-400"
              >
                <option value="">No product association</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
              {products.length === 0 && <p className="mt-1 text-xs text-slate-500">No public products were available for selection. You can still add the affiliate link without a product association.</p>}
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-300">Merchant</span>
              <input value={form.merchant} onChange={(event) => setForm((current) => ({ ...current, merchant: event.target.value }))} className="mt-2 w-full rounded-lg border border-white/10 bg-[#070b14] px-4 py-3 text-white outline-none focus:border-cyan-400" placeholder="Amazon, Best Buy, etc." />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-300">Affiliate network</span>
              <input value={form.network} onChange={(event) => setForm((current) => ({ ...current, network: event.target.value }))} className="mt-2 w-full rounded-lg border border-white/10 bg-[#070b14] px-4 py-3 text-white outline-none focus:border-cyan-400" placeholder="Amazon Associates" />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-300">Status</span>
              <select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as "active" | "inactive" }))} className="mt-2 w-full rounded-lg border border-white/10 bg-[#070b14] px-4 py-3 text-white outline-none focus:border-cyan-400">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>

            <label className="block md:col-span-2">
              <span className="text-sm font-medium text-slate-300">Real affiliate URL</span>
              <input type="url" value={form.affiliate_url} onChange={(event) => setForm((current) => ({ ...current, affiliate_url: event.target.value }))} className="mt-2 w-full rounded-lg border border-white/10 bg-[#070b14] px-4 py-3 text-white outline-none focus:border-cyan-400" placeholder="https://..." />
              <p className="mt-1 text-xs text-slate-500">This URL is sent only to the protected API. It is not exposed in the public product card.</p>
            </label>

            <label className="block md:col-span-2">
              <span className="text-sm font-medium text-slate-300">Tracking code <span className="text-slate-500">(optional)</span></span>
              <input value={form.tracking_code} onChange={(event) => setForm((current) => ({ ...current, tracking_code: event.target.value }))} className="mt-2 w-full rounded-lg border border-white/10 bg-[#070b14] px-4 py-3 text-white outline-none focus:border-cyan-400" placeholder="Optional campaign/subtag" />
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => void saveAffiliateLink()} disabled={savingLink} className="rounded-lg bg-cyan-400 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50">
              {savingLink ? "Saving..." : editingId ? "Update Affiliate Link" : "Add Affiliate Link"}
            </button>
            <button type="button" onClick={startAdd} disabled={savingLink} className="rounded-lg border border-white/10 px-5 py-2.5 font-semibold text-slate-300 hover:bg-white/5 disabled:opacity-50">
              Clear Form
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#0d1324] p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold">Monetization Controls</h2>
              <p className="mt-1 text-sm text-slate-400">Keep revenue channels independent so Printful merchandise remains separate from affiliate products.</p>
            </div>
            <button type="button" onClick={() => void saveSettings()} disabled={saving} className="rounded-lg bg-cyan-400 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50">
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Toggle label="Affiliate monetization" checked={settings.affiliate_enabled} onChange={(value) => setSettings((current) => ({ ...current, affiliate_enabled: value }))} />
            <Toggle label="Merchandise monetization" checked={settings.merch_enabled} onChange={(value) => setSettings((current) => ({ ...current, merch_enabled: value }))} />
            <Toggle label="Display ads" checked={settings.ads_enabled} onChange={(value) => setSettings((current) => ({ ...current, ads_enabled: value }))} />
            <Toggle label="Sponsorships" checked={settings.sponsorship_enabled} onChange={(value) => setSettings((current) => ({ ...current, sponsorship_enabled: value }))} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-300">Default affiliate network</span>
              <input value={settings.default_affiliate_network || ""} onChange={(event) => setSettings((current) => ({ ...current, default_affiliate_network: event.target.value }))} className="mt-2 w-full rounded-lg border border-white/10 bg-[#070b14] px-4 py-3 text-white outline-none focus:border-cyan-400" placeholder="Amazon Associates" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-300">AdSense Publisher ID</span>
              <input value={settings.adsense_publisher_id || ""} onChange={(event) => setSettings((current) => ({ ...current, adsense_publisher_id: event.target.value }))} className="mt-2 w-full rounded-lg border border-white/10 bg-[#070b14] px-4 py-3 text-white outline-none focus:border-cyan-400" placeholder="Add when AdSense is approved" />
            </label>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#111827]">
          <div className="flex flex-col justify-between gap-4 border-b border-white/10 p-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold">Affiliate Links</h2>
              <p className="mt-1 text-sm text-slate-400">Manage active links without exposing their real destination URLs to visitors.</p>
            </div>
            <button type="button" onClick={startAdd} className="rounded-lg bg-purple-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-400">+ Add Affiliate Link</button>
          </div>

          {loading ? (
            <div className="p-6 text-slate-400">Loading monetization data...</div>
          ) : links.length === 0 ? (
            <div className="p-8 text-center text-slate-400">No affiliate links have been added yet. Add your first real affiliate URL above.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-[#0d1324] text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Product / Merchant</th>
                    <th className="px-6 py-4">Network</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Clicks</th>
                    <th className="px-6 py-4">Conversions</th>
                    <th className="px-6 py-4">Revenue</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {links.map((link) => (
                    <tr key={link.id} className="hover:bg-white/[0.02]">
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">{link.product?.name || link.merchant || "Unassigned product"}</div>
                        {link.product?.category && <div className="mt-1 text-xs text-slate-500">{link.product.category}</div>}
                        {link.merchant && link.product?.name && <div className="mt-1 text-xs text-slate-400">{link.merchant}</div>}
                      </td>
                      <td className="px-6 py-4 text-slate-300">{link.network}</td>
                      <td className="px-6 py-4"><span className={`rounded-full border px-2.5 py-1 text-xs ${link.status === "active" ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-300" : "border-slate-500/20 bg-slate-500/10 text-slate-400"}`}>{link.status}</span></td>
                      <td className="px-6 py-4 text-slate-300">{link.clicks}</td>
                      <td className="px-6 py-4 text-slate-300">{link.conversions}</td>
                      <td className="px-6 py-4 font-semibold text-cyan-300">${Number(link.revenue || 0).toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button type="button" onClick={() => startEdit(link)} className="rounded-md border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/5">Edit</button>
                          {link.status === "active" && <button type="button" onClick={() => void deactivateLink(link)} className="rounded-md border border-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-500/10">Deactivate</button>}
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

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-[#070b14] p-4">
      <span className="text-sm font-medium text-slate-200">{label}</span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-5 w-5 accent-cyan-400" />
    </label>
  );
}
