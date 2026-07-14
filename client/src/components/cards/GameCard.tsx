type Game = {
  id: string;
  title: string;
  description: string;
  image?: string;
  featured?: boolean;
};


type GameCardProps = {
  game: Game;
};


export default function GameCard({
  game,
}: GameCardProps) {

  return (

    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

      {game.image && (
        <img
          src={game.image}
          alt={game.title}
          className="mb-4 h-48 w-full rounded-xl object-cover"
        />
      )}


      <h3 className="text-2xl font-bold">
        {game.title}
      </h3>


      <p className="mt-3 text-gray-400">
        {game.description}
      </p>


      {game.featured && (
        <p className="mt-3 text-yellow-400">
          ⭐ Featured Game
        </p>
      )}

    </div>

  );
}