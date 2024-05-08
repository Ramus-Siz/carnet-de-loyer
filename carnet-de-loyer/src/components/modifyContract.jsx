import { useForm } from "react-hook-form";
import Loader from "./loader";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRentBooklet } from "./contexts/context";

export default function ModifyContract({ isModalOpen, closeModal, id }) {
  console.log(id);
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let tenants = useRentBooklet((state) => state.tenants);

  const updateTenants = useRentBooklet((state) => state.updateTenants);
  let currentUser = useRentBooklet((state) => state.currentUser);
  const updateCurrentUser = useRentBooklet((state) => state.updateCurrentUser);
  const userUrl = `https://tenents-management-api.onrender.com/tenant/bail/${id}`;
  const bailUrl = `https://tenents-management-api.onrender.com/tenant/bail`;

  const onSubmit = async (newBail) => {
    const bailObjetBuild = BuildNewBailObject(newBail);
    handleClickButtonEnregister(bailObjetBuild);
  };

  async function handleClickButtonEnregister(bailObjetBuild) {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        "https://tenents-management-api.onrender.com/tenant/bail/add",
        bailObjetBuild,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      if (response.status === 201) {
        // updateTenants([...tenants, tenantBailObjetBuild]);
        closeModal();
      } else {
        console.log("Error lors de l'ajout, veillez recommencer ");
      }
      console.log(response.data);
    } catch (error) {
      console.log("error serveur", error);
    }
  }

  function BuildNewBailObject(newBail) {
    let keyOftheLasBail = [];
    let keyOfBails;
    // console.log(keyOftheLasTenant.length);
    if (data.length === 0) {
      keyOfBails = 1;
      console.log("keyOfBails: " + keyOfBails);
    } else {
      for (const bail of data) {
        keyOftheLasBail.push(parseInt(bail.id));
      }
      // console.log(keyOftheLasTenant);
      keyOfBails = Math.max(...keyOftheLasBail) + 1;
    }
    const getcurrentUser = sessionStorage.getItem("currentUser");
    const user = JSON.parse(getcurrentUser);
    let finishDate = new Date(newBail.finish); // Convertit la valeur en objet Date
    let formattedFinish = finishDate.toISOString();
    const newBailObject = {
      id: +`${keyOfBails}`,
      finish: formattedFinish,
      residentId: id,
      myPropertyId: newBail.propretyId,
    };
    return newBailObject;
  }
  const getMyHouses = sessionStorage.getItem("myHouses");
  const myHouses = JSON.parse(getMyHouses);

  const getBailstData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(bailUrl, {
        headers: {
          authorization: token,
        },
      });

      setData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };
  useEffect(() => {
    getBailstData();
  }, [id, updateCurrentUser]);

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Modifier le Contrat</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block mb-2">Date de fin:</label>
                <input
                  type="datetime-local"
                  name="finish"
                  {...register("finish")}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Maison:</label>
                <select
                  name="propretyId"
                  {...register("propretyId", { required: "Obligatoire" })}
                  className="border p-2 rounded w-full"
                >
                  {/* Générer les options de sélection à partir de `residents` */}
                  {myHouses.map((proprety, index) => (
                    <option key={index} value={proprety.adress}>
                      {proprety.adress}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-fuchsia-700 text-white p-2 rounded"
                >
                  Soumettre
                </button>
                <button type="button" onClick={closeModal} className="ml-2 p-2">
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
