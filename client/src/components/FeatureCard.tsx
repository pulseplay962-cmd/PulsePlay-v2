type Props = {
  title: string;
  description: string;
};

export default function FeatureCard({
  title,
  description,
}: Props) {
  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-white/5 p-8 transition hover:border-cyan-400 hover:scale-[1.02]">
      <h3 className="mb-4 text-2xl font-bold">
        {title}
      </h3>

      <p className="text-gray-400">
        {description}
      </p>
    </div>
  );
}