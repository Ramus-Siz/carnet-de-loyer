import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/sidebar";

export default function Layout() {
  return (
    <>
      <div className="h-screen  w-[300px] flex flex-col bg-gradient-to-t from-[#32033a] to-[#283342]  ">
        <Sidebar />
      </div>
      <div className=" bg-[#283342] border-b border-r w-screen border-[#474747]  overflow-y-scroll">
        <Outlet />
      </div>
    </>
  );
}
