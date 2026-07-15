import { Link, Outlet, useLocation } from "react-router-dom";
import { supabase } from "../../lib/supabase";


export default function AdminLayout() {

  const location = useLocation();


  const navigation = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: "📊",
    },
    {
      name: "Games",
      path: "/admin/games",
      icon: "🎮",
    },
    {
      name: "Videos",
      path: "/admin/videos",
      icon: "🎥",
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: "🛒",
    },
    {
      name: "News",
      path: "/admin/news",
      icon: "📰",
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: "⚙️",
    },
  ];



  async function handleLogout() {

    await supabase.auth.signOut();

    window.location.href = "/admin/login";

  }



  return (

    <div className="min-h-screen bg-[#05070d] text-white flex">


      <aside className="flex w-72 flex-col border-r border-cyan-500/20 bg-[#0b1120] p-6">


        <div>

          <h1 className="text-3xl font-black text-cyan-400">
            PulsePlay
          </h1>

          <p className="text-sm text-gray-400">
            Admin Control Center
          </p>


          <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-2 text-sm text-green-400">

            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

            System Online

          </div>


        </div>




        <nav className="mt-10 flex-1 space-y-2">


          {navigation.map((item)=>{


            const active =
              location.pathname === item.path;


            return (

              <Link

                key={item.path}

                to={item.path}

                className={`
                  flex items-center gap-3 rounded-xl px-4 py-3
                  font-bold transition
                  ${
                    active
                    ? "bg-cyan-500 text-black shadow-[0_0_25px_#22d3ee]"
                    : "text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400"
                  }
                `}

              >

                <span className="text-xl">
                  {item.icon}
                </span>


                {item.name}


              </Link>

            );


          })}


        </nav>





        <div className="border-t border-white/10 pt-6">


          <Link

            to="/"

            className="block rounded-xl px-4 py-3 text-gray-300 transition hover:bg-white/5 hover:text-white"

          >

            🌐 View Website

          </Link>




          <button

            onClick={handleLogout}

            className="mt-3 w-full rounded-xl bg-red-500/20 px-4 py-3 font-bold text-red-300 transition hover:bg-red-500/30"

          >

            🚪 Logout

          </button>


        </div>



      </aside>





      <main className="flex-1 overflow-y-auto">


        <header className="border-b border-white/10 bg-[#05070d] px-8 py-5">

          <h2 className="text-xl font-bold">

            PulsePlay Management

          </h2>

          <p className="text-sm text-gray-400">

            Manage your games, videos, products, and community content.

          </p>

        </header>




        <section className="p-8">

          <Outlet />

        </section>


      </main>


    </div>

  );

}