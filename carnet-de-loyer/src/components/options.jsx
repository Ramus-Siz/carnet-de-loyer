import { useState } from "react";
import CheckBox from "./checkbox";
import { useNavigate } from "react-router-dom";
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
  user,
  isTrueToAddData,
  HandleAddData,
}) {
  const navigate = useNavigate();

  return (
    <>
      <div className="p-8">
        <div className="flex gap-4 bg-[#E3EBF3] p-3 items-center">
          <CheckBox
            type="checkbox"
            id="all"
            name="all"
            isChecked={selectAll}
            handleClick={handleSelectAll}
          />
          Tout selectionner
          <button
            className="flex items-center flex items-center text-white rounded-3xl p-2 pl-4 pr-4 bg-gradient-to-r from-fuchsia-700 to-fuchsia-700 hover:from-[#283342] hover:to-fuchsia-700 ..."
            onClick={HandleDelete}
          >
            <ion-icon name="remove-outline"></ion-icon> Suprimer
          </button>
          <button
            className="flex items-center bg-[#283342] text-white rounded-3xl p-2 pl-4 pr-4 bg-gradient-to-r from-fuchsia-700 to-fuchsia-700 hover:from-[#283342] hover:to-fuchsia-700 ..."
            onClick={HandleAddData}
          >
            <ion-icon name="add-outline"></ion-icon>Ajouter {user}
          </button>
        </div>
        <div className="pt-8">{catalog}</div>
      </div>
      {isTrueToAddData && user === "une maison" ? (
        <div className="h-screen w-[40%] bg-[#E3EBF3] fixed  top-0 right-0 ease-in duration-1000">
          <AddHouses HandleAddHouses={HandleAddData} />
        </div>
      ) : (
        <div className="h-screen w-[40%] bg-[#E3EBF3] fixed  top-0 right-0 ease-in duration-1000 translate-x-full">
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
