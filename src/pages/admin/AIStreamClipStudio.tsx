import { useEffect, useMemo, useState } from "react";
import {
  createStreamClipCandidate,
  getStreamClips,
  getStreamVods,
  renderStreamClip,
  analyzeStreamVod,
  autoRenderTopClips,
  type StreamClip,
  type StreamVod
} from "../../services/streamClips";

function clock(total:number) {
  const s=Math.max(0,Math.floor(total||0));
  const h=Math.floor(s/3600), m=Math.floor((s%3600)/60), sec=s%60;
  return h ? `${h}:${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}` : `${m}:${String(sec).padStart(2,"0")}`;
}

function socialPackage(clip:StreamClip) {
  const title=clip.title?.trim() || "PulsePlay Gaming Highlight";
  const description=clip.description?.trim() || "A memorable Veiltactician gaming moment from PulsePlay.";
  const tags=["#PulsePlay","#Veiltactician","#Gaming","#GamingClips","#Twitch","#Shorts"];
  return {
    youtube:{title:title.slice(0,100),text:description+"\n\nWatch more from Veiltactician at PulsePlay.online ⚡\n\n"+tags.join(" ")+" #YouTubeShorts"},
    facebook:{title:"🎮 "+title,text:description+"\n\nMore gaming, streaming, community and clips: PulsePlay.online ⚡\n\n"+tags.join(" ")+" #FacebookReels"},
    instagram:{title:title,text:description+"\n\n⚡ Level Up with PulsePlay\n\n"+tags.join(" ")+" #InstagramReels"},
    tiktok:{title:title,text:description+"\n\n⚡ PulsePlay.online | Veiltactician\n\n"+tags.join(" ")+" #TikTokGaming"}
  };
}

