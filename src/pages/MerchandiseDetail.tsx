import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { supabase } from "../lib/supabase";

import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";

const PLACEHOLDER = "/images/pulseplay-placeholder.jpg";

type MerchandiseItem = {
  id: string;
  name: string;
  description?: string;
  category?: string;
  collection?: string;
  price?: number;
  image_url?: string;
  images?: string[];
  product_url?: string;
  sku?: string;
  supplier?: string;
  status?: string;
  feature?: boolean;
  featured?: boolean;
  printful_id?: number | null;
  printful_external_id?: string | null;
  variants?: MerchandiseVariant[];
};

type MerchandiseVariant = {
  id: number;
  external_id?: string;
  name: string;
  retail_price?: string;
  currency?: string;
  sku?: string;
  product?: {
    variant_id?: number;
    product_id?: number;
    image?: string;
    name?: string;
  };
  files?: {
    id?: number;
    type?: string;
    preview_url?: string;
    thumbnail_url?: string;
    filename?: string;
  }[];
};

export default function MerchandiseDetail() {
  const { id } = useParams();

  const [item, setItem] = useState<MerchandiseItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageError, setImageError] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  async function handleCheckout() {
    if (!item || !selectedVariant) {
      return;
    }

    try {
      const apiUrl =
        import.meta.env.VITE_API_URL ||
        "http://localhost:5000";

      const response = await fetch(
        `${apiUrl}/api/checkout/create-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            merchandiseId: item.id,
            variantId: selectedVariant.id,
            quantity: 1,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success || !data.checkout_url) {
        throw new Error(
          data.error || "Unable to start checkout."
        );
      }

      window.location.href = data.checkout_url;
    } catch (error) {
      console.error("Stripe checkout failed:", error);
      alert("Unable to start checkout. Please try again.");
    }
  }

  useEffect(() => {
    async function loadProduct() {
      try {
        const { data, error } = await supabase
          .from("merchandise")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        setItem(data as MerchandiseItem);

        const firstVariant = data?.variants?.[0];

        if (firstVariant?.name) {
          const parts = firstVariant.name.split(" / ");

          setSelectedColor(parts[1] || "");
          setSelectedSize(parts[2] || "");
        }

        setSelectedImage(
          data?.image_url ||
            data?.images?.[0] ||
            PLACEHOLDER
        );
      } catch (error) {
        console.error(
          "Failed loading merchandise:",
          error
        );

        setItem(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadProduct();
    } else {
      setLoading(false);
    }
  }, [id]);

  const gallery = useMemo(() => {
    if (!item) {
      return [];
    }

    return Array.from(
      new Set(
        [
          item.image_url,
          ...(item.images || []),
        ].filter(Boolean)
      )
    ) as string[];
  }, [item]);

  const isFeatured =
    Boolean(item?.featured) ||
    Boolean(item?.feature);

  const variantOptions = useMemo(() => {
    const variants = item?.variants || [];

    const colors = Array.from(
      new Set(
        variants
          .map((variant) => variant.name.split(" / ")[1])
          .filter(Boolean)
      )
    );

    const sizes = Array.from(
      new Set(
        variants
          .map((variant) => variant.name.split(" / ")[2])
          .filter(Boolean)
      )
    );

    return { colors, sizes };
  }, [item]);

  const selectedVariant = useMemo(() => {
    const variants = item?.variants || [];

    if (!selectedColor || !selectedSize) {
      return variants[0];
    }

    return (
      variants.find((variant) => {
        const parts = variant.name.split(" / ");
        return parts[1] === selectedColor && parts[2] === selectedSize;
      }) || variants[0]
    );
  }, [item, selectedColor, selectedSize]);

  const displayPrice = Number(
    selectedVariant?.retail_price || item?.price || 0
  );

  const displayImage =
    imageError || !selectedImage
      ? PLACEHOLDER
      : selectedImage;

  if (loading) {
    return (
      <main className="px-6 py-20">
        <section className="mx-auto max-w-6xl">
          <div className="pp-card-surface rounded-3xl p-12 text-center">
            <div className="mx-auto mb-6 h-4 w-4 animate-pulse rounded-full bg-pink-400 shadow-[0_0_25px_rgba(244,114,182,0.9)]" />

            <p className="text-xs font-black uppercase tracking-[0.35em] text-pink-300">
              Locker Access
            </p>

            <h1 className="mt-4 text-4xl font-black pp-gradient-text">
              LOADING LOADOUT...
            </h1>

            <p className="mt-4 text-slate-400">
              Retrieving merchandise intelligence.
            </p>
          </div>
        </section>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="px-6 py-20">
        <section className="mx-auto max-w-4xl">
          <BrandCard className="text-center">
            <div className="text-5xl">⚠️</div>

            <p className="mt-6 text-xs font-black uppercase tracking-[0.35em] text-red-300">
              Database Error
            </p>

            <h1 className="mt-4 text-4xl font-black">
              LOADOUT NOT FOUND
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              The requested merchandise record could not
              be located in the PulsePlay Locker.
            </p>

            <div className="mt-8">
              <Link to="/merchandise">
                <BrandButton>
                  RETURN TO LOCKER
                </BrandButton>
              </Link>
            </div>
          </BrandCard>
        </section>
      </main>
    );
  }

  return (
    <main className="px-4 py-10 sm:px-6 lg:py-14">
      <div className="mx-auto max-w-7xl">

        {/* ================================
            TOP NAVIGATION
        ================================= */}

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/merchandise"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-black
              uppercase
              tracking-widest
              text-slate-400
              transition
              hover:text-cyan-300
            "
          >
            ← Return to Locker
          </Link>

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-green-400/20
              bg-green-400/5
              px-4
              py-2
              text-xs
              font-black
              uppercase
              tracking-widest
              text-green-300
            "
          >
            <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
            Inventory Online
          </div>
        </div>

        {/* ================================
            PRODUCT HEADER
        ================================= */}

        <section className="mb-10">
          <div
            className="
              inline-flex
              items-center
              gap-3
              rounded-full
              pp-hud
              px-5
              py-2
              text-xs
              font-black
              uppercase
              tracking-[0.3em]
              text-pink-300
            "
          >
            👕 LOADOUT INTELLIGENCE
          </div>

          <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-purple-400">
                {item.collection || "PulsePlay Collection"}
              </p>

              <h1
                className="
                  mt-3
                  text-4xl
                  font-black
                  leading-tight
                  sm:text-5xl
                  lg:text-6xl
                  pp-gradient-text
                "
              >
                {item.name}
              </h1>
            </div>

            <div className="text-left lg:text-right">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                Loadout ID
              </p>

              <p className="mt-1 font-mono text-sm text-slate-300">
                {item.sku || item.id}
              </p>
            </div>
          </div>
        </section>

        {/* ================================
            MAIN PRODUCT AREA
        ================================= */}

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">

          {/* IMAGE SYSTEM */}

          <BrandCard className="overflow-hidden">
            <div className="relative">

              <div
                className="
                  absolute
                  left-5
                  top-5
                  z-10
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-cyan-400/20
                  bg-black/70
                  px-4
                  py-2
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.25em]
                  text-cyan-300
                  backdrop-blur-md
                "
              >
                <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
                Visual Feed
              </div>

              {isFeatured && (
                <div
                  className="
                    absolute
                    right-5
                    top-5
                    z-10
                    rounded-full
                    border
                    border-yellow-300/30
                    bg-yellow-400/10
                    px-4
                    py-2
                    text-[10px]
                    font-black
                    uppercase
                    tracking-widest
                    text-yellow-300
                    backdrop-blur-md
                  "
                >
                  ⭐ Featured Drop
                </div>
              )}

              <div
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-purple-500/20
                  bg-black/30
                "
              >
                <img
                  src={displayImage}
                  alt={item.name}
                  onError={() => setImageError(true)}
                  className="
                    aspect-square
                    w-full
                    object-cover
                    transition
                    duration-700
                    hover:scale-[1.02]
                  "
                />
              </div>
            </div>

            {/* GALLERY */}

            {gallery.length > 1 && (
              <div className="mt-5">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    Visual Archive
                  </p>

                  <p className="text-[10px] font-black uppercase tracking-widest text-purple-400">
                    {gallery.length} Images
                  </p>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-2">
                  {gallery.map((image, index) => {
                    const active =
                      selectedImage === image;

                    return (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => {
                          setSelectedImage(image);
                          setImageError(false);
                        }}
                        aria-label={`View image ${index + 1}`}
                        className={`
                          relative
                          h-20
                          w-20
                          shrink-0
                          overflow-hidden
                          rounded-xl
                          border
                          transition
                          duration-300
                          ${
                            active
                              ? "border-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                              : "border-purple-500/30 hover:border-purple-300/60"
                          }
                        `}
                      >
                        <img
                          src={image}
                          alt=""
                          className="h-full w-full object-cover"
                        />

                        {active && (
                          <span className="absolute inset-0 bg-cyan-300/10" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </BrandCard>

          {/* PRODUCT INTELLIGENCE */}

          <section className="space-y-6">

            <BrandCard className="card-hover">

              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="
                    rounded-full
                    border
                    border-pink-400/30
                    bg-pink-500/10
                    px-4
                    py-2
                    text-xs
                    font-black
                    uppercase
                    tracking-widest
                    text-pink-300
                  "
                >
                  {item.category || "APPAREL"}
                </span>

                <span className="rounded-full border border-green-400/20 bg-green-400/5 px-4 py-2 text-xs font-black uppercase tracking-widest text-green-300">
                  ● Available
                </span>
              </div>

              <p className="mt-7 text-lg leading-relaxed text-slate-300">
                {item.description ||
                  "Official PulsePlay merchandise designed for players, creators, and members of the gaming network."}
              </p>

              {/* DATA GRID */}

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="pp-card-surface p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Class
                  </p>

                  <p className="mt-2 font-bold text-cyan-300">
                    {item.category || "APPAREL"}
                  </p>
                </div>

                <div className="pp-card-surface p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Rarity
                  </p>

                  <p className="mt-2 font-bold text-yellow-300">
                    {isFeatured
                      ? "LEGENDARY"
                      : "STANDARD"}
                  </p>
                </div>

                <div className="pp-card-surface p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Supplier
                  </p>

                  <p className="mt-2 font-bold text-purple-300">
                    {item.supplier || "Printful"}
                  </p>
                </div>

                <div className="pp-card-surface p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Status
                  </p>

                  <p className="mt-2 font-bold text-green-300">
                    {item.status || "AVAILABLE"}
                  </p>
                </div>
              </div>

            </BrandCard>

            {/* PURCHASE COMMAND */}

            <BrandCard className="card-hover">

              {variantOptions.colors.length > 0 && (
                <div className="mb-6">
                  <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    Select Color
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {variantOptions.colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`rounded-xl border px-4 py-3 text-sm font-bold transition duration-300 ${
                          selectedColor === color
                            ? "border-cyan-300 bg-cyan-400/10 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.18)]"
                            : "border-purple-500/30 bg-black/20 text-slate-300 hover:border-purple-300/60"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {variantOptions.sizes.length > 0 && (
                <div className="mb-7">
                  <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    Select Size
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {variantOptions.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-14 rounded-xl border px-4 py-3 text-sm font-bold transition duration-300 ${
                          selectedSize === size
                            ? "border-pink-300 bg-pink-400/10 text-pink-300 shadow-[0_0_20px_rgba(244,114,182,0.18)]"
                            : "border-purple-500/30 bg-black/20 text-slate-300 hover:border-purple-300/60"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    Acquisition Cost
                  </p>

                  <p className="mt-2 text-5xl font-black text-purple-300">
                    ${displayPrice.toFixed(2)}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Distribution
                  </p>

                  <p className="mt-2 text-sm font-bold text-slate-300">
                    {item.supplier || "Printful"}
                  </p>
                </div>

              </div>

              <div className="mt-7">
                <BrandButton
                  className="w-full"
                  onClick={handleCheckout}
                  disabled={!selectedVariant}
                >
                  🛒 ACQUIRE LOADOUT
                </BrandButton>
              </div>

              <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">
                Secure checkout is handled through Stripe.
              </p>

            </BrandCard>

          </section>
        </section>

        {/* ================================
            SYSTEM FOOTER
        ================================= */}

        <section className="mt-10">
          <BrandCard>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">
                  PulsePlay Locker
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  READY FOR ANOTHER LOADOUT?
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  Return to the merchandise network and
                  continue browsing available gear.
                </p>
              </div>

              <Link to="/merchandise">
                <BrandButton variant="secondary">
                  BROWSE LOCKER
                </BrandButton>
              </Link>

            </div>

          </BrandCard>
        </section>

      </div>
    </main>
  );
}
