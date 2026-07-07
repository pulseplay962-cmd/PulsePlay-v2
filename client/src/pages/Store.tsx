type Product = {
  name: string;
  category: string;
  description: string;
  link: string;
};

const products: Product[] = [
  {
    name: "Gaming Headset",
    category: "Audio",
    description: "Immersive sound and crystal-clear communication.",
    link: "https://amzn.to/4vmEtDy",
  },
  {
    name: "Mechanical Keyboard",
    category: "Accessories",
    description: "Responsive switches with customizable RGB lighting.",
    link: "https://amzn.to/4vmEtDy",
  },
  {
    name: "Streaming Microphone",
    category: "Streaming",
    description: "Professional-quality audio for streams and videos.",
    link: "https://amzn.to/4vmEtDy",
  },
];

export default function Store() {
  return (
    <section className="bg-[#05070d] px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.4em] text-cyan-400">
            PulsePlay Store
          </p>

          <h1 className="mt-4 text-5xl font-black md:text-6xl">
            Level Up Your <span className="text-cyan-400">Gaming Setup</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            Browse creator-recommended gaming gear, streaming equipment,
            and future PulsePlay merchandise.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.name}
              className="group overflow-hidden rounded-3xl border border-cyan-500/20 bg-white/5 transition duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-[0_0_30px_#22d3ee55]"
            >
              <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-cyan-500/20 to-purple-600/20">
                <span className="text-6xl">🎮</span>
              </div>

              <div className="p-6">
                <span className="rounded-full border border-cyan-400/30 px-3 py-1 text-xs font-bold text-cyan-300">
                  {product.category}
                </span>

                <h2 className="mt-4 text-2xl font-bold">
                  {product.name}
                </h2>

                <p className="mt-3 text-gray-400">
                  {product.description}
                </p>

                <a
                  href={product.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-block rounded-lg bg-cyan-400 px-5 py-3 font-bold text-black transition hover:bg-cyan-300 hover:shadow-[0_0_20px_#22d3ee]"
                >
                  View Product
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}