import { useEffect, useState } from "react";
import { getGames } from "../../services/games";

type Game = {
  id: string;
  title: string;
  description: string;
  image?: string;
  genre?: string;
  featured: boolean;
};


export default function FeaturedGames() {

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    async function loadGames() {

      try {

        const data = await getGames();


        const featuredGames =
          data?.filter(
            (game: Game) => game.featured
          ) || [];


        setGames(featuredGames);


      } catch (error) {

        console.error(
          "Failed to load featured games:",
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

      <section className="mx-auto max-w-7xl px-6 py-20 text-white">

        <h2 className="text-4xl font-black">
          Featured Games
        </h2>


        <p className="mt-4 text-gray-400">
          Loading games...
        </p>

      </section>

    );

  }




  return (

    <section className="mx-auto max-w-7xl px-6 py-20 text-white">


      <h2 className="text-4xl font-black">
        Featured Games
      </h2>



      <div className="mt-10 grid gap-8 md:grid-cols-3">


        {games.map((game)=>(

          <div
            key={game.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-400"
          >


            {game.image && (

              <img
                src={game.image}
                alt={game.title}
                className="mb-5 h-56 w-full rounded-xl object-cover"
              />

            )}




            <h3 className="text-2xl font-bold">
              {game.title}
            </h3>




            {game.genre && (

              <p className="mt-2 text-sm text-purple-400">
                {game.genre}
              </p>

            )}






            <p className="mt-4 text-gray-400">
              {game.description}
            </p>




          </div>

        ))}


      </div>





      {games.length === 0 && (

        <p className="mt-10 text-gray-400">
          No featured games available.
        </p>

      )}



    </section>

  );

}