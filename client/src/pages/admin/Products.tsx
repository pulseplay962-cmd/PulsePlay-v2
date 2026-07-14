import { useEffect, useState } from "react";

import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../../services/products";

import { uploadImage } from "../../services/storage";


type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  link: string;
  featured: boolean;
};



export default function Products() {

  const [products, setProducts] = useState<Product[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);


  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [link, setLink] = useState("");
  const [featured, setFeatured] = useState(false);




  async function loadProducts() {

    try {

      const data = await getProducts();

      setProducts(data || []);


    } catch (err) {

      console.error(err);

    }

  }





  useEffect(() => {

    loadProducts();

  }, []);







  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setSaving(true);



    try {


      let imageUrl = image;



      if (imageFile) {

        imageUrl = await uploadImage(
          imageFile,
          "products"
        );

      }



      const product = {

        name,

        description,

        price,

        image: imageUrl,

        link,

        featured,

      };





      if (editingId) {


        await updateProduct(
          editingId,
          product
        );


      } else {


        await addProduct(product);


      }




      clearForm();

      await loadProducts();



    } catch (err) {


      console.error(err);

      alert(
        "Failed to save product."
      );


    } finally {


      setSaving(false);


    }


  }







  function editProduct(
    product: Product
  ) {


    setEditingId(product.id);

    setName(product.name);

    setDescription(
      product.description
    );

    setPrice(
      product.price
    );

    setImage(
      product.image
    );

    setLink(
      product.link
    );

    setFeatured(
      product.featured
    );

    setImageFile(null);



    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });


  }







  async function handleDelete(
    id: string
  ) {


    const confirmed =
      window.confirm(
        "Delete this product?"
      );



    if (!confirmed) return;




    try {


      await deleteProduct(id);

      await loadProducts();



    } catch (err) {


      console.error(err);

      alert(
        "Failed to delete product."
      );


    }


  }







  function clearForm() {


    setEditingId(null);

    setName("");

    setDescription("");

    setPrice("");

    setImage("");

    setImageFile(null);

    setLink("");

    setFeatured(false);


  }







  return (

    <div>


      <h1 className="text-4xl font-black">
        Manage Products
      </h1>





      <form

        onSubmit={handleSubmit}

        className="mt-8 max-w-xl space-y-4 rounded-xl bg-[#111827] p-6"

      >


        <h2 className="text-xl font-bold">

          {editingId
            ? "Edit Product"
            : "Add Product"}

        </h2>






        <input

          className="w-full rounded bg-[#1f2937] p-3"

          placeholder="Product Name"

          value={name}

          onChange={(e)=>
            setName(e.target.value)
          }

        />





        <textarea

          className="w-full rounded bg-[#1f2937] p-3"

          placeholder="Description"

          value={description}

          onChange={(e)=>
            setDescription(e.target.value)
          }

        />





        <input

          className="w-full rounded bg-[#1f2937] p-3"

          placeholder="Price"

          value={price}

          onChange={(e)=>
            setPrice(e.target.value)
          }

        />






        <input

          type="file"

          accept="image/*"

          className="w-full rounded bg-[#1f2937] p-3"

          onChange={(e)=>{

            setImageFile(
              e.target.files?.[0] || null
            );

          }}

        />






        {image && (

          <img

            src={image}

            alt="Preview"

            className="h-40 w-full rounded object-cover"

          />

        )}






        <input

          className="w-full rounded bg-[#1f2937] p-3"

          placeholder="Affiliate Link"

          value={link}

          onChange={(e)=>
            setLink(e.target.value)
          }

        />







        <label className="flex items-center gap-2">


          <input

            type="checkbox"

            checked={featured}

            onChange={(e)=>
              setFeatured(
                e.target.checked
              )
            }

          />


          Featured Product


        </label>






        <button

          type="submit"

          disabled={saving}

          className="rounded-lg bg-cyan-500 px-6 py-3 font-bold text-black disabled:opacity-50"

        >

          {saving
            ? "Uploading..."
            : editingId
            ? "Update Product"
            : "Add Product"}

        </button>




      </form>






      <div className="mt-10 space-y-4">


        {products.map((product)=>(


          <div

            key={product.id}

            className="rounded-xl bg-[#111827] p-5"

          >



            {product.image && (

              <img

                src={product.image}

                alt={product.name}

                className="mb-4 h-40 w-full rounded object-cover"

              />

            )}






            <h2 className="text-2xl font-bold">

              {product.name}

            </h2>






            <p className="text-gray-400">

              {product.description}

            </p>






            <p className="mt-2 text-cyan-400 font-bold">

              {product.price}

            </p>






            {product.featured && (

              <p className="mt-2 text-yellow-400">

                ⭐ Featured Product

              </p>

            )}







            <div className="mt-4 flex gap-3">


              <button

                onClick={() =>
                  editProduct(product)
                }

                className="rounded bg-blue-600 px-4 py-2 font-bold"

              >

                Edit

              </button>





              <button

                onClick={() =>
                  handleDelete(product.id)
                }

                className="rounded bg-red-600 px-4 py-2 font-bold"

              >

                Delete

              </button>



            </div>



          </div>


        ))}



      </div>



    </div>

  );

}