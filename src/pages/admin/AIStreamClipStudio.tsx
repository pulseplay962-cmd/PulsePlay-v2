import { useEffect, useState } from "react";
import { getStreamVods, loadStreamVodToSite, type StreamVod } from "../../services/streamClips";

export default function AIStreamClipStudio() {
  const [vods,setVods]=useState<StreamVod[]>([]);
  const [loading,setLoading]=useState(true);
  const [workingId,setWorkingId]=useState("");
  const [status,setStatus]=useState("");
  const [error,setError]=useState("");

  async function load(sync=true) {
    try {
      setLoading(true);
      setError("");
      const recent=await getStreamVods(sync);
      setVods(recent);
    } catch(e:any) {
      setError(e.message || "Unable to load recent VODs.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{ load(true); },[]);

  async function loadToSite(vod:StreamVod) {
    try {
      setWorkingId(vod.id);
      setError("");
      setStatus(`📺 Loading “${vod.title}” to the PulsePlay Videos page...`);
      await loadStreamVodToSite(vod.id);
      setVods(items=>items.map(item=>item.id===vod.id ? {...item,status:"loaded_to_site"} : item));
      setStatus(`✅ “${vod.title}” is now loaded on the PulsePlay Videos page.`);
    } catch(e:any) {
      setStatus("");
      setError(e.message || "Unable to load VOD to the site.");
    } finally {
      setWorkingId("");
    }
  }

  return <div className="space-y-6">
    <div className="pp-panel p-6">
      <h1 className="pp-title text-3xl">⚡ PulsePlay VOD Command Center</h1>
      <p className="mt-3 text-slate-400">
        Sync the latest Veiltactician Twitch VODs and choose which ones should appear on the PulsePlay Videos page.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button className="pp-button" onClick={()=>load(true)} disabled={loading || !!workingId}>
          {loading ? "Loading VODs..." : "🔄 Refresh Recent VODs"}
        </button>
        <a className="rounded-xl bg-purple-500/20 px-5 py-3 font-bold text-purple-300" href="https://www.twitch.tv/veiltactician/videos" target="_blank" rel="noreferrer">
          🎥 Open Twitch VODs
        </a>
      </div>
    </div>

    {status && <div className="pp-panel border border-cyan-400/30 p-5 text-cyan-300"><div className="font-bold">STATUS</div><div className="mt-1">{status}</div></div>}
    {error && <div className="pp-panel border border-red-500/40 p-5 text-red-300"><div className="font-bold">ERROR</div><div className="mt-1">{error}</div></div>}

    <div className="pp-panel p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-cyan-400">📡 Recent Veiltactician VODs</h2>
          <p className="mt-1 text-xs text-slate-500">Select a recent VOD and load it directly into PulsePlay's Videos section. No clip library or render queue is involved.</p>
        </div>
        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">{vods.length} recent VODs</span>
      </div>

      <div className="mt-5 grid gap-4">
        {vods.map(v=><div key={v.id} className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-black text-white">{v.title}</h3>
                {v.status==="loaded_to_site" && <span className="rounded-full border border-green-400/30 bg-green-400/10 px-2 py-1 text-xs font-bold text-green-300">ON SITE</span>}
              </div>
              <p className="mt-2 text-sm text-slate-500">
                {v.published_at ? new Date(v.published_at).toLocaleString() : "Unknown date"} • {v.duration || "duration unavailable"} • {v.view_count || 0} views
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a className="rounded-xl bg-white/10 px-4 py-2 font-bold text-slate-200" href={v.url} target="_blank" rel="noreferrer">Open VOD</a>
              <button
                className="rounded-xl bg-cyan-400/20 px-4 py-2 font-bold text-cyan-300 disabled:opacity-50"
                onClick={()=>loadToSite(v)}
                disabled={!!workingId}
              >
                {workingId===v.id ? "Loading..." : v.status==="loaded_to_site" ? "↻ Update on Site" : "📺 Load to Site"}
              </button>
            </div>
          </div>
        </div>)}
        {!vods.length && !loading && <div className="text-slate-500">No recent VODs found. Make sure Twitch credentials are configured in Render.</div>}
      </div>
    </div>
  </div>;
}
