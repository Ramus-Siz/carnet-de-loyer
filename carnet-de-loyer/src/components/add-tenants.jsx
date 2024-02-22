import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import allHouses from "../utils/list-of-houses";
import RegisterButton from "./registre-button";
import { useRentBooklet } from "./contexts/context";

export default function AddTenants({ HandleAddTenants }) {
  const tenants = useRentBooklet((state) => state.tenants);
  const houses = useRentBooklet((state) => state.houses);

  const updateTenants = useRentBooklet((state) => state.updateTenants);
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
  const [list, setList] = useState([]);

  function onSubmit(newTenant) {
    console.log(newTenant);
    const tenantObjetBuild = BuildNewTenantObject(newTenant);
    console.log(tenantObjetBuild);
    updateTenants([...tenants, tenantObjetBuild]);
  }

  function BuildNewTenantObject(newTenant) {
    let keyOftheLasTenant = tenants.length;
    let keyOfTenants = keyOftheLasTenant + 1;
    const newTenantsObject = {
      id: `${keyOfTenants}`,
      name: newTenant.name,
      prenom: newTenant.prenom,
      birthday: newTenant.birthday,
      genre: newTenant.genre,
      maison: newTenant.maison,
      phoneNumber: newTenant.phoneNumber,
      contrat: {
        start: newTenant.start,
        guarantee: `${newTenant.guarantee} Mois`,
        rentPrice: `${newTenant.rentPrice}$`,
      },
    };
    return newTenantsObject;
  }

  const catalog = list.map(({ id, libele }) => {
    return (
      <option value={libele} key={id}>
        {libele}
      </option>
    );
  });

  useEffect(() => {
    setList(houses);
  }, [houses]);
  return (
    <>
      <p className="bg-[#283342] text-white p-2 pl-4 ">
        <button onClick={HandleAddTenants} className="text-orange-600">
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </button>
      </p>
      <form
        className=" flex flex-col gap-5 p-12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <label>Nom</label>
            <input
              type="text"
              name="name"
              id=""
              className="p-2 bg-[#F7FAFD] border-none outline-none pl-3 "
              placeholder="Rafiki"
              {...register("name", { require: "Obligatoire" })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Prénom</label>
            <input
              type="text"
              name="prenom"
              id=""
              className=" p-2 bg-[#F7FAFD] border-none outline-none pl-3 "
              placeholder="Richard"
              {...register("prenom", { require: "Obligatoire" })}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <label>Genre</label>
            <div className="flex gap-3">
              Masculin
              <input
                type="radio"
                value="masculin"
                id=""
                className="p-2 bg-[#F7FAFD] border-none outline-none pl-3"
                {...register("genre", { require: "Obligatoire" })}
              />
              Feminin
              <input
                type="radio"
                value="feminin"
                id=""
                className="p-2 bg-[#F7FAFD] border-none outline-none pl-3"
                {...register("genre", { require: "Obligatoire" })}
              />
            </div>
          </div>
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
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <label>Télephone :</label>
            <input
              className="p-2 bg-[#F7FAFD] border-none outline-none pl-3"
              type="text"
              name="phoneNumber"
              placeholder="09700452686"
              {...register("phoneNumber", {
                required: "ce champ est obligatoir",
                pattern: {
                  value: /^[0-9]{10}$/i,
                  message: "Ce champ n'a pas un bon format",
                },
              })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Début du contrat</label>
            <input
              type="date"
              name="start"
              id=""
              className="p-2 bg-[#F7FAFD] border-none outline-none pl-3"
              {...register("start", { require: "Obligatoire" })}
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <label>Maison</label>

            <select
              name="maison"
              {...register("maison")}
              className="border-none outline-none p-2 pr-3 rounded  bg-[#F7FAFD] "
            >
              {catalog}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label>Garantee</label>
            <input
              type="number"
              name="guarantee"
              id=""
              className="p-2 bg-[#F7FAFD] border-none outline-none pl-3 w-[100px]"
              placeholder="1"
              {...register("guarantee", { require: "Obligatoire" })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Prix</label>
            <input
              type="number"
              name="rentPrice"
              id=""
              className="p-2 bg-[#F7FAFD] border-none outline-none pl-3 w-[300pxpx]"
              placeholder="1"
              {...register("rentPrice", { require: "Obligatoire" })}
            />
          </div>
        </div>

        <RegisterButton />
      </form>
    </>
  );
}
