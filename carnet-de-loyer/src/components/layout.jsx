import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/sidebar";

export default function Layout() {
  return (
    <>
      <div className="h-screen  w-[300px] flex flex-col bg-[#283342] border-r border-b border-[#b3b5b7]">
        <Sidebar />
      </div>
      <div className="bg-[#283342] border-b border-r w-screen border-[#b3b5b7]">
        <Outlet />
      </div>
    </>
  );
}
