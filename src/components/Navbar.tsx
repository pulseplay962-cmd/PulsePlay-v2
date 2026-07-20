import { Link, NavLink } from "react-router-dom";


export default function Navbar() {

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Streams",
      path: "/streams",
    },
    {
      name: "News",
      path: "/news",
    },
    {
      name: "Store",
      path: "/store",
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

    <nav className="border-b border-gray-800 bg-[#050816] px-6 py-4">

      <div className="mx-auto flex max-w-7xl items-center justify-between">


        {/* Logo */}

        <Link
          to="/"
          className="text-3xl font-black text-cyan-400"
        >
          PulsePlay
        </Link>




        {/* Navigation */}

        <div className="flex items-center gap-5">


          {navLinks.map((link) => (

            <NavLink

              key={link.path}

              to={link.path}

              className={({ isActive }) =>
                `font-bold transition ${
                  isActive
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-cyan-400"
                }`
              }

            >

              {link.name}

            </NavLink>

          ))}





          {/* Throne Support */}

          <a

            href="https://throne.com/veiltactician"

            target="_blank"

            rel="noopener noreferrer"

            className="rounded-lg bg-purple-500 px-4 py-2 font-bold text-white transition hover:bg-purple-400"

          >

            🎁 Support

          </a>



        </div>


      </div>


    </nav>

  );

}