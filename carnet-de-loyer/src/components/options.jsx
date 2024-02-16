import { useState } from "react";
import CheckBox from "./checkbox";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AddHouses from "../pages/add-houses";

export default function Options({
  selectAll,
  handleSelectAll,
  HandleDelete,
  isCheck,
  catalog,
}) {
  const [addHouses, setAddHouses] = useState(false);
  const [formData, setFormData] = useState({
    libele: "",
    adress: "",
    type: "",
    composition: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: formData });

  const navigate = useNavigate();
  const HandleAddHouses = () => {
    setAddHouses(!addHouses);
  };

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
            className="flex items-center flex items-center text-white rounded p-2 pr-4 bg-gradient-to-r from-fuchsia-700 to-fuchsia-700 hover:from-[#283342] hover:to-fuchsia-700 ..."
            onClick={HandleDelete}
          >
            <ion-icon name="remove-outline"></ion-icon>Suprimer
          </button>
          <button
            className="flex items-center bg-[#283342] text-white rounded p-2 bg-gradient-to-r from-fuchsia-700 to-fuchsia-700 hover:from-[#283342] hover:to-fuchsia-700 ..."
            onClick={HandleAddHouses}
          >
            <ion-icon name="add-outline"></ion-icon>Ajouter une maison
          </button>
        </div>
        <div className="pt-8">{catalog}</div>
      </div>
      {addHouses ? (
        <div className="h-screen w-[40%] bg-[#E3EBF3] fixed  top-0 right-0 ease-in duration-1000">
          <AddHouses register={register} HandleAddHouses={HandleAddHouses} />
        </div>
      ) : (
        <div className="h-screen w-[40%] bg-[#E3EBF3] fixed  top-0 right-0 ease-in duration-1000 translate-x-full">
          <AddHouses register={register} HandleAddHouses={HandleAddHouses} />
        </div>
      )}
    </>
  );
}
