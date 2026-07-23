import { useEffect, useState } from "react";

import BrandCard from "../ui/BrandCard";
import BrandButton from "../ui/BrandButton";

import {
  getVideos,
  type Video,
} from "../../services/videos";


export default function LatestVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    loadVideos();
  }, []);



  async function loadVideos() {
    try {
      const data = await getVideos();


      setVideos(data ?? []);

    } catch (err) {

      console.error(
        "LATEST VIDEOS ERROR:",
        err
      );

      setVideos([]);

    } finally {

      setLoading(false);

    }
  }



  console.log(
    "Current state:",
    videos
  );



  return (
    <section className="mt-20">

      {/* Header */}
      <div className="mb-10">

        <h2 className="text-3xl md:text-5xl font-black pp-gradient-text">
          Latest Videos
        </h2>

        <p className="mt-3 text-slate-400 max-w-2xl">
          Catch the latest gameplay,
          streams, highlights, and
          PulsePlay community moments.
        </p>

      </div>



      {loading ? (

        <div className="text-center text-slate-400 py-10">
          Loading videos...
        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">


          {videos.length === 0 && (

            <BrandCard>

              <div className="flex items-center gap-3">

                <span className="pp-live-dot" />

                <h3 className="text-xl font-bold">
                  No videos available
                </h3>

              </div>


              <p className="mt-4 text-slate-400">
                Upload videos through the PulsePlay admin dashboard.
              </p>


            </BrandCard>

          )}




          {videos.map((video) => (

            <BrandCard
              key={video.id}
              className="card-hover"
            >


              {video.thumbnail ? (

                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="
                    w-full
                    h-52
                    object-cover
                    rounded-xl
                    mb-5
                  "
                />

              ) : (

                <div
                  className="
                    h-52
                    rounded-xl
                    mb-5
                    flex
                    items-center
                    justify-center
                    bg-black/40
                    border
                    border-white/10
                    text-slate-500
                  "
                >
                  No Thumbnail
                </div>

              )}





              {video.platform && (

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    mb-3
                    text-sm
                    text-cyan-400
                    font-bold
                  "
                >

                  <span className="pp-live-dot" />

                  {video.platform}

                </div>

              )}






              <h3 className="text-xl font-bold text-white">

                {video.title}

              </h3>






              {video.description && (

                <p className="mt-3 text-slate-400 line-clamp-3">

                  {video.description}

                </p>

              )}






              {video.url && (

                <div className="mt-6">

                  <a
                    href={video.url}
                    target="_blank"
                    rel="noreferrer"
                  >

                    <BrandButton>
                      Watch Now
                    </BrandButton>

                  </a>

                </div>

              )}


            </BrandCard>

          ))}


        </div>

      )}


    </section>
  );
}