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

    <div
      className="
      group
      relative
      overflow-hidden
      rounded-2xl
      pp-card
      "
    >


      {/* Scan Effect */}

      <div
        className="
        absolute
        inset-0
        opacity-0
        group-hover:opacity-100
        transition
        pp-scan
        "
      />





      {/* Featured Badge */}

      {game.featured && (

        <div
          className="
          absolute
          top-4
          left-4
          z-10
          rounded-full
          bg-yellow-400/20
          border
          border-yellow-400/50
          px-4
          py-1
          text-xs
          font-black
          tracking-widest
          text-yellow-300
          "
        >

          ★ LEGENDARY

        </div>

      )}






      {/* Game Image */}

      {game.image && (

        <div
          className="
          overflow-hidden
          "
        >

          <img

            src={game.image}

            alt={game.title}

            className="
            h-56
            w-full
            object-cover
            transition
            duration-500
            group-hover:scale-110
            "

          />

        </div>

      )}







      <div
        className="
        relative
        p-6
        "
      >




        {/* Status */}

        <div
          className="
          flex
          justify-between
          items-center
          mb-4
          text-xs
          uppercase
          tracking-widest
          "
        >

          <span
            className="
            text-green-400
            "
          >

            ● AVAILABLE

          </span>


          <span
            className="
            text-purple-300
            "
          >

            XP 95

          </span>


        </div>







        {/* Title */}

        <h3
          className="
          text-2xl
          font-black
          text-white
          "
        >

          {game.title}

        </h3>







        {/* Description */}

        <p
          className="
          mt-3
          text-slate-400
          leading-relaxed
          "
        >

          {game.description}

        </p>







        {/* Game Stats */}

        <div
          className="
          mt-6
          grid
          grid-cols-2
          gap-3
          text-sm
          "
        >

          <div
            className="
            pp-card-surface
            p-3
            "
          >

            <p className="text-slate-400">
              TYPE
            </p>

            <p className="font-bold text-cyan-300">
              ACTION
            </p>

          </div>



          <div
            className="
            pp-card-surface
            p-3
            "
          >

            <p className="text-slate-400">
              RATING
            </p>

            <p className="font-bold text-purple-300">
              ★★★★★
            </p>

          </div>


        </div>






        {/* Action Button */}

        <button
          className="
          mt-6
          w-full
          rounded-xl
          bg-purple-600/30
          border
          border-purple-400/40
          py-3
          font-bold
          tracking-widest
          text-white
          transition
          hover:bg-purple-600
          hover:shadow-[0_0_25px_rgba(139,92,246,.5)]
          "
        >

          ACCESS GAME

        </button>




      </div>


    </div>

  );

}