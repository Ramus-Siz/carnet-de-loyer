import { useParams } from "react-router-dom";
import { useRentBooklet } from "../contexts/context";
import Header from "../header";
import { delay, motion } from "framer-motion";
import ModifyContract from "../modifyContract";
import { useEffect, useState } from "react";
import Paiement from "../paiement";
import FilterForm from "../filterForm";
import axios from "axios";

export default function SinglePreviewTenants() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPayementOpen, setIsModalPayementOpen] = useState(false);
  const [inOder, setInOder] = useState(false);
  const [tenantData, setTenantData] = useState({});
  console.log(tenantData);

  const listTenants = useRentBooklet((state) => state.tenants);
  const { id } = useParams();
  const tenants = listTenants.find((tenant) => tenant.id === +id);
  const tenantURL = `https://tenents-management-api.onrender.com/my-tenants/${id}`;

  console.log(tenants);

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

  const closePayementModal = () => {
    setIsModalPayementOpen(false);
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
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };
  useEffect(() => {
    getTenantData();
  }, []);
  return (
    <>
      <Header />
      <div className="flex flex-col gap-8 p-8">
        <motion.div
          className="flex justify-between items-center text-white gap-8 p-5   rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex gap-4 items-center text-[#b3b5b7]">
            <p>{tenants.name} est en ordre</p>
            <ion-icon name="checkmark-outline"></ion-icon>
          </div>
          <motion.div className="flex gap-8">
            <button
              className="  flex items-center  p-2 pr-8 pl-8 bg-fuchsia-700  shadow-inner hover:scale-95 rounded-xl "
              onClick={openModal}
            >
              <span className="text-white text-2xl">
                <ion-icon name="create-outline"></ion-icon>
              </span>
              <span>Modifier le Contrat</span>
            </button>
            <button
              className=" flex items-center p-2 pr-8 pl-8 bg-[#a1a76a] text-white-700 hover:scale-95 rounded-xl "
              onClick={openPayementModal}
            >
              <span className="text-2xl animate-bounce">
                <ion-icon name="create-outline"></ion-icon>
              </span>
              Paiement
            </button>
          </motion.div>
        </motion.div>
        <motion.div className="flex justify-between gap-8">
          {/* Première section avec les détails du locataire */}
          <motion.div
            className="flex flex-col gap-10 w-1/2 h-96 rounded-3xl p-8 shadow-2xl bg-[#2d3446}"
            initial={{ opacity: 0 }}
            whileHover={{ scale: 0.9 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex justify-between items-center p-2 rounded-xl border border-solid border-[#6e6f70] bg-[#a1a76a] text-white">
              <div className="flex gap-4">
                <h2 className="text-xl">{tenants.name}</h2>
                <h2 className="text-xl">{tenants.prenom}</h2>
              </div>
              <span className="text-xl hover:text-gray-800">
                <ion-icon name="create-outline"></ion-icon>
              </span>
            </div>
            <table className="w-full border-collapse border border-[#b3b5b7] rounded-3xl text-[#b3b5b7]">
              <tbody>
                <tr className="border border-1">
                  <td className="p-4 border border-[#b3b5b7]">ID :</td>
                  <td className="p-4 border border-[#b3b5b7]">{tenants.id}</td>
                </tr>
                <tr>
                  <td className="p-4 border border-[#b3b5b7]">Tél :</td>
                  <td className="p-4 border border-[#b3b5b7]">
                    {tenants.telephone}
                  </td>
                </tr>
              </tbody>
            </table>
          </motion.div>

          {/* Deuxième section avec le formulaire et le statut */}
          <motion.div
            className="flex flex-col items-center justify-center w-2/5 h-96 text-[#d6d8da] shadow-2xl rounded-3xl p-8 bg-gradient-to-t from-[#67456d] to-[#283342]"
            initial={{ opacity: 0 }}
            whileHover={{ scale: 0.9 }}
            animate={{ opacity: 1 }}
            transition={{ delayChildren: 0.4 }}
          >
            {/* Utilisez le composant FilterForm */}
            <FilterForm tenant={tenantData} setInOder={setInOder} />

            {/* Affichez le statut du locataire en fonction de inOder */}
            {inOder ? (
              <p className="text-lg text-white">
                Le locataire {tenants.name} est en règle.
              </p>
            ) : (
              <p className="text-lg text-white">
                Le locataire {tenants.name} n'est pas en règle.
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
    </>
  );
}
