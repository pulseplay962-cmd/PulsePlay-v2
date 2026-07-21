import { useEffect, useState } from "react";

import { getMerchandise } from "../../services/merchandise";
import { uploadMerchandiseImage } from "../../services/merchandiseStorage";


type MerchandiseItem = {
  id: string;
  name: string;
  category: string;
  price: string;
  badge?: string;
  image_url?: string;
  featured?: boolean;
};


export default function Merchandise() {

  const [items, setItems] = useState<MerchandiseItem[]>([]);

  const [image, setImage] = useState<File | null>(null);


  useEffect(() => {

    loadMerchandise();

  }, []);



  async function loadMerchandise() {

    try {

      const data = await getMerchandise();

      setItems(data || []);

    } catch (error) {

      console.error(
        "Failed to load merchandise:",
        error
      );

    }

  }



  async function handleImageUpload() {

    if (!image) {
      return;
    }


    try {

      const imageUrl =
        await uploadMerchandiseImage(image);


      console.log(
        "Uploaded image:",
        imageUrl
      );


    } catch(error) {

      console.error(
        "Image upload failed:",
        error
      );

    }

  }



  return (

    <div className="p-8 text-white">


      <div className="flex items-center justify-between">


        <div>

          <h1 className="text-3xl font-black text-cyan-400">
            🎮 Merchandise Manager
          </h1>


          <p className="mt-2 text-gray-400">
            Manage PulsePlay print-on-demand merchandise.
          </p>


        </div>



        <button
          className="
            rounded-lg
            bg-purple-600
            px-5
            py-3
            font-bold
            hover:bg-purple-500
          "
        >
          + Add Merchandise
        </button>


      </div>



      {/* Image Upload Test */}

      <div
        className="
          mt-8
          rounded-xl
          border
          border-purple-500/30
          bg-[#0b1120]
          p-5
        "
      >

        <h2 className="text-xl font-bold">
          Upload Merchandise Image
        </h2>


        <input
          type="file"
          accept="image/*"
          className="mt-4"
          onChange={(e) => {

            if(e.target.files) {

              setImage(
                e.target.files[0]
              );

            }

          }}
        />


        <button
          onClick={handleImageUpload}
          className="
            mt-4
            rounded-lg
            bg-cyan-600
            px-5
            py-2
            font-bold
            hover:bg-cyan-500
          "
        >
          Upload Image
        </button>


      </div>




      {/* Merchandise List */}

      <div className="mt-10 grid gap-6">


        {items.map((item) => (


          <div
            key={item.id}
            className="
              rounded-xl
              border
              border-purple-500/30
              bg-[#0b1120]
              p-5
            "
          >


            <div className="flex justify-between">


              <div>


                <h2 className="text-xl font-bold">
                  {item.name}
                </h2>


                <p className="text-gray-400">
                  {item.category}
                </p>


              </div>



              <div className="text-right">


                <p className="font-bold text-cyan-400">
                  {item.price}
                </p>


                <p className="text-sm text-purple-400">
                  {item.badge}
                </p>


              </div>


            </div>


          </div>


        ))}


      </div>


    </div>

  );

}