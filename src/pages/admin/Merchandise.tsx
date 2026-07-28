import { useEffect, useState } from "react";

import {
  getMerchandise,
  addMerchandise,
  updateMerchandise,
  deleteMerchandise,
  type MerchandiseItem,
} from "../../services/merchandise";

import {
  uploadMerchandiseImage,
  uploadMerchandiseGallery,
} from "../../services/merchandiseStorage";



type MerchandiseForm = {

  name:string;

  description:string;

  collection:string;

  category:string;

  price:string;

  sku:string;

  supplier:string;

  product_url:string;

  status:string;

};




const emptyForm:MerchandiseForm = {

  name:"",

  description:"",

  collection:"",

  category:"Gaming Apparel",

  price:"",

  sku:"",

  supplier:"Printful",

  product_url:"",

  status:"active",

};





export default function Merchandise(){


  const [items,setItems] =
    useState<MerchandiseItem[]>([]);



  const [image,setImage] =
    useState<File | null>(null);



  const [galleryImages,setGalleryImages] =
    useState<File[]>([]);



  const [editingId,setEditingId] =
    useState<string | null>(null);



  const [form,setForm] =
    useState<MerchandiseForm>({
      ...emptyForm
    });







  useEffect(()=>{

    loadMerchandise();

  },[]);







  async function loadMerchandise(){


    try{


      const data =
        await getMerchandise();


      setItems(data);



    }catch(error){


      console.error(
        "Failed loading merchandise",
        error
      );


    }


  }








  async function handleSubmit(){


    try{


      let imageUrl = "";

      let galleryUrls:string[] = [];




      if(image){


        imageUrl =
          await uploadMerchandiseImage(
            image
          );


      }





      if(galleryImages.length){


        galleryUrls =
          await uploadMerchandiseGallery(
            galleryImages
          );


      }





      await addMerchandise({

        name:form.name,

        description:form.description,

        collection:form.collection,

        category:form.category,

        price:Number(form.price),

        sku:form.sku,

        supplier:form.supplier,

        product_url:form.product_url,

        image_url:imageUrl,

        images:galleryUrls,

        status:form.status,

      });





      await loadMerchandise();


      resetForm();




    }catch(error){


      console.error(
        "Failed creating merchandise",
        error
      );


    }


  }









  async function handleUpdate(id:string){


    try{


      await updateMerchandise(

        id,

        {

          name:form.name,

          description:form.description,

          collection:form.collection,

          category:form.category,

          price:Number(form.price),

          sku:form.sku,

          supplier:form.supplier,

          product_url:form.product_url,

          status:form.status,

        }

      );




      await loadMerchandise();


      resetForm();




    }catch(error){


      console.error(
        "Failed updating merchandise",
        error
      );


    }


  }









  async function handleDelete(id:string){


    const confirmed =
      window.confirm(
        "Delete this merchandise item?"
      );



    if(!confirmed){

      return;

    }




    try{


      await deleteMerchandise(id);


      await loadMerchandise();



    }catch(error){


      console.error(
        "Failed deleting merchandise",
        error
      );


    }


  }








  function resetForm(){


    setForm({
      ...emptyForm
    });


    setImage(null);


    setGalleryImages([]);


    setEditingId(null);


  }









  function editItem(
    item:MerchandiseItem
  ){


    setEditingId(item.id);



    setForm({

      name:item.name,

      description:item.description || "",

      collection:item.collection || "",

      category:item.category || "Gaming Apparel",

      price:String(item.price),

      sku:item.sku || "",

      supplier:item.supplier || "Printful",

      product_url:item.product_url || "",

      status:item.status || "active",

    });


  }


    return (

    <div className="p-8 text-white">


      <h1 className="
        text-3xl
        font-black
        text-cyan-400
      ">

        🎮 Merchandise Manager

      </h1>



      <p className="
        mt-2
        text-gray-400
      ">

        Manage PulsePlay print-on-demand merchandise.

      </p>






      <div className="
        mt-8
        rounded-xl
        border
        border-purple-500/30
        bg-[#0b1120]
        p-6
      ">


        <h2 className="text-xl font-bold">

          {
            editingId
            ? "Edit Merchandise"
            : "Add Merchandise"
          }

        </h2>






        <input

          placeholder="Product Name"

          className="
            mt-4
            w-full
            rounded
            bg-black
            p-3
          "

          value={form.name}

          onChange={(e)=>

            setForm({

              ...form,

              name:e.target.value

            })

          }

        />







        <textarea

          placeholder="Description"

          className="
            mt-4
            w-full
            rounded
            bg-black
            p-3
          "

          value={form.description}

          onChange={(e)=>

            setForm({

              ...form,

              description:e.target.value

            })

          }

        />







        <input

          placeholder="Collection"

          className="
            mt-4
            w-full
            rounded
            bg-black
            p-3
          "

          value={form.collection}

          onChange={(e)=>

            setForm({

              ...form,

              collection:e.target.value

            })

          }

        />







        <input

          placeholder="Price"

          className="
            mt-4
            w-full
            rounded
            bg-black
            p-3
          "

          value={form.price}

          onChange={(e)=>

            setForm({

              ...form,

              price:e.target.value

            })

          }

        />







        <input

          placeholder="SKU"

          className="
            mt-4
            w-full
            rounded
            bg-black
            p-3
          "

          value={form.sku}

          onChange={(e)=>

            setForm({

              ...form,

              sku:e.target.value

            })

          }

        />







        <input

          placeholder="Printful Product URL"

          className="
            mt-4
            w-full
            rounded
            bg-black
            p-3
          "

          value={form.product_url}

          onChange={(e)=>

            setForm({

              ...form,

              product_url:e.target.value

            })

          }

        />








        <div className="mt-5">

          <label className="
            font-bold
            text-cyan-400
          ">

            Main Product Image

          </label>


          <input

            type="file"

            accept="image/*"

            className="mt-3"

            onChange={(e)=>{

              if(e.target.files){

                setImage(
                  e.target.files[0]
                );

              }

            }}

          />

        </div>








        <div className="mt-5">

          <label className="
            font-bold
            text-cyan-400
          ">

            Gallery Images

          </label>



          <input

            type="file"

            accept="image/*"

            multiple

            className="mt-3"

            onChange={(e)=>{

              if(e.target.files){

                setGalleryImages(
                  Array.from(
                    e.target.files
                  )
                );

              }

            }}

          />


        </div>








        <button

          onClick={()=>{

            editingId

            ? handleUpdate(editingId)

            : handleSubmit();

          }}

          className="
            mt-6
            rounded-lg
            bg-purple-600
            px-6
            py-3
            font-bold
            hover:bg-purple-500
          "

        >

          {
            editingId
            ? "Update Merchandise"
            : "Create Merchandise"
          }

        </button>







        {
          editingId && (

            <button

              onClick={resetForm}

              className="
                ml-4
                rounded-lg
                bg-gray-700
                px-6
                py-3
                font-bold
              "

            >

              Cancel

            </button>

          )
        }



      </div>









      <div className="
        mt-10
        grid
        gap-6
      ">


        {
          items.map((item)=>(


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


              <h2 className="
                text-xl
                font-bold
              ">

                {item.name}

              </h2>





              <p className="text-gray-400">

                {item.collection}

              </p>






              <p className="
                font-bold
                text-cyan-400
              ">

                ${Number(item.price).toFixed(2)}

              </p>






              <p className="
                text-sm
                text-purple-400
              ">

                {item.supplier}

              </p>








              {
                item.image_url && (

                  <img

                    src={item.image_url}

                    alt={item.name}

                    className="
                      mt-4
                      h-40
                      rounded-lg
                      object-cover
                    "

                  />

                )
              }







              <div className="
                mt-5
                flex
                gap-3
              ">


                <button

                  onClick={()=>
                    editItem(item)
                  }

                  className="
                    rounded-lg
                    bg-cyan-600
                    px-4
                    py-2
                    font-bold
                  "

                >

                  Edit

                </button>







                <button

                  onClick={()=>
                    handleDelete(item.id)
                  }

                  className="
                    rounded-lg
                    bg-red-600
                    px-4
                    py-2
                    font-bold
                  "

                >

                  Delete

                </button>



              </div>



            </div>


          ))
        }


      </div>



    </div>

  );

}