import { useEffect, useState } from "react";

import {
  addNews,
  getNews,
  updateNews,
  deleteNews,
} from "../../services/news";

import { uploadImage } from "../../services/storage";


type Article = {
  id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  featured: boolean;
};



export default function News() {


  const [articles, setArticles] = useState<Article[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);


  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [image, setImage] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [category, setCategory] = useState("");

  const [featured, setFeatured] = useState(false);




  async function loadNews() {

    try {

      const data = await getNews();

      setArticles(data || []);


    } catch(error) {

      console.error(error);

    }

  }





  useEffect(() => {

    loadNews();

  }, []);








  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setSaving(true);



    try {


      let imageUrl = image;



      if(imageFile){

        imageUrl = await uploadImage(
          imageFile,
          "news"
        );

      }




      const article = {

        title,

        content,

        image: imageUrl,

        category,

        featured,

      };





      if(editingId){


        await updateNews(
          editingId,
          article
        );


      } else {


        await addNews(article);


      }




      clearForm();

      await loadNews();




    } catch(error){


      console.error(error);

      alert(
        "Failed to save news article"
      );



    } finally {


      setSaving(false);


    }


  }







  function editArticle(
    article: Article
  ){


    setEditingId(article.id);

    setTitle(article.title);

    setContent(article.content);

    setImage(article.image);

    setCategory(article.category);

    setFeatured(article.featured);

    setImageFile(null);



    window.scrollTo({
      top:0,
      behavior:"smooth",
    });


  }







  async function handleDelete(
    id:string
  ){


    const confirmed =
      window.confirm(
        "Delete this news article?"
      );



    if(!confirmed) return;



    await deleteNews(id);

    await loadNews();


  }







  function clearForm(){

    setEditingId(null);

    setTitle("");

    setContent("");

    setImage("");

    setImageFile(null);

    setCategory("");

    setFeatured(false);

  }







  return (

    <div>


      <h1 className="text-4xl font-black">
        Manage News
      </h1>





      <form

        onSubmit={handleSubmit}

        className="mt-8 max-w-xl space-y-4 rounded-xl bg-[#111827] p-6"

      >


        <h2 className="text-xl font-bold">

          {editingId
            ? "Edit Article"
            : "Add News"}

        </h2>






        <input

          className="w-full rounded bg-[#1f2937] p-3"

          placeholder="Title"

          value={title}

          onChange={(e)=>
            setTitle(e.target.value)
          }

        />






        <input

          className="w-full rounded bg-[#1f2937] p-3"

          placeholder="Category"

          value={category}

          onChange={(e)=>
            setCategory(e.target.value)
          }

        />






        <textarea

          className="w-full rounded bg-[#1f2937] p-3"

          placeholder="Article content"

          rows={5}

          value={content}

          onChange={(e)=>
            setContent(e.target.value)
          }

        />







        <input

          type="file"

          accept="image/*"

          className="w-full rounded bg-[#1f2937] p-3"

          onChange={(e)=>{

            setImageFile(
              e.target.files?.[0] || null
            );

          }}

        />






        {image && (

          <img

            src={image}

            alt="Preview"

            className="h-40 w-full rounded object-cover"

          />

        )}







        <label className="flex items-center gap-2">


          <input

            type="checkbox"

            checked={featured}

            onChange={(e)=>
              setFeatured(
                e.target.checked
              )
            }

          />


          Featured Article


        </label>







        <button

          disabled={saving}

          className="rounded-lg bg-cyan-500 px-6 py-3 font-bold text-black disabled:opacity-50"

        >

          {saving
            ? "Uploading..."
            : editingId
            ? "Update Article"
            : "Add News"}

        </button>



      </form>






      <div className="mt-10 space-y-4">


        {articles.map((article)=>(


          <div

            key={article.id}

            className="rounded-xl bg-[#111827] p-5"

          >



            {article.image && (

              <img

                src={article.image}

                alt={article.title}

                className="mb-4 h-40 w-full rounded object-cover"

              />

            )}






            <h2 className="text-2xl font-bold">

              {article.title}

            </h2>






            <p className="text-cyan-400">

              {article.category}

            </p>






            <p className="mt-3 text-gray-400">

              {article.content}

            </p>





            <div className="mt-4 flex gap-3">


              <button

                onClick={() =>
                  editArticle(article)
                }

                className="rounded bg-blue-600 px-4 py-2 font-bold"

              >

                Edit

              </button>





              <button

                onClick={() =>
                  handleDelete(article.id)
                }

                className="rounded bg-red-600 px-4 py-2 font-bold"

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