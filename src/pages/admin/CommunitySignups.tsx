import { useEffect, useState } from "react";

import { supabase } from "../../lib/supabase";



type Signup = {

  id:string;

  name:string;

  email:string;

  discord:string | null;

  created_at:string;

};





export default function CommunitySignups(){



const [signups,setSignups] =
useState<Signup[]>([]);



const [loading,setLoading] =
useState(true);



const [deleting,setDeleting] =
useState("");







async function loadSignups(){


try{


setLoading(true);



const {

data,

error

} = await supabase

.from("community_signups")

.select("*")

.order(
"created_at",
{
ascending:false
}
);





if(error){

throw error;

}



setSignups(
data || []
);



}
catch(error){

console.error(
"Failed loading signups:",
error
);


}
finally{


setLoading(false);


}


}







async function deleteSignup(
id:string
){


const confirmed =
window.confirm(
"Delete this community signup?"
);



if(!confirmed)
return;



try{


setDeleting(id);



const {

error

} = await supabase

.from("community_signups")

.delete()

.eq(
"id",
id
);




if(error){

throw error;

}



await loadSignups();



}
catch(error){

console.error(
"Delete signup failed:",
error
);


}
finally{


setDeleting("");


}


}







useEffect(()=>{


loadSignups();


},[]);









if(loading){

return (

<section className="p-8">

<p className="text-cyan-300 font-bold">

Loading community signups...

</p>

</section>

);

}









return (

<section className="p-8 space-y-8">





<div>

<h1
className="
text-5xl
font-black
pp-gradient-text
"
>

COMMUNITY SIGNUPS

</h1>


<p className="text-slate-400 mt-2">

Manage PulsePlay player registrations.

</p>


</div>








<div
className="
grid
gap-5
"
>





{
signups.map((signup)=>(


<div

key={signup.id}

className="
pp-card-surface
rounded-2xl
p-6
flex
justify-between
items-center
"

>





<div>


<h2
className="
text-2xl
font-black
"
>

{signup.name}

</h2>




<p
className="
text-slate-300
mt-2
"
>

{signup.email}

</p>




<p
className="
text-purple-400
mt-1
"
>

🎮 Discord:
{" "}

{signup.discord || "No Discord"}

</p>




<p
className="
text-sm
text-slate-500
mt-3
"
>

Joined:

{" "}

{
new Date(
signup.created_at
)
.toLocaleDateString()
}

</p>



</div>







<button

onClick={()=>
deleteSignup(signup.id)
}

disabled={
deleting === signup.id
}

className="
rounded-xl
bg-red-600
px-5
py-3
font-black
text-white
disabled:opacity-50
"

>

{

deleting === signup.id

?

"DELETING..."

:

"DELETE"

}



</button>





</div>


))

}







{
signups.length === 0 &&

<p className="text-slate-400">

No community signups yet.

</p>

}





</div>







</section>

);


}