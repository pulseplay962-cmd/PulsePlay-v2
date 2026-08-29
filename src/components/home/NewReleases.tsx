import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import BrandCard from "../ui/BrandCard";
import BrandButton from "../ui/BrandButton";

import { getGames, type Game } from "../../services/games";


export default function NewReleases() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGames();
  }, []);

  async function loadGames() {
    try {
      setLoading(true);

      const data = await getGames();

      const now = new Date();

      const windowStart = new Date(now);
      windowStart.setDate(now.getDate() - 60);

      const windowEnd = new Date(now);
      windowEnd.setDate(now.getDate() + 90);

      const releaseGames = (data || [])
        .filter((game: any) => game.release_date)
        .filter((game: any) => {
          const date = new Date(game.release_date);

          return (
            date >= windowStart &&
            date <= windowEnd
          );
        })
        .sort(
          (a: any, b: any) =>
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime()
        )
        .slice(0, 6);

      setGames(releaseGames);
    } catch (error) {
      console.error(
        "Failed to load new releases:",
        error
      );

      setGames([]);
    } finally {
      setLoading(false);
    }
  }

  const launchStats = useMemo(() => {
    const now = new Date();

    const upcoming = games.filter(
      (game) =>
        game.release_date &&
        new Date(game.release_date) > now
    ).length;

    const released = games.length - upcoming;

    return {
      total: games.length,
      upcoming,
      released,
    };
  }, [games]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">

      {/* =========================
          COMMAND HEADER
      ========================= */}

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

              <span className="pp-live-dot h-3 w-3 rounded-full bg-blue-400" />

              <p
                className="
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.35em]
                  text-blue-400
                "
              >
                Launch Intelligence
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
              New Releases
            </h2>

            <p className="mt-3 max-w-2xl text-slate-400">
              Track recently launched games and upcoming releases
              entering the PulsePlay gaming network.
            </p>

          </div>


          <div className="flex flex-wrap items-center gap-3">

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
                {launchStats.upcoming}
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
                {launchStats.released}
              </p>

              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                Released
              </p>

            </div>


            <Link to="/games">
              <BrandButton variant="secondary">
                Open Launch Database →
              </BrandButton>
            </Link>

          </div>

        </div>


        {/* STATUS BAR */}

        <div
          className="
            mt-8
            flex
            flex-wrap
            items-center
            gap-x-8
            gap-y-3
            border-t
            border-white/10
            pt-6
          "
        >

          <div className="flex items-center gap-2">

            <span className="h-2 w-2 rounded-full bg-blue-400" />

            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
              60 DAY RELEASE HISTORY
            </span>

          </div>


          <div className="flex items-center gap-2">

            <span className="h-2 w-2 rounded-full bg-cyan-400" />

            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
              90 DAY LAUNCH FORECAST
            </span>

          </div>


          <div className="flex items-center gap-2">

            <span className="h-2 w-2 rounded-full bg-green-400" />

            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-green-300">
              {launchStats.total} TRANSMISSIONS TRACKED
            </span>

          </div>

        </div>

      </BrandCard>


      {/* =========================
          LOADING
      ========================= */}

      {loading && (
        <BrandCard scan className="mt-8 p-8">

          <div className="flex items-center gap-4">

            <span className="pp-live-dot h-3 w-3 rounded-full bg-blue-400" />

            <div>

              <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">
                Launch Network
              </p>

              <h3 className="mt-2 text-2xl font-black uppercase text-white">
                SCANNING RELEASE PIPELINE...
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Checking recently released and upcoming game launches.
              </p>

            </div>

          </div>

        </BrandCard>
      )}


      {/* =========================
          EMPTY STATE
      ========================= */}

      {!loading && games.length === 0 && (
        <BrandCard className="mt-8 p-8">

          <div className="flex flex-col items-center justify-center gap-5 py-8 text-center">

            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                border
                border-blue-400/20
                bg-blue-400/5
                text-3xl
              "
            >
              🎮
            </div>

            <div>

              <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">
                LAUNCH PIPELINE CLEAR
              </p>

              <h3 className="mt-2 text-2xl font-black text-white">
                No Recent Launches Detected
              </h3>

              <p className="mx-auto mt-2 max-w-xl text-slate-400">
                Add upcoming or recently released games through
                the PulsePlay Admin Dashboard to populate this feed.
              </p>

            </div>

            <Link to="/games">
              <BrandButton>
                Browse All Games →
              </BrandButton>
            </Link>

          </div>

        </BrandCard>
      )}


      {/* =========================
          RELEASE GRID
      ========================= */}

      {!loading && games.length > 0 && (
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

            const isUpcoming =
              !!game.release_date &&
              new Date(game.release_date) > new Date();

            const daysUntil = game.release_date
              ? Math.ceil(
                  (
                    new Date(game.release_date).getTime() -
                    new Date().getTime()
                  ) /
                    (1000 * 60 * 60 * 24)
                )
              : null;

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
                  hover:border-blue-400/40
                  hover:shadow-[0_0_35px_rgba(59,130,246,.12)]
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
                      No Launch Image
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


                  {/* RELEASE INDEX */}

                  <div
                    className="
                      absolute
                      left-4
                      top-4
                      rounded-lg
                      border
                      border-blue-400/30
                      bg-black/75
                      px-3
                      py-1.5
                      backdrop-blur-md
                    "
                  >

                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-300">
                      LAUNCH {String(index + 1).padStart(2, "0")}
                    </span>

                  </div>


                  {/* STATUS */}

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
                      ${
                        isUpcoming
                          ? "border-blue-400/30 bg-blue-400/10 text-blue-300"
                          : "border-green-400/30 bg-green-400/10 text-green-300"
                      }
                    `}
                  >

                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">
                      {isUpcoming ? "INCOMING" : "RELEASED"}
                    </span>

                  </div>


                  {/* CATEGORY */}

                  {game.genre && (
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
                        {game.genre}
                      </span>

                    </div>
                  )}

                </div>


                {/* CONTENT */}

                <div className="flex flex-1 flex-col p-6">

                  <div className="flex items-center justify-between gap-3">

                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">
                      Launch Transmission
                    </p>

                    {isUpcoming && daysUntil !== null && (
                      <span className="text-[9px] font-black uppercase tracking-widest text-blue-300">
                        {daysUntil > 0
                          ? `${daysUntil} DAYS`
                          : "TODAY"}
                      </span>
                    )}

                  </div>


                  <h3
                    className="
                      mt-3
                      text-2xl
                      font-black
                      leading-tight
                      text-white
                      transition-colors
                      duration-300
                      group-hover:text-blue-300
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


                  {/* RELEASE DATA */}

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

                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">
                        Release Date
                      </p>

                      <p className="mt-1 text-sm font-bold text-white">
                        {game.release_date
                          ? new Date(
                              game.release_date
                            ).toLocaleDateString()
                          : "TBA"}
                      </p>

                    </div>


                    <div>

                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">
                        Platform
                      </p>

                      <p className="mt-1 truncate text-sm font-bold text-white">
                        {game.platform || "Multi-Platform"}
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
                        border-blue-500/30
                        bg-slate-950/80
                        px-6
                        py-3.5
                        text-xs
                        font-black
                        uppercase
                        tracking-[0.15em]
                        text-blue-300
                        shadow-[0_0_20px_rgba(59,130,246,.10)]
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-blue-400/60
                        hover:bg-blue-500/10
                        hover:text-white
                        active:scale-95
                      "
                    >
                      View Launch Intel

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
