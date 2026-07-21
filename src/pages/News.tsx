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
          mb-16
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
            mt-5
            mx-auto
            max-w-3xl
            text-lg
            text-slate-400
          "
        >
          Gaming updates, announcements,
          releases, and stories from the
          PulsePlay community.
        </p>


      </section>








      {loading && (

        <BrandCard>


          <div className="flex items-center gap-3">

            <span className="pp-live-dot" />

            <p className="text-slate-400">
              Loading latest news...
            </p>

          </div>


        </BrandCard>

      )}








      {!loading && news.length === 0 && (

        <BrandCard>


          <h2
            className="
              text-2xl
              font-bold
              text-white
            "
          >
            No News Available
          </h2>



          <p
            className="
              mt-3
              text-slate-400
            "
          >
            Add articles through the PulsePlay
            Admin Dashboard.
          </p>


        </BrandCard>

      )}








      {!loading && news.length > 0 && (

        <section
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-8
          "
        >



          {news.map((article) => (


            <BrandCard
              key={article.id}
              className="card-hover"
            >



              {article.image ? (

                <img

                  src={article.image}

                  alt={article.title}

                  className="
                    h-52
                    w-full
                    rounded-xl
                    object-cover
                  "

                />


              ) : (

                <div
                  className="
                    h-52
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    bg-black/40
                    text-slate-500
                  "
                >
                  No Image Available
                </div>

              )}








              <div className="mt-5 flex items-center gap-3">


                {article.category && (

                  <span
                    className="
                      rounded-full
                      border
                      border-cyan-500/30
                      bg-cyan-500/10
                      px-3
                      py-1
                      text-xs
                      font-bold
                      text-cyan-300
                    "
                  >
                    {article.category}
                  </span>

                )}



                {article.created_at && (

                  <span
                    className="
                      text-xs
                      text-slate-500
                    "
                  >
                    {new Date(
                      article.created_at
                    ).toLocaleDateString()}
                  </span>

                )}


              </div>








              <h2
                className="
                  mt-5
                  text-2xl
                  font-black
                  text-white
                "
              >
                {article.title}
              </h2>








              {article.description && (

                <p
                  className="
                    mt-3
                    text-slate-400
                    line-clamp-3
                  "
                >
                  {article.description}
                </p>

              )}








              {article.url && (

                <div className="mt-6">

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
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

      )}






    </main>

  );

}