import { useForm } from "react-hook-form";
import Loader from "./loader";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRentBooklet } from "./contexts/context";

export default function Paiement({
  isModalPayementOpen,
  closePayementModal,
  id,
}) {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let tenants = useRentBooklet((state) => state.tenants);
  console.log(tenants);
  console.log(tenants.bails);

  const updateTenants = useRentBooklet((state) => state.updateTenants);
  let currentUser = useRentBooklet((state) => state.currentUser);
  const updateCurrentUser = useRentBooklet((state) => state.updateCurrentUser);
  const userUrl = `http://localhost:3000/my-tenants/lessor/${currentUser.lessorId}`;

  const onSubmit = async (newPayement) => {
    const payementObjetBuild = BuildNewPayementObject(newPayement);
    handleClickButtonEnregister(payementObjetBuild);

    // Traitez les données soumises ici
  };

  async function handleClickButtonEnregister(payementObjetBuild) {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/tenant/payement/add",
        payementObjetBuild,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
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

  function BuildNewPayementObject(newPayement) {
    let keyOftheLastPayement = [];
    let keyOfpayement;
    // console.log(keyOftheLasTenant.length);
    if (tenants.payement.length === 0) {
      keyOfpayement = 1;
      console.log(keyOfpayement);
    } else {
      for (const payement of tenants.payement) {
        keyOftheLastPayement.push(parseInt(payement.id));
      }
      // console.log(keyOftheLasTenant);
      keyOfpayement = Math.max(...keyOftheLastPayement) + 1;
    }
    const getcurrentUser = sessionStorage.getItem("currentUser");
    const user = JSON.parse(getcurrentUser);
    console.log(user.lessorId);

    const newPayementsObject = {
      id: +`${keyOfpayement}`,
      month: newPayement.month,
      year: newPayement.year,
      amount: newPayement.amount,
      residentId: newPayement.residentId,
      bailId: newPayement.bailId,
    };

    return newPayementsObject;
  }
  const getMyHouses = sessionStorage.getItem("myHouses");
  const myHouses = JSON.parse(getMyHouses);

  const getTenantData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(userUrl, {
        headers: {
          authorization: token,
        },
      });

      updateTenants(response.data);
      console.log("tenants: ", tenants);
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
  }, [currentUser.lessorId, updateCurrentUser]);

  return (
    <>
      {isModalPayementOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Ajouter un Paiement</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Champ `month` et `year` sur une même ligne */}
              <div className="mb-4 flex space-x-4">
                <div>
                  <label className="block mb-2">Mois:</label>
                  <input
                    type="text"
                    name="month"
                    {...register("month")}
                    className="border p-2 rounded w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2">Année:</label>
                  <input
                    type="text"
                    name="year"
                    {...register("year")}
                    className="border p-2 rounded w-full"
                    placeholder="YYYY"
                    required
                  />
                </div>
              </div>

              {/* Champ `amount` */}
              <div className="mb-4">
                <label className="block mb-2">Montant:</label>
                <input
                  type="number"
                  name="amount"
                  {...register("amount")}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>

              {/* Boutons de soumission et d'annulation */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-fuchsia-700 text-white p-2 rounded"
                >
                  Soumettre
                </button>
                <button
                  type="button"
                  onClick={closePayementModal}
                  className="ml-2 p-2"
                >
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
