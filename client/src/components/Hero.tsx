export default function Hero() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-[#05070d] px-6 text-center text-white">
      <div className="max-w-4xl">
        <h1 className="text-6xl font-extrabold tracking-tight">
          PulsePlay
        </h1>

        <p className="mt-6 text-xl text-gray-300">
          Your ultimate destination for gaming streams, community, and content.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/streams"
            className="rounded-lg bg-purple-600 px-6 py-3 font-bold hover:bg-purple-700"
          >
            Watch Streams
          </a>

          <a
            href="/store"
            className="rounded-lg border border-white/20 px-6 py-3 font-bold hover:bg-white/10"
          >
            Visit Store
          </a>
        </div>
      </div>
    </section>
  );
}