import { useState } from "react";

import {
  submitCommunitySignup,
} from "../../services/communitySignup";

import BrandButton from "../ui/BrandButton";

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
        "🎮 CONNECTION ESTABLISHED — Welcome to the PulsePlay Network!"
      );

      setName("");
      setEmail("");
      setDiscord("");
    } catch (error: any) {
      console.error("Signup failed:", error);

      setMessage(
        error?.message ||
          "CONNECTION FAILED — Please try again."
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
        border-cyan-400/20
        bg-gradient-to-br
        from-[#050811]
        via-[#09101d]
        to-purple-950/30
        p-6
        shadow-[0_0_70px_rgba(34,211,238,.08)]
        md:p-10
        lg:p-12
      "
    >
      {/* =========================
          AMBIENT SYSTEM EFFECTS
      ========================= */}

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          -top-32
          h-80
          w-80
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -left-32
          h-80
          w-80
          rounded-full
          bg-purple-500/10
          blur-3xl
        "
      />

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
          opacity-80
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-purple-500
          to-transparent
          opacity-50
        "
      />

      {/* =========================
          MAIN NETWORK GRID
      ========================= */}

      <div
        className="
          relative
          z-10
          grid
          gap-10
          lg:grid-cols-[1fr_1.1fr]
          lg:items-center
        "
      >

        {/* =========================
            NETWORK INFORMATION
        ========================= */}

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
              Player Network
            </p>

            <span className="text-xs text-slate-700">
              //
            </span>

            <span
              className="
                text-[10px]
                font-black
                uppercase
                tracking-widest
                text-green-400
              "
            >
              ONLINE
            </span>

          </div>


          <h2
            className="
              mt-5
              text-4xl
              font-black
              uppercase
              leading-[1.05]
              text-white
              md:text-5xl
              lg:text-6xl
            "
          >
            Enter The

            <span className="block pp-gradient-text">
              PulsePlay Network
            </span>
          </h2>


          <p
            className="
              mt-6
              max-w-xl
              text-base
              leading-7
              text-slate-400
              md:text-lg
            "
          >
            Connect to the PulsePlay gaming network
            and stay locked into the broadcasts,
            intelligence, releases, events, and
            community activity shaping the next mission.
          </p>


          {/* NETWORK CAPABILITIES */}

          <div className="mt-8 grid gap-3 sm:grid-cols-2">

            <div
              className="
                group
                rounded-2xl
                border
                border-cyan-400/10
                bg-black/30
                p-4
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-cyan-400/30
                hover:bg-cyan-400/5
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
                01 // STREAM ALERTS
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Know when the next PulsePlay broadcast
                goes live.
              </p>
            </div>


            <div
              className="
                group
                rounded-2xl
                border
                border-purple-400/10
                bg-black/30
                p-4
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-purple-400/30
                hover:bg-purple-400/5
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
                02 // GAMING INTEL
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Stay ahead of gaming news and industry
                developments.
              </p>
            </div>


            <div
              className="
                group
                rounded-2xl
                border
                border-pink-400/10
                bg-black/30
                p-4
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-pink-400/30
                hover:bg-pink-400/5
              "
            >
              <p
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.25em]
                  text-pink-400
                "
              >
                03 // EVENTS
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Keep connected with community activity
                and gaming events.
              </p>
            </div>


            <div
              className="
                group
                rounded-2xl
                border
                border-cyan-300/10
                bg-black/30
                p-4
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-cyan-300/30
                hover:bg-cyan-300/5
              "
            >
              <p
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.25em]
                  text-cyan-300
                "
              >
                04 // DROPS
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Get notified about new releases and
                merchandise drops.
              </p>
            </div>

          </div>


          {/* NETWORK STATUS */}

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


        {/* =========================
            PLAYER REGISTRATION
        ========================= */}

        <div
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-black/40
            p-6
            shadow-[0_0_40px_rgba(0,0,0,.25)]
            backdrop-blur-xl
            md:p-8
          "
        >

          {/* TERMINAL HEADER */}

          <div
            className="
              mb-7
              flex
              items-start
              justify-between
              border-b
              border-white/10
              pb-5
            "
          >

            <div>

              <div className="flex items-center gap-2">

                <span
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-cyan-400
                    shadow-[0_0_12px_rgba(34,211,238,.8)]
                  "
                />

                <p
                  className="
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.3em]
                    text-cyan-400
                  "
                >
                  Network Terminal
                </p>

              </div>

              <h3
                className="
                  mt-2
                  text-2xl
                  font-black
                  uppercase
                  text-white
                "
              >
                Establish Connection
              </h3>

            </div>


            <span
              className="
                rounded-lg
                border
                border-green-500/20
                bg-green-500/5
                px-3
                py-1
                text-[9px]
                font-black
                uppercase
                tracking-widest
                text-green-400
              "
            >
              SECURE
            </span>

          </div>


          <form
            onSubmit={submit}
            className="space-y-4"
          >

            {/* PLAYER NAME */}

            <div>

              <label
                className="
                  mb-2
                  block
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.25em]
                  text-slate-500
                "
              >
                Player Identity
              </label>

              <input
                type="text"
                required
                placeholder="PLAYER NAME"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-black/50
                  p-4
                  text-white
                  outline-none
                  transition-all
                  placeholder:text-slate-700
                  focus:border-cyan-400/50
                  focus:bg-cyan-400/5
                  focus:ring-1
                  focus:ring-cyan-400/30
                "
              />

            </div>


            {/* EMAIL */}

            <div>

              <label
                className="
                  mb-2
                  block
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.25em]
                  text-slate-500
                "
              >
                Communication Channel
              </label>

              <input
                type="email"
                required
                placeholder="EMAIL ADDRESS"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-black/50
                  p-4
                  text-white
                  outline-none
                  transition-all
                  placeholder:text-slate-700
                  focus:border-cyan-400/50
                  focus:bg-cyan-400/5
                  focus:ring-1
                  focus:ring-cyan-400/30
                "
              />

            </div>


            {/* DISCORD */}

            <div>

              <label
                className="
                  mb-2
                  block
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.25em]
                  text-slate-500
                "
              >
                Community Link
              </label>

              <input
                type="text"
                placeholder="DISCORD USERNAME (OPTIONAL)"
                value={discord}
                onChange={(e) =>
                  setDiscord(e.target.value)
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-black/50
                  p-4
                  text-white
                  outline-none
                  transition-all
                  placeholder:text-slate-700
                  focus:border-purple-400/50
                  focus:bg-purple-400/5
                  focus:ring-1
                  focus:ring-purple-400/30
                "
              />

            </div>


            {/* CONNECTION BUTTON */}

            <div className="pt-2">

              <BrandButton
                type="submit"
                disabled={loading}
                className="w-full py-4"
              >
                {loading
                  ? "CONNECTING..."
                  : "🚀 JOIN PLAYER NETWORK"}
              </BrandButton>

            </div>


            {/* STATUS MESSAGE */}

            {message && (
              <div
                className="
                  rounded-xl
                  border
                  border-cyan-400/20
                  bg-cyan-400/5
                  p-4
                  text-center
                  text-sm
                  font-bold
                  leading-relaxed
                  text-cyan-300
                "
              >
                {message}
              </div>
            )}

          </form>


          {/* TERMINAL FOOTER */}

          <div
            className="
              mt-6
              flex
              items-center
              justify-between
              border-t
              border-white/5
              pt-4
              text-[9px]
              font-black
              uppercase
              tracking-[0.2em]
              text-slate-600
            "
          >
            <span>
              PULSEPLAY // PLAYER ACCESS
            </span>

            <span>
              ENCRYPTED
            </span>
          </div>

        </div>

      </div>

    </section>
  );
}
