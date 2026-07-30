export default function RecentActivity(){


  const activity = [

    "🤖 AI content system initialized",

    "📰 News publishing ready",

    "📡 Social queue connected",

    "👕 Merchandise system online",

  ];



  return (

    <div className="pp-panel p-6">


      <h2 className="text-2xl font-black text-purple-400">

        📡 RECENT ACTIVITY

      </h2>



      <div className="mt-5 space-y-3">


        {
          activity.map((item,index)=>(

            <div

              key={index}

              className="
              rounded-xl
              bg-black/20
              p-3
              text-slate-300
              "

            >

              {item}

            </div>

          ))

        }


      </div>


    </div>

  );

}