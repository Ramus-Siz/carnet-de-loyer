import { useForm } from "react-hook-form";
import { useState } from "react";
import RegisterButton from "./registre-button";
import { useRentBooklet } from "./contexts/context";

export default function AddHouses({ HandleAddHouses }) {
  const houses = useRentBooklet((state) => state.houses);
  const updateHouses = useRentBooklet((state) => state.updateHouses);

  const [formData, setFormData] = useState({
    libele: "",
    adress: "",
    type: "",
    composition: "",
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: formData });

  function onSubmit(newHouse) {
    console.log(newHouse);
    const houseObjectBuild = BuildNewHouseObject(newHouse);
    updateHouses([...houses, houseObjectBuild]);
    reset();
  }

  function BuildNewHouseObject(newHouse) {
    let keyOftheLastHouse = [];
    let keyOfHouse;
    console.log(keyOftheLastHouse.length);
    if (houses.length == 0) {
      keyOfHouse = 1;
      console.log(keyOfHouse);
    } else {
      for (const house of houses) {
        keyOftheLastHouse.push(parseInt(house.id));
      }
      console.log(keyOftheLastHouse);
      keyOfHouse = Math.max(...keyOftheLastHouse) + 1;
    }

    const newHouseObject = {
      id: `${keyOfHouse}`,
      libele: newHouse.libele,
      adress: newHouse.adress,
      composition: newHouse.composition,
      type: newHouse.type,
      description: newHouse.description,
    };
    return newHouseObject;
  }

  return (
    <>
      <p className="bg-[#283342] text-white p-2 pl-4 ">
        <button onClick={HandleAddHouses} className="text-orange-600">
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </button>
      </p>
      <form
        className=" flex flex-col gap-5 p-12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <label>Libele</label>
          <input
            type="text"
            name="libele"
            id=""
            className=" p-2 bg-[#F7FAFD] border-none outline-none pl-3"
            placeholder="Ex:Boende 32"
            {...register("libele", { required: "Obligatoire" })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Adresse</label>
          <input
            type="text"
            name="adress"
            id=""
            className=" p-2 bg-[#F7FAFD] border-none outline-none pl-3"
            placeholder="Ex:32, Bocage, Joli-parck,Ngaliema"
            {...register("adress", { required: "Obligatoire" })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Type</label>

          <select
            name="type"
            {...register("type", { required: "Obligatoire" })}
            className="border-none outline-none p-2  bg-[#F7FAFD] "
          >
            <option value="Maison Basse">Maison Basse</option>
            <option value="Apartement">Apartement</option>
            <option value="Apartement">Boutique</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label>Composition</label>

          <select
            name="composition"
            {...register("composition", { required: "Obligatoire" })}
            className="border-none outline-none p-2  bg-[#F7FAFD] "
          >
            <option value=" t1-c">T1-c</option>
            <option value="t2-c">T2-c</option>
            <option value="t3-c">T3-c</option>
            <option value="t4-c">T4-c</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label>Description</label>
          <textarea
            name="description"
            id=""
            className="p-2 bg-[#F7FAFD] border-none outline-none pl-3"
            placeholder="Brève description ... "
            {...register("description", { required: "Obligatoire" })}
          />
        </div>
        <RegisterButton />
      </form>
    </>
  );
}
