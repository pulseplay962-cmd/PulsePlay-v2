import { FormEvent, useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";

type Message = { role: "user" | "jarvis"; text: string };
type Health = {
  status: string;
  timestamp: string;
  checks: {
    api: { status: string; service: string };
    database: string;
    openai: string;
    jarvisKey: string;
  };
};
type Memory = {
  id: string;
  memory_type: string;
  content: string;
  importance: number;
  source?: string | null;
  updated_at: string;
};
type Approval = {
  id: string;
  action: string;
  payload: Record<string, unknown>;
  status: "pending" | "approved" | "rejected" | "expired";
  requested_at: string;
  resolved_at?: string | null;
};

const starterMessages: Message[] = [{
  role: "jarvis",
  text: "Good evening. PulsePlay JARVIS Command Center is online. The protected JARVIS core is connected and ready for commands.",
}];

const quickCommands = [
  "Give me a PulsePlay status briefing.",
  "Prepare tonight's stream.",
  "Check the PulsePlay systems.",
  "What should I work on next?",
];

const API_URL = String(import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

async function authHeaders() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error("Your admin session has expired. Please sign in again.");
  return { Authorization: "Bearer " + session.access_token };
}

async function apiFetch(path: string, options: RequestInit = {}) {
  if (!API_URL) throw new Error("VITE_API_URL is not configured.");
  const headers = await authHeaders();
  const response = await fetch(API_URL + path, {
    ...options,
    headers: { ...headers, ...(options.headers || {}) },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.success) throw new Error(payload.error || "JARVIS request failed.");
  return payload;
}

async function getJarvisHealth() {
  return apiFetch("/api/jarvis/ui/health") as Promise<Health & { success: boolean }>;
}

async function getMemory() {
  return apiFetch("/api/jarvis/ui/memory?limit=20") as Promise<{ memory: Memory[] }>;
}

async function getApprovals() {
  return apiFetch("/api/jarvis/ui/approvals?status=pending&limit=25") as Promise<{ approvals: Approval[] }>;
}

async function sendToJarvis(message: string, history: Message[], sessionId: string | null) {
  return apiFetch("/api/jarvis/ui/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      sessionId,
      history: history.slice(-12).map((item) => ({
        role: item.role === "jarvis" ? "assistant" : "user",
        content: item.text,
      })),
    }),
  }) as Promise<{ reply: string; sessionId: string; model?: string }>;
}

const formatDate = (value: string) => new Date(value).toLocaleString();

