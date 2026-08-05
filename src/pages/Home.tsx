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