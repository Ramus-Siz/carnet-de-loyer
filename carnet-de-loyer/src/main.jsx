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
import SinglePreviewTenants from "./components/single/single-tenant.jsx";
import MyAgreement from "./pages/tenantsPages/my-agreement.jsx";
import MyRentBook from "./pages/tenantsPages/my-rent-booklet.jsx";
import Notifications from "./pages/tenantsPages/notifications.jsx";
import TenantsLayout from "./components/tenantsDashboard/tenantsLayout.jsx";
import MoreInfosOfLandLord from "./pages/more-infos-landlord.jsx";
import ProtectedRoute from "./components/protect-routes.jsx";

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
    path: "/signup/more-infos",
    element: <MoreInfosOfLandLord />,
  },

  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-houses",
        element: (
          <ProtectedRoute>
            <Houses />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: (
              <ProtectedRoute>
                <MyHouses />
              </ProtectedRoute>
            ),
          },
          {
            path: ":id",
            element: (
              <ProtectedRoute>
                <SinglePreviewHouses />
              </ProtectedRoute>
            ),
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
        element: (
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        ),
      },

      {
        path: "/settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-tenants",
        element: <Tenants />,
        children: [
          {
            path: "",
            element: (
              <ProtectedRoute>
                <MyTenants />
              </ProtectedRoute>
            ),
          },
          {
            path: ":id",
            element: (
              <ProtectedRoute>
                <SinglePreviewTenants />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/locations",
        element: (
          <ProtectedRoute>
            <Locations />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <TenantsLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <MyRentBook />
          </ProtectedRoute>
        ),
      },

      // {
      //   path: "/my-houses/:id",
      //   element: <HousesPreview />,
      //   Houses,
      // },
      {
        path: "/my-agreement",
        element: (
          <ProtectedRoute>
            <MyAgreement />
          </ProtectedRoute>
        ),
      },

      {
        path: "/my-rent-book",
        element: (
          <ProtectedRoute>
            <MyRentBook />
          </ProtectedRoute>
        ),
      },
      {
        path: "/notifications",
        element: (
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
