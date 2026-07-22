import BrandCard from "./ui/BrandCard";
import BrandButton from "./ui/BrandButton";


type Game = {

  id: string;

  title: string;

  description: string;

  image?: string;

  genre?: string;

};



type FeaturedGamesProps = {

  games?: Game[];

};




export default function FeaturedGames({

  games = [],

}: FeaturedGamesProps) {



return (

<section className="mt-20">





{/* Section Header */}

<div

className="
mb-10
flex
flex-col
md:flex-row
md:items-end
md:justify-between
gap-4
"

>


<div>


<div

className="
text-xs
tracking-[0.4em]
text-cyan-400
font-bold
mb-3
"

>

MISSION DATABASE

</div>



<h2

className="
text-4xl
md:text-5xl
font-black
pp-gradient-text
"

>

TOP MISSIONS

</h2>



<p

className="
mt-3
text-slate-400
max-w-xl
"

>

Explore the latest games,
featured adventures, and titles
powering the PulsePlay network.

</p>


</div>




<div

className="
pp-hud
px-5
py-3
rounded-xl
text-sm
tracking-widest
text-green-400
"

>

● DATABASE ONLINE

</div>



</div>







{/* Game Grid */}


<div

className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-3
gap-8
"

>





{/* Empty State */}

{

games.length === 0 && (

<BrandCard>


<div

className="
text-center
py-8
"

>


<div

className="
text-4xl
mb-4
"

>

🎮

</div>


<h3

className="
text-xl
font-bold
"

>

NO MISSIONS AVAILABLE

</h3>


<p

className="
mt-3
text-slate-400
"

>

Add featured games from the admin
command center.

</p>


</div>


</BrandCard>

)

}







{/* Games */}


{

games.map((game)=>(


<BrandCard

key={game.id}

>


<div

className="
group
relative
overflow-hidden
"

>





{/* Image */}


{

game.image && (

<img

src={game.image}

alt={game.title}

className="
w-full
h-56
object-cover
rounded-xl
transition
duration-500
group-hover:scale-110
"

/>

)

}





{/* Status Badge */}


<div

className="
absolute
top-4
left-4
px-3
py-1
rounded-full
bg-purple-600/80
border
border-purple-300/40
text-xs
font-black
tracking-widest
"

>

FEATURED

</div>



</div>







{/* Genre */}


{

game.genre && (

<span

className="
inline-block
mt-5
px-3
py-1
rounded-full
text-xs
bg-cyan-400/10
border
border-cyan-400/30
text-cyan-300
tracking-widest
"

>

{game.genre.toUpperCase()}

</span>

)

}







<h3

className="
mt-4
text-2xl
font-black
text-white
"

>

{game.title}

</h3>







<p

className="
mt-3
text-slate-400
line-clamp-3
"

>

{game.description}

</p>







{/* Game Stats */}


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
STATUS
</p>

<p className="text-green-400 font-bold">
AVAILABLE
</p>


</div>




<div

className="
pp-card-surface
p-3
"

>

<p className="text-slate-400">
RANK
</p>

<p className="text-yellow-300 font-bold">
LEGENDARY
</p>


</div>



</div>







<div className="mt-6">


<BrandButton variant="secondary">

ACCESS MISSION

</BrandButton>


</div>





</BrandCard>


))

}



</div>




</section>

);


}