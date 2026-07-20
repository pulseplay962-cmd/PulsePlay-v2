import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getGameBySlug } from "../services/games";


type Game = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  genre: string;
  platform: string;
  release_date: string;
  featured: boolean;
};



export default function GameDetails() {

  const { slug } = useParams();

  const [game, setGame] = useState<Game | null>(null);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    async function loadGame() {

      try {

        if (!slug) return;


        const data = await getGameBySlug(slug);

console.log("Game loaded:", data);

setGame(data);


      } catch (error) {

        console.error(
          "Failed to load game:",
          error
        );


      } finally {

        setLoading(false);

      }

    }


    loadGame();

  }, [slug]);






  if (loading) {

    return (

      <div className="px-6 py-20 text-center">

        <p className="text-xl text-gray-400">
          Loading game...
        </p>

      </div>

    );

  }





  if (!game) {

    return (

      <div className="px-6 py-20 text-center">

        <h1 className="text-4xl font-black text-red-400">
          Game Not Found
        </h1>

      </div>

    );

  }





  return (

    <div className="mx-auto max-w-6xl px-6 py-12">


      <div className="grid gap-10 md:grid-cols-2">


        {game.image && (

          <img

            src={game.image}

            alt={game.title}

            className="rounded-xl object-cover shadow-lg"

          />

        )}





        <div>


          <h1 className="text-5xl font-black text-cyan-400">

            {game.title}

          </h1>





          {game.featured && (

            <span className="mt-4 inline-block rounded bg-yellow-500 px-4 py-2 font-bold text-black">

              ⭐ Featured Game

            </span>

          )}






          <div className="mt-6 space-y-3 text-gray-300">


            {game.genre && (

              <p>

                🎮 Genre:
                <span className="ml-2 text-white">
                  {game.genre}
                </span>

              </p>

            )}





            {game.platform && (

              <p>

                🖥 Platform:
                <span className="ml-2 text-white">
                  {game.platform}
                </span>

              </p>

            )}





            {game.release_date && (

              <p>

                📅 Release:
                <span className="ml-2 text-white">
                  {game.release_date}
                </span>

              </p>

            )}


          </div>






          <p className="mt-8 leading-relaxed text-gray-400">

            {game.description}

          </p>



        </div>


      </div>


    </div>

  );

}