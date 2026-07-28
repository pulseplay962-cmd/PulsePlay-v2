import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { supabase } from "../lib/supabase";

import BrandButton from "../components/ui/BrandButton";



export default function MerchandiseDetail() {


  const { id } = useParams();


  const [item, setItem] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState("");





  useEffect(() => {


    async function loadProduct(){


      try {


        const { data, error } =
          await supabase
            .from("merchandise")
            .select("*")
            .eq("id", id)
            .single();




        if(error){

          throw error;

        }




        setItem(data);



        setSelectedImage(
          data.image_url ||
          "/images/pulseplay-placeholder.jpg"
        );




      } catch(error){


        console.error(
          "Failed loading merchandise:",
          error
        );


      } finally {


        setLoading(false);


      }


    }




    if(id){

      loadProduct();

    }


  }, [id]);







  if(loading){


    return (

      <main className="text-center py-20">

        <h1
          className="
          text-4xl
          font-black
          pp-gradient-text
          "
        >

          LOADING LOADOUT...

        </h1>

      </main>

    );

  }






  if(!item){


    return (

      <main className="text-center py-20">

        <h1
          className="
          text-3xl
          font-black
          text-slate-400
          "
        >

          MERCHANDISE NOT FOUND

        </h1>


      </main>

    );


  }







  const gallery = [

    item.image_url,

    ...(item.images || [])

  ].filter(Boolean);







  return (

    <main className="px-6 py-12">


      <div
        className="
        mx-auto
        max-w-6xl
        grid
        md:grid-cols-2
        gap-10
        ">






        {/* PRODUCT IMAGE */}


        <section>


          <div
            className="
            overflow-hidden
            rounded-2xl
            border
            border-purple-500/30
            bg-[#0b1120]
            "
          >


            <img

              src={
                selectedImage ||
                "/images/pulseplay-placeholder.jpg"
              }

              alt={item.name}

              className="
              w-full
              aspect-square
              object-cover
              "

            />


          </div>







          {gallery.length > 1 && (

            <div
              className="
              mt-5
              flex
              gap-3
              overflow-x-auto
              "
            >


              {gallery.map(
                (image:string,index:number)=>(


                <button

                  key={index}

                  onClick={() =>
                    setSelectedImage(image)
                  }

                  className="
                  h-20
                  w-20
                  overflow-hidden
                  rounded-xl
                  border
                  border-purple-500/40
                  "
                >

                  <img

                    src={image}

                    alt={`${item.name}-${index}`}

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



        </section>









        {/* PRODUCT INFORMATION */}


        <section>




          {item.featured && (

            <span
              className="
              inline-block
              rounded-full
              bg-yellow-400/20
              border
              border-yellow-400/40
              px-4
              py-2
              text-xs
              font-black
              tracking-widest
              text-yellow-300
              "
            >

              ⭐ FEATURED DROP

            </span>

          )}






          <span
            className="
            mt-3
            inline-block
            rounded-full
            bg-pink-500/20
            border
            border-pink-400/30
            px-4
            py-2
            text-xs
            font-black
            tracking-widest
            text-pink-300
            "
          >

            {item.collection || "PULSEPLAY COLLECTION"}

          </span>







          <h1
            className="
            mt-6
            text-5xl
            font-black
            pp-gradient-text
            "
          >

            {item.name}

          </h1>







          <p
            className="
            mt-5
            text-lg
            text-slate-400
            "
          >

            {item.description}

          </p>









          <div
            className="
            mt-8
            grid
            grid-cols-2
            gap-4
            "
          >



            <div className="pp-card-surface p-4">

              <p className="text-slate-400 text-sm">

                CATEGORY

              </p>


              <p className="text-cyan-300 font-bold">

                {item.category || "APPAREL"}

              </p>


            </div>







            <div className="pp-card-surface p-4">

              <p className="text-slate-400 text-sm">

                SUPPLIER

              </p>


              <p className="text-purple-300 font-bold">

                {item.supplier || "Printful"}

              </p>


            </div>





            <div className="pp-card-surface p-4">

              <p className="text-slate-400 text-sm">

                SKU

              </p>


              <p className="text-white font-bold">

                {item.sku || "PP-GEAR"}

              </p>


            </div>






            <div className="pp-card-surface p-4">

              <p className="text-slate-400 text-sm">

                STATUS

              </p>


              <p className="text-green-400 font-bold">

                AVAILABLE

              </p>


            </div>



          </div>









          <div
            className="
            mt-8
            flex
            items-center
            justify-between
            "
          >


            <span
              className="
              text-4xl
              font-black
              text-purple-400
              "
            >

              ${Number(item.price).toFixed(2)}

            </span>







            <a

              href={item.product_url}

              target="_blank"

              rel="noopener noreferrer"

            >

              <BrandButton>

                BUY FROM PRINTFUL

              </BrandButton>


            </a>



          </div>





        </section>





      </div>


    </main>

  );

}