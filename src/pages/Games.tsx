import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getGames } from "../services/games";


type Game = {
  id: string;
  title: string;
  slug?: string;
  description: string;
  image: string;
  featured: boolean;
};



export default function Games() {

  const [games, setGames] = useState<Game[]>([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    async function loadGames() {

      try {

        const data = await getGames();

        setGames(data || []);


      } catch(error) {

        console.error(
          "Failed to load games:",
          error
        );


      } finally {

        setLoading(false);

      }

    }


    loadGames();

  }, []);






  if (loading) {

    return (

      <div className="px-6 py-20 text-center">

        <p className="text-xl text-gray-400">
          Loading games...
        </p>

      </div>

    );

  }






  return (

    <div className="mx-auto max-w-7xl px-6 py-12">


      <div className="mb-10">

        <h1 className="text-5xl font-black text-cyan-400">
          PulsePlay Games
        </h1>


        <p className="mt-3 text-gray-400">
          Explore featured games, releases, and gaming content.
        </p>


      </div>






      {games.length === 0 ? (

        <div className="rounded-xl bg-[#111827] p-8 text-center">

          <p className="text-gray-400">
            No games available yet.
          </p>

        </div>


      ) : (


        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">


          {games.map((game)=>(


            <Link

              key={game.id}

              to={`/games/${game.slug}`}

              className="overflow-hidden rounded-xl bg-[#111827] transition hover:scale-[1.02]"

            >



              {game.image && (

                <img

                  src={game.image}

                  alt={game.title}

                  className="h-56 w-full object-cover"

                />

              )}






              <div className="p-6">


                <h2 className="text-2xl font-black text-white">

                  {game.title}

                </h2>





                {game.featured && (

                  <span className="mt-3 inline-block rounded bg-yellow-500 px-3 py-1 text-sm font-bold text-black">

                    ⭐ Featured

                  </span>

                )}






                <p className="mt-4 text-gray-400">

                  {game.description}

                </p>





                <div className="mt-5 text-cyan-400 font-bold">

                  View Game →

                </div>


              </div>


            </Link>


          ))}


        </div>


      )}


    </div>

  );

}