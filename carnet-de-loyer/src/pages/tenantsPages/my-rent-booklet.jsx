import { motion } from "framer-motion";

export default function MyRentBook() {
  const getCurrentUser = sessionStorage.getItem("currentUser");
  const currentUser = JSON.parse(getCurrentUser);
  const getTenant = sessionStorage.getItem("tenant");
  const tenant = JSON.parse(getTenant);
  const getLessor = sessionStorage.getItem("lessor");
  const lessor = JSON.parse(getLessor);
  const getHouse = sessionStorage.getItem("house");
  const house = JSON.parse(getHouse);

  return (
    <>
      <div className="pt-12">
        <div className="flex justify-evenly">
          <div className="w-[35em] h-[37em] p-12 shadow-2xl flex flex-col gap-4 text-[#b3b5b7] rounded-xl">
            <div className="flex justify-between items-center">
              <span className="text-2xl text-fuchsia-500 bg-clip-text ">
                Infos
              </span>
            </div>

            <div className="border-b border-[#5f6263] pt-4  flex justify-between ">
              <div className="text-orange-600 bg-clip-text">Moi</div>
              <div>{currentUser.username} </div>
            </div>
            <div className="border-b border-[#5f6263] pt-4 flex justify-between ">
              <div>Maison </div>
              <div>{`${house.adress}`} </div>
            </div>

            <div className="border-b border-[#5f6263] pt-2 flex justify-between ">
              <div className="text-orange-600 bg-clip-text">Bailleur </div>
              <div> {`${lessor.name} ${lessor.prenom}`}</div>
            </div>
            <div className="border-b border-[#5f6263] pt-4 flex justify-between">
              <div>Email </div>
              <div>{`${lessor.email}`} </div>
            </div>
            <div className="border-b border-[#5f6263] pt-4 flex justify-between ">
              <div>Télephone </div>
              <div>{`${lessor.telephone}`} </div>
            </div>
            <span className="text-xl self-end justify-self-end pt-12 text-white">
              <ion-icon name="information-circle-outline"></ion-icon>
            </span>
          </div>
          <div className="flex flex-col justify-center items-center]">
            <motion.div
              className="h-[200px] w-[385px] shadow-2xl hover:shadow-xl p-8 cursor-pointer  rounded-xl bg-gradient-to-r from-white to-fuchsia-500 bg-clip-text text-transparent hover:text-white flex gap-4  flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className=" self-start text-xl bg-gradient-to-r from-white to-fuchsia-500 bg-clip-text text-transparent leading-tight">
                Etat
              </h3>
              <div className="flex gap-16 h-3/4 items-center">
                <div className="text-6xl text-fuchsia-700  border-fuchsia-700  p-3 rounded-full animate-pulse">
                  <ion-icon name="checkmark-outline"></ion-icon>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-5xl">0</span>
                    <span className="flex flex-col">
                      <span className="text-xl">Loyer</span>
                      <span className="text-xs">En retard</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="h-[200px] w-[385px] shadow-2xl hover:shadow-xl p-8 cursor-pointer  rounded-xl bg-gradient-to-r from-white to-fuchsia-500 bg-clip-text text-transparent hover:text-white flex gap-4  flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className=" self-start text-xl bg-gradient-to-r from-white to-fuchsia-500 bg-clip-text text-transparent leading-tight">
                Messages
              </h3>
              <div className="flex gap-16 h-3/4 items-center">
                <div className="text-6xl text-fuchsia-700  border-fuchsia-700  p-3 rounded-full animate-pulse">
                  <ion-icon name="chatbubble-outline"></ion-icon>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-5xl">0</span>
                    <span className="flex flex-col">
                      <span className="text-xl">Notifications</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
