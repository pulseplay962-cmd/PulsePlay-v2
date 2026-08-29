import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import BrandCard from "../ui/BrandCard";
import BrandButton from "../ui/BrandButton";

import { getFeaturedProducts } from "../../services/products";

type Product = {
  id: string;
  name: string;
  description?: string | null;
  price: string;
  image: string;
  link: string;
  featured: boolean;
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);

        const data = await getFeaturedProducts();

        setProducts((data || []) as Product[]);
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

    loadProducts();
  }, []);

  const featuredProducts = useMemo(
    () => products.filter((product) => product.featured !== false).slice(0, 6),
    [products]
  );

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <BrandCard scan className="p-8 md:p-10">
          <div className="flex items-center gap-4">
            <span className="pp-live-dot h-3 w-3 rounded-full bg-purple-400" />

            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-purple-400">
                PulsePlay Loadout Network
              </p>

              <h2 className="mt-2 text-3xl font-black uppercase text-white md:text-4xl">
                SYNCHRONIZING LOADOUTS...
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Establishing connection to the PulsePlay gear database.
              </p>
            </div>
          </div>
        </BrandCard>
      </section>
    );
  }

  if (!featuredProducts.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <BrandCard scan className="p-6 md:p-8 lg:p-10">

        {/* =========================
            LOADOUT HEADER
        ========================= */}

        <div
          className="
            mb-10
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
              <span className="pp-live-dot h-3 w-3 rounded-full bg-purple-400" />

              <p
                className="
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.35em]
                  text-purple-400
                "
              >
                PulsePlay Loadout Network
              </p>
            </div>

            <h2
              className="
                mt-3
                text-4xl
                font-black
                uppercase
                tracking-tight
                pp-gradient-text
                md:text-5xl
              "
            >
              Featured Loadouts
            </h2>

            <p className="mt-3 max-w-2xl text-slate-400">
              Gaming gear, creator equipment, and accessories
              selected for the PulsePlay network.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div
              className="
                rounded-xl
                border
                border-purple-500/20
                bg-black/30
                px-5
                py-3
                text-center
              "
            >
              <p className="text-2xl font-black text-white">
                {featuredProducts.length}
              </p>

              <p
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.25em]
                  text-slate-500
                "
              >
                Loadouts
              </p>
            </div>

            <Link to="/store">
              <BrandButton variant="secondary">
                Open Armory →
              </BrandButton>
            </Link>
          </div>
        </div>

        {/* =========================
            LOADOUT GRID
        ========================= */}

        <div
          className="
            grid
            gap-6
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {featuredProducts.map((product, index) => (
            <BrandCard
              key={product.id}
              className="
                group
                flex
                h-full
                flex-col
                overflow-hidden
                p-0
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-purple-400/40
                hover:shadow-[0_0_35px_rgba(168,85,247,.12)]
              "
            >

              {/* =========================
                  PRODUCT IMAGE
              ========================= */}

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
                      duration-700
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
                      bg-black/50
                      text-xs
                      font-black
                      uppercase
                      tracking-[0.25em]
                      text-slate-600
                    "
                  >
                    No Loadout Image
                  </div>
                )}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black
                    via-black/20
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
                    bg-black/75
                    px-3
                    py-1.5
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.2em]
                    text-cyan-300
                    backdrop-blur-md
                  "
                >
                  LOADOUT {String(index + 1).padStart(2, "0")}
                </div>

                {/* STATUS */}

                <div
                  className="
                    absolute
                    right-4
                    top-4
                    rounded-lg
                    border
                    border-purple-400/30
                    bg-black/75
                    px-3
                    py-1.5
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.2em]
                    text-purple-300
                    backdrop-blur-md
                  "
                >
                  FEATURED
                </div>

                {/* IMAGE BOTTOM LABEL */}

                <div className="absolute bottom-4 left-4">
                  <span
                    className="
                      rounded-full
                      border
                      border-white/10
                      bg-black/70
                      px-3
                      py-1
                      text-[9px]
                      font-black
                      uppercase
                      tracking-[0.2em]
                      text-slate-300
                      backdrop-blur-md
                    "
                  >
                    GAMING EQUIPMENT
                  </span>
                </div>
              </div>

              {/* =========================
                  PRODUCT CONTENT
              ========================= */}

              <div className="flex flex-1 flex-col p-6">

                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-purple-400">
                    LOADOUT INTEL
                  </span>

                  <span className="h-px flex-1 bg-white/10" />
                </div>

                <h3
                  className="
                    mt-3
                    text-2xl
                    font-black
                    leading-tight
                    text-white
                    transition-colors
                    duration-300
                    group-hover:text-cyan-300
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

                {/* DATA READOUT */}

                <div
                  className="
                    mt-6
                    grid
                    grid-cols-2
                    gap-3
                    border-y
                    border-white/10
                    py-4
                  "
                >
                  <div>
                    <p
                      className="
                        text-[9px]
                        font-black
                        uppercase
                        tracking-[0.2em]
                        text-slate-600
                      "
                    >
                      Status
                    </p>

                    <div className="mt-1 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,.7)]" />

                      <p className="text-sm font-bold text-green-300">
                        AVAILABLE
                      </p>
                    </div>
                  </div>

                  <div>
                    <p
                      className="
                        text-[9px]
                        font-black
                        uppercase
                        tracking-[0.2em]
                        text-slate-600
                      "
                    >
                      Classification
                    </p>

                    <p className="mt-1 text-sm font-bold text-white">
                      FEATURED GEAR
                    </p>
                  </div>
                </div>

                {/* PRICE + CTA */}

                <div className="mt-auto pt-5">
                  <div
                    className="
                      flex
                      flex-col
                      gap-4
                      sm:flex-row
                      sm:items-end
                      sm:justify-between
                    "
                  >
                    <div>
                      <p
                        className="
                          text-[9px]
                          font-black
                          uppercase
                          tracking-[0.25em]
                          text-slate-600
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
                        group/cta
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-cyan-500/30
                        bg-cyan-500/10
                        px-5
                        py-3
                        text-xs
                        font-black
                        uppercase
                        tracking-widest
                        text-cyan-300
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-cyan-400/60
                        hover:bg-cyan-500/20
                        hover:text-white
                      "
                    >
                      Deploy
                      <span className="transition-transform group-hover/cta:translate-x-1">
                        →
                      </span>
                    </a>
                  </div>
                </div>

              </div>
            </BrandCard>
          ))}
        </div>

        {/* =========================
            LOADOUT FOOTER
        ========================= */}

        <div
          className="
            mt-8
            flex
            flex-col
            gap-4
            rounded-2xl
            border
            border-white/10
            bg-black/20
            p-5
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">
              PulsePlay Equipment Network
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Upgrade your setup. Equip your station. Enter the next mission.
            </p>
          </div>

          <Link to="/store">
            <BrandButton>
              Browse All Merchandise →
            </BrandButton>
          </Link>
        </div>

      </BrandCard>
    </section>
  );
}
