import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/sidebar";

export default function Layout() {
  return (
    <>
      <div className="h-screen w-[300px] bg-[#283342]">
        <Sidebar />
      </div>
      <div className="bg-white w-screen ">
        <Outlet />
      </div>
    </>
  );
}
