import { Link, Outlet, useLocation } from "react-router-dom";
import { supabase } from "../../lib/supabase";



type NavItem = {
  name:string;
  path:string;
  icon:string;
};




export default function AdminLayout() {


  const location = useLocation();



  const navigation:NavItem[] = [


    {
      name:"Dashboard",
      path:"/admin",
      icon:"📊",
    },


    {
      name:"Games",
      path:"/admin/games",
      icon:"🎮",
    },


    {
      name:"Videos",
      path:"/admin/videos",
      icon:"🎥",
    },


    {
      name:"Products",
      path:"/admin/products",
      icon:"🛒",
    },


    {
      name:"Merchandise",
      path:"/admin/merchandise",
      icon:"👕",
    },


    {
      name:"News",
      path:"/admin/news",
      icon:"📰",
    },


    {
      name:"AI Content Studio",
      path:"/admin/ai-content",
      icon:"🤖",
    },


    {
      name:"Settings",
      path:"/admin/settings",
      icon:"⚙️",
    },


  ];






  async function handleLogout(){


    await supabase.auth.signOut();


    window.location.href =
      "/admin/login";


  }






  return (


    <div
      className="
        min-h-screen
        flex
        bg-[#05070d]
        text-white
      "
    >



      {/* SIDEBAR */}

      <aside
        className="
          w-72
          flex
          flex-col
          border-r
          border-cyan-500/20
          bg-[#0b1120]
          p-6
        "
      >



        {/* Brand */}

        <div>


          <h1
            className="
              text-3xl
              font-black
              text-cyan-400
              tracking-wide
            "
          >

            PulsePlay

          </h1>



          <p
            className="
              mt-1
              text-sm
              text-gray-400
            "
          >

            Admin Control Center

          </p>



        </div>







        {/* Navigation */}

        <nav
          className="
            mt-10
            flex-1
            space-y-2
          "
        >


          {navigation.map((item)=>{


            const active =
              item.path === "/admin"
                ? location.pathname === "/admin"
                : location.pathname.startsWith(
                    item.path
                  );



            return (


              <Link

                key={item.path}

                to={item.path}


                className={`

                  flex
                  items-center
                  justify-between
                  rounded-xl
                  px-4
                  py-3
                  font-bold
                  transition


                  ${
                    active

                    ? `
                      bg-cyan-400
                      text-black
                      shadow-[0_0_25px_#22d3ee]
                    `

                    :

                    `
                      text-gray-300
                      hover:bg-cyan-500/10
                      hover:text-cyan-400
                    `

                  }

                `}

              >


                <div className="flex items-center gap-3">


                  <span>

                    {item.icon}

                  </span>


                  {item.name}


                </div>





                {
                  item.name === "AI Content Studio" && (

                    <span
                      className="
                        rounded-full
                        bg-purple-500/20
                        px-2
                        py-1
                        text-xs
                        text-purple-300
                      "
                    >

                      AI

                    </span>

                  )
                }



              </Link>


            );


          })}


        </nav>








        {/* Footer */}

        <div
          className="
            border-t
            border-white/10
            pt-6
          "
        >



          <Link

            to="/"

            className="
              block
              rounded-xl
              px-4
              py-3
              text-gray-300
              transition
              hover:bg-white/5
              hover:text-white
            "

          >

            🌐 View Website

          </Link>





          <button

            onClick={handleLogout}

            className="
              mt-3
              w-full
              rounded-xl
              bg-red-500/20
              px-4
              py-3
              font-bold
              text-red-300
              transition
              hover:bg-red-500/30
            "

          >

            🚪 Logout

          </button>



        </div>



      </aside>








      {/* MAIN AREA */}


      <main

        className="
          flex-1
          overflow-y-auto
          p-8
        "

      >

        <Outlet />

      </main>



    </div>


  );

}