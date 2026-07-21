import BrandCard from "./ui/BrandCard";
import BrandButton from "./ui/BrandButton";

export default function Support() {

  return (
    <section className="mt-16 mb-10">

      <BrandCard>

        <div
          className="
            text-center
            max-w-3xl
            mx-auto
          "
        >

          <h2
            className="
              text-3xl
              md:text-4xl
              font-black
              pp-gradient-text
            "
          >
            Support PulsePlay
          </h2>


          <p
            className="
              mt-4
              text-slate-400
              text-lg
            "
          >
            Help us continue building a gaming community
            where players can watch, discover, and connect.
          </p>


          <div
            className="
              mt-8
              flex
              flex-wrap
              justify-center
              gap-4
            "
          >

            <BrandButton>
              Join Community
            </BrandButton>


            <BrandButton variant="outline">
              Visit Store
            </BrandButton>

          </div>


        </div>

      </BrandCard>

    </section>
  );
}