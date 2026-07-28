import { useEffect, useState } from "react";

import {
  getAIContent,
  generateWeeklyContent,
  updateAIContent,
  deleteAIContent,
  publishAIContent,
  type AIContentItem,
} from "../../services/aiContent";





export default function AIContentStudio() {


  const [content,setContent] =
    useState<AIContentItem[]>([]);



  const [loading,setLoading] =
    useState(true);



  const [generating,setGenerating] =
    useState(false);



  const [saving,setSaving] =
    useState(false);



  const [editingId,setEditingId] =
    useState<string | null>(null);



  const [editForm,setEditForm] =
    useState<AIContentItem | null>(null);



  const [error,setError] =
    useState("");







  async function loadContent(){

    try{

      setLoading(true);

      setError("");

      const data =
        await getAIContent();


      setContent(
        data || []
      );


    }catch(error:any){

      console.error(
        "Loading AI content failed",
        error
      );


      setError(
        error?.message ||
        "Failed loading AI content"
      );


    }finally{

      setLoading(false);

    }

  }







  useEffect(()=>{

    loadContent();

  },[]);







  async function handleGenerate(){

    try{

      setGenerating(true);

      setError("");

      await generateWeeklyContent();

      await loadContent();


    }catch(error:any){

      console.error(
        "AI generation failed",
        error
      );


      setError(
        error?.message ||
        "Failed generating weekly content"
      );


    }finally{

      setGenerating(false);

    }

  }







  function startEdit(
    item:AIContentItem
  ){

    if(!item.id){

      return;

    }


    setEditingId(item.id);


    setEditForm({
      ...item
    });

  }







  function cancelEdit(){

    setEditingId(null);

    setEditForm(null);

  }







  async function saveEdit(){

    if(!editForm?.id){

      return;

    }



    try{

      setSaving(true);


      await updateAIContent(

        editForm.id,

        {

          title:
          editForm.title,


          body:
          editForm.body,


          social_caption:
          editForm.social_caption,


          image_prompt:
          editForm.image_prompt,


          scheduled_date:
          editForm.scheduled_date,


        }

      );



      await loadContent();

      cancelEdit();



    }catch(error:any){


      setError(
        error?.message ||
        "Failed saving content"
      );


    }finally{

      setSaving(false);

    }

  }







  async function approvePost(
    id:string
  ){

    try{


      await updateAIContent(

        id,

        {
          status:"approved"
        }

      );


      await loadContent();


    }catch(error:any){

      setError(
        error?.message ||
        "Failed approving post"
      );

    }

  }







  async function removePost(
    id:string
  ){

    try{

      await deleteAIContent(id);

      await loadContent();


    }catch(error:any){

      setError(
        error?.message ||
        "Failed deleting post"
      );

    }

  }







  async function publishPost(
    item:AIContentItem
  ){

    try{


      await publishAIContent(item);


      await loadContent();


    }catch(error:any){


      setError(
        error?.message ||
        "Failed publishing content"
      );

    }

  }








  return (

    <div className="space-y-6">


      <div className="pp-panel p-6">


        <h1 className="pp-title text-3xl">

          🤖 PulsePlay AI Content Studio

        </h1>



        <p className="mt-3 text-slate-400">

          Generate, review, edit, approve, and publish gaming content.

        </p>





        <div className="mt-5 flex gap-3">


          <button

            onClick={handleGenerate}

            disabled={generating}

            className="
            pp-button
            disabled:opacity-50
            "

          >

            {generating
              ? "Generating..."
              : "🚀 Generate Weekly Content"
            }

          </button>





          <button

            onClick={loadContent}

            className="
            rounded-xl
            bg-slate-700
            px-5
            py-3
            font-bold
            "

          >

            🔄 Refresh

          </button>


        </div>


      </div>







      {error && (

        <div className="
        pp-panel
        border
        border-red-500/40
        text-red-300
        ">

          {error}

        </div>

      )}







      {loading ? (

        <div className="pp-panel p-6">

          Loading AI Content...

        </div>


      ) : content.length === 0 ? (

        <div className="pp-panel p-6 text-slate-400">

          No AI content generated yet.

        </div>


      ) : (


      <div className="grid gap-6">


      {content.map((item)=>(


        <div
          key={item.id}
          className="pp-panel p-6"
        >


        {editingId === item.id && editForm ? (


          <div className="space-y-4">


            <input

              className="w-full rounded bg-black/30 p-3"

              value={editForm.title}

              onChange={(e)=>

                setEditForm({

                  ...editForm,

                  title:e.target.value

                })

              }

            />



            <textarea

              className="min-h-[250px] w-full rounded bg-black/30 p-4"

              value={editForm.body}

              onChange={(e)=>

                setEditForm({

                  ...editForm,

                  body:e.target.value

                })

              }

            />



            <textarea

              className="w-full rounded bg-black/30 p-4"

              value={editForm.social_caption}

              onChange={(e)=>

                setEditForm({

                  ...editForm,

                  social_caption:e.target.value

                })

              }

            />



            <textarea

              className="w-full rounded bg-black/30 p-4"

              value={editForm.image_prompt}

              onChange={(e)=>

                setEditForm({

                  ...editForm,

                  image_prompt:e.target.value

                })

              }

            />



            <div className="flex gap-3">


              <button
                onClick={saveEdit}
                className="pp-button"
              >

                {saving
                  ? "Saving..."
                  : "💾 Save"
                }

              </button>



              <button

                onClick={cancelEdit}

                className="rounded-xl bg-gray-700 px-5 py-3"

              >

                Cancel

              </button>


            </div>


          </div>


        ) : (


        <>


        <div className="flex justify-between">


          <div>

            <h2 className="text-xl font-bold">

              {item.title}

            </h2>


            <p className="text-sm text-slate-400">

              {item.category}
              {" • "}
              {item.content_type}

            </p>


          </div>



          <span className="rounded bg-cyan-500/20 px-3 py-1 text-cyan-300">

            {item.status}

          </span>


        </div>





        <p className="mt-4 text-slate-300">

          {item.body}

        </p>





        <details className="mt-5">


          <summary className="cursor-pointer text-cyan-400">

            View Social Content

          </summary>



          <p className="mt-3">

            {item.social_caption}

          </p>



          <p className="mt-3 text-sm text-slate-500">

            Image Prompt:

            <br/>

            {item.image_prompt}

          </p>


        </details>





        <div className="mt-5 flex flex-wrap gap-3">


          {item.id && (

          <button

            onClick={() => startEdit(item)}

            className="
            rounded-xl
            bg-purple-500/20
            px-4
            py-2
            text-purple-300
            "

          >

            ✏️ Edit

          </button>

          )}




          {item.id && (

          <button

            onClick={() => approvePost(item.id!)}

            className="pp-button"

          >

            ✅ Approve

          </button>

          )}




          <button

            onClick={() => publishPost(item)}

            className="
            rounded-xl
            bg-green-500/20
            px-4
            py-2
            text-green-300
            "

          >

            🚀 Publish

          </button>





          {item.id && (

          <button

            onClick={() => removePost(item.id!)}

            className="
            rounded-xl
            bg-red-500/20
            px-4
            py-2
            text-red-300
            "

          >

            🗑 Delete

          </button>

          )}


        </div>


        </>


        )}


        </div>


      ))}


      </div>


      )}


    </div>

  );

}