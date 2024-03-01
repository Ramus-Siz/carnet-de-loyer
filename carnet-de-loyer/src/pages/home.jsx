import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import { motion } from "framer-motion";

export default function Home() {
  const navigation = useNavigate();
  return (
    <>
      <div className="">
        <Header />
      </div>
      <div className="p-10">
        <div className="flex gap-8">
          <motion.div
            className="h-[250px] w-[385px] shadow-2xl hover:shadow-xl cursor-pointer  rounded-xl text-[#b3b5b7] hover:text-white"
            onClick={() => navigation("/my-houses")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="pl-12 p-5">Biens</h3>
            <div className="flex  h-3/4 justify-around items-center p-5">
              <div className="text-6xl text-fuchsia-700 border-solid border-fuchsia-700 border-2 p-3 rounded-full animate-pulse">
                <ion-icon name="home-outline"></ion-icon>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-6xl">7</span>
                  <span className="flex flex-col">
                    <span className="text-xl">Maisons</span>
                    <span className="text-xs">Basses/Appartements</span>
                  </span>
                </div>
                <div className="">
                  <div className="flex items-center gap-3">
                    <span className="text-6xl">8</span>
                    <span className="flex flex-col">
                      <span className="text-xl">Boutiques</span>
                      <span className="text-xs">Commerce et autres</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="h-[250px] w-[385px] shadow-2xl hover:shadow-xl rounded-xl text-[#b3b5b7]  cursor-pointer hover:text-white"
            onClick={() => navigation("/my-tenants")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <h3 className="pl-12 p-5">Locataires</h3>
            <div className="flex  h-3/4 justify-around items-center p-5">
              <div className="text-6xl text-fuchsia-700 border-solid border-fuchsia-700 border-2 p-3 rounded-full animate-pulse">
                <ion-icon name="person-outline"></ion-icon>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-6xl">4</span>
                  <span className="flex flex-col">
                    <span className="text-xl">Occupants</span>
                    <span className="text-xs">Maisons</span>
                  </span>
                </div>
                <div className="">
                  <div className="flex items-center gap-3">
                    <span className="text-6xl">5</span>
                    <span className="flex flex-col">
                      <span className="text-xl">Occupants</span>
                      <span className="text-xs">Boutiques</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="h-[250px] w-[385px] rounded-xl text-[#b3b5b7] shadow-2xl hover:shadow-xl cursor-pointer hover:text-white"
            onClick={() => navigation("/locations")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <h3 className=" p-5 pl-12">Locations</h3>
            <div className="flex  h-3/4 justify-around items-center p-5">
              <div className="text-6xl text-fuchsia-700 border-solid border-fuchsia-700 border-2 p-3 rounded-full animate-pulse">
                <ion-icon name="key-outline"></ion-icon>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-6xl">4</span>
                  <span className="flex flex-col">
                    <span className="text-xl">Maisons</span>
                    <span className="text-xs">3 Disponibles</span>
                  </span>
                </div>
                <div className="">
                  <div className="flex items-center gap-3">
                    <span className="text-6xl">5</span>
                    <span className="flex flex-col">
                      <span className="text-xl">Boutiques</span>
                      <span className="text-xs">3 Disponibles</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="flex items-center p-5 mt-8 text-red-500 bg-[#f2dedf] gap-4  rounded-lg cursor-pointer overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <span className="text-xl">
            <ion-icon name="chatbox-ellipses-outline"></ion-icon>
          </span>
          <h3 className="">3 Loyers en retard</h3>
        </motion.div>
      </div>
    </>
  );
}
