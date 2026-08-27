import { supabase } from "../lib/supabase";

console.log("🔥 PULSEPLAY ANALYTICS SERVICE LOADED");

const SESSION_KEY =
  "pulseplay_analytics_session";


/*
 * ======================================
 * Types
 * ======================================
 */

export type AnalyticsEvent = {

  id: string;

  session_id: string;

  event_type: string;

  page_path: string;

  page_title: string;

  referrer: string | null;

  user_agent: string | null;

  created_at: string;

  content_type: string | null;

  content_id: string | null;

  content_title: string | null;

};


export type AnalyticsSummary = {

  totalEvents: number;

  totalPageViews: number;

  uniqueSessions: number;

  newsViews: number;

  gameViews: number;

  storeViews: number;

  streamViews: number;

};


export type AnalyticsPage = {

  pagePath: string;

  views: number;

};


export type AnalyticsContent = {

  contentId: string | null;

  contentTitle: string;

  contentType: string;

  views: number;

};


export type AnalyticsDaily = {

  date: string;

  views: number;

};


/*
 * ======================================
 * Session Tracking
 * ======================================
 */

function generateSessionId(): string {

  return (
    "pp_" +
    Date.now().toString(36) +
    "_" +
    Math.random()
      .toString(36)
      .substring(2, 11)
  );

}


function getSessionId(): string {

  try {

    const existing =
      sessionStorage.getItem(
        SESSION_KEY
      );


    if (existing) {

      return existing;

    }


    const newSession =
      generateSessionId();


    sessionStorage.setItem(
      SESSION_KEY,
      newSession
    );


    return newSession;


  } catch {

    return generateSessionId();

  }

}


/*
 * ======================================
 * Track Event
 * ======================================
 */

export async function trackEvent({

  eventType,

  pagePath,

  pageTitle,

  contentType,

  contentId,

  contentTitle,

}: {

  eventType: string;

  pagePath?: string;

  pageTitle?: string;

  contentType?: string;

  contentId?: string;

  contentTitle?: string;

}) {


  try {


    const sessionId =
      getSessionId();


    const referrer =
      document.referrer || null;


    const userAgent =
      navigator.userAgent || null;


    const payload = {

      session_id:
        sessionId,

      event_type:
        eventType,

      page_path:
        pagePath ||
        window.location.pathname,

      page_title:
        pageTitle ||
        document.title,

      content_type:
        contentType ||
        null,

      content_id:
        contentId ||
        null,

      content_title:
        contentTitle ||
        null,

      referrer,

      user_agent:
        userAgent,

    };


    console.log(
      "📊 PULSEPLAY ANALYTICS EVENT:",
      payload
    );


    const {
      data,
      error,
    } = await supabase
      .from("analytics_events")
      .insert(payload)
      .select()
      .single();


    if (error) {


      console.error(
        "❌ ANALYTICS INSERT ERROR:",
        error
      );


      return null;

    }


    console.log(
      "✅ ANALYTICS EVENT RECORDED:",
      data
    );


    return data;


  } catch (error) {


    console.error(
      "❌ ANALYTICS ERROR:",
      error
    );


    return null;

  }

}


/*
 * ======================================
 * Track Page View
 * ======================================
 */

export async function trackPageView(

  pagePath?: string,

  options?: {

    contentType?: string;

    contentId?: string;

    contentTitle?: string;

  }

) {


  return trackEvent({

    eventType:
      "page_view",

    pagePath:
      pagePath ||
      window.location.pathname,

    pageTitle:
      document.title,

    contentType:
      options?.contentType,

    contentId:
      options?.contentId,

    contentTitle:
      options?.contentTitle,

  });

}


/*
 * ======================================
 * Get All Analytics Events
 * ======================================
 */

export async function getAnalyticsEvents(

  limit = 500

): Promise<AnalyticsEvent[]> {


  const {
    data,
    error,
  } = await supabase

    .from("analytics_events")

    .select("*")

    .order(
      "created_at",
      {
        ascending: false,
      }
    )

    .limit(limit);


  if (error) {

    console.error(
      "❌ ANALYTICS EVENTS ERROR:",
      error
    );

    throw error;

  }


  return (
    (data || []) as AnalyticsEvent[]
  );

}


/*
 * ======================================
 * Get Analytics Summary
 * ======================================
 */

