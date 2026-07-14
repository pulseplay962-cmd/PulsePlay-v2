interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  duration: string;
}

interface Props {
  video: Video;
}

export default function VideoCard({ video }: Props) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noreferrer"
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-[#10141f] transition hover:border-cyan-400"
    >
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
        />

        <span className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-1 text-sm">
          {video.duration}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-bold">
          {video.title}
        </h3>
      </div>
    </a>
  );
}