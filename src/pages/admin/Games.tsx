import { useEffect, useState } from "react";

import {
  addGame,
  getGames,
  updateGame,
  deleteGame,
  type Game,
  type GameInput,
} from "../../services/games";

import { uploadImage } from "../../services/storage";

export default function Games() {
  const [games, setGames] = useState<Game[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState<
    "all" | "upcoming" | "released" | "archived"
  >("all");

  /*
   * =========================
   * GAME INFORMATION
   * =========================
   */

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [category, setCategory] = useState("");

  const [featured, setFeatured] = useState(false);

  const [status, setStatus] = useState<
    "upcoming" | "released" | "archived"
  >("upcoming");

  /*
   * =========================
   * ARTICLE CONTENT
   * =========================
   */

  const [articleTitle, setArticleTitle] = useState("");
  const [metaDescription, setMetaDescription] =
    useState("");
  const [articleContent, setArticleContent] =
    useState("");

  /*
   * =========================
   * SOCIAL / AI CONTENT
   * =========================
   */

  const [facebookPost, setFacebookPost] =
    useState("");

  const [imagePrompt, setImagePrompt] =
    useState("");

  const [hashtags, setHashtags] =
    useState("");

  /*
   * =========================
   * LOAD GAMES
   * =========================
   */

  async function loadGames() {
    try {
      setLoading(true);

      const data = await getGames();

      console.log(
        "ADMIN GAMES DATA:",
        data
      );

      setGames(data || []);
    } catch (error) {
      console.error(
        "Failed to load games:",
        error
      );

      alert("Failed to load games.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGames();
  }, []);

  /*
   * =========================
   * SUBMIT GAME
   * =========================
   */

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Game title is required.");
      return;
    }

    if (!description.trim()) {
      alert("Game description is required.");
      return;
    }

    if (!image.trim() && !imageFile) {
      alert(
        "Please provide an Image URL or upload a Game Image."
      );

      return;
    }

    setSaving(true);

    try {
      let imageUrl = image.trim();

      /*
       * Upload image if selected.
       */

      if (imageFile) {
        imageUrl = await uploadImage(
          imageFile,
          "games"
        );
      }

      /*
       * Automatically determine status
       * when a release date is supplied.
       */

      let finalStatus = status;

      if (
        status !== "archived" &&
        releaseDate
      ) {
        const release = new Date(
          releaseDate
        );

        const today = new Date();

        release.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        finalStatus =
          release > today
            ? "upcoming"
            : "released";
      }

      const game: GameInput = {
        title: title.trim(),

        description:
          description.trim(),

        image: imageUrl,

        release_date:
          releaseDate || null,

        genre:
          genre.trim() || null,

        platform:
          platform.trim() || null,

        featured,

        category:
          category.trim() || null,

        status: finalStatus,

        article_title:
          articleTitle.trim() || null,

        meta_description:
          metaDescription.trim() || null,

        article_content:
          articleContent.trim() || null,

        facebook_post:
          facebookPost.trim() || null,

        image_prompt:
          imagePrompt.trim() || null,

        hashtags:
          hashtags.trim() || null,
      };

      console.log(
        "SAVING GAME:",
        game
      );

      if (editingId) {
        await updateGame(
          editingId,
          game
        );
      } else {
        await addGame(game);
      }

      clearForm();

      await loadGames();
    } catch (error) {
      console.error(
        "Save game error:",
        error
      );

      alert(
        "Failed to save game."
      );
    } finally {
      setSaving(false);
    }
  }

  /*
   * =========================
   * EDIT GAME
   * =========================
   */

  function editGame(game: Game) {
    setEditingId(game.id);

    /*
     * Game information
     */

    setTitle(
      game.title || ""
    );

    setDescription(
      game.description || ""
    );

    setImage(
      game.image || ""
    );

    setReleaseDate(
      game.release_date || ""
    );

    setGenre(
      game.genre || ""
    );

    setPlatform(
      game.platform || ""
    );

    setCategory(
      game.category || ""
    );

    setFeatured(
      game.featured === true
    );

    setStatus(
      game.status || "upcoming"
    );

    /*
     * Article
     */

    setArticleTitle(
      game.article_title || ""
    );

    setMetaDescription(
      game.meta_description || ""
    );

    setArticleContent(
      game.article_content || ""
    );

    /*
     * Social / AI
     */

    setFacebookPost(
      game.facebook_post || ""
    );

    setImagePrompt(
      game.image_prompt || ""
    );

    setHashtags(
      game.hashtags || ""
    );

    setImageFile(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /*
   * =========================
   * DELETE GAME
   * =========================
   */

  async function handleDelete(
    id: string
  ) {
    const confirmed =
      window.confirm(
        "Delete this game?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteGame(id);

      await loadGames();
    } catch (error) {
      console.error(
        "Delete game error:",
        error
      );

      alert(
        "Failed to delete game."
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
    setDescription("");
    setImage("");
    setImageFile(null);

    setReleaseDate("");
    setGenre("");
    setPlatform("");
    setCategory("");

    setFeatured(false);
    setStatus("upcoming");

    setArticleTitle("");
    setMetaDescription("");
    setArticleContent("");

    setFacebookPost("");
    setImagePrompt("");
    setHashtags("");
  }

  /*
   * =========================
   * STATUS HELPERS
   * =========================
   */

  function getGameStatus(
    game: Game
  ): "upcoming" | "released" | "archived" {
    if (game.status) {
      return game.status;
    }

    if (!game.release_date) {
      return "upcoming";
    }

    return new Date(
      game.release_date
    ) > new Date()
      ? "upcoming"
      : "released";
  }

  function isUpcoming(game: Game) {
    return (
      getGameStatus(game) ===
      "upcoming"
    );
  }

  function isReleased(game: Game) {
    return (
      getGameStatus(game) ===
      "released"
    );
  }

  function isArchived(game: Game) {
    return (
      getGameStatus(game) ===
      "archived"
    );
  }

  /*
   * =========================
   * FILTER
   * =========================
   */

  const filteredGames =
    games.filter((game) => {
      if (
        statusFilter ===
        "upcoming"
      ) {
        return isUpcoming(game);
      }

      if (
        statusFilter ===
        "released"
      ) {
        return isReleased(game);
      }

      if (
        statusFilter ===
        "archived"
      ) {
        return isArchived(game);
      }

      return true;
    });

  /*
   * =========================
   * FORM FIELD CLASSES
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
            Game Management
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
          {editingId
            ? "Edit Game"
            : "Game Library"}
        </h1>

        <p
          className="
            mt-3
            max-w-3xl
            text-slate-400
          "
        >
          Add, edit, and manage games,
          release information, articles,
          social content, and visual prompts
          throughout PulsePlay.
        </p>

      </section>

      {/* =========================
          GAME FORM
      ========================= */}

      <section className="pp-panel rounded-2xl p-6">

        <div className="mb-8 flex items-center justify-between gap-4">

          <div>

            <h2 className="text-2xl font-black text-white">
              {editingId
                ? "Edit Game"
                : "Add New Game"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Complete game, article,
              social, and image information.
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
              GAME INFORMATION
          ========================= */}

          <div>

            <div className="mb-5">

              <h3 className="text-xl font-black text-white">
                Game Information
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Core information displayed in
                the public Games library.
              </p>

            </div>

            <div className="space-y-6">

              {/* TITLE */}

              <div>

                <label
                  htmlFor="game-title"
                  className="mb-2 block text-sm font-bold text-slate-300"
                >
                  Game Title *
                </label>

                <input
                  id="game-title"
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
                  }
                  placeholder="Enter game title"
                  className={inputClass}
                />

              </div>

              {/* DESCRIPTION */}

              <div>

                <label
                  htmlFor="game-description"
                  className="mb-2 block text-sm font-bold text-slate-300"
                >
                  Description *
                </label>

                <textarea
                  id="game-description"
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  placeholder="Enter the public game description"
                  rows={5}
                  className={textareaClass}
                />

              </div>

              {/* IMAGE URL */}

              <div>

                <label
                  htmlFor="game-image"
                  className="mb-2 block text-sm font-bold text-slate-300"
                >
                  Image URL *
                </label>

                <input
                  id="game-image"
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
                  htmlFor="game-image-file"
                  className="mb-2 block text-sm font-bold text-slate-300"
                >
                  Or Upload Game Image
                </label>

                <input
                  id="game-image-file"
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

              {/* GRID */}

              <div
                className="
                  grid
                  gap-6
                  md:grid-cols-2
                "
              >

                {/* RELEASE DATE */}

                <div>

                  <label
                    htmlFor="game-release-date"
                    className="mb-2 block text-sm font-bold text-slate-300"
                  >
                    Release Date
                  </label>

                  <input
                    id="game-release-date"
                    type="date"
                    value={releaseDate}
                    onChange={(e) =>
                      setReleaseDate(
                        e.target.value
                      )
                    }
                    className={inputClass}
                  />

                </div>

                {/* CATEGORY */}

                <div>

                  <label
                    htmlFor="game-category"
                    className="mb-2 block text-sm font-bold text-slate-300"
                  >
                    Category
                  </label>

                  <input
                    id="game-category"
                    type="text"
                    value={category}
                    onChange={(e) =>
                      setCategory(
                        e.target.value
                      )
                    }
                    placeholder="Upcoming Release, Gaming News, etc."
                    className={inputClass}
                  />

                </div>

                {/* GENRE */}

                <div>

                  <label
                    htmlFor="game-genre"
                    className="mb-2 block text-sm font-bold text-slate-300"
                  >
                    Genre
                  </label>

                  <input
                    id="game-genre"
                    type="text"
                    value={genre}
                    onChange={(e) =>
                      setGenre(
                        e.target.value
                      )
                    }
                    placeholder="Action, RPG, Horror..."
                    className={inputClass}
                  />

                </div>

                {/* PLATFORM */}

                <div>

                  <label
                    htmlFor="game-platform"
                    className="mb-2 block text-sm font-bold text-slate-300"
                  >
                    Platform
                  </label>

                  <input
                    id="game-platform"
                    type="text"
                    value={platform}
                    onChange={(e) =>
                      setPlatform(
                        e.target.value
                      )
                    }
                    placeholder="PS5, Xbox Series X|S, PC..."
                    className={inputClass}
                  />

                </div>

                {/* STATUS */}

                <div>

                  <label
                    htmlFor="game-status"
                    className="mb-2 block text-sm font-bold text-slate-300"
                  >
                    Status
                  </label>

                  <select
                    id="game-status"
                    value={status}
                    onChange={(e) =>
                      setStatus(
                        e.target.value as
                          | "upcoming"
                          | "released"
                          | "archived"
                      )
                    }
                    className={inputClass}
                  >
                    <option value="upcoming">
                      Upcoming
                    </option>

                    <option value="released">
                      Released
                    </option>

                    <option value="archived">
                      Archived
                    </option>
                  </select>

                </div>

              </div>

              {/* FEATURED */}

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
                    Featured Game
                  </span>

                  <p className="text-sm text-slate-500">
                    Highlight this game in
                    PulsePlay featured sections.
                  </p>

                </div>

              </label>

            </div>

          </div>

          {/* =========================
              SECTION 2
              ARTICLE
          ========================= */}

          <div>

            <div className="mb-5">

              <h3 className="text-xl font-black text-white">
                PulsePlay Article
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                SEO and editorial content for
                the game/release article.
              </p>

            </div>

            <div className="space-y-6">

              {/* ARTICLE TITLE */}

              <div>

                <label
                  htmlFor="article-title"
                  className="mb-2 block text-sm font-bold text-slate-300"
                >
                  Article Title
                </label>

                <input
                  id="article-title"
                  type="text"
                  value={articleTitle}
                  onChange={(e) =>
                    setArticleTitle(
                      e.target.value
                    )
                  }
                  placeholder="Example: The Biggest Games Coming to PS5 This Fall"
                  className={inputClass}
                />

              </div>

              {/* META DESCRIPTION */}

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
                  rows={3}
                  className={textareaClass}
                />

                <p className="mt-2 text-xs text-slate-600">
                  Recommended: approximately
                  150–160 characters.
                </p>

              </div>

              {/* ARTICLE CONTENT */}

              <div>

                <label
                  htmlFor="article-content"
                  className="mb-2 block text-sm font-bold text-slate-300"
                >
                  Article Content
                </label>

                <textarea
                  id="article-content"
                  value={articleContent}
                  onChange={(e) =>
                    setArticleContent(
                      e.target.value
                    )
                  }
                  placeholder="Write the complete PulsePlay article..."
                  rows={14}
                  className={textareaClass}
                />

              </div>

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
                Content that can be used for
                Facebook promotion and image
                generation.
              </p>

            </div>

            <div className="space-y-6">

              {/* FACEBOOK */}

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
                  rows={6}
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
                  placeholder="Describe the image you want generated for this article..."
                  rows={7}
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
                  placeholder="#PulsePlay #Gaming #PS5 #Xbox #PCGaming"
                  className={inputClass}
                />

              </div>

            </div>

          </div>

          {/* =========================
              SAVE BUTTONS
          ========================= */}

          <div className="flex flex-wrap gap-3 border-t border-white/10 pt-8">

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
                  ? "Update Game"
                  : "Add Game"}
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
          FILTERS
      ========================= */}

      <section className="flex flex-wrap gap-3">

        {[
          {
            value: "all" as const,
            label: `All Games (${games.length})`,
          },
          {
            value: "upcoming" as const,
            label: `Upcoming (${games.filter(isUpcoming).length})`,
          },
          {
            value: "released" as const,
            label: `Released (${games.filter(isReleased).length})`,
          },
          {
            value: "archived" as const,
            label: `Archived (${games.filter(isArchived).length})`,
          },
        ].map((filter) => (

          <button
            key={filter.value}
            type="button"
            onClick={() =>
              setStatusFilter(
                filter.value
              )
            }
            className={`
              rounded-xl
              border
              px-5
              py-3
              text-sm
              font-black
              uppercase
              tracking-wider
              transition
              ${
                statusFilter ===
                filter.value
                  ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-300"
                  : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
              }
            `}
          >
            {filter.label}
          </button>

        ))}

      </section>

      {/* =========================
          GAME LIST
      ========================= */}

      <section>

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-black text-white">
            Managed Games
          </h2>

          <span className="text-sm text-slate-500">
            {filteredGames.length} game
            {filteredGames.length === 1
              ? ""
              : "s"}
          </span>

        </div>

        {loading ? (

          <div className="pp-panel rounded-2xl p-8 text-center">

            <span className="pp-live-dot mr-3 inline-block" />

            <span className="text-slate-400">
              Loading games...
            </span>

          </div>

        ) : filteredGames.length === 0 ? (

          <div className="pp-panel rounded-2xl p-8 text-center">

            <h3 className="text-xl font-bold text-white">
              No Games Found
            </h3>

            <p className="mt-2 text-slate-500">
              Add a game above to populate
              the PulsePlay library.
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

            {filteredGames.map(
              (game) => {

                const gameStatus =
                  getGameStatus(game);

                const isGameFeatured =
                  game.featured === true;

                return (
                  <article
                    key={game.id}
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

                    {game.image ? (
                      <img
                        src={game.image}
                        alt={game.title}
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
                        No Cover Image
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
                              gameStatus ===
                              "upcoming"
                                ? "bg-blue-500/20 text-blue-300"
                                : gameStatus ===
                                    "released"
                                  ? "bg-green-500/20 text-green-300"
                                  : "bg-slate-500/20 text-slate-300"
                            }
                          `}
                        >
                          {gameStatus ===
                          "upcoming"
                            ? "Coming Soon"
                            : gameStatus ===
                                "released"
                              ? "Released"
                              : "Archived"}
                        </span>

                        {isGameFeatured && (
                          <span
                            className="
                              rounded-full
                              bg-yellow-500/20
                              px-3
                              py-1
                              text-xs
                              font-black
                              uppercase
                              text-yellow-300
                            "
                          >
                            Featured
                          </span>
                        )}

                        {game.category && (
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
                            {game.category}
                          </span>
                        )}

                      </div>

                      {/* TITLE */}

                      <h3 className="text-xl font-black text-white">
                        {game.title}
                      </h3>

                      {/* DESCRIPTION */}

                      {game.description && (
                        <p className="mt-3 line-clamp-3 text-sm text-slate-400">
                          {game.description}
                        </p>
                      )}

                      {/* GENRE */}

                      {game.genre && (
                        <p className="mt-4 text-sm text-slate-500">
                          Genre:{" "}
                          <span className="text-slate-300">
                            {game.genre}
                          </span>
                        </p>
                      )}

                      {/* PLATFORM */}

                      {game.platform && (
                        <p className="mt-1 text-sm text-slate-500">
                          Platform:{" "}
                          <span className="text-slate-300">
                            {game.platform}
                          </span>
                        </p>
                      )}

                      {/* RELEASE */}

                      {game.release_date && (
                        <p className="mt-3 text-sm font-bold text-cyan-400">
                          Release:{" "}
                          {new Date(
                            game.release_date
                          ).toLocaleDateString()}
                        </p>
                      )}

                      {/* CONTENT STATUS */}

                      <div className="mt-4 flex flex-wrap gap-2">

                        {game.article_content && (
                          <span className="rounded-full bg-purple-500/10 px-2.5 py-1 text-xs font-bold text-purple-300">
                            Article
                          </span>
                        )}

                        {game.facebook_post && (
                          <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-300">
                            Facebook
                          </span>
                        )}

                        {game.image_prompt && (
                          <span className="rounded-full bg-pink-500/10 px-2.5 py-1 text-xs font-bold text-pink-300">
                            Image Prompt
                          </span>
                        )}

                      </div>

                      {/* ACTIONS */}

                      <div className="mt-6 flex flex-wrap gap-3">

                        <button
                          type="button"
                          onClick={() =>
                            editGame(game)
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
                            handleDelete(
                              game.id
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
                          href={`/games/${game.id}`}
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
                );
              }
            )}

          </div>

        )}

      </section>

    </main>
  );
}