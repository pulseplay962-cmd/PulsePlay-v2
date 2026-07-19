import { useEffect, useState } from "react";
import { getProducts } from "../services/products";

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  link: string;
  featured: boolean;
};

export default function Store() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    try {
      const data = await getProducts();

      setProducts(data || []);

    } catch (error) {
      console.error(
        "Failed to load products:",
        error
      );

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-xl">
        Loading store...
      </div>
    );
  }

  return (
    <div className="p-8">

      <h1 className="text-4xl font-black mb-8">
        PulsePlay Store
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-400">
          No products available yet.
        </p>
      ) : (

        <div className="grid gap-6 md:grid-cols-3">

          {products.map((product) => (

            <div
              key={product.id}
              className="rounded-xl bg-[#111827] p-5"
            >

              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-56 w-full rounded-lg object-cover"
                />
              )}

              <h2 className="mt-4 text-2xl font-bold">
                {product.name}
              </h2>

              <p className="mt-2 text-gray-400">
                {product.description}
              </p>

              <p className="mt-3 text-cyan-400 font-bold">
                {product.price}
              </p>


              {product.featured && (
                <p className="mt-2 text-yellow-400">
                  ⭐ Featured Gear
                </p>
              )}


              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-lg bg-cyan-500 px-5 py-3 font-bold text-black"
              >
                View on Amazon
              </a>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}