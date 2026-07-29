import React from "react";


type BrandCardProps = {

  children: React.ReactNode;

  className?: string;

  hover?: boolean;

  scan?: boolean;

  hud?: boolean;

};




export default function BrandCard({

  children,

  className = "",

  hover = true,

  scan = false,

  hud = true,

}: BrandCardProps) {


  return (

    <div

      className={`

        relative

        overflow-hidden

        rounded-2xl

        p-6

        ${hud ? "pp-panel" : "pp-card"}

        ${scan ? "pp-scan" : ""}

        ${hover ? "card-hover" : ""}

        ${className}

      `}

    >



      {hud && (

        <div

          className="

            pointer-events-none

            absolute

            top-4

            right-5

            text-[10px]

            uppercase

            tracking-[0.3em]

            text-cyan-400

            opacity-60

            font-black

            z-10

          "

        >

          SYSTEM ONLINE

        </div>

      )}





      <div className="relative z-20">

        {children}

      </div>



    </div>

  );

}