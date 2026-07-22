import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";


export default function Contact() {


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

🛠️ SUPPORT TERMINAL ONLINE

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

COMMAND SUPPORT

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

Need assistance, want to collaborate,
or have feedback for the PulsePlay network?

Transmit your message below.

</p>



</section>









{/* Support Systems */}


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

🎮 PLAYER SUPPORT

</h2>




<p

className="
mt-4
text-slate-400
leading-relaxed
"

>

Connect with the community,
follow streams, discover games,
and stay updated with PulsePlay missions.

</p>






<div className="mt-6">


<BrandButton>

JOIN NETWORK

</BrandButton>


</div>



</BrandCard>









<BrandCard className="card-hover">


<h2

className="
text-3xl
font-black
text-purple-400
"

>

📡 CONTACT CHANNEL

</h2>





<p

className="
mt-4
text-slate-400
leading-relaxed
"

>

For partnerships, creator opportunities,
feedback, and support requests,
contact the PulsePlay command team.

</p>








<div

className="
mt-6
space-y-4
"

>


<div

className="
pp-card-surface
p-4
"

>

<p className="text-slate-400 text-sm">

PRIMARY CHANNEL

</p>


<p className="text-white font-bold">

pulseplay962@gmail.com

</p>


</div>







<div

className="
pp-card-surface
p-4
"

>

<p className="text-slate-400 text-sm">

SOCIAL ID

</p>


<p className="text-white font-bold">

@PulsePlay

</p>


</div>




</div>



</BrandCard>






</section>









{/* System Status */}


<section className="mt-8">


<BrandCard className="card-hover">


<div

className="
text-center
"

>



<h2

className="
text-4xl
font-black
pp-gradient-text
"

>

SYSTEM STATUS

</h2>





<div

className="
mt-6
grid
md:grid-cols-3
gap-5
"

>



<div className="pp-card-surface p-5">


<h3 className="text-cyan-400 font-black">

ONLINE

</h3>


<p className="text-slate-400">

Community Network

</p>


</div>






<div className="pp-card-surface p-5">


<h3 className="text-purple-400 font-black">

ACTIVE

</h3>


<p className="text-slate-400">

Creator Support

</p>


</div>






<div className="pp-card-surface p-5">


<h3 className="text-green-400 font-black">

READY

</h3>


<p className="text-slate-400">

New Connections

</p>


</div>





</div>



</div>


</BrandCard>


</section>









{/* Final CTA */}


<section className="mt-8">


<BrandCard className="card-hover">


<div className="text-center">


<h2

className="
text-4xl
font-black
"

>

READY TO LEVEL UP?

</h2>





<p

className="
mt-5
text-slate-400
max-w-3xl
mx-auto
"

>

Join the PulsePlay network and become
part of a growing gaming universe built
around games, streams, creators, and community.

</p>



</div>


</BrandCard>


</section>








</main>

);


}