import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import { motion, delay } from "framer-motion";
import { useEffect, useState } from "react";
import { useRentBooklet } from "../components/contexts/context";
import axios from "axios";
import { BASE_API_URL } from "../utils/config";
import Avatar from "../components/avatar";

export default function Home() {
  const [tenantCount, setTenantCount] = useState(0);
  const navigation = useNavigate();
  const tenants = useRentBooklet((state) => state.tenants);
  const houses = useRentBooklet((state) => state.houses);
  console.log(houses);
  const updateHouses = useRentBooklet((state) => state.updateHouses);
  const getUserConnected = sessionStorage.getItem("currentUser");
  const userConnected = JSON.parse(getUserConnected);
  const updateTenants = useRentBooklet((state) => state.updateTenants);
  let currentUser = useRentBooklet((state) => state.currentUser);
  const updateCurrentUser = useRentBooklet((state) => state.updateCurrentUser);
  const userUrl = `${BASE_API_URL}/my-tenants/count/count-tenants-with-bail`;
  const getHouseData = async () => {
    try {
      // const token = sessionStorage.getItem("token");
      // const { data } = await axios.get(userUrl, {
      //   headers: {
      //     authorization: token,
      //   },
      // });
      // let getMyHouses = sessionStorage.getItem("myHouses");
      // const myHouses = JSON.parse(getMyHouses);

      // sessionStorage.removeItem(myHouses);
      // sessionStorage.setItem("myHouses", JSON.stringify(data));
      let getMyHousesUpdate = sessionStorage.getItem("myHouses");

      const myHousesUpdate = JSON.parse(getMyHousesUpdate);
      updateHouses(myHousesUpdate);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };
  const getTenantData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(userUrl, {
        headers: {
          authorization: token,
        },
      });

      console.log(response.data.count);
      setTenantCount(response.data.count);
      let getMyTenantsUpdate = sessionStorage.getItem("mytenants");
      const mytenantsUpdate = JSON.parse(getMyTenantsUpdate);
      updateTenants(mytenantsUpdate);

      // const getMyTenants = sessionStorage.getItem("mytenants");
      // const mytenants = JSON.parse(getMyTenants);
      // sessionStorage.removeItem(mytenants);
      // sessionStorage.setItem("mytenants", JSON.stringify(data));
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };
  useEffect(() => {
    getHouseData();
    getTenantData();
  }, [tenantCount]);

  return (
    <>
      <div className="">
        <Header />
      </div>
      <div className="md:p-10 p-4">
        <div className="flex flex-col justify-center items-center md:flex-row gap-4 ">
          <motion.div
            className="h-[250px] md:w-[385px] w-[350px] shadow-2xl hover:shadow-xl hover:bg-fuchsia-700 cursor-pointer  rounded-xl bg-[#b7bf7f]  hover:text-white"
            onClick={() => navigation("/my-houses")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 0.9 }}
            transition={{ delayChildren: 0.4 }}
          >
            <h3 className="pr-12 p-5 text-xl  leading-tight text-end text-[#edeeef]">
              Mes biens
            </h3>
            <div className="flex  h-3/4 justify-around items-center p-5 ">
              <div className="text-5xl text-white border-2 p-3 rounded-full animate-pulse">
                <ion-icon name="home-outline"></ion-icon>
              </div>
              <div className="flex flex-col text-xl text-white">
                <div className="flex items-center gap-2">
                  <span className="text-5xl font-semibold text-[#edeeef]">
                    {`${houses.length}`}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xl">Maisons</span>
                    <span className="text-xs text-[#283342]">
                      Basses / Appartements
                    </span>
                  </span>
                </div>
                <div className="">
                  <div className="flex items-center gap-2">
                    <span className="text-5xl font-semibold text-[#edeeef]">
                      0
                    </span>
                    <span className="flex flex-col">
                      <span className="text-xl ">Boutiques</span>
                      <span className="text-xs text-[#283342]">
                        Commerce et autres
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="h-[250px] w-[350px] md:w-[385px] shadow-2xl hover:shadow-xl hover:bg-fuchsia-700 rounded-xl  bg-[#c299d0]  cursor-pointer hover:text-white"
            onClick={() => navigation("/my-tenants")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 0.9 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="pr-12 text-xl p-5 text-[#edeeef] leading-tight  text-end ">
              Locataires
            </h3>
            <div className="flex  h-3/4 justify-around items-center p-5 text-[#edeeef]">
              <div className="text-5xl text-white border-solid border-white border-2 p-3 rounded-full animate-pulse">
                <ion-icon name="person-outline"></ion-icon>
              </div>
              <div className="flex flex-col text-xl ">
                <div className="flex items-center gap-2">
                  <span className="text-5xl font-semibold text-[#edeeef]">
                    {`${tenants.length}`}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xl ">Occupants</span>
                    <span className="text-xs text-[#283342]">Maisons</span>
                  </span>
                </div>
                <div className="">
                  <div className="flex items-center gap-3">
                    <span className="text-5xl font-semibold text-[#edeeef]">
                      0
                    </span>
                    <span className="flex flex-col">
                      <span className="text-xl ">Occupants</span>
                      <span className="text-xs text-[#283342]">Boutiques</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="h-[250px] md:w-[385px] w-[350px] rounded-xl bg-[#b7bf7f] hover:bg-fuchsia-700 shadow-2xl hover:shadow-xl hover:bg-fuchsia-700 cursor-pointer hover:text-white"
            onClick={() => navigation("/locations")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <h3 className=" p-5 pr-12 text-xl text-[#edeeef] leading-tight  text-end ">
              Locations
            </h3>
            <div className="flex  h-3/4 justify-around items-center p-5">
              <div className="text-5xl text-white border-solid border-white border-2 p-3 rounded-full animate-pulse">
                <ion-icon name="key-outline"></ion-icon>
              </div>
              <div className="flex flex-col text-xl text-[#edeeef]">
                <div className="flex items-center gap-2">
                  <span className="text-5xl font-semibold">{`${tenantCount}`}</span>
                  <span className="flex flex-col">
                    <span className="text-xl ">Maisons</span>
                    <span className="text-xs text-[#283342] ">
                      {`${houses.length - tenantCount} Disponibles`}
                    </span>
                  </span>
                </div>
                <div className="">
                  <div className="flex items-center gap-3">
                    <span className="text-5xl font-semibold">0</span>
                    <span className="flex flex-col">
                      <span className="text-xl ">Boutiques</span>
                      <span className="text-xs text-[#283342]">
                        0 Disponibles
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="flex items-center p-5 mt-4 text-red-500 bg-[#f2dedf] gap-4  rounded-lg cursor-pointer overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          whileHover={{ scale: 0.9 }}
        >
          <span className="text-xl">
            <ion-icon name="chatbox-ellipses-outline"></ion-icon>
          </span>
          <h3 className="">3 Loyers en retard</h3>
        </motion.div>
      </div>
      <div className="md:hidden  bg-gradient-to-t from-[#32033a] to-[#283342] sticky  bottom-0 mt-4 ">
        <Avatar />
      </div>
    </>
  );
}
