import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  const [liActive, setLiActive] = useState(false);
  return (
    <>
      <nav className="text-white">
        <ul className="flex flex-col gap-2 text-lg">
          <li className="active:bg-orange-600 ">
            <NavLink to="/home">
              <div className="flex gap-3  items-center p-4 hover:bg-orange-600">
                <img
                  src="/images/icon/dashboard.png"
                  alt="icon-home"
                  className=""
                />
                <h3 className="">Dashboard</h3>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="#" onClick={() => setLiActive((prev) => !prev)}>
              <div className="flex gap-3 items-center p-3 hover:bg-orange-600 ">
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
            </NavLink>
          </li>

          {liActive && (
            <div id="dropdown">
              <ul className="pl-3">
                <li>
                  <NavLink to="/my-houses">
                    <div className="flex gap-3 items-center p-3 hover:bg-orange-600">
                      <ion-icon name="list-outline"></ion-icon>
                      <h3>Mes Maisons</h3>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/my-tenants">
                    <div className="flex gap-3 items-center p-3 hover:bg-orange-600">
                      <ion-icon name="list-circle-outline"></ion-icon>
                      <h3>Mes Locataires</h3>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/locations">
                    <div className="flex gap-3 items-center p-3 hover:bg-orange-600">
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
              <div className="flex gap-3 items-center p-3 hover:bg-orange-600">
                <ion-icon name="chatbox-ellipses-outline"></ion-icon>
                <h3>Messages</h3>
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink to="/settings">
              <div className="flex gap-3 items-center p-3 hover:bg-orange-600">
                <img src="/images/icon/config.png" alt="config-icon" />
                <h3>Paramètres</h3>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
