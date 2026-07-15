import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/streams", label: "Streams" },
  { to: "/store", label: "Store" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-cyan-500/20 bg-[#05070d]/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link
          to="/"
          className="text-2xl font-black tracking-widest text-cyan-400"
        >
          PULSEPLAY
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-400 font-semibold"
                  : "text-gray-300 hover:text-cyan-300 transition"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="rounded-full bg-red-600 px-4 py-1 text-sm font-bold">
          LIVE
        </div>

      </nav>
    </header>
  );
}