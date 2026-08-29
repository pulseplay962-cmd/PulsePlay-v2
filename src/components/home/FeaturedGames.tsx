import { useEffect, useMemo, useState } from "react";
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

  const intelligence = useMemo(() => {
    const upcoming = games.filter(
      (game) => game.status === "upcoming"
    ).length;

    const released = games.filter(
      (game) => game.status === "released"
    ).length;

    return {
      total: games.length,
      upcoming,
      released,
    };
  }, [games]);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <BrandCard scan className="p-8 md:p-10">
          <div className="flex items-center gap-4">
            <span className="pp-live-dot h-3 w-3 rounded-full bg-cyan-400" />

            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
                PulsePlay Mission Network
              </p>

              <h2 className="mt-2 text-3xl font-black uppercase text-white md:text-4xl">
                SCANNING GAME DATABASE...
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Establishing connection with the active mission registry.
              </p>
            </div>
          </div>
        </BrandCard>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">

      {/* COMMAND HEADER */}

      <BrandCard scan className="p-6 md:p-8 lg:p-10">

        <div
          className="
            flex
            flex-col
            gap-8
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >

          <div>

            <div className="flex items-center gap-3">

              <span className="pp-live-dot h-3 w-3 rounded-full bg-cyan-400" />

              <p
                className="
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.35em]
                  text-cyan-400
                "
              >
                Mission Intelligence
              </p>

            </div>

            <h2
              className="
                mt-3
                text-4xl
                font-black
                uppercase
                tracking-tight
                pp-gradient-text
                md:text-5xl
              "
            >
              Featured Games
            </h2>

            <p className="mt-3 max-w-2xl text-slate-400">
              Priority game intelligence tracked by the PulsePlay network.
              Explore active missions, upcoming releases, and current
              gaming operations.
            </p>

          </div>


          <div className="flex flex-wrap items-center gap-3">

            <div
              className="
                rounded-xl
                border
                border-cyan-500/20
                bg-black/30
                px-4
                py-3
                text-center
              "
            >
              <p className="text-xl font-black text-white">
                {intelligence.total}
              </p>

              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                Tracked
              </p>
            </div>

            <div
              className="
                rounded-xl
                border
                border-blue-500/20
                bg-blue-500/5
                px-4
                py-3
                text-center
              "
            >
              <p className="text-xl font-black text-blue-300">
                {intelligence.upcoming}
              </p>

              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                Incoming
              </p>
            </div>

            <div
              className="
                rounded-xl
                border
                border-green-500/20
                bg-green-500/5
                px-4
                py-3
                text-center
              "
            >
              <p className="text-xl font-black text-green-300">
                {intelligence.released}
              </p>

              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                Active
              </p>
            </div>

            <Link to="/games">
              <BrandButton>
                Open Game Database →
              </BrandButton>
            </Link>

          </div>

        </div>


        {/* STATUS BAR */}

        <div
          className="
            mt-8
            grid
            gap-3
            border-t
            border-white/10
            pt-6
            sm:grid-cols-3
          "
        >

          <div className="flex items-center gap-3">

            <span className="h-2 w-2 rounded-full bg-cyan-400" />

            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-600">
                DATABASE
              </p>

              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-300">
                Online
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <span className="h-2 w-2 rounded-full bg-purple-400" />

            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-600">
                PRIORITY
              </p>

              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-300">
                Featured Missions
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <span className="h-2 w-2 rounded-full bg-green-400" />

            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-600">
                STATUS
              </p>

              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-green-300">
                Intelligence Updated
              </p>
            </div>

          </div>

        </div>

      </BrandCard>


      {/* EMPTY STATE */}

      {games.length === 0 && (
        <BrandCard className="mt-8 p-8">

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
            No Featured Missions Available
          </h3>

          <p className="mt-2 max-w-xl text-slate-400">
            Featured games will appear here when they are activated
            through the PulsePlay Admin Dashboard.
          </p>

          <Link to="/games" className="mt-6 inline-block">
            <BrandButton variant="secondary">
              Browse Full Database →
            </BrandButton>
          </Link>

        </BrandCard>
      )}


      {/* GAME GRID */}

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

          {games.map((game, index) => {

            const statusClass =
              game.status === "upcoming"
                ? "border-blue-400/30 bg-blue-400/10 text-blue-300"
                : game.status === "released"
                  ? "border-green-400/30 bg-green-400/10 text-green-300"
                  : "border-white/10 bg-black/60 text-slate-400";

            return (
              <BrandCard
                key={game.id}
                className="
                  group
                  flex
                  h-full
                  flex-col
                  overflow-hidden
                  p-0
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-cyan-400/40
                  hover:shadow-[0_0_35px_rgba(34,211,238,.10)]
                "
              >

                {/* IMAGE */}

                <div
                  className="
                    relative
                    overflow-hidden
                    border-b
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
                        duration-700
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
                        bg-black/50
                        text-xs
                        font-black
                        uppercase
                        tracking-[0.25em]
                        text-slate-600
                      "
                    >
                      No Mission Image
                    </div>
                  )}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/80
                      via-transparent
                      to-transparent
                    "
                  />


                  {/* MISSION NUMBER */}

                  <div
                    className="
                      absolute
                      left-4
                      top-4
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
                        text-[9px]
                        font-black
                        uppercase
                        tracking-[0.2em]
                        text-cyan-300
                      "
                    >
                      MISSION {String(index + 1).padStart(2, "0")}
                    </span>

                  </div>


                  {/* STATUS */}

                  {game.status && (
                    <div
                      className={`
                        absolute
                        right-4
                        top-4
                        rounded-lg
                        border
                        px-3
                        py-1.5
                        backdrop-blur-md
                        ${statusClass}
                      `}
                    >

                      <span
                        className="
                          text-[9px]
                          font-black
                          uppercase
                          tracking-[0.2em]
                        "
                      >
                        {game.status}
                      </span>

                    </div>
                  )}


                  {/* CATEGORY */}

                  {game.category && (
                    <div className="absolute bottom-4 left-4">

                      <span
                        className="
                          rounded-full
                          border
                          border-white/10
                          bg-black/75
                          px-3
                          py-1.5
                          text-[9px]
                          font-black
                          uppercase
                          tracking-[0.2em]
                          text-white
                          backdrop-blur-md
                        "
                      >
                        {game.category}
                      </span>

                    </div>
                  )}

                </div>


                {/* CONTENT */}

                <div className="flex flex-1 flex-col p-6">

                  <div className="flex flex-wrap gap-2">

                    {game.genre && (
                      <span
                        className="
                          rounded-full
                          border
                          border-purple-500/30
                          bg-purple-500/10
                          px-3
                          py-1
                          text-[9px]
                          font-black
                          uppercase
                          tracking-wider
                          text-purple-300
                        "
                      >
                        {game.genre}
                      </span>
                    )}

                    {game.platform && (
                      <span
                        className="
                          rounded-full
                          border
                          border-cyan-500/20
                          bg-cyan-500/5
                          px-3
                          py-1
                          text-[9px]
                          font-black
                          uppercase
                          tracking-wider
                          text-cyan-300
                        "
                      >
                        {game.platform}
                      </span>
                    )}

                  </div>


                  <h3
                    className="
                      mt-4
                      text-2xl
                      font-black
                      leading-tight
                      text-white
                      transition-colors
                      duration-300
                      group-hover:text-cyan-300
                    "
                  >
                    {game.title}
                  </h3>


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
                      mt-6
                      grid
                      grid-cols-2
                      gap-3
                      border-y
                      border-white/10
                      py-4
                    "
                  >

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
                          truncate
                          text-sm
                          font-bold
                          text-white
                        "
                      >
                        {game.platform || "Multi-Platform"}
                      </p>

                    </div>


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
                        {game.release_date
                          ? new Date(
                              game.release_date
                            ).toLocaleDateString()
                          : "TBA"}
                      </p>

                    </div>

                  </div>


                  {/* CTA */}

                  <div className="mt-auto pt-5">

                    <Link
                      to={`/games/${game.id}`}
                      className="
                        group/cta
                        inline-flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-cyan-500/30
                        bg-slate-950/80
                        px-6
                        py-3.5
                        text-xs
                        font-black
                        uppercase
                        tracking-[0.15em]
                        text-cyan-300
                        shadow-[0_0_20px_rgba(34,211,238,.10)]
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-cyan-400/60
                        hover:bg-cyan-500/10
                        hover:text-white
                        active:scale-95
                      "
                    >
                      Open Mission
                      <span className="transition-transform group-hover/cta:translate-x-1">
                        →
                      </span>
                    </Link>

                  </div>

                </div>

              </BrandCard>
            );
          })}

        </div>
      )}

    </section>
  );
}
