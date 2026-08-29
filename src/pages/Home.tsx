import { NavLink } from "react-router-dom";
import BrandCard from "../components/ui/BrandCard";

import Hero from "../components/home/Hero";
import FeaturedGames from "../components/home/FeaturedGames";
import NewReleases from "../components/home/NewReleases";
import FeaturedProducts from "../components/home/FeaturedProducts";
import TwitchSection from "../components/home/TwitchSection";
import LatestVideos from "../components/home/LatestVideos";
import LatestNews from "../components/LatestNews";
import Support from "../components/home/Support";
import MerchBanner from "../components/MerchBanner";
import SignupPanel from "../components/community/SignupPanel";


export default function Home() {

  return (

    <>

      <Hero />


{/* GAMING COMMAND CENTER */}

<section className="mx-auto max-w-7xl px-6 -mt-8 mb-20">

  <BrandCard scan className="p-6 md:p-8">

    {/* Command Center Header */}

    <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

      <div>

        <p className="text-xs font-black tracking-[0.35em] text-cyan-400">
          PULSEPLAY NETWORK
        </p>

        <h2 className="mt-2 text-3xl md:text-4xl font-black text-white">
          COMMAND CENTER
        </h2>

        <p className="mt-2 max-w-2xl text-sm md:text-base text-slate-400">
          Your central gaming operations hub for broadcasts, missions,
          intelligence, and community activity.
        </p>

      </div>


      <div className="
        flex
        w-fit
        items-center
        gap-3
        rounded-full
        border
        border-green-400/20
        bg-green-400/5
        px-5
        py-2
        text-xs
        font-black
        tracking-[0.2em]
        text-green-400
      ">

        <span className="pp-live-dot" />

        NETWORK ONLINE

      </div>

    </div>


    {/* Command Sectors */}

    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">


      {/* Broadcast */}

      <NavLink to="/streams" className="group block">

        <BrandCard
          status="BROADCAST READY"
          className="
            h-full
            border-cyan-400/20
            transition-all
            duration-300
            group-hover:-translate-y-2
            group-hover:border-cyan-400/50
          "
        >

          <div className="flex items-start justify-between">

            <div className="text-4xl">
              📡
            </div>

            <span className="
              rounded-full
              border
              border-cyan-400/20
              px-2
              py-1
              text-[9px]
              font-black
              tracking-widest
              text-cyan-300
            ">
              LIVE
            </span>

          </div>

          <h3 className="mt-6 text-xl font-black text-cyan-400">
            BROADCAST
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Enter the broadcast center and monitor PulsePlay live
            transmissions.
          </p>

          <div className="
            mt-5
            text-xs
            font-black
            tracking-widest
            text-slate-500
            transition-colors
            group-hover:text-cyan-300
          ">
            LAUNCH CENTER →
          </div>

        </BrandCard>

      </NavLink>


      {/* Missions */}

      <NavLink to="/games" className="group block">

        <BrandCard
          status="MISSION DATABASE"
          className="
            h-full
            border-purple-400/20
            transition-all
            duration-300
            group-hover:-translate-y-2
            group-hover:border-purple-400/50
          "
        >

          <div className="flex items-start justify-between">

            <div className="text-4xl">
              🎮
            </div>

            <span className="
              rounded-full
              border
              border-purple-400/20
              px-2
              py-1
              text-[9px]
              font-black
              tracking-widest
              text-purple-300
            ">
              ACTIVE
            </span>

          </div>

          <h3 className="mt-6 text-xl font-black text-purple-400">
            MISSIONS
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Explore featured games, upcoming releases, and the PulsePlay
            mission database.
          </p>

          <div className="
            mt-5
            text-xs
            font-black
            tracking-widest
            text-slate-500
            transition-colors
            group-hover:text-purple-300
          ">
            OPEN DATABASE →
          </div>

        </BrandCard>

      </NavLink>


      {/* Intel */}

      <NavLink to="/news" className="group block">

        <BrandCard
          status="INTEL CONNECTED"
          className="
            h-full
            border-pink-400/20
            transition-all
            duration-300
            group-hover:-translate-y-2
            group-hover:border-pink-400/50
          "
        >

          <div className="flex items-start justify-between">

            <div className="text-4xl">
              📰
            </div>

            <span className="
              rounded-full
              border
              border-pink-400/20
              px-2
              py-1
              text-[9px]
              font-black
              tracking-widest
              text-pink-300
            ">
              ONLINE
            </span>

          </div>

          <h3 className="mt-6 text-xl font-black text-pink-400">
            INTEL
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Access gaming news, industry updates, announcements, and
            PulsePlay intelligence.
          </p>

          <div className="
            mt-5
            text-xs
            font-black
            tracking-widest
            text-slate-500
            transition-colors
            group-hover:text-pink-300
          ">
            ACCESS INTEL →
          </div>

        </BrandCard>

      </NavLink>


      {/* Community */}

      <NavLink to="/community" className="group block">

        <BrandCard
          status="PLAYER NETWORK"
          className="
            h-full
            border-cyan-300/20
            transition-all
            duration-300
            group-hover:-translate-y-2
            group-hover:border-cyan-300/50
          "
        >

          <div className="flex items-start justify-between">

            <div className="text-4xl">
              🌐
            </div>

            <span className="
              rounded-full
              border
              border-cyan-300/20
              px-2
              py-1
              text-[9px]
              font-black
              tracking-widest
              text-cyan-200
            ">
              CONNECTED
            </span>

          </div>

          <h3 className="mt-6 text-xl font-black text-cyan-300">
            COMMUNITY
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Connect with players, creators, events, and the growing
            PulsePlay network.
          </p>

          <div className="
            mt-5
            text-xs
            font-black
            tracking-widest
            text-slate-500
            transition-colors
            group-hover:text-cyan-200
          ">
            JOIN NETWORK →
          </div>

        </BrandCard>

      </NavLink>


    </div>

  </BrandCard>

</section>

      <TwitchSection
        channel="Veiltactician"
      />


      <FeaturedGames />


      <NewReleases />


      <LatestVideos />


      <LatestNews />


      <MerchBanner />


      <FeaturedProducts />


      {/* COMMUNITY NETWORK SIGNUP */}

      <section className="mx-auto max-w-7xl px-6 mt-16">

        <SignupPanel />

      </section>



      <Support />


    </>

  );

}