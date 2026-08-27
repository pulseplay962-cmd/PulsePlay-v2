import { useEffect, useState } from "react";

import { supabase } from "../../lib/supabase";


type AnalyticsStats = {
  news: number;
  ai: number;
  social: number;
  merchandise: number;
  videos: number;
  community: number;
};


type AIStatusStats = {
  pending: number;
  approved: number;
  published: number;
  rejected: number;
};


type RecentNews = {
  id: string;
  title: string;
  created_at?: string;
  published_at?: string;
};


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


export default function Analytics() {


  const [stats, setStats] =
    useState<AnalyticsStats>({
      news: 0,
      ai: 0,
      social: 0,
      merchandise: 0,
      videos: 0,
      community: 0,
    });


  const [aiStatus, setAIStatus] =
    useState<AIStatusStats>({
      pending: 0,
      approved: 0,
      published: 0,
      rejected: 0,
    });


  const [recentNews, setRecentNews] =
    useState<RecentNews[]>([]);


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


  const [lastUpdated, setLastUpdated] =
    useState<Date | null>(null);


  async function loadAnalytics() {


    try {


      setLoading(true);


      /*
       * ======================================
       * Existing PulsePlay statistics
       * ======================================
       */


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


      /*
       * ======================================
       * AI pipeline
       * ======================================
       */


      const statuses = [
        "pending",
        "approved",
        "published",
        "rejected",
      ];


      const statusResults =
        await Promise.all(

          statuses.map((status) =>

            supabase
              .from("ai_content_queue")
              .select("id", {
                count: "exact",
                head: true,
              })
              .eq("status", status)

          )

        );


      setAIStatus({
        pending: statusResults[0].count || 0,
        approved: statusResults[1].count || 0,
        published: statusResults[2].count || 0,
        rejected: statusResults[3].count || 0,
      });


      /*
       * ======================================
       * Recent News
       * ======================================
       */


      const recentNewsResult =
        await supabase
          .from("news")
          .select(
            "id,title,created_at,published_at"
          )
          .order("created_at", {
            ascending: false,
          })
          .limit(6);


      if (!recentNewsResult.error) {

        setRecentNews(
          recentNewsResult.data || []
        );

      }


      /*
       * ======================================
       * Traffic Analytics
       * ======================================
       */


      const now = new Date();


      const thirtyDaysAgo =
        new Date(now);


      thirtyDaysAgo.setDate(
        thirtyDaysAgo.getDate() - 29
      );


      const {
        data: trafficEvents,
        error: trafficError,
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
        .order("created_at", {
          ascending: true,
        });


      if (trafficError) {

        console.error(
          "TRAFFIC ANALYTICS ERROR:",
          trafficError
        );

      } else {


        const events =
          (trafficEvents ||
            []) as TrafficEvent[];


        buildTrafficAnalytics(
          events,
          now
        );

      }


      setLastUpdated(
        new Date()
      );


    } catch (error) {


      console.error(
        "ANALYTICS LOAD ERROR:",
        error
      );


    } finally {


      setLoading(false);

    }

  }


  function buildTrafficAnalytics(
    events: TrafficEvent[],
    now: Date
  ) {


    /*
     * ======================================
     * Date boundaries
     * ======================================
     */


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
     * Today
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
     * Seven days
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
     * Thirty days
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
     * Top Pages
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


    const sortedPages =
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
        .slice(0, 8);


    setTopPages(
      sortedPages
    );


    /*
     * ======================================
     * Seven-day chart data
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


      const views =
        dayEvents.length;


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

        views,

      });

    }


    setTraffic(
      dailyData
    );

  }


  useEffect(() => {


    loadAnalytics();


    const refreshAfterPublish = () => {

      loadAnalytics();

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


  const totalAI =
    aiStatus.pending +
    aiStatus.approved +
    aiStatus.published +
    aiStatus.rejected;


  const maxTraffic =
    Math.max(
      ...traffic.map(
        (day) => day.views
      ),
      1
    );


  const maxContent =
    Math.max(
      stats.news,
      stats.ai,
      stats.videos,
      1
    );


  function percentage(
    value: number,
    total: number
  ) {

    if (!total) return 0;

    return Math.round(
      (value / total) * 100
    );

  }


  function formatDate(
    date?: string
  ) {

    if (!date) return "Unknown";


    return new Date(
      date
    ).toLocaleDateString(
      undefined,
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );

  }


  return (

    <div className="space-y-8">


      {/* ======================================
          HEADER
      ======================================= */}

      <section
        className="
          pp-panel
          p-6
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

            📈 PulsePlay Analytics

          </h1>


          <p className="mt-3 text-slate-400">

            Real-time website traffic,
            content performance, AI activity,
            and platform statistics.

          </p>

        </div>


        <div className="flex items-center gap-4">


          {lastUpdated && (

            <span
              className="
                text-xs
                text-slate-500
              "
            >

              Updated{" "}
              {lastUpdated.toLocaleTimeString()}

            </span>

          )}


          <button
            onClick={loadAnalytics}
            disabled={loading}
            className="
              rounded-xl
              bg-cyan-500/20
              px-5
              py-3
              font-bold
              text-cyan-300
              transition
              hover:bg-cyan-500/30
              disabled:opacity-50
            "
          >

            {loading
              ? "⏳ Loading..."
              : "🔄 Refresh"}

          </button>


        </div>

      </section>


      {/* ======================================
          TRAFFIC OVERVIEW
      ======================================= */}

      <section>

        <div className="mb-4">

          <h2
            className="
              text-2xl
              font-black
              text-cyan-400
            "
          >

            🌐 TRAFFIC OVERVIEW

          </h2>

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
            loading={loading}
          />


          <TrafficCard
            title="Page Views Today"
            value={todayViews}
            icon="👁️"
            color="purple"
            loading={loading}
          />


          <TrafficCard
            title="7-Day Visitors"
            value={sevenDayVisitors}
            icon="📈"
            color="green"
            loading={loading}
          />


          <TrafficCard
            title="7-Day Views"
            value={sevenDayViews}
            icon="📊"
            color="yellow"
            loading={loading}
          />


          <TrafficCard
            title="30-Day Visitors"
            value={thirtyDayVisitors}
            icon="📅"
            color="pink"
            loading={loading}
          />


        </div>

      </section>


      {/* ======================================
          7 DAY TRAFFIC
      ======================================= */}

      <section className="pp-panel p-6">

        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
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

              📈 7-DAY TRAFFIC

            </h2>


            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >

              Page views recorded across
              the PulsePlay website.

            </p>

          </div>


          <div
            className="
              flex
              items-center
              gap-4
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


        <div
          className="
            mt-8
            flex
            h-64
            items-end
            gap-3
            overflow-x-auto
            pb-8
          "
        >


          {traffic.map(
            (day) => {


              const viewHeight =
                Math.max(
                  4,
                  (day.views /
                    maxTraffic) *
                    100
                );


              const visitorHeight =
                maxTraffic > 0
                  ? Math.max(
                      4,
                      (day.visitors /
                        maxTraffic) *
                        100
                    )
                  : 4;


              return (

                <div
                  key={day.date}
                  className="
                    flex
                    min-w-[70px]
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
                      h-48
                      w-full
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
                      title={`${day.views} page views`}
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

      </section>


      {/* ======================================
          TOP PAGES
      ======================================= */}

      <section
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6
        "
      >


        <div className="pp-panel p-6">

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

            Most viewed pages during the
            last 30 days.

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


                  const maxViews =
                    topPages[0]?.views ||
                    1;


                  const width =
                    (page.views /
                      maxViews) *
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
                          gap-4
                          text-sm
                        "
                      >

                        <div
                          className="
                            flex
                            min-w-0
                            items-center
                            gap-3
                          "
                        >

                          <span
                            className="
                              flex
                              h-7
                              w-7
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
                          h-2
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


        {/* ======================================
            CONTENT MIX
        ======================================= */}

        <div className="pp-panel p-6">

          <h2
            className="
              text-2xl
              font-black
              text-purple-400
            "
          >

            📊 CONTENT MIX

          </h2>


          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >

            Current PulsePlay content inventory.

          </p>


          <div className="mt-6 space-y-5">


            <MetricBar
              label="News Articles"
              value={stats.news}
              max={maxContent}
              icon="📰"
            />


            <MetricBar
              label="AI Content"
              value={stats.ai}
              max={maxContent}
              icon="🤖"
            />


            <MetricBar
              label="Videos"
              value={stats.videos}
              max={maxContent}
              icon="🎥"
            />


            <MetricBar
              label="Merchandise"
              value={stats.merchandise}
              max={
                Math.max(
                  stats.merchandise,
                  stats.news,
                  1
                )
              }
              icon="👕"
            />


          </div>

        </div>

      </section>


      {/* ======================================
          AI PIPELINE + RECENT CONTENT
      ======================================= */}

      <section
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6
        "
      >


        <div className="pp-panel p-6">

          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-center
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

                🤖 AI CONTENT PIPELINE

              </h2>


              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >

                AI content workflow status.

              </p>

            </div>


            <div
              className="
                text-sm
                text-slate-400
              "
            >

              Total:{" "}

              <span className="font-bold text-white">

                {totalAI}

              </span>

            </div>

          </div>


          <div className="mt-6 space-y-5">


            <PipelineBar
              label="Pending"
              value={aiStatus.pending}
              total={totalAI}
              icon="⏳"
            />


            <PipelineBar
              label="Approved"
              value={aiStatus.approved}
              total={totalAI}
              icon="✅"
            />


            <PipelineBar
              label="Published"
              value={aiStatus.published}
              total={totalAI}
              icon="🚀"
            />


            <PipelineBar
              label="Rejected"
              value={aiStatus.rejected}
              total={totalAI}
              icon="❌"
            />


          </div>

        </div>


        <div className="pp-panel p-6">

          <h2
            className="
              text-2xl
              font-black
              text-purple-400
            "
          >

            📰 RECENT CONTENT

          </h2>


          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >

            Recently added news content.

          </p>


          <div className="mt-5 space-y-3">


            {recentNews.length === 0 ? (

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

                No recent content found.

              </div>

            ) : (

              recentNews.map(
                (item) => (

                  <div
                    key={item.id}
                    className="
                      rounded-xl
                      border
                      border-white/10
                      bg-black/20
                      p-4
                      transition
                      hover:border-cyan-500/30
                    "
                  >

                    <div
                      className="
                        font-bold
                        text-white
                        line-clamp-2
                      "
                    >

                      {item.title}

                    </div>


                    <div
                      className="
                        mt-2
                        text-xs
                        text-slate-500
                      "
                    >

                      Added{" "}

                      {formatDate(
                        item.created_at
                      )}

                    </div>

                  </div>

                )

              )

            )}

          </div>

        </div>


      </section>


      {/* ======================================
          PULSEPLAY INSIGHTS
      ======================================= */}

      <section className="pp-panel p-6">

        <h2
          className="
            text-2xl
            font-black
            text-yellow-400
          "
        >

          ⚡ PULSEPLAY INSIGHTS

        </h2>


        <div
          className="
            mt-5
            grid
            grid-cols-1
            md:grid-cols-3
            gap-5
          "
        >


          <InsightCard
            icon="👥"
            title="Audience"
            text={
              todayVisitors > 0
                ? `${todayVisitors} unique visitor${todayVisitors === 1 ? "" : "s"} recorded today.`
                : "Visitor data will appear as people visit PulsePlay."
            }
          />


          <InsightCard
            icon="🔥"
            title="Top Page"
            text={
              topPages.length > 0
                ? `${topPages[0].path} is currently your most-viewed page.`
                : "Your most-viewed page will appear once traffic is recorded."
            }
          />


          <InsightCard
            icon="🤖"
            title="AI Automation"
            text={
              totalAI > 0
                ? `${percentage(
                    aiStatus.published,
                    totalAI
                  )}% of your AI content is currently published.`
                : "Your AI content pipeline is ready for data."
            }
          />


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

        {loading ? "..." : value}

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


/* =========================================================
   PIPELINE BAR
========================================================= */


function PipelineBar({
  label,
  value,
  total,
  icon,
}: {
  label: string;
  value: number;
  total: number;
  icon: string;
}) {


  const width =
    total > 0
      ? Math.min(
          100,
          (value / total) * 100
        )
      : 0;


  return (

    <div>

      <div
        className="
          mb-2
          flex
          items-center
          justify-between
          text-sm
        "
      >

        <span
          className="
            flex
            items-center
            gap-2
            font-bold
            text-slate-300
          "
        >

          <span>{icon}</span>

          {label}

        </span>


        <span className="text-slate-400">

          {value}

          <span className="text-slate-600">

            {" "}({Math.round(width)}%)

          </span>

        </span>

      </div>


      <div
        className="
          h-3
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
            from-purple-500
            to-cyan-400
            transition-all
            duration-700
          "
          style={{
            width: `${width}%`,
          }}
        />

      </div>

    </div>

  );

}


/* =========================================================
   METRIC BAR
========================================================= */


function MetricBar({
  label,
  value,
  max,
  icon,
}: {
  label: string;
  value: number;
  max: number;
  icon: string;
}) {


  const width =
    max > 0
      ? Math.min(
          100,
          (value / max) * 100
        )
      : 0;


  return (

    <div>

      <div
        className="
          mb-2
          flex
          justify-between
          text-sm
        "
      >

        <span
          className="
            flex
            items-center
            gap-2
            text-slate-300
          "
        >

          <span>{icon}</span>

          {label}

        </span>


        <span
          className="
            font-bold
            text-white
          "
        >

          {value}

        </span>

      </div>


      <div
        className="
          h-2
          overflow-hidden
          rounded-full
          bg-white/5
        "
      >

        <div
          className="
            h-full
            rounded-full
            bg-cyan-400
            transition-all
            duration-700
          "
          style={{
            width: `${width}%`,
          }}
        />

      </div>

    </div>

  );

}


/* =========================================================
   INSIGHT CARD
========================================================= */


function InsightCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {


  return (

    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-black/20
        p-5
      "
    >

      <div className="text-3xl">

        {icon}

      </div>


      <h3
        className="
          mt-3
          font-black
          text-white
        "
      >

        {title}

      </h3>


      <p
        className="
          mt-2
          text-sm
          leading-6
          text-slate-400
        "
      >

        {text}

      </p>

    </div>

  );

}