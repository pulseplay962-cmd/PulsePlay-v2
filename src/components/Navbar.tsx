import { Link } from "react-router-dom";


export default function Navbar() {

  return (

    <nav className="
      flex
      items-center
      justify-between
      bg-[#0b1120]
      px-6
      py-4
      border-b
      border-cyan-500/20
    ">


      {/* Logo */}

      <Link
        to="/"
        className="
          text-2xl
          font-black
          text-cyan-400
          hover:text-cyan-300
        "
      >
        PulsePlay
      </Link>




      {/* Navigation */}

      <div className="
        flex
        items-center
        gap-6
        font-bold
        text-white
      ">


        <Link
          to="/"
          className="hover:text-cyan-400"
        >
          Home
        </Link>



        <Link
          to="/games"
          className="hover:text-cyan-400"
        >
          🎮 Games
        </Link>



        <Link
          to="/streams"
          className="hover:text-cyan-400"
        >
          📺 Streams
        </Link>



        <Link
          to="/news"
          className="hover:text-cyan-400"
        >
          📰 News
        </Link>




        <Link
          to="/store"
          className="hover:text-cyan-400"
        >
          🖥 Store
        </Link>




        <Link
          to="/merchandise"
          className="hover:text-cyan-400"
        >
          👕 Merchandise
        </Link>




        <Link
          to="/community"
          className="hover:text-cyan-400"
        >
          🌐 Community
        </Link>




        <a
          href="https://throne.com/veiltactician"
          target="_blank"
          rel="noopener noreferrer"
          className="
            rounded-lg
            bg-purple-500
            px-4
            py-2
            text-white
            hover:bg-purple-400
            transition
          "
        >
          🎁 Support
        </a>



      </div>


    </nav>

  );

}