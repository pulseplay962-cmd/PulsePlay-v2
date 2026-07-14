import { useEffect, useState } from "react";
import { getProducts } from "../services/products";

type Product = {
  id: string;
  name: string;
  description: string;
  price?: number;
  image?: string;
  category?: string;
  link?: string;
};


export default function Store() {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  useEffect(() => {

    async function loadProducts() {

      try {

        const data = await getProducts();

        setProducts(data || []);


      } catch (err) {

        console.error(
          "Failed to load products:",
          err
        );

        setError(
          "Unable to load products."
        );


      } finally {

        setLoading(false);

      }

    }


    loadProducts();

  }, []);




  if (loading) {

    return (

      <div className="mx-auto max-w-7xl px-6 py-24 text-white">

        <h1 className="text-5xl font-black">
          PulsePlay Store
        </h1>


        <p className="mt-4 text-gray-400">
          Loading products...
        </p>

      </div>

    );

  }





  return (

    <div className="mx-auto max-w-7xl px-6 py-24 text-white">


      <h1 className="text-5xl font-black">
        PulsePlay Store
      </h1>


      <p className="mt-4 text-gray-400">
        Gear up with products selected for gamers.
      </p>



      {error && (

        <p className="mt-8 rounded-xl bg-red-500/20 p-4 text-red-300">
          {error}
        </p>

      )}






      <div className="mt-12 grid gap-8 md:grid-cols-3">


        {products.map((product)=>(

          <div

            key={product.id}

            className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-cyan-400"

          >



            {product.image ? (

              <img

                src={product.image}

                alt={product.name}

                className="h-56 w-full rounded-xl object-cover"

              />

            ) : (

              <div className="flex h-56 items-center justify-center rounded-xl bg-white/5 text-5xl">

                🎮

              </div>

            )}






            <h2 className="mt-5 text-2xl font-bold">

              {product.name}

            </h2>






            {product.category && (

              <p className="mt-2 text-purple-400">

                {product.category}

              </p>

            )}







            <p className="mt-3 text-gray-400">

              {product.description}

            </p>







            {product.price !== undefined && (

              <p className="mt-4 text-xl font-bold text-cyan-400">

                ${product.price}

              </p>

            )}








            {product.link && (

              <a

                href={product.link}

                target="_blank"

                rel="noopener noreferrer"

                className="mt-5 inline-block rounded-lg bg-purple-600 px-5 py-2 font-bold transition hover:bg-purple-500"

              >

                View Product

              </a>

            )}




          </div>

        ))}



      </div>







      {products.length === 0 && (

        <p className="mt-10 text-gray-400">

          No products available yet.

        </p>

      )}




    </div>

  );

}