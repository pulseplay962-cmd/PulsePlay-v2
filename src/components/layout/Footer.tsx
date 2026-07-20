export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-cyan-500/20 bg-[#05070d]">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-12 md:flex-row md:justify-between">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-black tracking-widest text-cyan-400">
            PULSEPLAY
          </h2>

          <p className="mt-4 max-w-sm text-gray-400">
            Gaming. Streaming. Community.
            <br />
            Watch live streams, discover new content, and support the channel.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="mb-4 font-bold text-white">Quick Links</h3>

          <div className="flex flex-col gap-2">
            <a href="/" className="text-gray-400 hover:text-cyan-400">
              Home
            </a>

            <a href="/streams" className="text-gray-400 hover:text-cyan-400">
              Streams
            </a>

            <a href="/store" className="text-gray-400 hover:text-cyan-400">
              Store
            </a>

            <a href="/about" className="text-gray-400 hover:text-cyan-400">
              About
            </a>
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="mb-4 font-bold text-white">Support & Follow</h3>

          <div className="flex flex-col gap-2">
            <a
              href="https://www.twitch.tv/veiltactician"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-cyan-400"
            >
              Twitch
            </a>

            <a
              href="https://pulseplay-online.wegic.net/"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-cyan-400"
            >
              Website
            </a>

            <a
  href="https://throne.com/veiltactician"
  target="_blank"
  rel="noopener noreferrer"
>
  Support The Stream
</a>

            <a
              href="https://amzn.to/4vmEtDy"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-cyan-400"
            >
              Amazon Store
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-cyan-500/20 py-6 text-center text-sm text-gray-500">
        © {year} PulsePlay. All rights reserved.
      </div>
    </footer>
  );
}