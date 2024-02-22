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
import HousesPreview from "./components/preview/houses-preview.jsx";
import Houses from "./components/houses.jsx";
import Tenants from "./components/tenants.jsx";
import TenantPreview from "./components/preview/tenants-preview.jsx";
import SinglePreviewHouses from "./components/single/single-houses.jsx";

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
        element: <Houses />,
        children: [
          {
            path: "",
            element: <MyHouses />,
          },
          {
            path: ":id",
            element: <SinglePreviewHouses />,
          },
        ],
      },
      // {
      //   path: "/my-houses/:id",
      //   element: <HousesPreview />,
      //   Houses,
      // },
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
        element: <Tenants />,
        children: [
          {
            path: "",
            element: <MyTenants />,
          },
          {
            path: ":id",
            element: <TenantPreview />,
          },
        ],
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
