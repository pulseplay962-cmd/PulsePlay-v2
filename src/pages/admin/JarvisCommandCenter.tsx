import { FormEvent, useState } from "react";
import { supabase } from "../../lib/supabase";

type Message = { role: "user" | "jarvis"; text: string };

const starterMessages: Message[] = [{
  role: "jarvis",
  text: "Good evening. PulsePlay JARVIS Command Center is ready. I am currently operating in interface mode while the protected JARVIS service connection is being brought online.",
}];

const quickCommands = [
  "Give me a PulsePlay status briefing.",
  "Prepare tonight's stream.",
  "Check the PulsePlay systems.",
  "What should I work on next?",
];

const API_URL = String(import.meta.env.VITE_API_URL || "").replace(/\\/$/, "");

async function sendToJarvis(message: string, history: Message[], sessionId: string | null) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("Your admin session has expired. Please sign in again.");
  }

  if (!API_URL) {
    throw new Error("VITE_API_URL is not configured.");
  }

  const response = await fetch(API_URL + "/api/jarvis/ui/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session.access_token,
    },
    body: JSON.stringify({
      message,
      sessionId,
      history: history.slice(-12).map((item) => ({
        role: item.role === "jarvis" ? "assistant" : "user",
        content: item.text,
      })),
    }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok || !payload.success) {
    throw new Error(payload.error || "JARVIS could not process the command.");
  }

  return payload as { reply: string; sessionId: string; model?: string };
}
