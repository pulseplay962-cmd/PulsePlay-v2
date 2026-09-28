import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

import {
  getAIContent,
  refreshAINews,
  generateAIImage,
  updateAIContent,
  deleteAIContent,
  publishAIContent,
  type AIContentItem,
} from "../../services/aiContent";

import AIContentCalendar from "../../components/admin/AIContentCalendar";
import { testAIImage } from "../../services/aiImageTest";

export default function AIContentStudio() {
  console.log("🔥 AIContentStudio LOADED");

  const [content, setContent] = useState<AIContentItem[]>([]);
  const [allContent, setAllContent] = useState<AIContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingImage, setGeneratingImage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<AIContentItem | null>(null);
  const [error, setError] = useState("");
  const [publishedArticles, setPublishedArticles] = useState<Record<string, string>>({});
  const [testingImage, setTestingImage] = useState(false);
  const [approvingPublishing, setApprovingPublishing] = useState<string | null>(null);
  const [testImageUrl, setTestImageUrl] = useState("");
  const [showFreshOnly, setShowFreshOnly] = useState(false);
  const [freshBatchCount, setFreshBatchCount] = useState(0);
  const [testImagePrompt, setTestImagePrompt] = useState(
    "A cinematic futuristic gaming setup with dark neon purple and cyan lighting, premium editorial gaming aesthetic, no logos, no text."
  );

  function filterNews(data: AIContentItem[]) {
    return (data || []).filter(
      (item: AIContentItem) => item.content_type === "news"
    );
  }

  async function loadContent() {
    try {
      setLoading(true);
      setError("");
      const data = filterNews(await getAIContent());
      setAllContent(data);
      setContent(showFreshOnly ? content : data);
    } catch (error: any) {
      console.error("LOAD AI CONTENT ERROR:", error);
      setError(error.message || "Failed loading AI content");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadContent();
  }, []);

  async function handleTestImage() {
    try {
      setTestingImage(true);
      setError("");
      setTestImageUrl("");
      const result = await testAIImage(testImagePrompt);
      if (!result?.imageUrl) {
        throw new Error("OpenAI image generation returned no image URL.");
      }
      setTestImageUrl(result.imageUrl);
    } catch (error: any) {
      console.error("REAL OPENAI IMAGE TEST ERROR:", error);
      setError(error.message || "Real OpenAI image generation failed.");
    } finally {
      setTestingImage(false);
    }
  }

  async function handleRefreshNews() {
    try {
      setLoading(true);
      setError("");
      setShowFreshOnly(true);

      const result = await refreshAINews();
      console.log("AI NEWS REFRESH RESULT:", result);

      const freshPosts = filterNews(result?.posts || []);
      setFreshBatchCount(freshPosts.length);

      // The refresh endpoint returns the exact records it just created.
      // Show those records first instead of reloading the entire historical queue.
      if (freshPosts.length > 0) {
        setContent(freshPosts);

        // Keep the full queue available behind "Show All News".
        const data = filterNews(await getAIContent());
        setAllContent(data);
      } else {
        const data = filterNews(await getAIContent());
        setAllContent(data);
        setContent([]);
      }
    } catch (error: any) {
      console.error("AI NEWS REFRESH ERROR:", error);
      setError(error?.message || "Failed refreshing current gaming news");
    } finally {
      setLoading(false);
    }
  }

  function showAllNews() {
    setShowFreshOnly(false);
    setContent(allContent);
  }

  async function handleGenerateImage(id: string) {
    try {
      console.log("🖼 IMAGE BUTTON CLICKED:", id);
      setGeneratingImage(id);
      setError("");
      const updatedItem = await generateAIImage(id);
      if (!updatedItem) {
        throw new Error("Image generation returned no queue item.");
      }
      setContent((currentContent) =>
        currentContent.map((item) =>
          item.id === id ? { ...item, ...updatedItem } : item
        )
      );
      setAllContent((currentContent) =>
        currentContent.map((item) =>
          item.id === id ? { ...item, ...updatedItem } : item
        )
      );
    } catch (error: any) {
      console.error("IMAGE GENERATION ERROR:", error);
      setError(error.message || "Failed generating AI image");
    } finally {
      setGeneratingImage(null);
    }
  }

  function startEdit(item: AIContentItem) {
    if (!item.id) return;
    setEditingId(item.id);
    setEditForm({ ...item });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm(null);
  }

  async function saveEdit() {
    if (!editForm?.id) return;
    try {
      setSaving(true);
      setError("");
      await updateAIContent(editForm.id, {
        title: editForm.title,
        body: editForm.body,
        social_caption: editForm.social_caption,
        image_prompt: editForm.image_prompt,
        scheduled_date: editForm.scheduled_date,
      });
      const data = filterNews(await getAIContent());
      setAllContent(data);
      setContent(showFreshOnly ? data.filter((item) => content.some((fresh) => fresh.id === item.id)) : data);
      cancelEdit();
    } catch (error: any) {
      console.error("SAVE ERROR:", error);
      setError(error.message || "Failed saving content");
    } finally {
      setSaving(false);
    }
  }

  async function approvePost(id: string) {
    try {
      setError("");
      await updateAIContent(id, { status: "approved" });
      const data = filterNews(await getAIContent());
      setAllContent(data);
      setContent(showFreshOnly ? data.filter((item) => content.some((fresh) => fresh.id === item.id)) : data);
    } catch (error: any) {
      console.error("APPROVAL ERROR:", error);
      setError(error.message || "Approval failed");
    }
  }

  async function removePost(id: string) {
    try {
      setError("");
      await deleteAIContent(id);
      const data = filterNews(await getAIContent());
      setAllContent(data);
      setContent(showFreshOnly ? data.filter((item) => content.some((fresh) => fresh.id === item.id)) : data);
    } catch (error: any) {
      console.error("DELETE ERROR:", error);
      setError(error.message || "Delete failed");
    }
  }

  async function approveAndPublish(item: AIContentItem) {
    if (!item.id) return;
    try {
      setApprovingPublishing(item.id);
      setError("");
      await updateAIContent(item.id, { status: "approved" });
      const result = await publishAIContent(item.id);
      if (result?.slug) {
        setPublishedArticles((prev) => ({ ...prev, [item.id]: result.slug }));
      }
      const data = filterNews(await getAIContent());
      setAllContent(data);
      setContent(showFreshOnly ? data.filter((entry) => content.some((fresh) => fresh.id === entry.id)) : data);
    } catch (error: any) {
      console.error("APPROVE & PUBLISH ERROR:", error);
      setError(error.message || "Approve & Publish failed");
    } finally {
      setApprovingPublishing(null);
    }
  }

  async function publishPost(id: string) {
    try {
      setError("");
      const result = await publishAIContent(id);
      if (result?.slug) {
        setPublishedArticles((prev) => ({ ...prev, [id]: result.slug }));
      }
      const data = filterNews(await getAIContent());
      setAllContent(data);
      setContent(showFreshOnly ? data.filter((item) => content.some((fresh) => fresh.id === item.id)) : data);
    } catch (error: any) {
      console.error("PUBLISH ERROR:", error);
      setError(error.message || "Publish failed");
    }
  }

  return (
    <div className="space-y-6">
      <div className="pp-panel p-6">
        <h1 className="pp-title text-3xl">🤖 PulsePlay AI Content Studio</h1>
        <p className="mt-3 text-slate-400">
          Review and publish fresh weekly gaming and hardware news with minimal manual work.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          🖼 Weekly news is researched from current gaming and hardware sources, drafted with AI, and given an original image.
        </p>

        <div className="mt-6 rounded-2xl border border-pink-500/30 bg-black/20 p-5">
          <h2 className="text-xl font-black text-pink-400">🧪 OpenAI Image Test Lab</h2>
          <p className="mt-2 text-sm text-slate-400">
            Test real OpenAI image generation without creating or modifying an AI content item.
          </p>
          <textarea
            className="mt-4 min-h-[110px] w-full rounded-xl bg-black/40 p-4 text-white outline-none ring-pink-500/40 focus:ring-2"
            value={testImagePrompt}
            onChange={(e) => setTestImagePrompt(e.target.value)}
            placeholder="Enter an image prompt..."
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={handleTestImage}
              disabled={testingImage || !testImagePrompt.trim()}
              className="rounded-xl bg-pink-500/20 px-5 py-3 font-bold text-pink-300 hover:bg-pink-500/30 disabled:opacity-40"
            >
              {testingImage ? "🖼 Generating Real OpenAI Image..." : "🧪 Test Real OpenAI Image"}
            </button>
          </div>
          {testImageUrl && (
            <div className="mt-5">
              <h3 className="mb-3 font-bold text-cyan-400">✅ Real OpenAI Image Result</h3>
              <div className="w-full overflow-hidden rounded-xl" style={{ height: "320px" }}>
                <img
                  src={testImageUrl}
                  alt="Real OpenAI generated test"
                  className="block w-full rounded-xl border border-pink-500/30"
                  style={{ width: "100%", height: "320px", objectFit: "cover", display: "block" }}
                />
              </div>
              <p className="mt-3 text-xs text-slate-500">Generated through the protected PulsePlay API and stored in Supabase.</p>
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            onClick={handleRefreshNews}
            disabled={loading}
            className="rounded-xl bg-slate-700 px-5 py-3 font-bold disabled:opacity-50"
          >
            {loading ? "⏳ Refreshing..." : "🔄 Refresh Fresh Gaming + Hardware News"}
          </button>

          {showFreshOnly && (
            <>
              <span className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm font-bold text-cyan-300">
                ⚡ NEW THIS WEEK: {freshBatchCount} draft{freshBatchCount === 1 ? "" : "s"}
              </span>
              <button
                onClick={showAllNews}
                className="rounded-xl bg-slate-800 px-5 py-3 font-bold text-slate-200 hover:bg-slate-700"
              >
                Show All News
              </button>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="pp-panel border border-red-500/40 text-red-300">{error}</div>
      )}

      {loading ? (
        <div className="pp-panel p-6">Loading AI Content...</div>
      ) : (
        <>
          {showFreshOnly && content.length === 0 ? (
            <div className="pp-panel p-8 text-center">
              <div className="text-4xl">📰</div>
              <h2 className="mt-3 text-xl font-bold">No New Stories Found</h2>
              <p className="mt-2 text-slate-400">
                The weekly research ran successfully, but no new gaming or hardware stories passed the freshness and duplicate checks.
              </p>
              <button
                onClick={showAllNews}
                className="mt-5 rounded-xl bg-slate-700 px-5 py-3 font-bold"
              >
                Show Existing News Queue
              </button>
            </div>
          ) : (
            <>
              <AIContentCalendar content={content} onSelect={(item) => startEdit(item)} />

              <div className="grid gap-6">
                {content.length === 0 ? (
                  <div className="pp-panel p-8 text-center">
                    <div className="text-4xl">🤖</div>
                    <h2 className="mt-3 text-xl font-bold">No AI Content Yet</h2>
                    <p className="mt-2 text-slate-400">
                      Click "Refresh Fresh Gaming + Hardware News" to create your first PulsePlay AI news package.
                    </p>
                  </div>
                ) : (
                  content.map((item) => (
                    <div key={item.id} className="pp-panel p-6">
                      {editingId === item.id && editForm ? (
                        <div className="space-y-4">
                          <h2 className="text-2xl font-black text-cyan-400">✏️ Editing AI Content</h2>
                          <div>
                            <label className="mb-2 block text-sm font-bold text-slate-400">Title</label>
                            <input
                              className="w-full rounded-xl bg-black/30 p-3 text-white"
                              value={editForm.title}
                              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-bold text-slate-400">Content</label>
                            <textarea
                              className="min-h-[250px] w-full rounded-xl bg-black/30 p-4 text-white"
                              value={editForm.body}
                              onChange={(e) => setEditForm({ ...editForm, body: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-bold text-slate-400">Social Caption</label>
                            <textarea
                              className="min-h-[120px] w-full rounded-xl bg-black/30 p-4 text-white"
                              value={editForm.social_caption || ""}
                              onChange={(e) => setEditForm({ ...editForm, social_caption: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-bold text-slate-400">AI Image Prompt</label>
                            <textarea
                              className="min-h-[120px] w-full rounded-xl bg-black/30 p-4 text-white"
                              value={editForm.image_prompt || ""}
                              onChange={(e) => setEditForm({ ...editForm, image_prompt: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-bold text-slate-400">Scheduled Date</label>
                            <input
                              type="date"
                              className="rounded-xl bg-black/30 p-3 text-white"
                              value={editForm.scheduled_date?.substring(0, 10) || ""}
                              onChange={(e) => setEditForm({ ...editForm, scheduled_date: e.target.value })}
                            />
                          </div>
                          <div className="flex flex-wrap gap-3">
                            <button onClick={saveEdit} disabled={saving} className="pp-button disabled:opacity-50">
                              {saving ? "Saving..." : "💾 Save Changes"}
                            </button>
                            <button onClick={cancelEdit} className="rounded-xl bg-slate-700 px-5 py-3 font-bold">Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex flex-col justify-between gap-4 md:flex-row">
                            <div>
                              <h2 className="text-xl font-bold">{item.title}</h2>
                              <p className="text-sm text-slate-400">{item.category}{" • "}{item.content_type}</p>
                              {item.scheduled_date && (
                                <p className="mt-1 text-xs text-slate-500">Scheduled: {item.scheduled_date}</p>
                              )}
                            </div>
                            <div className="text-sm font-bold text-cyan-300">{item.status}</div>
                          </div>

                          {item.source_url && (
                            <p className="mt-3 text-sm text-slate-400">
                              Source: {item.source_name || "Original source"} — {item.source_url}
                            </p>
                          )}

                          {item.image_url && (
                            <img
                              src={item.image_url}
                              alt={item.title}
                              className="mt-4 max-h-80 w-full rounded-xl object-cover"
                            />
                          )}

                          <div className="prose prose-invert mt-5 max-w-none">
                            <ReactMarkdown>{item.body}</ReactMarkdown>
                          </div>

                          <div className="mt-5 flex flex-wrap gap-3">
                            <button onClick={() => startEdit(item)} className="rounded-xl bg-slate-700 px-4 py-2 font-bold">✏️ Edit</button>
                            {!item.image_url && (
                              <button
                                onClick={() => handleGenerateImage(item.id)}
                                disabled={generatingImage === item.id}
                                className="rounded-xl bg-pink-500/20 px-4 py-2 font-bold text-pink-300 disabled:opacity-50"
                              >
                                {generatingImage === item.id ? "🖼 Generating..." : "🖼 Generate Image"}
                              </button>
                            )}
                            {item.status !== "approved" && item.status !== "published" && (
                              <button onClick={() => approvePost(item.id)} className="rounded-xl bg-cyan-500/20 px-4 py-2 font-bold text-cyan-300">✅ Approve</button>
                            )}
                            {item.status !== "published" && (
                              <button
                                onClick={() => approveAndPublish(item)}
                                disabled={approvingPublishing === item.id}
                                className="rounded-xl bg-purple-500/20 px-4 py-2 font-bold text-purple-300 disabled:opacity-50"
                              >
                                {approvingPublishing === item.id ? "🚀 Publishing..." : "🚀 Approve & Publish"}
                              </button>
                            )}
                            <button onClick={() => removePost(item.id)} className="rounded-xl bg-red-500/10 px-4 py-2 font-bold text-red-300">🗑 Delete</button>
                            {publishedArticles[item.id] && (
                              <Link to={`/news/${publishedArticles[item.id]}`} className="rounded-xl bg-green-500/20 px-4 py-2 font-bold text-green-300">
                                View Published Article
                              </Link>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
