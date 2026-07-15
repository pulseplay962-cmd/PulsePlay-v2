interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  link: string;
  category: string;
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-[#10141f] overflow-hidden transition-all hover:-translate-y-1 hover:border-cyan-400">
      <img
        src={product.image}
        alt={product.name}
        className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
      />

      <div className="p-5">
        <h3 className="text-xl font-bold">
          {product.name}
        </h3>

        <p className="mt-2 text-cyan-400 font-semibold">
          ${product.price.toFixed(2)}
        </p>

        <a
          href={product.link}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-block rounded-xl bg-cyan-500 px-5 py-2 font-bold text-black transition hover:bg-cyan-400"
        >
          Buy Now
        </a>
      </div>
    </div>
  );
}