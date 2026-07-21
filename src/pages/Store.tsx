import { useEffect, useState } from "react";

import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";

import {
  getProducts,
} from "../services/products";


type Product = {
  id: string;
  name: string;
  description?: string;
  image?: string;
  category?: string;
  url?: string;
};


export default function Store() {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

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


    loadProducts();

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
          PulsePlay Store
        </h1>


        <p
          className="
            mt-4
            text-slate-400
            max-w-2xl
            mx-auto
          "
        >
          Gaming gear, accessories, and PulsePlay
          products selected for gamers.
        </p>


      </section>



      {loading && (

        <div
          className="
            text-center
            text-slate-400
          "
        >
          Loading products...
        </div>

      )}



      {!loading && products.length === 0 && (

        <BrandCard>

          <h2 className="text-2xl font-bold">
            Store Coming Soon
          </h2>


          <p
            className="
              mt-3
              text-slate-400
            "
          >
            Products will appear here once added
            through the PulsePlay Admin Dashboard.
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

        {products.map((product) => (

          <BrandCard key={product.id}>


            {product.image && (

              <img
                src={product.image}
                alt={product.name}
                className="
                  w-full
                  h-48
                  object-cover
                  rounded-xl
                  mb-5
                "
              />

            )}



            {product.category && (

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
                {product.category}
              </span>

            )}



            <h2
              className="
                text-2xl
                font-bold
              "
            >
              {product.name}
            </h2>



            <p
              className="
                mt-3
                text-slate-400
              "
            >
              {product.description}
            </p>



            <div className="mt-6">

              {product.url ? (

                <a
                  href={product.url}
                  target="_blank"
                  rel="noreferrer"
                >

                  <BrandButton>
                    View Deal
                  </BrandButton>

                </a>

              ) : (

                <BrandButton variant="secondary">
                  Learn More
                </BrandButton>

              )}

            </div>


          </BrandCard>

        ))}


      </section>


    </main>

  );
}