export default function Store() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 text-white">
      <h1 className="text-5xl font-black">Gaming Store</h1>

      <p className="mt-4 text-gray-400">
        Browse gaming gear, creator merch, and affiliate products.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="rounded-3xl border border-cyan-500/20 bg-white/5 p-6"
          >
            <div className="mb-5 aspect-square rounded-xl bg-slate-800"></div>

            <h2 className="text-2xl font-bold">
              Product {item}
            </h2>

            <p className="mt-2 text-gray-400">
              Product description goes here.
            </p>

            <button className="mt-6 rounded-lg bg-cyan-400 px-5 py-3 font-bold text-black">
              View Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}