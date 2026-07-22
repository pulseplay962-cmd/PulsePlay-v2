import TwitchSection from "../components/home/TwitchSection";

import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";



export default function Streams() {


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
text-red-400
text-sm
font-black
tracking-[0.3em]
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


LIVE TRANSMISSION SYSTEM


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

BROADCAST
COMMAND CENTER

</h1>





<p

className="
mx-auto
mt-6
max-w-3xl
text-lg
text-slate-400
"

>

Enter the PulsePlay broadcast network.
Watch live gameplay, follow missions,
and connect with the community.

</p>


</section>







{/* Twitch HUD */}


<section

className="
pp-hud
rounded-3xl
p-3
"

>


<div

className="
flex
items-center
justify-between
px-5
py-4
"

>


<div>


<p

className="
text-xs
tracking-widest
text-slate-400
"

>

CURRENT CHANNEL

</p>


<h2

className="
text-2xl
font-black
"

>

Veiltactician

</h2>


</div>



<div

className="
text-green-400
font-bold
"

>

● ONLINE

</div>


</div>



<TwitchSection channel="Veiltactician" />


</section>









{/* Broadcast Stats */}


<section

className="
grid
gap-8
md:grid-cols-3
mt-16
"

>




<BrandCard className="card-hover">


<h2

className="
text-2xl
font-black
text-cyan-400
"

>

🎮 CURRENT MISSION

</h2>


<p

className="
mt-4
text-slate-300
"

>

Horizon Forbidden West

</p>


<div

className="
mt-4
text-sm
text-green-400
"

>

STATUS:
ACTIVE

</div>


</BrandCard>









<BrandCard className="card-hover">


<h2

className="
text-2xl
font-black
text-purple-400
"

>

📡 COMMUNITY FEED

</h2>


<p

className="
mt-4
text-slate-300
"

>

Live gameplay, events,
community streams,
and creator broadcasts.

</p>


<div

className="
mt-4
text-sm
text-cyan-300
"

>

NETWORK:
CONNECTED

</div>


</BrandCard>









<BrandCard className="card-hover">


<h2

className="
text-2xl
font-black
text-pink-400
"

>

💜 JOIN THE SQUAD

</h2>



<p

className="
mt-4
text-slate-300
"

>

Follow the channel and become
part of the PulsePlay player network.

</p>





<div className="mt-6">


<a

href="https://www.twitch.tv/Veiltactician"

target="_blank"

rel="noreferrer"

>


<BrandButton>

FOLLOW TRANSMISSION

</BrandButton>


</a>


</div>


</BrandCard>






</section>







{/* Upcoming Broadcast Area */}


<section

className="
mt-16
pp-card-surface
rounded-3xl
p-8
"

>


<div

className="
flex
items-center
justify-between
"

>


<h2

className="
text-3xl
font-black
"

>

UPCOMING OPERATIONS

</h2>



<span

className="
text-cyan-400
text-sm
tracking-widest
"

>

STREAM QUEUE

</span>


</div>




<p

className="
mt-4
text-slate-400
"

>

Future PulsePlay broadcasts,
community events, and gaming sessions
will appear here.

</p>


</section>






</main>

);

}