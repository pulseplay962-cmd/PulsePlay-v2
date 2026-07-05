import { Link, NavLink } from "react-router-dom";

const links = [
  { name: "Home", to: "/" },
  { name: "Streams", to: "/streams" },
  { name: "Store", to: "/store" },
  { name: "Community", to: "/community" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-cyan-500/20 bg-[#05070d]/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-3xl font-black tracking-wider"
        >
          <span className="text-white">PULSE</span>
          <span className="text-cyan-400">PLAY</span>
        </Link>

        <nav className="hidden gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition ${
                  isActive
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex gap-3">
          <button className="rounded-lg border border-cyan-500 px-4 py-2 hover:bg-cyan-500 hover:text-black transition">
            Log In
          </button>

          <button className="rounded-lg bg-cyan-400 px-4 py-2 font-bold text-black hover:bg-cyan-300 transition">
            Watch Live
          </button>
        </div>
      </div>
    </header>
  );
}