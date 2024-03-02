import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/sidebar";

export default function Layout() {
  return (
    <>
      <div className="h-screen  w-[300px] flex flex-col bg-gradient-to-t from-[#67456d] to-[#283342] border-r border-b border-[#474747]">
        <Sidebar />
      </div>
      <div className=" bg-[#283342] border-b border-r w-screen border-[#474747]">
        <Outlet />
      </div>
    </>
  );
}
