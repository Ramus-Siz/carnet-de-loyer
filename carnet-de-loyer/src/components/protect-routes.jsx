import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token"); // Remplacez 'authToken' par le nom de votre clé de stockage.

  if (!token) {
    // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
    return <Navigate to="/" replace />;
  }

  // Rendre le composant enfant si l'utilisateur est authentifié
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
