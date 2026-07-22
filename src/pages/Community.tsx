import { useEffect, useState } from "react";

import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";

import { getNews } from "../services/news";



type Article = {

  id:string;

  title:string;

  content:string;

  image:string;

  category:string;

  featured:boolean;

};





export default function Community(){



const [news,setNews] = useState<Article[]>([]);





useEffect(()=>{


async function loadNews(){


try{


const data = await getNews();


const featuredNews =
(data || []).filter(
(article)=>article.featured
);


setNews(featuredNews);



}

catch(error){


console.error(
"Failed loading community intel:",
error
);


}



}



loadNews();



},[]);








const links = [

{
title:"🎮 Twitch Network",
description:
"Join live broadcasts, chat with players, and follow PulsePlay missions.",
url:
"https://www.twitch.tv/Veiltactician",
button:"ENTER STREAM",
},


{
title:"🌐 PulsePlay Hub",
description:
"Access the main PulsePlay gaming network.",
url:"",
button:"SYSTEM LOCKED",
},


{
title:"🎁 Creator Support",
description:
"Support future broadcasts and help upgrade the command center.",
url:
"https://throne.com/ve",
button:"VIEW WISHLIST",
},


{
title:"🛒 Gear Network",
description:
"Explore recommended gaming equipment and creator setups.",
url:
"https://amzn.to/4vmEtDy",
button:"ACCESS ARMORY",
},


];









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

👥 PLAYER NETWORK ONLINE

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

PULSEPLAY COMMUNITY

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

Connect with players, creators,
and the PulsePlay gaming network.

Join the squad and level up together.

</p>



</section>









{/* Network Status */}


<section

className="
grid
md:grid-cols-3
gap-6
mb-16
"

>


<div className="pp-card-surface p-6">


<h3 className="text-3xl font-black text-cyan-400">

ACTIVE

</h3>


<p className="text-slate-400 mt-2">

Community Status

</p>


</div>





<div className="pp-card-surface p-6">


<h3 className="text-3xl font-black text-purple-400">

ONLINE

</h3>


<p className="text-slate-400 mt-2">

Player Network

</p>


</div>





<div className="pp-card-surface p-6">


<h3 className="text-3xl font-black text-pink-400">

XP+

</h3>


<p className="text-slate-400 mt-2">

Community Growth

</p>


</div>


</section>









{/* Community Intel */}


{

news.length > 0 &&

(

<section>


<h2

className="
text-4xl
font-black
mb-8
"

>

COMMUNITY <span className="text-purple-400">

INTEL

</span>

</h2>





<div

className="
grid
md:grid-cols-3
gap-8
"

>


{

news.map((article)=>(


<BrandCard

key={article.id}

className="card-hover"

>



{

article.image &&

(

<img

src={article.image}

alt={article.title}

className="
w-full
h-52
rounded-xl
object-cover
"

/>

)

}




<p

className="
mt-5
text-purple-400
text-sm
font-bold
tracking-widest
"

>

{article.category}

</p>




<h3

className="
mt-3
text-2xl
font-black
"

>

{article.title}

</h3>




<p

className="
mt-3
text-slate-400
"

>

{article.content}

</p>



</BrandCard>


))

}



</div>


</section>

)

}









{/* Network Terminals */}


<section

className="
mt-16
grid
md:grid-cols-2
gap-8
"

>


{

links.map((item)=>(


<BrandCard

key={item.title}

className="card-hover"

>


<h2

className="
text-2xl
font-black
"

>

{item.title}

</h2>




<p

className="
mt-4
text-slate-400
"

>

{item.description}

</p>






<div className="mt-6">


{

item.url ?

(

<a

href={item.url}

target="_blank"

rel="noreferrer"

>


<BrandButton>

{item.button}

</BrandButton>


</a>

)

:

(

<BrandButton variant="secondary">

{item.button}

</BrandButton>

)

}



</div>



</BrandCard>



))

}



</section>









{/* Final CTA */}


<section

className="
mt-20
pp-card-surface
rounded-3xl
p-10
text-center
"

>


<h2

className="
text-4xl
font-black
"

>

JOIN THE SQUAD

</h2>



<p

className="
mt-5
max-w-3xl
mx-auto
text-slate-300
"

>

PulsePlay is built around gamers,
creators, and communities.
Every player helps expand the network.

</p>



</section>







</main>

);


}