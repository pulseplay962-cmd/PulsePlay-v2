import { useEffect, useMemo, useState } from "react";

import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";

import {
  getProducts,
} from "../services/products";

type Product = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  image?: string;
  category?: string;
  link?: string;
};

function cleanImageUrl(image?: string) {
  if (!image) {
    return "";
  }

  if (image.startsWith("[")) {
    const markdownMatch = image.match(
      /\((https?:\/\/[^)]+)\)/
    );

    if (markdownMatch?.[1]) {
      return markdownMatch[1];
    }
  }

  return image;
}

function formatCategory(category?: string) {
  if (!category) {
    return "Uncategorized";
  }

  return category
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

export default function Store() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("all");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);

        const data = await getProducts();

        setProducts(data || []);
      } catch (error) {
        console.error(
          "Failed loading armory:",
          error
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        products
          .map((product) => product.category)
          .filter(
            (value): value is string =>
              Boolean(value)
          )
      )
    );

    return uniqueCategories.sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        category === "all" ||
        product.category === category;

      const matchesSearch =
        !query ||
        [
          product.name,
          product.description,
          product.category,
        ]
          .filter(Boolean)
          .some((value) =>
            value!
              .toLowerCase()
              .includes(query)
          );

      return matchesCategory && matchesSearch;
    });
  }, [products, search, category]);

  const productsWithLinks = products.filter(
    (product) => Boolean(product.link)
  ).length;

  return (
    <main className="min-h-[72vh] px-6 py-12">
      <div className="mx-auto max-w-7xl">

        {/* HERO */}

        <section
          className="
            relative
            mb-14
            overflow-hidden
            rounded-3xl
            border
            border-cyan-500/20
            bg-gradient-to-br
            from-cyan-950/30
            via-[#070b16]
            to-purple-950/50
            p-8
            shadow-[0_0_60px_rgba(34,211,238,.08)]
            md:p-12
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-72
              w-72
              rounded-full
              bg-cyan-500/10
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-32
              -left-24
              h-72
              w-72
              rounded-full
              bg-purple-500/10
              blur-3xl
            "
          />

          <div className="relative">
            <div
              className="
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-cyan-400/20
                bg-cyan-500/5
                px-5
                py-2
                text-xs
                font-black
                uppercase
                tracking-[0.35em]
                text-cyan-300
              "
            >
              <span className="pp-live-dot" />
              Gear Database Online
            </div>

            <h1
              className="
                mt-7
                text-5xl
                font-black
                leading-none
                pp-gradient-text
                md:text-7xl
              "
            >
              PulsePlay Armory
            </h1>

            <p
              className="
                mt-6
                max-w-3xl
                text-lg
                leading-8
                text-slate-300
              "
            >
              Discover gaming gear, hardware,
              accessories, and creator equipment
              selected for the PulsePlay player
              network.
            </p>

            {/* STATS */}

            <div
              className="
                mt-10
                grid
                grid-cols-2
                gap-4
                md:grid-cols-4
              "
            >
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Total Loadouts
                </p>

                <p className="mt-2 text-3xl font-black text-white">
                  {products.length}
                </p>
              </div>

              <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Categories
                </p>

                <p className="mt-2 text-3xl font-black text-purple-300">
                  {categories.length}
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Linked Gear
                </p>

                <p className="mt-2 text-3xl font-black text-cyan-300">
                  {productsWithLinks}
                </p>
              </div>

              <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Network
                </p>

                <p className="mt-2 text-sm font-black uppercase tracking-wider text-green-300">
                  Online
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LOADING */}

        {loading && (
          <BrandCard status="ARMORY SCAN">
            <div className="flex items-center gap-4">
              <span className="pp-live-dot" />

              <div>
                <p className="font-black uppercase tracking-widest text-cyan-400">
                  Scanning Equipment Database
                </p>

                <p className="mt-1 text-slate-400">
                  Retrieving available PulsePlay
                  loadouts...
                </p>
              </div>
            </div>
          </BrandCard>
        )}

        {/* EMPTY */}

        {!loading && products.length === 0 && (
          <BrandCard status="ARMORY OFFLINE">
            <div className="py-12 text-center">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-purple-400">
                No Equipment Detected
              </p>

              <h2 className="mt-4 text-3xl font-black text-white">
                The Armory Is Waiting
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                Products will appear here after they
                are deployed through the PulsePlay
                Command Center.
              </p>
            </div>
          </BrandCard>
        )}

        {/* ARMORY */}

        {!loading && products.length > 0 && (
          <section className="pb-16">

            <div
              className="
                mb-8
                flex
                flex-col
                gap-5
                lg:flex-row
                lg:items-end
                lg:justify-between
              "
            >
              <div>
                <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400">
                  Equipment Intelligence
                </p>

                <h2 className="mt-2 text-4xl font-black pp-gradient-text">
                  Available Loadouts
                </h2>

                <p className="mt-3 max-w-2xl text-slate-400">
                  Search the PulsePlay Armory and
                  find equipment for your next
                  gaming setup.
                </p>
              </div>

              <div className="w-full lg:max-w-md">
                <label
                  htmlFor="product-search"
                  className="sr-only"
                >
                  Search products
                </label>

                <input
                  id="product-search"
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search gear, hardware, accessories..."
                  className="
                    w-full
                    rounded-xl
                    border
                    border-cyan-500/20
                    bg-black/30
                    px-5
                    py-3
                    text-white
                    outline-none
                    transition
                    placeholder:text-slate-600
                    focus:border-cyan-400/50
                    focus:ring-2
                    focus:ring-cyan-500/10
                  "
                />
              </div>
            </div>

            {/* CATEGORY FILTERS */}

            <div className="mb-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setCategory("all")}
                className={`
                  rounded-xl
                  border
                  px-5
                  py-2.5
                  text-sm
                  font-black
                  uppercase
                  tracking-wider
                  transition-all
                  ${
                    category === "all"
                      ? "border-cyan-400/50 bg-cyan-500/15 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,.12)]"
                      : "border-white/10 bg-white/5 text-slate-400 hover:border-cyan-500/30 hover:text-cyan-300"
                  }
                `}
              >
                All Gear
              </button>

              {categories.map((item) => {
                const active = category === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      setCategory(item)
                    }
                    className={`
                      rounded-xl
                      border
                      px-5
                      py-2.5
                      text-sm
                      font-black
                      uppercase
                      tracking-wider
                      transition-all
                      ${
                        active
                          ? "border-purple-400/50 bg-purple-500/15 text-purple-300 shadow-[0_0_20px_rgba(168,85,247,.12)]"
                          : "border-white/10 bg-white/5 text-slate-400 hover:border-purple-500/30 hover:text-purple-300"
                      }
                    `}
                  >
                    {formatCategory(item)}
                  </button>
                );
              })}
            </div>

            {/* RESULTS */}

            {filteredProducts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => {
                  const imageUrl =
                    cleanImageUrl(product.image);

                  return (
                    <BrandCard
                      key={product.id}
                      className="
                        group
                        h-full
                        overflow-hidden
                        p-0
                        transition-all
                        duration-300
                        hover:-translate-y-2
                        hover:border-cyan-400/30
                      "
                      status="LOADOUT INTELLIGENCE"
                    >
                      <div className="relative overflow-hidden">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={product.name}
                            className="
                              h-60
                              w-full
                              object-cover
                              transition
                              duration-500
                              group-hover:scale-105
                            "
                            onError={(event) => {
                              event.currentTarget.style.display =
                                "none";
                            }}
                          />
                        ) : (
                          <div
                            className="
                              flex
                              h-60
                              items-center
                              justify-center
                              bg-black/40
                              text-sm
                              font-bold
                              uppercase
                              tracking-wider
                              text-slate-500
                            "
                          >
                            No Equipment Image
                          </div>
                        )}

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

                        {product.category && (
                          <span
                            className="
                              absolute
                              bottom-4
                              left-4
                              rounded-full
                              border
                              border-purple-400/30
                              bg-purple-500/20
                              px-3
                              py-1
                              text-[11px]
                              font-black
                              uppercase
                              tracking-wider
                              text-purple-200
                              backdrop-blur
                            "
                          >
                            {formatCategory(
                              product.category
                            )}
                          </span>
                        )}
                      </div>

                      <div className="flex h-full flex-col p-6">
                        <div>
                          <div className="flex items-start justify-between gap-4">
                            <h3
                              className="
                                text-2xl
                                font-black
                                text-white
                                transition
                                group-hover:text-cyan-300
                              "
                            >
                              {product.name}
                            </h3>

                            {product.price !== undefined &&
                              product.price !== null && (
                                <span className="shrink-0 text-lg font-black text-cyan-300">
                                  $
                                  {Number(
                                    product.price
                                  ).toFixed(2)}
                                </span>
                              )}
                          </div>

                          {product.description && (
                            <p
                              className="
                                mt-4
                                line-clamp-3
                                text-sm
                                leading-7
                                text-slate-400
                              "
                            >
                              {product.description}
                            </p>
                          )}
                        </div>

                        <div
                          className="
                            mt-6
                            grid
                            grid-cols-2
                            gap-3
                          "
                        >
                          <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                              Status
                            </p>

                            <p className="mt-1 text-sm font-black uppercase text-green-400">
                              Available
                            </p>
                          </div>

                          <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                              Access
                            </p>

                            <p className="mt-1 text-sm font-black uppercase text-cyan-400">
                              {product.link
                                ? "Linked"
                                : "Intel"}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6">
                          {product.link ? (
                            <a
                              href={product.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View ${product.name}`}
                            >
                              <BrandButton>
                                Equip Loadout →
                              </BrandButton>
                            </a>
                          ) : (
                            <BrandButton
                              variant="secondary"
                              type="button"
                            >
                              View Item
                            </BrandButton>
                          )}
                        </div>
                      </div>
                    </BrandCard>
                  );
                })}
              </div>
            ) : (
              <BrandCard status="NO EQUIPMENT FOUND">
                <div className="py-10 text-center">
                  <h3 className="text-2xl font-black text-white">
                    No Loadouts Found
                  </h3>

                  <p className="mt-3 text-slate-400">
                    Try another search or select a
                    different equipment category.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setCategory("all");
                    }}
                    className="
                      mt-6
                      rounded-xl
                      border
                      border-cyan-500/30
                      bg-cyan-500/10
                      px-6
                      py-3
                      font-black
                      uppercase
                      tracking-wider
                      text-cyan-300
                      transition
                      hover:bg-cyan-500/20
                    "
                  >
                    Reset Armory
                  </button>
                </div>
              </BrandCard>
            )}

          </section>
        )}

      </div>
    </main>
  );
}
