interface SectionTitleProps {
  title: string;
  highlight?: string;
}

export default function SectionTitle({
  title,
  highlight,
}: SectionTitleProps) {
  return (
    <h2 className="mb-12 text-center text-5xl font-black">
      {title}{" "}
      {highlight && (
        <span className="text-cyan-400">
          {highlight}
        </span>
      )}
    </h2>
  );
}