import { useEffect, useState } from "react";

import DashboardStatCard from "../../components/admin/DashboardStatCard";
import SystemStatusCard from "../../components/admin/SystemStatusCard";
import RecentActivity from "../../components/admin/RecentActivity";

import { supabase } from "../../lib/supabase";



export default function Dashboard(){


  const [stats,setStats] = useState({

    news:0,

    ai:0,

    social:0,

    merchandise:0,

    videos:0

  });



  const [loading,setLoading] = useState(true);






  async function loadDashboard(){


    try{


      setLoading(true);



      const [

        news,

        ai,

        social,

        merchandise,

        videos


      ] = await Promise.all([


        supabase

        .from("news")

        .select(
          "id",
          {
            count:"exact",
            head:true
          }
        ),



        supabase

        .from("ai_content_queue")

        .select(
          "id",
          {
            count:"exact",
            head:true
          }
        ),




        supabase

        .from("social_queue")

        .select(
          "id",
          {
            count:"exact",
            head:true
          }
        ),




        supabase

        .from("merchandise")

        .select(
          "id",
          {
            count:"exact",
            head:true
          }
        ),




        supabase

        .from("videos")

        .select(
          "id",
          {
            count:"exact",
            head:true
          }
        )


      ]);





      setStats({

        news:
        news.count || 0,


        ai:
        ai.count || 0,


        social:
        social.count || 0,


        merchandise:
        merchandise.count || 0,


        videos:
        videos.count || 0


      });



    }catch(error){


      console.error(
        "DASHBOARD LOAD ERROR:",
        error
      );


    }finally{


      setLoading(false);


    }


  }







  useEffect(()=>{


    loadDashboard();


    const refreshAfterPublish = () => {
      loadDashboard();
    };

    window.addEventListener(
      "pulseplay:ai-published",
      refreshAfterPublish
    );

    return () => {
      window.removeEventListener(
        "pulseplay:ai-published",
        refreshAfterPublish
      );
    };


  },[]);







  return (

    <div className="space-y-8">


      <section className="pp-panel p-6">


        <h1 className="
        text-4xl
        font-black
        pp-gradient-text
        ">

          🎮 PulsePlay Command Center

        </h1>



        <p className="
        mt-3
        text-slate-400
        ">

          Monitor your gaming media platform,
          AI systems, publishing pipeline,
          and community operations.

        </p>


      </section>








      <section className="
      grid
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-5
      gap-6
      ">


        <DashboardStatCard

          title="News Articles"

          value={
            loading
            ?
            "..."
            :
            stats.news
          }

          icon="📰"

          color="text-purple-400"

        />



        <DashboardStatCard

          title="AI Drafts"

          value={
            loading
            ?
            "..."
            :
            stats.ai
          }

          icon="🤖"

          color="text-cyan-400"

        />



        <DashboardStatCard

          title="Social Queue"

          value={
            loading
            ?
            "..."
            :
            stats.social
          }

          icon="📡"

          color="text-green-400"

        />



        <DashboardStatCard

          title="Merchandise"

          value={
            loading
            ?
            "..."
            :
            stats.merchandise
          }

          icon="👕"

          color="text-pink-400"

        />



        <DashboardStatCard

          title="Videos"

          value={
            loading
            ?
            "..."
            :
            stats.videos
          }

          icon="🎥"

          color="text-yellow-400"

        />


      </section>









      <section className="
      grid
      grid-cols-1
      lg:grid-cols-2
      gap-6
      ">


        <SystemStatusCard />


        <RecentActivity />


      </section>








      <section className="pp-panel p-6">


        <h2 className="
        text-2xl
        font-black
        text-cyan-400
        ">

          ⚡ QUICK ACTIONS

        </h2>



        <div className="
        mt-5
        grid
        grid-cols-1
        md:grid-cols-3
        gap-4
        ">



          <a

            href="/admin/ai-content"

            className="
            rounded-xl
            bg-purple-500/20
            p-4
            text-purple-300
            font-bold
            hover:bg-purple-500/30
            "

          >

            🤖 AI Content Studio

          </a>





          <a

            href="/admin/news"

            className="
            rounded-xl
            bg-cyan-500/20
            p-4
            text-cyan-300
            font-bold
            hover:bg-cyan-500/30
            "

          >

            📰 Manage News

          </a>





          <a

            href="/admin/merchandise"

            className="
            rounded-xl
            bg-pink-500/20
            p-4
            text-pink-300
            font-bold
            hover:bg-pink-500/30
            "

          >

            👕 Merchandise

          </a>


        </div>


      </section>



    </div>

  );

}