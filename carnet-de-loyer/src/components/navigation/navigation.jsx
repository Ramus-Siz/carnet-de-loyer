import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navigation() {
  const [liActive, setLiActive] = useState(false);
  return (
    <>
      <nav className="text-[#b3b5b7] ">
        <ul className="flex flex-col gap-2 text-lg">
          <li className="">
            <NavLink to="/home">
              <span className="flex gap-3  items-center p-4 hover:bg-[#b3b5b7] hover:text-white ">
                <ion-icon name="home-outline"></ion-icon>
                Dashboard
              </span>
            </NavLink>
          </li>
          <li>
            <div
              onClick={() => setLiActive((prev) => !prev)}
              className="cursor-pointer"
            >
              <div className="flex gap-3 items-center p-3 hover:bg-[#b3b5b7] hover:text-white ">
                <ion-icon name="duplicate-outline"></ion-icon>
                <div className="flex justify-between pr-3 w-full items-center ">
                  <h3>Inventaire</h3>
                  {liActive ? (
                    <ion-icon name="chevron-up-outline "></ion-icon>
                  ) : (
                    <ion-icon name="chevron-down-outline"></ion-icon>
                  )}
                </div>
              </div>
            </div>
          </li>

          {liActive && (
            <div id="dropdown">
              <ul className="pl-3">
                <li>
                  <NavLink to="/my-houses">
                    <div className="flex gap-3 items-center p-3 hover:bg-[#b3b5b7] hover:text-white">
                      <ion-icon name="list-outline"></ion-icon>
                      <h3>Mes Maisons</h3>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/my-tenants">
                    <div className="flex gap-3 items-center p-3 hover:bg-[#b3b5b7] hover:text-white">
                      <ion-icon name="list-circle-outline"></ion-icon>
                      <h3>Mes Locataires</h3>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/locations">
                    <div className="flex gap-3 items-center p-3 hover:bg-[#b3b5b7] hover:text-white">
                      <ion-icon name="checkbox-outline"></ion-icon>
                      <h3>Locations</h3>
                    </div>
                  </NavLink>
                </li>
              </ul>
            </div>
          )}

          <li>
            <NavLink to="/messages">
              <div className="flex gap-3 items-center p-3 hover:bg-[#b3b5b7] hover:text-white">
                <ion-icon name="chatbox-ellipses-outline"></ion-icon>
                <h3>Messages</h3>
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink to="/settings">
              <div className="flex gap-3 items-center p-3 hover:bg-[#b3b5b7] hover:text-white">
                <ion-icon name="settings-outline"></ion-icon>
                <div className="flex justify-between pr-3 w-full items-center">
                  <h3>Paramètres</h3>
                  {liActive ? (
                    <ion-icon name="chevron-up-outline "></ion-icon>
                  ) : (
                    <ion-icon name="chevron-down-outline"></ion-icon>
                  )}
                </div>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
