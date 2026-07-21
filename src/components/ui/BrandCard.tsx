import React from "react";

type BrandCardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export default function BrandCard({
  children,
  className = "",
  hover = true,
}: BrandCardProps) {

  return (
    <div
      className={`
        pp-card-surface
        p-6
        ${hover ? "pp-hover-lift" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}