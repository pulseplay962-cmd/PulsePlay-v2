import { useEffect, useState } from "react";

import {
  addGame,
  getGames,
  updateGame,
  deleteGame,
} from "../../services/games";

import { uploadImage } from "../../services/storage";


type Game = {
  id: string;
  title: string;
  description: string;
  image: string;
  featured: boolean;
};



export default function Games() {

  const [games, setGames] = useState<Game[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [featured, setFeatured] = useState(false);



  async function loadGames() {

    try {

      setLoading(true);

      const data = await getGames();

      setGames(data || []);


    } catch (error) {

      console.error(
        "Failed to load games:",
        error
      );

      alert("Failed to load games.");


    } finally {

      setLoading(false);

    }

  }



  useEffect(() => {

    loadGames();

  }, []);






  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();


    if (!title.trim()) {

      alert(
        "Game title is required."
      );

      return;

    }



    setSaving(true);



    try {


      let imageUrl = image;



      if (imageFile) {

        imageUrl = await uploadImage(
          imageFile,
          "games"
        );

      }




      const game = {

        title,

        description,

        image: imageUrl,

        featured,

      };





      if (editingId) {


        await updateGame(
          editingId,
          game
        );


      } else {


        await addGame(game);


      }




      clearForm();

      await loadGames();




    } catch (error) {


      console.error(
        "Save game error:",
        error
      );


      alert(
        "Failed to save game."
      );



    } finally {


      setSaving(false);


    }


  }







  function editGame(game: Game) {


    setEditingId(game.id);

    setTitle(game.title || "");

    setDescription(
      game.description || ""
    );

    setImage(
      game.image || ""
    );

    setFeatured(
      game.featured || false
    );


    setImageFile(null);



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
        "Delete this game?"
      );



    if (!confirmed) return;




    try {


      await deleteGame(id);


      await loadGames();




    } catch (error) {


      console.error(
        "Delete game error:",
        error
      );


      alert(
        "Failed to delete game."
      );


    }


  }







  function clearForm() {


    setEditingId(null);

    setTitle("");

    setDescription("");

    setImage("");

    setImageFile(null);

    setFeatured(false);


  }







  return (

    <div>


      <h1 className="text-4xl font-black">
        Manage Games
      </h1>





      <form

        onSubmit={handleSubmit}

        className="mt-8 max-w-xl space-y-4 rounded-xl bg-[#111827] p-6"

      >


        <h2 className="text-xl font-bold">

          {editingId
            ? "Edit Game"
            : "Add Game"}

        </h2>





        <input

          className="w-full rounded bg-[#1f2937] p-3"

          placeholder="Game title"

          value={title}

          onChange={(e)=>
            setTitle(e.target.value)
          }

        />





        <textarea

          className="w-full rounded bg-[#1f2937] p-3"

          placeholder="Game description"

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

            const file =
              e.target.files?.[0] || null;

            setImageFile(file);

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


          Featured Game


        </label>






        <div className="flex gap-3">



          <button

            type="submit"

            disabled={saving}

            className="rounded-lg bg-cyan-500 px-6 py-3 font-bold text-black disabled:opacity-50"

          >

            {saving
              ? "Uploading..."
              : editingId
              ? "Update Game"
              : "Add Game"}

          </button>





          {editingId && (

            <button

              type="button"

              onClick={clearForm}

              className="rounded-lg bg-gray-700 px-6 py-3 font-bold"

            >

              Cancel

            </button>

          )}



        </div>



      </form>







      <div className="mt-10 space-y-4">



        {loading && (

          <p className="text-gray-400">
            Loading games...
          </p>

        )}






        {games.map((game)=>(


          <div

            key={game.id}

            className="rounded-xl bg-[#111827] p-5"

          >



            {game.image && (

              <img

                src={game.image}

                alt={game.title}

                className="mb-4 h-40 w-full rounded object-cover"

              />

            )}






            <h2 className="text-2xl font-bold">

              {game.title}

            </h2>






            <p className="mt-2 text-gray-400">

              {game.description}

            </p>







            {game.featured && (

              <p className="mt-2 text-yellow-400">

                ⭐ Featured Game

              </p>

            )}






            <div className="mt-4 flex gap-3">



              <button

                onClick={() =>
                  editGame(game)
                }

                className="rounded bg-blue-600 px-4 py-2 font-bold"

              >

                Edit

              </button>





              <button

                onClick={() =>
                  handleDelete(game.id)
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