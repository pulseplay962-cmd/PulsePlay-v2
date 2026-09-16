const RAZER_AFFILIATE_URL =
  "https://razer.a9yw.net/c/7786730/3987964/10229";

const categories = [
  { icon: "🖱️", title: "Gaming Mice", description: "Precision control for competitive and everyday gaming." },
  { icon: "⌨️", title: "Keyboards", description: "Mechanical keyboards and gaming-focused controls." },
  { icon: "🎧", title: "Headsets", description: "Audio gear for gaming, streaming, and communication." },
  { icon: "🖥️", title: "Gaming Displays", description: "Monitors and display upgrades for your command center." },
  { icon: "🎮", title: "Controllers", description: "Controllers and accessories for console and PC gaming." },
  { icon: "🎙️", title: "Creator Gear", description: "Microphones, streaming equipment, and creator essentials." },
];

export default function GamingGear() {
  return (
    <main className="min-h-[72vh] px-4 py-10 sm:px-6 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <section className="relative mb-12 overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-950/40 via-[#050914] to-purple-950/50 p-7 shadow-[0_0_100px_rgba(34,211,238,.08)] md:p-12 lg:p-16">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />
          <div className="relative">
            <div className="mb-5 flex items-center gap-3 text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
              Gaming Equipment Network
            </div>
            <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
              LEVEL UP
              <span className="block pp-gradient-text">YOUR SETUP.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Welcome to the PulsePlay Gaming Gear network — a growing collection of gaming hardware, peripherals, creator equipment, and setup upgrades worth checking out.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-cyan-300">🎮 GAMING</span>
              <span className="rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-purple-300">⚡ HARDWARE</span>
              <span className="rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-pink-300">🎙️ CREATOR GEAR</span>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <div className="mb-7">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400">Featured Gear</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">RAZER BATTLESTATION</h2>
            <p className="mt-3 max-w-2xl text-slate-400">Build out your gaming command center with Razer hardware and setup gear.</p>
          </div>

          <div className="group relative overflow-hidden rounded-[2rem] border border-purple-400/25 bg-gradient-to-br from-purple-950/50 via-[#090d1a] to-cyan-950/30 p-7 shadow-[0_0_70px_rgba(139,92,246,.08)] transition duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_90px_rgba(34,211,238,.10)] md:p-10">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl transition group-hover:bg-cyan-400/15" />
            <div className="relative grid gap-8 lg:grid-cols-[1.3fr_.7fr] lg:items-center">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <span className="rounded-xl border border-green-400/20 bg-green-400/10 px-3 py-2 text-xs font-black uppercase tracking-widest text-green-300">AFFILIATE FEATURE</span>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-500">RAZER</span>
                </div>
                <h3 className="text-3xl font-black text-white md:text-4xl">Build Your BattleStation</h3>
                <p className="mt-5 max-w-2xl leading-relaxed text-slate-300">
                  Your gaming setup is your command center. Explore Razer&apos;s BattleStation collection and discover hardware designed to bring your gaming space together.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <span className="rounded-lg bg-white/5 px-3 py-2 text-sm text-slate-300">🖱️ Peripherals</span>
                  <span className="rounded-lg bg-white/5 px-3 py-2 text-sm text-slate-300">⌨️ Keyboards</span>
                  <span className="rounded-lg bg-white/5 px-3 py-2 text-sm text-slate-300">🎧 Audio</span>
                  <span className="rounded-lg bg-white/5 px-3 py-2 text-sm text-slate-300">💡 Setup Gear</span>
                </div>
                <a href={RAZER_AFFILIATE_URL} target="_blank" rel="noopener noreferrer sponsored" className="mt-8 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-4 font-black uppercase tracking-widest text-white shadow-[0_0_30px_rgba(34,211,238,.20)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(34,211,238,.35)]">
                  SHOP RAZER <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-white/10 bg-black/30 p-8 text-center">
                <div>
                  <div className="text-6xl">⚡</div>
                  <p className="mt-5 text-sm font-black uppercase tracking-[0.3em] text-cyan-400">COMMAND CENTER</p>
                  <p className="mt-2 text-sm text-slate-500">Razer BattleStation</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4">
            <p className="text-xs leading-relaxed text-slate-500">
              <span className="font-bold text-slate-400">Affiliate disclosure:</span> Some links on PulsePlay may be affiliate links. If you make a qualifying purchase through one of these links, PulsePlay may earn a commission at no additional cost to you.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <div className="mb-7">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-purple-400">Gear Network</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">EXPLORE GAMING GEAR</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div key={category.title} className="group rounded-2xl border border-white/10 bg-[#0d1324]/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-[#111827]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-2xl text-cyan-400 transition group-hover:border-cyan-400/40 group-hover:bg-cyan-400/15" aria-hidden="true">{category.icon}</div>
                <h3 className="mt-5 text-xl font-black text-white">{category.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{category.description}</p>
                <div className="mt-5 text-xs font-black uppercase tracking-widest text-slate-600">COMING ONLINE</div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[2rem] border border-pink-400/20 bg-gradient-to-r from-pink-950/30 via-purple-950/30 to-cyan-950/30 p-7 md:p-10">
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-pink-400">Brand Network</p>
              <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">WANT YOUR GEAR ON PULSEPLAY?</h2>
              <p className="mt-3 max-w-2xl text-slate-400">PulsePlay is building a growing gaming gear network for hardware brands, creators, and gaming-focused products.</p>
            </div>
            <a href="/partners" className="inline-flex shrink-0 items-center justify-center rounded-xl border border-pink-400/30 bg-pink-500/10 px-6 py-4 font-black uppercase tracking-widest text-pink-300 transition hover:border-pink-400/50 hover:bg-pink-500/20">PARTNER WITH PULSEPLAY</a>
          </div>
        </section>

        <div className="mt-10 flex items-center justify-center gap-3 text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" /> GAMING GEAR NETWORK ONLINE
        </div>
      </div>
    </main>
  );
}
