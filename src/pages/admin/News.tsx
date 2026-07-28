import { useEffect, useState } from "react";

import {
  addNews,
  getNews,
  updateNews,
  deleteNews,
  type NewsArticle,
} from "../../services/news";

import { uploadImage } from "../../services/storage";



export default function News() {


  const [articles,setArticles] =
    useState<NewsArticle[]>([]);


  const [editingId,setEditingId] =
    useState<string | null>(null);


  const [saving,setSaving] =
    useState(false);



  const [title,setTitle] =
    useState("");

  const [content,setContent] =
    useState("");

  const [image,setImage] =
    useState("");

  const [imageFile,setImageFile] =
    useState<File | null>(null);


  const [category,setCategory] =
    useState("");


  const [featured,setFeatured] =
    useState(false);


  const [published,setPublished] =
    useState(false);



  const [metaDescription,setMetaDescription] =
    useState("");


  const [facebookPost,setFacebookPost] =
    useState("");


  const [imagePrompt,setImagePrompt] =
    useState("");


  const [hashtags,setHashtags] =
    useState("");





  async function loadNews(){

    try{

      const data = await getNews();

      setArticles(data || []);

    }catch(error){

      console.error(error);

    }

  }





  useEffect(()=>{

    loadNews();

  },[]);








  async function handleSubmit(
    e:React.FormEvent
  ){

    e.preventDefault();

    setSaving(true);



    try{


      let imageUrl = image;



      if(imageFile){

        imageUrl = await uploadImage(
          imageFile,
          "news"
        );

      }





      const article = {


        title,


        slug:title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g,"-")
          .replace(/^-|-$/g,""),



        excerpt:
          metaDescription ||
          content.substring(0,150),



        content,


        image:imageUrl,


        category,


        featured,


        published,


        author:"PulsePlay",



        meta_description:
          metaDescription,


        facebook_post:
          facebookPost,


        image_prompt:
          imagePrompt,


        hashtags:
          hashtags
          .split(" ")
          .filter(Boolean),


      };





      if(editingId){


        await updateNews(
          editingId,
          article
        );


      }else{


        await addNews(article);


      }



      clearForm();

      await loadNews();



    }catch(error){


      console.error(error);

      alert(
        "Failed saving article"
      );


    }finally{


      setSaving(false);

    }


  }








  function editArticle(
    article:NewsArticle
  ){


    setEditingId(article.id);


    setTitle(article.title);


    setContent(article.content);


    setImage(article.image);


    setCategory(article.category);


    setFeatured(article.featured);


    setPublished(article.published);


    setMetaDescription(
      article.meta_description || ""
    );


    setFacebookPost(
      article.facebook_post || ""
    );


    setImagePrompt(
      article.image_prompt || ""
    );


    setHashtags(
      article.hashtags?.join(" ") || ""
    );



    window.scrollTo({
      top:0,
      behavior:"smooth"
    });


  }









  async function handleDelete(
    id:string
  ){


    if(
      !window.confirm(
        "Delete this article?"
      )
    ) return;



    await deleteNews(id);

    await loadNews();


  }









  async function togglePublish(
    article:NewsArticle
  ){


    await updateNews(

      article.id,

      {
        published:
          !article.published
      }

    );


    await loadNews();


  }









  function clearForm(){


    setEditingId(null);

    setTitle("");

    setContent("");

    setImage("");

    setCategory("");

    setFeatured(false);

    setPublished(false);

    setMetaDescription("");

    setFacebookPost("");

    setImagePrompt("");

    setHashtags("");

    setImageFile(null);


  }








  return (

<div>


<h1 className="text-4xl font-black">
Manage News
</h1>





<form

onSubmit={handleSubmit}

className="
mt-8
max-w-xl
space-y-4
rounded-xl
bg-[#111827]
p-6
"

>



<h2 className="text-xl font-bold">

{editingId
?"Edit Article"
:"Add News"}

</h2>






<input

className="w-full rounded bg-[#1f2937] p-3"

placeholder="Title"

value={title}

onChange={
e=>setTitle(e.target.value)
}

/>






<input

className="w-full rounded bg-[#1f2937] p-3"

placeholder="Category"

value={category}

onChange={
e=>setCategory(e.target.value)
}

/>






<textarea

className="w-full rounded bg-[#1f2937] p-3"

placeholder="Meta Description"

value={metaDescription}

onChange={
e=>setMetaDescription(e.target.value)
}

/>






<textarea

className="w-full rounded bg-[#1f2937] p-3"

rows={8}

placeholder="Article Content"

value={content}

onChange={
e=>setContent(e.target.value)
}

/>






<textarea

className="w-full rounded bg-[#1f2937] p-3"

placeholder="Facebook Post"

value={facebookPost}

onChange={
e=>setFacebookPost(e.target.value)
}

/>






<textarea

className="w-full rounded bg-[#1f2937] p-3"

placeholder="Image Prompt"

value={imagePrompt}

onChange={
e=>setImagePrompt(e.target.value)
}

/>






<input

className="w-full rounded bg-[#1f2937] p-3"

placeholder="Hashtags"

value={hashtags}

onChange={
e=>setHashtags(e.target.value)
}

/>






<input

type="file"

accept="image/*"

onChange={
e=>
setImageFile(
e.target.files?.[0] || null
)
}

/>





<label>

<input

type="checkbox"

checked={featured}

onChange={
e=>setFeatured(e.target.checked)
}

/>

 Featured

</label>





<label>

<input

type="checkbox"

checked={published}

onChange={
e=>setPublished(e.target.checked)
}

/>

 Published

</label>






<button

disabled={saving}

className="
rounded-lg
bg-cyan-500
px-6
py-3
font-bold
text-black
"

>

{
saving
?"Saving..."
:"Save Article"
}

</button>


</form>









<div className="mt-10 space-y-5">


{articles.map(article=>(


<div

key={article.id}

className="
rounded-xl
bg-[#111827]
p-5
"

>



<img

src={article.image}

className="
h-40
w-full
rounded
object-cover
"

/>





<h2 className="text-2xl font-bold">

{article.title}

</h2>




<p className="text-cyan-400">

{article.category}

</p>




<p className="text-gray-400">

{article.published
?"🟢 Published"
:"🟡 Draft"}

</p>





<p className="mt-3">

{article.content.substring(0,300)}...

</p>





<div className="flex gap-3 mt-4">


<button

onClick={()=>
editArticle(article)
}

className="rounded bg-blue-600 px-4 py-2"

>

Edit

</button>





<button

onClick={()=>
togglePublish(article)
}

className="rounded bg-green-600 px-4 py-2"

>

{
article.published
?"Unpublish"
:"Publish"
}

</button>





<button

onClick={()=>
handleDelete(article.id)
}

className="rounded bg-red-600 px-4 py-2"

>

Delete

</button>



</div>


</div>


))}


</div>


</div>

  );

}