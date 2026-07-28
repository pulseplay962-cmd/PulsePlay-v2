import { useEffect, useState } from "react";

import { getMerchandise } from "../services/merchandise";

import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";


type MerchandiseItem = {

  id: string;

  name: string;

  description?: string;

  category?: string;

  collection?: string;

  price: number;

  image_url?: string;

  images?: string[];

  product_url?: string;

  sku?: string;

  supplier?: string;

  status?: string;

  feature?: boolean;

};




export default function Merchandise() {


  const [merchandise, setMerchandise] =
    useState<MerchandiseItem[]>([]);


  const [loading, setLoading] =
    useState(true);



  const [selectedImages, setSelectedImages] =
    useState<Record<string,string>>({});





  useEffect(() => {


    async function loadMerchandise(){


      try {


        const data =
          await getMerchandise();



        setMerchandise(data || []);




        const defaults:
          Record<string,string> = {};



        (data || []).forEach(
          (item: MerchandiseItem)=>{


            if(item.image_url){

              defaults[item.id] =
                item.image_url;

            }


          }
        );



        setSelectedImages(defaults);



      } catch(error){


        console.error(
          "Failed to load merchandise:",
          error
        );


      } finally {


        setLoading(false);

      }


    }



    loadMerchandise();


  }, []);







  if(loading){

    return (

      <main className="text-center py-20">

        <h1 className="text-4xl font-black pp-gradient-text">

          LOADING LOCKER...

        </h1>

      </main>

    );

  }







  return (

    <main>





      <section className="text-center mb-16">


        <div
          className="
          inline-flex
          items-center
          gap-3
          px-5
          py-2
          rounded-full
          pp-hud
          text-pink-300
          text-sm
          font-black
          tracking-[0.35em]
          "
        >

          👕 STYLE DATABASE ONLINE

        </div>





        <h1
          className="
          mt-8
          text-5xl
          md:text-7xl
          font-black
          pp-gradient-text
          "
        >

          PULSEPLAY LOCKER

        </h1>





        <p
          className="
          mt-5
          mx-auto
          max-w-3xl
          text-lg
          text-slate-400
          "
        >

          Customize your player identity with
          official PulsePlay apparel,
          creator gear, and gaming lifestyle items.

        </p>


      </section>







      <section>


        <div
          className="
          flex
          items-center
          justify-between
          mb-8
          "
        >

          <h2 className="text-3xl font-black">

            AVAILABLE LOADOUTS

          </h2>



          <span className="text-green-400 text-sm tracking-widest">

            ● INVENTORY READY

          </span>


        </div>








        {merchandise.length === 0 ? (


          <div className="text-center py-20">

            <h2 className="text-2xl font-black text-slate-400">

              NO MERCHANDISE AVAILABLE

            </h2>


          </div>


        ) : (



        <div
          className="
          grid
          md:grid-cols-3
          gap-8
          "
        >



        {merchandise.map((item)=>(



          <BrandCard

            key={item.id}

            className="
            group
            card-hover
            "

          >





            <div className="relative overflow-hidden rounded-xl">


              <img

                src={
                  selectedImages[item.id] ||
                  item.image_url ||
                  "/images/pulseplay-placeholder.jpg"
                }

                alt={item.name}

                className="
                w-full
                h-72
                object-cover
                transition
                duration-500
                group-hover:scale-110
                "

              />



              {item.feature && (

                <span

                  className="
                  absolute
                  top-4
                  left-4
                  rounded-full
                  bg-purple-600
                  px-4
                  py-1
                  text-xs
                  font-black
                  tracking-widest
                  "
                >

                  FEATURED DROP

                </span>

              )}


            </div>








            {item.images &&
            item.images.length > 0 && (


              <div className="mt-4 flex gap-3 overflow-x-auto">


                {item.images.map(
                  (image,index)=>(


                  <button

                    key={index}

                    onClick={()=>{

                      setSelectedImages({

                        ...selectedImages,

                        [item.id]:image

                      });

                    }}


                    className="
                    h-16
                    w-16
                    overflow-hidden
                    rounded-lg
                    border
                    border-purple-500/40
                    "

                  >

                    <img

                      src={image}

                      alt={item.name}

                      className="
                      h-full
                      w-full
                      object-cover
                      "

                    />

                  </button>


                ))}


              </div>


            )}








            <div className="mt-5 flex justify-between">


              <span
                className="
                rounded-full
                bg-pink-500/20
                border
                border-pink-400/30
                px-3
                py-1
                text-xs
                font-black
                text-pink-300
                "
              >

                {item.collection || "PULSEPLAY"}

              </span>



              <span className="text-green-400 text-xs font-bold">

                AVAILABLE

              </span>


            </div>







            <h2 className="mt-5 text-2xl font-black">

              {item.name}

            </h2>





            <p className="mt-3 text-slate-400">

              {item.description}

            </p>








            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">


              <div className="pp-card-surface p-3">

                <p className="text-slate-400">
                  CLASS
                </p>

                <p className="text-cyan-300 font-bold">

                  {item.category || "APPAREL"}

                </p>

              </div>





              <div className="pp-card-surface p-3">

                <p className="text-slate-400">
                  RARITY
                </p>

                <p className="text-yellow-300 font-bold">

                  {item.feature
                    ? "LEGENDARY"
                    : "STANDARD"}

                </p>

              </div>


            </div>








            <div
              className="
              mt-6
              flex
              justify-between
              items-center
              "
            >


              <span
                className="
                text-xl
                font-black
                text-purple-400
                "
              >

                ${Number(item.price).toFixed(2)}

              </span>





              <a href={`/merchandise/${item.id}`}>

                <BrandButton>

                  VIEW LOADOUT

                </BrandButton>

              </a>


            </div>





          </BrandCard>


        ))}



        </div>


        )}


      </section>


    </main>

  );

}