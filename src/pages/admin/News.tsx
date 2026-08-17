import { useEffect, useState } from "react";

import {
  addNews,
  getNews,
  updateNews,
  deleteNews,
  type NewsArticle,
} from "../../services/news";

import { uploadImage } from "../../services/storage";

export default function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  /*
   * =========================
   * NEWS INFORMATION
   * =========================
   */

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("PulsePlay");

  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(false);

  /*
   * =========================
   * SEO
   * =========================
   */

  const [metaDescription, setMetaDescription] = useState("");

  /*
   * =========================
   * SOCIAL / AI
   * =========================
   */

  const [facebookPost, setFacebookPost] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [hashtags, setHashtags] = useState("");

  /*
   * =========================
   * LOAD NEWS
   * =========================
   */

  async function loadNews() {
    try {
      setLoading(true);

      const data = await getNews();

      console.log("ADMIN NEWS DATA:", data);

      setArticles(data || []);
    } catch (error) {
      console.error("Failed to load news:", error);

      alert("Failed to load news.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNews();
  }, []);

  /*
   * =========================
   * CREATE SLUG
   * =========================
   */

  function createSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  /*
   * =========================
   * SUBMIT NEWS
   * =========================
   */

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      alert("News title is required.");
      return;
    }

    if (!content.trim()) {
      alert("Article content is required.");
      return;
    }

    if (!image.trim() && !imageFile) {
      alert(
        "Please provide an Image URL or upload a News Image."
      );

      return;
    }

    setSaving(true);

    try {
      /*
       * =========================
       * IMAGE
       * =========================
       */

      let imageUrl = image.trim();

      if (imageFile) {
        imageUrl = await uploadImage(
          imageFile,
          "news"
        );
      }

      /*
       * =========================
       * SLUG
       * =========================
       */

      const slug = createSlug(title);

      /*
       * =========================
       * EXCERPT
       * =========================
       *
       * Use manually entered excerpt
       * first. Otherwise use the first
       * 150 characters of the article.
       */

      const finalExcerpt =
        excerpt.trim() ||
        content.trim().substring(0, 150);

      /*
       * =========================
       * NEWS OBJECT
       * =========================
       */

      const article = {
        title: title.trim(),

        slug,

        excerpt: finalExcerpt,

        content: content.trim(),

        image: imageUrl,

        category: category.trim(),

        featured,

        published,

        author: author.trim() || "PulsePlay",

        meta_description:
          metaDescription.trim(),

        facebook_post:
          facebookPost.trim(),

        image_prompt:
          imagePrompt.trim(),

        hashtags: hashtags
          .split(/[\s,]+/)
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      console.log(
        "SAVING NEWS ARTICLE:",
        article
      );

      /*
       * =========================
       * UPDATE / CREATE
       * =========================
       */

      if (editingId) {
        await updateNews(
          editingId,
          article
        );
      } else {
        await addNews(article);
      }

      clearForm();

      await loadNews();
    } catch (error) {
      console.error(
        "Save news error:",
        error
      );

      alert(
        "Failed to save news article."
      );
    } finally {
      setSaving(false);
    }
  }

  /*
   * =========================
   * EDIT ARTICLE
   * =========================
   */

  function editArticle(article: NewsArticle) {
    setEditingId(article.id);

    setTitle(article.title || "");

    setExcerpt(
      article.excerpt || ""
    );

    setContent(
      article.content || ""
    );

    setImage(
      article.image || ""
    );

    setCategory(
      article.category || ""
    );

    setAuthor(
      article.author || "PulsePlay"
    );

    setFeatured(
      article.featured === true
    );

    setPublished(
      article.published === true
    );

    setMetaDescription(
      article.meta_description || ""
    );

    setFacebookPost(
      article.facebook_post || ""
    );

    setImagePrompt(
      article.image_prompt || ""
    );

    setHashtags(
      Array.isArray(article.hashtags)
        ? article.hashtags.join(" ")
        : ""
    );

    setImageFile(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /*
   * =========================
   * DELETE ARTICLE
   * =========================
   */

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Delete this news article?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteNews(id);

      await loadNews();
    } catch (error) {
      console.error(
        "Delete news error:",
        error
      );

      alert(
        "Failed to delete news article."
      );
    }
  }

  /*
   * =========================
   * TOGGLE PUBLISH
   * =========================
   */

  async function togglePublish(
    article: NewsArticle
  ) {
    try {
      await updateNews(
        article.id,
        {
          published:
            !article.published,
        }
      );

      await loadNews();
    } catch (error) {
      console.error(
        "Toggle publish error:",
        error
      );

      alert(
        "Failed to update publication status."
      );
    }
  }

  /*
   * =========================
   * CLEAR FORM
   * =========================
   */

  function clearForm() {
    setEditingId(null);

    setTitle("");
    setExcerpt("");
    setContent("");

    setImage("");
    setImageFile(null);

    setCategory("");
    setAuthor("PulsePlay");

    setFeatured(false);
    setPublished(false);

    setMetaDescription("");

    setFacebookPost("");
    setImagePrompt("");
    setHashtags("");
  }

  /*
   * =========================
   * FORM CLASSES
   * =========================
   */

  const inputClass = `
    w-full
    rounded-xl
    border
    border-white/10
    bg-black/30
    px-4
    py-3
    text-white
    outline-none
    transition
    focus:border-cyan-400/50
    focus:ring-2
    focus:ring-cyan-400/10
  `;

  const textareaClass = `
    w-full
    resize-y
    rounded-xl
    border
    border-white/10
    bg-black/30
    px-4
    py-3
    text-white
    outline-none
    transition
    focus:border-cyan-400/50
    focus:ring-2
    focus:ring-cyan-400/10
  `;

  /*
   * =========================
   * PAGE
   * =========================
   */

  return (
    <main className="space-y-10">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <section>

        <div className="mb-3 flex items-center gap-3">

          <span className="pp-live-dot" />

          <span
            className="
              text-xs
              font-black
              uppercase
              tracking-[0.3em]
              text-cyan-400
            "
          >
            News Management
          </span>

        </div>

        <h1
          className="
            text-4xl
            font-black
            pp-gradient-text
            md:text-5xl
          "
        >
          Manage News
        </h1>

        <p
          className="
            mt-3
            max-w-3xl
            text-slate-400
          "
        >
          Create, edit, publish, and manage
          PulsePlay gaming news, articles,
          SEO information, social posts,
          and visual content.
        </p>

      </section>

      {/* =========================
          NEWS FORM
      ========================= */}

      <section className="pp-panel rounded-2xl p-6">

        <div className="mb-8 flex items-center justify-between gap-4">

          <div>

            <h2 className="text-2xl font-black text-white">
              {editingId
                ? "Edit News Article"
                : "Add News"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Complete the article, SEO,
              social, and visual information.
            </p>

          </div>

          {editingId && (
            <button
              type="button"
              onClick={clearForm}
              className="
                rounded-xl
                border
                border-white/10
                bg-white/5
                px-4
                py-2
                text-sm
                font-bold
                text-slate-300
                transition
                hover:bg-white/10
                hover:text-white
              "
            >
              Cancel Edit
            </button>
          )}

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-10"
        >

          {/* =========================
              SECTION 1
              ARTICLE INFORMATION
          ========================= */}

          <div>

            <div className="mb-5">

              <h3 className="text-xl font-black text-white">
                Article Information
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Core information for the
                PulsePlay news article.
              </p>

            </div>

            <div className="space-y-6">

              {/* TITLE */}

              <div>

                <label
                  htmlFor="news-title"
                  className="mb-2 block text-sm font-bold text-slate-300"
                >
                  Article Title *
                </label>

                <input
                  id="news-title"
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
                  }
                  placeholder="Enter news article title"
                  className={inputClass}
                />

              </div>

              {/* SLUG PREVIEW */}

              <div>

                <label className="mb-2 block text-sm font-bold text-slate-300">
                  URL Slug
                </label>

                <div
                  className="
                    rounded-xl
                    border
                    border-white/10
                    bg-black/20
                    px-4
                    py-3
                    text-sm
                    text-slate-500
                  "
                >
                  /news/
                  <span className="text-cyan-400">
                    {createSlug(title) ||
                      "article-slug"}
                  </span>
                </div>

                <p className="mt-2 text-xs text-slate-600">
                  Automatically generated from
                  the article title.
                </p>

              </div>

              {/* EXCERPT */}

              <div>

                <label
                  htmlFor="news-excerpt"
                  className="mb-2 block text-sm font-bold text-slate-300"
                >
                  Excerpt
                </label>

                <textarea
                  id="news-excerpt"
                  value={excerpt}
                  onChange={(e) =>
                    setExcerpt(
                      e.target.value
                    )
                  }
                  placeholder="Short summary of the article..."
                  rows={4}
                  className={textareaClass}
                />

                <p className="mt-2 text-xs text-slate-600">
                  If left empty, the first 150
                  characters of the article will
                  be used automatically.
                </p>

              </div>

              {/* ARTICLE CONTENT */}

              <div>

                <label
                  htmlFor="news-content"
                  className="mb-2 block text-sm font-bold text-slate-300"
                >
                  Article Content *
                </label>

                <textarea
                  id="news-content"
                  value={content}
                  onChange={(e) =>
                    setContent(
                      e.target.value
                    )
                  }
                  placeholder="Write the complete PulsePlay gaming news article..."
                  rows={18}
                  className={textareaClass}
                />

              </div>

              {/* IMAGE URL */}

              <div>

                <label
                  htmlFor="news-image"
                  className="mb-2 block text-sm font-bold text-slate-300"
                >
                  Image URL *
                </label>

                <input
                  id="news-image"
                  type="url"
                  value={image}
                  onChange={(e) =>
                    setImage(
                      e.target.value
                    )
                  }
                  placeholder="https://..."
                  className={inputClass}
                />

              </div>

              {/* IMAGE UPLOAD */}

              <div>

                <label
                  htmlFor="news-image-file"
                  className="mb-2 block text-sm font-bold text-slate-300"
                >
                  Or Upload News Image
                </label>

                <input
                  id="news-image-file"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setImageFile(
                      e.target.files?.[0] ||
                        null
                    )
                  }
                  className="
                    block
                    w-full
                    cursor-pointer
                    rounded-xl
                    border
                    border-white/10
                    bg-black/30
                    px-4
                    py-3
                    text-sm
                    text-slate-400
                  "
                />

              </div>

              {/* CATEGORY / AUTHOR */}

              <div
                className="
                  grid
                  gap-6
                  md:grid-cols-2
                "
              >

                <div>

                  <label
                    htmlFor="news-category"
                    className="mb-2 block text-sm font-bold text-slate-300"
                  >
                    Category
                  </label>

                  <input
                    id="news-category"
                    type="text"
                    value={category}
                    onChange={(e) =>
                      setCategory(
                        e.target.value
                      )
                    }
                    placeholder="Gaming News"
                    className={inputClass}
                  />

                </div>

                <div>

                  <label
                    htmlFor="news-author"
                    className="mb-2 block text-sm font-bold text-slate-300"
                  >
                    Author
                  </label>

                  <input
                    id="news-author"
                    type="text"
                    value={author}
                    onChange={(e) =>
                      setAuthor(
                        e.target.value
                      )
                    }
                    placeholder="PulsePlay"
                    className={inputClass}
                  />

                </div>

              </div>

              {/* FEATURED / PUBLISHED */}

              <div
                className="
                  grid
                  gap-4
                  md:grid-cols-2
                "
              >

                <label
                  className="
                    flex
                    cursor-pointer
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/10
                    bg-black/20
                    p-4
                  "
                >

                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) =>
                      setFeatured(
                        e.target.checked
                      )
                    }
                    className="h-5 w-5 accent-cyan-400"
                  />

                  <div>

                    <span className="font-bold text-white">
                      Featured Article
                    </span>

                    <p className="text-sm text-slate-500">
                      Highlight this article
                      throughout PulsePlay.
                    </p>

                  </div>

                </label>

                <label
                  className="
                    flex
                    cursor-pointer
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/10
                    bg-black/20
                    p-4
                  "
                >

                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) =>
                      setPublished(
                        e.target.checked
                      )
                    }
                    className="h-5 w-5 accent-cyan-400"
                  />

                  <div>

                    <span className="font-bold text-white">
                      Published
                    </span>

                    <p className="text-sm text-slate-500">
                      Make this article visible
                      to visitors.
                    </p>

                  </div>

                </label>

              </div>

            </div>

          </div>

          {/* =========================
              SECTION 2
              SEO
          ========================= */}

          <div>

            <div className="mb-5">

              <h3 className="text-xl font-black text-white">
                Search Engine Optimization
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Optimize the article for search
                engines and sharing.
              </p>

            </div>

            <div>

              <label
                htmlFor="meta-description"
                className="mb-2 block text-sm font-bold text-slate-300"
              >
                Meta Description
              </label>

              <textarea
                id="meta-description"
                value={metaDescription}
                onChange={(e) =>
                  setMetaDescription(
                    e.target.value
                  )
                }
                placeholder="Write a concise search-engine description..."
                rows={4}
                className={textareaClass}
              />

              <p className="mt-2 text-xs text-slate-600">
                Recommended: approximately
                150–160 characters.
              </p>

            </div>

          </div>

          {/* =========================
              SECTION 3
              SOCIAL / AI
          ========================= */}

          <div>

            <div className="mb-5">

              <h3 className="text-xl font-black text-white">
                Social & Visual Content
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Prepare promotional content
                for Facebook and image generation.
              </p>

            </div>

            <div className="space-y-6">

              {/* FACEBOOK POST */}

              <div>

                <label
                  htmlFor="facebook-post"
                  className="mb-2 block text-sm font-bold text-slate-300"
                >
                  Facebook Post
                </label>

                <textarea
                  id="facebook-post"
                  value={facebookPost}
                  onChange={(e) =>
                    setFacebookPost(
                      e.target.value
                    )
                  }
                  placeholder="Write the Facebook promotional post..."
                  rows={7}
                  className={textareaClass}
                />

              </div>

              {/* IMAGE PROMPT */}

              <div>

                <label
                  htmlFor="image-prompt"
                  className="mb-2 block text-sm font-bold text-slate-300"
                >
                  Image Prompt
                </label>

                <textarea
                  id="image-prompt"
                  value={imagePrompt}
                  onChange={(e) =>
                    setImagePrompt(
                      e.target.value
                    )
                  }
                  placeholder="Describe the image to generate for this article..."
                  rows={8}
                  className={textareaClass}
                />

              </div>

              {/* HASHTAGS */}

              <div>

                <label
                  htmlFor="hashtags"
                  className="mb-2 block text-sm font-bold text-slate-300"
                >
                  Hashtags
                </label>

                <input
                  id="hashtags"
                  type="text"
                  value={hashtags}
                  onChange={(e) =>
                    setHashtags(
                      e.target.value
                    )
                  }
                  placeholder="#PulsePlay #Gaming #GamingNews #PS5 #Xbox #PCGaming"
                  className={inputClass}
                />

                <p className="mt-2 text-xs text-slate-600">
                  Separate hashtags with spaces
                  or commas.
                </p>

              </div>

            </div>

          </div>

          {/* =========================
              SAVE BUTTONS
          ========================= */}

          <div
            className="
              flex
              flex-wrap
              gap-3
              border-t
              border-white/10
              pt-8
            "
          >

            <button
              type="submit"
              disabled={saving}
              className="
                rounded-xl
                border
                border-cyan-400/40
                bg-cyan-400
                px-7
                py-3
                font-black
                uppercase
                tracking-wider
                text-black
                shadow-[0_0_25px_rgba(34,211,238,.25)]
                transition
                hover:-translate-y-1
                hover:bg-cyan-300
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Update Article"
                  : "Add News"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={clearForm}
                disabled={saving}
                className="
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  px-7
                  py-3
                  font-black
                  uppercase
                  tracking-wider
                  text-slate-300
                  transition
                  hover:bg-white/10
                  hover:text-white
                  disabled:opacity-50
                "
              >
                Cancel
              </button>
            )}

          </div>

        </form>

      </section>

      {/* =========================
          MANAGED NEWS
      ========================= */}

      <section>

        <div
          className="
            mb-6
            flex
            items-center
            justify-between
          "
        >

          <div>

            <h2 className="text-2xl font-black text-white">
              Managed News
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {articles.length} article
              {articles.length === 1
                ? ""
                : "s"} in the PulsePlay
              news library.
            </p>

          </div>

        </div>

        {loading ? (

          <div className="pp-panel rounded-2xl p-8 text-center">

            <span className="pp-live-dot mr-3 inline-block" />

            <span className="text-slate-400">
              Loading news...
            </span>

          </div>

        ) : articles.length === 0 ? (

          <div className="pp-panel rounded-2xl p-8 text-center">

            <h3 className="text-xl font-bold text-white">
              No News Articles
            </h3>

            <p className="mt-2 text-slate-500">
              Add a news article above to
              populate the PulsePlay news
              section.
            </p>

          </div>

        ) : (

          <div
            className="
              grid
              grid-cols-1
              gap-6
              md:grid-cols-2
              xl:grid-cols-3
            "
          >

            {articles.map(
              (article) => (

                <article
                  key={article.id}
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-black/20
                    transition
                    hover:-translate-y-1
                    hover:border-cyan-400/30
                  "
                >

                  {/* IMAGE */}

                  {article.image ? (

                    <img
                      src={article.image}
                      alt={article.title}
                      className="
                        h-52
                        w-full
                        object-cover
                      "
                    />

                  ) : (

                    <div
                      className="
                        flex
                        h-52
                        items-center
                        justify-center
                        bg-black/40
                        text-slate-600
                      "
                    >
                      No Article Image
                    </div>

                  )}

                  <div className="p-5">

                    {/* BADGES */}

                    <div className="mb-3 flex flex-wrap gap-2">

                      <span
                        className={`
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-black
                          uppercase
                          ${
                            article.published
                              ? "bg-green-500/20 text-green-300"
                              : "bg-yellow-500/20 text-yellow-300"
                          }
                        `}
                      >
                        {article.published
                          ? "Published"
                          : "Draft"}
                      </span>

                      {article.featured && (
                        <span
                          className="
                            rounded-full
                            bg-purple-500/20
                            px-3
                            py-1
                            text-xs
                            font-black
                            uppercase
                            text-purple-300
                          "
                        >
                          Featured
                        </span>
                      )}

                      {article.category && (
                        <span
                          className="
                            rounded-full
                            bg-cyan-500/10
                            px-3
                            py-1
                            text-xs
                            font-black
                            uppercase
                            text-cyan-300
                          "
                        >
                          {article.category}
                        </span>
                      )}

                    </div>

                    {/* TITLE */}

                    <h3
                      className="
                        text-xl
                        font-black
                        text-white
                      "
                    >
                      {article.title}
                    </h3>

                    {/* AUTHOR */}

                    <p className="mt-2 text-xs uppercase tracking-wider text-slate-600">
                      By{" "}
                      <span className="text-slate-400">
                        {article.author ||
                          "PulsePlay"}
                      </span>
                    </p>

                    {/* EXCERPT */}

                    {article.excerpt && (
                      <p
                        className="
                          mt-4
                          line-clamp-3
                          text-sm
                          text-slate-400
                        "
                      >
                        {article.excerpt}
                      </p>
                    )}

                    {/* CONTENT PREVIEW */}

                    {!article.excerpt &&
                      article.content && (
                        <p
                          className="
                            mt-4
                            line-clamp-3
                            text-sm
                            text-slate-400
                          "
                        >
                          {article.content}
                        </p>
                      )}

                    {/* CONTENT STATUS */}

                    <div className="mt-4 flex flex-wrap gap-2">

                      {article.content && (
                        <span
                          className="
                            rounded-full
                            bg-purple-500/10
                            px-2.5
                            py-1
                            text-xs
                            font-bold
                            text-purple-300
                          "
                        >
                          Article
                        </span>
                      )}

                      {article.meta_description && (
                        <span
                          className="
                            rounded-full
                            bg-cyan-500/10
                            px-2.5
                            py-1
                            text-xs
                            font-bold
                            text-cyan-300
                          "
                        >
                          SEO
                        </span>
                      )}

                      {article.facebook_post && (
                        <span
                          className="
                            rounded-full
                            bg-blue-500/10
                            px-2.5
                            py-1
                            text-xs
                            font-bold
                            text-blue-300
                          "
                        >
                          Facebook
                        </span>
                      )}

                      {article.image_prompt && (
                        <span
                          className="
                            rounded-full
                            bg-pink-500/10
                            px-2.5
                            py-1
                            text-xs
                            font-bold
                            text-pink-300
                          "
                        >
                          Image Prompt
                        </span>
                      )}

                      {article.hashtags &&
                        article.hashtags.length >
                          0 && (
                          <span
                            className="
                              rounded-full
                              bg-white/5
                              px-2.5
                              py-1
                              text-xs
                              font-bold
                              text-slate-400
                            "
                          >
                            Hashtags
                          </span>
                        )}

                    </div>

                    {/* ACTIONS */}

                    <div
                      className="
                        mt-6
                        flex
                        flex-wrap
                        gap-3
                      "
                    >

                      <button
                        type="button"
                        onClick={() =>
                          editArticle(
                            article
                          )
                        }
                        className="
                          rounded-xl
                          border
                          border-cyan-500/30
                          bg-cyan-500/10
                          px-5
                          py-2.5
                          text-sm
                          font-black
                          uppercase
                          tracking-wider
                          text-cyan-300
                          transition
                          hover:bg-cyan-500/20
                        "
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          togglePublish(
                            article
                          )
                        }
                        className="
                          rounded-xl
                          border
                          border-green-500/30
                          bg-green-500/10
                          px-5
                          py-2.5
                          text-sm
                          font-black
                          uppercase
                          tracking-wider
                          text-green-300
                          transition
                          hover:bg-green-500/20
                        "
                      >
                        {article.published
                          ? "Unpublish"
                          : "Publish"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            article.id
                          )
                        }
                        className="
                          rounded-xl
                          border
                          border-red-500/30
                          bg-red-500/10
                          px-5
                          py-2.5
                          text-sm
                          font-black
                          uppercase
                          tracking-wider
                          text-red-300
                          transition
                          hover:bg-red-500/20
                        "
                      >
                        Delete
                      </button>

                      <a
                        href={`/news/${article.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="
                          rounded-xl
                          border
                          border-purple-500/30
                          bg-purple-500/10
                          px-5
                          py-2.5
                          text-sm
                          font-black
                          uppercase
                          tracking-wider
                          text-purple-300
                          transition
                          hover:bg-purple-500/20
                        "
                      >
                        View
                      </a>

                    </div>

                  </div>

                </article>

              )
            )}

          </div>

        )}

      </section>

    </main>
  );
}