import { useEffect, useState } from "react";

import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";

import {
  getProducts,
} from "../services/products";



type Product = {

  id:string;

  name:string;

  description?:string;

  image?:string;

  category?:string;

  url?:string;

};





export default function Store(){


const [products,setProducts] = useState<Product[]>([]);

const [loading,setLoading] = useState(true);




useEffect(()=>{


async function loadProducts(){


try{


const data = await getProducts();

setProducts(data || []);


}

catch(error){


console.error(
"Failed loading armory:",
error
);


}

finally{


setLoading(false);


}


}



loadProducts();



},[]);







return (

<main>






{/* ARMORY HEADER */}


<section

className="
text-center
mb-16
"

>


<div

className="
inline-flex
items-center
gap-3
px-5
py-2
rounded-full
pp-hud
text-cyan-300
text-sm
font-black
tracking-[0.35em]
"

>

⚡ GEAR DATABASE ONLINE

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

PULSEPLAY ARMORY

</h1>




<p

className="
mt-5
max-w-3xl
mx-auto
text-lg
text-slate-400
"

>

Upgrade your gaming setup with
community-tested gear,
hardware, accessories, and
creator equipment.

</p>


</section>









{/* Loading */}


{

loading &&

(

<BrandCard>


<div className="flex items-center gap-3">


<span className="pp-live-dot"/>


<p className="text-slate-400">

Scanning equipment database...

</p>


</div>


</BrandCard>

)

}









{/* Empty State */}


{

!loading && products.length===0 &&

(

<BrandCard>


<h2

className="
text-2xl
font-black
"

>

ARMORY OFFLINE

</h2>



<p

className="
mt-3
text-slate-400
"

>

Products will appear after
being deployed through the
PulsePlay Command Center.

</p>


</BrandCard>

)

}









{/* Products */}


{

!loading && products.length>0 &&

(


<section>


<div

className="
mb-8
flex
justify-between
items-center
"

>


<h2

className="
text-3xl
font-black
"

>

AVAILABLE LOADOUTS

</h2>



<span

className="
text-green-400
tracking-widest
text-sm
"

>

● ONLINE

</span>


</div>






<div

className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-3
gap-8
"

>


{

products.map((product)=>(



<BrandCard

key={product.id}

className="
group
card-hover
"

>






{/* IMAGE */}


{

product.image ?

(

<img

src={product.image}

alt={product.name}

className="
h-56
w-full
rounded-xl
object-cover
transition
duration-500
group-hover:scale-105
"

/>

)

:

(

<div

className="
h-56
rounded-xl
flex
items-center
justify-center
bg-black/40
text-slate-500
"

>

NO IMAGE

</div>

)

}









{/* CATEGORY */}


{

product.category &&

(

<span

className="
inline-flex
mt-5
rounded-full
bg-purple-500/20
border
border-purple-400/30
px-3
py-1
text-xs
font-black
tracking-widest
text-purple-300
"

>

{product.category.toUpperCase()}

</span>

)

}









<h2

className="
mt-5
text-2xl
font-black
"

>

{product.name}

</h2>









<p

className="
mt-3
text-slate-400
line-clamp-3
"

>

{product.description}

</p>









{/* ITEM STATS */}


<div

className="
mt-5
grid
grid-cols-2
gap-3
text-xs
"

>


<div

className="
pp-card-surface
p-3
"

>

<p className="text-slate-400">

RARITY

</p>


<p className="text-yellow-300 font-bold">

EPIC

</p>


</div>





<div

className="
pp-card-surface
p-3
"

>

<p className="text-slate-400">

STATUS

</p>


<p className="text-green-400 font-bold">

AVAILABLE

</p>


</div>



</div>









<div className="mt-6">


{

product.url ?

(

<a

href={product.url}

target="_blank"

rel="noopener noreferrer"

>


<BrandButton>

EQUIP LOADOUT

</BrandButton>


</a>

)

:

(

<BrandButton variant="secondary">

VIEW ITEM

</BrandButton>

)

}


</div>







</BrandCard>


))

}


</div>


</section>


)

}



</main>

);


}