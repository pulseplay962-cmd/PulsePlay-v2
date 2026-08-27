import { useEffect, useState } from "react";

import DashboardStatCard from "../../components/admin/DashboardStatCard";
import SystemStatusCard from "../../components/admin/SystemStatusCard";
import RecentActivity from "../../components/admin/RecentActivity";

import { supabase } from "../../lib/supabase";


type TrafficEvent = {
  session_id: string;
  page_path?: string;
  created_at: string;
};


type DailyTraffic = {
  label: string;
  date: string;
  visitors: number;
  views: number;
};


type TopPage = {
  path: string;
  views: number;
};


export default function Dashboard() {


  const [stats, setStats] = useState({

    news: 0,

    ai: 0,

    social: 0,

    merchandise: 0,

    videos: 0,

    community: 0,

  });


  const [traffic, setTraffic] =
    useState<DailyTraffic[]>([]);


  const [topPages, setTopPages] =
    useState<TopPage[]>([]);


  const [todayVisitors, setTodayVisitors] =
    useState(0);


  const [todayViews, setTodayViews] =
    useState(0);


  const [sevenDayVisitors, setSevenDayVisitors] =
    useState(0);


  const [sevenDayViews, setSevenDayViews] =
    useState(0);


  const [thirtyDayVisitors, setThirtyDayVisitors] =
    useState(0);


  const [loading, setLoading] =
    useState(true);


  const [analyticsLoading, setAnalyticsLoading] =
    useState(true);


  const [lastUpdated, setLastUpdated] =
    useState<Date | null>(null);


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

      ] = await Promise.all([


        supabase
          .from("news")
          .select("id", {
            count: "exact",
            head: true,
          }),


        supabase
          .from("ai_content_queue")
          .select("id", {
            count: "exact",
            head: true,
          }),


        supabase
          .from("social_queue")
          .select("id", {
            count: "exact",
            head: true,
          }),


        supabase
          .from("merchandise")
          .select("id", {
            count: "exact",
            head: true,
          }),


        supabase
          .from("videos")
          .select("id", {
            count: "exact",
            head: true,
          }),


        supabase
          .from("community_signups")
          .select("id", {
            count: "exact",
            head: true,
          }),

      ]);


      setStats({

        news: news.count || 0,

        ai: ai.count || 0,

        social: social.count || 0,

        merchandise: merchandise.count || 0,

        videos: videos.count || 0,

        community: community.count || 0,

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


  async function loadDashboardAnalytics() {


    try {

      setAnalyticsLoading(true);


      const now = new Date();


      const thirtyDaysAgo =
        new Date(now);


      thirtyDaysAgo.setDate(
        thirtyDaysAgo.getDate() - 29
      );


      const {
        data,
        error,
      } = await supabase
        .from("analytics_events")
        .select(
          "session_id,page_path,created_at"
        )
        .eq(
          "event_type",
          "page_view"
        )
        .gte(
          "created_at",
          thirtyDaysAgo.toISOString()
        )
        .order(
          "created_at",
          {
            ascending: true,
          }
        );


      if (error) {

        console.error(
          "DASHBOARD ANALYTICS ERROR:",
          error
        );

        return;

      }


      const events =
        (data || []) as TrafficEvent[];


      buildDashboardTraffic(
        events,
        now
      );


    } catch (error) {

      console.error(
        "DASHBOARD ANALYTICS LOAD ERROR:",
        error
      );

    } finally {

      setAnalyticsLoading(false);

      setLastUpdated(
        new Date()
      );

    }

  }


  function buildDashboardTraffic(
    events: TrafficEvent[],
    now: Date
  ) {


    const todayStart =
      new Date(now);


    todayStart.setHours(
      0,
      0,
      0,
      0
    );


    const sevenDayStart =
      new Date(todayStart);


    sevenDayStart.setDate(
      sevenDayStart.getDate() - 6
    );


    const thirtyDayStart =
      new Date(todayStart);


    thirtyDayStart.setDate(
      thirtyDayStart.getDate() - 29
    );


    /*
     * ======================================
     * TODAY
     * ======================================
     */

    const todayEvents =
      events.filter(
        (event) =>
          new Date(
            event.created_at
          ) >= todayStart
      );


    setTodayViews(
      todayEvents.length
    );


    setTodayVisitors(
      new Set(
        todayEvents.map(
          (event) =>
            event.session_id
        )
      ).size
    );


    /*
     * ======================================
     * 7 DAYS
     * ======================================
     */

    const sevenDayEvents =
      events.filter(
        (event) =>
          new Date(
            event.created_at
          ) >= sevenDayStart
      );


    setSevenDayViews(
      sevenDayEvents.length
    );


    setSevenDayVisitors(
      new Set(
        sevenDayEvents.map(
          (event) =>
            event.session_id
        )
      ).size
    );


    /*
     * ======================================
     * 30 DAYS
     * ======================================
     */

    const thirtyDayEvents =
      events.filter(
        (event) =>
          new Date(
            event.created_at
          ) >= thirtyDayStart
      );


    setThirtyDayVisitors(
      new Set(
        thirtyDayEvents.map(
          (event) =>
            event.session_id
        )
      ).size
    );


    /*
     * ======================================
     * TOP PAGES
     * ======================================
     */

    const pageCounts =
      new Map<string, number>();


    for (
      const event of thirtyDayEvents
    ) {

      const path =
        event.page_path ||
        "/";


      pageCounts.set(
        path,
        (pageCounts.get(path) || 0) + 1
      );

    }


    const pages =
      Array.from(
        pageCounts.entries()
      )
        .map(
          ([path, views]) => ({
            path,
            views,
          })
        )
        .sort(
          (a, b) =>
            b.views - a.views
        )
        .slice(0, 5);


    setTopPages(
      pages
    );


    /*
     * ======================================
     * 7 DAY CHART
     * ======================================
     */

    const dailyData: DailyTraffic[] = [];


    for (
      let i = 6;
      i >= 0;
      i--
    ) {

      const date =
        new Date(todayStart);


      date.setDate(
        date.getDate() - i
      );


      const nextDate =
        new Date(date);


      nextDate.setDate(
        nextDate.getDate() + 1
      );


      const dayEvents =
        sevenDayEvents.filter(
          (event) => {

            const eventDate =
              new Date(
                event.created_at
              );


            return (
              eventDate >= date &&
              eventDate < nextDate
            );

          }
        );


      const visitors =
        new Set(
          dayEvents.map(
            (event) =>
              event.session_id
          )
        ).size;


      dailyData.push({

        label:
          date.toLocaleDateString(
            undefined,
            {
              weekday: "short",
            }
          ),

        date:
          date.toISOString(),

        visitors,

        views:
          dayEvents.length,

      });

    }


    setTraffic(
      dailyData
    );

  }


  useEffect(() => {

    loadDashboard();

    loadDashboardAnalytics();


    const refreshAfterPublish = () => {

      loadDashboard();

      loadDashboardAnalytics();

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


  const maxTraffic =
    Math.max(
      ...traffic.map(
        (day) =>
          Math.max(
            day.views,
            day.visitors
          )
      ),
      1
    );


  const topPageViews =
    topPages[0]?.views || 0;


  return (

    <div className="space-y-8">


      {/* ======================================
          COMMAND CENTER HEADER
      ======================================= */}

      <section className="pp-panel p-6">


        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-5
          "
        >

          <div>

            <h1
              className="
                text-4xl
                font-black
                pp-gradient-text
              "
            >

              🎮 PulsePlay Command Center

            </h1>


            <p
              className="
                mt-3
                text-slate-400
              "
            >

              Monitor your gaming media platform,
              traffic, content, AI systems,
              publishing pipeline, and community.

            </p>

          </div>


          <div className="text-right">

            {lastUpdated && (

              <div
                className="
                  text-xs
                  text-slate-500
                "
              >

                Analytics updated{" "}

                {lastUpdated.toLocaleTimeString()}

              </div>

            )}

          </div>

        </div>

      </section>


      {/* ======================================
          PLATFORM STATS
      ======================================= */}

      <section
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-6
          gap-6
        "
      >

        <DashboardStatCard
          title="News Articles"
          value={
            loading
              ? "..."
              : stats.news
          }
          icon="📰"
          color="text-purple-400"
        />


        <DashboardStatCard
          title="AI Drafts"
          value={
            loading
              ? "..."
              : stats.ai
          }
          icon="🤖"
          color="text-cyan-400"
        />


        <DashboardStatCard
          title="Social Queue"
          value={
            loading
              ? "..."
              : stats.social
          }
          icon="📡"
          color="text-green-400"
        />


        <DashboardStatCard
          title="Merchandise"
          value={
            loading
              ? "..."
              : stats.merchandise
          }
          icon="👕"
          color="text-pink-400"
        />


        <DashboardStatCard
          title="Videos"
          value={
            loading
              ? "..."
              : stats.videos
          }
          icon="🎥"
          color="text-yellow-400"
        />


        <DashboardStatCard
          title="Community Members"
          value={
            loading
              ? "..."
              : stats.community
          }
          icon="🎮"
          color="text-cyan-300"
        />

      </section>


      {/* ======================================
          WEBSITE ANALYTICS
      ======================================= */}

      <section>

        <div
          className="
            mb-4
            flex
            flex-col
            md:flex-row
            md:items-end
            md:justify-between
            gap-3
          "
        >

          <div>

            <h2
              className="
                text-2xl
                font-black
                text-cyan-400
              "
            >

              🌐 WEBSITE ANALYTICS

            </h2>


            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >

              Live traffic activity from
              PulsePlay visitors.

            </p>

          </div>


          <a
            href="/admin/analytics"
            className="
              text-sm
              font-bold
              text-cyan-400
              hover:text-cyan-300
            "
          >

            View Full Analytics →

          </a>

        </div>


        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-5
            gap-5
          "
        >

          <TrafficCard
            title="Visitors Today"
            value={todayVisitors}
            icon="👥"
            color="cyan"
            loading={analyticsLoading}
          />


          <TrafficCard
            title="Page Views Today"
            value={todayViews}
            icon="👁️"
            color="purple"
            loading={analyticsLoading}
          />


          <TrafficCard
            title="7-Day Visitors"
            value={sevenDayVisitors}
            icon="📈"
            color="green"
            loading={analyticsLoading}
          />


          <TrafficCard
            title="7-Day Views"
            value={sevenDayViews}
            icon="📊"
            color="yellow"
            loading={analyticsLoading}
          />


          <TrafficCard
            title="30-Day Visitors"
            value={thirtyDayVisitors}
            icon="📅"
            color="pink"
            loading={analyticsLoading}
          />

        </div>

      </section>


      {/* ======================================
          TRAFFIC + TOP PAGES
      ======================================= */}

      <section
        className="
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-6
        "
      >


        {/* 7 DAY TRAFFIC */}

        <div
          className="
            pp-panel
            p-6
            lg:col-span-2
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
              gap-4
            "
          >

            <div>

              <h2
                className="
                  text-2xl
                  font-black
                  text-cyan-400
                "
              >

                📈 7-DAY TRAFFIC

              </h2>


              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >

                Visitors and page views.

              </p>

            </div>

          </div>


          <div
            className="
              mt-8
              flex
              h-52
              items-end
              gap-3
              overflow-x-auto
              pb-6
            "
          >

            {traffic.map(
              (day) => {

                const viewHeight =
                  Math.max(
                    5,
                    (day.views /
                      maxTraffic) *
                      100
                  );


                const visitorHeight =
                  Math.max(
                    5,
                    (day.visitors /
                      maxTraffic) *
                      100
                  );


                return (

                  <div
                    key={day.date}
                    className="
                      flex
                      min-w-[55px]
                      flex-1
                      flex-col
                      items-center
                      justify-end
                      gap-2
                    "
                  >

                    <div
                      className="
                        flex
                        h-40
                        items-end
                        justify-center
                        gap-1
                      "
                    >

                      <div
                        className="
                          w-5
                          rounded-t-lg
                          bg-cyan-400
                          transition-all
                          duration-700
                        "
                        style={{
                          height:
                            `${viewHeight}%`,
                        }}
                        title={`${day.views} views`}
                      />


                      <div
                        className="
                          w-5
                          rounded-t-lg
                          bg-purple-400
                          transition-all
                          duration-700
                        "
                        style={{
                          height:
                            `${visitorHeight}%`,
                        }}
                        title={`${day.visitors} visitors`}
                      />

                    </div>


                    <span
                      className="
                        text-xs
                        font-bold
                        text-slate-500
                      "
                    >

                      {day.label}

                    </span>


                    <span
                      className="
                        text-[10px]
                        text-slate-600
                      "
                    >

                      {day.views}

                    </span>

                  </div>

                );

              }
            )}


            {traffic.length === 0 && (

              <div
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  text-slate-500
                "
              >

                No traffic data available yet.

              </div>

            )}

          </div>


          <div
            className="
              mt-2
              flex
              items-center
              gap-5
              text-xs
              text-slate-400
            "
          >

            <span className="flex items-center gap-2">

              <span className="h-2 w-2 rounded-full bg-cyan-400" />

              Page Views

            </span>


            <span className="flex items-center gap-2">

              <span className="h-2 w-2 rounded-full bg-purple-400" />

              Visitors

            </span>

          </div>

        </div>


        {/* TOP PAGES */}

        <div
          className="
            pp-panel
            p-6
          "
        >

          <h2
            className="
              text-2xl
              font-black
              text-green-400
            "
          >

            🔥 TOP PAGES

          </h2>


          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >

            Most viewed pages over
            the last 30 days.

          </p>


          <div className="mt-6 space-y-4">

            {topPages.length === 0 ? (

              <div
                className="
                  rounded-xl
                  border
                  border-white/10
                  bg-black/20
                  p-5
                  text-center
                  text-slate-500
                "
              >

                No page views recorded yet.

              </div>

            ) : (

              topPages.map(
                (page, index) => {

                  const width =
                    (page.views /
                      Math.max(
                        topPageViews,
                        1
                      )) *
                    100;


                  return (

                    <div
                      key={page.path}
                    >

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          gap-3
                          text-sm
                        "
                      >

                        <div
                          className="
                            flex
                            min-w-0
                            items-center
                            gap-2
                          "
                        >

                          <span
                            className="
                              flex
                              h-6
                              w-6
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              bg-cyan-500/10
                              text-xs
                              font-black
                              text-cyan-400
                            "
                          >

                            {index + 1}

                          </span>


                          <span
                            className="
                              truncate
                              font-bold
                              text-slate-300
                            "
                          >

                            {page.path}

                          </span>

                        </div>


                        <span
                          className="
                            shrink-0
                            font-black
                            text-white
                          "
                        >

                          {page.views}

                        </span>

                      </div>


                      <div
                        className="
                          mt-2
                          h-1.5
                          overflow-hidden
                          rounded-full
                          bg-white/5
                        "
                      >

                        <div
                          className="
                            h-full
                            rounded-full
                            bg-gradient-to-r
                            from-cyan-500
                            to-purple-500
                          "
                          style={{
                            width:
                              `${width}%`,
                          }}
                        />

                      </div>

                    </div>

                  );

                }
              )

            )}

          </div>

        </div>

      </section>


      {/* ======================================
          COMMAND CENTER STATUS
      ======================================= */}

      <section
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6
        "
      >

        <SystemStatusCard />

        <RecentActivity />

      </section>


      {/* ======================================
          QUICK ACTIONS
      ======================================= */}

      <section className="pp-panel p-6">


        <h2
          className="
            text-2xl
            font-black
            text-cyan-400
          "
        >

          ⚡ QUICK ACTIONS

        </h2>


        <div
          className="
            mt-5
            grid
            grid-cols-1
            md:grid-cols-4
            gap-4
          "
        >

          <a
            href="/admin/analytics"
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

            📈 Full Analytics

          </a>


          <a
            href="/admin/ai-content"
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

          </a>


          <a
            href="/admin/news"
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

          </a>


          <a
            href="/admin/merchandise"
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

          </a>

        </div>

      </section>


    </div>

  );

}


/* =========================================================
   TRAFFIC CARD
========================================================= */

function TrafficCard({
  title,
  value,
  icon,
  color,
  loading,
}: {
  title: string;
  value: number;
  icon: string;
  color: string;
  loading: boolean;
}) {


  const colors: Record<string, string> = {

    cyan:
      "border-cyan-500/20 text-cyan-400",

    purple:
      "border-purple-500/20 text-purple-400",

    green:
      "border-green-500/20 text-green-400",

    yellow:
      "border-yellow-500/20 text-yellow-400",

    pink:
      "border-pink-500/20 text-pink-400",

  };


  return (

    <div
      className={`
        pp-panel
        rounded-2xl
        border
        p-5
        ${colors[color]}
      `}
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <span className="text-2xl">

          {icon}

        </span>


        <span
          className="
            text-xs
            uppercase
            tracking-wider
            text-slate-500
          "
        >

          Live

        </span>

      </div>


      <div
        className="
          mt-4
          text-3xl
          font-black
        "
      >

        {loading
          ? "..."
          : value}

      </div>


      <div
        className="
          mt-1
          text-sm
          text-slate-400
        "
      >

        {title}

      </div>

    </div>

  );

}