import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-cyan-500/20 bg-[#05070d]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-black">
            <span className="text-white">PULSE</span>
            <span className="text-cyan-400">PLAY</span>
          </h2>

          <p className="mt-4 text-gray-400">
            Live streams, gaming gear, community events, giveaways, and
            creator content—all in one place.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-cyan-400">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3">
            <Link to="/">Home</Link>
            <Link to="/streams">Streams</Link>
            <Link to="/store">Store</Link>
            <Link to="/community">Community</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        {/* Socials */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-cyan-400">
            Connect
          </h3>

          <div className="flex flex-col gap-3">
            <a
              href="https://twitch.tv/Veiltactican"
              target="_blank"
              rel="noreferrer"
            >
              Twitch
            </a>

            <a
              href="https://pulseplay-online.wegic.net/"
              target="_blank"
              rel="noreferrer"
            >
              Website
            </a>

            <a
              href="https://throne.com/ve"
              target="_blank"
              rel="noreferrer"
            >
              Throne Wishlist
            </a>

            <a
              href="https://amzn.to/4vmEtDy"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Picks
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-cyan-500/10 py-6 text-center text-sm text-gray-500">
        © 2026 PulsePlay • Built for gamers.
      </div>
    </footer>
  );
}