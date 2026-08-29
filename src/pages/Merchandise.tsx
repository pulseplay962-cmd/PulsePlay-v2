import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { getMerchandise } from "../services/merchandise";

import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";

type MerchandiseItem = {
  id: string;
  name: string;
  description?: string;
  category?: string;
  collection?: string;
  price: number;
  image_url?: string;
  images?: string[];
  product_url?: string;
  sku?: string;
  supplier?: string;
  status?: string;
  featured?: boolean;
  feature?: boolean;
};

export default function Merchandise() {
  const [merchandise, setMerchandise] =
    useState<MerchandiseItem[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [collectionFilter, setCollectionFilter] =
    useState("all");

  const [selectedImages, setSelectedImages] =
    useState<Record<string, string>>({});

  useEffect(() => {
    async function loadMerchandise() {
      try {
        const data = await getMerchandise();

        setMerchandise(data || []);

        const defaults: Record<string, string> = {};

        (data || []).forEach(
          (item: MerchandiseItem) => {
            if (item.image_url) {
              defaults[item.id] = item.image_url;
            }
          }
        );

        setSelectedImages(defaults);
      } catch (error) {
        console.error(
          "Failed to load merchandise:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadMerchandise();
  }, []);

  const collections = useMemo(() => {
    return Array.from(
      new Set(
        merchandise
          .map(
            (item) =>
              item.collection || "PULSEPLAY"
          )
          .filter(Boolean)
      )
    );
  }, [merchandise]);

  const featuredItems = useMemo(() => {
    return merchandise.filter(
      (item) =>
        item.featured === true ||
        item.feature === true
    );
  }, [merchandise]);

  const filteredMerchandise = useMemo(() => {
    const query = search.trim().toLowerCase();

    return merchandise.filter((item) => {
      const collection =
        item.collection || "PULSEPLAY";

      const matchesCollection =
        collectionFilter === "all" ||
        collection === collectionFilter;

      const matchesSearch =
        !query ||
        [
          item.name,
          item.description,
          item.category,
          item.collection,
          item.supplier,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value)
              .toLowerCase()
              .includes(query)
          );

      return (
        matchesCollection &&
        matchesSearch
      );
    });
  }, [
    merchandise,
    search,
    collectionFilter,
  ]);

  const availableCount = useMemo(() => {
    return merchandise.filter(
      (item) =>
        !item.status ||
        item.status.toLowerCase() ===
          "available"
    ).length;
  }, [merchandise]);

  if (loading) {
    return (
      <main className="min-h-[72vh] px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <BrandCard status="LOCKER INITIALIZING">
            <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
              <div className="h-12 w-12 animate-spin rounded-full border-2 border-cyan-400/20 border-t-cyan-400" />

              <p className="mt-6 text-xs font-black uppercase tracking-[0.4em] text-cyan-400">
                Inventory Scanner Active
              </p>

              <h1 className="mt-4 text-4xl font-black pp-gradient-text">
                Loading PulsePlay Locker
              </h1>

              <p className="mt-4 text-slate-400">
                Scanning the latest PulsePlay drops...
              </p>
            </div>
          </BrandCard>
        </div>
      </main>
    );
  }

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
            border-pink-500/20
            bg-gradient-to-br
            from-purple-950/50
            via-[#070b16]
            to-pink-950/30
            p-8
            shadow-[0_0_60px_rgba(236,72,153,.08)]
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
              bg-pink-500/10
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
            <p className="text-xs font-black uppercase tracking-[0.45em] text-pink-400">
              PulsePlay Gear Division
            </p>

            <h1 className="mt-4 text-5xl font-black leading-none pp-gradient-text md:text-7xl">
              Player Locker
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Gear up with official PulsePlay apparel,
              creator drops, and gaming lifestyle items
              built for the player network.
            </p>

            {/* STATS */}

            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Total Drops
                </p>

                <p className="mt-2 text-3xl font-black text-white">
                  {merchandise.length}
                </p>
              </div>

              <div className="rounded-2xl border border-pink-500/20 bg-pink-500/5 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Featured
                </p>

                <p className="mt-2 text-3xl font-black text-pink-300">
                  {featuredItems.length}
                </p>
              </div>

              <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Collections
                </p>

                <p className="mt-2 text-3xl font-black text-purple-300">
                  {collections.length}
                </p>
              </div>

              <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Available
                </p>

                <p className="mt-2 text-3xl font-black text-green-300">
                  {availableCount}
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* EMPTY STATE */}

        {merchandise.length === 0 && (
          <BrandCard status="LOCKER EMPTY">
            <div className="py-12 text-center">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-pink-400">
                No Inventory Data
              </p>

              <h2 className="mt-4 text-3xl font-black text-white">
                No Merchandise Available
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                New PulsePlay drops will appear here
                when they are deployed through the
                Command Center.
              </p>
            </div>
          </BrandCard>
        )}

        {merchandise.length > 0 && (
          <>
            {/* FEATURED DROPS */}

            {featuredItems.length > 0 && (
              <section className="mb-14">
                <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.4em] text-yellow-400">
                      Priority Inventory
                    </p>

                    <h2 className="mt-2 text-4xl font-black pp-gradient-text">
                      Featured Drops
                    </h2>

                    <p className="mt-3 max-w-3xl text-slate-400">
                      Limited highlights and selected
                      PulsePlay gear currently receiving
                      the spotlight.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setCollectionFilter("all");
                      setSearch("");
                    }}
                    className="
                      rounded-xl
                      border
                      border-pink-500/30
                      bg-pink-500/10
                      px-5
                      py-3
                      text-sm
                      font-black
                      uppercase
                      tracking-wider
                      text-pink-300
                      transition
                      hover:bg-pink-500/20
                    "
                  >
                    Browse All Drops
                  </button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {featuredItems
                    .slice(0, 3)
                    .map((item) => (
                      <MerchandiseCard
                        key={item.id}
                        item={item}
                        selectedImage={
                          selectedImages[item.id]
                        }
                        onSelectImage={(image) =>
                          setSelectedImages(
                            (current) => ({
                              ...current,
                              [item.id]: image,
                            })
                          )
                        }
                      />
                    ))}
                </div>
              </section>
            )}

            {/* FULL LOCKER */}

            <section className="pb-16">
              <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400">
                    Complete Inventory
                  </p>

                  <h2 className="mt-2 text-4xl font-black pp-gradient-text">
                    Browse The Locker
                  </h2>

                  <p className="mt-3 text-slate-400">
                    Search PulsePlay drops and explore
                    the complete merchandise collection.
                  </p>
                </div>

                <div className="w-full lg:max-w-md">
                  <label
                    htmlFor="merchandise-search"
                    className="sr-only"
                  >
                    Search merchandise
                  </label>

                  <input
                    id="merchandise-search"
                    type="search"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search drops, collections, categories..."
                    className="
                      w-full
                      rounded-xl
                      border
                      border-pink-500/20
                      bg-black/30
                      px-5
                      py-3
                      text-white
                      outline-none
                      transition
                      placeholder:text-slate-600
                      focus:border-pink-400/50
                      focus:ring-2
                      focus:ring-pink-500/10
                    "
                  />
                </div>
              </div>

              {/* COLLECTION FILTERS */}

              <div className="mb-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setCollectionFilter("all")
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
                      collectionFilter === "all"
                        ? "border-pink-400/50 bg-pink-500/15 text-pink-300 shadow-[0_0_20px_rgba(236,72,153,.12)]"
                        : "border-white/10 bg-white/5 text-slate-400 hover:border-pink-500/30 hover:text-pink-300"
                    }
                  `}
                >
                  All Drops
                </button>

                {collections.map((collection) => (
                  <button
                    key={collection}
                    type="button"
                    onClick={() =>
                      setCollectionFilter(collection)
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
                        collectionFilter === collection
                          ? "border-pink-400/50 bg-pink-500/15 text-pink-300 shadow-[0_0_20px_rgba(236,72,153,.12)]"
                          : "border-white/10 bg-white/5 text-slate-400 hover:border-pink-500/30 hover:text-pink-300"
                      }
                    `}
                  >
                    {collection}
                  </button>
                ))}
              </div>

              {filteredMerchandise.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredMerchandise.map((item) => (
                    <MerchandiseCard
                      key={item.id}
                      item={item}
                      selectedImage={
                        selectedImages[item.id]
                      }
                      onSelectImage={(image) =>
                        setSelectedImages(
                          (current) => ({
                            ...current,
                            [item.id]: image,
                          })
                        )
                      }
                    />
                  ))}
                </div>
              ) : (
                <BrandCard status="NO INVENTORY MATCHES">
                  <div className="py-10 text-center">
                    <h3 className="text-2xl font-black text-white">
                      No Drops Found
                    </h3>

                    <p className="mt-3 text-slate-400">
                      Try another search or switch to a
                      different PulsePlay collection.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setCollectionFilter("all");
                      }}
                      className="
                        mt-6
                        rounded-xl
                        border
                        border-pink-500/30
                        bg-pink-500/10
                        px-6
                        py-3
                        font-black
                        uppercase
                        tracking-wider
                        text-pink-300
                        transition
                        hover:bg-pink-500/20
                      "
                    >
                      Reset Locker
                    </button>
                  </div>
                </BrandCard>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}

