import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", icon: "🏠", path: "/" },
    { name: "Games", icon: "🎮", path: "/games" },
    { name: "Streams", icon: "📡", path: "/streams" },
    { name: "Store", icon: "🛒", path: "/store" },
    { name: "News", icon: "📰", path: "/news" },
    { name: "Community", icon: "🌐", path: "/community" },
    { name: "About", icon: "📖", path: "/about" },
    { name: "Contact", icon: "💬", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 px-4 py-4">
      <nav
        className="
          mx-auto
          max-w-[1600px]
          rounded-2xl
          border
          border-cyan-500/20
          bg-black/55
          backdrop-blur-xl
          shadow-[0_0_40px_rgba(34,211,238,.08)]
          overflow-hidden
        "
      >
        {/* Top Status Strip */}

        <div className="flex items-center justify-between border-b border-white/5 px-6 py-2 text-[10px] uppercase tracking-[.35em] text-slate-500">
          <div className="flex items-center gap-2">
            <span className="pp-live-dot" />
            <span className="text-green-400">System Online</span>
          </div>

          <div className="hidden md:block">
            PulsePlay Gaming Network
          </div>

          <div className="text-cyan-400">
            Build v2.1
          </div>
        </div>

        {/* Navigation */}

        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}

          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className="group flex items-center gap-4"
          >
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-purple-600
                via-purple-500
                to-cyan-400
                font-black
                text-black
                shadow-[0_0_35px_rgba(34,211,238,.45)]
                transition-all
                duration-300
                group-hover:rotate-6
                group-hover:scale-110
              "
            >
              PP
            </div>

            <div>
              <h1 className="text-3xl font-black pp-gradient-text">
                PulsePlay
              </h1>

              <p className="text-[11px] uppercase tracking-[.45em] text-cyan-400">
                Gaming Command Center
              </p>
            </div>
          </NavLink>

          {/* Desktop Menu */}

          <div className="hidden xl:flex items-center gap-2">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `
                  relative
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  px-5
                  py-3
                  text-sm
                  font-bold
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? `
                        bg-cyan-400
                        text-black
                        shadow-[0_0_25px_rgba(34,211,238,.5)]
                      `
                      : `
                        text-slate-300
                        hover:bg-white/5
                        hover:text-cyan-300
                      `
                  }
                  `
                }
              >
                <span className="text-lg">
                  {link.icon}
                </span>

                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Side */}

          <div className="hidden xl:flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs uppercase tracking-widest text-slate-500">
                Network Status
              </div>

              <div className="font-bold text-green-400">
                ● Online
              </div>
            </div>

            <a
              href="https://throne.com/veiltactician"
              target="_blank"
              rel="noopener noreferrer"
              className="
                rounded-xl
                bg-gradient-to-r
                from-purple-600
                to-pink-500
                px-6
                py-3
                font-black
                shadow-[0_0_30px_rgba(236,72,153,.35)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:scale-105
              "
            >
              🎁 Support
            </a>
          </div>

          {/* Mobile Button */}

          <button
            onClick={() => setOpen(!open)}
            className="xl:hidden text-4xl text-cyan-400 transition hover:scale-110"
            aria-label="Toggle Menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}

        {open && (
          <div className="border-t border-white/10 bg-black/70 p-5 backdrop-blur-xl xl:hidden">
            <div className="grid gap-3">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-5
                    py-4
                    font-bold
                    transition-all
                    ${
                      isActive
                        ? `
                          bg-cyan-400
                          text-black
                        `
                        : `
                          bg-white/5
                          text-slate-300
                          hover:bg-white/10
                        `
                    }
                    `
                  }
                >
                  <span className="text-xl">
                    {link.icon}
                  </span>

                  {link.name}
                </NavLink>
              ))}

              <a
                href="https://throne.com/veiltactician"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-3
                  rounded-xl
                  bg-gradient-to-r
                  from-purple-600
                  to-pink-500
                  px-5
                  py-4
                  text-center
                  font-black
                  text-white
                "
              >
                🎁 Support Creator
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}