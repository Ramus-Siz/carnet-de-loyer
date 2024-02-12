import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login.jsx";
import NewAccount from "./pages/form-new-account.jsx";
import Layout from "./components/layout.jsx";
import Home from "./pages/home.jsx";
import MyHouses from "./pages/houses/my-houses.jsx";
import Messages from "./pages/messages.jsx";
import Settings from "./pages/settings.jsx";
import MyTenants from "./pages/my-tenants.jsx";
import Locations from "./pages/locations.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/new-account",
    element: <NewAccount />,
  },

  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/my-houses",
        element: <MyHouses />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/my-tenants",
        element: <MyTenants />,
      },
      {
        path: "/locations",
        element: <Locations />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