function downloadName(clip:StreamClip) {
  const safe=(clip.title?.trim() || "pulseplay-gaming-highlight")
    .replace(/[^a-z0-9]+/gi,"-")
    .replace(/^-+|-+$/g,"")
    .slice(0,80)
    .toLowerCase();
  return `${safe || "pulseplay-gaming-highlight"}.mp4`;
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
  const [status,setStatus]=useState("");
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

  async function analyze(id:string) {
    try {
      if(!id) throw new Error("Select a VOD first.");
      setWorking(true); setError("");
      setStatus("🤖 AI analysis started. Sending the selected VOD to PulsePlay...");
      await analyzeStreamVod(id);
      setStatus("✅ AI analysis finished. Loading the clip candidates...");
      const [newClips,newVods]=await Promise.all([getStreamClips(),getStreamVods(false)]);
      setClips(newClips); setVods(newVods);
      setStatus(`✅ Analysis complete. ${newClips.length} clip candidate${newClips.length===1?"":"s"} are now in the Clip Library.`);
    } catch(e:any) { setStatus(""); setError(e.message || "Unable to analyze VOD."); }
    finally { setWorking(false); }
  }

  async function autoRender() {
    try {
      if(!selectedVod) throw new Error("Select a VOD first.");
      setWorking(true); setError("");
      setStatus("🎬 Selecting the top 3 AI-ranked clips for this VOD...");
      const batchCandidates = clips.filter(c=>c.vod_id===selectedVod && c.status==="candidate").sort((a,b)=>(Number(b.score)||0)-(Number(a.score)||0)).slice(0,3);
      const batchIds = batchCandidates.map(c=>c.id);

      if(!batchIds.length) {
        const ready = clips.filter(c=>c.vod_id===selectedVod && c.status==="ready").length;
        setStatus(ready ? `ℹ️ This VOD already has ${ready} rendered clip${ready===1?"":"s"}. Analyze the VOD again or create another candidate to render more.` : "ℹ️ No candidate clips are waiting to be rendered for this VOD.");
        return;
      }

      setStatus(`🎬 Current Render Batch: 0/${batchIds.length} ready. Starting the isolated render worker...`);
      await autoRenderTopClips(selectedVod,3);

      let lastStatus = "";
      for(let attempt=0; attempt<36; attempt++) {
        await new Promise(resolve=>setTimeout(resolve,5000));
        const newClips=await getStreamClips(selectedVod);
        setClips(newClips);
        const batch = newClips.filter(c=>batchIds.includes(c.id));
        const rendering=batch.filter(c=>c.status==="rendering").length;
        const ready=batch.filter(c=>c.status==="ready").length;
        const failed=batch.filter(c=>c.status==="failed").length;
        const remaining=batch.filter(c=>c.status==="candidate").length;

        if(rendering || remaining) {
          const message=`🎬 Auto-render running... ${ready}/${batchIds.length} ready, ${rendering} rendering, ${remaining} waiting.`;
          if(message!==lastStatus) { setStatus(message); lastStatus=message; }
          continue;
        }
        setStatus(`✅ Auto-render complete. ${ready}/${batchIds.length} clips ready${failed ? `, ${failed} failed` : ", 0 failed"}.`);
        return;
      }
      setStatus("⏳ Rendering is still running in the background. The Clip Library will update as the selected clips finish.");
    } catch(e:any) { setStatus(""); setError(e.message || "Unable to start auto-render."); }
    finally { setWorking(false); }
  }

  async function makeCandidate() {
    try {
      setWorking(true); setError("");
      const a=Number(start), b=Number(end);
      if(!Number.isFinite(a) || !Number.isFinite(b) || b<=a) {
        setStatus("🤖 AI analysis started. Looking for memorable moments automatically...");
        await analyze(selectedVod);
        return;
      }
      if(b-a>180) throw new Error("Clips are limited to 180 seconds.");
      setStatus("🎯 Creating the manual clip candidate...");
      await createStreamClipCandidate({vodId:selectedVod,startSeconds:a,endSeconds:b,momentType,context});
      setStart(""); setEnd(""); setContext("");
      setClips(await getStreamClips());
      setStatus("✅ Manual clip candidate created.");
    } catch(e:any) { setStatus(""); setError(e.message || "Unable to create clip candidate."); }
    finally { setWorking(false); }
  }

  async function render(id:string) {
    try {
      setWorking(true); setError(""); setStatus("🎬 Rendering the MP4 clip...");
      const updated=await renderStreamClip(id);
      setClips(items=>items.map(item=>item.id===id?updated:item));
      setStatus("✅ MP4 clip rendered and added to the Clip Library.");
    } catch(e:any) { setStatus(""); setError(e.message || "Unable to render clip."); }
    finally { setWorking(false); }
  }

  return <div className="space-y-6">
    <div className="pp-panel p-6">
      <h1 className="pp-title text-3xl">⚡ AI Stream Clip Command Center</h1>
      <p className="mt-3 text-slate-400">One Stream. Endless Content. Sync Veiltactician VODs, let AI find memorable moments, generate titles, and render shareable MP4 clips.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button className="pp-button" onClick={()=>load(true)} disabled={loading || working}>{loading?"Syncing VODs...":"🔄 Sync Twitch VODs"}</button>
        {currentVod && <button className="rounded-xl bg-pink-500/20 px-5 py-3 font-bold text-pink-300" onClick={()=>analyze(currentVod.id)} disabled={working}>🤖 Analyze VOD & Find Moments</button>}
        {currentVod && <button className="rounded-xl bg-cyan-400/20 px-5 py-3 font-bold text-cyan-300" onClick={autoRender} disabled={working}>🎬 Auto-Render Top 3 Clips</button>}
        <a className="rounded-xl bg-purple-500/20 px-5 py-3 font-bold text-purple-300" href={currentVod?.url || "https://www.twitch.tv/veiltactician/videos"} target="_blank" rel="noreferrer">🎥 Open VOD</a>
      </div>
    </div>

    {status && <div className="pp-panel border border-cyan-400/30 p-5 text-cyan-300"><div className="font-bold">{working ? "PROCESSING" : "STATUS"}</div><div className="mt-1">{status}</div></div>}
    {error && <div className="pp-panel border border-red-500/40 p-5 text-red-300"><div className="font-bold">ERROR</div><div className="mt-1">{error}</div></div>}

    <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
      <div className="pp-panel p-6">
        <h2 className="text-xl font-black text-cyan-400">📡 Recent Veiltactician VODs</h2>
        <div className="mt-4 space-y-3">
          {vods.map(v=><button key={v.id} onClick={()=>setSelectedVod(v.id)} disabled={working} className={`w-full rounded-xl border p-4 text-left ${selectedVod===v.id?"border-cyan-400 bg-cyan-400/10":"border-white/10 bg-black/20"}`}>
            <div className="flex items-center justify-between gap-3"><div className="font-bold">{v.title}</div><span className="text-xs uppercase text-cyan-400">{v.status || "discovered"}</span></div>
            <div className="mt-1 text-sm text-slate-500">{v.published_at ? new Date(v.published_at).toLocaleString() : "Unknown date"} • {v.duration || "duration unavailable"} • {v.view_count || 0} views</div>
          </button>)}
          {!vods.length && !loading && <div className="text-slate-500">No VODs found. Make sure Twitch credentials are configured in Render.</div>}
        </div>
      </div>

      <div className="pp-panel p-6">
        <h2 className="text-xl font-black text-purple-400">✂️ Clip Creator</h2>
        <p className="mt-2 text-sm text-slate-500">{currentVod?.title || "Select a VOD"}</p>
        <p className="mt-2 text-xs text-slate-500">For automatic AI detection, leave both timestamp fields blank. Enter timestamps only when you already know the exact moment you want.</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <input className="rounded-xl bg-black/30 p-3 text-white" placeholder="Start seconds (optional)" value={start} onChange={e=>setStart(e.target.value)} disabled={working} />
          <input className="rounded-xl bg-black/30 p-3 text-white" placeholder="End seconds (optional)" value={end} onChange={e=>setEnd(e.target.value)} disabled={working} />
        </div>
        <select className="mt-3 w-full rounded-xl bg-black/30 p-3 text-white" value={momentType} onChange={e=>setMomentType(e.target.value)} disabled={working}>
          <option value="highlight">🔥 Highlight</option><option value="combat">⚔️ Combat</option><option value="funny">😂 Funny</option><option value="boss_fight">🏆 Boss Fight</option><option value="story">📖 Story</option><option value="fail">💀 Fail</option><option value="reaction">😱 Reaction</option>
        </select>
        <textarea className="mt-3 min-h-[110px] w-full rounded-xl bg-black/30 p-3 text-white" placeholder="Optional context for AI titles: what happened in this moment?" value={context} onChange={e=>setContext(e.target.value)} disabled={working} />
        <button className="pp-button mt-3 w-full" onClick={makeCandidate} disabled={working || !selectedVod}>{working?"🤖 AI is working...":"🤖 Find AI Moments / 🎯 Create Manual Clip"}</button>
      </div>
    </div>

    <div className="pp-panel p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-pink-400">🎬 Clip Library</h2>
          <p className="mt-1 text-xs text-slate-500">Current Render Batch is tracked separately from historical attempts.</p>
        </div>
        {selectedVod && (()=> {
          const vodClips=clips.filter(c=>c.vod_id===selectedVod);
          const ready=vodClips.filter(c=>c.status==="ready").length;
          const failed=vodClips.filter(c=>c.status==="failed").length;
          const candidates=vodClips.filter(c=>c.status==="candidate").length;
          const rendering=vodClips.filter(c=>c.status==="rendering").length;
          return <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-cyan-300">Ready: {ready}</span>
            <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-yellow-300">Rendering: {rendering}</span>
            <span className="rounded-full border border-purple-400/30 bg-purple-400/10 px-3 py-1 text-purple-300">Candidates: {candidates}</span>
            <span className="rounded-full border border-red-400/30 bg-red-400/10 px-3 py-1 text-red-300">Historical failures: {failed}</span>
          </div>;
        })()}
      </div>
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
          {c.clip_url && <div className="mt-4">
            <video className="w-full rounded-xl border border-white/10" controls src={c.clip_url} />
            <div className="mt-3 flex flex-wrap gap-2">
              <a className="rounded-xl bg-cyan-400/20 px-4 py-2 font-bold text-cyan-300" href={c.clip_url} download={downloadName(c)} target="_blank" rel="noreferrer">⬇️ Download MP4</a>
              <a className="rounded-xl bg-white/10 px-4 py-2 font-bold text-slate-200" href={c.clip_url} target="_blank" rel="noreferrer">↗ Open MP4</a>
            </div>
            <p className="mt-2 text-xs text-slate-500">Landscape MP4 is the master file. Use it as the source for Shorts, Reels, TikTok, and other edits.</p>
          </div>}
          {c.status==="ready" && <details className="mt-4 rounded-xl border border-purple-400/20 bg-purple-400/5 p-4">
            <summary className="cursor-pointer font-bold text-purple-300">📲 Social-Ready Content Package</summary>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {Object.entries(socialPackage(c)).map(([platform,pkg])=><div key={platform} className="rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-black capitalize text-cyan-300">{platform === "youtube" ? "YouTube Shorts" : platform === "facebook" ? "Facebook Reels" : platform === "instagram" ? "Instagram Reels" : "TikTok"}</span>
                  <button className="rounded-lg bg-white/10 px-3 py-1 text-xs font-bold text-slate-200" onClick={()=>navigator.clipboard?.writeText(pkg.title+"\n\n"+pkg.text)}>Copy</button>
                </div>
                <p className="mt-2 text-sm font-bold text-white">{pkg.title}</p>
                <p className="mt-2 whitespace-pre-line text-xs text-slate-400">{pkg.text}</p>
              </div>)}
            </div>
            <p className="mt-3 text-xs text-slate-500">Use the rendered MP4 above with the matching platform package. Posting remains manual until platform publishing is connected.</p>
          </details>}
          {c.status==="failed" && <p className="mt-3 text-sm text-red-300">{c.error}</p>}
        </div>)}
        {!clips.length && <div className="text-slate-500">No clip candidates yet.</div>}
      </div>
    </div>
  </div>;
}
