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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let tenants = useRentBooklet((state) => state.tenants);
  console.log(tenants);

  const updateTenants = useRentBooklet((state) => state.updateTenants);
  let currentUser = useRentBooklet((state) => state.currentUser);
  const updateCurrentUser = useRentBooklet((state) => state.updateCurrentUser);
  const payementURL = `https://tenents-management-api.onrender.com/tenant/payement`;

  const onSubmit = async (newPayement) => {
    const payementObjetBuild = BuildNewPayementObject(newPayement);
    handleClickButtonEnregister(payementObjetBuild);

    // Traitez les données soumises ici
  };

  async function handleClickButtonEnregister(payementObjetBuild) {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        "https://tenents-management-api.onrender.com/tenant/payement/add",
        payementObjetBuild,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      if (response.status === 201) {
        // updateTenants([...tenants, tenantBailObjetBuild]);

        closePayementModal();
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
    if (data.length === 0) {
      keyOfpayement = 1;
      console.log(keyOfpayement);
    } else {
      for (const payement of data) {
        keyOftheLastPayement.push(parseInt(payement.id));
      }
      // console.log(keyOftheLasTenant);
      keyOfpayement = Math.max(...keyOftheLastPayement) + 1;
    }
    const getcurrentUser = sessionStorage.getItem("currentUser");
    const user = JSON.parse(getcurrentUser);

    const newPayementsObject = {
      id: +`${keyOfpayement}`,
      month: newPayement.month,
      year: newPayement.year,
      amount: newPayement.amount,
      residentId: id,
    };

    return newPayementsObject;
  }
  const getMyHouses = sessionStorage.getItem("myHouses");
  const myHouses = JSON.parse(getMyHouses);

  const getPaiementtData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(payementURL, {
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
    getPaiementtData();
  }, [updateCurrentUser]);

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
                  <label className="block mb-2" htmlFor="month">
                    Mois:
                  </label>
                  <select
                    name="month"
                    id="month"
                    {...register("month", { required: "Obligatoire" })}
                    className="border p-2 rounded w-full"
                  >
                    <option value="" disabled>
                      Sélectionnez un mois
                    </option>
                    <option value="01">Janvier</option>
                    <option value="02">Février</option>
                    <option value="03">Mars</option>
                    <option value="04">Avril</option>
                    <option value="05">Mai</option>
                    <option value="06">Juin</option>
                    <option value="07">Juillet</option>
                    <option value="08">Août</option>
                    <option value="09">Septembre</option>
                    <option value="10">Octobre</option>
                    <option value="11">Novembre</option>
                    <option value="12">Décembre</option>
                  </select>
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
                  placeholder="Dollars($)"
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
