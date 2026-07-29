import { useEffect, useState } from "react";

import {
  getAIContent,
  generateWeeklyContent,
  updateAIContent,
  deleteAIContent,
  type AIContentItem,
} from "../../services/aiContent";



const API =
  "http://localhost:5000/api/ai";





export default function AIContentStudio() {


  const [content,setContent] =
    useState<AIContentItem[]>([]);



  const [loading,setLoading] =
    useState(true);



  const [generating,setGenerating] =
    useState(false);



  const [publishing,setPublishing] =
    useState<string | null>(null);



  const [error,setError] =
    useState("");








  async function loadContent(){


    try{


      setLoading(true);

      setError("");



      const data =
        await getAIContent();



      setContent(data);



    }catch(error:any){


      console.error(
        "Loading AI content failed:",
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



    }catch(error:any){


      setError(
        error.message ||
        "AI generation failed"
      );


    }finally{


      setGenerating(false);

    }


  }









  async function approvePost(id:string){


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
        error.message
      );

    }

  }









  async function publishPost(id:string){


    try{


      setPublishing(id);



      const response =
        await fetch(

          `${API}/publish/${id}`,

          {
            method:"POST"
          }

        );



      const result =
        await response.json();




      if(!result.success){

        throw new Error(
          result.error ||
          "Publishing failed"
        );

      }



      await loadContent();



    }catch(error:any){


      console.error(
        "Publish failed:",
        error
      );


      setError(
        error.message
      );


    }finally{


      setPublishing(null);

    }


  }









  async function removePost(id:string){


    try{


      await deleteAIContent(id);



      await loadContent();



    }catch(error:any){


      setError(
        error.message
      );

    }

  }









  function statusStyle(status:string){


    switch(status){


      case "published":

        return "bg-green-500/20 text-green-300";


      case "approved":

        return "bg-blue-500/20 text-blue-300";


      default:

        return "bg-yellow-500/20 text-yellow-300";


    }

  }









  return (

    <div className="space-y-6">



      <div className="pp-panel p-6">


        <h1 className="pp-title text-3xl">

          🤖 PulsePlay AI Content Studio

        </h1>



        <p className="mt-3 text-slate-400">

          Generate, review, approve, and publish your weekly gaming content.

        </p>




        <div className="flex gap-3 mt-5">


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

              ? "Generating..."

              : "🚀 Generate Weekly Content"

            }


          </button>




          <button

            onClick={loadContent}

            className="
              rounded-xl
              border
              border-white/10
              px-4
              py-2
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
          p-5
        ">

          {error}

        </div>

      )}









      {
        loading ? (

          <div className="pp-panel p-6">

            Loading AI Content...

          </div>


        ) : content.length === 0 ? (


          <div className="pp-panel p-6 text-slate-400">

            No AI content yet.

          </div>


        ) : (



          <div className="grid gap-6">



          {
            content.map(item=>(



              <div

                key={item.id}

                className="
                  pp-panel
                  p-6
                "

              >



                <div className="flex justify-between">


                  <div>


                    <h2 className="text-xl font-bold">

                      {item.title}

                    </h2>



                    <p className="text-sm text-slate-400">

                      {item.category}

                      {" • "}

                      {item.content_type}

                      {" • "}

                      📅 {item.scheduled_date}

                    </p>


                  </div>






                  <span

                    className={`
                      rounded-lg
                      px-3
                      py-1
                      text-sm
                      ${statusStyle(item.status)}
                    `}

                  >

                    {item.status}

                  </span>



                </div>








                <p className="mt-5 text-slate-300">

                  {item.body}

                </p>








                <details className="mt-5">


                  <summary className="cursor-pointer text-cyan-400">

                    View Social Content

                  </summary>



                  <p className="mt-3">

                    {item.social_caption}

                  </p>



                  <p className="mt-4 text-sm text-slate-500">

                    Image Prompt:

                    <br/>

                    {item.image_prompt}

                  </p>



                </details>








                <div className="flex gap-3 mt-6">



                  <button

                    className="pp-button"

                    onClick={()=>approvePost(item.id)}

                  >

                    ✅ Approve

                  </button>






                  <button

                    className="
                      rounded-xl
                      bg-green-500/20
                      px-4
                      py-2
                      text-green-300
                    "

                    disabled={publishing === item.id}

                    onClick={()=>publishPost(item.id)}

                  >

                    {
                      publishing === item.id

                      ? "Publishing..."

                      : "🚀 Publish"

                    }


                  </button>






                  <button

                    className="
                      rounded-xl
                      bg-red-500/20
                      px-4
                      py-2
                      text-red-300
                    "

                    onClick={()=>removePost(item.id)}

                  >

                    🗑 Delete

                  </button>



                </div>



              </div>



            ))

          }


          </div>


        )

      }


    </div>

  );

}