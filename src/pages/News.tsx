import { useEffect, useState } from "react";

import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";

import {
  getNews,
} from "../services/news";



type NewsItem = {

  id:string;

  title:string;

  description?:string;

  image?:string;

  category?:string;

  url?:string;

  created_at?:string;

};






export default function News(){



const [news,setNews] = useState<NewsItem[]>([]);

const [loading,setLoading] = useState(true);






useEffect(()=>{


async function loadNews(){


try{


const data = await getNews();

setNews(data || []);


}

catch(error){


console.error(
"Failed loading intel:",
error
);


}

finally{


setLoading(false);


}


}



loadNews();


},[]);








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
text-cyan-300
text-sm
font-black
tracking-[0.35em]
"

>

🛰️ INTEL DATABASE ONLINE

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

PULSEPLAY INTEL HUB

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

Gaming announcements, industry updates,
release information, and community
transmissions from across the gaming universe.

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

Scanning incoming transmissions...

</p>


</div>


</BrandCard>

)

}









{/* Empty */}


{

!loading && news.length===0 &&

(

<BrandCard>


<h2

className="
text-2xl
font-black
"

>

NO INTEL AVAILABLE

</h2>



<p

className="
mt-3
text-slate-400
"

>

Add reports through the
PulsePlay Admin Dashboard.

</p>


</BrandCard>

)

}









{/* News Grid */}


{

!loading && news.length>0 &&

(


<section>


<div

className="
flex
justify-between
items-center
mb-8
"

>


<h2

className="
text-3xl
font-black
"

>

LATEST REPORTS

</h2>



<span

className="
text-green-400
text-sm
tracking-widest
"

>

● LIVE FEED

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


news.map((article)=>(



<BrandCard

key={article.id}

className="
group
card-hover
"

>






{/* Image */}


{

article.image ?

(

<img

src={article.image}

alt={article.title}

className="
h-52
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
h-52
rounded-xl
bg-black/40
flex
items-center
justify-center
text-slate-500
"

>

NO IMAGE

</div>

)

}








{/* Metadata */}



<div

className="
mt-5
flex
items-center
gap-3
"

>



{

article.category &&

(

<span

className="
rounded-full
border
border-purple-400/30
bg-purple-500/20
px-3
py-1
text-xs
font-black
tracking-widest
text-purple-300
"

>

{article.category.toUpperCase()}

</span>

)

}





{

article.created_at &&

(

<span

className="
text-xs
text-slate-500
"

>

TRANSMITTED:

{" "}

{

new Date(
article.created_at
).toLocaleDateString()

}

</span>

)

}



</div>









<h2

className="
mt-5
text-2xl
font-black
"

>

{article.title}

</h2>









{

article.description &&

(

<p

className="
mt-3
text-slate-400
line-clamp-3
"

>

{article.description}

</p>

)

}









{

article.url &&

(

<div className="mt-6">


<a

href={article.url}

target="_blank"

rel="noopener noreferrer"

>


<BrandButton>

OPEN REPORT

</BrandButton>


</a>


</div>


)

}





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