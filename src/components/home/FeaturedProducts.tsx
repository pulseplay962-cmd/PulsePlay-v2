import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BrandCard from "../ui/BrandCard";
import BrandButton from "../ui/BrandButton";

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


    } catch (error) {

      console.error(
        "Failed to load featured products:",
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

      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-4xl font-black pp-gradient-text">
          Featured Gear
        </h2>

        <p className="mt-4 text-slate-400">
          Loading gaming gear...
        </p>

      </section>

    );

  }





  if (!products.length) {

    return null;

  }





  return (

    <section
      className="
        max-w-7xl
        mx-auto
        px-6
        py-16
      "
    >


      <div
        className="
          flex
          flex-col
          md:flex-row
          justify-between
          md:items-center
          gap-6
        "
      >

        <div>

          <h2 className="text-4xl font-black pp-gradient-text">
            Featured Gear
          </h2>


          <p className="mt-3 text-slate-400">
            Gaming accessories and equipment recommended by PulsePlay.
          </p>


        </div>



        <Link to="/store">

          <BrandButton>
            View Store
          </BrandButton>

        </Link>


      </div>





      <div
        className="
          mt-10
          grid
          gap-8
          md:grid-cols-2
          lg:grid-cols-3
        "
      >


        {products.map((product) => (

          <BrandCard
            key={product.id}
            className="card-hover"
          >


            <img
              src={product.image}
              alt={product.name}
              className="
                h-64
                w-full
                object-cover
                rounded-xl
              "
            />



            <h3
              className="
                mt-6
                text-2xl
                font-bold
                text-white
              "
            >
              {product.name}
            </h3>



            <p className="mt-3 text-slate-400 line-clamp-3">
              {product.description}
            </p>



            <p
              className="
                mt-5
                text-xl
                font-black
                text-cyan-400
              "
            >
              {product.price}
            </p>



            <div className="mt-6">

              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
              >

                <BrandButton>
                  View Product
                </BrandButton>

              </a>

            </div>


          </BrandCard>

        ))}


      </div>


    </section>

  );

}