type MerchandiseItem = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
  category?: string;
  checkoutUrl?: string;
};


type Props = {
  item: MerchandiseItem;
};


export default function MerchandiseCard({ item }: Props) {
  return (
    <div
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-purple-500/30
        bg-[#0b1120]
        shadow-xl
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-cyan-400
        hover:shadow-cyan-400/20
      "
    >

      {/* Image Area */}
      <div
        className="
          relative
          aspect-square
          overflow-hidden
          bg-black
        "
      >

        <img
          src={item.image}
          alt={item.name}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-110
          "
        />


        {/* Neon Overlay */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/70
            via-transparent
            opacity-0
            transition
            group-hover:opacity-100
          "
        />


        {/* Badge */}
        {item.badge && (
          <span
            className="
              absolute
              left-4
              top-4
              rounded-full
              bg-purple-600
              px-4
              py-1
              text-xs
              font-black
              uppercase
              tracking-wide
              text-white
            "
          >
            {item.badge}
          </span>
        )}


      </div>


      {/* Content */}
      <div className="p-6">


        {item.category && (
          <p
            className="
              mb-3
              text-xs
              font-bold
              uppercase
              tracking-widest
              text-cyan-400
            "
          >
            {item.category}
          </p>
        )}


        <h2
          className="
            text-xl
            font-black
            text-white
            transition
            group-hover:text-cyan-400
          "
        >
          {item.name}
        </h2>


        <p
          className="
            mt-3
            text-sm
            leading-relaxed
            text-gray-400
          "
        >
          {item.description}
        </p>


        <div
          className="
            mt-6
            flex
            items-center
            justify-between
          "
        >

          <span
            className="
              text-2xl
              font-black
              text-cyan-400
            "
          >
            {item.price}
          </span>


          <a
            href={item.checkoutUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="
              rounded-lg
              bg-purple-600
              px-5
              py-2
              font-black
              text-white
              transition
              hover:bg-purple-500
            "
          >
            Shop Merch
          </a>


        </div>


      </div>


    </div>
  );
}