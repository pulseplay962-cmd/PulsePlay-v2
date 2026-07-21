import { Link } from "react-router-dom";

import BrandButton from "../components/ui/BrandButton";
import BrandCard from "../components/ui/BrandCard";


export default function NotFound() {

  return (

    <main
      className="
        min-h-[70vh]
        flex
        items-center
        justify-center
        px-6
      "
    >

      <BrandCard
        className="
          max-w-2xl
          w-full
          text-center
          card-hover
        "
      >

        <div
          className="
            text-8xl
            font-black
            pp-gradient-text
          "
        >
          404
        </div>


        <h1
          className="
            mt-6
            text-4xl
            md:text-5xl
            font-black
            text-white
          "
        >
          Game Over?
        </h1>


        <p
          className="
            mt-4
            text-lg
            text-slate-400
          "
        >
          Looks like this page wandered into an
          unknown level. Let's get you back into
          the PulsePlay universe.
        </p>


        <div
          className="
            mt-8
            flex
            justify-center
          "
        >

          <Link to="/">

            <BrandButton>
              Return Home
            </BrandButton>

          </Link>

        </div>


      </BrandCard>


    </main>

  );

}