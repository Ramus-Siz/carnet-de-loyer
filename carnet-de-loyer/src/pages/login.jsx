import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Signin from "../components/signin";
import Signup from "../components/signup";
import MoreInfosOfLandLord from "./more-infos-landlord";
import LoginTenants from "./login-tenants";
import axios from "axios";
import { useRentBooklet } from "../components/contexts/context";
import { headers } from "next/headers";

export default function Login({}) {
  const [isTenant, setIsTenant] = useState(false);
  const [isNeedToCreate, setIsNeedToCreate] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const updateTenants = useRentBooklet((state) => state.updateTenants);
  const updateHouses = useRentBooklet((state) => state.updateHouses);
  const updateCurrentUser = useRentBooklet((state) => state.updateCurrentUser);

  const onSubmit = async (data) => {
    try {
      // Envoyer les données à l'API
      const response = await axios.post(
        "http://localhost:3000/auth/signin",
        data,
        {
          withCredentials: true,
        }
      );

      // Vérifier la réponse de l'API
      if (response.status === 200) {
        // Si l'authentification est réussie, naviguer vers la page d'accueil
        updateTenants(response.data.lessor.tenants);
        updateHouses(response.data.lessor.houses);
        updateCurrentUser(response.data.user);
        sessionStorage.setItem(
          "currentUser",
          JSON.stringify(response.data.user)
        );
        sessionStorage.setItem("token", response.data.token);
        navigate("/home");
      } else {
        // Gérer les erreurs d'authentification
        console.error("Erreur d'authentification:", response.data);
        // Afficher un message d'erreur à l'utilisateur
      }
    } catch (error) {
      // Gérer les erreurs de requête
      console.error("Erreur lors de l'envoi de la requête:", error);
      // Afficher un message d'erreur à l'utilisateur
    }
  };
  const onSubmitTenant = async (data) => {
    try {
      // Envoyer les données à l'API
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        data,
        { withCredentials: true }
      );

      // Vérifier la réponse de l'API
      if (response.status === 200) {
        // Si l'authentification est réussie, naviguer vers la page d'accueil
        navigate("/my-rent-book");
      } else {
        // Gérer les erreurs d'authentification
        console.error("Erreur d'authentification:", response.data);
        // Afficher un message d'erreur à l'utilisateur
      }
    } catch (error) {
      // Gérer les erreurs de requête
      console.error("Erreur lors de l'envoi de la requête:", error);
      // Afficher un message d'erreur à l'utilisateur
    }
  };
  const onRegister = async (data) => {
    try {
      // Envoyer les données à l'API
      const response = await axios.post(
        "http://localhost:3000/auth/signup/ghjhjhgkjGYB5KJSH85DHJNDHkDHYE65DFHJBD",
        data,
        { withCredentials: true }
      );

      // Vérifier la réponse de l'API
      if (response.status === 201) {
        setIsRegister(true);
      } else {
        console.error("Erreur lors de la création:", response.data);
        // Afficher un message d'erreur à l'utilisateur
      }
    } catch (error) {
      // Gérer les erreurs de requête
      console.error("Erreur lors de l'envoi de la requête:", error);
      // Afficher un message d'erreur à l'utilisateur
    }
  };

  const onRegisterMoreInfos = async (data) => {
    try {
      // Envoyer les données à l'API
      const response = await axios.post(
        "http://localhost:3000/landlords/add",
        data,
        { withCredentials: true }
      );

      // Vérifier la réponse de l'API
      if (response.status === 200) {
        // Si l'authentification est réussie, naviguer vers la page d'accueil
        navigate("/");
      } else {
        // Gérer les erreurs d'authentification
        console.error("Erreur lors de l'ajout de vos infos:", response.data);
        // Afficher un message d'erreur à l'utilisateur
      }
    } catch (error) {
      // Gérer les erreurs de requête
      console.error("Erreur lors de l'envoi de la requête:", error);
      // Afficher un message d'erreur à l'utilisateur
    }
  };

  function loginTenants() {
    setIsTenant(true);
  }

  return (
    <div className=" flex text-black w-screen  items-center">
      <div className=" flex justify-end items-center h-screen w-[50%]   bg-[url('./assets/19198828.jpg')] bg-contain bg-center bg-no-repeat"></div>
      <div className=" flex h-screen w-[50%] justify-center items-center bg-[#f4f4f4]  ">
        <div className="flex flex-col justify-center items-center  w-[100%] p-2 gap-6 ">
          {!isRegister ? (
            <>
              {!isNeedToCreate ? (
                <>
                  {!isTenant ? (
                    <Signin onSubmit={onSubmit} loginTenants={loginTenants} />
                  ) : (
                    <LoginTenants onSubmitTenant={onSubmitTenant} />
                  )}
                </>
              ) : (
                <Signup onRegister={onRegister} />
              )}

              <button
                onClick={() => setIsNeedToCreate(true)}
                className="text-xs pt-1"
              >
                Vous n'avez pas de compte?
                <span className="text-orange-600 font-semibold">Créer</span>
              </button>
            </>
          ) : (
            <MoreInfosOfLandLord onRegisterMoreInfos={onRegisterMoreInfos} />
          )}
        </div>
      </div>
    </div>
  );
}
