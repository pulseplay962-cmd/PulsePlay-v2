export default function LatestVideos() {
  const videos = [
    "Horizon Forbidden West",
    "Call of Duty Highlights",
    "Fortnite Victory Royale",
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">

      <h2 className="mb-10 text-5xl font-black">
        Latest Videos
      </h2>

      <div className="grid gap-8 md:grid-cols-3">

        {videos.map((video) => (
          <div
            key={video}
            className="overflow-hidden rounded-3xl border border-cyan-500/20 bg-white/5 transition hover:-translate-y-1 hover:border-cyan-400"
          >
            <div className="aspect-video bg-slate-800"></div>

            <div className="p-6">
              <h3 className="text-xl font-bold">{video}</h3>
            </div>
          </div>
        ))}

      </div>

    </section>
  );
}