import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getNews } from "../services/news";
import type { NewsArticle } from "../services/news";


export default function News() {

  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    async function loadNews() {

      try {

        const data = await getNews();

        setArticles(
          (data || []).filter(
            (article) => article.published !== false
          )
        );


      } catch (error) {

        console.error(
          "Failed to load news:",
          error
        );


      } finally {

        setLoading(false);

      }

    }


    loadNews();

  }, []);





  if (loading) {

    return (

      <div className="px-6 py-20 text-center">

        <p className="text-xl text-gray-400">
          Loading news...
        </p>

      </div>

    );

  }





  return (

    <div className="mx-auto max-w-7xl px-6 py-16">


      <section className="mb-12">

        <h1 className="text-5xl font-black text-cyan-400">

          PulsePlay News

        </h1>


        <p className="mt-4 max-w-2xl text-gray-400">

          Stay updated with the latest gaming news,
          esports updates, reviews, and announcements.

        </p>


      </section>





      {articles.length === 0 ? (

        <div className="rounded-xl bg-[#111827] p-10 text-center">

          <p className="text-gray-400">

            No news articles available yet.

          </p>


        </div>


      ) : (


        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">


          {articles.map((article) => (

            <article

              key={article.id}

              className="overflow-hidden rounded-xl bg-[#111827] shadow-lg transition hover:-translate-y-1 hover:shadow-xl"

            >


              {article.image && (

                <Link

                  to={
                    article.slug
                      ? `/news/${article.slug}`
                      : "/news"
                  }

                >

                  <img

                    src={article.image}

                    alt={article.title}

                    className="h-56 w-full object-cover transition hover:opacity-80"

                  />

                </Link>

              )}





              <div className="p-6">


                <div className="flex flex-wrap gap-2">


                  {article.category && (

                    <span

                      className="rounded bg-cyan-500 px-3 py-1 text-sm font-bold text-black"

                    >

                      {article.category}

                    </span>

                  )}





                  {article.featured && (

                    <span

                      className="rounded bg-yellow-500 px-3 py-1 text-sm font-bold text-black"

                    >

                      Featured

                    </span>

                  )}


                </div>





                <Link

                  to={
                    article.slug
                      ? `/news/${article.slug}`
                      : "/news"
                  }

                >

                  <h2 className="mt-5 text-2xl font-black transition hover:text-cyan-400">

                    {article.title}

                  </h2>


                </Link>





                <p className="mt-3 line-clamp-3 text-gray-400">

                  {article.excerpt ||
                    article.content.substring(0, 150) + "..."}

                </p>





                {article.slug && (

                  <Link

                    to={`/news/${article.slug}`}

                    className="mt-6 inline-block rounded-lg bg-cyan-500 px-5 py-2 font-bold text-black transition hover:bg-cyan-400"

                  >

                    Read More →

                  </Link>

                )}


              </div>


            </article>


          ))}


        </div>


      )}


    </div>

  );

}