import { useEffect, useState } from "react";
import {
  generatePODDesignPreview,
  listPODConcepts,
  savePODConcept,
  setPODConceptStatus,
  type PODConcept,
} from "../../services/podPreview";

type Mode = "improve" | "new";

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

export default function PODAgentPanel() {
  const [mode, setMode] = useState<Mode>("improve");
  const [product, setProduct] = useState("");
  const [goal, setGoal] = useState("Make the design clearer and more distinctive while keeping it readable on merchandise.");
  const [prompt, setPrompt] = useState("Create original PulsePlay gaming merchandise artwork with a dark futuristic esports look, neon cyan and purple with restrained pink accents, bold shapes, strong contrast, print-friendly composition, no tiny text and no third-party logos.");
  const [title, setTitle] = useState("PulsePlay Design Concept");
  const [preview, setPreview] = useState("");
  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loadingConcepts, setLoadingConcepts] = useState(true);
  const [updatingId, setUpdatingId] = useState("");
  const [concepts, setConcepts] = useState<PODConcept[]>([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function refreshConcepts() {
    setLoadingConcepts(true);
    try {
      setConcepts(await listPODConcepts());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load saved concepts.");
    } finally {
      setLoadingConcepts(false);
    }
  }

  useEffect(() => { void refreshConcepts(); }, []);

  function preparePrompt() {
    const target = mode === "improve"
      ? `Improvement concept for existing product: ${product.trim() || "existing PulsePlay merchandise"}.`
      : "New PulsePlay print-on-demand product concept.";
    setPrompt(`Create original PulsePlay gaming merchandise artwork. ${target} ${goal.trim()} Use a dark futuristic esports look with neon cyan, purple, and restrained pink accents. Bold clean shapes, strong contrast, print-friendly composition, no product mockup, no tiny text, no third-party logos. Artwork concept only.`);
    setPreview("");
    setError("");
    setNotice("");
  }

  async function makePreview() {
    if (!window.confirm("Generate one design preview? Production image generation may use paid AI credits. The preview is not saved until you explicitly choose Save Concept.")) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      setPreview(await generatePODDesignPreview(prompt));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Preview generation failed.");
    } finally {
      setBusy(false);
    }
  }

  async function saveConcept() {
    if (!preview) return;
    if (preview.startsWith("data:image/svg+xml")) {
      setError("This is a development placeholder preview. Only generated PNG, JPEG, or WebP artwork can be saved; use production image generation for a saveable artwork file.");
      return;
    }
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const concept = await savePODConcept({
        title: title.trim() || "Untitled POD concept",
        prompt,
        mode,
        product_name: mode === "improve" ? (product.trim() || null) : null,
        imageDataUrl: preview,
      });
      setConcepts(current => [concept, ...current.filter(item => item.id !== concept.id)]);
      setPreview("");
      setNotice("Concept saved privately. It has not been sent to Printful or published.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save this concept.");
    } finally {
      setSaving(false);
    }
  }

  async function updateStatus(concept: PODConcept, status: "approved" | "rejected") {
    const verb = status === "approved" ? "approve" : "reject";
    if (!window.confirm(`Are you sure you want to ${verb} “${concept.title}”? This records your decision only; it will not create a Printful product or publish anything.`)) return;
    setUpdatingId(concept.id);
    setError("");
    setNotice("");
    try {
      const updated = await setPODConceptStatus(concept.id, status);
      setConcepts(current => current.map(item => item.id === updated.id ? updated : item));
      setNotice(`Decision saved: “${updated.title}” is ${updated.status}. No product was created or published.`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save your decision.");
    } finally {
      setUpdatingId("");
    }
  }

  function discardPreview() {
    setPreview("");
    setError("");
    setNotice("");
  }

  return <section className="mt-8 rounded-xl border border-purple-500/40 bg-[#0b1120] p-6">
    <h2 className="text-xl font-black text-purple-300">⚡ POD Merchandise Agent</h2>
    <p className="mt-2 text-sm text-gray-300">Generate design concepts, save artwork privately, and record approval decisions. Saving or approving a concept never creates a product or publishes it.</p>

    <div className="mt-5 grid gap-3 sm:grid-cols-2" aria-label="Choose concept type">
      <button
        type="button"
        aria-pressed={mode === "improve"}
        onClick={() => { setMode("improve"); setPreview(""); setError(""); setNotice(""); }}
        className={`rounded-xl border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-cyan-300 ${mode === "improve" ? "border-cyan-300 bg-cyan-950/70 ring-2 ring-cyan-400/60" : "border-gray-700 bg-gray-900 hover:border-gray-500"}`}
      >
        <span className="flex items-center gap-2 font-bold text-white"><span aria-hidden="true">{mode === "improve" ? "●" : "○"}</span> Improve Existing Product</span>
        <span className="mt-2 block text-sm text-gray-300">Refine artwork for an item already in your catalog.</span>
        <span className={`mt-3 inline-block rounded-full px-2 py-1 text-xs font-bold ${mode === "improve" ? "bg-cyan-500 text-gray-950" : "bg-gray-800 text-gray-300"}`}>{mode === "improve" ? "SELECTED" : "Choose this option"}</span>
      </button>
      <button
        type="button"
        aria-pressed={mode === "new"}
        onClick={() => { setMode("new"); setPreview(""); setError(""); setNotice(""); }}
        className={`rounded-xl border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-purple-300 ${mode === "new" ? "border-purple-300 bg-purple-950/70 ring-2 ring-purple-400/60" : "border-gray-700 bg-gray-900 hover:border-gray-500"}`}
      >
        <span className="flex items-center gap-2 font-bold text-white"><span aria-hidden="true">{mode === "new" ? "●" : "○"}</span> Suggest New Product</span>
        <span className="mt-2 block text-sm text-gray-300">Create artwork for a potential new merchandise idea.</span>
        <span className={`mt-3 inline-block rounded-full px-2 py-1 text-xs font-bold ${mode === "new" ? "bg-purple-400 text-gray-950" : "bg-gray-800 text-gray-300"}`}>{mode === "new" ? "SELECTED" : "Choose this option"}</span>
      </button>
    </div>

    <div className="mt-5 rounded-lg border border-gray-700 bg-[#080e1b] p-4">
      <h3 className="font-bold text-cyan-200">Step 1 · Describe your idea</h3>
      <p className="mt-1 text-sm text-gray-300">{mode === "improve" ? "Enter the name of an existing product below. This is a text field, not a dropdown." : "Describe the new merchandise idea in the design direction field below."}</p>
      {mode === "improve" && <label className="mt-4 block text-sm font-semibold text-white">Existing product name <span className="text-cyan-300">(required for this mode)</span>
        <input value={product} onChange={e => setProduct(e.target.value)} placeholder="Type a product name, e.g. Cyber Wolf Desk Mat" aria-required="true" className="mt-2 w-full rounded-lg border border-cyan-700 bg-[#050912] p-3 text-white placeholder:text-gray-500 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/30" />
        <span className="mt-1 block text-xs text-gray-400">Tip: use the product's name as it appears in your Store catalog.</span>
      </label>}
      <label className="mt-4 block text-sm font-semibold text-white">Design direction / improvement goal
        <textarea value={goal} onChange={e => setGoal(e.target.value)} rows={3} className="mt-2 w-full rounded-lg border border-gray-700 bg-[#050912] p-3 text-white focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/30" />
      </label>
      <button type="button" onClick={preparePrompt} className="mt-4 rounded-lg bg-cyan-700 px-4 py-2 font-bold text-white hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-300">Step 2 · Build Preview Prompt</button>
    </div>
    <label className="mt-4 block text-sm text-gray-300">Preview prompt (review or edit before generating)
      <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={4} maxLength={4000} className="mt-2 w-full rounded-lg border border-gray-700 bg-[#050912] p-3 text-white" />
    </label>
    <button type="button" onClick={makePreview} disabled={busy || !prompt.trim()} className="mt-4 rounded-lg bg-purple-600 px-5 py-3 font-bold hover:bg-purple-500 disabled:opacity-50">{busy ? "Generating preview…" : "Generate Design Preview"}</button>

    {error && <p role="alert" className="mt-3 text-sm text-red-300">{error}</p>}
    {notice && <p role="status" className="mt-3 text-sm text-green-200">{notice}</p>}

    {preview && <div className="mt-5 rounded-lg border border-cyan-500/30 p-4">
      <h3 className="font-bold text-cyan-300">Design concept preview (not yet saved)</h3>
      <img src={preview} alt="PulsePlay merchandise design concept preview" className="mt-3 max-h-[560px] max-w-full rounded-lg object-contain" />
      <label className="mt-4 block text-sm text-gray-300">Concept title
        <input value={title} onChange={e => setTitle(e.target.value)} maxLength={160} className="mt-2 w-full rounded-lg border border-gray-700 bg-[#050912] p-3 text-white" />
      </label>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={saveConcept} disabled={saving || !title.trim()} className="rounded-lg bg-cyan-600 px-4 py-2 font-bold disabled:opacity-50">{saving ? "Saving privately…" : "Save Concept"}</button>
        <button type="button" onClick={discardPreview} className="rounded-lg bg-gray-700 px-4 py-2 font-bold">Discard Preview</button>
      </div>
      <p className="mt-3 text-xs text-gray-400">The artwork is not stored until you choose Save Concept. Approval is a separate step. Neither action creates a Printful product or publishes anything.</p>
    </div>}

    <div className="mt-8 border-t border-gray-700 pt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-cyan-300">Saved Design Concepts</h3>
        <button type="button" onClick={() => void refreshConcepts()} disabled={loadingConcepts} className="rounded-lg bg-gray-700 px-3 py-2 text-sm font-bold disabled:opacity-50">{loadingConcepts ? "Loading…" : "Refresh Concepts"}</button>
      </div>
      {loadingConcepts && <p className="mt-3 text-sm text-gray-400">Loading saved concepts…</p>}
      {!loadingConcepts && concepts.length === 0 && <p className="mt-3 text-sm text-gray-400">No saved concepts yet.</p>}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {concepts.map(concept => <article key={concept.id} className="rounded-lg border border-gray-700 bg-[#070b14] p-4">
          <img src={concept.artwork_url} alt={`Saved artwork for ${concept.title}`} className="max-h-72 w-full rounded-lg object-contain" />
          <h4 className="mt-3 font-bold text-white">{concept.title}</h4>
          <p className="mt-1 text-xs text-gray-400">Created {formatDate(concept.created_at)}</p>
          {concept.product_name && <p className="mt-2 text-sm text-gray-300">Product: {concept.product_name}</p>}
          <p className="mt-2 text-sm text-gray-300 whitespace-pre-wrap">{concept.prompt}</p>
          <p className="mt-3 text-sm">Status: <span className={concept.status === "approved" ? "font-bold text-green-300" : concept.status === "rejected" ? "font-bold text-red-300" : "font-bold text-yellow-200"}>{concept.status}</span></p>
          {concept.status === "draft" && <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" disabled={updatingId === concept.id} onClick={() => void updateStatus(concept, "approved")} className="rounded-lg bg-green-700 px-3 py-2 text-sm font-bold disabled:opacity-50">{updatingId === concept.id ? "Saving…" : "Approve Concept"}</button>
            <button type="button" disabled={updatingId === concept.id} onClick={() => void updateStatus(concept, "rejected")} className="rounded-lg bg-red-900 px-3 py-2 text-sm font-bold disabled:opacity-50">Reject Concept</button>
          </div>}
          {concept.decision_at && <p className="mt-2 text-xs text-gray-400">Decision recorded {formatDate(concept.decision_at)}</p>}
        </article>)}
      </div>
    </div>
  </section>;
}
