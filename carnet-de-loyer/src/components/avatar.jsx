import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Avatar() {
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const navigation = useNavigate();

  const getCurrentUser = sessionStorage.getItem("currentUser");
  const currentUser = JSON.parse(getCurrentUser);
  const openSettingModal = () => {
    setIsSettingModalOpen(!isSettingModalOpen);
  };

  const logout = () => {
    sessionStorage.clear();
    navigation("/");
  };
  return (
    <>
      <div className=" flex justify-between items-center gap-4 p-4 w-full md:w-[14.8em]  md:fixed bottom-0">
        <div className="flex justify-center items-center gap-4">
          <span className="flex items-center text-[#b3b5b7] text-[50px]">
            <ion-icon name="person-circle-outline"></ion-icon>
          </span>

          <div className="flex flex-col gap-0 text-lg  leading-5">
            <p className="text-[#b3b5b7] ">{currentUser.username} </p>
            <p className="text-[#b3b5b7] ">{`ID: ${currentUser.id}`}</p>
          </div>
        </div>

        <div
          className="justify-self-end text-white text-lg cursor-pointer"
          onClick={openSettingModal}
        >
          <ion-icon name="ellipsis-vertical-outline"></ion-icon>
        </div>
      </div>
      {isSettingModalOpen && (
        <div className="flex justify-center items-center w-[180px] h-[80px]  p-8 absolute bottom-0 left-44 md:bottom-12 md:left-64 text-[#b3b5b7] rounded border border-[#b3b5b7]  bg-gradient-to-t from-[#32033a] to-[#283342] border-4">
          <ul className="">
            <li className="cursor-pointer hover:text-white">
              <span className="flex items-center justify-start gap-2">
                <span className="text-xl">
                  <ion-icon name="create-outline"></ion-icon>
                </span>
                <span>Modifier</span>
              </span>
            </li>
            <li className="cursor-pointer hover:text-white" onClick={logout}>
              <span className="flex items-center justify-start gap-2">
                <span className="text-xl">
                  <ion-icon name="log-out-outline"></ion-icon>
                </span>
                <span>Déconnexion</span>
              </span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
