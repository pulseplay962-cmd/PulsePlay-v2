import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import AdminLayout from "../components/admin/AdminLayout";
import ProtectedRoute from "../components/admin/ProtectedRoute";


// =========================
// Admin Components
// =========================

import SocialQueue from "../pages/admin/SocialQueue";
import CommunitySignups from "../pages/admin/CommunitySignups";


// =========================
// AI Admin Page
// =========================

import AIContentStudio from "../pages/admin/AIContentStudio";



// =========================
// Public Pages
// =========================

import Home from "../pages/Home";
import GamesPage from "../pages/Games";
import GameDetails from "../pages/GameDetails";
import Streams from "../pages/Streams";
import Store from "../pages/Store";
import Merchandise from "../pages/Merchandise";
import MerchandiseDetail from "../pages/MerchandiseDetail";
import Community from "../pages/Community";
import News from "../pages/News";
import NewsArticle from "../pages/NewsArticle";
import Feedback from "../pages/Feedback";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";



// =========================
// Admin Pages
// =========================

import Dashboard from "../pages/admin/Dashboard";
import AdminGames from "../pages/admin/Games";
import Videos from "../pages/admin/Videos";
import Products from "../pages/admin/Products";
import MerchandiseAdmin from "../pages/admin/Merchandise";
import NewsAdmin from "../pages/admin/News";
import Settings from "../pages/admin/Settings";
import Login from "../pages/admin/Login";





const router = createBrowserRouter([



  // =========================
  // PUBLIC WEBSITE
  // =========================

  {
    path:"/",

    element:<MainLayout />,


    children:[


      {
        index:true,

        element:<Home />

      },


      {
        path:"games",

        element:<GamesPage />

      },


      {
        path:"games/:slug",

        element:<GameDetails />

      },


      {
        path:"streams",

        element:<Streams />

      },


      {
        path:"store",

        element:<Store />

      },


      {
        path:"merchandise",

        element:<Merchandise />

      },


      {
        path:"merchandise/:id",

        element:<MerchandiseDetail />

      },


      {
        path:"community",

        element:<Community />

      },


      {
        path:"news",

        element:<News />

      },


      {
        path:"news/:slug",

        element:<NewsArticle />

      },


      {
        path:"feedback",

        element:<Feedback />

      },


      {
        path:"about",

        element:<About />

      },


      {
        path:"contact",

        element:<Contact />

      },


    ],

  },








  // =========================
  // ADMIN LOGIN
  // =========================

  {
    path:"/admin/login",

    element:<Login />

  },








  // =========================
  // ADMIN PANEL
  // =========================

  {
    path:"/admin",

    element:(

      <ProtectedRoute>

        <AdminLayout />

      </ProtectedRoute>

    ),


    children:[



      {
        index:true,

        element:<Dashboard />

      },



      {
        path:"games",

        element:<AdminGames />

      },



      {
        path:"videos",

        element:<Videos />

      },



      {
        path:"products",

        element:<Products />

      },



      {
        path:"merchandise",

        element:<MerchandiseAdmin />

      },



      {
        path:"news",

        element:<NewsAdmin />

      },



      {
        path:"social-queue",

        element:<SocialQueue />

      },



      {
        path:"community-signups",

        element:<CommunitySignups />

      },



      // =========================
      // 🤖 AI CONTENT MANAGER
      // =========================


      {
        path:"ai-content",

        element:<AIContentStudio />

      },



      {
        path:"settings",

        element:<Settings />

      },


    ],

  },








  // =========================
  // 404
  // =========================

  {
    path:"*",

    element:<NotFound />

  }


]);



export default router;