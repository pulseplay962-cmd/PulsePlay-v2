import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  getNewsBySlug,
} from "../services/news";

import {
  getGames,
  type Game,
} from "../services/games";

import {
  trackPageView,
} from "../services/analytics";

import type {
  NewsArticle as Article,
} from "../services/news";


export default function NewsArticle() {


  const { slug } =
    useParams();


  const [article, setArticle] =
    useState<Article | null>(null);


  const [loading, setLoading] =
    useState(true);


  const [error, setError] =
    useState("");


  const [featuredGames, setFeaturedGames] =
    useState<Game[]>([]);


  /*
   * ======================================
   * Load Article
   * ======================================
   */

  useEffect(() => {


    async function loadArticle() {


      if (!slug) {


        setError(
          "No article slug provided"
        );


        setLoading(false);

        return;

      }


      try {


        console.log(
          "Loading news article:",
          slug
        );


        /*
         * ======================================
         * Load Article From Supabase
         * ======================================
         */

        const data =
          await getNewsBySlug(slug);


        console.log(
          "📰 NEWS ARTICLE DATA RESULT:",
          data
        );


        /*
         * ======================================
         * Verify Article Exists
         * ======================================
         */

        if (!data) {


          console.error(
            "❌ NEWS ARTICLE RETURNED NULL:",
            slug
          );


          throw new Error(
            "Article does not exist"
          );

        }


        setArticle(data);


        /*
         * ======================================
         * Article Analytics
         * ======================================
         *
         * Track the article only after it
         * successfully loads.
         *
         * Await the analytics request so
         * we can verify the Supabase result.
         */

        console.log(
          "🔥🔥 NEWS ARTICLE ANALYTICS START",
          {
            slug,
            id: data.id,
            title: data.title,
          }
        );


        const analyticsResult =
          await trackPageView(
            `/news/${slug}`,
            {
              contentType: "news",

              contentId:
                String(data.id),

              contentTitle:
                data.title,
            }
          );


        console.log(
          "🔥🔥 NEWS ARTICLE ANALYTICS RESULT:",
          analyticsResult
        );


      } catch (error: any) {


        console.error(
          "NEWS ARTICLE ERROR:",
          error
        );


        setError(

          error?.message ||

          "Unable to load article"

        );


        setArticle(null);


      } finally {


        setLoading(false);


      }


    }


    loadArticle();


  }, [slug]);


  /*
   * ======================================
   * Featured Games
   * ======================================
   */

  useEffect(() => {


    async function loadFeaturedGames() {


      try {


        const games =
          await getGames();


        const featured =
          games
            .filter(
              game =>
                game.featured === true
            )
            .slice(0, 3);


        setFeaturedGames(
          featured
        );


      } catch (error) {


        console.error(
          "FEATURED GAMES ERROR:",
          error
        );


      }


    }


    loadFeaturedGames();


  }, []);


  /*
   * ======================================
   * Loading State
   * ======================================
   */

  if (loading) {


    return (

      <main
        className="
          px-6
          py-20
          text-white
        "
      >


        <div className="pp-panel p-8">


          <h1
            className="
              text-3xl
              font-black
              text-cyan-400
            "
          >

            🛰️ Loading PulsePlay Intel...

          </h1>


        </div>


      </main>

    );


  }


  /*
   * ======================================
   * Error State
   * ======================================
   */

  if (error || !article) {


    return (

      <main
        className="
          px-6
          py-20
          text-white
        "
      >


        <div className="pp-panel p-8">


          <h1
            className="
              text-4xl
              font-black
              text-red-400
            "
          >

            ⚠️ INTEL NOT FOUND

          </h1>


          <p
            className="
              mt-4
              text-slate-400
            "
          >

            {
              error ||
              "The requested report does not exist."
            }

          </p>


        </div>


      </main>

    );


  }


  const image =
    article.image ||
    "";


  /*
   * ======================================
   * Article
   * ======================================
   */

  return (

    <main
      className="
        mx-auto
        max-w-5xl
        px-6
        py-20
        text-white
      "
    >


      <article
        className="
          pp-panel
          p-8
        "
      >


        {
          image && (

            <img
              src={image}
              alt={article.title}
              className="
                mb-8
                h-96
                w-full
                rounded-xl
                object-cover
              "
            />

          )
        }


        <div
          className="
            flex
            flex-wrap
            items-center
            gap-3
            text-sm
            uppercase
            tracking-widest
          "
        >


          {
            article.category && (

              <span
                className="
                  rounded-full
                  border
                  border-purple-500/40
                  bg-purple-500/20
                  px-3
                  py-1
                  text-purple-300
                "
              >

                {article.category}

              </span>

            )
          }


          {
            article.created_at && (

              <span
                className="
                  text-slate-500
                "
              >

                {new Date(
                  article.created_at
                ).toLocaleDateString(
                  "en-US"
                )}

              </span>

            )
          }


        </div>


        <h1
          className="
            mt-6
            text-5xl
            font-black
            pp-gradient-text
          "
        >

          {article.title}

        </h1>


        {
          article.author && (

            <p
              className="
                mt-4
                text-slate-400
              "
            >

              By {article.author}

            </p>

          )
        }


        {
          article.excerpt && (

            <p
              className="
                mt-8
                border-l-4
                border-cyan-400
                pl-5
                text-xl
                text-slate-300
              "
            >

              {article.excerpt}

            </p>

          )
        }


        <div
          className="
            mt-10
            whitespace-pre-line
            text-lg
            leading-relaxed
            text-slate-300
          "
        >

          {article.content}

        </div>


        {
          article.facebook_post && (

            <div
              className="
                mt-12
                rounded-xl
                border
                border-purple-500/30
                bg-black/20
                p-6
              "
            >


              <h2
                className="
                  text-xl
                  font-black
                  text-cyan-400
                "
              >

                📡 COMMUNITY TRANSMISSION

              </h2>


              <p
                className="
                  mt-4
                  text-slate-300
                "
              >

                {article.facebook_post}

              </p>


            </div>

          )
        }


      </article>


      {
        featuredGames.length > 0 && (

          <section
            className="
              mt-10
            "
          >


            <div
              className="
                mb-6
              "
            >

              <h2
                className="
                  text-3xl
                  font-black
                  pp-gradient-text
                "
              >

                🔥 KEEP EXPLORING PULSEPLAY

              </h2>


              <p
                className="
                  mt-2
                  text-slate-400
                "
              >

                Discover more games featured
                in the PulsePlay gaming network.

              </p>


            </div>


            <div
              className="
                grid
                gap-6
                md:grid-cols-3
              "
            >


              {
                featuredGames.map(
                  game => (

                    <Link
                      key={game.id}
                      to={`/games/${game.id}`}
                      className="
                        group
                        overflow-hidden
                        rounded-2xl
                        border
                        border-white/10
                        bg-black/30
                        transition-all
                        hover:-translate-y-1
                        hover:border-cyan-400/40
                        hover:bg-cyan-400/5
                      "
                    >


                      {
                        game.image && (

                          <img
                            src={game.image}
                            alt={game.title}
                            className="
                              h-44
                              w-full
                              object-cover
                              transition
                              duration-500
                              group-hover:scale-105
                            "
                          />

                        )
                      }


                      <div className="p-5">


                        <div
                          className="
                            text-xs
                            font-black
                            uppercase
                            tracking-widest
                            text-cyan-400
                          "
                        >

                          {
                            game.status ===
                            "released"

                              ? "Released"

                              : "Upcoming"
                          }

                        </div>


                        <h3
                          className="
                            mt-2
                            text-xl
                            font-black
                            text-white
                            group-hover:text-cyan-300
                          "
                        >

                          {game.title}

                        </h3>


                        <p
                          className="
                            mt-4
                            text-sm
                            font-bold
                            uppercase
                            tracking-wider
                            text-purple-300
                          "
                        >

                          View Game →

                        </p>


                      </div>


                    </Link>

                  )
                )
              }


            </div>


          </section>

        )
      }


    </main>

  );

}