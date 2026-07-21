import React from "react";

type BrandButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export default function BrandButton({
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: BrandButtonProps) {

  const base =
    `
    relative
    overflow-hidden
    px-6
    py-3
    rounded-xl
    font-bold
    transition-all
    duration-300
    pp-shine
    `;

  const styles = {

    primary:
      `
      bg-gradient-to-r
      from-purple-600
      to-cyan-500
      text-white
      hover:scale-105
      shadow-lg
      shadow-purple-500/30
      `,

    secondary:
      `
      bg-slate-800
      text-white
      border
      border-white/10
      hover:bg-slate-700
      hover:scale-105
      `,

    outline:
      `
      border
      border-purple-500
      text-purple-400
      hover:bg-purple-500
      hover:text-white
      `
  };


  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${base}
        ${styles[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
}