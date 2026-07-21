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


      {/* Header */}

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
          PulsePlay Store
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
          Level up your setup with gaming gear,
          accessories, and equipment selected
          for the PulsePlay community.
        </p>



      </section>






      {loading && (

        <BrandCard>

          <div className="flex items-center gap-3">

            <span className="pp-live-dot" />

            <p className="text-slate-400">
              Loading gaming gear...
            </p>

          </div>

        </BrandCard>

      )}







      {!loading && products.length === 0 && (

        <BrandCard>

          <h2
            className="
              text-2xl
              font-bold
              text-white
            "
          >
            Store Coming Soon
          </h2>


          <p
            className="
              mt-3
              text-slate-400
            "
          >
            Products will appear here once
            they are added through the PulsePlay
            Admin Dashboard.
          </p>


        </BrandCard>

      )}







      {!loading && products.length > 0 && (

        <section
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-8
          "
        >



          {products.map((product) => (


            <BrandCard
              key={product.id}
              className="
                card-hover
              "
            >



              {product.image ? (

                <img

                  src={product.image}

                  alt={product.name}

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
                  No Image Available
                </div>

              )}






              {product.category && (

                <span
                  className="
                    inline-flex
                    mt-5
                    rounded-full
                    bg-cyan-500/10
                    border
                    border-cyan-500/20
                    px-3
                    py-1
                    text-sm
                    font-bold
                    text-cyan-400
                  "
                >
                  {product.category}
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
                {product.name}
              </h2>






              {product.description && (

                <p
                  className="
                    mt-3
                    text-slate-400
                    line-clamp-3
                  "
                >
                  {product.description}
                </p>

              )}







              <div className="mt-6">


                {product.url ? (

                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
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

      )}



    </main>

  );

}