import { useEffect, useMemo, useState } from "react";
import {
  createStreamClipCandidate,
  getStreamClips,
  getStreamVods,
  renderStreamClip,
  analyzeStreamVod,
  type StreamClip,
  type StreamVod
} from "../../services/streamClips";

function clock(total:number) {
  const s=Math.max(0,Math.floor(total||0));
  const h=Math.floor(s/3600), m=Math.floor((s%3600)/60), sec=s%60;
  return h ? `${h}:${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}` : `${m}:${String(sec).padStart(2,"0")}`;
}

export default function AIStreamClipStudio() {
  const [vods,setVods]=useState<StreamVod[]>([]);
  const [clips,setClips]=useState<StreamClip[]>([]);
  const [selectedVod,setSelectedVod]=useState("");
  const [start,setStart]=useState("");
  const [end,setEnd]=useState("");
  const [momentType,setMomentType]=useState("highlight");
  const [context,setContext]=useState("");
  const [loading,setLoading]=useState(true);
  const [working,setWorking]=useState(false);
  const [error,setError]=useState("");

  async function load(sync=true) {
    try {
      setLoading(true); setError("");
      const [v,c]=await Promise.all([getStreamVods(sync),getStreamClips()]);
      setVods(v); setClips(c);
      if (!selectedVod && v[0]) setSelectedVod(v[0].id);
    } catch(e:any) { setError(e.message || "Unable to load stream clips."); }
    finally { setLoading(false); }
  }

  useEffect(()=>{ load(true); },[]);

  const currentVod=useMemo(()=>vods.find(v=>v.id===selectedVod),[vods,selectedVod]);

  async function makeCandidate() {
    try {
      const a=Number(start), b=Number(end);
      if(!selectedVod || !Number.isFinite(a) || !Number.isFinite(b) || b<=a) throw new Error("Enter valid start and end seconds.");
      if(b-a>180) throw new Error("Clips are limited to 180 seconds.");
      setWorking(true); setError("");
      await createStreamClipCandidate({vodId:selectedVod,startSeconds:a,endSeconds:b,momentType,context});
      setStart(""); setEnd(""); setContext("");
      setClips(await getStreamClips());
    } catch(e:any) { setError(e.message || "Unable to create clip candidate."); }
    finally { setWorking(false); }
  }

  async function analyze(id:string) {
    try {
      setWorking(true); setError("");
      await analyzeStreamVod(id);
      setClips(await getStreamClips());
      setVods(await getStreamVods(false));
    } catch(e:any) { setError(e.message || "Unable to analyze VOD."); }
    finally { setWorking(false); }
  }

  async function render(id:string) {
    try {
      setWorking(true); setError("");
      const updated=await renderStreamClip(id);
      setClips(items=>items.map(item=>item.id===id?updated:item));
    } catch(e:any) { setError(e.message || "Unable to render clip."); }
    finally { setWorking(false); }
  }

  return <div className="space-y-6">
    <div className="pp-panel p-6">
      <h1 className="pp-title text-3xl">⚡ AI Stream Clip Command Center</h1>
      <p className="mt-3 text-slate-400">One Stream. Endless Content. Sync Veiltactician VODs, let AI find memorable moments, generate titles, and render shareable MP4 clips.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button className="pp-button" onClick={()=>load(true)} disabled={loading}>{loading?"Syncing VODs...":"🔄 Sync Twitch VODs"}</button>
        {currentVod && <button className="rounded-xl bg-pink-500/20 px-5 py-3 font-bold text-pink-300" onClick={()=>analyze(currentVod.id)} disabled={working}>🤖 Analyze VOD & Find Moments</button>}
        <a className="rounded-xl bg-purple-500/20 px-5 py-3 font-bold text-purple-300" href={currentVod?.url || "https://www.twitch.tv/veiltactician/videos"} target="_blank" rel="noreferrer">🎥 Open VOD</a>
      </div>
    </div>

    {error && <div className="pp-panel border border-red-500/40 p-5 text-red-300">{error}</div>}

    <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
      <div className="pp-panel p-6">
        <h2 className="text-xl font-black text-cyan-400">📡 Recent Veiltactician VODs</h2>
        <div className="mt-4 space-y-3">
          {vods.map(v=><button key={v.id} onClick={()=>setSelectedVod(v.id)} className={`w-full rounded-xl border p-4 text-left ${selectedVod===v.id?"border-cyan-400 bg-cyan-400/10":"border-white/10 bg-black/20"}`}>
            <div className="flex items-center justify-between gap-3"><div className="font-bold">{v.title}</div><span className="text-xs uppercase text-cyan-400">{v.status || "discovered"}</span></div>
            <div className="mt-1 text-sm text-slate-500">{v.published_at ? new Date(v.published_at).toLocaleString() : "Unknown date"} • {v.duration || "duration unavailable"} • {v.view_count || 0} views</div>
          </button>)}
          {!vods.length && !loading && <div className="text-slate-500">No VODs found. Make sure Twitch credentials are configured in Render.</div>}
        </div>
      </div>

      <div className="pp-panel p-6">
        <h2 className="text-xl font-black text-purple-400">✂️ Create Manual Clip</h2>
        <p className="mt-2 text-sm text-slate-500">{currentVod?.title || "Select a VOD"}</p>
        <p className="mt-2 text-xs text-slate-500">Use this only when you already know the exact moment. Automatic AI candidates are created by <strong>Analyze VOD & Find Moments</strong>.</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <input className="rounded-xl bg-black/30 p-3 text-white" placeholder="Start seconds" value={start} onChange={e=>setStart(e.target.value)} />
          <input className="rounded-xl bg-black/30 p-3 text-white" placeholder="End seconds" value={end} onChange={e=>setEnd(e.target.value)} />
        </div>
        <select className="mt-3 w-full rounded-xl bg-black/30 p-3 text-white" value={momentType} onChange={e=>setMomentType(e.target.value)}>
          <option value="highlight">🔥 Highlight</option><option value="combat">⚔️ Combat</option><option value="funny">😂 Funny</option><option value="boss_fight">🏆 Boss Fight</option><option value="story">📖 Story</option><option value="fail">💀 Fail</option><option value="reaction">😱 Reaction</option>
        </select>
        <textarea className="mt-3 min-h-[110px] w-full rounded-xl bg-black/30 p-3 text-white" placeholder="Optional context for AI titles: what happened in this moment?" value={context} onChange={e=>setContext(e.target.value)} />
        <button className="pp-button mt-3 w-full" onClick={makeCandidate} disabled={working || !selectedVod}>{working?"Working...":"🎯 Generate Titles + Clip Candidate"}</button>
      </div>
    </div>

    <div className="pp-panel p-6">
      <h2 className="text-xl font-black text-pink-400">🎬 Clip Library</h2>
      <div className="mt-5 grid gap-4">
        {clips.map(c=><div key={c.id} className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-black">{c.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{c.moment_type || "highlight"} • {clock(c.start_seconds)} - {clock(c.end_seconds)} • {c.status}</p>
            </div>
            {c.status!=="ready" && <button className="rounded-xl bg-cyan-400/20 px-4 py-2 font-bold text-cyan-300" onClick={()=>render(c.id)} disabled={working}>🎬 Render MP4</button>}
          </div>
          {c.ai_title_options?.length ? <div className="mt-3 text-sm text-slate-400">AI title options: {c.ai_title_options.join(" • ")}</div>:null}
          {c.description && <p className="mt-3 text-slate-300">{c.description}</p>}
          {c.clip_url && <video className="mt-4 w-full rounded-xl border border-white/10" controls src={c.clip_url} />}
          {c.status==="failed" && <p className="mt-3 text-sm text-red-300">{c.error}</p>}
        </div>)}
        {!clips.length && <div className="text-slate-500">No clip candidates yet.</div>}
      </div>
    </div>
  </div>;
}
