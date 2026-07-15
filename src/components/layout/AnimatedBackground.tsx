export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#05070d]">
      {/* Cyan Glow */}
      <div className="absolute left-[-200px] top-[-150px] h-[500px] w-[500px] animate-pulse rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* Purple Glow */}
      <div className="absolute right-[-250px] bottom-[-200px] h-[600px] w-[600px] animate-pulse rounded-full bg-violet-600/10 blur-[150px]" />

      {/* Blue Glow */}
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[120px]" />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}