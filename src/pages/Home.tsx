import Hero from "../components/home/Hero";
import FeaturedGames from "../components/home/FeaturedGames";
import TwitchSection from "../components/home/TwitchSection";
import LatestVideos from "../components/home/LatestVideos";
import LatestNews from "../components/LatestNews";
import Support from "../components/home/Support";
import FeaturedMerchandise from "../components/FeaturedMerchandise";
import MerchBanner from "../components/MerchBanner";

export default function Home() {
  return (
    <>
      <Hero />

      <MerchBanner />

      <FeaturedGames />

      <TwitchSection channel="Veiltactician" />

      <LatestVideos />

      <LatestNews />
      
      <FeaturedMerchandise />

      <Support />
    </>
  );
}