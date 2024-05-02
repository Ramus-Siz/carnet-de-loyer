import { useState } from "react";
import CheckBox from "./checkbox";
import { useForm } from "react-hook-form";
import AddHouses from "./add-houses";
import AddTenants from "./add-tenants";
import { Link } from "react-router-dom";

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
    <>
      <div className="">
        <div className="sticky top-1 pl-8  mb-5 z-10 pr-8">
          <div className="flex gap-4  pl-8 p-3   bg-[#283342]  items-center">
            <CheckBox
              type="checkbox"
              id="all"
              name="all"
              isChecked={selectAll}
              handleClick={handleSelectAll}
            />
            <span className="text-[#b3b5b7]">Tout selectionner</span>
            <button
              className="flex items-center flex items-center text-white rounded-3xl  p-2 pr-8  bg-fuchsia-700 hover:scale-95 hover:from-[#283342] hover:to-fuchsia-700 ... "
              onClick={HandleDelete}
            >
              <span className=" bg-white p-2 text-fuchsia-700 mr-4 rounded-full">
                {/* <ion-icon name="remove-outline"></ion-icon> */}
              </span>
              Suprimer
            </button>
            <button
              className="flex items-center bg-fuchsia-700 text-white rounded-3xl  p-2 pr-8 hover:scale-95 hover:from-[#283342] hover:to-fuchsia-700 ..."
              onClick={HandleAddData}
            >
              <span className=" bg-white p-2 text-fuchsia-700 mr-4 rounded-full">
                {/* <ion-icon name="add-outline"></ion-icon> */}
              </span>
              Ajouter {user}
            </button>
          </div>
        </div>
        <div className="pt-8 pl-8 pr-8 pb-8 z-0">{catalog}</div>
      </div>
      {isTrueToAddData && user === "une maison" ? (
        <div className="h-screen w-[40%] bg-[#E3EBF3] fixed  top-0 right-0 ease-in duration-500 z-40">
          <AddHouses HandleAddHouses={HandleAddData} />
        </div>
      ) : (
        <div className="h-screen w-[40%] bg-[#E3EBF3] fixed  top-0 right-0 ease-in duration-500 translate-x-full">
          <AddHouses HandleAddHouses={HandleAddData} />
        </div>
      )}
      {isTrueToAddData && user === "un / une locataire" ? (
        <div className="h-screen w-[40%] bg-[#E3EBF3] fixed  top-0 right-0 ease-in duration-500">
          <AddTenants HandleAddTenants={HandleAddData} />
        </div>
      ) : (
        <div className="h-screen w-[40%] bg-[#E3EBF3] fixed  top-0 right-0 ease-in duration-500 translate-x-full">
          <AddTenants HandleAddTenants={HandleAddData} />
        </div>
      )}
    </>
  );
}
