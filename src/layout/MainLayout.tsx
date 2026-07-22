import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function MainLayout() {
  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#050510]
        text-white
      "
    >
      {/* ======================================
          Animated Background
      ======================================= */}

      {/* Main Gradient */}
      <div
        className="
          fixed
          inset-0
          -z-30
          bg-gradient-to-b
          from-[#0b0617]
          via-[#070b14]
          to-[#02040a]
        "
      />

      {/* Grid Overlay */}
      <div
        className="
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
          fixed
          inset-0
          -z-10
          pp-scan
          pointer-events-none
        "
      />

      {/* ======================================
          Navigation
      ======================================= */}

      <Navbar />

      {/* ======================================
          Main Content
      ======================================= */}

      <main className="relative z-10 flex-1 py-8">
        <div
          className="
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
                absolute
                inset-0
                rounded-[28px]
                border
                border-white/5
                pointer-events-none
              "
            />

            {/* Content Surface */}
            <div
              className="
                relative
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
            </div>
          </div>
        </div>
      </main>

      {/* ======================================
          HUD Status Bar
      ======================================= */}

      <div
        className="
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
          <span className="text-cyan-400 font-bold">
            PulsePlay Network
          </span>

          <span className="text-slate-600">|</span>

          <span>Gaming Command Center</span>
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

      <Footer />
    </div>
  );
}