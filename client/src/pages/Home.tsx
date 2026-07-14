import Hero from "../components/home/Hero";
import FeaturedGames from "../components/home/FeaturedGames";
import TwitchSection from "../components/home/TwitchSection";
import LatestVideos from "../components/home/LatestVideos";
import Support from "../components/home/Support";
import LiveStatus from "../components/twitch/LiveStatus";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <LiveStatus />
      </section>

      <FeaturedGames />

      <TwitchSection channel="Veiltactician" />

      <LatestVideos />

      <Support />
    </>
  );
}