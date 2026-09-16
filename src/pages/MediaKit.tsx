const offerings = [
  { icon: "📣", title: "Sponsored Content", text: "Gaming-focused articles, features, announcements, and campaign content built around a brand or product." },
  { icon: "🎮", title: "Gaming Gear Features", text: "Product spotlights and setup-focused features for gaming hardware, peripherals, and creator equipment." },
  { icon: "📡", title: "Twitch Integration", text: "Creator-led visibility through Veiltactician gaming streams and PulsePlay content channels." },
  { icon: "📱", title: "Social Promotion", text: "Short-form video, Reels, Facebook posts, and community-focused promotion designed for gaming audiences." },
  { icon: "🔗", title: "Affiliate Partnerships", text: "Product discovery and editorial placements that can connect interested gamers directly to partner stores." },
  { icon: "🎁", title: "Giveaways & Activations", text: "Community-friendly campaigns, product giveaways, and special gaming activations can be developed with partners." },
];

const audience = [
  "PC and console gamers",
  "Twitch viewers and gaming creators",
  "Gaming hardware and setup enthusiasts",
  "Players interested in open-world, RPG, action, and variety gaming",
  "Gaming community members discovering new products and content",
];

export default function MediaKit() {
  return (
    <main className="min-h-[72vh] px-4 py-10 sm:px-6 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-950/40 via-[#050914] to-purple-950/50 p-7 shadow-[0_0_100px_rgba(34,211,238,.08)] md:p-12 lg:p-16">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />
          <div className="relative">
            <div className="mb-5 flex items-center gap-3 text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
              PulsePlay Media Kit
            </div>
            <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
              LEVEL UP
              <span className="block pp-gradient-text">TOGETHER.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
              PulsePlay.online is an independent gaming platform connecting gaming, streaming, community, content, and gaming products. We are building a creator-led gaming network designed to help brands connect with people who genuinely enjoy gaming.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-cyan-300">🎮 GAMING</span>
              <span className="rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-purple-300">📡 STREAMING</span>
              <span className="rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-pink-300">🤝 PARTNERSHIPS</span>
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-5 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#0d1324]/70 p-7 lg:col-span-2">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-purple-400">About PulsePlay</p>
            <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">A GAMING COMMAND CENTER BUILT AROUND COMMUNITY</h2>
            <p className="mt-5 leading-relaxed text-slate-300">
              PulsePlay brings together gaming news and features, game discovery, Twitch streaming, community interaction, gaming gear, and creator-focused content in one growing platform.
            </p>
            <p className="mt-4 leading-relaxed text-slate-400">
              Our approach is intentionally creator-led: useful gaming content first, authentic product experiences second, and partnerships that make sense for the audience.
            </p>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-7">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400">Core Channels</p>
            <div className="mt-5 space-y-4">
              <a href="https://pulseplay.online" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-white/10 bg-black/20 p-4 text-sm font-bold text-white transition hover:border-cyan-400/30 hover:text-cyan-300">🌐 PulsePlay.online ↗</a>
              <a href="https://www.twitch.tv/veiltactician" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-white/10 bg-black/20 p-4 text-sm font-bold text-white transition hover:border-purple-400/30 hover:text-purple-300">📡 Twitch — Veiltactician ↗</a>
              <a href="https://www.facebook.com/PulsePlayonline/" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-white/10 bg-black/20 p-4 text-sm font-bold text-white transition hover:border-pink-400/30 hover:text-pink-300">📘 Facebook — PulsePlay ↗</a>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-7">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400">Partnership Opportunities</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">WAYS WE CAN WORK TOGETHER</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0d1324]/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-[#111827]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-2xl" aria-hidden="true">{item.icon}</div>
                <h3 className="mt-5 text-xl font-black text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-purple-400/20 bg-purple-950/20 p-7">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-purple-400">Audience Focus</p>
            <h2 className="mt-3 text-3xl font-black text-white">WHO WE CREATE FOR</h2>
            <ul className="mt-6 space-y-3">
              {audience.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-300"><span className="text-cyan-400">◆</span>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-pink-400/20 bg-pink-950/20 p-7">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-pink-400">Partnership Principles</p>
            <h2 className="mt-3 text-3xl font-black text-white">AUTHENTIC. USEFUL. GAMING-FIRST.</h2>
            <p className="mt-5 leading-relaxed text-slate-300">
              We want partnerships to feel like a natural part of the gaming experience. Product features should be useful, sponsored content should be clearly identified, and recommendations should fit the content and audience.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Brand relationships, sponsorships, affiliate arrangements, and product collaborations are subject to separate written agreements.
            </p>
          </div>
        </section>

        <section className="mt-14 relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-gradient-to-r from-cyan-950/30 via-purple-950/30 to-pink-950/30 p-7 md:p-10">
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400">Start a Conversation</p>
              <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">LET&apos;S BUILD SOMETHING FOR GAMERS.</h2>
              <p className="mt-3 max-w-2xl text-slate-400">Have a product, campaign, sponsorship, affiliate opportunity, or creator collaboration in mind? Send the details through the PulsePlay partnership portal.</p>
            </div>
            <a href="/partners" className="inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-7 py-4 font-black uppercase tracking-widest text-white shadow-[0_0_30px_rgba(34,211,238,.18)] transition hover:-translate-y-1">PARTNER WITH PULSEPLAY</a>
          </div>
        </section>

        <div className="mt-10 flex items-center justify-center gap-3 text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" /> PULSEPLAY MEDIA NETWORK ONLINE
        </div>
      </div>
    </main>
  );
}
