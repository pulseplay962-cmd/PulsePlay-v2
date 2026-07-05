type GameCardProps = {
  title: string;
};

export default function GameCard({ title }: GameCardProps) {
  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-cyan-400">
      <div className="mb-4 aspect-video rounded-xl bg-slate-800" />
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
  );
}