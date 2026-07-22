import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";


export default function About() {


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
text-purple-300
text-sm
font-black
tracking-[0.35em]
"

>

🌌 SYSTEM ORIGIN FOUND

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

PULSEPLAY ORIGIN

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

A gaming network created for players,
creators, and communities who believe
every adventure is better together.

</p>


</section>









{/* Origin Cards */}


<section

className="
grid
md:grid-cols-2
gap-8
"

>





<BrandCard className="card-hover">


<h2

className="
text-3xl
font-black
text-cyan-400
"

>

MISSION PROTOCOL

</h2>



<p

className="
mt-4
text-slate-400
leading-relaxed
"

>

PulsePlay was created to connect gamers
through live broadcasts, gaming intelligence,
community interaction, and premium gaming
experiences.

</p>


</BrandCard>







<BrandCard className="card-hover">


<h2

className="
text-3xl
font-black
text-purple-400
"

>

PLAYER PHILOSOPHY

</h2>



<p

className="
mt-4
text-slate-400
leading-relaxed
"

>

Every player has a story.

Whether you compete,
create content, or explore worlds,
PulsePlay exists to help gamers level up
together.

</p>


</BrandCard>





</section>









{/* Core Systems */}


<section

className="
mt-8
grid
md:grid-cols-3
gap-8
"

>



<BrandCard className="card-hover">


<h3

className="
text-xl
font-black
"

>

🎮 GAME DATABASE

</h3>


<p

className="
mt-3
text-slate-400
"

>

Discover new releases,
hidden gems, and adventures
worth playing.

</p>


</BrandCard>







<BrandCard className="card-hover">


<h3

className="
text-xl
font-black
"

>

📡 BROADCAST NETWORK

</h3>


<p

className="
mt-3
text-slate-400
"

>

Watch streams,
follow creators,
and experience gaming live.

</p>


</BrandCard>







<BrandCard className="card-hover">


<h3

className="
text-xl
font-black
"

>

⚙️ PLAYER ARMORY

</h3>


<p

className="
mt-3
text-slate-400
"

>

Explore gaming gear,
accessories, and setups
built for players.

</p>


</BrandCard>




</section>









{/* Vision */}


<section className="mt-8">


<BrandCard className="card-hover">


<div

className="
text-center
max-w-3xl
mx-auto
"

>


<h2

className="
text-4xl
font-black
pp-gradient-text
"

>

THE FUTURE OF PULSEPLAY

</h2>





<p

className="
mt-5
text-slate-300
leading-relaxed
"

>

Our mission is to build more than a website.

PulsePlay is becoming a home for gaming
news, live content, creators, communities,
and players around the world.

</p>






<div className="mt-8">


<BrandButton>

JOIN THE NETWORK

</BrandButton>


</div>



</div>


</BrandCard>


</section>







</main>


);


}