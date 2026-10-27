import { useState } from "react";
import { generatePODDesignPreview } from "../../services/podPreview";
type Mode = "improve" | "new";
export default function PODAgentPanel() {
  const [mode, setMode] = useState<Mode>("improve");
  const [product, setProduct] = useState("");
  const [goal, setGoal] = useState("Make the design clearer and more distinctive while keeping it readable on merchandise.");
  const [prompt, setPrompt] = useState("Create original PulsePlay gaming merchandise artwork with a dark futuristic esports look, neon cyan and purple with restrained pink accents, bold shapes, strong contrast, print-friendly composition, no tiny text and no third-party logos.");
  const [preview, setPreview] = useState("");
  const [approved, setApproved] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  function preparePrompt() {
    const target = mode === "improve" ? `Improvement concept for existing product: ${product.trim() || "existing PulsePlay merchandise"}.` : "New PulsePlay print-on-demand product concept.";
    setPrompt(`Create original PulsePlay gaming merchandise artwork. ${target} ${goal.trim()} Use a dark futuristic esports look with neon cyan, purple, and restrained pink accents. Bold clean shapes, strong contrast, print-friendly composition, no product mockup, no tiny text, no third-party logos. Artwork concept only.`);
    setPreview(""); setApproved(false); setError("");
  }
  async function makePreview() {
    if (!window.confirm("Generate one temporary design preview? Production image generation may use paid AI credits. This preview will not be saved, uploaded, or sent to Printful.")) return;
    setBusy(true); setError(""); setApproved(false);
    try { setPreview(await generatePODDesignPreview(prompt)); }
    catch (e) { setError(e instanceof Error ? e.message : "Preview generation failed."); }
    finally { setBusy(false); }
  }
  function discardPreview() {
    setPreview("");
    setApproved(false);
  }
  return <section className="mt-8 rounded-xl border border-purple-500/40 bg-[#0b1120] p-6">
    <h2 className="text-xl font-black text-purple-300">⚡ POD Merchandise Agent</h2>
    <p className="mt-2 text-sm text-gray-300">Explore improvements to current products or new design concepts. Preview-only; nothing is saved to the store.</p>
    <div className="mt-4 flex flex-wrap gap-3">
      <button type="button" onClick={() => { setMode("improve"); setPreview(""); setApproved(false); }} className={`rounded-lg px-4 py-2 font-bold ${mode === "improve" ? "bg-cyan-600" : "bg-gray-800"}`}>Improve Existing Product</button>
      <button type="button" onClick={() => { setMode("new"); setPreview(""); setApproved(false); }} className={`rounded-lg px-4 py-2 font-bold ${mode === "new" ? "bg-cyan-600" : "bg-gray-800"}`}>Suggest New Product</button>
    </div>
    {mode === "improve" && <label className="mt-4 block text-sm text-gray-300">Existing product<input value={product} onChange={e => setProduct(e.target.value)} placeholder="e.g. Cyber Wolf mouse mat" className="mt-2 w-full rounded-lg border border-gray-700 bg-[#050912] p-3 text-white" /></label>}
    <label className="mt-4 block text-sm text-gray-300">Design direction / improvement goal<textarea value={goal} onChange={e => setGoal(e.target.value)} rows={3} className="mt-2 w-full rounded-lg border border-gray-700 bg-[#050912] p-3 text-white" /></label>
    <button type="button" onClick={preparePrompt} className="mt-4 rounded-lg bg-gray-700 px-4 py-2 font-bold">Build Preview Prompt</button>
    <label className="mt-4 block text-sm text-gray-300">Preview prompt (review or edit before generating)<textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={4} maxLength={4000} className="mt-2 w-full rounded-lg border border-gray-700 bg-[#050912] p-3 text-white" /></label>
    <button type="button" onClick={makePreview} disabled={busy || !prompt.trim()} className="mt-4 rounded-lg bg-purple-600 px-5 py-3 font-bold hover:bg-purple-500 disabled:opacity-50">{busy ? "Generating preview…" : "Generate Temporary Design Preview"}</button>
    <p className="mt-3 text-xs text-gray-400">No database writes, no saved images, no Printful product creation, no publishing, and no automatic product edits. Approval below is a temporary in-page review decision only; it is not saved and does not start production.</p>
    {error && <p role="alert" className="mt-3 text-sm text-red-300">{error}</p>}
    {preview && <div className="mt-5 rounded-lg border border-cyan-500/30 p-4">
      <h3 className="font-bold text-cyan-300">Temporary concept preview</h3>
      <img src={preview} alt="Temporary PulsePlay merchandise design concept" className="mt-3 max-h-[560px] max-w-full rounded-lg object-contain" />
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {!approved
          ? <button type="button" onClick={() => setApproved(true)} className="rounded-lg bg-cyan-600 px-4 py-2 font-bold hover:bg-cyan-500">Approve Design Concept</button>
          : <span role="status" className="rounded-lg border border-green-500/50 px-4 py-2 font-bold text-green-300">Concept approved for next-step review</span>}
        <button type="button" onClick={discardPreview} className="rounded-lg bg-gray-700 px-4 py-2 font-bold">Discard Preview</button>
      </div>
      {approved && <p className="mt-3 text-sm text-green-200">Your approval applies only to this temporary preview in this open page. It will be lost if you refresh or leave. No product has been saved, uploaded, sent to Printful, or published.</p>}
    </div>}
  </section>;
}
