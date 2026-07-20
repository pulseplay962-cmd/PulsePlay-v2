import { useEffect, useState } from "react";
import { getNews } from "../services/news";

type Article = {
  id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  featured: boolean;
};

export default function Community() {
  const [news, setNews] = useState<Article[]>([]);

  useEffect(() => {
    async function loadNews() {
      try {
        const data = await getNews();

        const featuredNews = (data || []).filter(
          (article) => article.featured
        );

        setNews(featuredNews);
      } catch (error) {
        console.error("Failed to load news:", error);
      }
    }

    loadNews();
  }, []);

  const links = [
    {
      title: "🎮 Twitch",
      description: "Watch live streams and chat during broadcasts.",
      url: "https://www.twitch.tv/Veiltactician",
      button: "Watch Live",
    },
    {
  title: "🌐 PulsePlay Website",
  description: "Website updates in progress. Check back soon!",
  url: "",
  button: "Coming Soon",
},
    {
      title: "🎁 Throne Wishlist",
      description: "Support future streams and help improve the setup.",
      url: "https://throne.com/ve",
      button: "View Wishlist",
    },
    {
      title: "🛒 Amazon Picks",
      description: "Browse recommended gaming gear and creator favorites.",
      url: "https://amzn.to/4vmEtDy",
      button: "Shop Gear",
    },
  ];

  return (
    <section className="bg-[#05070d] px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.4em] text-purple-400">
            JOIN THE COMMUNITY
          </p>

          <h1 className="mt-4 text-5xl font-black md:text-6xl">
            Welcome to the{" "}
            <span className="text-cyan-400">
              PulsePlay
            </span>{" "}
            Community
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            Whether you're here for live gameplay, giveaways,
            gaming discussions, or creator content, there's a place
            for you in the PulsePlay community.
          </p>
        </div>


        {/* News Section */}
        {news.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-8 text-4xl font-black">
              Latest <span className="text-purple-400">Updates</span>
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              {news.map((article) => (
                <article
                  key={article.id}
                  className="overflow-hidden rounded-3xl border border-purple-500/20 bg-white/5"
                >
                  {article.image && (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="aspect-video w-full object-cover"
                    />
                  )}

                  <div className="p-6">
                    <p className="text-sm text-purple-400">
                      {article.category}
                    </p>

                    <h3 className="mt-3 text-2xl font-bold">
                      {article.title}
                    </h3>

                    <p className="mt-3 text-gray-400">
                      {article.content}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}


        {/* Community Links */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {links.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 transition hover:-translate-y-1 hover:border-cyan-400 hover:shadow-[0_0_25px_#22d3ee55]"
            >
              <h2 className="text-2xl font-bold">
                {item.title}
              </h2>

              <p className="mt-4 text-gray-400">
                {item.description}
              </p>

              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-block rounded-lg bg-cyan-400 px-6 py-3 font-bold text-black transition hover:bg-cyan-300"
              >
                {item.button}
              </a>
            </article>
          ))}
        </div>


        <div className="mt-20 rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-900/30 to-cyan-900/20 p-10 text-center">
          <h2 className="text-4xl font-black">
            Game Together. Grow Together.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-gray-300">
            PulsePlay is built around creating an engaging,
            welcoming gaming community. Every follow, share,
            and conversation helps make the experience even better.
          </p>
        </div>

      </div>
    </section>
  );
}