export default function JarvisCommandCenter() {
  const [messages, setMessages] = useState<Message[]>(starterMessages);
  const [input, setInput] = useState("");
  const [processing, setProcessing] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [health, setHealth] = useState<Health | null>(null);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [memoryInput, setMemoryInput] = useState("");
  const [panelError, setPanelError] = useState("");
  const [approvalBusy, setApprovalBusy] = useState<string | null>(null);

  const loadPanels = async () => {
    setPanelError("");
    try {
      const [healthResult, memoryResult, approvalResult] = await Promise.all([
        getJarvisHealth(),
        getMemory(),
        getApprovals(),
      ]);
      setHealth(healthResult);
      setMemories(memoryResult.memory || []);
      setApprovals(approvalResult.approvals || []);
    } catch (error) {
      setPanelError(error instanceof Error ? error.message : "Unable to load JARVIS telemetry.");
    }
  };

  useEffect(() => {
    void loadPanels();
  }, []);

  const sendCommand = async (event: FormEvent) => {
    event.preventDefault();
    const command = input.trim();
    if (!command || processing) return;

    const userMessage: Message = { role: "user", text: command };
    const nextHistory = [...messages, userMessage];
    setMessages(nextHistory);
    setInput("");
    setProcessing(true);

    try {
      const result = await sendToJarvis(command, messages, sessionId);
      setSessionId(result.sessionId);
      setMessages((current) => [...current, { role: "jarvis", text: result.reply }]);
      void loadPanels();
    } catch (error) {
      setMessages((current) => [...current, {
        role: "jarvis",
        text: "Connection alert: " + (error instanceof Error ? error.message : "JARVIS could not process the command."),
      }]);
    } finally {
      setProcessing(false);
    }
  };

  const remember = async () => {
    const content = memoryInput.trim();
    if (!content) return;
    try {
      await apiFetch("/api/jarvis/ui/memory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, memoryType: "fact", importance: 7 }),
      });
      setMemoryInput("");
      const result = await getMemory();
      setMemories(result.memory || []);
    } catch (error) {
      setPanelError(error instanceof Error ? error.message : "Unable to save memory.");
    }
  };

  const resolveApproval = async (approval: Approval, status: "approved" | "rejected") => {
    setApprovalBusy(approval.id);
    try {
      await apiFetch("/api/jarvis/ui/approvals/" + approval.id + "/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, sessionId }),
      });
      setApprovals((current) => current.filter((item) => item.id !== approval.id));
    } catch (error) {
      setPanelError(error instanceof Error ? error.message : "Unable to resolve approval.");
    } finally {
      setApprovalBusy(null);
    }
  };

  const moduleState = useMemo(() => ({
    "AI Core": health?.checks.openai === "configured" ? "READY" : "ATTENTION",
    Memory: health?.checks.database === "online" ? "READY" : "ATTENTION",
    Approvals: "READY",
    Telemetry: health ? "READY" : "ATTENTION",
    Voice: "NEXT",
    Automation: "NEXT",
  }), [health]);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#070b14 0%,#0d1324 55%,#02040a 100%)", color: "#e5f7ff", padding: 24 }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ border: "1px solid #164e63", borderRadius: 18, padding: 24, background: "rgba(7,11,20,.88)", boxShadow: "0 0 35px rgba(34,211,238,.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div>
              <div style={{ color: "#22d3ee", letterSpacing: 3, fontSize: 12, fontWeight: 700 }}>⚡ PULSEPLAY NETWORK</div>
              <h1 style={{ margin: "8px 0", fontSize: 30 }}>JARVIS COMMAND CENTER</h1>
              <div style={{ color: "#94a3b8" }}>Private AI operations interface • approval-gated control layer</div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start", flexWrap: "wrap" }}>
              <span style={{ padding: "7px 10px", borderRadius: 999, border: "1px solid #164e63", color: "#67e8f9" }}>HUD ONLINE</span>
              <span style={{ padding: "7px 10px", borderRadius: 999, border: "1px solid #312e81", color: "#c4b5fd" }}>CORE {health?.status?.toUpperCase() || "CHECKING"}</span>
              <span style={{ padding: "7px 10px", borderRadius: 999, border: "1px solid #831843", color: "#f9a8d4" }}>APPROVALS {approvals.length}</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(300px,1fr)", gap: 18, marginTop: 22 }}>
            <section style={{ border: "1px solid #1e293b", borderRadius: 14, padding: 16, background: "#090f1d" }}>
              <div style={{ color: "#22d3ee", fontSize: 12, letterSpacing: 2, marginBottom: 12 }}>NEURAL INTERFACE</div>
              <div style={{ height: 420, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, paddingRight: 4 }}>
                {messages.map((message, index) => (
                  <div key={index} style={{ alignSelf: message.role === "user" ? "flex-end" : "flex-start", maxWidth: "88%", padding: "11px 13px", borderRadius: 12, border: "1px solid " + (message.role === "user" ? "#312e81" : "#164e63"), background: message.role === "user" ? "#12112a" : "#07141b" }}>
                    <div style={{ fontSize: 10, letterSpacing: 1.5, color: message.role === "user" ? "#c4b5fd" : "#67e8f9", marginBottom: 5 }}>{message.role === "user" ? "COMMAND" : "JARVIS"}</div>
                    <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.5 }}>{message.text}</div>
                  </div>
                ))}
                {processing && <div style={{ color: "#67e8f9", fontSize: 13 }}>JARVIS is processing...</div>}
              </div>
              <form onSubmit={sendCommand} style={{ display: "flex", gap: 8, marginTop: 14 }}>
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter a command..." disabled={processing} style={{ flex: 1, background: "#050912", border: "1px solid #334155", borderRadius: 10, color: "#e5f7ff", padding: "12px 13px" }} />
                <button type="submit" disabled={processing || !input.trim()} style={{ border: 0, borderRadius: 10, padding: "0 18px", background: "#22d3ee", color: "#031018", fontWeight: 800 }}>SEND</button>
              </form>
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: 10 }}>
                {quickCommands.map((command) => <button key={command} type="button" onClick={() => setInput(command)} style={{ background: "#0b1220", color: "#94a3b8", border: "1px solid #1e293b", borderRadius: 999, padding: "7px 10px", cursor: "pointer" }}>{command}</button>)}
              </div>
            </section>

            <aside style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <section style={{ border: "1px solid #1e293b", borderRadius: 14, padding: 16, background: "#090f1d" }}>
                <div style={{ color: "#a78bfa", letterSpacing: 2, fontSize: 12, marginBottom: 12 }}>SYSTEM TELEMETRY</div>
                {Object.entries(moduleState).map(([name, state]) => (
                  <div key={name} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #111827" }}>
                    <span>{name}</span><span style={{ color: state === "READY" ? "#67e8f9" : state === "NEXT" ? "#94a3b8" : "#f9a8d4" }}>{state}</span>
                  </div>
                ))}
                <div style={{ marginTop: 12, fontSize: 12, color: "#64748b" }}>Last check: {health ? formatDate(health.timestamp) : "pending"}</div>
                {panelError && <div style={{ marginTop: 10, color: "#fda4af", fontSize: 12 }}>{panelError}</div>}
              </section>

              <section style={{ border: "1px solid #4c1d95", borderRadius: 14, padding: 16, background: "#100d1f" }}>
                <div style={{ color: "#c4b5fd", letterSpacing: 2, fontSize: 12, marginBottom: 8 }}>APPROVAL CENTER</div>
                {approvals.length === 0 ? <div style={{ color: "#94a3b8", fontSize: 13 }}>No pending actions. Sensitive operations will appear here before execution.</div> : approvals.map((approval) => (
                  <div key={approval.id} style={{ border: "1px solid #312e81", borderRadius: 10, padding: 11, marginTop: 9 }}>
                    <div style={{ fontWeight: 700 }}>{approval.action}</div>
                    <div style={{ color: "#64748b", fontSize: 11, margin: "5px 0 9px" }}>Requested {formatDate(approval.requested_at)}</div>
                    <div style={{ display: "flex", gap: 7 }}>
                      <button disabled={approvalBusy === approval.id} onClick={() => void resolveApproval(approval, "approved")} style={{ flex: 1, border: "1px solid #0e7490", background: "#082f3b", color: "#67e8f9", borderRadius: 8, padding: 8 }}>APPROVE</button>
                      <button disabled={approvalBusy === approval.id} onClick={() => void resolveApproval(approval, "rejected")} style={{ flex: 1, border: "1px solid #831843", background: "#3b0a22", color: "#f9a8d4", borderRadius: 8, padding: 8 }}>REJECT</button>
                    </div>
                  </div>
                ))}
              </section>

              <section style={{ border: "1px solid #1e293b", borderRadius: 14, padding: 16, background: "#090f1d" }}>
                <div style={{ color: "#67e8f9", letterSpacing: 2, fontSize: 12, marginBottom: 8 }}>LONG-TERM MEMORY</div>
                <div style={{ display: "flex", gap: 7 }}>
                  <input value={memoryInput} onChange={(e) => setMemoryInput(e.target.value)} placeholder="Tell JARVIS to remember..." style={{ minWidth: 0, flex: 1, background: "#050912", border: "1px solid #334155", borderRadius: 8, color: "#e5f7ff", padding: 9 }} />
                  <button type="button" onClick={() => void remember()} disabled={!memoryInput.trim()} style={{ border: "1px solid #0e7490", background: "#082f3b", color: "#67e8f9", borderRadius: 8, padding: "0 10px" }}>SAVE</button>
                </div>
                <div style={{ maxHeight: 170, overflowY: "auto", marginTop: 10 }}>
                  {memories.length === 0 ? <div style={{ color: "#64748b", fontSize: 12 }}>No stored memories yet.</div> : memories.map((memory) => (
                    <div key={memory.id} style={{ padding: "8px 0", borderBottom: "1px solid #111827" }}>
                      <div style={{ fontSize: 12 }}>{memory.content}</div>
                      <div style={{ color: "#64748b", fontSize: 10, marginTop: 3 }}>{memory.memory_type} • importance {memory.importance}</div>
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          </div>

          <div style={{ marginTop: 18, border: "1px solid #1e293b", borderRadius: 14, padding: 14, color: "#94a3b8", fontSize: 12 }}>
            <strong style={{ color: "#f9a8d4" }}>SAFETY PROTOCOL:</strong> JARVIS may prepare sensitive actions, but public posts, deployments, destructive changes, financial actions, and production configuration require explicit approval. Approval records authorization only; execution will be added as a separate trusted tool layer.
          </div>
        </div>
      </div>
    </div>
  );
}
