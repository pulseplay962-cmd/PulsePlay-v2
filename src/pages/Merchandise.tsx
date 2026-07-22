import { merchandise } from "../data/merchandise";

import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";



export default function Merchandise() {


return (

<main>





{/* Header */}


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









{/* Inventory */}


<section>


<div

className="
flex
items-center
justify-between
mb-8
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
text-sm
tracking-widest
"

>

● INVENTORY READY

</span>


</div>







<div

className="
grid
md:grid-cols-3
gap-8
"

>


{

merchandise.map((item)=>(



<BrandCard

key={item.id}

className="
group
card-hover
"

>






{/* Product Image */}


<div

className="
overflow-hidden
rounded-xl
"

>


<img

src={item.image}

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


</div>








{/* Item Badge */}


<div

className="
mt-5
flex
justify-between
items-center
"

>


<span

className="
px-3
py-1
rounded-full
bg-pink-500/20
border
border-pink-400/30
text-xs
font-black
tracking-widest
text-pink-300
"

>

LEGENDARY

</span>



<span

className="
text-green-400
text-xs
font-bold
"

>

AVAILABLE

</span>


</div>









{/* Name */}


<h2

className="
mt-5
text-2xl
font-black
"

>

{item.name}

</h2>







<p

className="
mt-3
text-slate-400
"

>

{item.description}

</p>








{/* Stats */}


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

CLASS

</p>


<p className="text-cyan-300 font-bold">

APPAREL

</p>


</div>






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

LEGENDARY

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
font-black
text-purple-400
text-xl
"

>

{item.price}

</span>





<BrandButton>

EQUIP STYLE

</BrandButton>



</div>







</BrandCard>



))

}



</div>


</section>







</main>

);


}