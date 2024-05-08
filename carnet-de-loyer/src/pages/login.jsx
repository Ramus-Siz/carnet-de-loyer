import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Signin from "../components/signin";
import Signup from "../components/signup";
import MoreInfosOfLandLord from "./more-infos-landlord";
import LoginTenants from "./login-tenants";
import axios from "axios";
import { useRentBooklet } from "../components/contexts/context";

export default function Login({}) {
  const [isTenant, setIsTenant] = useState(false);
  const [isNeedToCreate, setIsNeedToCreate] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const updateTenants = useRentBooklet((state) => state.updateTenants);
  const updateHouses = useRentBooklet((state) => state.updateHouses);
  const updateCurrentUser = useRentBooklet((state) => state.updateCurrentUser);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Envoyer les données à l'API
      const response = await axios.post(
        "https://tenents-management-api.onrender.com/auth/signin",
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
        sessionStorage.setItem(
          "mytenants",
          JSON.stringify(response.data.lessor.tenants)
        );
        sessionStorage.setItem(
          "myHouses",
          JSON.stringify(response.data.lessor.houses)
        );

        sessionStorage.setItem("token", response.data.token);
        setData(response.data);
        navigate("/home");
        setLoading(false);
      } else {
        // Gérer les erreurs d'authentification
        console.error("Erreur d'authentification:", response.data);
        // Afficher un message d'erreur à l'utilisateur
      }
    } catch (error) {
      // Gérer les erreurs de requête
      console.error("Erreur lors de l'envoi de la requête:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const onSubmitTenant = async (data) => {
    try {
      // Envoyer les données à l'API
      const response = await axios.post(
        "https://tenents-management-api.onrender.com/auth/login",
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
        "https://tenents-management-api.onrender.com/auth/signup/ghjhjhgkjGYB5KJSH85DHJNDHkDHYE65DFHJBD",
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
        "https://tenents-management-api.onrender.com/landlords/add",
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
      <div className="h-screen w-[50%]   bg-[url('./assets/19198828.jpg')] bg-contain bg-center bg-no-repeat">
        {/* <button className="">Retournez vers la page login</button> */}
      </div>
      <div className=" flex h-screen w-[50%] justify-center items-center bg-[#f4f4f4]  ">
        <div className="flex flex-col justify-center items-center  w-[100%] p-2 gap-6 ">
          {!isRegister ? (
            <>
              {!isNeedToCreate ? (
                <>
                  {!isTenant ? (
                    <Signin
                      onSubmit={onSubmit}
                      loginTenants={loginTenants}
                      loading={loading}
                      error={error}
                      data={data}
                    />
                  ) : (
                    <LoginTenants onSubmitTenant={onSubmitTenant} />
                  )}
                </>
              ) : (
                <Signup onRegister={onRegister} />
              )}

              <div className="text-xs pt-1">
                Vous n'avez pas de compte?
                <span
                  className="text-orange-600 font-semibold"
                  onClick={() => setIsNeedToCreate(true)}
                >
                  Créer,
                </span>
                <span className="text-orange-600 font-semibold"></span>
              </div>
            </>
          ) : (
            <MoreInfosOfLandLord onRegisterMoreInfos={onRegisterMoreInfos} />
          )}
        </div>
      </div>
    </div>
  );
}
