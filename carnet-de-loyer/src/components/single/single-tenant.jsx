import { useParams } from "react-router-dom";
import { useRentBooklet } from "../contexts/context";
import Header from "../header";
import { delay, motion } from "framer-motion";
import ModifyContract from "../modifyContract";
import { useState } from "react";
import Paiement from "../paiement";

export default function SinglePreviewTenants() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPayementOpen, setIsModalPayementOpen] = useState(false);

  const listTenants = useRentBooklet((state) => state.tenants);
  const { id } = useParams();
  const tenants = listTenants.find((tenant) => tenant.id === +id);
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
              className="  flex items-center  p-2 pr-8 pl-8 bg-fuchsia-700  shadow-inner hover:scale-95 rounded-3xl "
              onClick={openModal}
            >
              <span className="text-white text-2xl">
                <ion-icon name="create-outline"></ion-icon>
              </span>
              <span>Modifier le Contrat</span>
            </button>
            <button
              className=" flex items-center p-2 pr-8 pl-8 bg-fuchsia-700 hover:scale-95 rounded-3xl "
              onClick={openPayementModal}
            >
              <span className="text-2xl animate-bounce">
                <ion-icon name="download-outline"></ion-icon>
              </span>
              Paiement
            </button>
          </motion.div>
        </motion.div>
        <motion.div className=" flex justify-between gap-8 ">
          <motion.div
            className=" flex flex-col gap-10 w-[50%] h-[400px]  rounded-3xl p-8 shadow-2xl "
            initial={{ opacity: 0 }}
            whileHover={{ scale: 0.9 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex justify-between items-center p-2 rounded-xl border-solid border text-[#acaeb0] border-[#6e6f70]">
              <div className="flex gap-4">
                <h2 className="text-xl">{tenants.name}</h2>
                <h2 className="text-xl">{tenants.prenom}</h2>
              </div>
              <span className="text-xl hover:text-white">
                <ion-icon name="create-outline"></ion-icon>
              </span>
            </div>
            <table className=" border-collapse border border-[#b3b5b7] rounded-3xl text-[#b3b5b7]">
              <thead>
                <tr className="border border-1 bg-[#b7bf7f] text-white"></tr>
              </thead>
              <tbody>
                <tr className="border border-1 bg-[#b7bf7f] text-white">
                  <td className=" p-4 border border-[#b3b5b7] ...">ID :</td>
                  <td className="p-4 border border-[#b3b5b7] ...">
                    {tenants.id}
                  </td>
                </tr>
                <tr className="">
                  <td className=" p-4 border border-[#b3b5b7] ...">Tél :</td>
                  <td className="p-4 border border-[#b3b5b7] ...">
                    {tenants.telephone}
                  </td>
                </tr>
              </tbody>
            </table>
          </motion.div>

          <motion.div
            className="flex gap-10 flex-col  w-[30%] h-[400px] text-[#d6d8da] shadow-2xl  rounded-3xl p-8 shadow-2xl bg-gradient-to-t from-[#67456d] to-[#283342]"
            initial={{ opacity: 0 }}
            whileHover={{ scale: 0.9 }}
            animate={{ opacity: 1 }}
            transition={{ delayChildren: 0.4 }}
          >
            <div className="flex justify-between items-center p-2 rounded-xl border-solid border text-[#acaeb0] border-[#6e6f70]">
              <h2 className="text-xl">Filtre</h2>
              <span className="text-xl hover:text-white">
                <ion-icon name="create-outline"></ion-icon>
              </span>
            </div>
            <div className="justify-self-center self-center">
              <span className="text-6xl  hover:text-white ">
                <ion-icon name="checkmark-circle-outline"></ion-icon>
              </span>
            </div>
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
