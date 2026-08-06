import { useEffect, useState } from "react";

import { supabase } from "../../lib/supabase";



type ActivityItem = {

  id:string;

  text:string;

  created_at:string;

};





export default function RecentActivity(){



const [activity,setActivity] =
useState<ActivityItem[]>([]);



const [loading,setLoading] =
useState(true);







async function loadActivity(){


try{


const [

community,

news,

merchandise,

videos


] = await Promise.all([



supabase

.from("community_signups")

.select(
"id,name,created_at"
)

.order(
"created_at",
{
ascending:false
}
)

.limit(3),




supabase

.from("news")

.select(
"id,title,created_at"
)

.order(
"created_at",
{
ascending:false
}
)

.limit(3),




supabase

.from("merchandise")

.select(
"id,name,created_at"
)

.order(
"created_at",
{
ascending:false
}
)

.limit(3),




supabase

.from("videos")

.select(
"id,title,created_at"
)

.order(
"created_at",
{
ascending:false
}
)

.limit(3)



]);






const combined:ActivityItem[] = [];





community.data?.forEach((item)=>{

combined.push({

id:
"community-"+item.id,

text:
`🎮 New player joined: ${item.name}`,

created_at:
item.created_at

});


});





news.data?.forEach((item)=>{

combined.push({

id:
"news-"+item.id,

text:
`📰 New article: ${item.title}`,

created_at:
item.created_at

});


});





merchandise.data?.forEach((item)=>{

combined.push({

id:
"merch-"+item.id,

text:
`👕 New merchandise added: ${item.name}`,

created_at:
item.created_at

});


});





videos.data?.forEach((item)=>{

combined.push({

id:
"video-"+item.id,

text:
`🎥 New video added: ${item.title}`,

created_at:
item.created_at

});


});






combined.sort(

(a,b)=>

new Date(b.created_at).getTime()

-

new Date(a.created_at).getTime()

);




setActivity(
combined.slice(0,8)
);



}
catch(error){


console.error(
"RECENT ACTIVITY ERROR:",
error
);


}
finally{


setLoading(false);


}


}








useEffect(()=>{


loadActivity();


},[]);









return (

<div className="pp-panel p-6">


<h2 className="text-2xl font-black text-purple-400">

📡 RECENT ACTIVITY

</h2>





<div className="mt-5 space-y-3">



{

loading &&

<div className="
rounded-xl
bg-black/20
p-3
text-slate-300
">

Loading activity...

</div>

}






{

!loading && activity.length === 0 &&

<div className="
rounded-xl
bg-black/20
p-3
text-slate-300
">

No recent activity yet.

</div>

}







{

activity.map((item)=>(


<div

key={item.id}

className="
rounded-xl
bg-black/20
p-3
text-slate-300
"

>


<p>

{item.text}

</p>



<p className="
text-xs
text-slate-500
mt-2
">

{
new Date(
item.created_at
)
.toLocaleString()
}

</p>


</div>


))

}



</div>


</div>

);

}