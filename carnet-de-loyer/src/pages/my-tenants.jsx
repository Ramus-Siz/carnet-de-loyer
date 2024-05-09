import Header from "../components/header";
import { useEffect, useState } from "react";
import CheckBox from "../components/checkbox";
import Options from "../components/options";
import { Link } from "react-router-dom";
import { useRentBooklet } from "../components/contexts/context";
import axios from "axios";
import Loader from "../components/loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_API_URL } from "../utils/config";

export default function MyTenants() {
  let tenants = useRentBooklet((state) => state.tenants);
  const updateTenants = useRentBooklet((state) => state.updateTenants);
  let currentUser = useRentBooklet((state) => state.currentUser);
  const updateCurrentUser = useRentBooklet((state) => state.updateCurrentUser);
  const [isTrueToAddData, setIsTrueToAddData] = useState(false);
  const getUserConnected = sessionStorage.getItem("currentUser");
  const userConnected = JSON.parse(getUserConnected);
  // const [currentUser, setCurrentUser] = useState();
  const userUrl = `${BASE_API_URL}/my-tenants/lessor/${userConnected.lessorId}`;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState({
    choises: [],
  });
  const [list, setList] = useState([]);

  const HandleAddData = () => {
    setIsTrueToAddData(!isTrueToAddData);
  };
  const HandleDelete = async () => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer les locataires sélectionnés ?"
    );

    if (confirmDelete) {
      let tenantsAfterDelete = [...tenants];

      if (selectAll) {
        try {
          const token = sessionStorage.getItem("token");
          // Envoyer les données à l'API
          for (const tenant of tenantsAfterDelete) {
            const response = await axios.delete(
              `${BASE_API_URL}/my-tenants/delete/${tenant.id}`,
              {
                headers: {
                  authorization: token,
                },
              }
            );
            if (response.status == 202) {
              toast.success("Locataire supprimé avec succès !", {
                position: "bottom-center",
              });
            }
          }
          tenantsAfterDelete = [];
          setIsCheck({ choises: [] });
          setSelectAll(false);
          updateTenants(tenantsAfterDelete);
        } catch (error) {
          // Gérer les erreurs de requête
          console.error("Erreur lors de la suppression:", error);
          // Afficher un message d'erreur à l'utilisateur
        }
      } else {
        try {
          const token = sessionStorage.getItem("token");

          for (const choiceId of isCheck.choises) {
            // Envoyez une requête DELETE à l'API pour chaque maison sélectionnée
            const response = await axios.delete(
              `${BASE_API_URL}/my-tenants/delete/${choiceId}`,
              {
                headers: {
                  authorization: token,
                },
              }
            );
            if (response.status === 202) {
              tenantsAfterDelete = tenantsAfterDelete.filter(
                (tenant) => tenant.id !== choiceId
              );
            }

            updateTenants(tenantsAfterDelete);
            setIsCheck({ choises: [] });
          }

          // Filtrer `tenants` pour supprimer les tenants sélectionnés
        } catch (error) {
          console.error("Erreur lors de la suppression:", error);
        }
      }
    }
  };

  const handleSelectAll = (e) => {
    setSelectAll(!selectAll);
    setIsCheck({ choises: tenants.map((li) => li.id) });
    if (selectAll) {
      setIsCheck({ choises: [] });
    }
  };

  // const handleClick = (e) => {
  //   const { id, checked } = e.target;
  //   const { choises: reponses } = isCheck;
  //   console.log(id, "is", checked);
  //   if (checked) {
  //     setIsCheck({ choises: [...reponses, id] });
  //   } else {
  //     setIsCheck({ choises: reponses.filter((item) => item !== id) });
  //   }
  // };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    const idInt = parseInt(id, 10); // Convertir l'ID en nombre entier
    const { choises: reponses } = isCheck;

    if (checked) {
      // Ajoutez l'ID à la liste de choix
      setIsCheck({ choises: [...reponses, idInt] });
    } else {
      // Supprimez l'ID de la liste de choix
      setIsCheck({ choises: reponses.filter((item) => item !== idInt) });
    }
  };

  const catalog = tenants.map((item, index) => {
    return (
      <div key={item.id || index}>
        <div className="flex gap-4 p-3 justify-between shadow-xl text-[#b3b5b7]  w-full hover:scale-95 ">
          <div className="flex gap-4">
            <CheckBox
              name={item.name}
              key={item.id || index}
              type="checkbox"
              id={item.id}
              isChecked={isCheck.choises.includes(item.id)}
              handleClick={handleClick}
            />
            {`${item.name} ${item.prenom}`}
          </div>
          <Link to={`/my-tenants/${item.id}`}>
            <span className="justify-self-end pr-2 text-fuchsia-700">
              <ion-icon name="eye-outline"></ion-icon>
            </span>
          </Link>
        </div>
      </div>
    );
  });

  // useEffect(() => {
  //   let currentUser = sessionStorage.getItem("currentUser");
  //   if (!currentUser) {
  //     return;
  //   }
  //   const currentUserParse = JSON.parse(currentUser);
  //   updateCurrentUser(currentUserParse);
  // }, [updateCurrentUser]);
  const getTenantData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(userUrl, {
        headers: {
          authorization: token,
        },
      });

      updateTenants(response.data);
      setData(response.data);
    } catch (error) {
      setError(error);

      console.error("Erreur lors de la récupération des données:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getTenantData();
  }, [userConnected.lessorId]);
  return (
    <>
      <Header />
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Loader />
        </div>
      )}
      {error && (
        <div className=" fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Loader />
        </div>
      )}
      {data && (
        <Options
          selectAll={selectAll}
          handleSelectAll={handleSelectAll}
          HandleDelete={HandleDelete}
          isCheck={isCheck}
          catalog={catalog}
          user="un / une locataire"
          HandleAddData={HandleAddData}
          isTrueToAddData={isTrueToAddData}
        />
      )}
      <ToastContainer />
    </>
  );
}
