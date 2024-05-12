import { useNavigate, useParams } from "react-router-dom";
import { useRentBooklet } from "../contexts/context";
import Header from "../header";
import { delay, motion } from "framer-motion";
import ModifyContract from "../modifyContract";
import { useEffect, useState } from "react";
import Paiement from "../paiement";
import FilterForm from "../filterForm";
import axios from "axios";
import Loader from "../loader";
import { BASE_API_URL } from "../../utils/config";
import UpdateContractPopup from "../updateContract";
import toast, { Toaster } from "react-hot-toast";

export default function SinglePreviewTenants() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteBailOpen, setIsModalDeleteOpen] = useState(false);

  const [isModalPayementOpen, setIsModalPayementOpen] = useState(false);
  const [isUpdateContactModaleOpen, setIsUpdateContactModale] = useState(false);
  const [inOder, setInOder] = useState(null);
  const [tenantData, setTenantData] = useState({});
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(tenantData);
  const updateTenants = useRentBooklet((state) => state.updateTenants);

  const updateHouses = useRentBooklet((state) => state.updateHouses);
  const listTenants = useRentBooklet((state) => state.tenants);
  const { id } = useParams();
  const tenants = listTenants.find((tenant) => tenant.id === +id);
  const tenantURL = `${BASE_API_URL}/my-tenants/${id}`;
  console.log(id);
  console.log(tenantData);
  const navigation = useNavigate();

  let bailId;
  if (tenantData.bails && tenantData.bails.length > 0) {
    bailId = tenantData.bails[0].id;
  }
  const openPayementModal = () => {
    setIsModalPayementOpen(true);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalPayementOpen(false);
  };

  const openUpdateModal = () => {
    setIsUpdateContactModale(true);
  };
  const deleteContractModal = async () => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.delete(`${BASE_API_URL}/tenant/bail/delete/${bailId}`, {
        headers: {
          authorization: token,
        },
      });
      const updatedSessionMyHouses = JSON.parse(
        sessionStorage.getItem("myHouses")
      ).map((house) => {
        // Si la maison contient le bail à supprimer, le retire de la liste des bails
        if (house.bails.some((bail) => bail.id === bailId)) {
          house.bails = house.bails.filter((bail) => bail.id !== bailId);
        }
        return house;
      });
      const updatedSessionMyTenants = JSON.parse(
        sessionStorage.getItem("mytenants")
      ).map((tenant) => {
        // Si tenant contient le bail à supprimer, le retire de la liste des bails
        if (tenant.bails.some((bail) => bail.id === bailId)) {
          tenant.bails = tenant.bails.filter((bail) => bail.id !== bailId);
        }
        return tenant;
      });
      updateHouses(updatedSessionMyHouses);
      updateTenants(updatedSessionMyTenants);
      sessionStorage.setItem(
        "mytenants",
        JSON.stringify(updatedSessionMyTenants)
      );

      // Mettre à jour les données dans le sessionStorage
      sessionStorage.setItem(
        "myHouses",
        JSON.stringify(updatedSessionMyHouses)
      );
      toast.success("Vous avez supprimé un contrat!");

      console.log(
        `La contrat avec l'ID ${bailId} a été supprimée avec succès.`
      );
      navigation(`/my-tenants`);
    } catch (error) {
      console.error("Erreur lors de la suppression de la maison:", error);
    }
  };
  const closePayementModal = () => {
    setIsModalPayementOpen(false);
  };

  const closeUpdateContractModal = () => {
    setIsUpdateContactModale(false);
  };

  const getTenantData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(tenantURL, {
        headers: {
          authorization: token,
        },
      });
      if (response.status === 201) {
        setTenantData(response.data);
        setData(response.data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getTenantData();
  }, []);
  return (
    <>
      <Header />
      {loading && (
        <div className=" fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Loader />
        </div>
      )}
      {error && (
        <div className=" fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Loader />
        </div>
      )}
      {data && (
        <>
          <div className="flex flex-col gap-8 p-4 md:p-8">
            <motion.div
              className="flex md:flex-row flex-col justify-between items-center text-white gap-8 p-5  w-full  rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div className="flex gap-4 w-full">
                {tenantData.bails && tenantData.bails.length > 0 ? (
                  <>
                    <button
                      className="   flex justify-center gap-2 flex items-center md:w-[28%] pl-4 pr-4 md:pr-4 md:pl-4 md:bg-fuchsia-700 bg-orange-600 shadow-inner hover:scale-95 rounded-xl "
                      onClick={deleteContractModal}
                    >
                      <span className="md:text-xl text-2xl">
                        <ion-icon name="trash-outline"></ion-icon>
                      </span>
                      <span className="md:text-white hidden md:block">
                        Suprimer le contrat
                      </span>
                    </button>
                    <button
                      className="  flex justify-center items-center md:w-[28%] pl-4 pr-4  md:pr-4 md:pl-4 bg-fuchsia-700  shadow-inner hover:scale-95 rounded-xl "
                      onClick={openUpdateModal}
                    >
                      <span className="md:text-xl text-2xl">
                        <ion-icon name="create-outline"></ion-icon>
                      </span>
                      <span className="md:text-white hidden md:block">
                        Modifier le contrat
                      </span>
                    </button>
                  </>
                ) : (
                  <button
                    className="  flex  justify-center items-center md:w-[28%] p-2 pl-2 md:pr-4 md:pl-4 md:bg-fuchsia-700  shadow-inner hover:scale-95 rounded-xl "
                    onClick={openModal}
                  >
                    <span className="md:text-xl text-2xl">
                      <ion-icon name="create-outline"></ion-icon>
                    </span>
                    <span className="md:text-white hidden md:block">
                      Créer un Contrat
                    </span>
                  </button>
                )}

                <button
                  className=" flex items-center p-2 pl-4 pr-4 md:pr-8 md:pl-8 bg-[#a1a76a] text-white-700 hover:scale-95 rounded-xl "
                  onClick={openPayementModal}
                >
                  <span className="text-xl">$</span>
                  Paiement
                </button>
              </motion.div>
            </motion.div>
            <motion.div className="flex md:flex-row flex-col justify-between gap-8">
              {/* Première section avec les détails du locataire */}
              <motion.div
                className="flex flex-col justify-center gap-10 md:w-1/2 w-full  h-72  rounded-3xl p-8 shadow-2xl bg-[#2d3446}"
                initial={{ opacity: 0 }}
                whileHover={{ scale: 0.9 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex justify-between items-center p-2 rounded-xl border border-solid border-[#6e6f70] bg-[#a1a76a] text-white">
                  <div className="flex gap-4">
                    <h2 className="text-xl">{tenantData.name}</h2>
                    <h2 className="text-xl">{tenantData.prenom}</h2>
                  </div>
                  <span className="text-xl hover:text-gray-800">
                    <ion-icon name="create-outline"></ion-icon>
                  </span>
                </div>
                <table className="w-full border-collapse border border-[#b3b5b7] rounded-3xl text-[#b3b5b7]">
                  <tbody>
                    <tr className="border border-1">
                      <td className="p-4 border border-[#b3b5b7]">ID :</td>
                      <td className="p-4 border border-[#b3b5b7]">
                        {tenantData.id}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border border-[#b3b5b7]">Tél :</td>
                      <td className="p-4 border border-[#b3b5b7]">
                        {tenantData.telephone}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border border-[#b3b5b7]">Email :</td>
                      <td className="p-4 border border-[#b3b5b7]">
                        {tenantData.email}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </motion.div>

              {/* Deuxième section avec le formulaire et le statut */}
              <motion.div
                className="flex flex-col items-center justify-center md:w-2/5 w-full h-96 text-[#d6d8da] shadow-2xl rounded-3xl p-8 bg-gradient-to-t from-[#67456d] to-[#283342]"
                initial={{ opacity: 0 }}
                whileHover={{ scale: 0.9 }}
                animate={{ opacity: 1 }}
                transition={{ delayChildren: 0.4 }}
              >
                <p className="mb-1">
                  Verifier si {tenantData.name} est en ordre
                </p>

                {/* Utilisez le composant FilterForm */}
                <FilterForm tenant={tenantData} setInOder={setInOder} />

                {/* Affichez le statut du locataire en fonction de inOder */}
                {inOder ? (
                  <p className="text-xs text-white mt-1">
                    Le locataire {tenantData.name} est en règle.
                  </p>
                ) : (
                  <p className="text-xs text-white mt-1">
                    Le locataire {tenantData.name} n'est pas en règle.
                  </p>
                )}
              </motion.div>
            </motion.div>
          </div>
          <ModifyContract
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            id={id}
          />
          <Paiement
            isModalPayementOpen={isModalPayementOpen}
            closePayementModal={closePayementModal}
            id={id}
          />
          <UpdateContractPopup
            isUpdateContactModaleOpen={isUpdateContactModaleOpen}
            closeUpdateContractModal={closeUpdateContractModal}
            id={id}
            bailId={bailId}
          />
        </>
      )}
      <Toaster />
    </>
  );
}
