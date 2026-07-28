import { useEffect, useState } from "react";

import {
  getAIContent,
  generateWeeklyContent,
  updateAIContent,
  deleteAIContent,
  type AIContentItem,
} from "../../services/aiContent";




export default function AIContentStudio() {


  const [content, setContent] =
    useState<AIContentItem[]>([]);



  const [loading, setLoading] =
    useState(true);



  const [generating, setGenerating] =
    useState(false);



  const [error, setError] =
    useState("");






  async function loadContent() {

    try {

      setLoading(true);

      setError("");

      const data =
        await getAIContent();


      setContent(data);


    } catch(error:any) {

      console.error(
        "Loading AI content failed:",
        error
      );


      setError(
        error.message ||
        "Failed loading AI content"
      );


    } finally {

      setLoading(false);

    }

  }







  useEffect(() => {

    loadContent();

  }, []);







  async function handleGenerate() {


    try {


      setGenerating(true);

      setError("");



      await generateWeeklyContent();


      await loadContent();



    } catch(error:any) {


      console.error(
        "AI generation failed:",
        error
      );


      setError(
        error.message ||
        "Failed generating weekly content"
      );


    } finally {


      setGenerating(false);


    }


  }







  async function approvePost(
    id:string
  ) {


    try {


      await updateAIContent(

        id,

        {
          status:"approved"
        }

      );


      await loadContent();



    } catch(error:any) {


      setError(
        error.message
      );


    }

  }








  async function removePost(
    id:string
  ) {


    try {


      await deleteAIContent(id);


      await loadContent();



    } catch(error:any) {


      setError(
        error.message
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

          Generate and manage your weekly gaming media workflow.

        </p>





        <button

          onClick={handleGenerate}

          disabled={generating}

          className="
            pp-button
            mt-5
            disabled:opacity-50
          "

        >

          {
            generating
              ? "Generating Weekly Content..."
              : "🚀 Generate Weekly Content"
          }


        </button>


      </div>







      {error && (

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

      )}








      {
        loading ? (

          <div className="pp-panel p-6">

            Loading AI Content...

          </div>


        ) : content.length === 0 ? (


          <div className="pp-panel p-6 text-slate-400">

            No AI content generated yet.

            <br />

            Click Generate Weekly Content to create this week's posts.

          </div>


        ) : (


          <div className="grid gap-6">


            {
              content.map((item) => (

                <div
                  key={item.id}
                  className="pp-panel p-6"
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





                  <p className="mt-4 text-slate-300">

                    {item.body}

                  </p>





                  <div className="mt-4 text-sm text-slate-400">

                    📅 {item.scheduled_date}

                  </div>







                  <details className="mt-5">


                    <summary className="cursor-pointer text-cyan-400">

                      View Social Content

                    </summary>



                    <p className="mt-3 text-slate-300">

                      {item.social_caption}

                    </p>




                    <p className="mt-3 text-sm text-slate-500">

                      Image Prompt:

                      <br />

                      {item.image_prompt}

                    </p>


                  </details>







                  <div className="mt-5 flex gap-3">


                    <button

                      className="pp-button"

                      onClick={() =>
                        approvePost(item.id!)
                      }

                    >

                      ✅ Approve

                    </button>





                    <button

                      className="
                        rounded-xl
                        bg-red-500/20
                        px-4
                        py-2
                        text-red-300
                      "

                      onClick={() =>
                        removePost(item.id!)
                      }

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