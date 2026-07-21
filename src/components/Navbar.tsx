import { NavLink } from "react-router-dom";
import { useState } from "react";

import BrandButton from "./ui/BrandButton";


const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Games",
    path: "/games",
  },
  {
    name: "Streams",
    path: "/streams",
  },
  {
    name: "Store",
    path: "/store",
  },
  {
    name: "News",
    path: "/news",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];


export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);


  return (

    <header
      className="
        sticky
        top-0
        z-50
        backdrop-blur-xl
        bg-[#070b14]/80
        border-b
        border-white/10
      "
    >

      <nav
        className="
          max-w-[1400px]
          mx-auto
          px-6
          py-4
          flex
          items-center
          justify-between
        "
      >


        {/* Logo */}

        <NavLink
          to="/"
          className="
            flex
            items-center
            gap-3
          "
        >

          <img
            src="/pulseplay-logo.svg"
            alt="PulsePlay Logo"
            className="
              w-12
              h-12
              rounded-xl
            "
          />


          <span
            className="
              text-3xl
              font-black
              pp-gradient-text
            "
          >
            PulsePlay
          </span>


        </NavLink>




        {/* Desktop Navigation */}

        <div
          className="
            hidden
            lg:flex
            items-center
            gap-6
          "
        >

          {links.map((link) => (

            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>

                `
                transition
                duration-300
                ${
                  isActive
                    ? "text-cyan-400 font-bold"
                    : "text-slate-300 hover:text-white"
                }
                `
              }
            >

              {link.name}

            </NavLink>

          ))}


        </div>





        {/* Desktop Store Button */}

        <div
          className="
            hidden
            lg:block
          "
        >

          <NavLink to="/store">

            <BrandButton>
              Shop Gear
            </BrandButton>

          </NavLink>


        </div>





        {/* Mobile Menu Button */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            lg:hidden
            text-white
            text-3xl
          "
          aria-label="Toggle Menu"
        >

          ☰

        </button>


      </nav>





      {/* Mobile Navigation */}

      {menuOpen && (

        <div
          className="
            lg:hidden
            px-6
            pb-6
            space-y-4
            bg-[#070b14]/95
            border-t
            border-white/10
          "
        >

          {links.map((link) => (

            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>

                `
                block
                py-2
                transition
                ${
                  isActive
                    ? "text-cyan-400 font-bold"
                    : "text-slate-300 hover:text-white"
                }
                `
              }
            >

              {link.name}

            </NavLink>

          ))}



          <NavLink
            to="/store"
            onClick={() => setMenuOpen(false)}
          >

            <BrandButton>
              Shop Gear
            </BrandButton>

          </NavLink>


        </div>

      )}



    </header>

  );

}