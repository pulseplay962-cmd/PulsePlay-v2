import { NavLink } from "react-router-dom";
import BrandButton from "../ui/BrandButton";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-r from-purple-600/25 via-cyan-500/15 to-pink-500/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 -z-10 pp-scan opacity-25" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto inline-flex items-center gap-3 rounded-full pp-panel px-5 py-2.5 text-xs font-black tracking-[0.2em] text-cyan-300">
            <span className="pp-live-dot" />
            PULSEPLAY ONLINE
          </div>

          <p className="mt-10 text-xs font-black uppercase tracking-[0.4em] text-purple-300 md:text-sm">
            Gaming • Streaming • Community
          </p>

          <h1 className="mt-4 text-6xl font-black leading-none tracking-tight pp-gradient-text sm:text-7xl md:text-9xl">
            PULSEPLAY
          </h1>

          <h2 className="mt-5 text-2xl font-black uppercase tracking-[0.12em] text-white md:text-4xl">
            Your Gaming Command Center
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            Come for the games. Stay for the streams, stories, gear, and community.
            PulsePlay brings it all together in one place.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <NavLink to="/streams">
              <BrandButton variant="primary">📡 Watch Live</BrandButton>
            </NavLink>
            <NavLink to="/games">
              <BrandButton variant="secondary">🎮 Explore Games</BrandButton>
            </NavLink>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs font-black uppercase tracking-widest text-slate-500">
            <NavLink to="/transmissions" className="rounded-full border border-pink-400/15 bg-pink-400/5 px-4 py-2 transition hover:border-pink-400/40 hover:text-pink-300">
              📡 Latest Transmissions
            </NavLink>
            <NavLink to="/community" className="rounded-full border border-cyan-400/15 bg-cyan-400/5 px-4 py-2 transition hover:border-cyan-400/40 hover:text-cyan-300">
              🌐 Community
            </NavLink>
            <NavLink to="/store" className="rounded-full border border-purple-400/15 bg-purple-400/5 px-4 py-2 transition hover:border-purple-400/40 hover:text-purple-300">
              🛒 Store
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}
