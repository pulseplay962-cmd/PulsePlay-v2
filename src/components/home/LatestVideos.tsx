import { useEffect, useMemo, useState } from "react";

import BrandCard from "../ui/BrandCard";
import BrandButton from "../ui/BrandButton";

import {
  getVideos,
  type Video,
} from "../../services/videos";

export default function LatestVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVideos() {
      try {
        setLoading(true);

        const data = await getVideos();

        setVideos(data ?? []);
      } catch (error) {
        console.error(
          "LATEST VIDEOS ERROR:",
          error
        );

        setVideos([]);
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
  }, []);

  const visibleVideos = useMemo(
    () => videos.slice(0, 6),
    [videos]
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">

      {/* =========================
          BROADCAST ARCHIVE HEADER
      ========================= */}

      <BrandCard
        scan
        className="p-6 md:p-8 lg:p-10"
      >

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
                  tracking-[0.35em]
                  text-cyan-400
                "
              >
                PulsePlay Broadcast Network
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
              Latest Transmissions
            </h2>

            <p
              className="
                mt-3
                max-w-2xl
                text-slate-400
              "
            >
              Gameplay, streams, highlights, and
              community broadcasts captured across
              the PulsePlay network.
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
                {videos.length}
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
                Transmissions
              </p>

            </div>


            <a
              href="/streams"
              className="
                hidden
                sm:block
              "
            >
              <BrandButton variant="secondary">
                Broadcast Center →
              </BrandButton>
            </a>

          </div>

        </div>

      </BrandCard>


      {/* =========================
          LOADING STATE
      ========================= */}

      {loading && (

        <div className="mt-8">

          <BrandCard
            scan
            className="p-8"
          >

            <div className="flex items-center gap-4">

              <span
                className="
                  pp-live-dot
                  h-3
                  w-3
                  rounded-full
                  bg-cyan-400
                "
              />

              <div>

                <p
                  className="
                    text-xs
                    font-black
                    uppercase
                    tracking-[0.3em]
                    text-cyan-400
                  "
                >
                  Broadcast Network
                </p>

                <h3
                  className="
                    mt-2
                    text-2xl
                    font-black
                    uppercase
                    text-white
                  "
                >
                  Scanning Transmissions...
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    text-slate-500
                  "
                >
                  Establishing connection to the latest
                  PulsePlay video archive.
                </p>

              </div>

            </div>

          </BrandCard>

        </div>

      )}


      {/* =========================
          EMPTY STATE
      ========================= */}

      {!loading && videos.length === 0 && (

        <div className="mt-8">

          <BrandCard className="p-8 md:p-10">

            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                py-8
                text-center
              "
            >

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-cyan-500/20
                  bg-cyan-500/5
                  text-3xl
                "
              >
                📡
              </div>

              <p
                className="
                  mt-6
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.3em]
                  text-cyan-400
                "
              >
                Broadcast Archive Standby
              </p>

              <h3
                className="
                  mt-3
                  text-2xl
                  font-black
                  text-white
                "
              >
                No Transmissions Available
              </h3>

              <p
                className="
                  mt-3
                  max-w-xl
                  text-slate-400
                "
              >
                Video transmissions will appear here when
                they are uploaded through the PulsePlay
                Admin Dashboard.
              </p>

            </div>

          </BrandCard>

        </div>

      )}


      {/* =========================
          TRANSMISSION GRID
      ========================= */}

      {!loading && visibleVideos.length > 0 && (

        <div
          className="
            mt-8
            grid
            gap-6
            md:grid-cols-2
            lg:grid-cols-3
          "
        >

          {visibleVideos.map((video, index) => (

            <BrandCard
              key={video.id}
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
                hover:shadow-[0_0_35px_rgba(34,211,238,.12)]
              "
            >

              {/* =========================
                  THUMBNAIL
              ========================= */}

              <div
                className="
                  relative
                  overflow-hidden
                  border-b
                  border-white/10
                  bg-black
                "
              >

                {video.thumbnail ? (

                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="
                      h-56
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
                      h-56
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
                    No Transmission Image
                  </div>

                )}


                {/* THUMBNAIL OVERLAY */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/90
                    via-black/20
                    to-transparent
                  "
                />


                {/* INDEX */}

                <div
                  className="
                    absolute
                    left-4
                    top-4
                    rounded-lg
                    border
                    border-cyan-400/20
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
                    TX-{String(index + 1).padStart(2, "0")}
                  </span>

                </div>


                {/* PLATFORM */}

                {video.platform && (

                  <div
                    className="
                      absolute
                      right-4
                      top-4
                      rounded-lg
                      border
                      border-purple-400/20
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
                        text-purple-300
                      "
                    >
                      {video.platform}
                    </span>

                  </div>

                )}


                {/* WATCH INDICATOR */}

                <div
                  className="
                    absolute
                    bottom-4
                    left-4
                    flex
                    items-center
                    gap-2
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.2em]
                    text-white
                  "
                >

                  <span
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-cyan-400/30
                      bg-black/70
                      text-cyan-300
                      backdrop-blur-md
                    "
                  >
                    ▶
                  </span>

                  WATCH TRANSMISSION

                </div>

              </div>


              {/* =========================
                  CONTENT
              ========================= */}

              <div
                className="
                  flex
                  flex-1
                  flex-col
                  p-6
                "
              >

                <div className="flex items-center gap-3">

                  <span
                    className="
                      h-2
                      w-2
                      rounded-full
                      bg-cyan-400
                    "
                  />

                  <p
                    className="
                      text-[9px]
                      font-black
                      uppercase
                      tracking-[0.3em]
                      text-slate-500
                    "
                  >
                    Broadcast Transmission
                  </p>

                </div>


                <h3
                  className="
                    mt-3
                    line-clamp-2
                    text-xl
                    font-black
                    leading-tight
                    text-white
                    transition-colors
                    duration-300
                    group-hover:text-cyan-300
                  "
                >
                  {video.title}
                </h3>


                {video.description && (

                  <p
                    className="
                      mt-3
                      line-clamp-3
                      text-sm
                      leading-relaxed
                      text-slate-400
                    "
                  >
                    {video.description}
                  </p>

                )}


                {/* CTA */}

                {video.url && (

                  <div className="mt-auto pt-6">

                    <a
                      href={video.url}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        group/cta
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-cyan-500/30
                        bg-slate-950/70
                        px-5
                        py-3
                        text-xs
                        font-black
                        uppercase
                        tracking-[0.15em]
                        text-cyan-300
                        shadow-[0_0_20px_rgba(34,211,238,.10)]
                        transition-all
                        duration-300
                        hover:border-cyan-400/60
                        hover:bg-cyan-500/10
                        hover:text-cyan-200
                      "
                    >

                      Watch Now

                      <span
                        className="
                          transition-transform
                          group-hover/cta:translate-x-1
                        "
                      >
                        →
                      </span>

                    </a>

                  </div>

                )}

              </div>

            </BrandCard>

          ))}

        </div>

      )}


      {/* MOBILE / ARCHIVE CTA */}

      {!loading && videos.length > 0 && (

        <div
          className="
            mt-8
            flex
            justify-center
            sm:hidden
          "
        >

          <a href="/streams">

            <BrandButton variant="secondary">
              Broadcast Center →
            </BrandButton>

          </a>

        </div>

      )}

    </section>
  );
}
