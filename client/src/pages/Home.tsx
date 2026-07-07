import Hero from "../components/Hero";
import FeaturedGames from "../components/FeatureGames";
import TwitchSection from "../components/TwitchSection";
import LatestVideos from "../components/LatestVideos";
import Support from "../components/Support";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedGames />
      <TwitchSection channel="Veiltactician" />
      <LatestVideos />
      <Support />
    </>
  );
}