import { useState } from "react";
import DateAndTime from "./date-and-time";
import SearchBar from "./search-bar";
import MobileMenu from "./menu/mobile-menu";
import Logo from "./logo";
export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <>
      <div className="sticky top-0 z-10 bg-[#1c213f]">
        <div className="flex justify-between items-center bg-[#2b213f] h-20 pr-8 pl-5 border-b-8 border-[#283342]">
          <SearchBar />
          <DateAndTime />
          <div className="md:hidden">
            <Logo />
          </div>
          <span
            className="text-white text-xl md:hidden "
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <ion-icon name="grid-outline"></ion-icon>
          </span>
        </div>
      </div>

      {mobileMenu && (
        <div className=" flex flex-col  justify-center items-center h-screen w-[50%] bg-gradient-to-t from-[#32033a] to-[#283342] absolute  top-0 right-0 ease-in duration-500 z-40">
          <MobileMenu setMobileMenu={setMobileMenu} mobileMenu={mobileMenu} />
        </div>
      )}
    </>
  );
}
