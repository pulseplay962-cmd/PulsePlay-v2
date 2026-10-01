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

export async function getStreamVods(sync=true):Promise<StreamVod[]>{
  const d=await adminFetch(`/api/ai/stream-clips/vods?sync=${sync?"true":"false"}&limit=20`);
  return d.vods||[];
}

export async function loadStreamVodToSite(id:string){
  const d=await adminFetch(`/api/ai/stream-clips/vods/${encodeURIComponent(id)}/load-to-site`,{method:"POST"});
  return d.video;
}
