import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getAIContent,
  generateWeeklyContent,
  generateAIImage,
  updateAIContent,
  deleteAIContent,
  publishAIContent,
  type AIContentItem,
} from "../../services/aiContent";

import AIContentCalendar from "../../components/admin/AIContentCalendar";

export default function AIContentStudio() {
  console.log("🔥 AIContentStudio LOADED");

  const [content, setContent] =
    useState<AIContentItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [generating, setGenerating] =
    useState(false);

  const [generatingImage, setGeneratingImage] =
    useState<string | null>(null);

  const [saving, setSaving] =
    useState(false);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [editForm, setEditForm] =
    useState<AIContentItem | null>(null);

  const [error, setError] =
    useState("");

  const [publishedArticles, setPublishedArticles] =
    useState<Record<string, string>>({});


  // =====================================
  // Load AI Content
  // =====================================

  async function loadContent() {
    try {
      setLoading(true);
      setError("");

      const data =
        await getAIContent();

      setContent(data || []);

    } catch (error: any) {
      console.error(
        "LOAD AI CONTENT ERROR:",
        error
      );

      setError(
        error.message ||
        "Failed loading AI content"
      );

    } finally {
      setLoading(false);
    }
  }


  // =====================================
  // Initial Load
  // =====================================

  useEffect(() => {
    loadContent();
  }, []);


  // =====================================
  // Generate Weekly Content
  // =====================================

  async function handleGenerate() {
    try {
      setGenerating(true);
      setError("");

      await generateWeeklyContent();

      await loadContent();

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent(
            "pulseplay:ai-published"
          )
        );
      }

    } catch (error: any) {
      console.error(
        "GENERATE ERROR:",
        error
      );

      setError(
        error.message ||
        "Failed generating content"
      );

    } finally {
      setGenerating(false);
    }
  }


  // =====================================
  // Generate AI Image
  // =====================================

  async function handleGenerateImage(
    id: string
  ) {
    try {
      console.log(
        "🖼 IMAGE BUTTON CLICKED:",
        id
      );

      setGeneratingImage(id);
      setError("");

      const updatedItem =
        await generateAIImage(id);

      console.log(
        "🖼 GENERATED IMAGE ITEM:",
        updatedItem
      );

      if (!updatedItem) {
        throw new Error(
          "Image generation returned no queue item."
        );
      }

      // Safely merge the updated queue item
      // into the existing content list.
      setContent((currentContent) =>
        currentContent.map((item) =>
          item.id === id
            ? {
                ...item,
                ...updatedItem,
              }
            : item
        )
      );

    } catch (error: any) {
      console.error(
        "IMAGE GENERATION ERROR:",
        error
      );

      setError(
        error.message ||
        "Failed generating AI image"
      );

    } finally {
      setGeneratingImage(null);
    }
  }


  // =====================================
  // Start Editing
  // =====================================

  function startEdit(
    item: AIContentItem
  ) {
    if (!item.id) return;

    setEditingId(item.id);

    setEditForm({
      ...item,
    });
  }


  // =====================================
  // Cancel Editing
  // =====================================

  function cancelEdit() {
    setEditingId(null);
    setEditForm(null);
  }


  // =====================================
  // Save Edited Content
  // =====================================

  async function saveEdit() {
    if (!editForm?.id) return;

    try {
      setSaving(true);
      setError("");

      await updateAIContent(
        editForm.id,
        {
          title:
            editForm.title,

          body:
            editForm.body,

          social_caption:
            editForm.social_caption,

          image_prompt:
            editForm.image_prompt,

          scheduled_date:
            editForm.scheduled_date,
        }
      );

      await loadContent();

      cancelEdit();

    } catch (error: any) {
      console.error(
        "SAVE ERROR:",
        error
      );

      setError(
        error.message ||
        "Failed saving content"
      );

    } finally {
      setSaving(false);
    }
  }


  // =====================================
  // Approve Post
  // =====================================

  async function approvePost(
    id: string
  ) {
    try {
      setError("");

      await updateAIContent(
        id,
        {
          status: "approved",
        }
      );

      await loadContent();

    } catch (error: any) {
      console.error(
        "APPROVAL ERROR:",
        error
      );

      setError(
        error.message ||
        "Approval failed"
      );
    }
  }


  // =====================================
  // Delete Post
  // =====================================

  async function removePost(
    id: string
  ) {
    try {
      setError("");

      await deleteAIContent(id);

      await loadContent();

    } catch (error: any) {
      console.error(
        "DELETE ERROR:",
        error
      );

      setError(
        error.message ||
        "Delete failed"
      );
    }
  }


  // =====================================
  // Publish Post
  // =====================================

  async function publishPost(
    id: string
  ) {
    try {
      setError("");

      const result =
        await publishAIContent(id);

      if (result?.slug) {
        setPublishedArticles(
          (prev) => ({
            ...prev,
            [id]: result.slug,
          })
        );
      }

      await loadContent();

    } catch (error: any) {
      console.error(
        "PUBLISH ERROR:",
        error
      );

      setError(
        error.message ||
        "Publish failed"
      );
    }
  }


  // =====================================
  // Render
  // =====================================

  return (
    <div className="space-y-6">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="pp-panel p-6">

        <h1 className="pp-title text-3xl">
          🤖 PulsePlay AI Content Studio
        </h1>

        <p className="mt-3 text-slate-400">
          Generate, edit, approve, and publish
          automated gaming content.
        </p>

        <p className="mt-2 text-sm text-slate-500">
          🖼 Generate or regenerate featured
          images for your AI content.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">

          {/* GENERATE WEEKLY */}

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="
              pp-button
              disabled:opacity-50
            "
          >
            {generating
              ? "Generating Weekly Content..."
              : "🚀 Generate Weekly Content"}
          </button>


          {/* REFRESH */}

          <button
            onClick={loadContent}
            disabled={loading}
            className="
              rounded-xl
              bg-slate-700
              px-5
              py-3
              font-bold
              disabled:opacity-50
            "
          >
            🔄 Refresh
          </button>

        </div>

      </div>


      {/* =====================================
          ERROR
      ===================================== */}

      {error && (
        <div
          className="
            pp-panel
            border
            border-red-500/40
            text-red-300
          "
        >
          {error}
        </div>
      )}


      {/* =====================================
          CONTENT
      ===================================== */}

      {loading ? (

        <div className="pp-panel p-6">
          Loading AI Content...
        </div>

      ) : (

        <>

          {/* =====================================
              CALENDAR
          ===================================== */}

          <AIContentCalendar
            content={content}
            onSelect={(item) =>
              startEdit(item)
            }
          />


          {/* =====================================
              CONTENT CARDS
          ===================================== */}

          <div className="grid gap-6">

            {content.length === 0 ? (

              <div className="pp-panel p-8 text-center">

                <div className="text-4xl">
                  🤖
                </div>

                <h2 className="mt-3 text-xl font-bold">
                  No AI Content Yet
                </h2>

                <p className="mt-2 text-slate-400">
                  Click "Generate Weekly Content"
                  to create your first PulsePlay
                  AI content package.
                </p>

              </div>

            ) : (

              content.map((item) => (

                <div
                  key={item.id}
                  className="pp-panel p-6"
                >

                  {/* =================================
                      EDIT MODE
                  ================================= */}

                  {editingId === item.id &&
                  editForm ? (

                    <div className="space-y-4">

                      <h2
                        className="
                          text-2xl
                          font-black
                          text-cyan-400
                        "
                      >
                        ✏️ Editing AI Content
                      </h2>


                      {/* TITLE */}

                      <div>

                        <label className="
                          mb-2
                          block
                          text-sm
                          font-bold
                          text-slate-400
                        ">
                          Title
                        </label>

                        <input
                          className="
                            w-full
                            rounded-xl
                            bg-black/30
                            p-3
                            text-white
                          "
                          value={
                            editForm.title
                          }
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              title:
                                e.target.value,
                            })
                          }
                        />

                      </div>


                      {/* BODY */}

                      <div>

                        <label className="
                          mb-2
                          block
                          text-sm
                          font-bold
                          text-slate-400
                        ">
                          Content
                        </label>

                        <textarea
                          className="
                            min-h-[250px]
                            w-full
                            rounded-xl
                            bg-black/30
                            p-4
                            text-white
                          "
                          value={
                            editForm.body
                          }
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              body:
                                e.target.value,
                            })
                          }
                        />

                      </div>


                      {/* SOCIAL CAPTION */}

                      <div>

                        <label className="
                          mb-2
                          block
                          text-sm
                          font-bold
                          text-slate-400
                        ">
                          Social Caption
                        </label>

                        <textarea
                          className="
                            min-h-[120px]
                            w-full
                            rounded-xl
                            bg-black/30
                            p-4
                            text-white
                          "
                          value={
                            editForm.social_caption ||
                            ""
                          }
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              social_caption:
                                e.target.value,
                            })
                          }
                        />

                      </div>


                      {/* IMAGE PROMPT */}

                      <div>

                        <label className="
                          mb-2
                          block
                          text-sm
                          font-bold
                          text-slate-400
                        ">
                          AI Image Prompt
                        </label>

                        <textarea
                          className="
                            min-h-[120px]
                            w-full
                            rounded-xl
                            bg-black/30
                            p-4
                            text-white
                          "
                          value={
                            editForm.image_prompt ||
                            ""
                          }
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              image_prompt:
                                e.target.value,
                            })
                          }
                        />

                      </div>


                      {/* SCHEDULE DATE */}

                      <div>

                        <label className="
                          mb-2
                          block
                          text-sm
                          font-bold
                          text-slate-400
                        ">
                          Scheduled Date
                        </label>

                        <input
                          type="date"
                          className="
                            rounded-xl
                            bg-black/30
                            p-3
                            text-white
                          "
                          value={
                            editForm.scheduled_date
                              ?.substring(0, 10) ||
                            ""
                          }
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              scheduled_date:
                                e.target.value,
                            })
                          }
                        />

                      </div>


                      {/* SAVE / CANCEL */}

                      <div className="flex flex-wrap gap-3">

                        <button
                          onClick={saveEdit}
                          disabled={saving}
                          className="
                            pp-button
                            disabled:opacity-50
                          "
                        >
                          {saving
                            ? "Saving..."
                            : "💾 Save Changes"}
                        </button>


                        <button
                          onClick={cancelEdit}
                          className="
                            rounded-xl
                            bg-slate-700
                            px-5
                            py-3
                            font-bold
                          "
                        >
                          Cancel
                        </button>

                      </div>

                    </div>

                  ) : (

                    /* =================================
                       VIEW MODE
                    ================================= */

                    <>

                      {/* HEADER */}

                      <div
                        className="
                          flex
                          flex-col
                          justify-between
                          gap-4
                          md:flex-row
                        "
                      >

                        <div>

                          <h2 className="
                            text-xl
                            font-bold
                          ">
                            {item.title}
                          </h2>

                          <p className="
                            text-sm
                            text-slate-400
                          ">
                            {item.category}
                            {" • "}
                            {item.content_type}
                          </p>

                          {item.scheduled_date && (
                            <p className="
                              mt-1
                              text-xs
                              text-slate-500
                            ">
                              📅 Scheduled:
                              {" "}
                              {item.scheduled_date.substring(0, 10)}
                            </p>
                          )}

                        </div>


                        {/* STATUS */}

                        <span
                          className={`
                            h-fit
                            rounded
                            px-3
                            py-1
                            ${
                              item.status === "published"
                                ? "bg-green-500/20 text-green-300"
                                : item.status === "approved"
                                  ? "bg-blue-500/20 text-blue-300"
                                  : "bg-yellow-500/20 text-yellow-300"
                            }
                          `}
                        >
                          {item.status}
                        </span>

                      </div>


                      {/* BODY */}

                      <p
                        className="
                          mt-4
                          whitespace-pre-line
                          text-slate-300
                        "
                      >
                        {item.body}
                      </p>


                      {/* SOCIAL CAPTION */}

                      {item.social_caption && (
                        <div className="
                          mt-5
                          rounded-xl
                          bg-black/20
                          p-4
                        ">

                          <h3 className="
                            mb-2
                            font-bold
                            text-cyan-400
                          ">
                            📱 Social Caption
                          </h3>

                          <p className="
                            whitespace-pre-line
                            text-sm
                            text-slate-300
                          ">
                            {item.social_caption}
                          </p>

                        </div>
                      )}


                      {/* EXISTING IMAGE */}

                      {item.image_url && (
                        <div className="mt-5">

                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="
                              w-full
                              rounded-xl
                              border
                              border-cyan-500/20
                              object-cover
                            "
                          />

                        </div>
                      )}


                      {/* ACTIONS */}

                      <div
                        className="
                          mt-5
                          flex
                          flex-wrap
                          gap-3
                        "
                      >

                        {/* EDIT */}

                        <button
                          onClick={() =>
                            startEdit(item)
                          }
                          className="
                            rounded-xl
                            bg-purple-500/20
                            px-4
                            py-2
                            text-purple-300
                          "
                        >
                          ✏️ Edit
                        </button>


                        {/* GENERATE IMAGE */}

                        <button
                          onClick={() =>
                            handleGenerateImage(
                              item.id
                            )
                          }
                          disabled={
                            generatingImage === item.id ||
                            !item.image_prompt ||
                            item.status === "published"
                          }
                          className="
                            rounded-xl
                            bg-pink-500/20
                            px-4
                            py-2
                            text-pink-300
                            disabled:opacity-40
                          "
                        >
                          {generatingImage === item.id
                            ? "🖼 Generating..."
                            : item.image_url
                              ? "🔄 Regenerate Image"
                              : "🖼 Generate AI Image"}
                        </button>


                        {/* APPROVE */}

                        <button
                          onClick={() =>
                            approvePost(item.id)
                          }
                          disabled={
                            item.status ===
                              "approved" ||
                            item.status ===
                              "published"
                          }
                          className="
                            pp-button
                            disabled:opacity-40
                          "
                        >
                          ✅ Approve
                        </button>


                        {/* PUBLISH / VIEW */}

                        {item.status ===
                          "published" &&
                        publishedArticles[item.id] ? (

                          <Link
                            to={`/news/${publishedArticles[item.id]}`}
                            className="
                              rounded-xl
                              bg-cyan-500/20
                              px-4
                              py-2
                              font-bold
                              text-cyan-300
                            "
                          >
                            📖 View Article
                          </Link>

                        ) : (

                          <button
                            onClick={() =>
                              publishPost(item.id)
                            }
                            disabled={
                              item.status !==
                              "approved"
                            }
                            className="
                              rounded-xl
                              bg-green-500/20
                              px-4
                              py-2
                              text-green-300
                              disabled:opacity-40
                            "
                          >
                            🚀 Publish
                          </button>

                        )}


                        {/* DELETE */}

                        <button
                          onClick={() =>
                            removePost(item.id)
                          }
                          className="
                            rounded-xl
                            bg-red-500/20
                            px-4
                            py-2
                            text-red-300
                          "
                        >
                          🗑 Delete
                        </button>

                      </div>

                    </>

                  )}

                </div>

              ))

            )}

          </div>

        </>

      )}

    </div>
  );
}