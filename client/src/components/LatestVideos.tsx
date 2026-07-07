export default function LatestVideos() {
  const videos = [
    {
      title: "Horizon Forbidden West",
      category: "Adventure Gameplay",
    },
    {
      title: "Call of Duty Highlights",
      category: "FPS Moments",
    },
    {
      title: "Fortnite Victory Royale",
      category: "Battle Royale",
    },
  ];

  return (
    <section className="bg-[#05070d] px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-5xl font-black">
          Latest <span className="text-purple-500">Videos</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {videos.map((video) => (
            <article
              key={video.title}
              className="group overflow-hidden rounded-3xl border border-purple-500/20 bg-white/5 transition duration-300 hover:-translate-y-2 hover:border-purple-400 hover:shadow-[0_0_30px_#9333ea55]"
            >
              <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-purple-500/20 to-cyan-500/20">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 text-2xl transition group-hover:scale-110">
                  ▶
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm font-bold uppercase tracking-wider text-purple-400">
                  {video.category}
                </p>

                <h3 className="mt-3 text-2xl font-bold group-hover:text-purple-300">
                  {video.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}