import { useNavigate } from "react-router-dom";
import Header from "../components/header";

export default function Home() {
  const navigation = useNavigate();
  return (
    <>
      <div className="">
        <Header />
      </div>
      <div className="p-8">
        <div className="flex gap-8">
          <div
            className="h-[250px] w-[385px] bg-[#F7FAFD] rounded-lg cursor-pointer"
            onClick={() => navigation("/my-houses")}
          >
            <h3 className="bg-[#283342] text-white  p-5">Biens</h3>
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
          </div>
          <div
            className="h-[250px] w-[385px] bg-[#F7FAFD] rounded-lg cursor-pointer"
            onClick={() => navigation("/my-tenants")}
          >
            <h3 className="bg-[#283342] text-white  p-5">Locataires</h3>
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
          </div>
          <div
            className="h-[250px] w-[385px] bg-[#F7FAFD] rounded-lg cursor-pointer"
            onClick={() => navigation("/locations")}
          >
            <h3 className="bg-[#283342] text-white  p-5">Locations</h3>
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
          </div>
        </div>
        <div className="flex items-center p-5 mt-8 text-red-500 bg-[#f2dedf] gap-4  rounded-lg cursor-pointer">
          <span className="text-xl">
            <ion-icon name="chatbox-ellipses-outline"></ion-icon>
          </span>
          <h3 className="">3 Loyers en retard</h3>
        </div>
      </div>
    </>
  );
}
