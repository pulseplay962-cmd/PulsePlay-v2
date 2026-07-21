import BrandButton from "./ui/BrandButton";

export default function Hero() {
  return (
    <section
      className="
        relative
        min-h-[70vh]
        flex
        items-center
        justify-center
        overflow-hidden
        rounded-3xl
        p-8
        bg-gradient-to-br
        from-purple-950
        via-slate-950
        to-cyan-950
      "
    >

      {/* Background Glow */}
      <div
        className="
          absolute
          inset-0
          opacity-40
          pp-gradient-animate
          bg-gradient-to-r
          from-purple-600
          via-cyan-500
          to-purple-600
        "
      />


      <div
        className="
          relative
          z-10
          max-w-4xl
          text-center
          pp-fade-in
        "
      >

        <h1
          className="
            text-5xl
            md:text-7xl
            font-black
            tracking-tight
            pp-gradient-text
          "
        >
          PulsePlay
        </h1>


        <p
          className="
            mt-6
            text-xl
            md:text-2xl
            text-slate-300
          "
        >
          Level Up Your Gaming Experience
        </p>


        <p
          className="
            mt-4
            text-slate-400
            max-w-2xl
            mx-auto
          "
        >
          Watch live streams, discover new games,
          explore gaming gear, and connect with
          the PulsePlay community.
        </p>


        <div
          className="
            mt-8
            flex
            flex-wrap
            gap-4
            justify-center
          "
        >

          <BrandButton>
            Watch Streams
          </BrandButton>


          <BrandButton variant="outline">
            Visit Store
          </BrandButton>

        </div>

      </div>

    </section>
  );
}