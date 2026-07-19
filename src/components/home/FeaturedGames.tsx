import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "../../services/products";

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  link: string;
  featured: boolean;
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    try {
      const data = await getFeaturedProducts();
      setProducts(data || []);
    } catch (err) {
      console.error("Failed to load featured products:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-4xl font-black text-white">
          Featured Gear
        </h2>

        <p className="mt-4 text-gray-400">
          Loading featured products...
        </p>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-4xl font-black text-white">
            Featured Gear
          </h2>

          <p className="mt-2 text-gray-400">
            Hand-picked gaming gear recommended by PulsePlay.
          </p>
        </div>

        <Link
          to="/store"
          className="rounded-lg bg-cyan-500 px-5 py-3 font-bold text-black transition hover:bg-cyan-400"
        >
          View Store
        </Link>

      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        {products.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#111827] shadow-lg transition hover:-translate-y-1 hover:border-cyan-400"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-64 w-full object-cover"
            />

            <div className="p-6">

              <h3 className="text-2xl font-bold text-white">
                {product.name}
              </h3>

              <p className="mt-3 text-sm text-gray-400">
                {product.description}
              </p>

              <p className="mt-4 text-xl font-bold text-cyan-400">
                {product.price}
              </p>

              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block w-full rounded-lg bg-cyan-500 py-3 text-center font-bold text-black transition hover:bg-cyan-400"
              >
                View on Amazon
              </a>

            </div>
          </div>
        ))}

      </div>
    </section>
  );
}