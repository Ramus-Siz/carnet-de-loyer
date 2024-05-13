import { useState } from "react";
import Logo from "../logo";
import MobileMenuTenant from "../menu/mobile-menu-tenant";

export default function TenantHeaderMobile({}) {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      <div className="flex justify-between p-4 items-center bg-[#2b213f] md:border-b-8 md:border-[#283342] sticky top-0 md:hidden">
        <div className="md:hidden">
          <Logo />
        </div>
        <div
          className="text-white text-2xl"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          <ion-icon name="menu-outline"></ion-icon>
        </div>
      </div>
      {mobileMenu && (
        <div className=" flex flex-col  justify-center items-center h-screen w-[50%] bg-gradient-to-t from-[#32033a] to-[#283342] absolute  top-0 right-0 ease-in duration-500 z-40">
          <MobileMenuTenant
            setMobileMenu={setMobileMenu}
            mobileMenu={mobileMenu}
          />
        </div>
      )}
    </>
  );
}
