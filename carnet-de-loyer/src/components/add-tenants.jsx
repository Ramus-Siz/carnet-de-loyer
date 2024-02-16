import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import allHouses from "../utils/list-of-houses";
import RegisterButton from "./registre-button";

export default function AddTenants({ HandleAddTenants }) {
  const [formData, setFormData] = useState({
    libele: "",
    adress: "",
    type: "",
    composition: "",
  });
  const houses = allHouses.houses;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: formData });
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(houses);
  }, [list]);

  const catalog = list.map(({ id, label }) => {
    return (
      <option value={label} key={id}>
        {label}
      </option>
    );
  });

  return (
    <>
      <p className="bg-[#283342] text-white p-2 pl-4 ">
        <button onClick={HandleAddTenants} className="text-orange-600">
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </button>
      </p>
      <form className=" flex flex-col gap-5 p-12">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <label>Nom</label>
            <input
              type="text"
              name="libele"
              id=""
              className="p-2 bg-[#F7FAFD] border-none outline-none pl-3"
              placeholder="Rafiki"
              {...register("libele", { require: "Obligatoire" })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Prénom</label>
            <input
              type="text"
              name="prenom"
              id=""
              className=" p-2 bg-[#F7FAFD] border-none outline-none pl-3"
              placeholder="Richard"
              {...register("prenom", { require: "Obligatoire" })}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <label>Date de Naissance</label>
            <input
              type="date"
              name="birthday"
              id=""
              className="p-2 bg-[#F7FAFD] border-none outline-none pl-3"
              {...register("birthday", { require: "Obligatoire" })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Genre</label>
            <div className="flex gap-3">
              Masculin
              <input
                type="radio"
                name="masculin"
                id=""
                className="p-2 bg-[#F7FAFD] border-none outline-none pl-3"
                {...register("masculin", { require: "Obligatoire" })}
              />
              Feminin
              <input
                type="radio"
                name="feminin"
                id=""
                className="p-2 bg-[#F7FAFD] border-none outline-none pl-3"
                {...register("feminin", { require: "Obligatoire" })}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label>Choix de la maison</label>

          <select
            name="maison"
            {...register("maison")}
            className="border-none outline-none p-2  bg-[#F7FAFD] "
          >
            {catalog}
          </select>
        </div>
        <RegisterButton />
      </form>
    </>
  );
}