export async function getAnalyticsSummary():

  Promise<AnalyticsSummary> {


  const events =
    await getAnalyticsEvents();


  const pageViews =
    events.filter(
      event =>
        event.event_type ===
        "page_view"
    );


  const uniqueSessions =
    new Set(
      events
        .map(
          event =>
            event.session_id
        )
        .filter(Boolean)
    ).size;


  const newsViews =
    pageViews.filter(
      event =>
        event.content_type ===
        "news"
    ).length;


  const gameViews =
    pageViews.filter(
      event =>
        event.content_type ===
        "game"
    ).length;


  const storeViews =
    pageViews.filter(
      event =>
        event.page_path ===
        "/store" ||
        event.content_type ===
        "store"
    ).length;


  const streamViews =
    pageViews.filter(
      event =>
        event.page_path ===
        "/streams" ||
        event.content_type ===
        "stream"
    ).length;


  return {

    totalEvents:
      events.length,

    totalPageViews:
      pageViews.length,

    uniqueSessions,

    newsViews,

    gameViews,

    storeViews,

    streamViews,

  };

}


/*
 * ======================================
 * Get Top Pages
 * ======================================
 */

export async function getTopPages(

  limit = 10

): Promise<AnalyticsPage[]> {


  const events =
    await getAnalyticsEvents();


  const counts =
    new Map<string, number>();


  events

    .filter(
      event =>
        event.event_type ===
        "page_view"
    )

    .forEach(
      event => {

        const path =
          event.page_path ||
          "/";


        counts.set(
          path,
          (counts.get(path) || 0) + 1
        );

      }
    );


  return Array.from(
    counts.entries()
  )

    .map(
      ([pagePath, views]) => ({

        pagePath,

        views,

      })
    )

    .sort(
      (a, b) =>
        b.views - a.views
    )

    .slice(0, limit);

}


/*
 * ======================================
 * Get Top Content
 * ======================================
 */

export async function getTopContent(

  limit = 10

): Promise<AnalyticsContent[]> {


  const events =
    await getAnalyticsEvents();


  const counts =
    new Map<
      string,
      AnalyticsContent
    >();


  events

    .filter(
      event =>
        event.event_type ===
          "page_view" &&
        event.content_title
    )

    .forEach(
      event => {

        const key =
          `${event.content_type || "content"}:${event.content_id || event.content_title}`;


        const existing =
          counts.get(key);


        if (existing) {

          existing.views += 1;

        } else {

          counts.set(
            key,
            {

              contentId:
                event.content_id,

              contentTitle:
                event.content_title ||
                "Untitled",

              contentType:
                event.content_type ||
                "content",

              views: 1,

            }
          );

        }

      }
    );


  return Array.from(
    counts.values()
  )

    .sort(
      (a, b) =>
        b.views - a.views
    )

    .slice(0, limit);

}


/*
 * ======================================
 * Get Recent Activity
 * ======================================
 */

export async function getRecentActivity(

  limit = 10

): Promise<AnalyticsEvent[]> {


  return getAnalyticsEvents(
    limit
  );

}


/*
 * ======================================
 * Get Daily Page Views
 * ======================================
 */

export async function getDailyPageViews(

  days = 7

): Promise<AnalyticsDaily[]> {


  const events =
    await getAnalyticsEvents(
      1000
    );


  const pageViews =
    events.filter(
      event =>
        event.event_type ===
        "page_view"
    );


  const today =
    new Date();


  const daily =
    new Map<string, number>();


  for (
    let i = days - 1;
    i >= 0;
    i--
  ) {


    const date =
      new Date(today);


    date.setDate(
      today.getDate() - i
    );


    const key =
      date
        .toISOString()
        .split("T")[0];


    daily.set(
      key,
      0
    );

  }


  pageViews.forEach(
    event => {

      const key =
        new Date(
          event.created_at
        )
          .toISOString()
          .split("T")[0];


      if (
        daily.has(key)
      ) {

        daily.set(
          key,
          (daily.get(key) || 0) + 1
        );

      }

    }
  );


  return Array.from(
    daily.entries()
  ).map(
    ([date, views]) => ({

      date,

      views,

    })
  );

}


/*
 * ======================================
 * Get News Analytics
 * ======================================
 */

export async function getNewsAnalytics(

  limit = 10

): Promise<AnalyticsContent[]> {


  const content =
    await getTopContent(
      100
    );


  return content

    .filter(
      item =>
        item.contentType ===
        "news"
    )

    .slice(0, limit);

}


/*
 * ======================================
 * Get Game Analytics
 * ======================================
 */

export async function getGameAnalytics(

  limit = 10

): Promise<AnalyticsContent[]> {


  const content =
    await getTopContent(
      100
    );


  return content

    .filter(
      item =>
        item.contentType ===
        "game"
    )

    .slice(0, limit);

}