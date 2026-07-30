export default function SystemStatusCard(){


  const systems = [

    {
      name:"Frontend",
      status:"ONLINE"
    },

    {
      name:"API",
      status:"ONLINE"
    },

    {
      name:"Supabase",
      status:"CONNECTED"
    },

    {
      name:"AI Services",
      status:"READY"
    },

  ];



  return (

    <div className="pp-panel p-6">


      <h2 className="text-2xl font-black text-cyan-400">

        🛰️ SYSTEM STATUS

      </h2>



      <div className="mt-5 space-y-3">


        {
          systems.map((system)=>(


            <div

              key={system.name}

              className="
              flex
              justify-between
              rounded-xl
              bg-black/20
              p-4
              "

            >

              <span>

                {system.name}

              </span>


              <span className="text-green-400 font-bold">

                🟢 {system.status}

              </span>


            </div>


          ))

        }


      </div>


    </div>

  );

}