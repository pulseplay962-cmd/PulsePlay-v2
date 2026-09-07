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

import {
  getPrintfulProducts,
  getPrintfulProduct,
  syncPrintfulMerchandise,
  type PrintfulProduct,
} from "../../services/printful";



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

  const [printfulProducts,setPrintfulProducts] =
    useState<PrintfulProduct[]>([]);

  const [loadingPrintful,setLoadingPrintful] =
    useState(false);

  const [syncingPrintful,setSyncingPrintful] =
    useState(false);

  const [importingPrintfulId,setImportingPrintfulId] =
    useState<number | null>(null);



  const [editingId,setEditingId] =
    useState<string | null>(null);

  const [form,setForm] =
    useState<MerchandiseForm>({
      ...emptyForm
    });







  useEffect(()=>{

    loadMerchandise();

  },[]);







  async function loadPrintfulProducts(){

    try{

      setLoadingPrintful(true);

      const products =
        await getPrintfulProducts();

      setPrintfulProducts(products);

    }catch(error){

      console.error(
        "Failed loading Printful products",
        error
      );

      window.alert(
        "Failed to load Printful products."
      );

    }finally{

      setLoadingPrintful(false);

    }

  }



  async function syncAllPrintfulMerchandise(){
    const confirmed = window.confirm(
      "Sync all Printful merchandise into PulsePlay?\n\n" +
      "This will add missing products and update existing Printful products.\n\n" +
      "It will NOT delete merchandise or create products in Printful."
    );

    if(!confirmed){
      return;
    }

    try{
      setSyncingPrintful(true);

      const result =
        await syncPrintfulMerchandise();

      await loadMerchandise();

      window.alert(
        "Printful Sync Complete!\n\n" +
        `${result.inserted} products added\n` +
        `${result.updated} products updated\n` +
        `${result.errors} errors`
      );

    }catch(error){
      console.error(
        "Printful merchandise sync failed",
        error
      );

      window.alert(
        error instanceof Error
          ? error.message
          : "Printful merchandise sync failed."
      );

    }finally{
      setSyncingPrintful(false);
    }
  }


  async function importPrintfulProduct(
    product:PrintfulProduct
  ){

    try{

      setImportingPrintfulId(
        product.id
      );

      const printfulSku =
        `PRINTFUL-${product.id}`;

      const existing =
        items.find(
          (item) =>
            item.sku === printfulSku
        );

      if(existing){

        window.alert(
          `${product.name} is already imported.`
        );

        return;

      }

      /*
       * Fetch the complete Printful product.
       *
       * The product list only contains summary information.
       * The detail endpoint contains all sync variants.
       */

      const fullProduct =
        await getPrintfulProduct(
          product.id
        );

      const variants =
        fullProduct.sync_variants || [];

      const variantPrices =
        variants
          .map(
            (variant) =>
              Number(
                variant.retail_price
              )
          )
          .filter(
            (price) =>
              !Number.isNaN(price)
          );

      const lowestPrice =
        variantPrices.length
          ? Math.min(...variantPrices)
          : 29.99;

      const variantImages =
        variants
          .flatMap(
            (variant) => [

              variant.product?.image,

              ...(variant.files || [])
                .map(
                  (file) =>
                    file.preview_url ||
                    file.thumbnail_url
                )

            ]
          )
          .filter(
            (
              image
            ): image is string =>
              Boolean(image)
          );

      const mainImage =
        fullProduct.thumbnail_url ||
        fullProduct.image ||
        variantImages[0] ||
        "";

      const galleryImages =
        Array.from(
          new Set(
            [
              mainImage,
              ...variantImages
            ].filter(Boolean)
          )
        );

      await addMerchandise({

        name:
          fullProduct.name ||
          product.name,

        description:
          fullProduct.description ||
          `Official PulsePlay merchandise: ${
            fullProduct.name ||
            product.name
          }`,

        collection:
          "PulsePlay POD",

        category:
          "Gaming Apparel",

        price:
          lowestPrice,

        sku:
          printfulSku,

        supplier:
          "Printful",

        product_url:
          `https://www.printful.com/dashboard/products/${product.id}`,

        image_url:
          mainImage,

        images:
          galleryImages,

        printful_id:
          fullProduct.sync_product?.id ||
          fullProduct.id,

        printful_external_id:
          fullProduct.sync_product?.external_id ||
          fullProduct.external_id ||
          null,

        variants,

        status:
          "active",

      });

      await loadMerchandise();

      window.alert(
        `${product.name} imported successfully with ${variants.length} Printful variants.`
      );

    }catch(error){

      console.error(
        "Failed importing Printful product",
        error
      );

      window.alert(
        "Failed to import Printful product."
      );

    }finally{

      setImportingPrintfulId(null);

    }

  }


  async function syncPrintfulProduct(
    item: MerchandiseItem
  ){

    try{

      const printfulId =
        item.printful_id ||
        Number(
          item.sku?.replace(
            "PRINTFUL-",
            ""
          )
        );

      if(
        !printfulId ||
        Number.isNaN(printfulId)
      ){

        window.alert(
          "This merchandise item does not have a valid Printful ID."
        );

        return;

      }

      setImportingPrintfulId(
        printfulId
      );

      const fullProduct =
        await getPrintfulProduct(
          printfulId
        );

      const variants =
        fullProduct.sync_variants || [];

      const variantPrices =
        variants
          .map(
            (variant) =>
              Number(
                variant.retail_price
              )
          )
          .filter(
            (price) =>
              !Number.isNaN(price)
          );

      const lowestPrice =
        variantPrices.length
          ? Math.min(...variantPrices)
          : Number(item.price) || 29.99;

      const variantImages =
        variants
          .flatMap(
            (variant) => [

              variant.product?.image,

              ...(variant.files || [])
                .map(
                  (file) =>
                    file.preview_url ||
                    file.thumbnail_url
                )

            ]
          )
          .filter(
            (
              image
            ): image is string =>
              Boolean(image)
          );

      const mainImage =
        fullProduct.thumbnail_url ||
        fullProduct.image ||
        variantImages[0] ||
        item.image_url ||
        "";

      const galleryImages =
        Array.from(
          new Set(
            [
              mainImage,
              ...variantImages
            ].filter(Boolean)
          )
        );

      await updateMerchandise(
        item.id,
        {

          price:
            lowestPrice,

          image_url:
            mainImage,

          images:
            galleryImages,

          printful_id:
            fullProduct.sync_product?.id ||
            fullProduct.id,

          printful_external_id:
            fullProduct.sync_product?.external_id ||
            fullProduct.external_id ||
            null,

          variants,

          supplier:
            "Printful",

          status:
            item.status || "active",

        }
      );

      await loadMerchandise();

      window.alert(
        `${item.name} synced successfully with ${variants.length} Printful variants.`
      );

    }catch(error){

      console.error(
        "Failed syncing Printful product",
        error
      );

      window.alert(
        "Failed to sync Printful product."
      );

    }finally{

      setImportingPrintfulId(null);

    }

  }


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
        border-cyan-500/30
        bg-[#07111f]
        p-6
      ">

        <div className="
          flex
          flex-col
          gap-4
          md:flex-row
          md:items-center
          md:justify-between
        ">

          <div>

            <h2 className="
              text-xl
              font-black
              text-cyan-400
            ">
              🖨️ Printful Product Importer
            </h2>

            <p className="
              mt-1
              text-sm
              text-gray-400
            ">
              Import products directly from your PulsePlay Printful store.
            </p>

          </div>

          <button
            onClick={loadPrintfulProducts}
            disabled={loadingPrintful}
            className="
              rounded-lg
              bg-cyan-600
              px-5
              py-3
              font-bold
              hover:bg-cyan-500
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {
              loadingPrintful
                ? "Loading Printful..."
                : "Load Printful Products"
            }
          </button>

          <button
            onClick={syncAllPrintfulMerchandise}
            disabled={syncingPrintful || loadingPrintful}
            className="
              rounded-lg
              bg-purple-600
              px-5
              py-3
              font-bold
              hover:bg-purple-500
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {
              syncingPrintful
                ? "Syncing Merchandise..."
                : "Sync All Merchandise"
            }
          </button>

        </div>

        {
          printfulProducts.length > 0 && (

            <div className="
              mt-6
              grid
              gap-4
              md:grid-cols-2
              xl:grid-cols-3
            ">

              {
                printfulProducts.map((product) => (

                  <div
                    key={product.id}
                    className="
                      overflow-hidden
                      rounded-xl
                      border
                      border-purple-500/20
                      bg-black/40
                      p-4
                    "
                  >

                    {
                      product.thumbnail_url && (

                        <img
                          src={product.thumbnail_url}
                          alt={product.name}
                          className="
                            h-44
                            w-full
                            rounded-lg
                            bg-black
                            object-contain
                          "
                        />

                      )
                    }

                    <h3 className="
                      mt-4
                      font-bold
                      text-white
                    ">
                      {product.name}
                    </h3>

                    <p className="
                      mt-1
                      text-xs
                      text-gray-500
                    ">
                      Printful ID: {product.id}
                    </p>

                    <button
                      onClick={() => importPrintfulProduct(product)}
                      disabled={importingPrintfulId === product.id}
                      className="
                        mt-4
                        w-full
                        rounded-lg
                        bg-purple-600
                        px-4
                        py-2
                        font-bold
                        hover:bg-purple-500
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      {
                        importingPrintfulId === product.id
                          ? "Importing..."
                          : "Import to PulsePlay"
                      }
                    </button>

                  </div>

                ))
              }

            </div>

          )
        }

      </div>



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







              {
                item.variants &&
                item.variants.length > 0 && (

                  <div className="
                    mt-5
                    rounded-lg
                    border
                    border-cyan-500/20
                    bg-black/30
                    p-4
                  ">

                    <div className="
                      flex
                      items-center
                      justify-between
                    ">

                      <h3 className="
                        font-bold
                        text-cyan-400
                      ">
                        Printful Variants
                      </h3>

                      <span className="
                        rounded-full
                        bg-purple-500/20
                        px-3
                        py-1
                        text-xs
                        font-bold
                        text-purple-300
                      ">
                        {item.variants.length} variants
                      </span>

                    </div>

                    <div className="
                      mt-3
                      grid
                      gap-2
                    ">

                      {
                        item.variants.map(
                          (variant) => (

                            <div
                              key={variant.id}
                              className="
                                rounded-md
                                border
                                border-gray-800
                                bg-[#050912]
                                px-3
                                py-2
                                text-sm
                              "
                            >

                              <div className="
                                flex
                                flex-col
                                gap-1
                                md:flex-row
                                md:items-center
                                md:justify-between
                              ">

                                <span className="
                                  font-semibold
                                  text-white
                                ">
                                  {variant.name}
                                </span>

                                {
                                  variant.retail_price && (

                                    <span className="
                                      font-bold
                                      text-cyan-400
                                    ">
                                      ${Number(
                                        variant.retail_price
                                      ).toFixed(2)}
                                    </span>

                                  )
                                }

                              </div>

                              {
                                variant.sku && (

                                  <p className="
                                    mt-1
                                    text-xs
                                    text-gray-500
                                  ">
                                    SKU: {variant.sku}
                                  </p>

                                )
                              }

                            </div>

                          )
                        )
                      }

                    </div>

                  </div>

                )
              }


              <div className="
                mt-5
                flex
                gap-3
              ">


                  {item.supplier === "Printful" && (
                    <button
                      onClick={() => syncPrintfulProduct(item)}
                      disabled={importingPrintfulId === (item.printful_id || Number(item.sku?.replace("PRINTFUL-", "")))}
                      className="rounded-lg bg-purple-600 px-4 py-2 font-bold hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {importingPrintfulId === (item.printful_id || Number(item.sku?.replace("PRINTFUL-", ""))) ? "Syncing..." : "Sync Printful"}
                    </button>
                  )}

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
