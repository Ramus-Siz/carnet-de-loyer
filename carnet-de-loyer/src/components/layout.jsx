import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/sidebar";
import { useRentBooklet } from "./contexts/context";
import { useEffect } from "react";

export default function Layout() {
  let currentUser = useRentBooklet((state) => state.currentUser);
  const updateCurrentUser = useRentBooklet((state) => state.updateCurrentUser);
  useEffect(() => {
    let currentUser = sessionStorage.getItem("currentUser");
    if (!currentUser) {
      return;
    }
    const currentUserParse = JSON.parse(currentUser);
    updateCurrentUser(currentUserParse);
  }, [updateCurrentUser]);
  return (
    <>
      <div className="md:h-screen  md:w-[300px] md:flex md:flex-col md:bg-gradient-to-t from-[#32033a] to-[#283342]  hidden">
        <Sidebar />
      </div>
      <div className=" bg-[#283342] border-b border-r w-screen border-[#474747] overflow-y-scroll">
        <Outlet />
      </div>
    </>
  );
}
