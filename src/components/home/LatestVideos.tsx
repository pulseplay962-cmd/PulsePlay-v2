import BrandCard from "../ui/BrandCard";
import BrandButton from "../ui/BrandButton";

type Video = {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  url?: string;
  platform?: string;
};


type LatestVideosProps = {
  videos?: Video[];
};


export default function LatestVideos({
  videos = [],
}: LatestVideosProps) {

  return (
    <section className="mt-16">

      <div className="mb-8">

        <h2
          className="
            text-3xl
            md:text-4xl
            font-black
            pp-gradient-text
          "
        >
          Latest Videos
        </h2>

        <p className="mt-2 text-slate-400">
          Catch the latest gameplay, streams, and community highlights.
        </p>

      </div>


      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
      >

        {videos.length === 0 && (

          <BrandCard>

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <span className="pp-live-dot" />

              <h3 className="text-xl font-bold">
                No videos available
              </h3>

            </div>


            <p className="mt-3 text-slate-400">
              Add videos through the PulsePlay admin dashboard.
            </p>

          </BrandCard>

        )}



        {videos.map((video) => (

          <BrandCard key={video.id}>


            {video.thumbnail && (

              <img
                src={video.thumbnail}
                alt={video.title}
                className="
                  w-full
                  h-48
                  object-cover
                  rounded-xl
                  mb-5
                "
              />

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
                "
              >

                <span className="pp-live-dot" />

                {video.platform}

              </div>

            )}



            <h3
              className="
                text-xl
                font-bold
                text-white
              "
            >
              {video.title}
            </h3>



            {video.description && (

              <p
                className="
                  mt-3
                  text-slate-400
                  line-clamp-3
                "
              >
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

    </section>
  );
}