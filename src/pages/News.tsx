import { useEffect, useState } from "react";

import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";

import {
  getNews,
} from "../services/news";


type NewsItem = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  category?: string;
  url?: string;
  created_at?: string;
};


export default function News() {

  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    async function loadNews() {

      try {

        const data = await getNews();

        setNews(data || []);

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



  return (

    <main>


      <section
        className="
          text-center
          mb-12
        "
      >

        <h1
          className="
            text-5xl
            md:text-6xl
            font-black
            pp-gradient-text
          "
        >
          Gaming News
        </h1>


        <p
          className="
            mt-4
            text-slate-400
            max-w-2xl
            mx-auto
          "
        >
          The latest gaming updates, releases,
          announcements, and PulsePlay community news.
        </p>


      </section>



      {loading && (

        <p className="text-center text-slate-400">
          Loading news...
        </p>

      )}



      {!loading && news.length === 0 && (

        <BrandCard>

          <h2 className="text-2xl font-bold">
            No News Available
          </h2>


          <p className="mt-3 text-slate-400">
            Add articles through the PulsePlay Admin Dashboard.
          </p>


        </BrandCard>

      )}



      <section
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
      >

        {news.map((article) => (

          <BrandCard key={article.id}>


            {article.image && (

              <img
                src={article.image}
                alt={article.title}
                className="
                  w-full
                  h-48
                  object-cover
                  rounded-xl
                  mb-5
                "
              />

            )}



            {article.category && (

              <span
                className="
                  inline-block
                  px-3
                  py-1
                  rounded-full
                  bg-cyan-500/20
                  text-cyan-300
                  text-sm
                  mb-4
                "
              >
                {article.category}
              </span>

            )}



            <h2
              className="
                text-2xl
                font-bold
              "
            >
              {article.title}
            </h2>



            <p
              className="
                mt-3
                text-slate-400
                line-clamp-3
              "
            >
              {article.description}
            </p>



            {article.url && (

              <div className="mt-6">

                <a
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                >

                  <BrandButton>
                    Read More
                  </BrandButton>

                </a>

              </div>

            )}


          </BrandCard>

        ))}


      </section>


    </main>

  );
}