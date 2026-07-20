import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import AdminLayout from "../components/admin/AdminLayout";
import ProtectedRoute from "../components/admin/ProtectedRoute";

import Home from "../pages/Home";
import GamesPage from "../pages/Games";
import Streams from "../pages/Streams";
import Store from "../pages/Store";
import Community from "../pages/Community";
import News from "../pages/News";
import NewsArticle from "../pages/NewsArticle";
import About from "../pages/About";
import Contact from "../pages/Contact";

import Dashboard from "../pages/admin/Dashboard";
import AdminGames from "../pages/admin/Games";
import Videos from "../pages/admin/Videos";
import Products from "../pages/admin/Products";
import NewsAdmin from "../pages/admin/News";
import Settings from "../pages/admin/Settings";
import Login from "../pages/admin/Login";


const router = createBrowserRouter([

  // Public Website
  {
    path: "/",
    element: <MainLayout />,
    children: [

      {
        index: true,
        element: <Home />,
      },

      {
        path: "games",
        element: <GamesPage />,
      },

      {
        path: "streams",
        element: <Streams />,
      },

      {
        path: "store",
        element: <Store />,
      },

      {
        path: "community",
        element: <Community />,
      },

      {
        path: "news",
        element: <News />,
      },

      {
        path: "news/:slug",
        element: <NewsArticle />,
      },

      {
        path: "about",
        element: <About />,
      },

      {
        path: "contact",
        element: <Contact />,
      },

    ],
  },


  // Admin Login
  {
    path: "/admin/login",
    element: <Login />,
  },


  // Protected Admin Area
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),

    children: [

      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: "games",
        element: <AdminGames />,
      },

      {
        path: "videos",
        element: <Videos />,
      },

      {
        path: "products",
        element: <Products />,
      },

      {
        path: "news",
        element: <NewsAdmin />,
      },

      {
        path: "settings",
        element: <Settings />,
      },

    ],
  },


  // Fallback
  {
    path: "*",
    element: <Home />,
  },

]);


export default router;