import { useState } from "react";
import CheckBox from "./checkbox";
import { useForm } from "react-hook-form";
import AddHouses from "./add-houses";
import AddTenants from "./add-tenants";
import { Link } from "react-router-dom";
import Avatar from "./avatar";

export default function Options({
  selectAll,
  handleSelectAll,
  HandleDelete,
  isCheck,
  catalog,
  index,
  user,
  isTrueToAddData,
  HandleAddData,
}) {
  // bg-[#283342]
  return (
    <div className="pt-4">
      <div className="sticky top-1 md:pl-8 md mb-5 z-10 md:pr-8  ">
        <div className="flex  flex-wrap md:flex-nowrap gap-4  md:pl-8  p-3 bg-[#283342]  items-center">
          <div className=" md:flex hidden w-[20%] gap-4">
            <CheckBox
              type="checkbox"
              id="all"
              name="all"
              isChecked={selectAll}
              handleClick={handleSelectAll}
            />
            <span className="text-[#b3b5b7]">Tout selectionner</span>
          </div>
          <div className="flex gap-4 w-full md:flex-row flex-col">
            <button
              className="flex items-center  w-[40%] md:w-[15%] flex items-center text-white rounded-3xl  p-2 pr-4 pl-8 bg-fuchsia-700 hover:scale-95 hover:from-[#283342] hover:to-fuchsia-700 ... "
              onClick={HandleDelete}
            >
              Suprimer
            </button>
            <button
              className="flex items-center w-[70%] md:w-[23%] bg-fuchsia-700 text-white rounded-3xl  p-2 pl-8 pr-4 hover:scale-95 hover:from-[#283342] hover:to-fuchsia-700 ..."
              onClick={HandleAddData}
            >
              Ajouter {user}
            </button>
          </div>

          <div className="md:hidden pl-8 ">
            <CheckBox
              type="checkbox"
              id="all"
              name="all"
              isChecked={selectAll}
              handleClick={handleSelectAll}
            />
            <span className="text-[#b3b5b7]">Tout selectionner</span>
          </div>
        </div>
      </div>
      <div className="md:pt-8 pl-8 pr-8 pb-8 z-0">{catalog}</div>
      {isTrueToAddData && user === "une maison" ? (
        <div className="h-screen w-[39%] bg-[#E3EBF3] absolute  top-0 right-0 ease-in duration-500 z-40">
          <AddHouses HandleAddHouses={HandleAddData} />
        </div>
      ) : (
        <div className="h-screen w-[39%] bg-[#E3EBF3] fixed  top-0 right-0 ease-in duration-500 translate-x-full z-40">
          <AddHouses HandleAddHouses={HandleAddData} />
        </div>
      )}
      {isTrueToAddData && user === "un / une locataire" ? (
        <div className="h-screen w-[39%] bg-[#E3EBF3] fixed  top-0 right-0 ease-in duration-500 z-40">
          <AddTenants HandleAddTenants={HandleAddData} />
        </div>
      ) : (
        <div className="h-screen w-[39%] bg-[#E3EBF3] fixed  top-0 right-0 ease-in duration-500 translate-x-full z-40">
          <AddTenants HandleAddTenants={HandleAddData} />
        </div>
      )}
    </div>
  );
}
