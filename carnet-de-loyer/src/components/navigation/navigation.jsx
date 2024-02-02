import { useState } from "react";

export default function Navigation() {
  const [liActive, setLiActive] = useState(false);
  return (
    <>
      <nav className="text-white">
        <ul className="flex flex-col gap-4 text-lg">
          <div className="flex gap-3 items-center">
            <img
              src="/images/icon/dashboard.png"
              alt="icon-home"
              className=""
            />

            <li className="">Dashboard</li>
          </div>

          <div className="flex gap-3 items-center ">
            <ion-icon name="duplicate-outline"></ion-icon>
            <div className="flex justify-between w-full items-center">
              <li onClick={() => setLiActive((prev) => !prev)}>Inventaire</li>
              {liActive ? (
                <ion-icon name="chevron-up-outline "></ion-icon>
              ) : (
                <ion-icon name="chevron-down-outline"></ion-icon>
              )}
            </div>
          </div>
          {liActive && (
            <div id="dropdown">
              <ul>
                <li>Liste de maison</li>
                <li>Liste de Locataire</li>
              </ul>
            </div>
          )}

          <li>Dashboard</li>
          <div className="flex gap-3 items-center">
            <img src="/images/icon/config.png" alt="config-icon" />
            <li>Parametres</li>
          </div>
        </ul>
      </nav>
    </>
  );
}
