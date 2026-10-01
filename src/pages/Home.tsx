import Hero from "../components/home/Hero";
import FeaturedGames from "../components/home/FeaturedGames";
import TwitchSection from "../components/home/TwitchSection";
import LatestVideos from "../components/home/LatestVideos";
import LatestNews from "../components/LatestNews";
import MerchBanner from "../components/MerchBanner";
import SignupPanel from "../components/community/SignupPanel";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-6 py-8 md:py-12">
        <TwitchSection channel="Veiltactician" />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 md:py-12">
        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
            Discover
          </p>
          <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">
            Find Your Next Game
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">
            Explore featured games without leaving the Command Center.
          </p>
        </div>
        <FeaturedGames />
      </section>

      <LatestNews />

      <section className="mx-auto max-w-7xl px-6 py-8 md:py-12">
        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-purple-400">
            From the Stream
          </p>
          <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">
            Latest Videos
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">
            Catch up on Veiltactician and the latest PulsePlay video content.
          </p>
        </div>
        <LatestVideos />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 md:py-12">
        <MerchBanner />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="mb-8 text-center">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
            You're Invited
          </p>
          <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">
            Be Part of PulsePlay
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">
            PulsePlay is built around gamers, creators, and people who simply love
            finding something fun to play. Come hang out and be part of the network.
          </p>
        </div>
        <SignupPanel />
      </section>
    </>
  );
}
