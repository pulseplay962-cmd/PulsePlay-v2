import { useEffect, useState } from "react";

import {
  getMerchandise,
  type MerchandiseItem,
} from "../services/merchandise";

import MerchandiseCard from "./MerchandiseCard";

export default function FeaturedMerchandise() {
  const [merchandise, setMerchandise] = useState<MerchandiseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMerchandise() {
      try {
        const data = await getMerchandise();

        const featured = data
          .filter((item) => item.status === "active")
          .slice(0, 3);

        setMerchandise(featured);
      } catch (error) {
        console.error(
          "Failed to load featured merchandise:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadMerchandise();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#050816] px-6 py-12 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-2xl font-black text-cyan-400">
            LOADING MERCHANDISE...
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#050816] px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div
          className="
            flex
            flex-col
            gap-6
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div>
            <h2 className="text-3xl font-black text-cyan-400">
              👕 PulsePlay Merchandise
            </h2>

            <p className="mt-2 text-gray-400">
              Level up your gaming style with official PulsePlay gear.
            </p>
          </div>

          <a
            href="/merchandise"
            className="
              rounded-lg
              bg-purple-600
              px-5
              py-2
              font-bold
              transition
              hover:bg-purple-500
            "
          >
            View All Merch
          </a>
        </div>

        {merchandise.length === 0 ? (
          <div className="mt-8 text-center text-gray-400">
            No merchandise available yet.
          </div>
        ) : (
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {merchandise.map((item) => (
              <MerchandiseCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}