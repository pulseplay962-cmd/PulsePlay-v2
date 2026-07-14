import { useEffect, useState } from "react";
import { getVideos } from "../../services/videos";

type Video = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  featured: boolean;
};

export default function LatestVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVideos() {
      try {
        const data = await getVideos();

        const featuredVideos = (data || []).filter(
          (video) => video.featured
        );

        setVideos(featuredVideos);
      } catch (error) {
        console.error("Failed to load videos:", error);
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
  }, []);

  return (
    <section className="bg-[#05070d] px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">

        <h2 className="mb-12 text-5xl font-black">
          Latest <span className="text-purple-500">Videos</span>
        </h2>

        {loading && (
          <p className="text-gray-400">
            Loading videos...
          </p>
        )}

        {!loading && videos.length === 0 && (
          <p className="text-gray-400">
            No featured videos yet.
          </p>
        )}

        <div className="grid gap-8 md:grid-cols-3">
          {videos.map((video) => (
            <article
              key={video.id}
              className="group overflow-hidden rounded-3xl border border-purple-500/20 bg-white/5 transition duration-300 hover:-translate-y-2 hover:border-purple-400 hover:shadow-[0_0_30px_#9333ea55]"
            >
              <div className="aspect-video overflow-hidden bg-gradient-to-br from-purple-500/20 to-cyan-500/20">

                {video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 text-2xl transition group-hover:scale-110">
                      ▶
                    </div>
                  </div>
                )}

              </div>

              <div className="p-6">

                <h3 className="text-2xl font-bold group-hover:text-purple-300">
                  {video.title}
                </h3>

                <p className="mt-3 text-gray-400">
                  {video.description}
                </p>

                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block text-purple-400 hover:text-purple-300"
                >
                  Watch Video →
                </a>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}