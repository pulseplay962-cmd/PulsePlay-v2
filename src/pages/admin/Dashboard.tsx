import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardStatCard from "../../components/admin/DashboardStatCard";
import SystemStatusCard from "../../components/admin/SystemStatusCard";
import RecentActivity from "../../components/admin/RecentActivity";

import { supabase } from "../../lib/supabase";


export default function Dashboard() {


  const [stats, setStats] = useState({

    news: 0,

    ai: 0,

    social: 0,

    merchandise: 0,

    videos: 0,

    community: 0,

    analytics: 0,

    sessions: 0,

  });


  const [loading, setLoading] =
    useState(true);



  async function loadDashboard() {


    try {


      setLoading(true);


      const [

        news,

        ai,

        social,

        merchandise,

        videos,

        community,

        analytics,

        sessions,

      ] = await Promise.all([


        /*
         * ================================
         * Content Counts
         * ================================
         */

        supabase
          .from("news")
          .select(
            "id",
            {
              count: "exact",
              head: true,
            }
          ),


        supabase
          .from("ai_content_queue")
          .select(
            "id",
            {
              count: "exact",
              head: true,
            }
          ),


        supabase
          .from("social_queue")
          .select(
            "id",
            {
              count: "exact",
              head: true,
            }
          ),


        supabase
          .from("merchandise")
          .select(
            "id",
            {
              count: "exact",
              head: true,
            }
          ),


        supabase
          .from("videos")
          .select(
            "id",
            {
              count: "exact",
              head: true,
            }
          ),


        supabase
          .from("community_signups")
          .select(
            "id",
            {
              count: "exact",
              head: true,
            }
          ),


        /*
         * ================================
         * Total Analytics Events
         * ================================
         */

        supabase
          .from("analytics_events")
          .select(
            "id",
            {
              count: "exact",
              head: true,
            }
          ),


        /*
         * ================================
         * Unique Sessions
         *
         * We load session IDs and count
         * unique values in JavaScript.
         * ================================
         */

        supabase
          .from("analytics_events")
          .select(
            "session_id"
          ),


      ]);


      /*
       * ================================
       * Count Unique Sessions
       * ================================
       */

      const uniqueSessions =
        new Set(

          (sessions.data || [])
            .map(
              event =>
                event.session_id
            )
            .filter(
              Boolean
            )

        ).size;


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
          videos.count || 0,


        community:
          community.count || 0,


        analytics:
          analytics.count || 0,


        sessions:
          uniqueSessions,


      });


    } catch (error) {


      console.error(
        "DASHBOARD LOAD ERROR:",
        error
      );


    } finally {


      setLoading(false);


    }


  }



  useEffect(() => {


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


  }, []);



  return (

    <div className="space-y-8">


      {/* ======================================
          COMMAND CENTER HEADER
      ====================================== */}

      <section className="pp-panel p-6">


        <div className="
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        ">


          <div>


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
              community, and audience activity.

            </p>


          </div>


          <Link
            to="/admin/analytics"
            className="
              rounded-xl
              border
              border-cyan-400/30
              bg-cyan-500/10
              px-5
              py-3
              text-center
              font-black
              text-cyan-300
              transition
              hover:bg-cyan-500/20
              hover:border-cyan-400/60
            "
          >

            📊 VIEW FULL ANALYTICS →

          </Link>


        </div>


      </section>



      {/* ======================================
          PLATFORM STATS
      ====================================== */}

      <section className="
        grid
        grid-cols-1
        gap-6
        md:grid-cols-2
        lg:grid-cols-4
      ">


        <DashboardStatCard
          title="News Articles"
          value={loading ? "..." : stats.news}
          icon="📰"
          color="text-purple-400"
        />


        <DashboardStatCard
          title="AI Drafts"
          value={loading ? "..." : stats.ai}
          icon="🤖"
          color="text-cyan-400"
        />


        <DashboardStatCard
          title="Social Queue"
          value={loading ? "..." : stats.social}
          icon="📡"
          color="text-green-400"
        />


        <DashboardStatCard
          title="Merchandise"
          value={loading ? "..." : stats.merchandise}
          icon="👕"
          color="text-pink-400"
        />


        <DashboardStatCard
          title="Videos"
          value={loading ? "..." : stats.videos}
          icon="🎥"
          color="text-yellow-400"
        />


        <DashboardStatCard
          title="Community Members"
          value={loading ? "..." : stats.community}
          icon="🎮"
          color="text-cyan-300"
        />


        {/* ======================================
            ANALYTICS
        ====================================== */}

        <DashboardStatCard
          title="Total Page Views"
          value={loading ? "..." : stats.analytics}
          icon="📊"
          color="text-cyan-400"
        />


        <DashboardStatCard
          title="Unique Sessions"
          value={loading ? "..." : stats.sessions}
          icon="👥"
          color="text-purple-400"
        />


      </section>



      {/* ======================================
          SYSTEM + RECENT ACTIVITY
      ====================================== */}

      <section className="
        grid
        grid-cols-1
        gap-6
        lg:grid-cols-2
      ">


        <SystemStatusCard />


        <RecentActivity />


      </section>



      {/* ======================================
          QUICK ACTIONS
      ====================================== */}

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
          gap-4
          md:grid-cols-2
          lg:grid-cols-4
        ">


          <Link
            to="/admin/ai-content"
            className="
              rounded-xl
              bg-purple-500/20
              p-4
              font-bold
              text-purple-300
              transition
              hover:bg-purple-500/30
            "
          >

            🤖 AI Content Studio

          </Link>


          <Link
            to="/admin/news"
            className="
              rounded-xl
              bg-cyan-500/20
              p-4
              font-bold
              text-cyan-300
              transition
              hover:bg-cyan-500/30
            "
          >

            📰 Manage News

          </Link>


          <Link
            to="/admin/merchandise"
            className="
              rounded-xl
              bg-pink-500/20
              p-4
              font-bold
              text-pink-300
              transition
              hover:bg-pink-500/30
            "
          >

            👕 Merchandise

          </Link>


          <Link
            to="/admin/analytics"
            className="
              rounded-xl
              bg-green-500/20
              p-4
              font-bold
              text-green-300
              transition
              hover:bg-green-500/30
            "
          >

            📊 Analytics Center

          </Link>


        </div>


      </section>


    </div>

  );

}