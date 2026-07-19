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

        setArticles(data || []);

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

    <div className="mx-auto max-w-7xl px-6 py-12">


      <div className="mb-10">

        <h1 className="text-5xl font-black text-cyan-400">
          PulsePlay News
        </h1>

        <p className="mt-3 text-gray-400">
          Latest gaming news, updates, reviews, and announcements.
        </p>

      </div>





      {articles.length === 0 ? (

        <div className="rounded-xl bg-[#111827] p-8 text-center">

          <p className="text-gray-400">
            No news articles available yet.
          </p>

        </div>

      ) : (


        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">


          {articles.map((article) => (


            <div

              key={article.id}

              className="overflow-hidden rounded-xl bg-[#111827] shadow-lg"

            >



              {article.image && (

                <img

                  src={article.image}

                  alt={article.title}

                  className="h-56 w-full object-cover"

                />

              )}





              <div className="p-6">


                <div className="flex gap-2">


                  <span className="rounded bg-cyan-500 px-3 py-1 text-sm font-bold text-black">

                    {article.category}

                  </span>



                  {article.featured && (

                    <span className="rounded bg-yellow-500 px-3 py-1 text-sm font-bold text-black">

                      Featured

                    </span>

                  )}


                </div>






                <h2 className="mt-5 text-2xl font-black">

                  {article.title}

                </h2>





                {article.excerpt && (

                  <p className="mt-3 text-gray-400">

                    {article.excerpt}

                  </p>

                )}






                <Link

                  to={`/news/${article.slug}`}

                  className="mt-6 inline-block rounded-lg bg-cyan-500 px-5 py-2 font-bold text-black transition hover:bg-cyan-400"

                >

                  Read More →

                </Link>



              </div>


            </div>


          ))}


        </div>


      )}


    </div>

  );

}