import { useState } from "react";
import { NavLink } from "react-router-dom";


export default function Navbar() {

  const [open, setOpen] = useState(false);


  const links = [
    {
      name: "Home",
      path: "/",
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
      name: "Community",
      path: "/community",
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


  return (

    <nav className="border-b border-cyan-500/20 bg-[#050816] px-6 py-4">

      <div className="mx-auto flex max-w-7xl items-center justify-between">


        {/* Logo */}

        <NavLink
          to="/"
          className="text-3xl font-black tracking-wider text-cyan-400"
          onClick={() => setOpen(false)}
        >
          PulsePlay
        </NavLink>



        {/* Desktop Menu */}

        <div className="hidden items-center gap-6 md:flex">

          {links.map((link) => (

            <NavLink

              key={link.path}

              to={link.path}

              className={({ isActive }) =>
                `
                font-bold transition
                ${
                  isActive
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-cyan-400"
                }
                `
              }

            >

              {link.name}

            </NavLink>

          ))}

        </div>




        {/* Mobile Button */}

        <button

          onClick={() => setOpen(!open)}

          className="text-3xl text-cyan-400 md:hidden"

          aria-label="Toggle menu"

        >

          ☰

        </button>


      </div>





      {/* Mobile Menu */}

      {open && (

        <div className="mt-6 flex flex-col gap-4 md:hidden">


          {links.map((link) => (

            <NavLink

              key={link.path}

              to={link.path}

              onClick={() => setOpen(false)}

              className={({ isActive }) =>
                `
                rounded-lg px-4 py-3 font-bold transition
                ${
                  isActive
                    ? "bg-cyan-500 text-black"
                    : "text-gray-300 hover:bg-[#111827] hover:text-cyan-400"
                }
                `
              }

            >

              {link.name}

            </NavLink>

          ))}


        </div>

      )}


    </nav>

  );

}