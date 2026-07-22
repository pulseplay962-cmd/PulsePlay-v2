import MerchandiseCard from "./MerchandiseCard";
import { merchandise } from "../data/merchandise";

export default function FeaturedMerchandise() {
  return (
    <section className="bg-[#050816] px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
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
            className="rounded-lg bg-purple-600 px-5 py-2 font-bold transition hover:bg-purple-500"
          >
            View All Merch
          </a>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {merchandise.slice(0, 3).map((item) => (
            <MerchandiseCard
              key={item.id}
              item={{
                ...item,
                badge: "Official",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}