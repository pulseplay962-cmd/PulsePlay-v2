import { useEffect, useState } from "react";

import {
  getSocialQueue,
  deleteSocialPost,
  updateSocialPost,
  type SocialPost,
} from "../../services/socialQueue";




export default function SocialQueue(){


  const [posts,setPosts] =
    useState<SocialPost[]>([]);



  const [loading,setLoading] =
    useState(true);



  const [error,setError] =
    useState("");







  async function loadQueue(){


    try{


      setLoading(true);

      setError("");



      const data =
        await getSocialQueue();



      setPosts(
        data || []
      );



    }catch(error:any){


      console.error(
        "SOCIAL QUEUE LOAD ERROR:",
        error
      );


      setError(
        error.message ||
        "Failed loading social queue"
      );


    }finally{


      setLoading(false);


    }


  }








  useEffect(()=>{


    loadQueue();


  },[]);







  async function changeStatus(

    id:string,

    status:string

  ){


    try{


      await updateSocialPost(

        id,

        {
          status
        }

      );


      await loadQueue();



    }catch(error:any){


      setError(
        error.message ||
        "Status update failed"
      );


    }


  }








  async function removePost(

    id:string

  ){


    try{


      await deleteSocialPost(id);


      await loadQueue();



    }catch(error:any){


      setError(
        error.message ||
        "Delete failed"
      );


    }


  }








  return (

    <div className="space-y-6">



      <section className="pp-panel p-6">


        <h1 className="
        text-4xl
        font-black
        pp-gradient-text
        ">

          📡 Social Queue Command

        </h1>



        <p className="
        mt-3
        text-slate-400
        ">

          Manage AI generated social posts
          before they are published.

        </p>



        <button

          onClick={loadQueue}

          className="
          mt-5
          rounded-xl
          bg-slate-700
          px-5
          py-3
          font-bold
          "

        >

          🔄 Refresh Queue

        </button>


      </section>








      {
        error &&

        <div className="
        pp-panel
        border
        border-red-500/40
        text-red-300
        p-5
        ">

          {error}

        </div>

      }








      {
        loading ?

        (

          <div className="pp-panel p-6">

            Loading Social Queue...

          </div>

        )


        :


        posts.length === 0 ?

        (

          <div className="pp-panel p-6">


            <h2 className="
            text-2xl
            font-black
            ">

              NO POSTS QUEUED

            </h2>


            <p className="
            mt-3
            text-slate-400
            ">

              AI generated posts will appear here
              after publishing articles.

            </p>


          </div>

        )


        :


        (

          <div className="grid gap-6">


          {
            posts.map((post)=>(


              <div

                key={post.id}

                className="
                pp-panel
                p-6
                "

              >



                <div className="
                flex
                justify-between
                "

                >


                  <div>


                    <h2 className="
                    text-xl
                    font-black
                    text-cyan-400
                    ">

                      📱 {post.platform.toUpperCase()}

                    </h2>



                    <p className="
                    mt-2
                    text-sm
                    text-slate-400
                    ">

                      STATUS:

                      {" "}

                      {post.status}

                    </p>


                  </div>





                  <span className="
                  rounded-full
                  bg-purple-500/20
                  px-4
                  py-2
                  text-purple-300
                  font-bold
                  ">

                    {post.status}

                  </span>



                </div>








                {
                  post.image_url &&

                  <img

                    src={post.image_url}

                    alt="Social media artwork"

                    className="
                    mt-5
                    max-h-72
                    rounded-xl
                    object-cover
                    "

                  />

                }








                <p className="
                mt-5
                whitespace-pre-line
                text-slate-300
                ">

                  {post.post_text}

                </p>







                {
                  post.hashtags &&
                  post.hashtags.length > 0 &&

                  (

                    <div className="
                    mt-5
                    text-cyan-300
                    ">

                      {post.hashtags.join(" ")}

                    </div>

                  )

                }








                <div className="
                mt-6
                flex
                flex-wrap
                gap-3
                ">


                  <button

                    onClick={()=>

                      changeStatus(
                        post.id,
                        "approved"
                      )

                    }

                    className="
                    rounded-xl
                    bg-green-500/20
                    px-4
                    py-2
                    text-green-300
                    "

                  >

                    ✅ Approve

                  </button>





                  <button

                    onClick={()=>

                      changeStatus(
                        post.id,
                        "published"
                      )

                    }

                    className="
                    rounded-xl
                    bg-cyan-500/20
                    px-4
                    py-2
                    text-cyan-300
                    "

                  >

                    🚀 Mark Published

                  </button>





                  <button

                    onClick={()=>

                      removePost(
                        post.id
                      )

                    }

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




              </div>


            ))

          }


          </div>

        )

      }




    </div>

  );

}