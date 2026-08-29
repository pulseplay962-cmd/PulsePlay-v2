import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BrandCard from "../ui/BrandCard";
import BrandButton from "../ui/BrandButton";

import {
  getGames,
  type Game,
} from "../../services/games";

export default function FeaturedGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadGames() {
    try {
      setLoading(true);

      const data = await getGames();

      const featuredGames = (data || [])
        .filter((game) => game.featured)
        .sort((a, b) => {
          const aDate = a.release_date
            ? new Date(a.release_date).getTime()
            : 0;

          const bDate = b.release_date
            ? new Date(b.release_date).getTime()
            : 0;

          return aDate - bDate;
        })
        .slice(0, 6);

      setGames(featuredGames);
    } catch (error) {
      console.error(
        "Failed to load featured games:",
        error
      );

      setGames([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGames();
  }, []);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-16">
        <BrandCard scan={true}>
          <div className="flex items-center gap-3">
            <span className="pp-live-dot h-3 w-3 rounded-full bg-cyan-400" />

            <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400">
              PULSEPLAY GAME DATABASE
            </p>
          </div>

          <h2 className="mt-3 text-4xl font-black pp-gradient-text">
            FEATURED GAMES
          </h2>

          <p className="mt-4 text-slate-400">
            Loading mission data...
          </p>
        </BrandCard>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">

      {/* =========================
          COMMAND HEADER
      ========================= */}

      <BrandCard scan={true}>

        <div
          className="
            flex
            flex-col
            gap-6
            md:flex-row
            md:items-end
            md:justify-between
          "
        >

          <div>

            <div className="flex items-center gap-3">

              <span
                className="
                  pp-live-dot
                  h-3
                  w-3
                  rounded-full
                  bg-cyan-400
                "
              />

              <p
                className="
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.3em]
                  text-cyan-400
                "
              >
                PULSEPLAY GAME DATABASE
              </p>

            </div>

            <h2
              className="
                mt-3
                text-4xl
                font-black
                uppercase
                md:text-5xl
                pp-gradient-text
              "
            >
              Featured Games
            </h2>

            <p className="mt-3 max-w-2xl text-slate-400">
              Active missions, upcoming releases, and games
              currently tracked by the PulsePlay network.
            </p>

          </div>


          <div className="flex items-center gap-4">

            <div
              className="
                rounded-xl
                border
                border-cyan-500/20
                bg-black/30
                px-5
                py-3
                text-center
              "
            >

              <p
                className="
                  text-2xl
                  font-black
                  text-white
                "
              >
                {games.length}
              </p>

              <p
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.25em]
                  text-slate-500
                "
              >
                Featured
              </p>

            </div>

            <Link to="/games">
              <BrandButton>
                Browse Games
              </BrandButton>
            </Link>

          </div>

        </div>

      </BrandCard>


      {/* =========================
          EMPTY STATE
      ========================= */}

      {games.length === 0 && (
        <BrandCard className="mt-8">

          <div className="flex items-center gap-3">

            <span className="h-3 w-3 rounded-full bg-slate-600" />

            <p
              className="
                text-xs
                font-black
                uppercase
                tracking-[0.25em]
                text-slate-500
              "
            >
              DATABASE STANDBY
            </p>

          </div>

          <h3 className="mt-4 text-2xl font-black text-white">
            No Featured Games
          </h3>

          <p className="mt-2 text-slate-400">
            Featured games will appear here when they are
            added through the PulsePlay Admin Dashboard.
          </p>

        </BrandCard>
      )}


      {/* =========================
          GAME GRID
      ========================= */}

      {games.length > 0 && (
        <div
          className="
            mt-8
            grid
            gap-6
            md:grid-cols-2
            lg:grid-cols-3
          "
        >

          {games.map((game) => (

            <BrandCard
              key={game.id}
              className="
                group
                flex
                h-full
                flex-col
                card-hover
              "
            >

              {/* IMAGE */}

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-xl
                  border
                  border-white/10
                  bg-black
                "
              >

                {game.image ? (
                  <img
                    src={game.image}
                    alt={game.title}
                    className="
                      h-64
                      w-full
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-64
                      items-center
                      justify-center
                      bg-black/40
                      text-sm
                      font-bold
                      uppercase
                      tracking-widest
                      text-slate-500
                    "
                  >
                    No Image
                  </div>
                )}

                {/* IMAGE STATUS */}

                <div
                  className="
                    absolute
                    left-3
                    top-3
                    rounded-lg
                    border
                    border-cyan-400/30
                    bg-black/75
                    px-3
                    py-1.5
                    backdrop-blur-md
                  "
                >

                  <span
                    className="
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.2em]
                      text-cyan-300
                    "
                  >
                    FEATURED
                  </span>

                </div>

                {/* GAME STATUS */}

                {game.status && (
                  <div
                    className={`
                      absolute
                      right-3
                      top-3
                      rounded-lg
                      border
                      bg-black/75
                      px-3
                      py-1.5
                      backdrop-blur-md
                      ${
                        game.status === "upcoming"
                          ? "border-blue-400/30"
                          : game.status === "released"
                            ? "border-green-400/30"
                            : "border-white/10"
                      }
                    `}
                  >

                    <span
                      className={`
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.2em]
                        ${
                          game.status === "upcoming"
                            ? "text-blue-400"
                            : game.status === "released"
                              ? "text-green-400"
                              : "text-slate-400"
                        }
                      `}
                    >
                      {game.status}
                    </span>

                  </div>
                )}

              </div>


              {/* METADATA */}

              <div className="mt-5 flex flex-wrap gap-2">

                {game.category && (
                  <span
                    className="
                      rounded-full
                      border
                      border-cyan-500/30
                      bg-cyan-500/10
                      px-3
                      py-1
                      text-[10px]
                      font-black
                      uppercase
                      tracking-wider
                      text-cyan-300
                    "
                  >
                    {game.category}
                  </span>
                )}

                {game.genre && (
                  <span
                    className="
                      rounded-full
                      border
                      border-purple-500/30
                      bg-purple-500/10
                      px-3
                      py-1
                      text-[10px]
                      font-black
                      uppercase
                      tracking-wider
                      text-purple-300
                    "
                  >
                    {game.genre}
                  </span>
                )}

              </div>


              {/* TITLE */}

              <h3
                className="
                  mt-4
                  text-2xl
                  font-black
                  text-white
                  transition-colors
                  duration-300
                  group-hover:text-cyan-300
                "
              >
                {game.title}
              </h3>


              {/* DESCRIPTION */}

              {game.description && (
                <p
                  className="
                    mt-3
                    line-clamp-3
                    text-sm
                    leading-6
                    text-slate-400
                  "
                >
                  {game.description}
                </p>
              )}


              {/* DATA READOUT */}

              <div
                className="
                  mt-5
                  grid
                  grid-cols-2
                  gap-3
                  border-y
                  border-white/10
                  py-4
                "
              >

                {game.platform && (
                  <div>

                    <p
                      className="
                        text-[9px]
                        font-black
                        uppercase
                        tracking-[0.2em]
                        text-slate-600
                      "
                    >
                      Platform
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm
                        font-bold
                        text-white
                      "
                    >
                      {game.platform}
                    </p>

                  </div>
                )}

                {game.release_date && (
                  <div>

                    <p
                      className="
                        text-[9px]
                        font-black
                        uppercase
                        tracking-[0.2em]
                        text-slate-600
                      "
                    >
                      Release
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm
                        font-bold
                        text-white
                      "
                    >
                      {new Date(
                        game.release_date
                      ).toLocaleDateString()}
                    </p>

                  </div>
                )}

              </div>


              {/* CTA */}

              <div className="mt-auto pt-5">

                <Link
                  to={`/games/${game.id}`}
                  className="
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-cyan-500/30
                    bg-slate-900/80
                    px-6
                    py-3
                    font-black
                    uppercase
                    tracking-[0.15em]
                    text-cyan-300
                    shadow-[0_0_20px_rgba(34,211,238,.15)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-cyan-400/60
                    hover:bg-cyan-500/10
                    hover:text-cyan-200
                    active:scale-95
                  "
                >
                  View Mission
                </Link>

              </div>

            </BrandCard>

          ))}

        </div>
      )}

    </section>
  );
}
