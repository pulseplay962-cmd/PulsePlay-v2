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
  if(!response.ok) throw new Error(data?.error||`PulsePlay request failed (HTTP ${response.status}).`);
  if(!data) throw new Error("PulsePlay API returned an unexpected non-JSON response.");
  return data;
}

export type StreamVod={
  id:string;
  twitch_id:string;
  channel:string;
  title:string;
  description?:string;
  url:string;
  thumbnail_url?:string;
  published_at?:string;
  duration?:string;
  view_count?:number;
  status?:string;
  analyzed_at?:string;
};

export type StreamClip={
  id:string;
  vod_id:string;
  title:string;
  description?:string;
  status:string;
  score?:number;
  start_seconds:number;
  end_seconds:number;
  duration_seconds?:number;
  moment_type?:string;
  ai_reason?:string;
  error?:string|null;
  clip_url?:string|null;
  vertical_clip_url?:string|null;
  captioned_vertical_clip_url?:string|null;
  created_at?:string;
  ai_stream_vods?:{title?:string;url?:string;thumbnail_url?:string}|null;
};

export async function getStreamVods(sync=true):Promise<StreamVod[]>{
  const d=await adminFetch(`/api/ai/stream-clips/vods?sync=${sync?"true":"false"}&limit=20`);
  return d.vods||[];
}

export async function loadStreamVodToSite(id:string){
  const d=await adminFetch(`/api/ai/stream-clips/vods/${encodeURIComponent(id)}/load-to-site`,{method:"POST"});
  return d.video;
}

export async function getStreamClips(vodId?:string):Promise<StreamClip[]>{
  const query=new URLSearchParams({limit:"100"});
  if(vodId) query.set("vodId",vodId);
  const d=await adminFetch(`/api/ai/stream-clips/clips?${query.toString()}`);
  return d.clips||[];
}

export async function analyzeStreamVod(id:string){
  return adminFetch(`/api/ai/stream-clips/vods/${encodeURIComponent(id)}/analyze`,{method:"POST"});
}

export async function renderTopStreamClips(id:string,limit=3){
  return adminFetch(`/api/ai/stream-clips/vods/${encodeURIComponent(id)}/render-top`,{
    method:"POST",
    body:JSON.stringify({limit})
  });
}

export async function renderSingleStreamClip(id:string){
  return adminFetch(`/api/ai/stream-clips/clips/${encodeURIComponent(id)}/render`,{method:"POST"});
}

export async function renderVerticalStreamClip(id:string){
  return adminFetch(`/api/ai/stream-clips/clips/${encodeURIComponent(id)}/render-vertical`,{method:"POST"});
}

export async function renderCaptionedVerticalStreamClip(id:string){
  return adminFetch(`/api/ai/stream-clips/clips/${encodeURIComponent(id)}/render-captioned-vertical`,{method:"POST"});
}
