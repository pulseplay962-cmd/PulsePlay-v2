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
      setLoading(true);

      const data = await getFeaturedProducts();

      setProducts(data || []);
    } catch (error) {
      console.error(
        "Failed to load featured products:",
        error
      );

      setProducts([]);
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
        <div
          className="
            rounded-3xl
            border
            border-purple-500/20
            bg-[#080d18]
            p-8
          "
        >
          <p
            className="
              text-xs
              font-black
              uppercase
              tracking-[0.35em]
              text-purple-400
            "
          >
            Loadout System
          </p>

          <h2 className="mt-3 text-4xl font-black pp-gradient-text">
            Loading Gear...
          </h2>

          <p className="mt-3 text-slate-400">
            Synchronizing featured gaming equipment.
          </p>
        </div>
      </section>
    );
  }

  if (!products.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          gap-6
          md:flex-row
          md:items-end
          md:justify-between
        "
      >
        <div>
          <div className="flex items-center gap-3">
            <span
              className="
                h-2.5
                w-2.5
                rounded-full
                bg-cyan-400
                shadow-[0_0_14px_rgba(34,211,238,.8)]
              "
            />

            <p
              className="
                text-xs
                font-black
                uppercase
                tracking-[0.35em]
                text-cyan-400
              "
            >
              PulsePlay Loadout
            </p>
          </div>

          <h2
            className="
              mt-3
              text-4xl
              font-black
              uppercase
              pp-gradient-text
              md:text-5xl
            "
          >
            Featured Gear
          </h2>

          <p className="mt-3 max-w-2xl text-slate-400">
            Gaming accessories, equipment, and creator gear
            selected for the PulsePlay network.
          </p>
        </div>

        <Link to="/store">
          <BrandButton>
            View Full Loadout →
          </BrandButton>
        </Link>
      </div>

      {/* PRODUCT GRID */}

      <div
        className="
          mt-10
          grid
          gap-8
          md:grid-cols-2
          lg:grid-cols-3
        "
      >
        {products.map((product, index) => (
          <BrandCard
            key={product.id}
            className="
              group
              overflow-hidden
              p-0
              transition-all
              duration-300
              hover:-translate-y-2
            "
          >
            {/* PRODUCT IMAGE */}

            <div className="relative overflow-hidden">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="
                    h-64
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-64
                    items-center
                    justify-center
                    bg-black/40
                    text-slate-500
                  "
                >
                  No Image
                </div>
              )}

              {/* IMAGE OVERLAY */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/70
                  via-transparent
                  to-transparent
                "
              />

              {/* LOADOUT NUMBER */}

              <div
                className="
                  absolute
                  left-4
                  top-4
                  rounded-lg
                  border
                  border-cyan-400/30
                  bg-black/70
                  px-3
                  py-1
                  text-xs
                  font-black
                  tracking-widest
                  text-cyan-300
                  backdrop-blur-md
                "
              >
                LOADOUT {String(index + 1).padStart(2, "0")}
              </div>

              {/* FEATURED STATUS */}

              <div
                className="
                  absolute
                  right-4
                  top-4
                  rounded-lg
                  border
                  border-purple-400/30
                  bg-purple-500/10
                  px-3
                  py-1
                  text-[10px]
                  font-black
                  uppercase
                  tracking-widest
                  text-purple-300
                  backdrop-blur-md
                "
              >
                FEATURED
              </div>
            </div>

            {/* PRODUCT CONTENT */}

            <div className="p-6">
              <p
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.3em]
                  text-slate-500
                "
              >
                GAMING EQUIPMENT
              </p>

              <h3
                className="
                  mt-3
                  text-2xl
                  font-black
                  text-white
                "
              >
                {product.name}
              </h3>

              {product.description && (
                <p
                  className="
                    mt-3
                    line-clamp-3
                    text-sm
                    leading-6
                    text-slate-400
                  "
                >
                  {product.description}
                </p>
              )}

              {/* PRICE / CTA */}

              <div
                className="
                  mt-6
                  flex
                  items-center
                  justify-between
                  gap-4
                  border-t
                  border-white/10
                  pt-5
                "
              >
                <div>
                  <p
                    className="
                      text-[10px]
                      font-black
                      uppercase
                      tracking-widest
                      text-slate-500
                    "
                  >
                    LOADOUT COST
                  </p>

                  <p
                    className="
                      mt-1
                      text-2xl
                      font-black
                      text-cyan-400
                    "
                  >
                    {product.price}
                  </p>
                </div>

                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-cyan-500/30
                    bg-cyan-500/10
                    px-4
                    py-3
                    text-sm
                    font-black
                    uppercase
                    tracking-wider
                    text-cyan-300
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-cyan-500/20
                    hover:text-cyan-200
                  "
                >
                  Deploy →
                </a>
              </div>
            </div>
          </BrandCard>
        ))}
      </div>
    </section>
  );
}
