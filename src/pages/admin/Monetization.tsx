import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import {
  getMonetizationSettings,
  getMonetizationStats,
  updateMonetizationSettings,
  type AffiliateLinkStats,
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

export default function Monetization() {
  const [summary, setSummary] = useState<MonetizationSummary>({
    totalLinks: 0,
    totalClicks: 0,
    totalConversions: 0,
    totalRevenue: 0,
  });
  const [links, setLinks] = useState<AffiliateLinkStats[]>([]);
  const [settings, setSettings] = useState<MonetizationSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");

    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if (!token) {
        throw new Error("Your admin session has expired. Please sign in again.");
      }

      const [statsResponse, settingsResponse] = await Promise.all([
        getMonetizationStats(token),
        getMonetizationSettings(token),
      ]);

      setSummary(statsResponse.summary);
      setLinks(statsResponse.links);
      setSettings({ ...DEFAULT_SETTINGS, ...(settingsResponse.settings || {}) });
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
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if (!token) throw new Error("Your admin session has expired. Please sign in again.");

      const result = await updateMonetizationSettings(token, settings);
      setSettings({ ...DEFAULT_SETTINGS, ...result.settings });
      setMessage("Monetization settings saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save settings.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#070b14] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">Revenue Command Center</p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">Monetization</h1>
          <p className="mt-2 max-w-3xl text-slate-400">
            Manage PulsePlay affiliate revenue settings and monitor tracked product traffic.
          </p>
        </div>

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

        <section className="rounded-2xl border border-white/10 bg-[#0d1324] p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold">Monetization Controls</h2>
              <p className="mt-1 text-sm text-slate-400">Keep revenue channels independent so Printful merchandise remains separate from affiliate products.</p>
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
            <Toggle label="Affiliate monetization" checked={settings.affiliate_enabled} onChange={(value) => setSettings((current) => ({ ...current, affiliate_enabled: value }))} />
            <Toggle label="Merchandise monetization" checked={settings.merch_enabled} onChange={(value) => setSettings((current) => ({ ...current, merch_enabled: value }))} />
            <Toggle label="Display ads" checked={settings.ads_enabled} onChange={(value) => setSettings((current) => ({ ...current, ads_enabled: value }))} />
            <Toggle label="Sponsorships" checked={settings.sponsorship_enabled} onChange={(value) => setSettings((current) => ({ ...current, sponsorship_enabled: value }))} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-300">Default affiliate network</span>
              <input
                value={settings.default_affiliate_network || ""}
                onChange={(event) => setSettings((current) => ({ ...current, default_affiliate_network: event.target.value }))}
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#070b14] px-4 py-3 text-white outline-none focus:border-cyan-400"
                placeholder="Amazon Associates"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-300">AdSense Publisher ID</span>
              <input
                value={settings.adsense_publisher_id || ""}
                onChange={(event) => setSettings((current) => ({ ...current, adsense_publisher_id: event.target.value }))}
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#070b14] px-4 py-3 text-white outline-none focus:border-cyan-400"
                placeholder="Add when AdSense is approved"
              />
            </label>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#111827]">
          <div className="border-b border-white/10 p-6">
            <h2 className="text-xl font-bold">Affiliate Links</h2>
            <p className="mt-1 text-sm text-slate-400">Real affiliate URLs stay server-side. This dashboard only displays tracking information.</p>
          </div>

          {loading ? (
            <div className="p-6 text-slate-400">Loading monetization data...</div>
          ) : links.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              No affiliate links have been added yet. Once you add your first real affiliate URL, its clicks will appear here.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-[#0d1324] text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Merchant</th>
                    <th className="px-6 py-4">Network</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Clicks</th>
                    <th className="px-6 py-4">Conversions</th>
                    <th className="px-6 py-4">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {links.map((link) => (
                    <tr key={link.id} className="hover:bg-white/[0.02]">
                      <td className="px-6 py-4 font-medium text-white">{link.merchant || "—"}</td>
                      <td className="px-6 py-4 text-slate-300">{link.network}</td>
                      <td className="px-6 py-4"><span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-xs text-cyan-300">{link.status}</span></td>
                      <td className="px-6 py-4 text-slate-300">{link.clicks}</td>
                      <td className="px-6 py-4 text-slate-300">{link.conversions}</td>
                      <td className="px-6 py-4 font-semibold text-cyan-300">${Number(link.revenue || 0).toFixed(2)}</td>
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
