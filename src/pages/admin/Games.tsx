import { useEffect, useState } from "react";

import {
  addGame,
  getGames,
  updateGame,
  deleteGame,
} from "../../services/games";

import { uploadImage } from "../../services/storage";

type Game = {
  id: string;
  title: string;
  description: string;
  image: string;
  featured?: boolean;
  feature?: boolean;
  genre?: string;
  platform?: string;
  release_date?: string | null;
};

export default function Games() {
  const [games, setGames] = useState<Game[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState<
    "all" | "upcoming" | "released"
  >("all");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [featured, setFeatured] = useState(false);
  const [releaseDate, setReleaseDate] = useState("");

  async function loadGames() {
    try {
      setLoading(true);

      const data = await getGames();

      console.log("ADMIN GAMES DATA:", data);

      setGames(data || []);
    } catch (error) {
      console.error("Failed to load games:", error);
      alert("Failed to load games.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGames();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Game title is required.");
      return;
    }

    setSaving(true);

    try {
      let imageUrl = image;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile, "games");
      }

      const game = {
        title: title.trim(),
        description: description.trim(),
        image: imageUrl,
        featured,
        release_date: releaseDate || null,
      };

      console.log("SAVING GAME:", game);

      if (editingId) {
        await updateGame(editingId, game);
      } else {
        await addGame(game);
      }

      clearForm();
      await loadGames();
    } catch (error) {
      console.error("Save game error:", error);
      alert("Failed to save game.");
    } finally {
      setSaving(false);
    }
  }

  function editGame(game: Game) {
    setEditingId(game.id);

    setTitle(game.title || "");
    setDescription(game.description || "");
    setImage(game.image || "");

    /*
     * Support both database field names:
     *
     * featured
     * feature
     *
     * The current save operation uses "featured".
     */
    setFeatured(
      typeof game.featured === "boolean"
        ? game.featured
        : Boolean(game.feature)
    );

    setReleaseDate(game.release_date || "");

    setImageFile(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Delete this game?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteGame(id);

      await loadGames();
    } catch (error) {
      console.error("Delete game error:", error);

      alert("Failed to delete game.");
    }
  }

  function clearForm() {
    setEditingId(null);

    setTitle("");
    setDescription("");
    setImage("");
    setImageFile(null);
    setFeatured(false);
    setReleaseDate("");
  }

  function isUpcoming(game: Game) {
    if (!game.release_date) {
      return false;
    }

    return new Date(game.release_date) > new Date();
  }

  function isReleased(game: Game) {
    if (!game.release_date) {
      return false;
    }

    return new Date(game.release_date) <= new Date();
  }

  const filteredGames = games.filter((game) => {
    if (statusFilter === "upcoming") {
      return isUpcoming(game);
    }

    if (statusFilter === "released") {
      return isReleased(game);
    }

    return true;
  });

  return (
    <main className="space-y-10">
      {/* =========================
          PAGE HEADER
      ========================= */}

      <section>
        <div className="mb-3 flex items-center gap-3">
          <span className="pp-live-dot" />

          <span className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400">
            Game Management
          </span>
        </div>

        <h1 className="text-4xl font-black pp-gradient-text md:text-5xl">
          {editingId ? "Edit Game" : "Game Library"}
        </h1>

        <p className="mt-3 max-w-3xl text-slate-400">
          Add, edit, and manage the games displayed throughout
          the PulsePlay website.
        </p>
      </section>

      {/* =========================
          GAME FORM
      ========================= */}

      <section className="pp-panel rounded-2xl p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-white">
              {editingId ? "Edit Game" : "Add New Game"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Game information used by the public Games library.
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
          className="space-y-6"
        >
          {/* TITLE */}

          <div>
            <label
              htmlFor="game-title"
              className="mb-2 block text-sm font-bold text-slate-300"
            >
              Game Title
            </label>

            <input
              id="game-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter game title"
              className="
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
              "
            />
          </div>

          {/* DESCRIPTION */}

          <div>
            <label
              htmlFor="game-description"
              className="mb-2 block text-sm font-bold text-slate-300"
            >
              Description
            </label>

            <textarea
              id="game-description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Enter game description"
              rows={5}
              className="
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
              "
            />
          </div>

          {/* IMAGE URL */}

          <div>
            <label
              htmlFor="game-image"
              className="mb-2 block text-sm font-bold text-slate-300"
            >
              Image URL
            </label>

            <input
              id="game-image"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
              className="
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
              "
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
                  e.target.files?.[0] || null
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
                setReleaseDate(e.target.value)
              }
              className="
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
              "
            />
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
                setFeatured(e.target.checked)
              }
              className="h-5 w-5 accent-cyan-400"
            />

            <div>
              <span className="font-bold text-white">
                Featured Game
              </span>

              <p className="text-sm text-slate-500">
                Highlight this game throughout PulsePlay.
              </p>
            </div>
          </label>

          {/* BUTTONS */}

          <div className="flex flex-wrap gap-3">
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
        ].map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() =>
              setStatusFilter(filter.value)
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
                statusFilter === filter.value
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
            {filteredGames.length === 1 ? "" : "s"}
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
              Add a game above to populate the PulsePlay library.
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
            {filteredGames.map((game) => {
              const isGameUpcoming = isUpcoming(game);

              const isGameFeatured =
                typeof game.featured === "boolean"
                  ? game.featured
                  : Boolean(game.feature);

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
                            isGameUpcoming
                              ? "bg-blue-500/20 text-blue-300"
                              : "bg-green-500/20 text-green-300"
                          }
                        `}
                      >
                        {isGameUpcoming
                          ? "Coming Soon"
                          : "Released"}
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

                    {/* RELEASE */}

                    {game.release_date && (
                      <p className="mt-4 text-sm font-bold text-cyan-400">
                        Release: {game.release_date}
                      </p>
                    )}

                    {/* ACTIONS */}

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => editGame(game)}
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
                          handleDelete(game.id)
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
            })}
          </div>
        )}
      </section>
    </main>
  );
}