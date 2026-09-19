import { useState } from "react";
import type { FormEvent } from "react";
import { askPulsePlayAI } from "../services/pulsePlayAI";

type Message = { role: "assistant" | "user"; text: string };

const suggestions = [
  "What should I play tonight?",
  "Show me gaming news",
  "What gaming gear do you recommend?",
  "What is PulsePlay?",
];

export default function PulsePlayAI() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Welcome to the PulsePlay Command Center. ⚡ Ask me about games, news, gaming gear, merch, streams, or PulsePlay." },
  ]);

  async function submitQuestion(question: string) {
    const trimmed = question.trim();
    if (!trimmed || loading) return;
    setMessages((current) => [...current, { role: "user", text: trimmed }]);
    setInput("");
    setLoading(true);
    try {
      const result = await askPulsePlayAI(trimmed);
      setMessages((current) => [...current, { role: "assistant", text: result.answer || "I couldn't find an answer right now." }]);
    } catch (error) {
      setMessages((current) => [...current, {
        role: "assistant",
        text: error instanceof Error ? error.message : "PulsePlay AI is temporarily unavailable.",
      }]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submitQuestion(input);
  }

  return (
    <>
      {open && (
        <section className="fixed bottom-24 right-4 z-[70] flex h-[min(680px,calc(100vh-120px))] w-[min(430px,calc(100vw-32px))] flex-col overflow-hidden rounded-3xl border border-cyan-400/30 bg-[#070b14]/95 shadow-[0_0_60px_rgba(34,211,238,.18),0_0_100px_rgba(139,92,246,.15)] backdrop-blur-2xl" aria-label="PulsePlay AI Command Center">
          <div className="border-b border-white/10 bg-gradient-to-r from-purple-600/20 via-transparent to-cyan-400/20 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mb-1 flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-cyan-300"><span className="pp-live-dot" />AI ONLINE</div>
                <h2 className="text-xl font-black text-white">PulsePlay AI</h2>
                <p className="mt-1 text-xs text-slate-400">Your Gaming Command Center</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="rounded-lg px-2 py-1 text-xl text-slate-400 transition hover:bg-white/10 hover:text-white" aria-label="Close PulsePlay AI">×</button>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div key={message.role + "-" + index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "bg-cyan-400 font-medium text-black" : "border border-white/10 bg-white/5 text-slate-200"}`}>
                  {message.text}
                </div>
              </div>
            ))}
            {loading && <div className="flex justify-start"><div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-3 text-sm text-cyan-300">PulsePlay AI is thinking<span className="animate-pulse">...</span></div></div>}
          </div>

          {messages.length <= 1 && (
            <div className="border-t border-white/5 px-4 pt-3">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Quick Start</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button key={suggestion} type="button" onClick={() => void submitQuestion(suggestion)} className="rounded-full border border-purple-400/20 bg-purple-400/5 px-3 py-2 text-xs text-purple-200 transition hover:border-cyan-400/40 hover:bg-cyan-400/10">{suggestion}</button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="border-t border-white/10 p-4">
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 p-2 focus-within:border-cyan-400/40">
              <input value={input} onChange={(event) => setInput(event.target.value)} maxLength={800} placeholder="Ask PulsePlay AI..." className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-slate-600" aria-label="Ask PulsePlay AI" />
              <button type="submit" disabled={!input.trim() || loading} className="rounded-xl bg-gradient-to-r from-purple-600 to-cyan-400 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40">Send</button>
            </div>
          </form>
        </section>
      )}

      <button type="button" onClick={() => setOpen((value) => !value)} className="fixed bottom-5 right-5 z-[70] flex items-center gap-3 rounded-2xl border border-cyan-400/40 bg-[#0d1324]/95 px-4 py-3 text-sm font-black text-white shadow-[0_0_35px_rgba(34,211,238,.22)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-[0_0_45px_rgba(34,211,238,.35)]" aria-label="Open PulsePlay AI">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-cyan-400 text-lg text-black">⚡</span>
        <span className="hidden sm:block"><span className="block text-[10px] uppercase tracking-[0.2em] text-cyan-300">AI Command Center</span><span className="block">PulsePlay AI</span></span>
      </button>
    </>
  );
}
