import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import Home from "../pages/Home";
import Streams from "../pages/Streams";
import Store from "../pages/Store";
import Community from "../pages/Community";
import About from "../pages/About";
import Contact from "../pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "streams", element: <Streams /> },
      { path: "store", element: <Store /> },
      { path: "community", element: <Community /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);

export default router;