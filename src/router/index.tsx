import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import AdminLayout from "../components/admin/AdminLayout";
import ProtectedRoute from "../components/admin/ProtectedRoute";

import SocialQueue from "../pages/admin/SocialQueue";
import CommunitySignups from "../pages/admin/CommunitySignups";
import AIContentStudio from "../pages/admin/AIContentStudio";

import Home from "../pages/Home";
import GamesPage from "../pages/Games";
import GameDetails from "../pages/GameDetails";
import Streams from "../pages/Streams";
import Store from "../pages/Store";
import Merchandise from "../pages/Merchandise";
import MerchandiseDetail from "../pages/MerchandiseDetail";
import MerchandiseSuccess from "../pages/MerchandiseSuccess";
import Community from "../pages/Community";
import News from "../pages/News";
import NewsArticle from "../pages/NewsArticle";
import Feedback from "../pages/Feedback";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Partners from "../pages/Partners";
import NotFound from "../pages/NotFound";

import Dashboard from "../pages/admin/Dashboard";
import Analytics from "../pages/admin/Analytics";
import AdminGames from "../pages/admin/Games";
import Videos from "../pages/admin/Videos";
import Products from "../pages/admin/Products";
import MerchandiseAdmin from "../pages/admin/Merchandise";
import NewsAdmin from "../pages/admin/News";
import Monetization from "../pages/admin/Monetization";
import Settings from "../pages/admin/Settings";
import Login from "../pages/admin/Login";
import Partnerships from "../pages/admin/Partnerships";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "games", element: <GamesPage /> },
      { path: "games/:id", element: <GameDetails /> },
      { path: "streams", element: <Streams /> },
      { path: "store", element: <Store /> },
      { path: "merchandise", element: <Merchandise /> },
      { path: "merchandise/success", element: <MerchandiseSuccess /> },
      { path: "merchandise/:id", element: <MerchandiseDetail /> },
      { path: "community", element: <Community /> },
      { path: "news", element: <News /> },
      { path: "news/:slug", element: <NewsArticle /> },
      { path: "feedback", element: <Feedback /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "partners", element: <Partners /> },
    ],
  },

  {
    path: "/admin/login",
    element: <Login />,
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "analytics", element: <Analytics /> },
      { path: "games", element: <AdminGames /> },
      { path: "videos", element: <Videos /> },
      { path: "products", element: <Products /> },
      { path: "merchandise", element: <MerchandiseAdmin /> },
      { path: "news", element: <NewsAdmin /> },
      { path: "social-queue", element: <SocialQueue /> },
      { path: "community-signups", element: <CommunitySignups /> },
      { path: "partnerships", element: <Partnerships /> },
      { path: "ai-content", element: <AIContentStudio /> },
      { path: "monetization", element: <Monetization /> },
      { path: "settings", element: <Settings /> },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
