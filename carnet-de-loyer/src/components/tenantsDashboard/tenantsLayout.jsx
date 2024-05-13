import { Outlet } from "react-router-dom";
import TenantsSidebar from "./tenantsSidebare";

export default function TenantsLayout() {
  return (
    <>
      <div className="md:h-screen  md:w-[320px] md:flex md:flex-col md:bg-gradient-to-t from-[#32033a] to-[#283342]  hidden ">
        <TenantsSidebar />
      </div>
      <div className=" bg-[#283342] border-b border-r w-screen border-[#474747] overflow-y-scroll">
        <Outlet />
      </div>
    </>
  );
}
