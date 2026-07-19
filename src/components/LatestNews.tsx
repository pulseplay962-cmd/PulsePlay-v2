import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getFeaturedNews } from "../services/news";
import type { NewsArticle } from "../services/news";


export default function LatestNews() {

  const [articles, setArticles] = useState<NewsArticle[]>([]);


  useEffect(() => {

    async function loadNews() {

      try {

        const data = await getFeaturedNews();

        setArticles(data || []);

      } catch (error) {

        console.error(
          "Failed to load featured news:",
          error
        );

      }

    }


    loadNews();

  }, []);





  if (!articles.length) {
    return null;
  }





  return (

    <section className="mx-auto max-w-7xl px-6 py-12">


      <div className="mb-8 flex items-center justify-between">


        <div>

          <h2 className="text-4xl font-black text-cyan-400">
            Latest News
          </h2>

          <p className="mt-2 text-gray-400">
            Gaming updates, reviews, and PulsePlay announcements.
          </p>

        </div>



        <Link

          to="/news"

          className="rounded-lg bg-cyan-500 px-5 py-2 font-bold text-black hover:bg-cyan-400"

        >

          View All News →

        </Link>


      </div>





      <div className="grid gap-6 md:grid-cols-3">


        {articles.map((article) => (


          <article

            key={article.id}

            className="overflow-hidden rounded-xl bg-[#111827]"

          >


            {article.image && (

              <img

                src={article.image}

                alt={article.title}

                className="h-48 w-full object-cover"

              />

            )}






            <div className="p-5">


              <span className="text-sm font-bold text-cyan-400">

                {article.category}

              </span>





              <h3 className="mt-3 text-xl font-black">

                {article.title}

              </h3>





              {article.excerpt && (

                <p className="mt-3 line-clamp-3 text-gray-400">

                  {article.excerpt}

                </p>

              )}






              <Link

                to={`/news/${article.slug}`}

                className="mt-5 inline-block font-bold text-cyan-400 hover:text-cyan-300"

              >

                Read Article →

              </Link>



            </div>


          </article>


        ))}


      </div>


    </section>

  );

}