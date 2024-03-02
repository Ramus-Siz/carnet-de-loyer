import { Outlet } from "react-router-dom";
import TenantsSidebar from "./tenantsSidebare";

export default function TenantsLayout() {
  return (
    <>
      <div className="h-screen  w-[300px] flex flex-col bg-gradient-to-t from-[#32033a] to-[#283342] ">
        <TenantsSidebar />
      </div>
      <div className=" bg-[#283342] border-b border-r w-screen border-[#474747]">
        <Outlet />
      </div>
    </>
  );
}
