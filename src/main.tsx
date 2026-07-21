import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./router";
import "./index.css";


const rootElement = document.getElementById("root");


if (!rootElement) {
  throw new Error("PulsePlay root element was not found.");
}


ReactDOM.createRoot(rootElement).render(

  <React.StrictMode>

    <RouterProvider router={router} />

  </React.StrictMode>

);