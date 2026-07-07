import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const links = [
  { name: "Home", to: "/" },
  { name: "Streams", to: "/streams" },
  { name: "Store", to: "/store" },
  { name: "Community", to: "/community" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-500/20 bg-[#05070d]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <Link
          to="/"
          className="text-3xl font-black tracking-wider transition hover:scale-105"
        >
          <span className="text-white">PULSE</span>
          <span className="text-cyan-400 drop-shadow-[0_0_10px_#22d3ee]">
            PLAY
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative transition ${
                  isActive
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}

                  {isActive && (
                    <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button className="rounded-lg border border-cyan-500 px-4 py-2 transition hover:bg-cyan-500 hover:text-black">
            Log In
          </button>

          <Link
            to="/streams"
            className="rounded-lg bg-cyan-400 px-5 py-2 font-bold text-black transition hover:scale-105 hover:bg-cyan-300 hover:shadow-[0_0_20px_#22d3ee]"
          >
            🔴 Watch Live
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-3xl text-cyan-400 md:hidden"
        >
          ☰
        </button>
      </div>

      {open && (
        <nav className="border-t border-cyan-500/20 bg-[#05070d] md:hidden">
          <div className="flex flex-col px-6 py-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="py-3 text-gray-300 transition hover:text-cyan-400"
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to="/streams"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-lg bg-cyan-400 py-3 text-center font-bold text-black"
            >
              🔴 Watch Live
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}