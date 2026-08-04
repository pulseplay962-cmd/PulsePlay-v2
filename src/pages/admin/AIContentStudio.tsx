import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getAIContent,
  generateWeeklyContent,
  updateAIContent,
  deleteAIContent,
  publishAIContent,
  generateAIImage,
  type AIContentItem,
} from "../../services/aiContent";

import AIContentCalendar from "../../components/admin/AIContentCalendar";



export default function AIContentStudio(){


  const [content,setContent] =
    useState<AIContentItem[]>([]);



  const [loading,setLoading] =
    useState(true);



  const [generating,setGenerating] =
    useState(false);



  const [generatingImage,setGeneratingImage] =
    useState<string | null>(null);



  const [saving,setSaving] =
    useState(false);



  const [editingId,setEditingId] =
    useState<string | null>(null);



  const [editForm,setEditForm] =
    useState<AIContentItem | null>(null);



  const [error,setError] =
    useState("");



  const [publishedArticles,setPublishedArticles] =
    useState<Record<string,string>>({});







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
        "LOAD AI CONTENT ERROR:",
        error
      );



      setError(
        error.message ||
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


      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("pulseplay:ai-published"));
      }


    }catch(error:any){


      console.error(
        "GENERATE ERROR:",
        error
      );



      setError(
        error.message ||
        "Failed generating content"
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



    setEditingId(
      item.id
    );



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

      setError("");



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


      console.error(
        "SAVE ERROR:",
        error
      );



      setError(
        error.message ||
        "Failed saving content"
      );



    }finally{


      setSaving(false);


    }


  }









  async function createImagePreview(
    id:string
  ){


    try{


      setGeneratingImage(id);

      setError("");



      await generateAIImage(id);



      await loadContent();



    }catch(error:any){


      console.error(
        "IMAGE ERROR:",
        error
      );



      setError(
        error.message ||
        "Image generation failed"
      );



    }finally{


      setGeneratingImage(null);


    }


  }









  async function approvePost(
    id:string
  ){


    try{


      setError("");



      await updateAIContent(

        id,

        {

          status:"approved"

        }

      );



      await loadContent();



    }catch(error:any){


      setError(
        error.message ||
        "Approval failed"
      );



    }


  }









  async function removePost(
    id:string
  ){


    try{


      setError("");



      await deleteAIContent(id);



      await loadContent();



    }catch(error:any){


      setError(
        error.message ||
        "Delete failed"
      );


    }


  }









  async function publishPost(
    id:string
  ){


    try{


      setError("");



      const result =
        await publishAIContent(id);



      if(result?.slug){


        setPublishedArticles(prev=>({

          ...prev,

          [id]:
          result.slug

        }));


      }



      await loadContent();



    }catch(error:any){


      console.error(
        "PUBLISH ERROR:",
        error
      );



      setError(
        error.message ||
        "Publish failed"
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

          Generate, edit, approve, create artwork,
          and publish automated gaming content.

        </p>




        <div className="mt-5 flex flex-wrap gap-3">


          <button

            onClick={handleGenerate}

            disabled={generating}

            className="
            pp-button
            disabled:opacity-50
            "

          >

            {
              generating
              ?
              "Generating Weekly Content..."
              :
              "🚀 Generate Weekly Content"
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






      {
        error &&

        (

          <div

            className="
            pp-panel
            border
            border-red-500/40
            text-red-300
            "

          >

            {error}

          </div>

        )

      }








      {
        loading ?


        (

          <div className="pp-panel p-6">

            Loading AI Content...

          </div>

        )



        :


        (

        <>





          <AIContentCalendar

            content={content}

            onSelect={(item)=>{

              startEdit(item);

            }}

          />






          <div className="grid gap-6">



          {

            content.map((item)=>(



              <div

                key={item.id}

                className="
                pp-panel
                p-6
                "

              >





              {

              editingId === item.id && editForm ?



              (

                <div className="space-y-4">



                  <h2 className="
                  text-2xl
                  font-black
                  text-cyan-400
                  ">

                    ✏️ Editing AI Content

                  </h2>





                  <input

                    className="
                    w-full
                    rounded-xl
                    bg-black/30
                    p-3
                    text-white
                    "

                    value={editForm.title}

                    onChange={(e)=>

                      setEditForm({

                        ...editForm,

                        title:e.target.value

                      })

                    }

                  />






                  <textarea

                    className="
                    min-h-[250px]
                    w-full
                    rounded-xl
                    bg-black/30
                    p-4
                    text-white
                    "

                    value={editForm.body}

                    onChange={(e)=>

                      setEditForm({

                        ...editForm,

                        body:e.target.value

                      })

                    }

                  />







                  <textarea

                    className="
                    min-h-[120px]
                    w-full
                    rounded-xl
                    bg-black/30
                    p-4
                    text-white
                    "

                    value={editForm.social_caption || ""}

                    onChange={(e)=>

                      setEditForm({

                        ...editForm,

                        social_caption:
                        e.target.value

                      })

                    }

                  />







                  <textarea

                    className="
                    min-h-[120px]
                    w-full
                    rounded-xl
                    bg-black/30
                    p-4
                    text-white
                    "

                    value={editForm.image_prompt || ""}

                    onChange={(e)=>

                      setEditForm({

                        ...editForm,

                        image_prompt:
                        e.target.value

                      })

                    }

                  />







                  <div className="flex gap-3">


                    <button

                      onClick={saveEdit}

                      disabled={saving}

                      className="
                      pp-button
                      disabled:opacity-50
                      "

                    >

                      {
                        saving
                        ?
                        "Saving..."
                        :
                        "💾 Save Changes"
                      }


                    </button>





                    <button

                      onClick={cancelEdit}

                      className="
                      rounded-xl
                      bg-slate-700
                      px-5
                      py-3
                      font-bold
                      "

                    >

                      Cancel

                    </button>


                  </div>



                </div>


              )




              :



              (


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





                    <span

                      className="
                      rounded
                      bg-cyan-500/20
                      px-3
                      py-1
                      text-cyan-300
                      "

                    >

                      {item.status}

                    </span>


                  </div>







                  <p className="
                  mt-4
                  text-slate-300
                  whitespace-pre-line
                  ">

                    {item.body}

                  </p>






                  {
                    item.image_url &&

                    (

                      <img

                        src={item.image_url}

                        alt={item.title}

                        className="
                        mt-5
                        rounded-xl
                        border
                        border-cyan-500/20
                        "

                      />

                    )

                  }







                  <div className="
                  mt-5
                  flex
                  flex-wrap
                  gap-3
                  ">






                    <button

                      onClick={()=>startEdit(item)}

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







                    <button

                      onClick={()=>createImagePreview(item.id!)}

                      disabled={
                        generatingImage === item.id
                      }

                      className="
                      rounded-xl
                      bg-cyan-500/20
                      px-4
                      py-2
                      text-cyan-300
                      "

                    >

                      {
                        generatingImage === item.id
                        ?
                        "🖼 Creating..."
                        :
                        "🖼 Generate Image"
                      }


                    </button>







                    <button

                      onClick={()=>approvePost(item.id!)}

                      disabled={
                        item.status === "approved" ||
                        item.status === "published"
                      }

                      className="
                      pp-button
                      disabled:opacity-40
                      "

                    >

                      ✅ Approve

                    </button>







                    {
                      item.status === "published" &&
                      publishedArticles[item.id]

                      ?

                      (

                        <Link

                          to={`/news/${publishedArticles[item.id]}`}

                          className="
                          rounded-xl
                          bg-cyan-500/20
                          px-4
                          py-2
                          text-cyan-300
                          font-bold
                          "

                        >

                          📖 View Article

                        </Link>

                      )


                      :

                      (

                        <button

                          onClick={()=>publishPost(item.id!)}

                          disabled={
                            item.status !== "approved"
                          }

                          className="
                          rounded-xl
                          bg-green-500/20
                          px-4
                          py-2
                          text-green-300
                          disabled:opacity-40
                          "

                        >

                          🚀 Publish

                        </button>

                      )

                    }







                    <button

                      onClick={()=>removePost(item.id!)}

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




                  </div>



                </>


              )


              }



              </div>



            ))

          }



          </div>



        </>

        )


      }



    </div>

  );

}