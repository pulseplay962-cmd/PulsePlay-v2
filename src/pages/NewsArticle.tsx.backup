import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getNewsBySlug,
} from "../services/news";

import type {
  NewsArticle as Article,
} from "../services/news";





export default function NewsArticle(){


  const { slug } =
    useParams();



  const [article,setArticle] =
    useState<Article | null>(null);



  const [loading,setLoading] =
    useState(true);



  const [error,setError] =
    useState("");







  useEffect(()=>{


    async function loadArticle(){


      if(!slug){


        setError(
          "No article slug provided"
        );


        setLoading(false);

        return;

      }





      try{


        console.log(
          "Loading news article:",
          slug
        );



        const data =
          await getNewsBySlug(slug);




        if(!data){


          throw new Error(
            "Article does not exist"
          );

        }




        setArticle(data);



      }catch(error:any){



        console.error(
          "NEWS ARTICLE ERROR:",
          error
        );



        setError(

          error?.message ||

          "Unable to load article"

        );



        setArticle(null);



      }finally{


        setLoading(false);


      }


    }



    loadArticle();



  },[slug]);









  if(loading){


    return (

      <main className="px-6 py-20 text-white">


        <div className="pp-panel p-8">


          <h1 className="
          text-3xl
          font-black
          text-cyan-400
          ">

            🛰️ Loading PulsePlay Intel...

          </h1>


        </div>


      </main>

    );


  }









  if(error || !article){


    return (

      <main className="px-6 py-20 text-white">


        <div className="pp-panel p-8">


          <h1 className="
          text-4xl
          font-black
          text-red-400
          ">

            ⚠️ INTEL NOT FOUND

          </h1>




          <p className="
          mt-4
          text-slate-400
          ">

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








  return (

    <main className="
    mx-auto
    max-w-5xl
    px-6
    py-20
    text-white
    ">



      <article className="
      pp-panel
      p-8
      ">



        {
          image &&

          (

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






        <div className="
        flex
        flex-wrap
        items-center
        gap-3
        text-sm
        uppercase
        tracking-widest
        ">



          {
            article.category &&

            (

              <span className="
              rounded-full
              border
              border-purple-500/40
              bg-purple-500/20
              px-3
              py-1
              text-purple-300
              ">

                {article.category}

              </span>

            )

          }





          {
            article.created_at &&

            (

              <span className="
              text-slate-500
              ">

                {new Date(
                  article.created_at
                ).toLocaleDateString(
                  "en-US"
                )}

              </span>

            )

          }



        </div>








        <h1 className="
        mt-6
        text-5xl
        font-black
        pp-gradient-text
        ">


          {article.title}


        </h1>








        {
          article.author &&

          (

            <p className="
            mt-4
            text-slate-400
            ">

              By {article.author}

            </p>

          )

        }









        {
          article.excerpt &&

          (

            <p className="
            mt-8
            border-l-4
            border-cyan-400
            pl-5
            text-xl
            text-slate-300
            ">

              {article.excerpt}

            </p>

          )

        }









        <div className="
        mt-10
        whitespace-pre-line
        text-lg
        leading-relaxed
        text-slate-300
        ">

          {article.content}

        </div>









        {
          article.facebook_post &&

          (

            <div className="
            mt-12
            rounded-xl
            border
            border-purple-500/30
            bg-black/20
            p-6
            ">


              <h2 className="
              text-xl
              font-black
              text-cyan-400
              ">

                📡 COMMUNITY TRANSMISSION

              </h2>




              <p className="
              mt-4
              text-slate-300
              ">

                {article.facebook_post}

              </p>



            </div>


          )

        }







      </article>



    </main>


  );


}