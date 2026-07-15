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

export default function News() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function loadNews() {
      try {
        const data = await getNews();
        setArticles(data || []);
      } catch (error) {
        console.error("Failed to load news:", error);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);



  return (
    <section className="bg-[#05070d] px-6 py-24 text-white">

      <div className="mx-auto max-w-7xl">

        <div className="text-center">

          <p className="text-sm font-bold uppercase tracking-[0.4em] text-cyan-400">
            PulsePlay News
          </p>


          <h1 className="mt-4 text-5xl font-black">
            Latest{" "}
            <span className="text-cyan-400">
              Updates
            </span>
          </h1>

        </div>


        {loading && (
          <p className="mt-16 text-center text-gray-400">
            Loading news...
          </p>
        )}


        {!loading && articles.length === 0 && (
          <p className="mt-16 text-center text-gray-400">
            No news articles yet.
          </p>
        )}



        <div className="mt-16 grid gap-8 md:grid-cols-3">

          {articles.map((article)=>(

            <article
              key={article.id}
              className="overflow-hidden rounded-3xl border border-cyan-500/20 bg-white/5"
            >

              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-48 w-full object-cover"
                />
              )}


              <div className="p-6">

                <p className="text-sm text-cyan-400">
                  {article.category}
                </p>


                {article.featured && (
                  <p className="mt-2 text-yellow-400">
                    ⭐ Featured
                  </p>
                )}


                <h2 className="mt-3 text-2xl font-bold">
                  {article.title}
                </h2>


                <p className="mt-3 text-gray-400">
                  {article.content}
                </p>


              </div>

            </article>

          ))}

        </div>


      </div>

    </section>
  );
}