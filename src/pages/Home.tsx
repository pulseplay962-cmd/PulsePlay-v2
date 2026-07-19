import Hero from "../components/home/Hero";
import FeaturedGames from "../components/home/FeaturedGames";
import TwitchSection from "../components/home/TwitchSection";
import LatestVideos from "../components/home/LatestVideos";
import LatestNews from "../components/LatestNews";
import Support from "../components/home/Support";


export default function Home() {
  return (
    <>
      <Hero />

      <FeaturedGames />

      <TwitchSection channel="Veiltactician" />

      <LatestVideos />

      <LatestNews />

      <Support />
    </>
  );
}