import { useEffect, useState } from "react";

import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../../services/products";

import { uploadImage } from "../../services/storage";


type Product = {

  id:string;

  name:string;

  description?:string;

  price?:string;

  image?:string;

  link?:string;

  featured?:boolean;

  category?:string;

};




export default function Products(){


  const [products,setProducts] =
    useState<Product[]>([]);


  const [editingId,setEditingId] =
    useState<string | null>(null);


  const [saving,setSaving] =
    useState(false);



  const [name,setName] =
    useState("");

  const [description,setDescription] =
    useState("");

  const [price,setPrice] =
    useState("");

  const [image,setImage] =
    useState("");

  const [imageFile,setImageFile] =
    useState<File | null>(null);

  const [link,setLink] =
    useState("");

  const [featured,setFeatured] =
    useState(false);

  const [category,setCategory] =
    useState("Gaming Accessories");






  async function loadProducts(){

    try{

      const data =
        await getProducts();


      setProducts(
        data || []
      );


    }catch(error){

      console.error(
        "Failed loading products:",
        error
      );

    }

  }





  useEffect(()=>{

    loadProducts();

  },[]);









  async function handleSubmit(
    e:React.FormEvent
  ){

    e.preventDefault();


    setSaving(true);



    try{


      let imageUrl =
        image;



      if(imageFile){

        imageUrl =
          await uploadImage(
            imageFile,
            "products"
          );

      }





      const product = {


        name,

        description,

        price,

        image:imageUrl,

        link,

        featured,

        category,


      };






      if(editingId){


        await updateProduct(
          editingId,
          product
        );


      }else{


        await addProduct(
          product
        );


      }





      clearForm();

      await loadProducts();




    }catch(error:any){


      console.error(
        "Product save failed:",
        error
      );


      alert(
        error?.message ||
        "Unable to save product."
      );


    }finally{


      setSaving(false);


    }


  }









  function editProduct(
    product:Product
  ){


    setEditingId(
      product.id
    );


    setName(
      product.name || ""
    );


    setDescription(
      product.description || ""
    );


    setPrice(
      product.price || ""
    );


    setImage(
      product.image || ""
    );


    setLink(
      product.link || ""
    );


    setFeatured(
      product.featured || false
    );


    setCategory(
      product.category || "Gaming Accessories"
    );


    setImageFile(null);



    window.scrollTo({

      top:0,

      behavior:"smooth"

    });


  }









  async function handleDelete(
    id:string
  ){


    if(
      !window.confirm(
        "Delete this product?"
      )
    ){

      return;

    }





    try{


      await deleteProduct(
        id
      );


      await loadProducts();



    }catch(error:any){


      console.error(
        error
      );


      alert(
        error?.message ||
        "Delete failed."
      );


    }


  }









  function clearForm(){


    setEditingId(null);

    setName("");

    setDescription("");

    setPrice("");

    setImage("");

    setImageFile(null);

    setLink("");

    setFeatured(false);

    setCategory(
      "Gaming Accessories"
    );


  }









return (

<div className="space-y-10">



<h1 className="
text-4xl
font-black
pp-gradient-text
">

🛒 Manage Products

</h1>






<form

onSubmit={handleSubmit}

className="
pp-panel
p-6
max-w-2xl
space-y-5
"

>



<h2 className="
text-2xl
font-black
">

{

editingId
?
"Edit Product"
:
"Add Product"

}

</h2>







<input

className="
w-full
rounded-lg
bg-black/40
p-3
"

placeholder="Product Name"

value={name}

onChange={
e=>setName(e.target.value)
}

/>






<textarea

className="
w-full
rounded-lg
bg-black/40
p-3
"

placeholder="Description"

rows={4}

value={description}

onChange={
e=>setDescription(e.target.value)
}

/>







<input

className="
w-full
rounded-lg
bg-black/40
p-3
"

placeholder="Price"

value={price}

onChange={
e=>setPrice(e.target.value)
}

/>







<select

className="
w-full
rounded-lg
bg-black/40
p-3
"

value={category}

onChange={
e=>setCategory(e.target.value)
}

>


<option>
Gaming Accessories
</option>

<option>
GPUs
</option>

<option>
CPUs
</option>

<option>
Monitors
</option>

<option>
Keyboards
</option>

<option>
Mice
</option>

<option>
Headsets
</option>

<option>
Streaming Gear
</option>

<option>
Gaming Chairs
</option>


</select>







<input

type="file"

accept="image/*"

className="
w-full
rounded-lg
bg-black/40
p-3
"

onChange={
e=>
setImageFile(
e.target.files?.[0] || null
)
}

/>






{

image &&

<img

src={image}

alt="preview"

className="
h-48
w-full
rounded-xl
object-cover
"

/>

}








<input

className="
w-full
rounded-lg
bg-black/40
p-3
"

placeholder="Product / Affiliate Link"

value={link}

onChange={
e=>setLink(e.target.value)
}

/>








<label className="
flex
items-center
gap-3
"
>

<input

type="checkbox"

checked={featured}

onChange={
e=>setFeatured(
e.target.checked
)
}

/>

Featured Product

</label>







<button

disabled={saving}

className="
rounded-lg
bg-cyan-400
px-6
py-3
font-black
text-black
disabled:opacity-50
"

>

{

saving

?

"Saving..."

:

editingId

?

"Update Product"

:

"Add Product"

}

</button>





</form>










<section>


<h2 className="
text-3xl
font-black
mb-6
">

Product Database

</h2>





<div className="
grid
grid-cols-1
md:grid-cols-2
gap-6
">


{

products.map(product=>(



<div

key={product.id}

className="
pp-card-surface
p-5
"

>




{

product.image &&

<img

src={product.image}

alt={product.name}

className="
h-40
w-full
rounded-xl
object-cover
mb-4
"

/>

}




<h3 className="
text-xl
font-black
">

{product.name}

</h3>




<p className="
text-slate-400
mt-2
">

{product.description}

</p>




<p className="
text-cyan-300
font-bold
mt-3
">

{product.price}

</p>




<p className="
text-sm
text-purple-300
mt-2
">

{product.category}

</p>





{

product.featured &&

<p className="
text-yellow-400
mt-2
">

⭐ Featured

</p>

}







<div className="
flex
gap-3
mt-5
">


<button

onClick={()=>
editProduct(product)
}

className="
rounded-lg
bg-blue-600
px-4
py-2
font-bold
"

>

Edit

</button>





<button

onClick={()=>
handleDelete(product.id)
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


</section>






</div>

);


}