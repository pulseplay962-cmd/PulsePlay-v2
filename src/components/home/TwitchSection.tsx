import { useEffect, useState } from "react";

import BrandButton from "../ui/BrandButton";
import BrandCard from "../ui/BrandCard";
import { getTwitchStatus } from "../../services/twitch";

type TwitchSectionProps = {
  channel?: string;
};

type StreamData = {
  title: string;
  game_name: string;
  viewer_count: number;
};

export default function TwitchSection({
  channel = "Veiltactician",
}: TwitchSectionProps) {
  const [stream, setStream] = useState<StreamData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkStream() {
      try {
        setLoading(true);

        const data = await getTwitchStatus(channel);

        setStream(data.stream);
      } catch (error) {
        console.error(
          "Failed to load Twitch status:",
          error
        );

        setStream(null);
      } finally {
        setLoading(false);
      }
    }

    checkStream();
  }, [channel]);

  const parent = window.location.hostname;

  const twitchUrl = `https://www.twitch.tv/${channel}`;

  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-28">

      {/* ======================================
          LIVE COMMAND CENTER ENERGY
      ======================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          -z-20
          bg-gradient-to-r
          from-red-500/10
          via-purple-500/10
          to-cyan-500/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          pp-scan
          opacity-20
        "
      />

      <div className="mx-auto max-w-7xl">

        {/* ======================================
            COMMAND HEADER
        ======================================= */}

        <div className="mb-10">

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

            <div>

              <div className="flex items-center gap-3">

                <span
                  className={`
                    h-3
                    w-3
                    rounded-full
                    ${
                      stream
                        ? "bg-red-500 pp-live-dot"
                        : loading
                          ? "bg-yellow-400 animate-pulse"
                          : "bg-slate-600"
                    }
                  `}
                />

                <p
                  className={`
                    text-xs
                    font-black
                    uppercase
                    tracking-[0.35em]
                    ${
                      stream
                        ? "text-red-400"
                        : loading
                          ? "text-yellow-400"
                          : "text-slate-500"
                    }
                  `}
                >
                  {loading
                    ? "TRANSMISSION CHECK"
                    : stream
                      ? "LIVE TRANSMISSION"
                      : "TRANSMISSION STANDBY"}
                </p>

              </div>

              <h2
                className="
                  mt-4
                  text-4xl
                  font-black
                  pp-gradient-text
                  md:text-6xl
                "
              >
                LIVE COMMAND CENTER
              </h2>

              <p
                className="
                  mt-4
                  max-w-3xl
                  text-base
                  leading-7
                  text-slate-400
                  md:text-lg
                "
              >
                Enter the PulsePlay broadcast network and watch
                the latest gaming transmission from {channel}.
              </p>

            </div>

            <a
              href={twitchUrl}
              target="_blank"
              rel="noreferrer"
              className="shrink-0"
            >
              <BrandButton variant="outline">
                🎙️ Twitch Channel
              </BrandButton>
            </a>

          </div>

        </div>

        {/* ======================================
            LIVE STATUS HUD
        ======================================= */}

        <BrandCard
          scan={Boolean(stream)}
          status={
            loading
              ? "CHECKING TRANSMISSION"
              : stream
                ? "LIVE TRANSMISSION"
                : "SYSTEM STANDBY"
          }
          className={`
            mb-8
            p-6
            md:p-8
            ${
              stream
                ? "border-red-500/30"
                : "border-white/10"
            }
          `}
        >

          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">

            <div>

              <div className="flex flex-wrap items-center gap-3">

                <span
                  className={`
                    rounded-full
                    border
                    px-3
                    py-1
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.2em]
                    ${
                      stream
                        ? "border-red-500/40 bg-red-500/10 text-red-300"
                        : "border-slate-500/30 bg-slate-500/10 text-slate-400"
                    }
                  `}
                >
                  {loading
                    ? "Checking"
                    : stream
                      ? "Live"
                      : "Offline"}
                </span>

                <span
                  className="
                    text-xs
                    font-black
                    uppercase
                    tracking-widest
                    text-slate-500
                  "
                >
                  @{channel}
                </span>

              </div>

              {stream ? (
                <>
                  <h3
                    className="
                      mt-4
                      text-2xl
                      font-black
                      text-white
                      md:text-3xl
                    "
                  >
                    {stream.title}
                  </h3>

                  <div
                    className="
                      mt-4
                      flex
                      flex-wrap
                      gap-3
                    "
                  >

                    <span
                      className="
                        rounded-lg
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
                      🎮 {stream.game_name}
                    </span>

                    <span
                      className="
                        rounded-lg
                        border
                        border-cyan-500/30
                        bg-cyan-500/10
                        px-4
                        py-2
                        text-sm
                        font-bold
                        text-cyan-300
                      "
                    >
                      👀 {stream.viewer_count.toLocaleString()} viewers
                    </span>

                  </div>
                </>
              ) : (
                <>

                  <h3
                    className="
                      mt-4
                      text-2xl
                      font-black
                      text-white
                      md:text-3xl
                    "
                  >
                    {loading
                      ? "Establishing transmission..."
                      : "The broadcast is currently offline."}
                  </h3>

                  <p
                    className="
                      mt-3
                      max-w-2xl
                      text-sm
                      leading-7
                      text-slate-400
                    "
                  >
                    {loading
                      ? "PulsePlay is checking the Twitch network for an active broadcast."
                      : "Check back when the next PulsePlay transmission begins, or visit the Twitch channel for the latest activity."}
                  </p>

                </>
              )}

            </div>

            <div className="flex shrink-0 md:justify-end">

              <a
                href={twitchUrl}
                target="_blank"
                rel="noreferrer"
              >
                <BrandButton variant="secondary">
                  {stream
                    ? "Watch on Twitch"
                    : "Visit Twitch"}
                </BrandButton>
              </a>

            </div>

          </div>

        </BrandCard>

        {/* ======================================
            BROADCAST GRID
        ======================================= */}

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

          {/* ======================================
              STREAM PLAYER
          ======================================= */}

          <BrandCard
            hover={false}
            hud={false}
            className="
              overflow-hidden
              border-cyan-500/30
              bg-black
              p-2
              md:p-3
            "
          >

            <div
              className="
                mb-2
                flex
                items-center
                justify-between
                px-3
                py-2
              "
            >

              <div className="flex items-center gap-2">

                <span
                  className={`
                    h-2
                    w-2
                    rounded-full
                    ${
                      stream
                        ? "bg-red-500 pp-live-dot"
                        : "bg-slate-600"
                    }
                  `}
                />

                <span
                  className="
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.25em]
                    text-slate-500
                  "
                >
                  BROADCAST FEED
                </span>

              </div>

              <span
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-widest
                  text-cyan-500/70
                "
              >
                {stream ? "LIVE" : "STANDBY"}
              </span>

            </div>

            <div className="overflow-hidden rounded-2xl bg-black">

              <iframe
                src={`https://player.twitch.tv/?channel=${channel}&parent=${parent}`}
                height="600"
                width="100%"
                allowFullScreen
                scrolling="no"
                title="PulsePlay Twitch Stream"
                className="
                  aspect-video
                  min-h-[320px]
                  w-full
                  md:min-h-[500px]
                "
              />

            </div>

          </BrandCard>

          {/* ======================================
              CHAT
          ======================================= */}

          <BrandCard
            hover={false}
            hud={false}
            className="
              overflow-hidden
              border-purple-500/30
              bg-black
              p-2
              md:p-3
            "
          >

            <div
              className="
                mb-2
                flex
                items-center
                justify-between
                px-3
                py-2
              "
            >

              <div className="flex items-center gap-2">

                <span
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-purple-400
                  "
                />

                <span
                  className="
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.25em]
                    text-slate-500
                  "
                >
                  COMMUNITY CHAT
                </span>

              </div>

              <span
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-widest
                  text-purple-400/70
                "
              >
                LIVE CHAT
              </span>

            </div>

            <div className="overflow-hidden rounded-2xl bg-black">

              <iframe
                src={`https://www.twitch.tv/embed/${channel}/chat?parent=${parent}`}
                height="600"
                width="100%"
                scrolling="no"
                title="PulsePlay Twitch Chat"
                className="
                  min-h-[500px]
                  w-full
                  md:min-h-[600px]
                "
              />

            </div>

          </BrandCard>

        </div>

        {/* ======================================
            BROADCAST FOOTER
        ======================================= */}

        <div
          className="
            mt-8
            grid
            gap-4
            sm:grid-cols-3
          "
        >

          <div
            className="
              rounded-xl
              border
              border-cyan-500/20
              bg-cyan-500/5
              p-4
              text-center
            "
          >

            <p
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.25em]
                text-cyan-400
              "
            >
              CHANNEL
            </p>

            <p className="mt-2 font-black text-white">
              @{channel}
            </p>

          </div>

          <div
            className="
              rounded-xl
              border
              border-purple-500/20
              bg-purple-500/5
              p-4
              text-center
            "
          >

            <p
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.25em]
                text-purple-400
              "
            >
              NETWORK
            </p>

            <p className="mt-2 font-black text-white">
              PULSEPLAY LIVE
            </p>

          </div>

          <div
            className="
              rounded-xl
              border
              border-red-500/20
              bg-red-500/5
              p-4
              text-center
            "
          >

            <p
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.25em]
                text-red-400
              "
            >
              STATUS
            </p>

            <p className="mt-2 font-black text-white">
              {loading
                ? "CHECKING"
                : stream
                  ? "LIVE"
                  : "OFFLINE"}
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}
