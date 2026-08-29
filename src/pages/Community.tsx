import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";

import { getNews } from "../services/news";
import { submitCommunitySignup } from "../services/communitySignup";

import { supabase } from "../lib/supabase";

type Article = {
  id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  featured: boolean;
};

const networkSystems = [
  {
    icon: "🎮",
    title: "PLAYER NETWORK",
    status: "ACTIVE",
    description:
      "Connect with players discovering games, following broadcasts, and building the PulsePlay community.",
    accent: "cyan",
  },
  {
    icon: "📡",
    title: "BROADCAST NETWORK",
    status: "ONLINE",
    description:
      "Follow live gameplay, creator broadcasts, stream alerts, and the latest PulsePlay transmissions.",
    accent: "purple",
  },
  {
    icon: "📰",
    title: "INTELLIGENCE FEED",
    status: "LIVE",
    description:
      "Stay informed with gaming news, updates, releases, and stories moving through the network.",
    accent: "pink",
  },
];

const quickLinks = [
  {
    icon: "🎮",
    title: "Explore Games",
    description: "Browse the PulsePlay game database.",
    to: "/games",
  },
  {
    icon: "📡",
    title: "Watch Streams",
    description: "Enter the live broadcast network.",
    to: "/streams",
  },
  {
    icon: "📰",
    title: "Gaming News",
    description: "Read the latest gaming intelligence.",
    to: "/news",
  },
  {
    icon: "💡",
    title: "Send Feedback",
    description: "Help shape the PulsePlay network.",
    to: "/feedback",
  },
];

