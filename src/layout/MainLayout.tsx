import { useEffect, useState } from "react";
import {
  Outlet,
  useLocation,
} from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import RelatedAffiliateProducts from "../components/monetization/RelatedAffiliateProducts";
import PulsePlayAI from "../components/PulsePlayAI";

import { trackPageView } from "../services/analytics";


export default function MainLayout() {


  const location = useLocation();
  const [pageBooting, setPageBooting] = useState(true);


  /*
   * ======================================
   * Analytics
   * ======================================
   *
   * Track every public page navigation.
   *
   * Because MainLayout wraps the public
   * website, we only need this tracking
   * code in one place.
   */

  useEffect(() => {

    trackPageView(
      location.pathname
    );

    setPageBooting(true);
    const timer = window.setTimeout(() => setPageBooting(false), 10000);

    return () => window.clearTimeout(timer);

  }, [location.pathname]);


  const showAffiliateRecommendations =
    location.pathname.startsWith("/news/") ||
    location.pathname.startsWith("/games/");


  return (

    <div className={`relative min-h-screen overflow-x-hidden ${pageBooting ? "pp-page-booting" : ""}`}>

      <div className="page-ui">

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(4,7,17,.82), rgba(2,4,11,.90)), url(/pulseplay-command-center-bg.jpg)",
        }}
      />


      {/* ======================================
          Animated Background
      ======================================= */}

      {/* The global command-center background is provided by index.css.
          Keep this layout layer transparent so it cannot cover the background image. */}

      <div
        className="pointer-events-none fixed inset-0 -z-30 bg-transparent"
      />


      {/* Grid Overlay */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          -z-20
          opacity-25
          bg-[linear-gradient(rgba(34,211,238,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,.05)_1px,transparent_1px)]
          bg-[size:48px_48px]
        "
      />


      {/* Purple Orb */}

      <div
        className="
          pointer-events-none
          fixed
          top-[-250px]
          left-[-150px]
          h-[700px]
          w-[700px]
          rounded-full
          bg-purple-600/20
          blur-[180px]
          -z-10
          animate-pulse
        "
      />


      {/* Cyan Orb */}

      <div
        className="
          pointer-events-none
          fixed
          bottom-[-250px]
          right-[-150px]
          h-[700px]
          w-[700px]
          rounded-full
          bg-cyan-500/20
          blur-[180px]
          -z-10
          animate-pulse
        "
      />


      {/* Scan Overlay */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          -z-10
          pp-scan
        "
      />


      {/* ======================================
          Navigation
      ======================================= */}

      <div className="relative z-10">
        <Navbar />
      </div>


      {/* ======================================
          Main Content
      ======================================= */}

      <main className="relative z-10 flex-1 py-8">

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-[1600px]
            px-4
            lg:px-8
          "
        >

          <div
            className="
              pp-hud
              relative
              z-10
              overflow-hidden
              rounded-[28px]
              border
              border-cyan-500/20
              p-4
              shadow-[0_0_40px_rgba(139,92,246,.15)]
            "
          >

            {/* Inner Border Glow */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                z-0
                rounded-[28px]
                border
                border-white/5
              "
            />


            {/* Content Surface */}

            <div
              className="
                relative
                z-10
                overflow-hidden
                rounded-3xl
                border
                border-white/5
                bg-black/25
                backdrop-blur-md
                min-h-[72vh]
              "
            >

              <Outlet />

          <div className="mb-4 rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-center backdrop-blur-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              Game Image Notice
            </p>
            <p className="mt-2 text-xs leading-6 text-slate-400">
              Images used to represent games may be illustrative, AI-generated, licensed, stock, or otherwise sourced imagery and may not be official game screenshots. Third-party names, artwork, characters, logos, and trademarks belong to their respective owners.
              <a href="/disclaimer" className="ml-1 font-bold text-cyan-400 transition hover:text-cyan-300">
                Learn more →
              </a>
            </p>
          </div>

              {showAffiliateRecommendations && (
                <RelatedAffiliateProducts path={location.pathname} />
              )}

            </div>

          </div>

        </div>

      </main>


      {/* ======================================
          HUD Status Bar
      ======================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          max-w-[1600px]
          items-center
          justify-between
          px-6
          py-4
          text-[11px]
          uppercase
          tracking-[0.3em]
          text-slate-500
        "
      >

        <div className="flex items-center gap-3">

          <span className="font-bold text-cyan-400">

            PulsePlay Network

          </span>


          <span className="text-slate-600">

            |

          </span>


          <span>

            Gaming Command Center

          </span>

        </div>


        <div className="flex items-center gap-3">

          <span className="pp-live-dot" />


          <span className="font-bold text-green-400">

            System Online

          </span>

        </div>

      </div>


      {/* ======================================
          Footer
      ======================================= */}

      <div className="relative z-10">

        <Footer />

      <PulsePlayAI />

      </div>

      </div>

    </div>

  );

}