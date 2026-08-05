import { useState } from "react";

import {
  submitCommunitySignup
} from "../../services/communitySignup";



export default function SignupPanel(){


const [name,setName] = useState("");

const [email,setEmail]=useState("");

const [discord,setDiscord]=useState("");

const [message,setMessage]=useState("");

const [loading,setLoading]=useState(false);





async function submit(e:React.FormEvent){

e.preventDefault();


try{


setLoading(true);


await submitCommunitySignup({

name,

email,

discord

});


setMessage(
"🎮 Welcome to the PulsePlay Network!"
);


setName("");

setEmail("");

setDiscord("");


}

catch(error:any){


console.error(
"Signup failed:",
error
);


setMessage(
error?.message ||
"Signup failed"
);


}

finally{

setLoading(false);

}


}





return (

<section
className="
pp-panel
p-8
"
>


<h2
className="
text-3xl
font-black
pp-gradient-text
"
>

🚀 JOIN THE PULSEPLAY NETWORK

</h2>



<p
className="
mt-3
text-slate-400
"
>

Get gaming updates,
stream alerts,
community events,
and new drops.

</p>





<form
onSubmit={submit}
className="
mt-6
space-y-4
"
>




<input

type="text"

required

placeholder="Player Name"

value={name}

onChange={(e)=>
setName(e.target.value)
}

className="
w-full
rounded-xl
bg-black/40
p-4
text-white
"

/>





<input

type="email"

required

placeholder="Email address"

value={email}

onChange={(e)=>
setEmail(e.target.value)
}

className="
w-full
rounded-xl
bg-black/40
p-4
text-white
"

/>





<input

type="text"

placeholder="Discord Username (optional)"

value={discord}

onChange={(e)=>
setDiscord(e.target.value)
}

className="
w-full
rounded-xl
bg-black/40
p-4
text-white
"

/>





<button

type="submit"

disabled={loading}

className="
w-full
rounded-xl
bg-gradient-to-r
from-purple-600
to-pink-500
px-6
py-4
font-black
text-white
transition
hover:scale-105
disabled:opacity-50
"

>

{

loading

?

"CONNECTING..."

:

"🚀 JOIN COMMUNITY"

}

</button>





{

message &&

<p

className="
mt-4
font-bold
text-cyan-300
"

>

{message}

</p>

}



</form>



</section>

);


}