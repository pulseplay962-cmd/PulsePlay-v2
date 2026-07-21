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
          Game Library
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
          Explore featured games, upcoming releases,
          and the titles powering the PulsePlay community.
        </p>



      </section>








      {loading && (

        <BrandCard>


          <div className="flex items-center gap-3">

            <span className="pp-live-dot" />

            <p className="text-slate-400">
              Loading games...
            </p>


          </div>


        </BrandCard>

      )}








      {!loading && games.length === 0 && (

        <BrandCard>


          <h2
            className="
              text-2xl
              font-bold
              text-white
            "
          >
            No Games Available
          </h2>



          <p
            className="
              mt-3
              text-slate-400
            "
          >
            Add games through the PulsePlay
            Admin Dashboard.
          </p>


        </BrandCard>

      )}








      {!loading && games.length > 0 && (

        <section
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-8
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
                    h-56
                    w-full
                    rounded-xl
                    object-cover
                  "

                />


              ) : (

                <div
                  className="
                    h-56
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    bg-black/40
                    text-slate-500
                  "
                >
                  No Cover Image
                </div>

              )}








              {game.genre && (

                <span
                  className="
                    inline-flex
                    mt-5
                    rounded-full
                    border
                    border-purple-500/30
                    bg-purple-500/10
                    px-3
                    py-1
                    text-sm
                    font-bold
                    text-purple-300
                  "
                >
                  {game.genre}
                </span>

              )}








              <h2
                className="
                  mt-5
                  text-2xl
                  font-black
                  text-white
                "
              >
                {game.title}
              </h2>








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








              {game.release_date && (

                <p
                  className="
                    mt-4
                    text-sm
                    font-bold
                    text-cyan-400
                  "
                >
                  Release:
                  {" "}
                  {game.release_date}
                </p>

              )}








              <div className="mt-6">

                <BrandButton
                  variant="secondary"
                >
                  View Game
                </BrandButton>


              </div>





            </BrandCard>


          ))}



        </section>

      )}






    </main>

  );

}