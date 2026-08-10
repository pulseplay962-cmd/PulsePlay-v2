import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import BrandCard from "../components/ui/BrandCard";
import { getGameById } from "../services/games";

type Game = {
  id: string;
  title: string;
  slug?: string;
  description?: string;
  image?: string;
  genre?: string;
  platform?: string;
  release_date?: string;
  feature?: boolean;
  featured?: boolean;
};

export default function GameDetails() {
  const { id } = useParams<{ id: string }>();

  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadGame() {
      console.log("=================================");
      console.log("GAME DETAILS PAGE");
      console.log("URL GAME ID:", id);
      console.log("=================================");

      try {
        if (!id) {
          console.error("No game ID found in URL.");
          setErrorMessage("No game ID was provided.");
          setGame(null);
          return;
        }

        console.log("Calling getGameById with:", id);

        const data = await getGameById(id);

        console.log("SUPABASE GAME RESULT:", data);

        if (!data) {
          console.warn("No game found.");

          setGame(null);

          setErrorMessage(
            `No game was found with ID: ${id}`
          );

          return;
        }

        setGame(data);
      } catch (error) {
        console.error(
          "FAILED TO LOAD GAME DETAILS:",
          error
        );

        setGame(null);

        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage(
            "An unknown error occurred."
          );
        }
      } finally {
        setLoading(false);
      }
    }

    loadGame();
  }, [id]);

  /*
   * =========================
   * LOADING
   * =========================
   */

  if (loading) {
    return (
      <main className="min-h-[72vh] px-6 py-12">
        <BrandCard>
          <div className="flex items-center gap-3">
            <span className="pp-live-dot" />

            <p className="text-slate-400">
              Loading game...
            </p>
          </div>
        </BrandCard>
      </main>
    );
  }

  /*
   * =========================
   * NOT FOUND
   * =========================
   */

  if (!game) {
    return (
      <main className="min-h-[72vh] px-6 py-12">
        <BrandCard>
          <h1 className="text-4xl font-black text-white">
            Game Not Found
          </h1>

          <p className="mt-4 text-slate-400">
            The requested game could not be found.
          </p>

          {id && (
            <p className="mt-3 break-all text-sm text-cyan-400">
              Game ID:
              <span className="ml-2">
                {id}
              </span>
            </p>
          )}

          {errorMessage && (
            <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
              <p className="text-sm text-red-300">
                {errorMessage}
              </p>
            </div>
          )}

          <Link
            to="/games"
            className="
              mt-8
              inline-flex
              items-center
              justify-center
              rounded-xl
              border
              border-cyan-500/30
              bg-slate-900/80
              px-7
              py-3
              font-black
              uppercase
              tracking-wider
              text-cyan-300
              shadow-[0_0_20px_rgba(34,211,238,.2)]
              transition-all
              hover:-translate-y-1
              hover:bg-cyan-500/10
            "
          >
            Back to Games
          </Link>
        </BrandCard>
      </main>
    );
  }

  /*
   * =========================
   * CLEAN IMAGE URL
   * =========================
   *
   * Some existing records appear to contain
   * Markdown-style image links instead of
   * a plain URL.
   */

  let imageUrl = game.image || "";

  if (imageUrl.startsWith("[")) {
    const markdownMatch = imageUrl.match(
      /\((https?:\/\/[^)]+)\)/
    );

    if (markdownMatch?.[1]) {
      imageUrl = markdownMatch[1];
    }
  }

  /*
   * =========================
   * FEATURE STATUS
   * =========================
   */

  const isFeatured =
    game.featured === true ||
    game.feature === true;

  /*
   * =========================
   * GAME DETAILS
   * =========================
   */

  return (
    <main className="min-h-[72vh] px-6 py-12">

      {/* BACK BUTTON */}

      <div className="mb-8">
        <Link
          to="/games"
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-cyan-500/30
            bg-slate-900/80
            px-5
            py-3
            font-bold
            text-cyan-300
            transition-all
            hover:-translate-y-1
            hover:bg-cyan-500/10
          "
        >
          ← Back to Games
        </Link>
      </div>

      {/* GAME CARD */}

      <BrandCard className="p-8">

        <div className="grid gap-10 md:grid-cols-2">

          {/* =========================
              IMAGE
          ========================= */}

          <div>

            {imageUrl ? (
              <img
                src={imageUrl}
                alt={game.title}
                className="
                  h-auto
                  max-h-[600px]
                  w-full
                  rounded-2xl
                  object-cover
                  shadow-[0_0_35px_rgba(34,211,238,.15)]
                "
                onError={(event) => {
                  console.error(
                    "GAME IMAGE FAILED:",
                    imageUrl
                  );

                  event.currentTarget.style.display =
                    "none";
                }}
              />
            ) : (
              <div
                className="
                  flex
                  min-h-[400px]
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/40
                  text-slate-500
                "
              >
                No Cover Image
              </div>
            )}

          </div>

          {/* =========================
              GAME INFORMATION
          ========================= */}

          <div>

            {/* BADGES */}

            <div className="flex flex-wrap gap-3">

              {isFeatured && (
                <span
                  className="
                    inline-flex
                    rounded-full
                    bg-yellow-500
                    px-4
                    py-2
                    text-sm
                    font-black
                    text-black
                  "
                >
                  ⭐ Featured Game
                </span>
              )}

              {game.genre && (
                <span
                  className="
                    inline-flex
                    rounded-full
                    border
                    border-purple-500/30
                    bg-purple-500/10
                    px-4
                    py-2
                    text-sm
                    font-bold
                    text-purple-300
                  "
                >
                  {game.genre}
                </span>
              )}

            </div>

            {/* TITLE */}

            <h1
              className="
                mt-6
                text-4xl
                font-black
                pp-gradient-text
                md:text-5xl
              "
            >
              {game.title}
            </h1>

            {/* DESCRIPTION */}

            {game.description && (
              <p
                className="
                  mt-6
                  text-lg
                  leading-8
                  text-slate-300
                "
              >
                {game.description}
              </p>
            )}

            {/* GAME INFORMATION */}

            <div
              className="
                mt-8
                space-y-4
                rounded-2xl
                border
                border-white/10
                bg-black/20
                p-6
              "
            >

              {game.genre && (
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                  <span className="font-bold text-slate-500">
                    Genre:
                  </span>

                  <span className="text-white">
                    {game.genre}
                  </span>
                </div>
              )}

              {game.platform && (
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                  <span className="font-bold text-slate-500">
                    Platform:
                  </span>

                  <span className="text-white">
                    {game.platform}
                  </span>
                </div>
              )}

              {game.release_date && (
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                  <span className="font-bold text-slate-500">
                    Release Date:
                  </span>

                  <span className="text-cyan-400">
                    {game.release_date}
                  </span>
                </div>
              )}

            </div>

          </div>

        </div>

      </BrandCard>

    </main>
  );
}