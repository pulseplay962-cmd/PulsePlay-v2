import { FormEvent, useState } from "react";

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

function localResponse(message: string) {
  const normalized = message.toLowerCase();
  if (normalized.includes("status") || normalized.includes("check")) {
    return "Current interface status: Command Center online. The JARVIS core is protected behind the PulsePlay API. Live system actions will remain approval-gated.";
  }
  if (normalized.includes("stream")) {
    return "Stream preparation module queued. Once the live JARVIS connection is enabled, I can gather the stream details, prepare supporting content, and present the proposed actions for approval.";
  }
  if (normalized.includes("next")) {
    return "Recommended next milestone: connect this HUD to the protected JARVIS API, then add live memory, system telemetry, approvals, and voice controls.";
  }
  return "I received your command. The HUD is online, but live JARVIS execution is not connected yet. Your command can be routed to the protected core in the next integration phase.";
}

export default function JarvisCommandCenter() {
  const [messages, setMessages] = useState<Message[]>(starterMessages);
  const [input, setInput] = useState("");
  const [processing, setProcessing] = useState(false);

  function sendCommand(command?: string) {
    const text = (command ?? input).trim();
    if (!text || processing) return;
    setMessages((current) => [...current, { role: "user", text }]);
    setInput("");
    setProcessing(true);
    window.setTimeout(() => {
      setMessages((current) => [...current, { role: "jarvis", text: localResponse(text) }]);
      setProcessing(false);
    }, 650);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendCommand();
  }

  return (
    <div className="min-h-[72vh] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="pp-panel relative overflow-hidden rounded-3xl border border-cyan-400/20 p-6 shadow-[0_0_45px_rgba(34,211,238,.08)]">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 text-xs font-black uppercase tracking-[0.35em] text-cyan-400">PulsePlay AI Systems</div>
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl"><span className="pp-gradient-text">JARVIS</span> COMMAND CENTER</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400 sm:text-base">Your central interface for the PulsePlay AI assistant. Monitor, command, and eventually orchestrate the platform from one HUD.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatusChip label="HUD" value="ONLINE" tone="cyan" />
              <StatusChip label="CORE" value="PROTECTED" tone="purple" />
              <StatusChip label="MODE" value={processing ? "PROCESSING" : "STANDBY"} tone="green" />
              <StatusChip label="MSGS" value={String(messages.length)} tone="pink" />
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <section className="pp-panel flex min-h-[620px] flex-col overflow-hidden rounded-3xl border border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 bg-black/20 px-5 py-4">
              <div>
                <div className="text-sm font-black uppercase tracking-[0.22em] text-cyan-300">Neural Interface</div>
                <div className="mt-1 text-xs text-slate-500">Protected JARVIS core • approval gates enabled</div>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-green-400"><span className="pp-live-dot" />SYSTEM ONLINE</div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {messages.map((message, index) => (
                <div key={message.role + "-" + index} className={"flex " + (message.role === "user" ? "justify-end" : "justify-start")}>
                  <div className={"max-w-[88%] rounded-2xl border px-4 py-3 text-sm leading-6 sm:max-w-[75%] " + (message.role === "user" ? "border-purple-400/20 bg-purple-500/10 text-slate-200" : "border-cyan-400/20 bg-cyan-500/5 text-slate-300")}>
                    <div className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{message.role === "user" ? "YOU" : "JARVIS"}</div>
                    {message.text}
                  </div>
                </div>
              ))}
              {processing && <div className="flex justify-start"><div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 px-4 py-3 text-sm text-cyan-300"><span className="animate-pulse">JARVIS is processing your command...</span></div></div>}
            </div>

            <form onSubmit={handleSubmit} className="border-t border-white/10 bg-black/20 p-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Enter a command for JARVIS..." className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-cyan-400/40 focus:outline-none" disabled={processing} />
                <button type="submit" disabled={!input.trim() || processing} className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 text-sm font-black text-cyan-300 transition hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-40">SEND COMMAND</button>
              </div>
            </form>
          </section>

          <aside className="space-y-6">
            <section className="pp-panel rounded-3xl border border-white/10 p-5">
              <div className="text-xs font-black uppercase tracking-[0.25em] text-purple-300">Quick Commands</div>
              <div className="mt-4 space-y-2">
                {quickCommands.map((command) => (
                  <button key={command} onClick={() => sendCommand(command)} disabled={processing} className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-left text-xs font-bold text-slate-300 transition hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:text-cyan-200 disabled:opacity-40">{command}</button>
                ))}
              </div>
            </section>

            <section className="pp-panel rounded-3xl border border-white/10 p-5">
              <div className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">System Modules</div>
              <div className="mt-4 space-y-3">
                <Module name="AI Core" state="READY" />
                <Module name="Memory" state="NEXT" />
                <Module name="Approvals" state="READY" />
                <Module name="Telemetry" state="NEXT" />
                <Module name="Voice" state="NEXT" />
                <Module name="Automation" state="NEXT" />
              </div>
            </section>

            <section className="rounded-3xl border border-yellow-400/15 bg-yellow-400/5 p-5">
              <div className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">Safety Protocol</div>
              <p className="mt-3 text-xs leading-5 text-slate-400">JARVIS will prepare sensitive actions before executing them. Public posts, production deployments, destructive changes, financial actions, and production configuration changes remain approval-gated.</p>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

function StatusChip({ label, value, tone }: { label: string; value: string; tone: "cyan" | "purple" | "green" | "pink" }) {
  const toneClasses = {
    cyan: "border-cyan-400/20 bg-cyan-400/5 text-cyan-300",
    purple: "border-purple-400/20 bg-purple-400/5 text-purple-300",
    green: "border-green-400/20 bg-green-400/5 text-green-300",
    pink: "border-pink-400/20 bg-pink-400/5 text-pink-300",
  };
  return <div className={"rounded-xl border px-3 py-2 text-center " + toneClasses[tone]}><div className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60">{label}</div><div className="mt-1 text-[11px] font-black">{value}</div></div>;
}

function Module({ name, state }: { name: string; state: "READY" | "NEXT" }) {
  return <div className="flex items-center justify-between rounded-xl border border-white/5 bg-black/20 px-3 py-2"><span className="text-xs font-bold text-slate-300">{name}</span><span className={"text-[10px] font-black " + (state === "READY" ? "text-green-400" : "text-slate-600")}>{state}</span></div>;
}
