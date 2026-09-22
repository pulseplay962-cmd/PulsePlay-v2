import { supabase } from "../lib/supabase";

const API_URL = "https://pulseplay-api-yubf.onrender.com";

async function adminFetch(path:string, options:RequestInit={}) {
  const {data:{session}}=await supabase.auth.getSession();
  if(!session?.access_token) throw new Error("You must be logged in as an administrator.");
  const headers=new Headers(options.headers);
  headers.set("Content-Type","application/json");
  headers.set("Authorization",`Bearer ${session.access_token}`);
  const response=await fetch(`${API_URL}${path}`,{...options,headers});
  const contentType=response.headers.get("content-type")||"";
  const data=contentType.includes("application/json") ? await response.json() : null;
  if(!response.ok) throw new Error(data?.error||`PulsePlay AI request failed (HTTP ${response.status}).`);
  if(!data) throw new Error("PulsePlay API returned an unexpected non-JSON response.");
  return data;
}

export type StreamVod={id:string;twitch_id:string;channel:string;title:string;description?:string;url:string;thumbnail_url?:string;published_at?:string;duration?:string;view_count?:number;status?:string;analyzed_at?:string};
export type StreamClip={id:string;vod_id:string;title:string;description?:string;start_seconds:number;end_seconds:number;duration_seconds:number;moment_type?:string;score?:number;ai_reason?:string;ai_title_options?:string[];source_url?:string;clip_url?:string;thumbnail_url?:string;status:string;error?:string};

export async function getStreamVods(sync=true):Promise<StreamVod[]>{
  const d=await adminFetch(`/api/ai/stream-clips/vods?sync=${sync?"true":"false"}&limit=20`);
  return d.vods||[];
}

export async function getStreamClips(vodId?:string):Promise<StreamClip[]>{
  const q=vodId?`?vodId=${encodeURIComponent(vodId)}`:"";
  const d=await adminFetch(`/api/ai/stream-clips/clips${q}`);
  return d.clips||[];
}

export async function analyzeStreamVod(id:string){
  return adminFetch(`/api/ai/stream-clips/vods/${id}/analyze`,{method:"POST"});
}

export async function createStreamClipCandidate(input:{vodId:string;startSeconds:number;endSeconds:number;momentType?:string;context?:string;score?:number}):Promise<StreamClip>{
  const d=await adminFetch("/api/ai/stream-clips/candidates",{method:"POST",body:JSON.stringify(input)});
  return d.clip;
}

export async function renderStreamClip(id:string):Promise<StreamClip>{
  const d=await adminFetch(`/api/ai/stream-clips/${id}/render`,{method:"POST"});
  return d.clip;
}

export async function autoRenderTopClips(id:string, limit=3){
  const {data:{session}}=await supabase.auth.getSession();
  if(!session?.access_token) throw new Error("You must be logged in as an administrator.");

  const {data,error}=await supabase.functions.invoke("ai-auto-render-proxy",{
    body:{vodId:id,limit}
  });

  if(error) {
    throw new Error(error.message||"Unable to start AI auto-render.");
  }

  if(!data?.success) {
    throw new Error(data?.error||"Unable to start AI auto-render.");
  }

  return data;
}
