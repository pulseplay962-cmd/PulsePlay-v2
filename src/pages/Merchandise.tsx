import { useEffect, useState } from "react";

import { getMerchandise } from "../services/merchandise";


type MerchandiseItem = {

  id: string;

  name: string;

  description?: string;

  price: string;

  category: string;

  badge?: string;

  image_url?: string;

  checkout_url?: string;

};



export default function Merchandise() {


  const [items, setItems] =
    useState<MerchandiseItem[]>([]);


  const [loading, setLoading] =
    useState(true);



  useEffect(() => {

    loadMerchandise();

  }, []);




  async function loadMerchandise() {

    try {

      const data =
        await getMerchandise();


      setItems(data || []);


    } catch(error) {


      console.error(
        "Failed loading merchandise:",
        error
      );


    } finally {


      setLoading(false);


    }

  }





  return (

    <div className="
      min-h-screen
      bg-[#050816]
      px-6
      py-12
      text-white
    ">


      <section className="
        mx-auto
        max-w-6xl
      ">



        <div className="text-center">


          <h1 className="
            text-5xl
            font-black
            text-cyan-400
          ">
            👕 PulsePlay Merchandise
          </h1>



          <p className="
            mx-auto
            mt-4
            max-w-2xl
            text-lg
            text-gray-400
          ">
            Official PulsePlay gaming apparel and gear.
            Level up your setup and represent the community.
          </p>


        </div>





        {loading && (

          <p className="
            mt-12
            text-center
            text-gray-400
          ">
            Loading merchandise...
          </p>

        )}






        {!loading && items.length === 0 && (

          <div className="
            mt-12
            rounded-xl
            border
            border-purple-500/30
            bg-[#0b1120]
            p-8
            text-center
          ">

            <h2 className="
              text-2xl
              font-bold
            ">
              Coming Soon 🎮
            </h2>


            <p className="
              mt-2
              text-gray-400
            ">
              PulsePlay merchandise drops are being prepared.
            </p>


          </div>

        )}






        <div className="
          mt-12
          grid
          gap-8
          md:grid-cols-3
        ">



          {items.map((item) => (


            <div

              key={item.id}

              className="
                overflow-hidden
                rounded-xl
                border
                border-purple-500/30
                bg-[#0b1120]
              "

            >



              {item.image_url && (

                <img

                  src={item.image_url}

                  alt={item.name}

                  className="
                    h-64
                    w-full
                    object-cover
                  "

                />

              )}






              <div className="p-5">


                {item.badge && (

                  <span className="
                    rounded-full
                    bg-purple-600
                    px-3
                    py-1
                    text-sm
                    font-bold
                  ">
                    {item.badge}
                  </span>

                )}






                <h2 className="
                  mt-4
                  text-xl
                  font-black
                ">
                  {item.name}
                </h2>





                <p className="
                  mt-2
                  text-gray-400
                ">
                  {item.description}
                </p>






                <p className="
                  mt-4
                  text-xl
                  font-bold
                  text-cyan-400
                ">
                  ${item.price}
                </p>






                {item.checkout_url && (

                  <a

                    href={item.checkout_url}

                    target="_blank"

                    rel="noopener noreferrer"

                    className="
                      mt-5
                      block
                      rounded-lg
                      bg-purple-600
                      px-5
                      py-3
                      text-center
                      font-bold
                      hover:bg-purple-500
                    "

                  >

                    Buy Now

                  </a>

                )}



              </div>


            </div>


          ))}



        </div>



      </section>


    </div>

  );

}