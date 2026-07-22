import BrandButton from "../ui/BrandButton";

type TwitchSectionProps = {
  channel?: string;
};



export default function TwitchSection({

  channel = "Veiltactician",

}: TwitchSectionProps) {


  const parent =
    window.location.hostname || "localhost";



return (

<section className="mt-16">



<div

className="
pp-hud
rounded-3xl
p-4
"

>




{/* Terminal Header */}


<div

className="
flex
items-center
justify-between
px-5
py-4
mb-4
border-b
border-white/10
"

>


<div>


<p

className="
text-xs
tracking-[0.35em]
text-slate-400
"

>

TRANSMISSION CHANNEL

</p>



<h2

className="
text-2xl
font-black
"

>

{channel}

</h2>


</div>





<div

className="
flex
items-center
gap-3
text-green-400
font-bold
tracking-widest
"

>


<span

className="
w-3
h-3
bg-green-400
rounded-full
animate-pulse
shadow-[0_0_15px_#22c55e]
"

/>


ONLINE


</div>



</div>









<div

className="
flex
flex-col
lg:flex-row
gap-8
"

>






{/* Stream Control Panel */}



<div

className="
lg:w-1/3
flex
flex-col
justify-center
"

>



<div

className="
mb-5
inline-flex
items-center
gap-3
text-red-400
font-black
tracking-widest
"

>


<span

className="
w-3
h-3
rounded-full
bg-red-500
animate-pulse
shadow-[0_0_15px_red]
"

/>


LIVE FEED


</div>






<h3

className="
text-4xl
font-black
pp-gradient-text
"

>

PULSEPLAY
BROADCAST

</h3>






<p

className="
mt-5
text-slate-400
leading-relaxed
"

>

Access live gameplay,
community events, and
PulsePlay missions directly
from the command center.

</p>







<div

className="
mt-6
grid
grid-cols-2
gap-3
text-sm
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

ACTIVE

</p>


</div>




<div

className="
pp-card-surface
p-3
"

>

<p className="text-slate-400">

NETWORK

</p>


<p className="text-cyan-300 font-bold">

TWITCH

</p>


</div>



</div>







<div className="mt-6">


<a

href={`https://www.twitch.tv/${channel}`}

target="_blank"

rel="noreferrer"

>


<BrandButton>

ENTER STREAM

</BrandButton>


</a>


</div>




</div>









{/* Twitch Player */}



<div

className="
lg:w-2/3
"

>


<div

className="
overflow-hidden
rounded-2xl
border
border-purple-500/40
shadow-[0_0_35px_rgba(139,92,246,.35)]
bg-black
"

>


<iframe

src={`https://player.twitch.tv/?channel=${channel}&parent=${parent}`}

height="400"

width="100%"

allowFullScreen

scrolling="no"

frameBorder="0"

title="PulsePlay Broadcast Terminal"


/>


</div>



</div>







</div>







</div>



</section>

);

}