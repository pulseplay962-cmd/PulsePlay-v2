import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getGames } from "../services/games";


type Game = {
  id: string;
  title: string;
  description: string;
  image: string;
  genre?: string;
  platform?: string;
  featured?: boolean;
};



export default function Games() {

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    async function loadGames() {

      try {

        const data = await getGames();

        setGames(data || []);


      } catch (error) {

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
          Explore games featured on PulsePlay.
        </p>

      </div>





      {games.length === 0 ? (

        <div className="rounded-xl bg-[#111827] p-8 text-center">

          <p className="text-gray-400">
            No games available yet.
          </p>

        </div>


      ) : (


        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">


          {games.map((game) => (

            <div

              key={game.id}

              className="overflow-hidden rounded-xl bg-[#111827] shadow-lg transition hover:scale-[1.02]"

            >



              {game.image && (

                <img

                  src={game.image}

                  alt={game.title}

                  className="h-64 w-full object-cover"

                />

              )}






              <div className="p-6">


                {game.featured && (

                  <span className="rounded bg-yellow-500 px-3 py-1 text-sm font-bold text-black">

                    Featured

                  </span>

                )}






                <h2 className="mt-4 text-2xl font-black">

                  {game.title}

                </h2>






                {game.genre && (

                  <p className="mt-2 text-cyan-400">

                    🎮 {game.genre}

                  </p>

                )}






                {game.platform && (

                  <p className="mt-1 text-gray-400">

                    🖥️ {game.platform}

                  </p>

                )}






                <p className="mt-4 line-clamp-3 text-gray-400">

                  {game.description}

                </p>






                <Link

                  to={`/games/${game.id}`}

                  className="mt-6 inline-block rounded-lg bg-cyan-500 px-5 py-2 font-bold text-black transition hover:bg-cyan-400"

                >

                  View Game →

                </Link>



              </div>


            </div>


          ))}


        </div>


      )}


    </div>

  );

}