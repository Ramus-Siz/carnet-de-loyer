import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRentBooklet } from "../components/contexts/context";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  const tenants = useRentBooklet((state) => state.tenants);
  const houses = useRentBooklet((state) => state.houses);
  const updateHouses = useRentBooklet((state) => state.updateHouses);
  const updateTenants = useRentBooklet((state) => state.updateTenants);
  const currentUser = useRentBooklet((state) => state.currentUser);

  const userUrl = `https://tenants-management-api.onrender.com/my-tenants/lessor/${currentUser.lessorId}`;

  const getHouseData = async () => {
    try {
      let myHousesUpdate = sessionStorage.getItem("myHouses");
      const housesUpdate = JSON.parse(myHousesUpdate);
      updateHouses(housesUpdate);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };

  const getTenantData = async () => {
    try {
      let myTenantsUpdate = sessionStorage.getItem("mytenants");
      const tenantsUpdate = JSON.parse(myTenantsUpdate);
      updateTenants(tenantsUpdate);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };

  useEffect(() => {
    getHouseData();
    getTenantData();
  }, [updateCurrentUser]);

  return (
    <>
      <Header />
      <div className="p-10">
        <div className="flex flex-wrap gap-8 justify-center">
          {/* Carte Mes Biens */}
          <motion.div
            className="h-[250px] w-[385px] shadow-lg rounded-xl bg-[#b7bf7f] hover:bg-[#a0a872] hover:text-white cursor-pointer transition-colors duration-300"
            onClick={() => navigate("/my-houses")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl p-5 text-end text-[#edeeef]">Mes biens</h3>
            <div className="flex justify-around items-center h-3/4 p-5">
              <div className="text-5xl text-white border-2 p-3 rounded-full animate-pulse">
                <ion-icon name="home-outline"></ion-icon>
              </div>
              <div className="flex flex-col text-xl text-white">
                <div className="flex items-center gap-2">
                  <span className="text-5xl font-semibold">
                    {houses.length}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xl">Maisons</span>
                    <span className="text-xs text-[#283342]">
                      Basses / Appartements
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-5xl font-semibold">8</span>
                  <span className="flex flex-col">
                    <span className="text-xl">Boutiques</span>
                    <span className="text-xs text-[#283342]">
                      Commerce et autres
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Carte Locataires */}
          <motion.div
            className="h-[250px] w-[385px] shadow-lg rounded-xl bg-[#c299d0] hover:bg-[#b085b7] hover:text-white cursor-pointer transition-colors duration-300"
            onClick={() => navigate("/my-tenants")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl p-5 text-end text-[#edeeef]">Locataires</h3>
            <div className="flex justify-around items-center h-3/4 p-5 text-[#edeeef]">
              <div className="text-5xl border-white border-2 p-3 rounded-full animate-pulse">
                <ion-icon name="person-outline"></ion-icon>
              </div>
              <div className="flex flex-col text-xl ">
                <div className="flex items-center gap-2">
                  <span className="text-5xl font-semibold">
                    {tenants.length}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xl">Occupants</span>
                    <span className="text-xs text-[#283342]">Maisons</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-5xl font-semibold">5</span>
                  <span className="flex flex-col">
                    <span className="text-xl">Occupants</span>
                    <span className="text-xs text-[#283342]">Boutiques</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Carte Locations */}
          <motion.div
            className="h-[250px] w-[385px] shadow-lg rounded-xl bg-[#b7bf7f] hover:bg-[#a0a872] hover:text-white cursor-pointer transition-colors duration-300"
            onClick={() => navigate("/locations")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl p-5 text-end text-[#edeeef]">Locations</h3>
            <div className="flex justify-around items-center h-3/4 p-5">
              <div className="text-5xl border-white border-2 p-3 rounded-full animate-pulse">
                <ion-icon name="key-outline"></ion-icon>
              </div>
              <div className="flex flex-col text-xl text-[#edeeef]">
                <div className="flex items-center gap-2">
                  <span className="text-5xl font-semibold">
                    {tenants.length}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xl">Maisons</span>
                    <span className="text-xs text-[#283342]">{`${
                      houses.length - tenants.length
                    } Disponibles`}</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-5xl font-semibold">5</span>
                  <span className="flex flex-col">
                    <span className="text-xl">Boutiques</span>
                    <span className="text-xs text-[#283342]">
                      3 Disponibles
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section Loyers en retard */}
        <motion.div
          className="flex items-center p-5 mt-8 bg-[#f2dedf] gap-4 rounded-lg cursor-pointer overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="text-xl text-red-500">
            <ion-icon name="chatbox-ellipses-outline"></ion-icon>
          </span>
          <h3 className="text-red-500">3 Loyers en retard</h3>
        </motion.div>
      </div>
    </>
  );
}
