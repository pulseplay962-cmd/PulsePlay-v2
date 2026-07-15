import { useEffect, useState } from "react";

import {
  addVideo,
  getVideos,
  updateVideo,
  deleteVideo,
} from "../../services/videos";

import { uploadImage } from "../../services/storage";


type Video = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  featured: boolean;
};



export default function Videos() {

  const [videos, setVideos] = useState<Video[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [featured, setFeatured] = useState(false);



  async function loadVideos() {

    try {

      const data = await getVideos();

      setVideos(data || []);

    } catch (error) {

      console.error(
        "Failed to load videos:",
        error
      );

    }

  }



  useEffect(() => {

    loadVideos();

  }, []);






  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setSaving(true);



    try {


      let thumbnailUrl = thumbnail;



      if (thumbnailFile) {

        thumbnailUrl = await uploadImage(
          thumbnailFile,
          "videos"
        );

      }



      const video = {

        title,

        description,

        thumbnail: thumbnailUrl,

        url,

        featured,

      };





      if (editingId) {


        await updateVideo(
          editingId,
          video
        );


      } else {


        await addVideo(video);


      }



      clearForm();

      await loadVideos();



    } catch (error) {


      console.error(
        "Save video error:",
        error
      );


      alert(
        "Failed to save video"
      );


    } finally {


      setSaving(false);


    }

  }






  function editVideo(video: Video) {


    setEditingId(video.id);

    setTitle(video.title || "");

    setDescription(
      video.description || ""
    );

    setThumbnail(
      video.thumbnail || ""
    );

    setUrl(
      video.url || ""
    );

    setFeatured(
      video.featured || false
    );

    setThumbnailFile(null);



    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });


  }







  async function handleDelete(
    id: string
  ) {


    const confirmed =
      window.confirm(
        "Delete this video?"
      );


    if (!confirmed) return;



    try {


      await deleteVideo(id);

      await loadVideos();



    } catch(error) {


      console.error(error);

      alert(
        "Failed to delete video"
      );


    }


  }







  function clearForm() {


    setEditingId(null);

    setTitle("");

    setDescription("");

    setThumbnail("");

    setThumbnailFile(null);

    setUrl("");

    setFeatured(false);


  }







  return (

    <div>


      <h1 className="text-4xl font-black">
        Manage Videos
      </h1>





      <form

        onSubmit={handleSubmit}

        className="mt-8 max-w-xl space-y-4 rounded-xl bg-[#111827] p-6"

      >


        <h2 className="text-xl font-bold">

          {editingId
            ? "Edit Video"
            : "Add Video"}

        </h2>





        <input

          className="w-full rounded bg-[#1f2937] p-3"

          placeholder="Video title"

          value={title}

          onChange={(e)=>
            setTitle(e.target.value)
          }

        />





        <textarea

          className="w-full rounded bg-[#1f2937] p-3"

          placeholder="Description"

          value={description}

          onChange={(e)=>
            setDescription(e.target.value)
          }

        />





        <input

          type="file"

          accept="image/*"

          className="w-full rounded bg-[#1f2937] p-3"

          onChange={(e)=>{

            setThumbnailFile(
              e.target.files?.[0] || null
            );

          }}

        />





        {thumbnail && (

          <img

            src={thumbnail}

            alt="Preview"

            className="h-40 w-full rounded object-cover"

          />

        )}






        <input

          className="w-full rounded bg-[#1f2937] p-3"

          placeholder="Video URL"

          value={url}

          onChange={(e)=>
            setUrl(e.target.value)
          }

        />






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


          Featured Video


        </label>






        <button

          type="submit"

          disabled={saving}

          className="rounded-lg bg-cyan-500 px-6 py-3 font-bold text-black disabled:opacity-50"

        >

          {saving
            ? "Uploading..."
            : editingId
            ? "Update Video"
            : "Add Video"}

        </button>




      </form>






      <div className="mt-10 space-y-4">


        {videos.map((video)=>(


          <div

            key={video.id}

            className="rounded-xl bg-[#111827] p-5"

          >



            {video.thumbnail && (

              <img

                src={video.thumbnail}

                alt={video.title}

                className="mb-4 h-40 w-full rounded object-cover"

              />

            )}






            <h2 className="text-2xl font-bold">

              {video.title}

            </h2>





            <p className="text-gray-400">

              {video.description}

            </p>






            {video.featured && (

              <p className="mt-2 text-yellow-400">

                ⭐ Featured Video

              </p>

            )}






            <div className="mt-4 flex gap-3">


              <button

                onClick={() =>
                  editVideo(video)
                }

                className="rounded bg-blue-600 px-4 py-2 font-bold"

              >

                Edit

              </button>





              <button

                onClick={() =>
                  handleDelete(video.id)
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