export default function Community() {
  const [news, setNews] = useState<Article[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [discord, setDiscord] = useState("");

  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "success" | "error" | ""
  >("");

  useEffect(() => {
    async function checkSession() {
      try {
        const result = await supabase.auth.getSession();

        console.log("🔐 SUPABASE SESSION CHECK:", result);
      } catch (error) {
        console.error("Supabase session check failed:", error);
      }
    }

    checkSession();
  }, []);

  useEffect(() => {
    async function loadNews() {
      try {
        const data = await getNews();

        setNews(
          (data || [])
            .filter((article) => article.featured)
            .slice(0, 3)
        );
      } catch (error) {
        console.error(
          "Failed loading community intelligence:",
          error
        );
      }
    }

    loadNews();
  }, []);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setMessageType("error");
      setMessage(
        "Please enter your player name and email."
      );
      return;
    }

    setSending(true);
    setMessage("");
    setMessageType("");

    try {
      await submitCommunitySignup({
        name: name.trim(),
        email: email.trim(),
        discord: discord.trim(),
      });

      setMessageType("success");
      setMessage(
        "🎮 Welcome to the PulsePlay Player Network!"
      );

      setName("");
      setEmail("");
      setDiscord("");
    } catch (error: any) {
      console.error(
        "❌ COMMUNITY SIGNUP ERROR",
        error
      );

      setMessageType("error");
      setMessage(
        error?.message ||
          "Unable to join the network. Please try again."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-[72vh] px-6 py-12">
      <div className="mx-auto max-w-7xl">

        {/* =====================================
            NETWORK HERO
        ====================================== */}

        <section
          className="
            relative
            mb-14
            overflow-hidden
            rounded-[2rem]
            border
            border-cyan-500/20
            bg-gradient-to-br
            from-cyan-950/40
            via-[#070b16]
            to-purple-950/40
            p-8
            shadow-[0_0_70px_rgba(34,211,238,.08)]
            md:p-12
          "
        >
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="relative">

            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

              <div className="max-w-4xl">

                <div
                  className="
                    inline-flex
                    items-center
                    gap-3
                    rounded-full
                    border
                    border-cyan-400/20
                    bg-cyan-500/5
                    px-5
                    py-2
                  "
                >
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400 shadow-[0_0_15px_#22c55e]" />

                  <span className="text-xs font-black uppercase tracking-[0.35em] text-cyan-300">
                    Player Network Online
                  </span>
                </div>

                <p className="mt-8 text-xs font-black uppercase tracking-[0.45em] text-purple-400">
                  PulsePlay Community Command
                </p>

                <h1
                  className="
                    mt-4
                    text-5xl
                    font-black
                    leading-none
                    pp-gradient-text
                    md:text-7xl
                  "
                >
                  PLAYER
                  <br />
                  NETWORK
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                  Connect with players, creators, broadcasts, and gaming
                  intelligence across the PulsePlay network.
                </p>

              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-green-500/20
                  bg-black/20
                  p-5
                  backdrop-blur-sm
                  lg:min-w-[280px]
                "
              >
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Network Status
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <span className="h-3 w-3 animate-pulse rounded-full bg-green-400 shadow-[0_0_15px_#22c55e]" />

                  <span className="text-xl font-black text-green-300">
                    ACTIVE
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  Player connections and community transmissions are
                  currently operational.
                </p>
              </div>

            </div>

            {/* NETWORK METRICS */}

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Community
                </p>

                <p className="mt-2 text-2xl font-black text-cyan-300">
                  ACTIVE
                </p>
              </div>

              <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Players
                </p>

                <p className="mt-2 text-2xl font-black text-purple-300">
                  ONLINE
                </p>
              </div>

              <div className="rounded-2xl border border-pink-500/20 bg-pink-500/5 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Intelligence
                </p>

                <p className="mt-2 text-2xl font-black text-pink-300">
                  LIVE
                </p>
              </div>

              <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Growth
                </p>

                <p className="mt-2 text-2xl font-black text-green-300">
                  XP+
                </p>
              </div>

            </div>

          </div>
        </section>


        {/* =====================================
            NETWORK SYSTEMS
        ====================================== */}

        <section className="mb-14">

          <div className="mb-8">

            <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400">
              Network Infrastructure
            </p>

            <h2 className="mt-3 text-4xl font-black pp-gradient-text md:text-5xl">
              Community Systems
            </h2>

            <p className="mt-4 max-w-3xl text-slate-400">
              Everything connecting PulsePlay players, creators, broadcasts,
              and gaming intelligence.
            </p>

          </div>

          <div className="grid gap-6 lg:grid-cols-3">

            {networkSystems.map((system) => (
              <BrandCard
                key={system.title}
                status={system.title}
                hover
                className="group h-full"
              >

                <div className="flex items-center justify-between">

                  <span className="text-4xl">
                    {system.icon}
                  </span>

                  <span
                    className={`
                      text-[10px]
                      font-black
                      uppercase
                      tracking-widest
                      ${
                        system.accent === "purple"
                          ? "text-purple-400"
                          : system.accent === "pink"
                            ? "text-pink-400"
                            : "text-cyan-400"
                      }
                    `}
                  >
                    {system.status}
                  </span>

                </div>

                <h3 className="mt-7 text-2xl font-black text-white">
                  {system.title}
                </h3>

                <p className="mt-4 leading-relaxed text-slate-400">
                  {system.description}
                </p>

              </BrandCard>
            ))}

          </div>

        </section>


        {/* =====================================
            COMMUNITY INTELLIGENCE
        ====================================== */}

        {news.length > 0 && (
          <section className="mb-14">

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <p className="text-xs font-black uppercase tracking-[0.4em] text-purple-400">
                  Community Intelligence
                </p>

                <h2 className="mt-3 text-4xl font-black pp-gradient-text md:text-5xl">
                  Featured Transmissions
                </h2>

                <p className="mt-4 max-w-3xl text-slate-400">
                  The latest stories and gaming intelligence selected for
                  the PulsePlay community.
                </p>

              </div>

              <Link
                to="/news"
                className="
                  shrink-0
                  text-sm
                  font-black
                  uppercase
                  tracking-widest
                  text-cyan-400
                  transition
                  hover:text-cyan-300
                "
              >
                View All News →
              </Link>

            </div>

            <div className="grid gap-6 md:grid-cols-3">

              {news.map((article) => (
                <Link
                  key={article.id}
                  to={`/news/${article.id}`}
                  className="group"
                >

                  <BrandCard
                    status={article.category}
                    hover
                    className="h-full overflow-hidden p-0"
                  >

                    {article.image ? (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="
                          h-52
                          w-full
                          object-cover
                          transition
                          duration-500
                          group-hover:scale-105
                        "
                      />
                    ) : (
                      <div className="flex h-52 items-center justify-center bg-black/30 text-xs font-black uppercase tracking-widest text-slate-600">
                        No Transmission Image
                      </div>
                    )}

                    <div className="p-6">

                      <p className="text-xs font-black uppercase tracking-widest text-purple-400">
                        {article.category}
                      </p>

                      <h3 className="mt-3 text-2xl font-black text-white transition group-hover:text-cyan-300">
                        {article.title}
                      </h3>

                      <p className="mt-5 text-sm font-black uppercase tracking-widest text-cyan-400">
                        Read Transmission →
                      </p>

                    </div>

                  </BrandCard>

                </Link>
              ))}

            </div>

          </section>
        )}


        {/* =====================================
            QUICK ACCESS
        ====================================== */}

        <section className="mb-14">

          <div className="mb-8 text-center">

            <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400">
              Network Access
            </p>

            <h2 className="mt-3 text-4xl font-black pp-gradient-text md:text-5xl">
              Quick Access
            </h2>

          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {quickLinks.map((item) => (
              <Link
                key={item.title}
                to={item.to}
                className="group"
              >

                <BrandCard
                  status="ACCESS"
                  hover
                  className="h-full"
                >

                  <span className="text-3xl">
                    {item.icon}
                  </span>

                  <h3 className="mt-5 text-xl font-black text-white transition group-hover:text-cyan-300">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {item.description}
                  </p>

                  <p className="mt-5 text-xs font-black uppercase tracking-widest text-cyan-400">
                    Open Channel →
                  </p>

                </BrandCard>

              </Link>
            ))}

          </div>

        </section>


        {/* =====================================
            JOIN TERMINAL
        ====================================== */}

        <section className="mb-14">

          <BrandCard
            status="PLAYER REGISTRATION"
            className="
              overflow-hidden
              border-cyan-500/20
              p-0
            "
          >

            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">

              <div
                className="
                  bg-gradient-to-br
                  from-purple-950/40
                  via-black/20
                  to-cyan-950/30
                  p-8
                  md:p-10
                  lg:p-12
                "
              >

                <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400">
                  Player Registration Terminal
                </p>

                <h2 className="mt-5 text-4xl font-black pp-gradient-text md:text-5xl">
                  JOIN THE
                  <br />
                  SQUAD
                </h2>

                <p className="mt-6 leading-8 text-slate-300">
                  Get PulsePlay updates, stream alerts, gaming news, new
                  releases, community announcements, and future network
                  transmissions.
                </p>

                <div className="mt-8 space-y-4">

                  <div className="flex items-center gap-3">
                    <span className="text-green-400">✓</span>
                    <span className="text-sm text-slate-400">
                      Gaming news and updates
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-green-400">✓</span>
                    <span className="text-sm text-slate-400">
                      Live stream alerts
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-green-400">✓</span>
                    <span className="text-sm text-slate-400">
                      Community announcements
                    </span>
                  </div>

                </div>

              </div>


              <div className="p-8 md:p-10 lg:p-12">

                <div className="mb-7">

                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    New Connection
                  </p>

                  <h3 className="mt-2 text-2xl font-black text-white">
                    Create Your Player Profile
                  </h3>

                </div>


                <form
                  onSubmit={handleSignup}
                  className="grid gap-5"
                >

                  <div>

                    <label
                      htmlFor="community-name"
                      className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500"
                    >
                      Player Name
                    </label>

                    <input
                      id="community-name"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-cyan-400/20
                        bg-black/40
                        px-4
                        py-4
                        text-white
                        outline-none
                        transition
                        placeholder:text-slate-600
                        focus:border-cyan-400/50
                        focus:ring-2
                        focus:ring-cyan-500/10
                      "
                      placeholder="Enter player name"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      required
                    />

                  </div>


                  <div>

                    <label
                      htmlFor="community-email"
                      className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500"
                    >
                      Email Address
                    </label>

                    <input
                      id="community-email"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-cyan-400/20
                        bg-black/40
                        px-4
                        py-4
                        text-white
                        outline-none
                        transition
                        placeholder:text-slate-600
                        focus:border-cyan-400/50
                        focus:ring-2
                        focus:ring-cyan-500/10
                      "
                      placeholder="Enter email address"
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      required
                    />

                  </div>


                  <div>

                    <label
                      htmlFor="community-discord"
                      className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500"
                    >
                      Discord Username
                    </label>

                    <input
                      id="community-discord"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-cyan-400/20
                        bg-black/40
                        px-4
                        py-4
                        text-white
                        outline-none
                        transition
                        placeholder:text-slate-600
                        focus:border-cyan-400/50
                        focus:ring-2
                        focus:ring-cyan-500/10
                      "
                      placeholder="Optional"
                      value={discord}
                      onChange={(e) =>
                        setDiscord(e.target.value)
                      }
                    />

                  </div>


                  <BrandButton
                    type="submit"
                    disabled={sending}
                  >
                    {sending
                      ? "CONNECTING..."
                      : "🚀 JOIN COMMUNITY"}
                  </BrandButton>

                </form>


                {message && (
                  <div
                    className={`
                      mt-5
                      rounded-xl
                      border
                      p-4
                      text-sm
                      font-bold
                      ${
                        messageType === "success"
                          ? "border-green-500/20 bg-green-500/5 text-green-300"
                          : "border-red-500/20 bg-red-500/5 text-red-300"
                      }
                    `}
                  >
                    {message}
                  </div>
                )}

              </div>

            </div>

          </BrandCard>

        </section>


        {/* =====================================
            FINAL NETWORK CTA
        ====================================== */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-purple-500/20
            bg-gradient-to-br
            from-purple-950/30
            via-[#080b14]
            to-cyan-950/20
            p-8
            text-center
            shadow-[0_0_60px_rgba(147,51,234,.08)]
            md:p-14
          "
        >

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl" />

          <div className="relative mx-auto max-w-4xl">

            <div className="inline-flex items-center gap-3 rounded-full border border-green-500/20 bg-green-500/5 px-5 py-2">

              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400" />

              <span className="text-xs font-black uppercase tracking-[0.35em] text-green-400">
                Network Connection Ready
              </span>

            </div>


            <h2 className="mt-8 text-4xl font-black pp-gradient-text md:text-6xl">
              YOUR NEXT
              <br />
              ADVENTURE STARTS HERE
            </h2>


            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Games. Streams. News. Creators. Players.
              <br />
              One network connecting them all.
            </p>


            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

              <Link to="/games">
                <BrandButton>
                  EXPLORE GAMES
                </BrandButton>
              </Link>

              <Link to="/streams">
                <BrandButton variant="secondary">
                  ENTER BROADCAST
                </BrandButton>
              </Link>

            </div>


            <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-600 sm:flex-row sm:items-center sm:justify-between">

              <span>
                PLAYER NETWORK // ACTIVE
              </span>

              <span className="text-cyan-400">
                PULSEPLAY COMMUNITY ONLINE
              </span>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}
