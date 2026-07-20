import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getNewsBySlug,
} from "../services/news";

import type {
  NewsArticle as Article,
} from "../services/news";


export default function NewsArticle() {

  const { slug } = useParams();

  const [article, setArticle] =
    useState<Article | null>(null);


  useEffect(() => {

    async function loadArticle(){

      if(!slug) return;


      try {

        const data =
          await getNewsBySlug(slug);

        setArticle(data);


      } catch(error){

        console.error(error);

      }

    }


    loadArticle();

  }, [slug]);




  if(!article){

    return (

      <div className="px-6 py-20 text-white">

        <h1 className="text-4xl font-black">
          Loading article...
        </h1>

      </div>

    );

  }




  return (

    <article className="mx-auto max-w-5xl px-6 py-20 text-white">


      {article.image && (

        <img

          src={article.image}

          alt={article.title}

          className="mb-8 h-96 w-full rounded-xl object-cover"

        />

      )}



      <p className="text-cyan-400">

        {article.category}

      </p>



      <h1 className="mt-3 text-5xl font-black">

        {article.title}

      </h1>



      <p className="mt-4 text-gray-400">

        By {article.author}

      </p>




      <div className="mt-10 whitespace-pre-line text-lg text-gray-300">

        {article.content}

      </div>



    </article>

  );

}