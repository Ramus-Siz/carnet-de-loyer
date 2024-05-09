import { useState } from "react";
import DateAndTime from "./date-and-time";
import SearchBar from "./search-bar";
import MobileMenu from "./menu/mobile-menu";
export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <>
      <div className="sticky top-0 z-10 bg-[#1c213f]">
        <div className="flex md:justify-between justify-end items-center bg-[#2b213f] h-20 px-8 border-b-8 border-[#283342] ">
          <SearchBar />
          <DateAndTime />
          <span
            className="text-white text-xl md:hidden "
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <ion-icon name="grid-outline"></ion-icon>
          </span>
        </div>
      </div>

      {mobileMenu && (
        <div className=" flex flex-col  justify-center items-center h-[40em] w-[50%] bg-gradient-to-t from-[#32033a] to-[#283342] absolute  top-0 right-0 ease-in duration-500 z-40">
          <MobileMenu setMobileMenu={setMobileMenu} mobileMenu={mobileMenu} />
        </div>
      )}
    </>
  );
}
