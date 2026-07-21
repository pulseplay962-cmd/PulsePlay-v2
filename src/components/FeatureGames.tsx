import BrandCard from "./ui/BrandCard";
import BrandButton from "./ui/BrandButton";

type Game = {
  id: string;
  title: string;
  description: string;
  image?: string;
  genre?: string;
};


type FeaturedGamesProps = {
  games?: Game[];
};


export default function FeaturedGames({
  games = [],
}: FeaturedGamesProps) {

  return (
    <section className="mt-16">

      <div className="mb-8">

        <h2
          className="
            text-3xl
            md:text-4xl
            font-black
            pp-gradient-text
          "
        >
          Featured Games
        </h2>

        <p
          className="
            mt-2
            text-slate-400
          "
        >
          Discover the games powering the PulsePlay community.
        </p>

      </div>


      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
      >

        {games.length === 0 && (

          <BrandCard>

            <h3 className="text-xl font-bold">
              No games available
            </h3>

            <p className="mt-2 text-slate-400">
              Add featured games from the admin dashboard.
            </p>

          </BrandCard>

        )}


        {games.map((game) => (

          <BrandCard key={game.id}>

            {game.image && (

              <img
                src={game.image}
                alt={game.title}
                className="
                  w-full
                  h-48
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
                  text-xs
                  bg-purple-500/20
                  text-purple-300
                  mb-3
                "
              >
                {game.genre}
              </span>

            )}


            <h3
              className="
                text-2xl
                font-bold
                text-white
              "
            >
              {game.title}
            </h3>


            <p
              className="
                mt-3
                text-slate-400
                line-clamp-3
              "
            >
              {game.description}
            </p>


            <div className="mt-6">

              <BrandButton variant="secondary">
                View Game
              </BrandButton>

            </div>


          </BrandCard>

        ))}

      </div>

    </section>
  );
}