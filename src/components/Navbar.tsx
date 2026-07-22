import { NavLink } from "react-router-dom";
import { useState } from "react";

import BrandButton from "./ui/BrandButton";


const links = [

  { name: "HOME", path: "/" },

  { name: "GAMES", path: "/games" },

  { name: "STREAMS", path: "/streams" },

  { name: "STORE", path: "/store" },

  { name: "MERCH", path: "/merchandise" },

  { name: "NEWS", path: "/news" },

  { name: "COMMUNITY", path: "/community" },

  { name: "ABOUT", path: "/about" },

];



export default function Navbar() {


  const [menuOpen,setMenuOpen] = useState(false);



  return (

<header

className="
sticky
top-0
z-50
backdrop-blur-xl
bg-[#050510]/85
border-b
border-purple-500/30
shadow-[0_0_25px_rgba(139,92,246,.25)]
"


>


<nav

className="
max-w-[1400px]
mx-auto
px-6
py-4
flex
items-center
justify-between
"


>



{/* BRAND */}


<NavLink

to="/"

onClick={()=>setMenuOpen(false)}

className="
flex
items-center
gap-3
"


>


<img

src="/pulseplay-logo.svg"

alt="PulsePlay"

className="
w-12
h-12
rounded-xl
shadow-[0_0_30px_rgba(34,211,238,.45)]
"


/>



<div>


<h1

className="
text-3xl
font-black
pp-gradient-text
tracking-wider
"

>

PULSEPLAY

</h1>


<div

className="
flex
items-center
gap-2
text-xs
text-green-400
font-bold
tracking-widest
"

>

<span
className="
w-2
h-2
bg-green-400
rounded-full
shadow-[0_0_10px_#22c55e]
"
/>

SYSTEM ONLINE

</div>


</div>


</NavLink>







{/* DESKTOP HUD MENU */}


<div

className="
hidden
lg:flex
items-center
gap-2
"

>


{links.map((link)=>(


<NavLink

key={link.path}

to={link.path}


className={({isActive})=>

`

px-4
py-2
rounded-lg
text-sm
font-bold
tracking-wider
transition
duration-300

${

isActive

?

`
bg-purple-600/30
text-cyan-300
border
border-cyan-400/40
shadow-[0_0_15px_rgba(34,211,238,.35)]
`

:

`
text-slate-300
hover:text-white
hover:bg-white/5
`

}

`

}


>


{link.name}


</NavLink>


))}


</div>







{/* STATUS + BUTTON */}


<div

className="
hidden
lg:flex
items-center
gap-5
"


>


<div

className="
flex
items-center
gap-2
text-red-400
text-sm
font-bold
"


>

<span

className="
w-2
h-2
bg-red-500
rounded-full
animate-pulse
"

/>

LIVE


</div>



<NavLink to="/store">

<BrandButton>

ENTER STORE

</BrandButton>


</NavLink>


</div>








{/* MOBILE BUTTON */}


<button

onClick={()=>setMenuOpen(!menuOpen)}

className="
lg:hidden
flex
flex-col
gap-1.5
"


>


<span className="h-0.5 w-7 bg-white"/>

<span className="h-0.5 w-7 bg-purple-400"/>

<span className="h-0.5 w-7 bg-white"/>


</button>


</nav>







{/* MOBILE HUD MENU */}



{

menuOpen &&

(

<div

className="
lg:hidden
bg-[#050510]/95
border-t
border-purple-500/30
p-6
space-y-3
"


>


{links.map((link)=>(


<NavLink

key={link.path}

to={link.path}

onClick={()=>setMenuOpen(false)}

className={({isActive})=>

`

block
px-4
py-3
rounded-lg
font-bold
tracking-wider

${

isActive

?

"bg-purple-600/40 text-cyan-300"

:

"text-slate-300"

}

`

}


>


{link.name}


</NavLink>


))}



<NavLink

to="/store"

onClick={()=>setMenuOpen(false)}

className="block pt-4"

>


<BrandButton>

ENTER STORE

</BrandButton>


</NavLink>


</div>

)

}


</header>

  );

}