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
  release_date?: string;
};



export default function Games() {

  const [games, setGames] = useState<Game[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | "upcoming" | "released">("all");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [featured, setFeatured] = useState(false);
  const [releaseDate, setReleaseDate] = useState("");



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

        release_date: releaseDate || null,

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

      setReleaseDate(
        (game as any).release_date || ""
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

    setReleaseDate("");


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

        <input
          type="date"
          className="w-full rounded bg-[#1f2937] p-3"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          placeholder="Release date"
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



        {!loading && games.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { label: "All", value: "all" },
              { label: "Coming Soon", value: "upcoming" },
              { label: "Released", value: "released" },
            ].map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setStatusFilter(filter.value as typeof statusFilter)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  statusFilter === filter.value
                    ? "bg-cyan-500 text-black"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        )}


        {games
          .filter((game) => {
            if (statusFilter === "all") return true;
            const date = game.release_date ? new Date(game.release_date) : null;
            const now = new Date();
            const isUpcoming = date ? date > now : false;
            return statusFilter === "upcoming" ? isUpcoming : !isUpcoming;
          })
          .map((game)=>(


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







            <div className="mt-2 flex flex-wrap gap-3 items-center text-sm">
              {game.featured && (
                <span className="rounded-full bg-yellow-500/20 px-3 py-1 font-bold text-yellow-300">
                  ⭐ Featured
                </span>
              )}

              {game.release_date && (
                <span className={`rounded-full px-3 py-1 font-bold ${
                  new Date(game.release_date) > new Date()
                    ? "bg-blue-500/20 text-blue-200"
                    : "bg-green-500/20 text-green-200"
                }`}>
                  {new Date(game.release_date) > new Date()
                    ? "Coming Soon"
                    : "Released"}
                </span>
              )}
            </div>






            {game.release_date && (
              <p className="mt-4 text-sm text-slate-400">
                Release date: {new Date(game.release_date).toLocaleDateString()}
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