import React from "react";

type BrandButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
};

export default function BrandButton({
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  ...props
}: BrandButtonProps) {
  const base = `
    relative
    inline-flex
    items-center
    justify-center
    gap-2
    overflow-hidden
    rounded-xl
    border
    px-7
    py-3
    font-black
    uppercase
    tracking-wider
    transition-all
    duration-300
    group
  `;

  const styles = {
    primary: `
      bg-gradient-to-r
      from-purple-600
      via-purple-500
      to-cyan-500
      text-white
      border-purple-400/30
      shadow-[0_0_25px_rgba(139,92,246,.45)]
      hover:shadow-[0_0_45px_rgba(34,211,238,.65)]
      hover:-translate-y-1
    `,

    secondary: `
      bg-slate-900/80
      text-cyan-300
      border-cyan-500/30
      shadow-[0_0_20px_rgba(34,211,238,.2)]
      hover:bg-cyan-500/10
      hover:-translate-y-1
    `,

    outline: `
      bg-transparent
      text-purple-300
      border-purple-500/60
      hover:bg-purple-500
      hover:text-white
      hover:shadow-[0_0_35px_rgba(139,92,246,.6)]
    `,
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        ${base}
        ${styles[variant]}
        ${disabled ? "cursor-not-allowed opacity-40" : "active:scale-95"}
        ${className}
      `}
      {...props}
    >
      {/* Shine Animation */}
      <span
        className="
          absolute
          inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
          transition-transform
          duration-700
          group-hover:translate-x-full
        "
      />

      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}