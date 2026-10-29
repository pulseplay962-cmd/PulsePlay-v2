import { useEffect, useState } from "react";
import {
  analyzeStreamVod,
  getStreamClips,
  getStreamVods,
  loadStreamVodToSite,
  renderCaptionedVerticalStreamClip,
  renderSingleStreamClip,
  renderTopStreamClips,
  renderVerticalStreamClip,
  type StreamClip,
  type StreamVod,
} from "../../services/streamClips";

export default function AIStreamClipStudio() {
  const [vods, setVods] = useState<StreamVod[]>([]);
  const [clips, setClips] = useState<StreamClip[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingClips, setLoadingClips] = useState(false);
  const [workingId, setWorkingId] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  async function loadClips() {
    try {
      setLoadingClips(true);
      setClips(await getStreamClips());
    } catch (e: any) {
      setError(e.message || "Unable to load clip candidates.");
    } finally {
      setLoadingClips(false);
    }
  }

  async function load(sync = true) {
    try {
      setLoading(true);
      setError("");
      const [recent] = await Promise.all([getStreamVods(sync), loadClips()]);
      setVods(recent);
    } catch (e: any) {
      setError(e.message || "Unable to load recent VODs.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(true); }, []);

  async function runAction(id: string, label: string, action: () => Promise<any>) {
    try {
      setWorkingId(id);
      setError("");
      setStatus(label);
      const result = await action();
      if (Array.isArray(result?.queued)) {
        setStatus(`Queued ${result.queued.length} clip render(s). Refresh the clip library in a moment to see progress.`);
      } else if (result?.queued === true) {
        setStatus(result.message || "Render request queued. Refresh the clip library in a moment to see progress.");
      } else if (result?.candidates) {
        setStatus(`Analysis complete: ${result.detectedMoments || result.candidates.length} moment(s) detected; ${result.candidates.length} candidate(s) saved.`);
      } else {
        setStatus("Request completed.");
      }
      await loadClips();
      return result;
    } catch (e: any) {
      setStatus("");
      setError(e.message || "The requested clip action failed.");
    } finally {
      setWorkingId("");
    }
    return null;
  }

  async function loadToSite(vod: StreamVod) {
    const result = await runAction(vod.id, `Loading “${vod.title}” to the PulsePlay Videos page...`, async () => {
      await loadStreamVodToSite(vod.id);
      setVods(items => items.map(item => item.id === vod.id ? { ...item, status: "loaded_to_site" } : item));
      return { success: true };
    });
    if (result) setStatus(`“${vod.title}” is loaded on the PulsePlay Videos page. This does not publish generated clips.`);
  }

  const formatTime = (seconds: number) => {
    const total = Math.max(0, Math.floor(Number(seconds) || 0));
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
  };

  return <div className="space-y-6">
    <div className="pp-panel p-6">
      <h1 className="pp-title text-3xl">⚡ PulsePlay AI Clip Command Center</h1>
      <p className="mt-3 text-slate-400">
        Analyze Veiltactician VODs, review AI-selected moments, and queue approved clip renders. Nothing is published automatically.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button className="pp-button" onClick={() => load(true)} disabled={loading || !!workingId}>
          {loading ? "Loading VODs..." : "🔄 Refresh VODs"}
        </button>
        <button className="rounded-xl bg-cyan-400/15 px-5 py-3 font-bold text-cyan-300 disabled:opacity-50" onClick={() => void loadClips()} disabled={loadingClips || !!workingId}>
          {loadingClips ? "Refreshing clips..." : "✂️ Refresh Clip Library"}
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
          <p className="mt-1 text-xs text-slate-500">Analyze a VOD to create clip candidates. AI analysis may use paid API credits; run it only when you want to process that VOD.</p>
        </div>
        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">{vods.length} recent VODs</span>
      </div>

      <div className="mt-5 grid gap-4">
        {vods.map(v => {
          const vodClips = clips.filter(clip => clip.vod_id === v.id);
          return <div key={v.id} className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-black text-white">{v.title}</h3>
                  {v.status === "loaded_to_site" && <span className="rounded-full border border-green-400/30 bg-green-400/10 px-2 py-1 text-xs font-bold text-green-300">VIDEO ON SITE</span>}
                  {v.status === "analyzed" && <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-xs font-bold text-cyan-300">ANALYZED</span>}
                  {v.status === "analysis_failed" && <span className="rounded-full border border-red-400/30 bg-red-400/10 px-2 py-1 text-xs font-bold text-red-300">ANALYSIS FAILED</span>}
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  {v.published_at ? new Date(v.published_at).toLocaleString() : "Unknown date"} • {v.duration || "duration unavailable"} • {v.view_count || 0} views • {vodClips.length} saved candidate(s)
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a className="rounded-xl bg-white/10 px-4 py-2 font-bold text-slate-200" href={v.url} target="_blank" rel="noreferrer">Open VOD</a>
                <button className="rounded-xl bg-purple-500/20 px-4 py-2 font-bold text-purple-200 disabled:opacity-50" onClick={() => void runAction(v.id, `Analyzing “${v.title}” audio and finding highlight moments...`, () => analyzeStreamVod(v.id))} disabled={!!workingId}>
                  {workingId === v.id ? "Working..." : "🔎 Analyze VOD"}
                </button>
                <button className="rounded-xl bg-cyan-400/20 px-4 py-2 font-bold text-cyan-300 disabled:opacity-50" onClick={() => void runAction(v.id, `Queueing the top clip candidates from “${v.title}”...`, () => renderTopStreamClips(v.id, 3))} disabled={!!workingId || vodClips.every(clip => clip.status !== "candidate")}>
                  🎬 Render Top 3
                </button>
                <button className="rounded-xl bg-white/10 px-4 py-2 font-bold text-slate-200 disabled:opacity-50" onClick={() => void loadToSite(v)} disabled={!!workingId}>
                  {v.status === "loaded_to_site" ? "↻ Update Video Page" : "📺 Load VOD to Site"}
                </button>
              </div>
            </div>
          </div>;
        })}
        {!vods.length && !loading && <div className="text-slate-500">No recent VODs found. Check Twitch integration and Render configuration.</div>}
      </div>
    </div>

    <div className="pp-panel p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-cyan-400">✂️ Clip Library & Render Status</h2>
          <p className="mt-1 text-xs text-slate-500">Review candidates and render outputs. Queueing a render does not publish or upload it to social platforms.</p>
        </div>
        <span className="rounded-full border border-purple-400/30 bg-purple-400/10 px-3 py-1 text-xs text-purple-200">{clips.length} clips</span>
      </div>
      <div className="mt-5 grid gap-4">
        {clips.map(clip => <div key={clip.id} className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-black text-white">{clip.title || "Untitled clip candidate"}</h3>
                <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-xs font-bold uppercase text-slate-300">{clip.status}</span>
                {typeof clip.score === "number" && <span className="text-xs text-slate-400">Score {clip.score}/100</span>}
              </div>
              <p className="mt-2 text-sm text-slate-400">
                {clip.ai_stream_vods?.title || "VOD"} • {formatTime(clip.start_seconds)}–{formatTime(clip.end_seconds)} • {clip.moment_type || "highlight"}
              </p>
              {clip.ai_reason && <p className="mt-2 text-sm text-slate-500">{clip.ai_reason}</p>}
              {clip.error && <p className="mt-2 text-sm text-red-300">Render error: {clip.error}</p>}
              <div className="mt-3 flex flex-wrap gap-3 text-sm">
                {clip.clip_url && <a className="font-bold text-cyan-300 underline" href={clip.clip_url} target="_blank" rel="noreferrer">Open master clip</a>}
                {clip.vertical_clip_url && <a className="font-bold text-cyan-300 underline" href={clip.vertical_clip_url} target="_blank" rel="noreferrer">Open vertical clip</a>}
                {clip.captioned_vertical_clip_url && <a className="font-bold text-cyan-300 underline" href={clip.captioned_vertical_clip_url} target="_blank" rel="noreferrer">Open captioned clip</a>}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {clip.status === "candidate" && <button className="rounded-xl bg-cyan-400/20 px-4 py-2 font-bold text-cyan-300 disabled:opacity-50" onClick={() => void runAction(clip.id, `Queueing “${clip.title}” for rendering...`, () => renderSingleStreamClip(clip.id))} disabled={!!workingId}>🎬 Render top clips</button>}
              {clip.clip_url && !clip.vertical_clip_url && <button className="rounded-xl bg-purple-500/20 px-4 py-2 font-bold text-purple-200 disabled:opacity-50" onClick={() => void runAction(clip.id, `Queueing vertical render for “${clip.title}”...`, () => renderVerticalStreamClip(clip.id))} disabled={!!workingId}>📱 Make 9:16</button>}
              {clip.vertical_clip_url && !clip.captioned_vertical_clip_url && <button className="rounded-xl bg-pink-500/20 px-4 py-2 font-bold text-pink-200 disabled:opacity-50" onClick={() => void runAction(clip.id, `Generating captions and queueing “${clip.title}”...`, () => renderCaptionedVerticalStreamClip(clip.id))} disabled={!!workingId}>💬 Add Captions</button>}
            </div>
          </div>
        </div>)}
        {!clips.length && !loadingClips && <div className="text-slate-500">No clip candidates found yet. Choose a VOD above and run Analyze VOD to start.</div>}
      </div>
    </div>
  </div>;
}
