import { useState } from "react";

import {
  submitCommunitySignup,
} from "../../services/communitySignup";

export default function SignupPanel() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [discord, setDiscord] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      await submitCommunitySignup({
        name,
        email,
        discord,
      });

      setMessage(
        "🎮 Welcome to the PulsePlay Network!"
      );

      setName("");
      setEmail("");
      setDiscord("");
    } catch (error: any) {
      console.error(
        "Signup failed:",
        error
      );

      setMessage(
        error?.message ||
          "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-cyan-500/20
        bg-gradient-to-br
        from-[#070b14]
        via-[#0b1120]
        to-cyan-950/30
        p-8
        shadow-[0_0_50px_rgba(34,211,238,.08)]
        md:p-12
      "
    >
      {/* Ambient glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          -left-24
          h-64
          w-64
          rounded-full
          bg-purple-500/10
          blur-3xl
        "
      />

      {/* Top scan line */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-cyan-400
          to-transparent
          opacity-70
        "
      />

      <div
        className="
          relative
          z-10
          grid
          gap-10
          lg:grid-cols-[1fr_1.15fr]
          lg:items-center
        "
      >
        {/* INFORMATION */}

        <div>
          <div className="flex items-center gap-3">
            <span
              className="
                h-2.5
                w-2.5
                rounded-full
                bg-cyan-400
                shadow-[0_0_14px_rgba(34,211,238,.8)]
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
              Network Access
            </p>
          </div>

          <h2
            className="
              mt-4
              text-4xl
              font-black
              uppercase
              leading-tight
              text-white
              md:text-5xl
            "
          >
            Join The
            <span className="block pp-gradient-text">
              PulsePlay Network
            </span>
          </h2>

          <p
            className="
              mt-5
              max-w-xl
              text-base
              leading-7
              text-slate-400
              md:text-lg
            "
          >
            Get connected to the PulsePlay gaming
            network for stream alerts, gaming news,
            community events, new releases, and
            merchandise drops.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div
              className="
                rounded-xl
                border
                border-white/10
                bg-black/20
                p-4
              "
            >
              <p
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-widest
                  text-cyan-400
                "
              >
                STREAM ALERTS
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Know when the next broadcast goes live.
              </p>
            </div>

            <div
              className="
                rounded-xl
                border
                border-white/10
                bg-black/20
                p-4
              "
            >
              <p
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-widest
                  text-purple-400
                "
              >
                COMMUNITY INTEL
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Stay connected with what's happening.
              </p>
            </div>
          </div>

          <div
            className="
              mt-7
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-green-500/20
              bg-green-500/5
              px-4
              py-2
              text-xs
              font-black
              uppercase
              tracking-widest
              text-green-400
            "
          >
            <span className="pp-live-dot h-2 w-2 rounded-full bg-green-400" />
            NETWORK ACCEPTING PLAYERS
          </div>
        </div>

        {/* SIGNUP TERMINAL */}

        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-black/30
            p-6
            backdrop-blur-xl
            md:p-8
          "
        >
          <div
            className="
              mb-6
              flex
              items-center
              justify-between
              border-b
              border-white/10
              pb-4
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.3em]
                  text-slate-500
                "
              >
                Player Registration
              </p>

              <h3 className="mt-1 text-xl font-black text-white">
                Establish Connection
              </h3>
            </div>

            <span
              className="
                rounded-lg
                border
                border-cyan-500/20
                bg-cyan-500/5
                px-3
                py-1
                text-[10px]
                font-black
                tracking-widest
                text-cyan-300
              "
            >
              SECURE
            </span>
          </div>

          <form
            onSubmit={submit}
            className="space-y-4"
          >
            <input
              type="text"
              required
              placeholder="Player Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-black/40
                p-4
                text-white
                outline-none
                transition
                placeholder:text-slate-600
                focus:border-cyan-400/50
                focus:ring-1
                focus:ring-cyan-400/30
              "
            />

            <input
              type="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-black/40
                p-4
                text-white
                outline-none
                transition
                placeholder:text-slate-600
                focus:border-cyan-400/50
                focus:ring-1
                focus:ring-cyan-400/30
              "
            />

            <input
              type="text"
              placeholder="Discord Username (Optional)"
              value={discord}
              onChange={(e) =>
                setDiscord(e.target.value)
              }
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-black/40
                p-4
                text-white
                outline-none
                transition
                placeholder:text-slate-600
                focus:border-purple-400/50
                focus:ring-1
                focus:ring-purple-400/30
              "
            />

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                rounded-xl
                border
                border-cyan-400/30
                bg-gradient-to-r
                from-cyan-500/20
                to-purple-500/20
                px-6
                py-4
                font-black
                uppercase
                tracking-wider
                text-cyan-200
                shadow-[0_0_25px_rgba(34,211,238,.08)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-cyan-300/50
                hover:bg-cyan-500/20
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading
                ? "CONNECTING..."
                : "🚀 JOIN COMMUNITY"}
            </button>

            {message && (
              <div
                className="
                  rounded-xl
                  border
                  border-cyan-500/20
                  bg-cyan-500/5
                  p-4
                  text-center
                  text-sm
                  font-bold
                  text-cyan-300
                "
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
