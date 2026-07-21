import { NavLink } from "react-router-dom";

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
          max-w-1400
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
            text-3xl
            font-black
            pp-gradient-text
          "
        >
          PulsePlay
        </NavLink>




        {/* Navigation */}

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




        {/* CTA */}

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



      </nav>


    </header>

  );

}