import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-cyan-500/20 bg-[#05070d] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">

        {/* Brand */}
        <div>
          <h2 className="text-3xl font-black">
            <span className="text-white">PULSE</span>
            <span className="text-cyan-400 drop-shadow-[0_0_10px_#22d3ee]">
              PLAY
            </span>
          </h2>

          <p className="mt-4 leading-7 text-gray-400">
            Live streams, gaming gear, community events, giveaways,
            and creator content—all in one place.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="mb-5 text-lg font-bold text-cyan-400">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3">
            {[
              ["Home", "/"],
              ["Streams", "/streams"],
              ["Store", "/store"],
              ["Community", "/community"],
              ["About", "/about"],
              ["Contact", "/contact"],
            ].map(([label, to]) => (
              <Link
                key={to}
                to={to}
                className="transition hover:text-cyan-400"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Connect */}
        <div>
          <h3 className="mb-5 text-lg font-bold text-cyan-400">
            Connect
          </h3>

          <div className="flex flex-col gap-3">

            <a
              href="https://twitch.tv/Veiltactician"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-purple-400"
            >
              🎮 Twitch
            </a>

            <a
              href="https://pulseplay-online.wegic.net/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-cyan-400"
            >
              🌐 Website
            </a>

            <a
              href="https://throne.com/ve"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-purple-400"
            >
              🎁 Throne Wishlist
            </a>

            <a
              href="https://amzn.to/4vmEtDy"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-cyan-400"
            >
              🛒 Amazon Picks
            </a>

          </div>
        </div>
      </div>

      <div className="border-t border-cyan-500/10 py-6 text-center text-sm text-gray-500">
        © 2026 PulsePlay • Built for gamers • Level Up Your Play 🎮
      </div>
    </footer>
  );
}