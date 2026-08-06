import { useEffect, useState } from "react";

import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";

import { getNews } from "../services/news";
import { submitCommunitySignup } from "../services/communitySignup";

import { supabase } from "../lib/supabase";


type Article = {
  id:string;
  title:string;
  content:string;
  image:string;
  category:string;
  featured:boolean;
};



export default function Community(){


console.log(
  "🔥 REAL COMMUNITY COMPONENT RENDERED"
);



useEffect(()=>{


async function checkSession(){


const result =
  await supabase.auth.getSession();


console.log(
  "🔐 SUPABASE SESSION CHECK:",
  result
);


}


checkSession();


},[]);





const [news,setNews] = useState<Article[]>([]);

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [discord,setDiscord] = useState("");

const [sending,setSending] = useState(false);
const [message,setMessage] = useState("");





useEffect(()=>{


async function loadNews(){

try{

const data = await getNews();


setNews(
(data || []).filter(
(article)=>article.featured
)
);


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







async function handleSignup(
e:React.FormEvent
){

e.preventDefault();


console.log(
"🚀 FORM SUBMITTED",
{
name,
email,
discord
}
);



if(!name || !email){

setMessage(
"Please enter your player name and email."
);

return;

}



setSending(true);
setMessage("");



try{


console.log(
"📡 CALLING SUPABASE"
);



const result = await submitCommunitySignup({

name,
email,
discord

});



console.log(
"✅ SUPABASE SUCCESS",
result
);



setMessage(
"🎮 Welcome to the PulsePlay Network!"
);



setName("");
setEmail("");
setDiscord("");


}
catch(error:any){


console.error(
"❌ COMMUNITY SIGNUP ERROR",
error
);



setMessage(
error?.message ||
"Unable to join the network."
);


}
finally{

setSending(false);

}


}









return (

<main>


<section className="text-center mb-16">


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

Connect with players,
creators, and the PulsePlay
gaming network.

</p>


</section>






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







{
news.length > 0 &&

<section>


<h2 className="text-4xl font-black mb-8">

COMMUNITY <span className="text-purple-400">
INTEL
</span>

</h2>



<div className="grid md:grid-cols-3 gap-8">


{
news.map((article)=>(


<BrandCard
key={article.id}
className="card-hover"
>


{article.image &&

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

}



<p className="mt-5 text-purple-400 text-sm font-bold">

{article.category}

</p>



<h3 className="mt-3 text-2xl font-black">

{article.title}

</h3>



</BrandCard>


))

}


</div>


</section>

}








<section
className="
mt-20
pp-card-surface
rounded-3xl
p-10
text-center
"
>


<h2 className="text-4xl font-black">

JOIN THE SQUAD

</h2>



<p className="mt-5 text-slate-300">

Get PulsePlay updates,
stream alerts, gaming news,
and community announcements.

</p>





<form
onSubmit={handleSignup}
className="
mt-8
mx-auto
max-w-xl
grid
gap-4
"
>



<input
className="
rounded-xl
bg-black/40
border
border-cyan-400/20
p-4
text-white
"
placeholder="Player Name"
value={name}
onChange={(e)=>setName(e.target.value)}
required
/>



<input
className="
rounded-xl
bg-black/40
border
border-cyan-400/20
p-4
text-white
"
placeholder="Email Address"
type="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>



<input
className="
rounded-xl
bg-black/40
border
border-cyan-400/20
p-4
text-white
"
placeholder="Discord Username (optional)"
value={discord}
onChange={(e)=>setDiscord(e.target.value)}
/>





<BrandButton
type="submit"
disabled={sending}
>

{
sending
?
"CONNECTING..."
:
"🚀 JOIN COMMUNITY"
}

</BrandButton>



</form>





{
message &&

<p
className="
mt-5
font-bold
text-cyan-300
"
>

{message}

</p>

}



</section>



</main>

);


}