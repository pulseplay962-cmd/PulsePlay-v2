import { useEffect, useState } from "react";
import {
  getSettings,
  updateSetting,
} from "../../services/settings";

type SettingsMap = Record<string, string>;

export default function Settings() {
  const [settings, setSettings] = useState<SettingsMap>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getSettings();

        const map: SettingsMap = {};

        data.forEach((item: any) => {
          map[item.key] = item.value;
        });

        setSettings(map);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  async function save() {
    setSaving(true);

    try {
      for (const [key, value] of Object.entries(settings)) {
        await updateSetting(key, value);
      }

      alert("Settings saved!");
    } catch (err) {
      console.error(err);
      alert("Failed to save settings.");
    }

    setSaving(false);
  }

  function update(key: string, value: string) {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  const fields = [
    ["hero_title", "Hero Title"],
    ["hero_subtitle", "Hero Subtitle"],
    ["twitch_channel", "Twitch Channel"],
    ["website_url", "Website URL"],
    ["amazon_url", "Amazon Affiliate"],
    ["throne_url", "Throne Wishlist"],
    ["discord_url", "Discord"],
    ["youtube_url", "YouTube"],
  ];

  return (
    <div>
      <h1 className="text-4xl font-black">
        Site Settings
      </h1>

      <div className="mt-8 max-w-3xl space-y-6 rounded-xl bg-[#111827] p-8">
        {fields.map(([key, label]) => (
          <div key={key}>
            <label className="mb-2 block font-bold">
              {label}
            </label>

            <input
              className="w-full rounded bg-[#1f2937] p-3"
              value={settings[key] || ""}
              onChange={(e) =>
                update(key, e.target.value)
              }
            />
          </div>
        ))}

        <button
          onClick={save}
          disabled={saving}
          className="rounded-lg bg-cyan-500 px-6 py-3 font-bold text-black hover:bg-cyan-400 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}