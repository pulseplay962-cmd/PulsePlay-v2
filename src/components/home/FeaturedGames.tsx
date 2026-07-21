import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BrandCard from "../ui/BrandCard";
import BrandButton from "../ui/BrandButton";

import { getGames } from "../../services/games";


type Game = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  genre?: string;
};



export default function FeaturedGames() {

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);



  async function loadGames() {

    try {

      const data = await getGames();

      setGames(
        (data || [])
          .filter((game: any) => game.featured)
          .slice(0, 6)
      );


    } catch (error) {

      console.error(
        "Failed to load featured games:",
        error
      );

    } finally {

      setLoading(false);

    }

  }



  useEffect(() => {

    loadGames();

  }, []);





  if (loading) {

    return (

      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-4xl font-black pp-gradient-text">
          Featured Games
        </h2>

        <p className="mt-4 text-slate-400">
          Loading featured games...
        </p>

      </section>

    );

  }





  return (

    <section
      className="
        max-w-7xl
        mx-auto
        px-6
        py-16
      "
    >


      <div
        className="
          flex
          flex-col
          md:flex-row
          justify-between
          md:items-center
          gap-6
        "
      >

        <div>

          <h2
            className="
              text-4xl
              font-black
              pp-gradient-text
            "
          >
            Featured Games
          </h2>


          <p
            className="
              mt-3
              text-slate-400
            "
          >
            Discover the latest adventures,
            releases, and games worth playing.
          </p>


        </div>



        <Link to="/games">

          <BrandButton>
            Browse Games
          </BrandButton>

        </Link>


      </div>





      <div
        className="
          mt-10
          grid
          gap-8
          md:grid-cols-2
          lg:grid-cols-3
        "
      >


        {games.map((game) => (

          <BrandCard
            key={game.id}
            className="card-hover"
          >


            {game.image ? (

              <img
                src={game.image}
                alt={game.title}
                className="
                  h-64
                  w-full
                  object-cover
                  rounded-xl
                "
              />

            ) : (

              <div
                className="
                  h-64
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  bg-black/40
                  text-slate-500
                "
              >
                No Image
              </div>

            )}



            {game.genre && (

              <p
                className="
                  mt-5
                  text-sm
                  text-cyan-400
                  font-bold
                "
              >
                {game.genre}
              </p>

            )}




            <h3
              className="
                mt-2
                text-2xl
                font-bold
                text-white
              "
            >
              {game.title}
            </h3>



            {game.description && (

              <p
                className="
                  mt-3
                  text-slate-400
                  line-clamp-3
                "
              >
                {game.description}
              </p>

            )}



          </BrandCard>

        ))}



      </div>


    </section>

  );

}