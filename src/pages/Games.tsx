import { useEffect, useState } from "react";

import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";

import {
  getGames,
} from "../services/games";


type Game = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  genre?: string;
  release_date?: string;
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
          Game Library
        </h1>


        <p
          className="
            mt-4
            text-slate-400
            max-w-2xl
            mx-auto
          "
        >
          Explore featured games, upcoming releases,
          and titles powering the PulsePlay community.
        </p>


      </section>



      {loading && (

        <p className="text-center text-slate-400">
          Loading games...
        </p>

      )}



      {!loading && games.length === 0 && (

        <BrandCard>

          <h2 className="text-2xl font-bold">
            No Games Available
          </h2>


          <p className="mt-3 text-slate-400">
            Add games through the PulsePlay Admin Dashboard.
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

        {games.map((game) => (

          <BrandCard key={game.id}>


            {game.image && (

              <img
                src={game.image}
                alt={game.title}
                className="
                  w-full
                  h-56
                  object-cover
                  rounded-xl
                  mb-5
                "
              />

            )}



            {game.genre && (

              <span
                className="
                  inline-block
                  px-3
                  py-1
                  rounded-full
                  bg-purple-500/20
                  text-purple-300
                  text-sm
                  mb-4
                "
              >
                {game.genre}
              </span>

            )}



            <h2
              className="
                text-2xl
                font-bold
              "
            >
              {game.title}
            </h2>



            <p
              className="
                mt-3
                text-slate-400
                line-clamp-3
              "
            >
              {game.description}
            </p>



            {game.release_date && (

              <p
                className="
                  mt-3
                  text-sm
                  text-cyan-400
                "
              >
                Release:
                {" "}
                {game.release_date}
              </p>

            )}



            <div className="mt-6">

              <BrandButton variant="secondary">
                View Game
              </BrandButton>

            </div>


          </BrandCard>

        ))}


      </section>


    </main>

  );
}