type MerchandiseCardProps = {
  item: MerchandiseItem;
  selectedImage?: string;
  onSelectImage: (image: string) => void;
};

function MerchandiseCard({
  item,
  selectedImage,
  onSelectImage,
}: MerchandiseCardProps) {
  const gallery = [
    item.image_url,
    ...(item.images || []),
  ].filter(Boolean) as string[];

  const activeImage =
    selectedImage ||
    gallery[0] ||
    "/images/pulseplay-placeholder.jpg";

  const isFeatured =
    item.featured === true ||
    item.feature === true;

  const isAvailable =
    !item.status ||
    item.status.toLowerCase() === "available";

  return (
    <BrandCard className="group card-hover overflow-hidden">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30">
        <img
          src={activeImage}
          alt={item.name}
          className="
            h-72
            w-full
            object-cover
            transition
            duration-700
            group-hover:scale-105
          "
        />

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />

        {isFeatured && (
          <span className="absolute left-4 top-4 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-yellow-300">
            ⭐ Featured Drop
          </span>
        )}

        <span
          className={`
            absolute
            bottom-4
            right-4
            rounded-full
            border
            px-3
            py-1
            text-[10px]
            font-black
            uppercase
            tracking-widest
            ${
              isAvailable
                ? "border-green-400/30 bg-green-500/10 text-green-300"
                : "border-slate-500/30 bg-slate-500/10 text-slate-400"
            }
          `}
        >
          {isAvailable
            ? "Inventory Ready"
            : item.status || "Unavailable"}
        </span>
      </div>

      {gallery.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {gallery.map((image, index) => {
            const active =
              activeImage === image;

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() =>
                  onSelectImage(image)
                }
                className={`
                  h-16
                  w-16
                  shrink-0
                  overflow-hidden
                  rounded-xl
                  border
                  transition
                  ${
                    active
                      ? "border-pink-400 shadow-[0_0_18px_rgba(236,72,153,.18)]"
                      : "border-white/10 hover:border-pink-400/50"
                  }
                `}
                aria-label={`View image ${index + 1} of ${item.name}`}
              >
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-5 flex items-center justify-between gap-4">
        <span className="rounded-full border border-pink-400/20 bg-pink-500/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-pink-300">
          {item.collection || "PulsePlay"}
        </span>

        <span className="text-xs font-black uppercase tracking-widest text-slate-500">
          {item.category || "Apparel"}
        </span>
      </div>

      <h3 className="mt-5 text-2xl font-black text-white">
        {item.name}
      </h3>

      <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-400">
        {item.description ||
          "Official PulsePlay gear built for the player network."}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
        <div className="rounded-xl border border-cyan-500/10 bg-cyan-500/5 p-3">
          <p className="font-black uppercase tracking-widest text-slate-500">
            Class
          </p>

          <p className="mt-1 font-bold text-cyan-300">
            {item.category || "Apparel"}
          </p>
        </div>

        <div className="rounded-xl border border-purple-500/10 bg-purple-500/5 p-3">
          <p className="font-black uppercase tracking-widest text-slate-500">
            Rarity
          </p>

          <p className="mt-1 font-bold text-purple-300">
            {isFeatured
              ? "Legendary"
              : "Standard"}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="text-2xl font-black text-pink-300">
          ${Number(item.price).toFixed(2)}
        </span>

        <Link to={`/merchandise/${item.id}`}>
          <BrandButton>
            VIEW DROP
          </BrandButton>
        </Link>
      </div>
    </BrandCard>
  );
}
