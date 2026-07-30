


type DashboardStatCardProps = {

  title:string;

  value:string | number;

  icon:string;

  color?:string;

};



export default function DashboardStatCard({

  title,

  value,

  icon,

  color="text-cyan-400",

}:DashboardStatCardProps){


  return (

    <div className="pp-panel p-6">


      <div className="flex items-center justify-between">


        <div>


          <p className="text-sm uppercase tracking-widest text-slate-400">

            {title}

          </p>


          <h2 className={`mt-3 text-4xl font-black ${color}`}>

            {value}

          </h2>


        </div>



        <div className="text-4xl">

          {icon}

        </div>


      </div>


    </div>

  );

}