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



  const base = `

    relative

    overflow-hidden

    inline-flex

    items-center

    justify-center

    gap-2

    px-7

    py-3

    rounded-xl

    font-black

    uppercase

    tracking-wider

    transition-all

    duration-300

    border

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


      hover:

      shadow-[0_0_45px_rgba(34,211,238,.65)]


      hover:

      -translate-y-1


    `,





    secondary: `

      bg-slate-900/80


      text-cyan-300


      border-cyan-500/30


      shadow-[0_0_20px_rgba(34,211,238,.2)]


      hover:

      bg-cyan-500/10


      hover:

      -translate-y-1


    `,





    outline: `

      bg-transparent


      text-purple-300


      border-purple-500/60


      hover:

      bg-purple-500


      hover:

      text-white


      hover:

      shadow-[0_0_35px_rgba(139,92,246,.6)]


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


        ${disabled

          ? "opacity-40 cursor-not-allowed"

          : "active:scale-95"

        }


        ${className}


      `}

    >





      {/* Button Scan Animation */}

      <span

        className="

          absolute

          inset-0

          -translate-x-full

          bg-gradient-to-r

          from-transparent

          via-white/30

          to-transparent

          group-hover:translate-x-full

          transition-transform

          duration-700

        "

      />








      {/* Button Content */}

      <span

        className="

          relative

          z-10

          flex

          items-center

          gap-2

        "

      >

        {children}

      </span>




    </button>

  );

}